## ADDED Requirements

### Requirement: Audit Log

Sistem, kim-ne zaman-hangi kaydı-hangi değişikliği yaptığını özet ve diff alanlarıyla kaydetmelidir (MUST). İç notlar müşteriye görünmemelidir (MUST).

#### Scenario: Randevu statü değişikliği logu

- WHEN bir randevunun statüsü değiştiğinde
- THEN actor, entity, action ve diff bilgileri audit log’a yazılır; iç notlar yalnızca personel görünümünde kalır
