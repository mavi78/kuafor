import { providerFactory } from "./factory";
import {
  NotificationChannel,
  NotificationPayload,
  NotificationRecipient,
  NotificationResult,
} from "./types";
import { logNotification } from "./logger";

/**
 * NotificationService - Main notification interface
 *
 * Provides a unified API for sending notifications across multiple channels.
 * Automatically selects the appropriate provider (real or mock) based on configuration.
 * Logs all notification attempts to the database.
 */
export class NotificationService {
  /**
   * Send notification via specific channel
   */
  async send(
    channel: NotificationChannel,
    payload: NotificationPayload
  ): Promise<NotificationResult> {
    const provider = providerFactory.getProvider(channel);
    const result = await provider.send(payload);

    // Log notification attempt
    const recipient =
      channel === NotificationChannel.EMAIL
        ? payload.to.email || payload.to.phone || "unknown"
        : payload.to.phone || payload.to.email || "unknown";

    await logNotification({
      channel,
      to: recipient,
      templateKey: payload.templateId || "custom",
      payloadJson: {
        to: payload.to,
        subject: payload.subject,
        body: payload.body?.substring(0, 200), // First 200 chars
        variables: payload.variables,
      },
      result,
    });

    return result;
  }

  /**
   * Send email notification
   */
  async sendEmail(
    to: NotificationRecipient,
    subject: string,
    body: string
  ): Promise<NotificationResult> {
    return this.send(NotificationChannel.EMAIL, {
      to,
      subject,
      body,
    });
  }

  /**
   * Send SMS notification
   */
  async sendSMS(phone: string, message: string): Promise<NotificationResult> {
    return this.send(NotificationChannel.SMS, {
      to: { name: "", phone },
      body: message,
    });
  }

  /**
   * Send WhatsApp notification
   */
  async sendWhatsApp(
    phone: string,
    message: string,
    templateName?: string
  ): Promise<NotificationResult> {
    return this.send(NotificationChannel.WHATSAPP, {
      to: { name: "", phone },
      body: message,
      templateId: templateName,
    });
  }

  /**
   * Send notification to multiple channels
   */
  async sendMultiChannel(
    channels: NotificationChannel[],
    payload: NotificationPayload
  ): Promise<Record<NotificationChannel, NotificationResult>> {
    const results: Record<string, NotificationResult> = {};

    await Promise.all(
      channels.map(async (channel) => {
        const result = await this.send(channel, payload);
        results[channel] = result;
      })
    );

    return results as Record<NotificationChannel, NotificationResult>;
  }
}

// Export singleton instance
export const notificationService = new NotificationService();
