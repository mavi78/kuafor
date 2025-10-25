## ADDED Requirements

### Requirement: Context7 MCP Dokümantasyon Politikası

Projede kullanılan tüm teknolojiler (UI, kimlik, veritabanı, önbellek/sıra, bildirim sağlayıcıları, dosya depolama, grafik kütüphaneleri vb.) için yeni bir bağımlılık eklenmeden veya önemli bir sürüm yükseltmesine gidilmeden önce Context7 MCP server üzerinden en güncel dokümantasyon okunmalıdır (MUST). Shadcn bileşenleri/şablonları için shadcn MCP serveri aktif olarak kullanılmalıdır (MUST).

#### Scenario: Yeni kütüphane ekleme

- WHEN geliştirici projeye yeni bir kütüphane (örn. tarih/saat, tablo, grafik) eklemek isterse
- THEN Context7 MCP üzerinden ilgili kütüphanenin dokümantasyonuna bakar ve entegrasyonu bu bilgiye göre gerçekleştirir

#### Scenario: Sağlayıcı değişimi

- WHEN SMS veya WhatsApp sağlayıcısı değiştirilecekse
- THEN Context7 MCP üzerinden sağlayıcı API ve en iyi uygulama notları incelenir; mevcut adapter arayüzüne göre entegrasyon yapılır

#### Scenario: Önemli sürüm yükseltmesi

- WHEN Next.js, Prisma veya benzeri çekirdek teknolojilerde majör sürüm yükseltilecekse
- THEN yükseltme notları ve kırıcı değişiklikler Context7 MCP referansı ile gözden geçirilir ve plan buna göre güncellenir
