## ADDED Requirements

### Requirement: Salon ve İletişim Ayarları

Salon adı, telefon, WhatsApp, adres, sosyal linkler (Facebook, Instagram, TikTok) yönetilebilmelidir (MUST).

#### Scenario: Ayarların güncellenmesi

- WHEN admin iletişim alanlarını düzenleyip kaydederse
- THEN bilgiler başarıyla güncellenir ve ilgili sayfalarda yansır

### Requirement: Hizmetler ve İndirim Kuralları

Hizmet CRUD’u ve önceden tanımlı indirim kuralları yönetilebilmelidir (MUST).

#### Scenario: Hizmet ekleme

- WHEN admin yeni bir hizmet tanımlar
- THEN hizmet aktif edilerek listelerde görünür

### Requirement: Bildirim Kanal Seçimi

Bildirim kanalları (Email, SMS, WhatsApp) açılıp kapatılabilmelidir (MUST).

#### Scenario: SMS kanalını devre dışı bırakma

- WHEN admin SMS kanalını kapatırsa
- THEN SMS gönderimleri durdurulur ve yalnızca açık kanallar kullanılır
