## ADDED Requirements

### Requirement: Zustand ile Durum Yönetimi

İstemci tarafı durum yönetimi için Zustand kullanılmalıdır (MUST). Store dosyaları `stores/` altında konumlanmalı (MUST) ve isimlendirme `useXStore` şeklinde olmalıdır (MUST).

#### Scenario: Basit sayaç store’u

- WHEN bir komponent `useCounterStore` ile sayacı arttırır
- THEN değer diğer komponentlerde anında yansır ve kalıp `stores/useCounterStore.ts` altında bulunur
