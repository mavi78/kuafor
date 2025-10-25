## ADDED Requirements

### Requirement: Kimlik Doğrulama (NextAuth v4, JWT)

Sistem, kullanıcıların e-posta/şifre ile giriş/kayıt olmasını MUST sağlar; şifreler bcryptjs ile hashlenmelidir (MUST). Oturumlar JWT tabanlı olmalıdır (MUST).

#### Scenario: Başarılı giriş

- WHEN geçerli e-posta ve parola girildiğinde
- THEN kullanıcıya JWT oturumu oluşturulur ve rolüyle birlikte oturum bağlamı döner

#### Scenario: Geçersiz giriş

- WHEN hatalı parola girildiğinde
- THEN oturum reddedilir ve güvenli bir hata mesajı gösterilir

### Requirement: Şifre Sıfırlama (E-posta Bağlantısı)

Kullanıcılar, e-posta üzerinden gönderilen tek kullanımlık bağlantı ile şifrelerini sıfırlayabilmelidir (MUST). Token 3 gün geçerli olmalıdır (MUST).

#### Scenario: Geçerli token ile sıfırlama

- WHEN kullanıcı geçerli ve süresi dolmamış token ile yeni parolasını belirlediğinde
- THEN parola bcryptjs ile hashlenir ve token geçersiz kılınır

#### Scenario: Süresi dolmuş token

- WHEN token 3 günü geçmişse
- THEN işlem reddedilir ve kullanıcıya yeni bağlantı talep etmesi önerilir

### Requirement: Davetli Kayıt

Admin, 3 gün geçerli tek kullanımlık davet bağlantısı oluşturabilmelidir (MUST); bağlantı kullanıldığında geçersiz olmalıdır (MUST).

#### Scenario: Davet ile kayıt

- WHEN kullanıcı davet bağlantısı ile kayıt formunu tamamladığında
- THEN hesap oluşturulur, rol atanır ve davet tokeni tek kullanımlık olarak tüketilir
