import { notificationService } from "./service";
import { TEMPLATES, renderTemplate, type TemplateVariables } from "./templates";
import { NotificationChannel } from "./types";
import type { AppointmentStatus } from "@prisma/client";

/**
 * Appointment Notification Helper
 *
 * Sends notifications for appointment status changes using predefined templates.
 */

type NotificationRecipient = {
  name: string;
  email?: string;
  phone?: string;
  role: "CUSTOMER" | "ADMIN";
};

type AppointmentNotificationData = {
  status: AppointmentStatus;
  appointmentCode: string;
  customerName: string;
  appointmentDate: string;
  appointmentTime: string;
  services: string;
  staffName?: string;
  cancelReason?: string;
  notes?: string;
  totalAmount?: string;
  salonName?: string;
  salonPhone?: string;
  salonAddress?: string;
};

/**
 * Send appointment notification to a recipient
 */
export async function sendAppointmentNotification(
  recipient: NotificationRecipient,
  data: AppointmentNotificationData,
  channels: NotificationChannel[] = [NotificationChannel.EMAIL]
) {
  const { status, role } = { ...data, role: recipient.role };

  // Get appropriate templates based on status and role
  let emailTemplate, smsTemplate, whatsappTemplate;

  if (status === "PENDING") {
    emailTemplate =
      role === "CUSTOMER"
        ? TEMPLATES.PENDING.CUSTOMER.EMAIL
        : TEMPLATES.PENDING.ADMIN.EMAIL;
    smsTemplate =
      role === "CUSTOMER"
        ? TEMPLATES.PENDING.CUSTOMER.SMS
        : TEMPLATES.PENDING.ADMIN.SMS;
    whatsappTemplate =
      role === "CUSTOMER" ? TEMPLATES.PENDING.CUSTOMER.WHATSAPP : undefined;
  } else if (status === "APPROVED") {
    if (role === "ADMIN") return; // No notification for admin on approval
    emailTemplate = TEMPLATES.APPROVED.CUSTOMER.EMAIL;
    smsTemplate = TEMPLATES.APPROVED.CUSTOMER.SMS;
    whatsappTemplate = TEMPLATES.APPROVED.CUSTOMER.WHATSAPP;
  } else if (status === "REVISED") {
    if (role === "ADMIN") return; // Only customer gets revised notification
    emailTemplate = TEMPLATES.REVISED.CUSTOMER.EMAIL;
    smsTemplate = TEMPLATES.REVISED.CUSTOMER.SMS;
    whatsappTemplate = TEMPLATES.REVISED.CUSTOMER.WHATSAPP;
  } else if (status === "CANCELLED") {
    emailTemplate =
      role === "CUSTOMER"
        ? TEMPLATES.CANCELLED.CUSTOMER.EMAIL
        : TEMPLATES.CANCELLED.ADMIN.EMAIL;
    smsTemplate =
      role === "CUSTOMER" ? TEMPLATES.CANCELLED.CUSTOMER.SMS : undefined;
    whatsappTemplate =
      role === "CUSTOMER" ? TEMPLATES.CANCELLED.CUSTOMER.WHATSAPP : undefined;
  } else if (status === "COMPLETED") {
    // Payment receipt
    if (role === "ADMIN") return;
    emailTemplate = TEMPLATES.PAYMENT.CUSTOMER.EMAIL;
    smsTemplate = TEMPLATES.PAYMENT.CUSTOMER.SMS;
    whatsappTemplate = undefined;
  } else {
    return; // Unknown status
  }

  // Prepare template variables
  const trackingUrl = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }/takip?code=${data.appointmentCode}`;

  const variables: TemplateVariables = {
    customerName: data.customerName,
    appointmentCode: data.appointmentCode,
    appointmentDate: data.appointmentDate,
    appointmentTime: data.appointmentTime,
    services: data.services,
    staffName: data.staffName,
    cancelReason: data.cancelReason,
    notes: data.notes,
    totalAmount: data.totalAmount,
    trackingUrl,
    salonName: data.salonName || "Yıldız Bayan Kuaförü",
    salonPhone: data.salonPhone || "0XXX XXX XX XX",
    salonAddress: data.salonAddress || "",
  };

  // Send notifications
  const results: Record<string, any> = {};

  for (const channel of channels) {
    try {
      if (channel === NotificationChannel.EMAIL && emailTemplate) {
        if (!recipient.email) continue;

        const subject = renderTemplate(emailTemplate.subject, variables);
        const body = renderTemplate(emailTemplate.body, variables);

        results.EMAIL = await notificationService.send(
          NotificationChannel.EMAIL,
          {
            to: { name: recipient.name, email: recipient.email },
            subject,
            body,
            templateId: `${status}_${role}_EMAIL`,
          }
        );
      } else if (channel === NotificationChannel.SMS && smsTemplate) {
        if (!recipient.phone) continue;

        const message = renderTemplate(smsTemplate, variables);
        results.SMS = await notificationService.send(NotificationChannel.SMS, {
          to: { name: recipient.name, phone: recipient.phone },
          body: message,
          templateId: `${status}_${role}_SMS`,
        });
      } else if (channel === NotificationChannel.WHATSAPP && whatsappTemplate) {
        if (!recipient.phone) continue;

        const message = renderTemplate(whatsappTemplate, variables);
        results.WHATSAPP = await notificationService.send(
          NotificationChannel.WHATSAPP,
          {
            to: { name: recipient.name, phone: recipient.phone },
            body: message,
            templateId: `${status}_${role}_WHATSAPP`,
          }
        );
      }
    } catch (error) {
      console.error(`Failed to send ${channel} notification:`, error);
      results[channel] = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  return results;
}

/**
 * Send notifications to both customer and admin
 */
export async function notifyAppointmentStatusChange(
  data: AppointmentNotificationData,
  customerContact: { email?: string; phone?: string },
  adminContact: { email?: string; phone?: string },
  customerChannels: NotificationChannel[] = [NotificationChannel.EMAIL],
  adminChannels: NotificationChannel[] = [NotificationChannel.EMAIL]
) {
  const results: {
    customer: Record<string, any> | undefined;
    admin: Record<string, any> | undefined;
  } = {
    customer: undefined,
    admin: undefined,
  };

  // Notify customer
  if (customerContact.email || customerContact.phone) {
    results.customer = await sendAppointmentNotification(
      {
        name: data.customerName,
        email: customerContact.email,
        phone: customerContact.phone,
        role: "CUSTOMER",
      },
      data,
      customerChannels
    );
  }

  // Notify admin (only for PENDING and CANCELLED)
  if (
    (data.status === "PENDING" || data.status === "CANCELLED") &&
    (adminContact.email || adminContact.phone)
  ) {
    results.admin = await sendAppointmentNotification(
      {
        name: "Admin",
        email: adminContact.email,
        phone: adminContact.phone,
        role: "ADMIN",
      },
      data,
      adminChannels
    );
  }

  return results;
}
