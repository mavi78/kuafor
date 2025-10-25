import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, AppointmentStatus } from "@prisma/client";
import { requireStaffOrAdmin } from "@/lib/auth/guards";
import { appointmentCancellationSchema } from "@/lib/validation/appointment";
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
