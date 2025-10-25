import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, AppointmentStatus } from "@prisma/client";
import { requireStaffOrAdmin } from "@/lib/auth/guards";
import { appointmentApprovalSchema } from "@/lib/validation/appointment";
import { notifyAppointmentStatusChange } from "@/lib/notify";
import { NotificationChannel } from "@/lib/notify/types";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { z } from "zod";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await requireStaffOrAdmin();
    const body = await request.json();

    // Validate input
    const validatedData = appointmentApprovalSchema.parse(body);

    // Get existing appointment
    const appointment = await prisma.appointment.findUnique({
      where: { id: validatedData.appointment_id },
      include: {
        appointment_services: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Randevu bulunamadı" },
        { status: 404 }
      );
    }

    // Update appointment
    const updatedAppointment = await prisma.appointment.update({
      where: { id: validatedData.appointment_id },
      data: {
        status: AppointmentStatus.APPROVED,
        assigned_staff_id: validatedData.assigned_staff_id,
        date: new Date(validatedData.date),
        time: validatedData.time,
        people_count: validatedData.people_count,
        notes_internal: validatedData.notes_internal
          ? { admin_notes: validatedData.notes_internal }
          : undefined,
      },
    });

    // Update services if changed
    if (
      JSON.stringify(validatedData.service_ids.sort()) !==
      JSON.stringify(
        appointment.appointment_services.map((as) => as.service_id).sort()
      )
    ) {
      // Delete old services
      await prisma.appointmentService.deleteMany({
        where: { appointment_id: validatedData.appointment_id },
      });

      // Get new service prices
      const services = await prisma.service.findMany({
        where: {
          id: { in: validatedData.service_ids },
        },
      });

      // Create new service relations
      await prisma.appointmentService.createMany({
        data: services.map((service) => ({
          appointment_id: validatedData.appointment_id,
          service_id: service.id,
          price_try_at_booking: service.price_try,
        })),
      });
    }

    // TODO: Send notification to customer (will be implemented in task 4.1-4.2)
    // TODO: Log in AuditLog

    // Get full appointment data with relations for notifications
    const fullAppointment = await prisma.appointment.findUnique({
      where: { id: validatedData.appointment_id },
      include: {
        appointment_services: {
          include: { service: true },
        },
        assigned_staff: true,
        customer_user: true,
      },
    });

    if (fullAppointment) {
      // Determine if this is APPROVED or REVISED
      const isRevised =
        appointment.status === "APPROVED" &&
        (appointment.date.toISOString() !==
          new Date(validatedData.date).toISOString() ||
          appointment.time !== validatedData.time ||
          appointment.assigned_staff_id !== validatedData.assigned_staff_id);

      const serviceNames = fullAppointment.appointment_services
        .map((as) => as.service.name)
        .join(", ");
      const formattedDate = format(
        new Date(validatedData.date),
        "d MMMM yyyy",
        { locale: tr }
      );

      // Send notifications (async, don't wait)
      notifyAppointmentStatusChange(
        {
          status: isRevised ? "REVISED" : "APPROVED",
          appointmentCode: fullAppointment.code,
          customerName: fullAppointment.customer_name,
          appointmentDate: formattedDate,
          appointmentTime: validatedData.time,
          services: serviceNames,
          staffName: fullAppointment.assigned_staff?.name,
          notes: isRevised ? "Randevunuzda değişiklik yapılmıştır." : undefined,
        },
        {
          email: fullAppointment.customer_user?.email || undefined,
          phone: fullAppointment.customer_phone,
        },
        {},
        [NotificationChannel.EMAIL, NotificationChannel.SMS],
        []
      ).catch((error) => {
        console.error("Failed to send approval notifications:", error);
      });
    }

    return NextResponse.json({
      message: "Randevu başarıyla onaylandı",
      appointment: updatedAppointment,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Appointment approval error:", error);
    return NextResponse.json(
      { error: "Randevu onaylanırken bir hata oluştu" },
      { status: 500 }
    );
  }
}
