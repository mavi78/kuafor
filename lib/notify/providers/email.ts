import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import {
  EmailProvider,
  NotificationChannel,
  NotificationPayload,
  NotificationRecipient,
  NotificationResult,
} from "../types";

/**
 * NodemailerEmailProvider - Real SMTP email provider using nodemailer
 *
 * Environment variables required:
 * - SMTP_HOST: SMTP server hostname
 * - SMTP_PORT: SMTP server port
 * - SMTP_USER: SMTP authentication username
 * - SMTP_PASS: SMTP authentication password
 * - SMTP_FROM: Default sender email address
 * - SMTP_FROM_NAME: Default sender name
 */
export class NodemailerEmailProvider implements EmailProvider {
  readonly channel = NotificationChannel.EMAIL;
  readonly name = "Nodemailer SMTP";

  private transporter: Transporter | null = null;

  constructor() {
    if (this.isConfigured()) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }
  }

  isConfigured(): boolean {
    return !!(
      process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_FROM
    );
  }

  async send(payload: NotificationPayload): Promise<NotificationResult> {
    if (!this.transporter) {
      return {
        success: false,
        error: "Email provider not configured",
      };
    }

    if (!payload.to.email) {
      return {
        success: false,
        error: "Recipient email address is required",
      };
    }

    try {
      const info = await this.transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME || "Yıldız Kuaförü"}" <${
          process.env.SMTP_FROM
        }>`,
        to: `"${payload.to.name}" <${payload.to.email}>`,
        subject: payload.subject || "Bildirim",
        text: payload.body,
        html: payload.body.replace(/\n/g, "<br>"),
      });

      return {
        success: true,
        messageId: info.messageId,
        metadata: {
          accepted: info.accepted,
          rejected: info.rejected,
          response: info.response,
        },
      };
    } catch (error) {
      console.error("Email send error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async sendHtml(
    to: NotificationRecipient,
    subject: string,
    html: string
  ): Promise<NotificationResult> {
    if (!this.transporter) {
      return {
        success: false,
        error: "Email provider not configured",
      };
    }

    if (!to.email) {
      return {
        success: false,
        error: "Recipient email address is required",
      };
    }

    try {
      const info = await this.transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME || "Yıldız Kuaförü"}" <${
          process.env.SMTP_FROM
        }>`,
        to: `"${to.name}" <${to.email}>`,
        subject,
        html,
      });

      return {
        success: true,
        messageId: info.messageId,
        metadata: {
          accepted: info.accepted,
          rejected: info.rejected,
          response: info.response,
        },
      };
    } catch (error) {
      console.error("Email send error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
