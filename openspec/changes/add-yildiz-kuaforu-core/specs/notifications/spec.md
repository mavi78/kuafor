## ADDED Requirements

### Requirement: Bildirim Tetikleri ve Kanalları

PENDING, APPROVED, REVISED, CANCELLED durumlarında müşteri ve yöneticiye bildirim gönderilmelidir (MUST). Kanallar: Email, SMS, WhatsApp; metinler role göre farklılaştırılmalıdır (MUST). Tüm bildirimler `NotificationLog` ile kaydedilmelidir (MUST).

#### Scenario: Beklemede kayıt bildirimi

- WHEN randevu PENDING olarak kaydedildiğinde
- THEN müşteriye ve yöneticiye seçili kanallardan bildirim gönderilir ve loglanır

### Requirement: WhatsApp ve SMS Sağlayıcı Arabirimi

SMS (Netgsm/İleti Merkezi) ve WhatsApp Business API için sürücü arayüzü ve mock + gerçek provider desteği olmalıdır (MUST).

#### Scenario: Mock provider ile gönderim

- WHEN geliştirme ortamında bildirim gönderilirse
- THEN mock provider devreye girer ve sonuç loglanır

### Requirement: WebSocket Yayınları

Onay/iptal/atama gibi durumlar panelde anlık güncellenmelidir (badge/notification) (MUST).

#### Scenario: Anlık durum güncellemesi

- WHEN randevu statüsü veya ataması değişirse
- THEN WS ile ilgili panellere olay yayınlanır ve UI güncellenir
