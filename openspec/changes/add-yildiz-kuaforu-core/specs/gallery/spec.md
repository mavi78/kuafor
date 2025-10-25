## ADDED Requirements

### Requirement: Galeri Yönetimi

Admin galeriye resim ekleyip silebilmelidir (MUST). Yalnızca JPEG/PNG ve 5 MB’tan küçük/eşit dosyalar kabul edilmelidir (MUST). Vitrin sayfasında görseller gösterilmelidir (MUST).

#### Scenario: Desteklenmeyen dosya reddi

- WHEN kullanıcı 6 MB veya farklı formatta bir dosya yüklerse
- THEN yükleme reddedilir ve uygun hata mesajı gösterilir
