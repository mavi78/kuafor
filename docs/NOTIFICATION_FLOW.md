# Bildirim Akışları - Özet

## 🔔 Otomatik Bildirim Tetikleme Noktaları

### 1. Randevu Oluşturulduğunda (PENDING)

**Endpoint:** `POST /api/appointments/create`

**Tetiklenme:** Müşteri yeni randevu talebi oluşturduğunda

**Bildirimler:**

- ✅ **Müşteriye:**

  - Kanallar: Email + SMS
  - Şablon: `PENDING_CUSTOMER_EMAIL` / `PENDING_CUSTOMER_SMS`
  - İçerik: "Randevu talebiniz alındı, takip kodu: APT-2025-XXXXX"

- ✅ **Admin'e:**
  - Kanallar: Email
  - Şablon: `PENDING_ADMIN_EMAIL`
  - İçerik: "Yeni randevu talebi: [Müşteri Adı], [Tarih/Saat]"

**Alıcı Bilgileri:**

- ✅ **Veritabanından otomatik alınıyor** (ilk ADMIN rolündeki kullanıcı)
- Kod: `getPrimaryAdminContact()` → `users` tablosundan
- Artık `.env` dosyasında tanımlamaya gerek yok!

---

### 2. Randevu Onaylandığında (APPROVED)

**Endpoint:** `POST /api/appointments/approve`

**Tetiklenme:** Admin/Staff randevuyu onayladığında

**Bildirimler:**

- ✅ **Müşteriye:**
  - Kanallar: Email + SMS
  - Şablon: `APPROVED_CUSTOMER_EMAIL` / `APPROVED_CUSTOMER_SMS`
  - İçerik: "Randevunuz onaylandı! Personel: [İsim], Tarih: [Tarih]"

**Not:** Admin'e bildirim gitmez

---

### 3. Randevu Revize Edildiğinde (REVISED)

**Endpoint:** `POST /api/appointments/approve`

**Tetiklenme:** Admin/Staff onaylanmış randevunun tarih/saat/personelini değiştirdiğinde

**Otomatik Algılama:**

```typescript
const isRevised =
  appointment.status === "APPROVED" &&
  (appointment.date !== validatedData.date ||
    appointment.time !== validatedData.time ||
    appointment.assigned_staff_id !== validatedData.assigned_staff_id);
```

**Bildirimler:**

- ✅ **Müşteriye:**
  - Kanallar: Email + SMS
  - Şablon: `REVISED_CUSTOMER_EMAIL` / `REVISED_CUSTOMER_SMS`
  - İçerik: "Randevunuzda değişiklik yapıldı. Yeni tarih: [Tarih]"

---

### 4. Admin/Staff Randevuyu İptal Ettiğinde (CANCELLED)

**Endpoint:** `POST /api/appointments/cancel`

**Tetiklenme:** Admin veya Staff üyesi randevuyu iptal ettiğinde

**Bildirimler:**

- ✅ **Müşteriye:**
  - Kanallar: Email + SMS
  - Şablon: `CANCELLED_CUSTOMER_EMAIL` / `CANCELLED_CUSTOMER_SMS`
  - İçerik: "Randevunuz iptal edildi. Neden: [İptal Nedeni]"

---

### 5. Müşteri Randevuyu İptal Ettiğinde (CANCELLED)

**Endpoint:** `POST /api/appointments/cancel-by-customer`

**Tetiklenme:** Müşteri web üzerinden randevuyu iptal ettiğinde (12 saat kuralı)

**Bildirimler:**

- ✅ **Admin'e:**
  - Kanallar: Email
  - Şablon: `CANCELLED_ADMIN_EMAIL`
  - İçerik: "Müşteri randevuyu iptal etti: [Müşteri], [Tarih], Neden: [Neden]"

**Not:** Müşteriye bildirim gitmez (zaten kendisi iptal etti)

---

## 📊 Bildirim Kanalları ve Öncelikler

### Müşteri Bildirimleri

- **Email + SMS** → Yüksek öncelik (PENDING, APPROVED, REVISED, CANCELLED)
- **WhatsApp** → Şimdilik pasif (gelecekte eklenebilir)

### Admin Bildirimleri

- **Email** → Standart (PENDING, CANCELLED by customer)
- **SMS** → Opsiyonel (acil durumlar için eklenebilir)

