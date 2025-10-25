## ADDED Requirements

### Requirement: Roller ve Yetkiler

Sistem, roller (ADMIN, STAFF, CUSTOMER) ve bu rollere bağlı yetenek matrisini MERKEZİ olarak sağlamalıdır (MUST). Yetkisiz işlemler otomatik reddedilmeli (MUST) ve kullanıcıya uygun yetki mesajı gösterilmelidir (MUST).

#### Scenario: Yetkisiz işlem reddi

- WHEN CUSTOMER rolü yönetim paneli randevu onayını denediğinde
- THEN işlem reddedilir ve yetki uyarısı gösterilir

### Requirement: Guard Katmanları

RBAC kontrolleri için `lib/auth/guards.ts` altında ihlal senaryoları merkezi olarak tanımlanmalı (MUST) ve route/middleware seviyesinde uygulanmalıdır (MUST).

#### Scenario: Guard ile korunan rota

- WHEN yetkisiz kullanıcı korunan bir route handler'a erişmeye çalıştığında
- THEN guard kontrolü isteği durdurur ve 403 döner
