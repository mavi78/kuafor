## ADDED Requirements

### Requirement: Otomatik İptal Cron'u

Günü geçmiş ama onaylanmamış (PENDING) randevular otomatik iptal edilmelidir (MUST). İptal edilen müşteriye, admin ve atanmış çalışana bildirim gönderilmelidir (MUST).

#### Scenario: Gün sonu otomatik iptal

- WHEN cron görevi çalıştığında ve tarih geçmiş PENDING randevular tespit edildiğinde
- THEN bu randevular CANCELLED yapılır ve ilgili tüm taraflara bildirim gönderilir
