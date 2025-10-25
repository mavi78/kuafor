## ADDED Requirements

### Requirement: Finansal Raporlama

Tarih aralığına göre ciro, ödeme yöntemi kırılımı, çalışan bazlı satış, hizmet bazlı gelir grafikleri (Recharts) sağlanmalıdır (MUST). CSV dışa aktarım desteklenmelidir (MUST).

#### Scenario: CSV dışa aktarım

- WHEN kullanıcı tarih filtresi uygulayıp dışa aktarımı seçtiğinde
- THEN seçili aralığın raporu CSV olarak indirilir

### Requirement: Operasyonel Metrikler

İptal oranı, ortalama onay süresi, çalışan bazlı yoğunluk gibi metrikler rapor ekranına dahil edilmelidir (MUST).

#### Scenario: Metriklerin görselleştirilmesi

- WHEN kullanıcı rapor ekranını açtığında
- THEN seçilen aralığa göre operasyonel metrikler ve grafikler gösterilir
