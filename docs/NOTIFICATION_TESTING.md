# Bildirim Sistemi Test Kılavuzu

## Test Yöntemleri

### 1. Web Arayüzü ile Test (Önerilen)

Admin panelinden test sayfasına erişin:

```
http://localhost:3000/test-bildirim
```

Bu sayfada:

- ✅ Email, SMS veya WhatsApp kanalını seçin
- ✅ Alıcı bilgilerini girin
- ✅ Mesaj içeriğini yazın
- ✅ "Bildirim Gönder" butonuna tıklayın
- ✅ Sonucu ekranda görün + terminal konsolunu kontrol edin

### 2. API ile Test (cURL)

#### Email Testi

```bash
curl -X POST http://localhost:3000/api/test/notify \
  -H "Content-Type: application/json" \
  -d '{
    "channel": "EMAIL",
    "to": {
      "name": "Test Kullanıcı",
      "email": "test@example.com"
    },
    "subject": "Test Email",
    "body": "Bu bir test mesajıdır."
  }'
```

#### SMS Testi

```bash
curl -X POST http://localhost:3000/api/test/notify \
  -H "Content-Type: application/json" \
  -d '{
    "channel": "SMS",
    "to": {
      "name": "Test",
      "phone": "5551234567"
    },
    "body": "Bu bir test SMS mesajıdır."
  }'
```

#### WhatsApp Testi

```bash
curl -X POST http://localhost:3000/api/test/notify \
  -H "Content-Type: application/json" \
  -d '{
    "channel": "WHATSAPP",
    "to": {
      "name": "Test",
      "phone": "905551234567"
    },
    "body": "Bu bir test WhatsApp mesajıdır."
  }'
```

### 3. PowerShell ile Test

```powershell
# Email Testi
Invoke-RestMethod -Uri "http://localhost:3000/api/test/notify" `
  -Method POST `
  -ContentType "application/json" `
  -Body (@{
    channel = "EMAIL"
    to = @{
      name = "Test Kullanıcı"
      email = "test@example.com"
    }
    subject = "Test Email"
    body = "Bu bir test mesajıdır."
  } | ConvertTo-Json)
```

## Mock vs Real Provider

### Mock Provider (Varsayılan)

- ✅ Kurulum gerektirmez
- ✅ Terminal konsoluna yazdırır
- ✅ Her zaman başarılı döner
- ✅ Geliştirme ve test için ideal

Mock çıktı örneği:

```
📧 [MOCK EMAIL]
To: Test Kullanıcı <test@example.com>
Subject: Test Bildirimi
Body: Bu bir test mesajıdır.
---
```

### Real Provider (Opsiyonel)

.env dosyasına ekleyin:

#### Email (SMTP)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
SMTP_FROM_NAME=Yıldız Kuaförü
```

#### SMS (Netgsm)

```env
NETGSM_USER=your-username
NETGSM_PASS=your-password
NETGSM_HEADER=YILDIZBEAUTY
```

#### WhatsApp (Business API)

```env
WHATSAPP_API_TOKEN=your-access-token
WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id
```

## Provider Durumunu Kontrol Etme

Server başlatıldığında konsola yazdırılır:

```
📧 Email provider: Mock Email (MOCK)
📱 SMS provider: Mock SMS (MOCK)
💬 WhatsApp provider: Mock WhatsApp (MOCK)
```

Veya konfigürasyon varsa:

```
📧 Email provider: Nodemailer SMTP (REAL)
📱 SMS provider: Netgsm SMS (REAL)
💬 WhatsApp provider: WhatsApp Business API (REAL)
```

## Test Senaryoları

### Senaryo 1: Email Bildirimi

1. Email kanalını seç
2. test@example.com adresini gir
3. "Test Bildirimi" konusunu gir
4. Mesaj yaz ve gönder
5. Terminal konsolunda mock çıktısını gör

### Senaryo 2: SMS Bildirimi

1. SMS kanalını seç
2. 5551234567 numarasını gir (başında 0 yok)
3. Mesaj yaz ve gönder
4. Terminal konsolunda SMS detaylarını gör

### Senaryo 3: WhatsApp Bildirimi

1. WhatsApp kanalını seç
2. 905551234567 numarasını gir
3. Mesaj yaz ve gönder
4. Terminal konsolunda WhatsApp detaylarını gör

### Senaryo 4: Çoklu Kanal Gönderimi

```typescript
import { notificationService } from "@/lib/notify";
import { NotificationChannel } from "@/lib/notify/types";

const result = await notificationService.sendMultiChannel(
  [
    NotificationChannel.EMAIL,
    NotificationChannel.SMS,
    NotificationChannel.WHATSAPP,
  ],
  {
    to: {
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      phone: "5551234567",
    },
    subject: "Randevunuz Onaylandı",
    body: "Merhaba Ahmet, 25 Ekim 2025 14:00 randevunuz onaylanmıştır.",
  }
);

console.log(result);
// {
//   EMAIL: { success: true, messageId: "..." },
//   SMS: { success: true, messageId: "..." },
//   WHATSAPP: { success: true, messageId: "..." }
// }
```

## Sorun Giderme

### Email gönderilmiyor

- SMTP bilgilerini kontrol edin
- Gmail kullanıyorsanız "Uygulama Şifresi" oluşturun
- Port 587 (TLS) veya 465 (SSL) deneyin

### SMS gönderilmiyor

- Netgsm kredisi kontrolü yapın
- NETGSM_HEADER max 11 karakter olmalı
- Telefon numarası formatı: 5xxxxxxxxx (başında 0, +90 yok)

### WhatsApp gönderilmiyor

- Business API token'ını kontrol edin
- Phone Number ID doğru mu?
- Telefon numarası formatı: 90xxxxxxxxxx (başında + yok)

## Kod Örnekleri

### Service'i doğrudan kullanma

```typescript
import { notificationService } from "@/lib/notify";

// Email gönder
await notificationService.sendEmail(
  { name: "Müşteri", email: "musteri@example.com" },
  "Randevu Onayı",
  "Randevunuz onaylandı."
);

// SMS gönder
await notificationService.sendSMS("5551234567", "Randevunuz onaylandı.");

// WhatsApp gönder
await notificationService.sendWhatsApp(
  "905551234567",
  "Randevunuz onaylandı.",
  "randevu_onay_template" // Opsiyonel template
);
```

### Provider'ı manuel seçme

```typescript
import { providerFactory } from "@/lib/notify";
import { NotificationChannel } from "@/lib/notify/types";

const emailProvider = providerFactory.getProvider(NotificationChannel.EMAIL);
const result = await emailProvider.send({
  to: { name: "Test", email: "test@example.com" },
  subject: "Test",
  body: "Mesaj",
});
```
