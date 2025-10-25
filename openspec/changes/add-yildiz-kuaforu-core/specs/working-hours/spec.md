## ADDED Requirements

### Requirement: Çalışma Saatleri Kontrolü

Müşteri arayüzünde seçilen tarih/saat salon çalışma saatleri dışındaysa kullanıcı uyarılmalı (MUST) ve arama/WhatsApp kısa yolu sunulmalıdır (MUST).

#### Scenario: Çalışma saatleri dışında uyarı

- WHEN müşteri çalışma saatleri dışında bir saat seçerse
- THEN “Çalışma saatlerimiz dışında. Lütfen iletişime geçin.” uyarısı ve arama/WhatsApp kısayolları görünür

### Requirement: Özel Günler ve Öncelik

Özel gün çalışma saatleri, normal çalışma saatlerinin üzerinde önceliklidir (MUST).

#### Scenario: Özel gün önceliği

- WHEN tarih, SpecialWorkingDay ile tanımlı ise
- THEN uygunluk ve uyarılar SpecialWorkingDay tanımına göre değerlendirilir

### Requirement: Çalışan İzinleri

Onay aşamasında çalışan izinleri uygunluğu etkiler (MUST) ve izinli çalışana randevu atanmaya çalışıldığında uyarı verilmelidir (MUST); admin isterse onaylayabilir (MUST).

#### Scenario: İzin çakışması uyarısı

- WHEN izinli çalışana atama yapılmak istenirse
- THEN sistem uyarı verir ve admin onayı ile işlem tamamlanabilir
