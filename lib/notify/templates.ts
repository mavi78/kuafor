/**
 * Notification Templates
 *
 * Turkish language templates for appointment status notifications.
 * Templates support variable interpolation for personalization.
 */

export type TemplateVariables = {
  customerName: string;
  appointmentCode: string;
  appointmentDate: string;
  appointmentTime: string;
  services: string;
  staffName?: string;
  cancelReason?: string;
  notes?: string;
  totalAmount?: string;
  trackingUrl?: string;
  salonName?: string;
  salonPhone?: string;
  salonAddress?: string;
};

/**
 * Template renderer - replaces {{variable}} placeholders
 */
export function renderTemplate(
  template: string,
  variables: TemplateVariables
): string {
  let result = template;

  Object.entries(variables).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      const regex = new RegExp(`{{${key}}}`, "g");
      result = result.replace(regex, String(value));
    }
  });

  // Remove unused placeholders
  result = result.replace(/{{[^}]+}}/g, "");

  return result;
}

/**
 * PENDING - Appointment created and waiting for approval
 */
export const PENDING_CUSTOMER_EMAIL = {
  subject: "Randevu Talebiniz Alındı - {{appointmentCode}}",
  body: `Merhaba {{customerName}},

Randevu talebiniz başarıyla alınmıştır.

📋 Randevu Detayları:
• Takip Kodu: {{appointmentCode}}
• Tarih: {{appointmentDate}}
• Saat: {{appointmentTime}}
• Hizmetler: {{services}}

Randevunuz en kısa sürede değerlendirilecek ve size bilgi verilecektir.

Randevunuzu takip etmek için: {{trackingUrl}}

Teşekkür ederiz,
{{salonName}}
{{salonPhone}}`,
};

export const PENDING_CUSTOMER_SMS = `{{salonName}}: Randevu talebiniz alindi. Takip kodu: {{appointmentCode}}. Onay icin tarafimizdan dönüs yapilacaktir.`;

export const PENDING_CUSTOMER_WHATSAPP = `Merhaba {{customerName}},

Randevu talebiniz alındı! 

📋 {{appointmentCode}}
📅 {{appointmentDate}} {{appointmentTime}}
💇 {{services}}

En kısa sürede onaylayıp size dönüş yapacağız.

{{salonName}}`;

export const PENDING_ADMIN_EMAIL = {
  subject: "Yeni Randevu Talebi - {{appointmentCode}}",
  body: `Yeni bir randevu talebi alındı.

📋 Randevu Detayları:
• Takip Kodu: {{appointmentCode}}
• Müşteri: {{customerName}}
• Tarih: {{appointmentDate}}
• Saat: {{appointmentTime}}
• Hizmetler: {{services}}
{{notes}}

Randevuyu onaylamak veya düzenlemek için panele giriş yapın.

{{salonName}}`,
};

export const PENDING_ADMIN_SMS = `Yeni randevu: {{customerName}}, {{appointmentDate}} {{appointmentTime}}. Kod: {{appointmentCode}}`;

/**
 * APPROVED - Appointment confirmed by staff/admin
 */
export const APPROVED_CUSTOMER_EMAIL = {
  subject: "✅ Randevunuz Onaylandı - {{appointmentCode}}",
  body: `Merhaba {{customerName}},

Randevunuz onaylanmıştır! 🎉

📋 Randevu Detayları:
• Takip Kodu: {{appointmentCode}}
• Tarih: {{appointmentDate}}
• Saat: {{appointmentTime}}
• Hizmetler: {{services}}
• Sorumlu Personel: {{staffName}}

Randevu saatinizden önce hazır olmanızı rica ederiz.

İptal veya değişiklik için: {{trackingUrl}}

Görüşmek üzere,
{{salonName}}
{{salonPhone}}
{{salonAddress}}`,
};

export const APPROVED_CUSTOMER_SMS = `{{salonName}}: Randevunuz onaylandi! {{appointmentDate}} {{appointmentTime}}. Personel: {{staffName}}. Gorusmek uzere!`;

export const APPROVED_CUSTOMER_WHATSAPP = `✅ Harika haber {{customerName}}!

Randevunuz onaylandı! 

📋 {{appointmentCode}}
📅 {{appointmentDate}} {{appointmentTime}}
💇 {{services}}
👤 {{staffName}}

Sizi görmek için sabırsızlanıyoruz! 

📍 {{salonAddress}}
📞 {{salonPhone}}

{{salonName}}`;

/**
 * REVISED - Appointment date/time/services changed
 */
export const REVISED_CUSTOMER_EMAIL = {
  subject: "Randevu Değişikliği - {{appointmentCode}}",
  body: `Merhaba {{customerName}},

Randevunuzda değişiklik yapılmıştır.

📋 Güncel Randevu Detayları:
• Takip Kodu: {{appointmentCode}}
• Yeni Tarih: {{appointmentDate}}
• Yeni Saat: {{appointmentTime}}
• Hizmetler: {{services}}
• Sorumlu Personel: {{staffName}}

{{notes}}

Randevunuzu görüntülemek için: {{trackingUrl}}

{{salonName}}
{{salonPhone}}`,
};