---

## 🔧 Konfigürasyon

### Gerekli .env Değişkenleri

```env
# Admin Contact - ARTIK GEREKLİ DEĞİL (veritabanından alınıyor)
# ADMIN_NOTIFICATION_EMAIL=admin@yildizkuaforu.com
# ADMIN_NOTIFICATION_PHONE=5551234567

# App URL (tracking links için)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email Provider (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
SMTP_FROM_NAME=Yıldız Kuaförü

# SMS Provider (Netgsm) - Opsiyonel
NETGSM_USER=username
NETGSM_PASS=password
NETGSM_HEADER=YILDIZ

# WhatsApp - Opsiyonel
WHATSAPP_API_TOKEN=your-token
WHATSAPP_PHONE_NUMBER_ID=your-id
```

---

## 📝 Bildirim Logging

**Tüm bildirimler otomatik olarak `notification_logs` tablosuna kaydedilir:**

```sql
SELECT * FROM notification_logs
ORDER BY created_at DESC
LIMIT 50;
```

**API Endpoint:**

```bash
GET /api/notifications/logs?limit=50&stats=true
```

**Response:**

```json
{
  "logs": [...],
  "count": 50,
  "stats": {
    "total": 1250,
    "success": 1200,
    "failure": 50,
    "successRate": "96.00",
    "byChannel": {
      "EMAIL": 800,
      "SMS": 400,
      "WHATSAPP": 50
    }
  }
}
```

---

## 🧪 Test Etme

### 1. Mock Provider ile Test (Varsayılan)

```bash
# Terminal konsolunda bildirim çıktılarını görürsünüz
📧 [MOCK EMAIL]
To: Ahmet Yılmaz <ahmet@example.com>
Subject: ✅ Randevunuz Onaylandı - APT-2025-00001
Body: Merhaba Ahmet, randevunuz onaylanmıştır...
---
```

### 2. Web Arayüzü ile Test

```
http://localhost:3000/test-bildirim
```

### 3. Gerçek Randevu Flow ile Test

**Senaryo 1: Yeni Randevu**

1. `/randevu` → Randevu oluştur
2. Kontrol: Müşteri email + Admin email gelmeli
3. Terminal: Mock provider çıktısı görünmeli

**Senaryo 2: Onay**

1. Admin panel → Randevuyu onayla
2. Kontrol: Müşteri email + SMS gelmeli
3. Database: `notification_logs` tablosunda kayıt olmalı

**Senaryo 3: İptal**

1. Müşteri: `/takip` → Randevuyu iptal et
2. Kontrol: Admin email gelmeli
3. Log: `template_key: "CANCELLED_ADMIN_EMAIL"`

---

## 🚨 Hata Yönetimi

**Önemli:** Bildirim hataları randevu işlemlerini ENGELLEMEZ!

```typescript
notifyAppointmentStatusChange(...)
  .catch((error) => {
    console.error("Failed to send notifications:", error);
    // Hata loglanır ama request başarılı dönebilir
  });
```

**Neden?**

- Randevu oluşturulması/onaylanması kritik işlemdir
- Email/SMS servisi çökse bile randevu sistemi çalışmalı
- Bildirimler best-effort basis (en iyi çaba)
- Tüm denemeler `notification_logs`'a kaydedilir

---

## ✅ Tamamlanan Özellikler

- [x] Provider sistemi (Email, SMS, WhatsApp)
- [x] Mock ve Real provider desteği
- [x] Türkçe şablonlar (5 durum x 2 rol)
- [x] Otomatik logging (NotificationLog)
- [x] Create endpoint entegrasyonu
- [x] Approve/Revise endpoint entegrasyonu
- [x] Cancel (admin) endpoint entegrasyonu
- [x] Cancel (customer) endpoint entegrasyonu
- [x] Test UI ve API'leri
- [x] Dokümantasyon

---

## 🔮 Gelecek İyileştirmeler

- [ ] WebSocket real-time bildirimleri (Task 4.4)
- [ ] WhatsApp template mesaj desteği
- [ ] SMS batch gönderim
- [ ] Email queue sistemi (Redis)
- [ ] Bildirim tercihleri (müşteri hangi kanalı seçebilir)
- [ ] Bildirim istatistikleri dashboard'u
- [ ] Retry mekanizması başarısız bildirimler için
