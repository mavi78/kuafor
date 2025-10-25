import {
  WhatsAppProvider,
  NotificationChannel,
  NotificationPayload,
  NotificationResult,
} from "../types";

/**
 * WhatsAppBusinessProvider - Real WhatsApp provider using Business API
 *
 * Environment variables required:
 * - WHATSAPP_API_URL: WhatsApp Business API endpoint
 * - WHATSAPP_API_TOKEN: Authentication token
 * - WHATSAPP_PHONE_NUMBER_ID: Your WhatsApp Business phone number ID
 *
 * API Documentation: https://developers.facebook.com/docs/whatsapp/cloud-api
 */
export class WhatsAppBusinessProvider implements WhatsAppProvider {
  readonly channel = NotificationChannel.WHATSAPP;
  readonly name = "WhatsApp Business API";

  private readonly apiUrl: string;
  private readonly phoneNumberId: string;
  private readonly apiToken: string;

  constructor() {
    this.apiUrl =
      process.env.WHATSAPP_API_URL || "https://graph.facebook.com/v21.0";
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || "";
    this.apiToken = process.env.WHATSAPP_API_TOKEN || "";
  }

  isConfigured(): boolean {
    return !!(this.phoneNumberId && this.apiToken);
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
    if (!this.isConfigured()) {
      return {
        success: false,
        error: "WhatsApp provider not configured",
      };
    }

    // WhatsApp telefon numarası formatı: 90xxxxxxxxxx (başında + yok)
    const cleanPhone = to.replace(/[\s\-\(\)]/g, "").replace(/^\+/, "");

    try {
      const endpoint = `${this.apiUrl}/${this.phoneNumberId}/messages`;

      // If template name is provided, use template message; otherwise, send text message
      const requestBody = templateName
        ? {
            messaging_product: "whatsapp",
            to: cleanPhone,
            type: "template",
            template: {
              name: templateName,
              language: { code: "tr" },
            },
          }
        : {
            messaging_product: "whatsapp",
            to: cleanPhone,
            type: "text",
            text: { body: message },
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (response.ok && responseData.messages) {
        return {
          success: true,
          messageId: responseData.messages[0].id,
          metadata: {
            provider: "whatsapp",
            response: responseData,
          },
        };
      } else {
        return {
          success: false,
          error: responseData.error?.message || "WhatsApp API error",
          metadata: {
            provider: "whatsapp",
            response: responseData,
          },
        };
      }
    } catch (error) {
      console.error("WhatsApp send error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
