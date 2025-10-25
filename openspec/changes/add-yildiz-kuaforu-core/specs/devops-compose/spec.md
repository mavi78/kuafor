## ADDED Requirements

### Requirement: Docker Compose Baseline

Geliştirici, tek komutla (docker compose up) uygulama yığınını çalıştırabilmelidir (MUST). Yığın; App (Next.js), PostgreSQL ve Redis servislerini içermelidir (MUST). Servisler healthcheck ile doğrulanmalıdır (MUST) ve uygulama http://localhost:3000 adresinden ulaşılabilir olmalıdır (MUST).

#### Scenario: Compose up başarıyla ayağa kalkar

- WHEN geliştirici `docker compose up -d` çalıştırdığında
- THEN App, PostgreSQL ve Redis konteynerleri healthy olur ve uygulama kök URL 200 döner

### Requirement: Migration ve Seed

Compose ortamında ilk kuruluma özel olarak Prisma migration’ları uygulanmalı (MUST) ve bir seed komutu ile demo veriler yüklenebilmelidir (MUST). Seed; admin/staff/customer kullanıcıları, temel hizmetler, çalışma saatleri ve örnek randevular oluşturmalıdır (MUST). Seed çıktısı demo giriş bilgilerini loglamalıdır (MUST).

#### Scenario: Seed komutu demo verileri yükler

- WHEN geliştirici `pnpm run seed` (veya eşdeğer) çalıştırdığında
- THEN demo kullanıcılar (admin/staff/customer), hizmetler ve çalışma saatleri oluşturulur ve konsolda giriş bilgileri gösterilir

### Requirement: Ortam Değişkenleri ve Dokümantasyon

`.env.example` dosyası zorunlu ortam değişkenlerini listelemelidir (MUST) ve Compose için uygun varsayılanlar sağlanmalıdır (MUST). NextAuth, DB, Redis ve bildirim kanalı bayrakları için değerler örneklenmelidir (MUST).

#### Scenario: .env.example referansı ile kurulum

- WHEN geliştirici `.env.example`’dan `.env` oluşturduğunda
- THEN uygulama Compose ile sorunsuz başlar ve servisler gerekli bağlantıları kurar
