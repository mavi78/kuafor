## ADDED Requirements

### Requirement: Redis Cache/Queue Kullanımı

Sistem, cache ve iş kuyruğu ihtiyaçları için Redis kullanmalıdır (MUST). Cron görevleri, bildirim gönderimleri ve gerçek zamanlı sayaç/rozet güncellemeleri Redis tabanlı kuyruk/kanallar ile yürütülmelidir (MUST).

#### Scenario: Otomatik iptal kuyruğu

- WHEN gün sonu job planlandığında
- THEN beklemede kalan randevular Redis kuyruğuna işler olarak eklenir, tüketici tarafından CANCELLED yapılır ve bildirimler tetiklenir
