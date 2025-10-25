## ADDED Requirements

### Requirement: Medya Yükleme Kuralları ve Yedekleme

Galeriye yalnızca JPEG/PNG ve maksimum 5 MB dosyalar yüklenebilmelidir (MUST). Dosyalar Supabase Storage veya S3’e yedeklenmelidir (MUST).

#### Scenario: Yedekleme politikası

- WHEN bir galeri dosyası yüklendiğinde
- THEN dosya doğrulandıktan sonra birincil depoya alınır ve arka planda Storage/S3’e yedeklenir

### Requirement: Veritabanı Yedekleme

Veritabanı için günlük dump alınmalıdır (MUST).

#### Scenario: Günlük dump

- WHEN günlük bakım görevi çalıştığında
- THEN veritabanı dump’ı oluşturulur ve güvenli bir konuma saklanır
