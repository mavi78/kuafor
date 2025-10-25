import {
  WhatsAppProvider,
  NotificationChannel,
  NotificationPayload,
  NotificationResult,
} from "../types";

/**
 * MockWhatsAppProvider - Development/testing WhatsApp provider
 *
 * Logs WhatsApp message content to console instead of actually sending.
 * Useful for local development and testing.
 */
export class MockWhatsAppProvider implements WhatsAppProvider {
  readonly channel = NotificationChannel.WHATSAPP;
  readonly name = "Mock WhatsApp";

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

    return this.sendMessage(payload.to.phone, payload.body, payload.templateId);
  }

  async sendMessage(
    to: string,
    message: string,
    templateName?: string
  ): Promise<NotificationResult> {
    console.log("\n💬 [MOCK WHATSAPP]");
    console.log("To:", to);
    console.log("Template:", templateName || "N/A");
    console.log("Message:", message);
    console.log("---\n");

    const messageId = `mock-whatsapp-${Date.now()}`;

    return {
      success: true,
      messageId,
      metadata: {
        provider: "mock",
        timestamp: new Date().toISOString(),
        template: templateName,
      },
    };
  }
}
