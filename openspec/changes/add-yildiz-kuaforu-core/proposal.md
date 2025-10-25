## Why

Yıldız Bayan Kuaförü için tek bir Next.js 15+ tam-yığın uygulamada salon yönetimi, randevu akışı, finans ve bildirimler gibi uçtan uca işlevler henüz tanımlı bir OpenSpec kapsamında bulunmuyor. Bu değişiklik, MVP kapsamını ve kabul kriterlerini netleştirerek uygulama geliştirmesini spesifik, doğrulanabilir gereksinimlere bağlar.

## What Changes

- ADDED: Kimlik ve RBAC (NextAuth v4 JWT, roller: Admin, Çalışan, Müşteri; şifre sıfırlama; davet akışı)
- ADDED: Randevu yaşam döngüsü (beklemede → onay/revize/iptal → tamamlandı), takip kodu, çakışma kontrolü
- ADDED: Çalışma saatleri, özel günler, izinler ve süre bazlı uygunluk/çakışma mantığı
- ADDED: Bildirim kanalları (Email, SMS, WhatsApp, WS) ve şablon/lojistik
- ADDED: Ödeme sayfası ve ödeme kaydı; makbuz/fiş PDF; tamamlanma akışı
- ADDED: Değerlendirme/yorum akışı (kayıtlı/kayıtsız), tek kullanımlık misafir yorum linki
- ADDED: Galeri yönetimi (JPEG/PNG ≤ 5MB)
- ADDED: Finansal ve operasyonel raporlar + CSV dışa aktarım
- ADDED: Audit log ve Notification log
- ADDED: Gerçek zamanlılık (WebSocket) ve cron görevleri (otomatik iptal)
- ADDED: Medya yedekleme (Supabase Storage veya S3) ve veritabanı günlük dump
- ADDED: Ayarlar (iletişim/sosyal linkler, hizmetler vb.) ve yerelleştirme kuralları

## Impact

- Affected specs: auth, rbac, appointments, working-hours, notifications, realtime, payments, reviews, gallery, reports, settings, cron, media-backup, audit
- Affected code (future):
  - Next.js 15 App Router (route handlers, server actions)
  - Prisma + PostgreSQL, Redis (cache/queue), WebSocket katmanı
  - Nodemailer, SMS provider (Netgsm/İleti Merkezi) ve WhatsApp Business API sürücüleri
  - Tailwind v4 + shadcn/ui, @tanstack/react-table, RHF + Zod, Recharts
  - date-fns (Europe/Istanbul), NextAuth, bcryptjs

## Approval

- Status: Approved
- Approver: Nazif AÇIKGÖZ (acikgoz027@gmail.com)
- Date: 2025-10-24
- Notes: Stage 2'ye geçilebilir; tüm teknoloji gereksinimleri netleştirildi.
