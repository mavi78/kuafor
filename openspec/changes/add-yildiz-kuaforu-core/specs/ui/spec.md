## ADDED Requirements

### Requirement: Tema ve Animasyonlar

Tema modern, renk uyumlu ve bayan kuaförüne uygun görsel dile sahip olmalıdır (MUST). UI bileşenlerinde hafif ve performanslı animasyonlar kullanılmalıdır (MUST) ve `prefers-reduced-motion` kullanıcı tercihi desteklenmelidir (MUST).

#### Scenario: Hafif giriş animasyonları

- WHEN ana sayfa ve ana bileşenler (navbar, CTA, kartlar) yüklendiğinde
- THEN hafif fade/slide benzeri animasyonlar çalışır ve `prefers-reduced-motion` etkinse animasyonlar devre dışı kalır

### Requirement: TailwindCSS ve shadcn/ui Kullanımı

Stil altyapısı TailwindCSS v4 ile sağlanmalıdır (MUST). Bileşenler için shadcn/ui kullanımı tercih edilmeli ve proje boyunca tutarlı bir tasarım sistemi uygulanmalıdır (MUST).

#### Scenario: UI bileşeni ekleme

- WHEN yeni bir buton veya kart bileşeni gerektiğinde
- THEN shadcn/ui bileşenleri temel alınır ve Tailwind yardımcı sınıflarıyla tema tutarlılığı korunur

### Requirement: Geliştirme Dokümantasyon Kaynağı (MCP)

Global MCP dokümantasyon politikasına ek olarak (bkz. `specs/mcp-usage/spec.md`), UI tarafında yeni bir framework/kütüphane entegre edilmeden önce en güncel dokümantasyon Context7 MCP server üzerinden okunmalı (MUST) ve shadcn MCP serveri aktif olarak kullanılmalıdır (MUST).

#### Scenario: Kütüphane entegrasyonu öncesi doğrulama

- WHEN geliştirici yeni bir UI kütüphanesi eklemek isterse
- THEN Context7 MCP üzerinden güncel dokümantasyonu inceler ve shadcn MCP ile ilgili bileşen/reçete mevcutsa onu kullanır
