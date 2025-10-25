import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { canCancelAppointment } from "@/lib/utils/appointment";

const prisma = new PrismaClient();

const cancelByCustomerSchema = z.object({
  code: z.string().min(1, "Takip kodu gerekli"),
  reason: z.string().min(1, "İptal nedeni gerekli"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, reason } = cancelByCustomerSchema.parse(body);

    // Randevuyu takip kodu ile bul
    const appointment = await prisma.appointment.findUnique({
      where: { code },
      include: { appointment_services: { include: { service: true } } },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Randevu bulunamadı" },
        { status: 404 }
      );
    }

    // Sadece PENDING veya APPROVED randevular iptal edilebilir
    if (!["PENDING", "APPROVED"].includes(appointment.status)) {
      return NextResponse.json(
        { error: "Bu randevu iptal edilemez" },
        { status: 400 }
      );
    }

    // 12 saat kuralını kontrol et
    const appointmentDate = appointment.date.toISOString().split("T")[0]; // YYYY-MM-DD
    const canCancel = canCancelAppointment(appointmentDate, appointment.time);
    if (!canCancel) {
      return NextResponse.json(
        {
          error:
            "Randevu saatine 12 saatten az kaldığı için iptal edilemez. Lütfen bizimle iletişime geçin.",
        },
        { status: 400 }
      );
    }

    // notes_internal'ı güncelle
    const currentNotes = (appointment.notes_internal as any) || {};
    const updatedNotes = {
      ...currentNotes,
      cancelled_by: "customer",
      cancelled_at: new Date().toISOString(),
      cancellation_reason: reason,
    };

    // Randevuyu iptal et
    const updated = await prisma.appointment.update({
      where: { id: appointment.id },
      data: {
        status: "CANCELLED",
        notes_internal: updatedNotes,
      },
      include: {
        appointment_services: { include: { service: true } },
        assigned_staff: true,
        customer_user: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Randevunuz iptal edildi",
      appointment: updated,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Geçersiz veri", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error cancelling appointment by customer:", error);
    return NextResponse.json(
      { error: "Randevu iptal edilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
