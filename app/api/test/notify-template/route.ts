import { NextResponse } from "next/server";
import { sendAppointmentNotification } from "@/lib/notify/appointment-notifications";
import { NotificationChannel } from "@/lib/notify/types";
import type { AppointmentStatus } from "@prisma/client";

/**
 * Test endpoint for appointment notification templates
 *
 * Usage:
 * POST /api/test/notify-template
 * {
 *   "status": "PENDING" | "APPROVED" | "REVISED" | "CANCELLED" | "COMPLETED",
 *   "recipient": {
 *     "name": "Test Kullanıcı",
 *     "email": "test@example.com",
 *     "phone": "5551234567",
 *     "role": "CUSTOMER" | "ADMIN"
 *   },
 *   "appointment": {
 *     "appointmentCode": "APT-2025-00001",
 *     "customerName": "Ahmet Yılmaz",
 *     "appointmentDate": "25 Ekim 2025",
 *     "appointmentTime": "14:00",
 *     "services": "Saç Kesimi, Fön",
 *     "staffName": "Ayşe Hanım",
 *     "cancelReason": "Müşteri talebine göre iptal edildi"
 *   },
 *   "channels": ["EMAIL", "SMS", "WHATSAPP"]
 * }
 */
export async function POST(request: Request) {
  try {
    const { status, recipient, appointment, channels } = await request.json();

    if (!status || !recipient || !appointment) {
      return NextResponse.json(
        {
          error: "Missing required fields: status, recipient, appointment",
        },
        { status: 400 }
      );
    }

    const channelEnums = channels?.map(
      (c: string) => NotificationChannel[c as keyof typeof NotificationChannel]
    ) || [NotificationChannel.EMAIL];

    const result = await sendAppointmentNotification(
      {
        name: recipient.name,
        email: recipient.email,
        phone: recipient.phone,
        role: recipient.role || "CUSTOMER",
      },
      {
        status: status as AppointmentStatus,
        appointmentCode: appointment.appointmentCode,
        customerName: appointment.customerName,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        services: appointment.services,
        staffName: appointment.staffName,
        cancelReason: appointment.cancelReason,
        notes: appointment.notes,
        totalAmount: appointment.totalAmount,
      },
      channelEnums
    );

    return NextResponse.json({
      success: true,
      results: result,
    });
  } catch (error) {
    console.error("Test notification template error:", error);
    return NextResponse.json(
      {
        error: "Failed to send test notification",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
