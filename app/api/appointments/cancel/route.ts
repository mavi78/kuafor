import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, AppointmentStatus } from "@prisma/client";
import { requireStaffOrAdmin } from "@/lib/auth/guards";
import { appointmentCancellationSchema } from "@/lib/validation/appointment";
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
    const validatedData = appointmentCancellationSchema.parse(body);

    // Get existing appointment
    const appointment = await prisma.appointment.findUnique({
      where: { id: validatedData.appointment_id },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Randevu bulunamadı" },
        { status: 404 }
      );
    }

    // Update appointment status to CANCELLED
    const updatedAppointment = await prisma.appointment.update({
      where: { id: validatedData.appointment_id },
      data: {
        status: AppointmentStatus.CANCELLED,
        notes_internal: {
          ...(appointment.notes_internal as any),
          cancelled_by: session.user.id,
          cancelled_at: new Date().toISOString(),
          cancellation_reason: validatedData.reason,
        },
      },
    });

    // TODO: Send notification to customer (will be implemented in task 4.1-4.2)
    // TODO: Log in AuditLog

    // Get full appointment data for notifications
    const fullAppointment = await prisma.appointment.findUnique({
      where: { id: validatedData.appointment_id },
      include: {
        appointment_services: {
          include: { service: true },
        },
        customer_user: true,
      },
    });

    if (fullAppointment) {
      const serviceNames = fullAppointment.appointment_services
        .map((as) => as.service.name)
        .join(", ");
      const formattedDate = format(fullAppointment.date, "d MMMM yyyy", {
        locale: tr,
      });

      // Send notification to customer (async, don't wait)
      notifyAppointmentStatusChange(
        {
          status: "CANCELLED",
          appointmentCode: fullAppointment.code,
          customerName: fullAppointment.customer_name,
          appointmentDate: formattedDate,
          appointmentTime: fullAppointment.time,
          services: serviceNames,
          cancelReason: validatedData.reason,
        },
        {
          email: fullAppointment.customer_user?.email || undefined,
          phone: fullAppointment.customer_phone,
        },
        {},
        [NotificationChannel.EMAIL, NotificationChannel.SMS],
        []
      ).catch((error) => {
        console.error("Failed to send cancellation notifications:", error);
      });
    }

    return NextResponse.json({
      message: "Randevu başarıyla iptal edildi",
      appointment: updatedAppointment,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Appointment cancellation error:", error);
    return NextResponse.json(
      { error: "Randevu iptal edilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
