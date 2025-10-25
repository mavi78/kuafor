## ADDED Requirements

### Requirement: date-fns ile Tarih/Saat ve TR Yerelleştirme

Tarih/saat işlemleri ve biçimlendirme için date-fns kullanılmalıdır (MUST) ve TR yerelleştirmesi varsayılan olmalıdır (MUST). Uygulama varsayılan zaman dilimi Europe/Istanbul olmalı, veritabanında zamanlar UTC saklanmalıdır (MUST).

#### Scenario: Görüntüleme ve hesaplama tutarlılığı

- WHEN randevu 14:00 Europe/Istanbul saatinde planlandığında
- THEN kullanıcı arayüzünde TR formatında gösterilir; çakışma/uygunluk hesapları date-fns ile yapılır ve DB’de UTC karşılığı saklanır