export const REVISED_CUSTOMER_SMS = `{{salonName}}: Randevunuz guncellendi. Yeni tarih: {{appointmentDate}} {{appointmentTime}}. Detaylar icin: {{trackingUrl}}`;

export const REVISED_CUSTOMER_WHATSAPP = `Merhaba {{customerName}},

Randevunuzda değişiklik yapıldı.

📋 {{appointmentCode}}
📅 YENİ: {{appointmentDate}} {{appointmentTime}}
💇 {{services}}
👤 {{staffName}}

{{notes}}

{{salonName}}`;

/**
 * CANCELLED - Appointment cancelled by customer or staff
 */
export const CANCELLED_CUSTOMER_EMAIL = {
  subject: "Randevu İptali - {{appointmentCode}}",
  body: `Merhaba {{customerName}},

Randevunuz iptal edilmiştir.

📋 İptal Edilen Randevu:
• Takip Kodu: {{appointmentCode}}
• Tarih: {{appointmentDate}}
• Saat: {{appointmentTime}}
• İptal Nedeni: {{cancelReason}}

Yeni bir randevu oluşturmak için web sitemizi ziyaret edebilirsiniz.

{{salonName}}
{{salonPhone}}`,
};

export const CANCELLED_CUSTOMER_SMS = `{{salonName}}: Randevunuz iptal edildi. Neden: {{cancelReason}}. Yeni randevu icin bizi arayin.`;

export const CANCELLED_CUSTOMER_WHATSAPP = `Merhaba {{customerName}},

Randevunuz iptal edildi.

📋 {{appointmentCode}}
📅 {{appointmentDate}} {{appointmentTime}}
❌ İptal Nedeni: {{cancelReason}}

Başka bir tarihte görüşmek dileğiyle,
{{salonName}}
{{salonPhone}}`;

export const CANCELLED_ADMIN_EMAIL = {
  subject: "Randevu İptal Edildi - {{appointmentCode}}",
  body: `Randevu iptal edildi.

📋 Randevu Detayları:
• Takip Kodu: {{appointmentCode}}
• Müşteri: {{customerName}}
• Tarih: {{appointmentDate}}
• Saat: {{appointmentTime}}
• İptal Nedeni: {{cancelReason}}

{{salonName}}`,
};

/**
 * PAYMENT RECEIPT - Sent after payment is completed
 */
export const PAYMENT_RECEIPT_EMAIL = {
  subject: "Ödeme Fişi - {{appointmentCode}}",
  body: `Merhaba {{customerName}},

Ödemeniz başarıyla alınmıştır. 

📋 Randevu: {{appointmentCode}}
📅 Tarih: {{appointmentDate}}
💰 Toplam Tutar: {{totalAmount}}

Hizmetler:
{{services}}

Bizi tercih ettiğiniz için teşekkür ederiz!

{{salonName}}
{{salonPhone}}`,
};

export const PAYMENT_RECEIPT_SMS = `{{salonName}}: Odemeniz alindi. Tutar: {{totalAmount}}. Tesekkurler!`;

/**
 * Template registry for easy access
 */
export const TEMPLATES = {
  PENDING: {
    CUSTOMER: {
      EMAIL: PENDING_CUSTOMER_EMAIL,
      SMS: PENDING_CUSTOMER_SMS,
      WHATSAPP: PENDING_CUSTOMER_WHATSAPP,
    },
    ADMIN: {
      EMAIL: PENDING_ADMIN_EMAIL,
      SMS: PENDING_ADMIN_SMS,
    },
  },
  APPROVED: {
    CUSTOMER: {
      EMAIL: APPROVED_CUSTOMER_EMAIL,
      SMS: APPROVED_CUSTOMER_SMS,
      WHATSAPP: APPROVED_CUSTOMER_WHATSAPP,
    },
  },
  REVISED: {
    CUSTOMER: {
      EMAIL: REVISED_CUSTOMER_EMAIL,
      SMS: REVISED_CUSTOMER_SMS,
      WHATSAPP: REVISED_CUSTOMER_WHATSAPP,
    },
  },
  CANCELLED: {
    CUSTOMER: {
      EMAIL: CANCELLED_CUSTOMER_EMAIL,
      SMS: CANCELLED_CUSTOMER_SMS,
      WHATSAPP: CANCELLED_CUSTOMER_WHATSAPP,
    },
    ADMIN: {
      EMAIL: CANCELLED_ADMIN_EMAIL,
    },
  },
  PAYMENT: {
    CUSTOMER: {
      EMAIL: PAYMENT_RECEIPT_EMAIL,
      SMS: PAYMENT_RECEIPT_SMS,
    },
  },
} as const;
