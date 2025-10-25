import {
  EmailProvider,
  NotificationChannel,
  NotificationPayload,
  NotificationRecipient,
  NotificationResult,
} from "../types";

/**
 * MockEmailProvider - Development/testing email provider
 *
 * Logs email content to console instead of actually sending.
 * Useful for local development and testing.
 */
export class MockEmailProvider implements EmailProvider {
  readonly channel = NotificationChannel.EMAIL;
  readonly name = "Mock Email";

  isConfigured(): boolean {
    return true; // Mock provider is always available
  }

  async send(payload: NotificationPayload): Promise<NotificationResult> {
    console.log("\n📧 [MOCK EMAIL]");
    console.log("To:", payload.to.name, `<${payload.to.email}>`);
    console.log("Subject:", payload.subject || "Bildirim");
    console.log("Body:", payload.body);
    console.log("Variables:", payload.variables);
    console.log("---\n");

    const messageId = `mock-email-${Date.now()}@yildiz-kuaforu.local`;

    return {
      success: true,
      messageId,
      metadata: {
        provider: "mock",
        timestamp: new Date().toISOString(),
      },
    };
  }

  async sendHtml(
    to: NotificationRecipient,
    subject: string,
    html: string
  ): Promise<NotificationResult> {
    console.log("\n📧 [MOCK EMAIL - HTML]");
    console.log("To:", to.name, `<${to.email}>`);
    console.log("Subject:", subject);
    console.log("HTML:", html);
    console.log("---\n");

    const messageId = `mock-email-${Date.now()}@yildiz-kuaforu.local`;

    return {
      success: true,
      messageId,
      metadata: {
        provider: "mock",
        timestamp: new Date().toISOString(),
      },
    };
  }
}
