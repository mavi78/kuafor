## ADDED Requirements

### Requirement: Randevu Talebi (Beklemede Kayıt)

Kayıtlı veya kayıtsız müşteriler, ad-soyad-telefon-hizmet(ler)-kişi sayısı-tarih/saat bilgileri ile randevu talebi oluşturabilmelidir (MUST). Sistem çakışma kontrolü yapmadan kaydı PENDING olarak almalı (MUST) ve benzersiz takip kodu üretmelidir (MUST).

#### Scenario: Başarılı beklemede kayıt

- WHEN müşteri zorunlu alanları doldurup gönderdiğinde
- THEN Appointment PENDING olarak kaydedilir ve müşteri ile yönetici için bildirim tetiklenir; takip kodu kullanıcıya gösterilir

### Requirement: Randevu Onay/Revize/İptal ve Atama

Admin, beklemedeki randevuları onaylayıp/ revize edip/ iptal edebilmeli (MUST); çalışan atanmasını yönetebilmelidir (MUST). Çalışan, yalnızca kendisini atayabilir (atanmamışsa) (MUST) ve beklemedeki randevuyu onaylayabilir/ revize edebilir (MUST).

#### Scenario: Admin onayı ve atama

- WHEN admin randevuyu onaylar ve bir çalışan atarsa
- THEN randevu APPROVED olur ve atanan tarafa bildirim gönderilir

#### Scenario: Çalışanın kendini ataması

- WHEN bir çalışan, atanmamış beklemede randevuyu onaylamak isterse
- THEN yalnız kendisini atayarak onaylayabilir

### Requirement: Süre Bazlı Çakışma Kontrolü

Onay aşamasında, hizmetlerin `duration_min` toplamına göre hesaplanan bitiş zamanları baz alınarak çalışan ve salon düzeyinde çakışmalar listelenmelidir (MUST).

#### Scenario: Çakışma uyarısı

- WHEN onay ekranında aynı zaman aralığında çakışan randevular bulunursa
- THEN sistem çakışmaları tabloda listeler ve uyarı sonrası onay veya revize etmeye izin verir

### Requirement: Takip Kodu ile Durum Görüntüleme

Kayıtlı/kayıtsız müşteriler takip kodu ile randevu durumlarını görüntüleyebilmelidir (MUST).

#### Scenario: Takip kodu ile sorgu

- WHEN müşteri takip kodunu girerse
- THEN randevu mevcut durumu ile görüntülenir

### Requirement: Randevu İptal Kuralları

Müşteri randevu saatine 12 saatten fazla varsa webden iptal edebilir (MUST); 12 saatten az kalmışsa iptal için salona telefonla ulaşmalıdır (MUST).

#### Scenario: 12 saatten fazla kala iptal

- WHEN randevu saatine 12+ saat varsa müşteri iptal talebi yaparsa
- THEN randevu CANCELLED olur ve ilgili taraflara bildirim gider

#### Scenario: 12 saatten az kala iptal denemesi

- WHEN 12 saatten az kaldığında müşteri webden iptal denemesi yaparsa
- THEN sistem webden iptale izin vermez ve telefonla iletişim önerisi gösterir

### Requirement: Takvim Yönetimi (Aylık/Haftalık/Günlük)

Aylık/haftalık/günlük takvim görünümü sağlanmalı (MUST); çalışan/hizmet/durum filtresi bulunmalı (MUST); yetkili kullanıcılar sürükle-bırak ile revize edebilmelidir (MUST).

#### Scenario: Sürükle-bırak ile revize

- WHEN admin veya yetkili çalışan takvimde bir randevuyu yeni bir zaman aralığına sürüklediğinde
- THEN çakışma/uygunluk kontrolleri yapıldıktan sonra randevu saatleri güncellenir ve bildirim tetiklenir
