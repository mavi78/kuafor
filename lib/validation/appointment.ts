import { z } from "zod";

/**
 * Appointment request schema for both guest and registered users.
 * Registered users may have pre-filled name/email/phone from session.
 */
export const appointmentRequestSchema = z
  .object({
    // Customer info (required for guests, optional for registered users)
    customer_name: z
      .string()
      .min(1, { message: "Ad soyad gereklidir" })
      .min(2, { message: "Ad soyad en az 2 karakter olmalıdır" }),
    customer_phone: z
      .string()
      .min(1, { message: "Telefon numarası gereklidir" })
      .refine((val) => /^(\+90|0)?5\d{9}$/.test(val.replace(/\s/g, "")), {
        message: "Geçerli bir telefon numarası giriniz (örn: 5551234567)",
      }),
    customer_email: z
      .string()
      .email({ message: "Geçerli bir e-posta adresi giriniz" })
      .optional()
      .or(z.literal("")),

    // Appointment details
    service_ids: z
      .array(z.string())
      .min(1, { message: "En az bir hizmet seçmelisiniz" }),
    date: z
      .string()
      .min(1, { message: "Randevu tarihi gereklidir" })
      .refine(
        (val) => {
          const selectedDate = new Date(val);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return selectedDate >= today;
        },
        { message: "Geçmiş bir tarih seçemezsiniz" }
      ),
    time: z
      .string()
      .min(1, { message: "Randevu saati gereklidir" })
      .refine((val) => /^\d{2}:\d{2}$/.test(val), {
        message: "Geçerli bir saat giriniz (HH:mm)",
      }),
    people_count: z
      .number()
      .int()
      .min(1, { message: "En az 1 kişi olmalıdır" })
      .max(10, { message: "En fazla 10 kişi için randevu alabilirsiniz" }),
    notes: z
      .string()
      .max(500, { message: "Not en fazla 500 karakter olabilir" })
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    // Check if date + time is in the past
    if (data.date && data.time) {
      const [year, month, day] = data.date.split("-").map(Number);
      const [hours, minutes] = data.time.split(":").map(Number);
      const appointmentDateTime = new Date(
        year,
        month - 1,
        day,
        hours,
        minutes
      );
      const now = new Date();

      if (appointmentDateTime <= now) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Geçmiş bir tarih ve saat seçemezsiniz",
          path: ["time"],
        });
      }
    }
  });

export type AppointmentRequestInput = z.infer<typeof appointmentRequestSchema>;

/**
 * Appointment approval schema for admin/staff.
 * Used when approving or revising a PENDING appointment.
 */
export const appointmentApprovalSchema = z
  .object({
    appointment_id: z.string().min(1),
    assigned_staff_id: z
      .string()
      .min(1, { message: "Çalışan ataması gereklidir" }),
    date: z.string().min(1, { message: "Tarih gereklidir" }),
    time: z.string().min(1, { message: "Saat gereklidir" }),
    service_ids: z
      .array(z.string())
      .min(1, { message: "En az bir hizmet gereklidir" }),
    people_count: z.number().int().min(1).max(10),
    notes_internal: z
      .string()
      .max(1000, { message: "İç not en fazla 1000 karakter olabilir" })
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    // Check if date + time is in the past
    if (data.date && data.time) {
      const [year, month, day] = data.date.split("-").map(Number);
      const [hours, minutes] = data.time.split(":").map(Number);
      const appointmentDateTime = new Date(
        year,
        month - 1,
        day,
        hours,
        minutes
      );
      const now = new Date();

      if (appointmentDateTime <= now) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Geçmiş bir tarih ve saat seçemezsiniz",
          path: ["time"],
        });
      }
    }
  });

export type AppointmentApprovalInput = z.infer<
  typeof appointmentApprovalSchema
>;

/**
 * Appointment cancellation schema.
 * Includes reason for cancellation.
 */
export const appointmentCancellationSchema = z.object({
  appointment_id: z.string().min(1),
  reason: z
    .string()
    .min(1, { message: "İptal nedeni gereklidir" })
    .max(500, { message: "İptal nedeni en fazla 500 karakter olabilir" }),
});

export type AppointmentCancellationInput = z.infer<
  typeof appointmentCancellationSchema
>;

/**
 * Follow-up code lookup schema.
 * Used to check appointment status by code.
 */
export const followUpCodeSchema = z.object({
  code: z
    .string()
    .min(1, { message: "Takip kodu gereklidir" })
    .regex(/^APT-\d{4}-\d{5}$/, {
      message: "Geçersiz takip kodu formatı (APT-YYYY-NNNNN)",
    }),
});

export type FollowUpCodeInput = z.infer<typeof followUpCodeSchema>;
