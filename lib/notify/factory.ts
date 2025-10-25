import { NotificationChannel, NotificationProvider } from "./types";
import { NodemailerEmailProvider } from "./providers/email";
import { MockEmailProvider } from "./providers/email-mock";
import { NetgsmSMSProvider } from "./providers/sms-netgsm";
import { MockSMSProvider } from "./providers/sms-mock";
import { WhatsAppBusinessProvider } from "./providers/whatsapp";
import { MockWhatsAppProvider } from "./providers/whatsapp-mock";

/**
 * Provider Factory
 *
 * Creates and manages notification providers based on environment configuration.
 * Automatically falls back to mock providers if real providers are not configured.
 */
class NotificationProviderFactory {
  private emailProvider: NotificationProvider | null = null;
  private smsProvider: NotificationProvider | null = null;
  private whatsappProvider: NotificationProvider | null = null;

  /**
   * Get Email provider - Real if configured, Mock otherwise
   */
  getEmailProvider(): NotificationProvider {
    if (!this.emailProvider) {
      const realProvider = new NodemailerEmailProvider();
      this.emailProvider = realProvider.isConfigured()
        ? realProvider
        : new MockEmailProvider();

      console.log(
        `📧 Email provider: ${this.emailProvider.name} ${
          realProvider.isConfigured() ? "(REAL)" : "(MOCK)"
        }`
      );
    }
    return this.emailProvider;
  }

  /**
   * Get SMS provider - Real if configured, Mock otherwise
   */
  getSMSProvider(): NotificationProvider {
    if (!this.smsProvider) {
      const realProvider = new NetgsmSMSProvider();
      this.smsProvider = realProvider.isConfigured()
        ? realProvider
        : new MockSMSProvider();

      console.log(
        `📱 SMS provider: ${this.smsProvider.name} ${
          realProvider.isConfigured() ? "(REAL)" : "(MOCK)"
        }`
      );
    }
    return this.smsProvider;
  }

  /**
   * Get WhatsApp provider - Real if configured, Mock otherwise
   */
  getWhatsAppProvider(): NotificationProvider {
    if (!this.whatsappProvider) {
      const realProvider = new WhatsAppBusinessProvider();
      this.whatsappProvider = realProvider.isConfigured()
        ? realProvider
        : new MockWhatsAppProvider();

      console.log(
        `💬 WhatsApp provider: ${this.whatsappProvider.name} ${
          realProvider.isConfigured() ? "(REAL)" : "(MOCK)"
        }`
      );
    }
    return this.whatsappProvider;
  }

  /**
   * Get provider by channel
   */
  getProvider(channel: NotificationChannel): NotificationProvider {
    switch (channel) {
      case NotificationChannel.EMAIL:
        return this.getEmailProvider();
      case NotificationChannel.SMS:
        return this.getSMSProvider();
      case NotificationChannel.WHATSAPP:
        return this.getWhatsAppProvider();
      default:
        throw new Error(`Unknown notification channel: ${channel}`);
    }
  }

  /**
   * Reset all providers (useful for testing)
   */
  reset(): void {
    this.emailProvider = null;
    this.smsProvider = null;
    this.whatsappProvider = null;
  }
}

// Export singleton instance
export const providerFactory = new NotificationProviderFactory();
