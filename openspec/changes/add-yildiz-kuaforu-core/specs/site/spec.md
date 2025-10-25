## ADDED Requirements

### Requirement: Ana Sayfa

Ana sayfa, salon tanıtımı, hizmet listesi, hızlı randevu formuna yönlendirme, iletişim ve sosyal linkleri içermelidir (MUST).

#### Scenario: Hızlı randevu CTA

- WHEN kullanıcı ana sayfayı ziyaret ettiğinde
- THEN hizmet listesi ve hızlı randevuya yönlendiren bir çağrı-aksiyon (CTA) görünür

### Requirement: Üst Çubuk (Topbar) ve Aksiyonlar

Ana navigasyonun üstünde bir üst çubuk (topbar) bulunmalı (MUST). Sol tarafta telefon ve adres (MUST), sağ tarafta WhatsApp, TikTok, Facebook ve Instagram ikon/linkleri yer almalıdır (MUST). Tıklamalarda uygun uygulama/bağlantı açılmalıdır (MUST): telefon için `tel:` (MUST), WhatsApp için `https://wa.me/` + önceden doldurulmuş mesaj (MUST), adres için platforma göre harita uygulaması veya `https://maps.google.com/?q=` (MUST).

#### Scenario: Telefon bağlantısı

- WHEN kullanıcı topbar telefon linkine tıklarsa
- THEN cihazın varsayılan telefon uygulaması `tel:` şemasıyla açılır

#### Scenario: WhatsApp mesajı

- WHEN kullanıcı topbar WhatsApp linkine tıklarsa
- THEN `wa.me` üzerinden önceden doldurulmuş bir mesajla sohbet açılır

#### Scenario: Adres/harita açılışı

- WHEN kullanıcı topbar adres linkine tıklarsa
- THEN platformda mevcutsa varsayılan harita uygulaması açılır, mümkün değilse Google Maps URL’si yeni sekmede açılır

### Requirement: Giriş Butonu

Müşteri, yönetici ve çalışan için erişilebilir bir “Giriş” butonu navbar veya görünür bir alanda yer almalıdır (MUST). Tıklanınca kimlik sayfasına/modaline yönlendirmelidir (MUST).

#### Scenario: Giriş akışı

- WHEN kullanıcı Giriş butonuna tıklarsa
- THEN oturum açma ekranı/modalı açılır ve başarıyla giriş sonrası uygun panele yönlendirilir

### Requirement: Hizmetler ve Galeri Bölümü

Ana sayfada “Hizmetlerimiz” ve “Galeri” bölümleri görünür olmalı (MUST) ve ilgili detay sayfalarına/galeri grid’ine yönlendirmelidir (MUST).

#### Scenario: Bölümlerin görünürlüğü

- WHEN kullanıcı ana sayfayı ziyaret ettiğinde
- THEN Hizmetlerimiz kartları ve Galeri grid/slider’ı görüntülenir ve detaylara giden linkler çalışır
