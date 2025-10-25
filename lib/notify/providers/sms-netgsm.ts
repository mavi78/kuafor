import {
  SMSProvider,
  NotificationChannel,
  NotificationPayload,
  NotificationResult,
} from "../types";

/**
 * NetgsmSMSProvider - Real SMS provider using Netgsm API
 *
 * Environment variables required:
 * - NETGSM_USER: Netgsm API username
 * - NETGSM_PASS: Netgsm API password
 * - NETGSM_HEADER: SMS sender header (maksimum 11 karakter)
 *
 * API Documentation: https://www.netgsm.com.tr/dokuman/
 */
export class NetgsmSMSProvider implements SMSProvider {
  readonly channel = NotificationChannel.SMS;
  readonly name = "Netgsm SMS";

  private readonly apiUrl = "https://api.netgsm.com.tr/sms/send/get";

  isConfigured(): boolean {
    return !!(
      process.env.NETGSM_USER &&
      process.env.NETGSM_PASS &&
      process.env.NETGSM_HEADER
    );
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
    if (!this.isConfigured()) {
      return {
        success: false,
        error: "Netgsm provider not configured",
      };
    }

    // Netgsm telefon numarası formatı: 5xxxxxxxxx (başında 0 yok, +90 yok)
    const cleanPhone = to
      .replace(/[\s\-\(\)]/g, "")
      .replace(/^(\+90|90|0)/, "");

    try {
      const params = new URLSearchParams({
        usercode: process.env.NETGSM_USER!,
        password: process.env.NETGSM_PASS!,
        gsmno: cleanPhone,
        message: message,
        msgheader: process.env.NETGSM_HEADER!,
        dil: "TR",
      });

      const response = await fetch(`${this.apiUrl}?${params.toString()}`);
      const responseText = await response.text();

      // Netgsm response codes:
      // "00 [MESAJ_ID]" = başarılı
      // "01" = eksik parametre
      // "20" = kullanıcı/şifre hatalı
      // "30" = geçersiz header
      // "40" = mesaj boş
      // "50" = numara yok
      // "51" = krediniz yetersiz
      // "70" = hatalı format

      if (responseText.startsWith("00 ")) {
        const messageId = responseText.split(" ")[1];
        return {
          success: true,
          messageId,
          metadata: {
            provider: "netgsm",
            response: responseText,
          },
        };
      } else {
        const errorMessages: Record<string, string> = {
          "01": "Eksik parametre",
          "20": "Kullanıcı adı/şifre hatalı",
          "30": "Geçersiz başlık (header)",
          "40": "Mesaj boş",
          "50": "Numara bulunamadı",
          "51": "Krediniz yetersiz",
          "70": "Hatalı format",
        };

        return {
          success: false,
          error: errorMessages[responseText] || `Netgsm error: ${responseText}`,
          metadata: {
            provider: "netgsm",
            response: responseText,
          },
        };
      }
    } catch (error) {
      console.error("SMS send error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
