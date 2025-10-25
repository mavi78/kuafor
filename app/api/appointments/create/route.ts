import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, AppointmentStatus } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { appointmentRequestSchema } from "@/lib/validation/appointment";
import {
  generateAppointmentCode,
  checkWorkingHours,
} from "@/lib/utils/appointment";
import { z } from "zod";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();

    // Validate input
    const validatedData = appointmentRequestSchema.parse(body);

    // Get working hours and special working days
    const workingHours = await prisma.workingHours.findMany();
    const specialWorkingDays = await prisma.specialWorkingDay.findMany({
      where: {
        date: {
          gte: new Date(validatedData.date),
          lte: new Date(validatedData.date),
        },
      },
    });

    // Check if selected time is within working hours
    const selectedDate = new Date(validatedData.date);
    const weekday = selectedDate.getDay();
    const hoursCheck = checkWorkingHours(
      weekday,
      validatedData.time,
      workingHours,
      specialWorkingDays,
      validatedData.date
    );

    // If outside working hours, return warning (but still allow booking)
    const warnings: string[] = [];
    if (!hoursCheck.isWithinHours && hoursCheck.message) {
      warnings.push(hoursCheck.message);
    }

    // Generate unique appointment code
    const code = await generateAppointmentCode();

    // Get service prices for booking record
    const services = await prisma.service.findMany({
      where: {
        id: {
          in: validatedData.service_ids,
        },
        is_active: true,
      },
    });

    if (services.length !== validatedData.service_ids.length) {
      return NextResponse.json(
        { error: "Seçilen hizmetlerden bazıları bulunamadı veya aktif değil" },
        { status: 400 }
      );
    }

    // Create appointment with PENDING status
    const appointment = await prisma.appointment.create({
      data: {
        code,
        customer_name: validatedData.customer_name,
        customer_phone: validatedData.customer_phone,
        customer_user_id: session?.user?.id || null,
        people_count: validatedData.people_count,
        date: new Date(validatedData.date),
        time: validatedData.time,
        status: AppointmentStatus.PENDING,
        notes_internal: validatedData.notes
          ? { customer_notes: validatedData.notes }
          : undefined,
        appointment_services: {
          create: services.map((service) => ({
            service_id: service.id,
            price_try_at_booking: service.price_try,
          })),
        },
      },
      include: {
        appointment_services: {
          include: {
            service: true,
          },
        },
      },
    });

    // TODO: Trigger notifications to admin/staff (will be implemented in task 4.1-4.2)
    // await sendNotification({
    //   channel: 'EMAIL',
    //   to: 'admin@yildizkuaforu.com',
    //   template: 'appointment_pending',
    //   payload: { appointment, code },
    // })

    return NextResponse.json(
      {
        message: "Randevu talebiniz başarıyla oluşturuldu",
        appointment: {
          id: appointment.id,
          code: appointment.code,
          date: appointment.date,
          time: appointment.time,
          status: appointment.status,
          services: appointment.appointment_services.map((as) => ({
            name: as.service.name,
            price: as.price_try_at_booking,
          })),
        },
        warnings,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Appointment creation error:", error);
    return NextResponse.json(
      { error: "Randevu oluşturulurken bir hata oluştu" },
      { status: 500 }
    );
  }
}
