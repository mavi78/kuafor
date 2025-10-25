/**
 * Notification Types and Interfaces
 *
 * Defines the structure for email, SMS, and WhatsApp notification providers.
 */

export enum NotificationChannel {
  EMAIL = "EMAIL",
  SMS = "SMS",
  WHATSAPP = "WHATSAPP",
}

export enum NotificationStatus {
  PENDING = "PENDING",
  SENT = "SENT",
  FAILED = "FAILED",
}

export type NotificationRecipient = {
  name: string;
  email?: string;
  phone?: string;
};

export type NotificationPayload = {
  to: NotificationRecipient;
  subject?: string; // For email
  body: string;
  templateId?: string;
  variables?: Record<string, any>;
};

export type NotificationResult = {
  success: boolean;
  messageId?: string;
  error?: string;
  metadata?: Record<string, any>;
};

/**
 * Base interface for all notification providers
 */
export interface NotificationProvider {
  readonly channel: NotificationChannel;
  readonly name: string;

  /**
   * Send a notification
   * @param payload - The notification content and recipient info
   * @returns Result of the send operation
   */
  send(payload: NotificationPayload): Promise<NotificationResult>;

  /**
   * Check if the provider is properly configured and ready
   */
  isConfigured(): boolean;
}

/**
 * Email-specific provider interface
 */
export interface EmailProvider extends NotificationProvider {
  channel: NotificationChannel.EMAIL;

  /**
   * Send email with HTML content
   */
  sendHtml(
    to: NotificationRecipient,
    subject: string,
    html: string
  ): Promise<NotificationResult>;
}

/**
 * SMS-specific provider interface
 */
export interface SMSProvider extends NotificationProvider {
  channel: NotificationChannel.SMS;

  /**
   * Send plain text SMS
   */
  sendSMS(to: string, message: string): Promise<NotificationResult>;
}

/**
 * WhatsApp-specific provider interface
 */
export interface WhatsAppProvider extends NotificationProvider {
  channel: NotificationChannel.WHATSAPP;

  /**
   * Send WhatsApp message using Business API
   */
  sendMessage(
    to: string,
    message: string,
    templateName?: string
  ): Promise<NotificationResult>;
}
