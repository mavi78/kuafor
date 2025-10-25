import {
  SMSProvider,
  NotificationChannel,
  NotificationPayload,
  NotificationResult,
} from "../types";

/**
 * MockSMSProvider - Development/testing SMS provider
 *
 * Logs SMS content to console instead of actually sending.
 * Useful for local development and testing.
 */
export class MockSMSProvider implements SMSProvider {
  readonly channel = NotificationChannel.SMS;
  readonly name = "Mock SMS";

  isConfigured(): boolean {
    return true; // Mock provider is always available
  }

  async send(payload: NotificationPayload): Promise<NotificationResult> {
    if (!payload.to.phone) {
      return {
        success: false,
        error: "Recipient phone number is required",
      };
    }

    return this.sendSMS(payload.to.phone, payload.body);
  }

  async sendSMS(to: string, message: string): Promise<NotificationResult> {
    console.log("\n📱 [MOCK SMS]");
    console.log("To:", to);
    console.log("Message:", message);
    console.log("Length:", message.length, "characters");
    console.log("---\n");

    const messageId = `mock-sms-${Date.now()}`;

    return {
      success: true,
      messageId,
      metadata: {
        provider: "mock",
        timestamp: new Date().toISOString(),
        messageLength: message.length,
      },
    };
  }
}
