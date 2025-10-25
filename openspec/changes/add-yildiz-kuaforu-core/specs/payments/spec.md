## ADDED Requirements

### Requirement: Ödeme Sayfası ve Kayıt

“Tamamlandı” durumuna geçerken ödeme sayfasına yönlendirilmelidir (MUST). Satırlar (hizmet/müşteri), fiyatlar, önceden tanımlı indirimler, manuel indirim ekleme desteklenmelidir (MUST). Ödeme yöntemleri: Kredi Kartı/Havale-EFT/Nakit (kayıt amaçlı) desteklenmelidir (MUST). Kayıt sonrası Appointment → COMPLETED olmalıdır (MUST).

#### Scenario: Ödeme kaydı ile tamamlanma

- WHEN ödeme sayfası kaydedildiğinde
- THEN `Payment` kaydı oluşturulur ve randevu COMPLETED durumuna geçer

### Requirement: Makbuz/Fiş PDF ve İletim

Ödeme sonrası makbuz/fiş PDF oluşturulmalı (MUST) ve e-posta (veya paylaşılan yöntem) ile iletilmelidir (MUST).

#### Scenario: PDF üretimi ve e-posta gönderimi

- WHEN ödeme tamamlandığında
- THEN makbuz PDF üretilir, müşteriye e-postayla iletilir ve işlem loglanır
