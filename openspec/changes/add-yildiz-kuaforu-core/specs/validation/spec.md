## ADDED Requirements

### Requirement: Zod Tabanlı Doğrulama ve Şema Paylaşımı

Tüm form ve sunucu tarafı doğrulamalar Zod şemaları ile yapılmalıdır (MUST). İlgili Zod şemaları `lib/validation/*` altında tanımlanmalı (MUST) ve aynı şema React Hook Form ile zodResolver üzerinden paylaşılarak kullanılmalıdır (MUST).

#### Scenario: Ortak şema ile doğrulama

- WHEN kullanıcı kayıt/giriş veya randevu formunu gönderdiğinde
- THEN aynı Zod şeması client’ta RHF ile ve server action/route handler’da parse edilerek doğrulama tutarlı çalışır

### Requirement: Hata Mesajları ve Yerelleştirme

Zod hata mesajları TR yerelleştirmesi ile kullanıcıya uygun şekilde gösterilmelidir (MUST).

#### Scenario: Hatalı alan gösterimi

- WHEN kullanıcı zorunlu bir alanı boş gönderirse
- THEN ilgili input altında TR hata mesajı görünür ve form submit bloklanır
