## Context

Tek salon, tek takvimli bir kuaför işletmesi için uçtan uca yönetim çözümü hedefleniyor. Teknoloji yığını: Next.js 15 App Router, Prisma + PostgreSQL, Redis (cache/queue), WebSocket yayını, Nodemailer + SMS + WhatsApp sağlayıcıları, Tailwind v4 + shadcn/ui, RHF + Zod, Recharts. Zaman dilimi varsayılanı Europe/Istanbul; DB UTC.

## Goals / Non-Goals

- Goals: Güvenli kimlik ve RBAC, randevu yaşam döngüsü, bildirimler, ödeme ve raporlama, gerçek zamanlı güncellemeler, audit ve operasyon görünürlük.
- Non-Goals: Çoklu salon/çoklu takvim, online ödeme sağlayıcı entegrasyonu (kayıt amaçlı ödeme metotları yeterlidir), karmaşık çok-dilli destek.

## Decisions

- Auth: NextAuth v4 + JWT; bcryptjs ile parola hash; şifre sıfırlama ve davet tokenları (3 gün geçerli, tek kullanımlık) için tablo altyapısı.
- RBAC: Merkezî yetenek matrisi `lib/auth/abilities.ts` ve guard katmanı `lib/auth/guards.ts`.
- Veri Modeli: Prisma modelleri teklif edildi; DB alanları snake_case, modeller PascalCase.
- Randevu Çakışma: duration_min bazlı bitiş zamanı; çalışan ve salon düzeyi çakışma uyarısı onay ekranında.
- Çalışma Saatleri: SpecialWorkingDay, WorkingHours üzerinde önceliklidir; izinler uygunluğu etkiler.
- Bildirim: Email (Nodemailer), SMS (Netgsm) ve WhatsApp (Business API) için sürücü/adapter arayüzü + mock/real provider. SMS için başlangıç sağlayıcısı: Netgsm; interface ile İleti Merkezi’ne geçiş kolaylaştırılacak.
- WhatsApp: İşletme hesabı/şablon henüz yok → prod’da varsayılan kapalı; geliştirme/testte mock provider kullanılacak (feature flag ile aç/kapat).
- PDF Makbuz: pdfkit tercih edilecek; logolu sade şablon.
- Gerçek Zamanlılık: WS ile panel badge/notification güncellemeleri; server action sonrası yayın.
- Cron: Redis queue tabanlı planlayıcı; gün sonu beklemede kalan randevuların iptali.
- Medya: JPEG/PNG ≤ 5MB; CDN/cache stratejisi; Supabase Storage/S3 yedekleme.
- Yerelleştirme: TR, date-fns TR, TRY para.

## Risks / Trade-offs

- WhatsApp/SMS sağlayıcılarının şablon/onay süreçleri zaman alabilir → Mock provider ile geliştirme, gerçek sağlayıcıya feature flag.
- Redis ve WS katmanı prod’da işletimsel maliyet getirir → Ölçeklenme ihtiyacına göre baseline ops gözlenip gerekli optimizasyonlar yapılır.
- Cron görevlerinin yanlış yapılandırılması toplu bildirimlere yol açabilir → Rate limit, idempotent iş anahtarları.

## Migration Plan

- İlk şema migrasyonu ve seed ile demo veriler.
- Özellikler sayfa sırasına göre aşamalı yayına alınır.
- Değişiklikler onaylandıktan sonra uygulama geliştirmesi başlar, tamamlandıktan sonra arşivlenir.

## Open Questions

- SMS ve WhatsApp şablon onayı/hesap aktivasyonu zamanlaması.
