## ADDED Requirements

### Requirement: Değerlendirme ve Yorumlar

Müşteriler hizmeti puanlayıp yorum yazabilmelidir (MUST). Kayıtlı müşteri yorumunu düzenleyip silebilir (MUST); kayıtsız müşteri düzenleyemez/silemez (MUST). Admin her yorumda moderasyon yapabilir (MUST).

#### Scenario: Kayıtlı müşteri yorum düzenler

- WHEN kullanıcı yorumunun sahibi ve kayıtlı ise
- THEN yorumunu düzenleyebilir veya silebilir

### Requirement: Kayıtsız Müşteri Yorum Linki

Randevu tamamlandıktan sonra kayıtsız müşteriye tek kullanımlık, 5 gün geçerli özel link SMS/e-posta ile gönderilmelidir (MUST); kullanılmazsa geçersiz olur (MUST).

#### Scenario: Tek kullanımlık yorum daveti

- WHEN randevu COMPLETED olduğunda ve müşteri kayıtsız ise
- THEN 5 gün geçerli yorum linki gönderilir; kullanım sonrası link geçersiz olur
