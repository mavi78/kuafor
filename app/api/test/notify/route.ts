import { NextResponse } from "next/server";
import { notificationService } from "@/lib/notify";
import { NotificationChannel } from "@/lib/notify/types";

/**
 * Test endpoint for notification providers
 *
 * Usage:
 * POST /api/test/notify
 * {
 *   "channel": "EMAIL" | "SMS" | "WHATSAPP",
 *   "to": { "name": "Test User", "email": "test@example.com", "phone": "5551234567" },
 *   "subject": "Test Subject",
 *   "body": "Test message"
 * }
 */
export async function POST(request: Request) {
  try {
    const { channel, to, subject, body } = await request.json();

    if (!channel || !to || !body) {
      return NextResponse.json(
        { error: "Missing required fields: channel, to, body" },
        { status: 400 }
      );
    }

    const result = await notificationService.send(
      channel as NotificationChannel,
      {
        to,
        subject,
        body,
      }
    );

    return NextResponse.json({
      success: result.success,
      messageId: result.messageId,
      error: result.error,
      metadata: result.metadata,
    });
  } catch (error) {
    console.error("Test notification error:", error);
    return NextResponse.json(
      {
        error: "Failed to send test notification",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
