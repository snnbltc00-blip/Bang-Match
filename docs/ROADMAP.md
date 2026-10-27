# Yol haritası

Durum: 2026-10-27. Tamamlandı, yerel kodda doğrulanan uygulama demektir; yayın farkı [CHANGELOG](CHANGELOG.md) içindedir. Bu liste tek başına uygulama/yayın yetkisi değildir.

## Tamamlandı

- [x] Tek modlu Bang Match; ayrı klasik dosya.
- [x] 100 seviye, kare seçici, nesne geometrileri, çoklu koridor ve halat kesişimleri.
- [x] Yerel rekor/ilerleme, öğretici ve özel top envanteri.
- [x] Üç özel top, ilk hediye ve oyunu durduran açıklamalar.
- [x] Birleşme çarpışmasında tam dört top patlatma.
- [x] Son kayıtlı seviyenin menü arka planı ve tema uyumu.
- [x] Mobil arka plan çizimi ve alt bölgeye yönlenen kombo yazıları.
- [x] Özel top açıklamasında öğreticiyi gizleme; büyük renk seçimi paneli (yerel).
- [x] Seçici okumaya dayalı Markdown dokümantasyonu.

## Devam eden / doğrulama bekleyen

- Son özel-top yazı düzeltmesi bu yayın paketine dahil edildi.
- Gerçek telefonda görünüm, akıcılık ve öğretici yerleşimi kullanıcı doğrulaması bekliyor.
- 100 seviyenin güncel insan oyuncu denge/geçilebilirlik ölçümü yok; headless test bunu kanıtlamaz.

## Planlanan fikir — uygulanmamış

- Kullanıcı daha önce reklam izleyerek özel top kazanma ve farklı özel toplar fikrini belirtti. Reklam entegrasyonu kodda doğrulanmadı; sağlayıcı, kapsam ve takvim belirlenmedi.

## Teknik öneriler — onaylanmış iş değil

- HTML/shell eş bakımını güvenilir bir üretim kaynağıyla birleştirmek; eski geçiş betiğini çalıştırmadan tasarlanmalı.
- Test paketini CI iş akışına bağlamak (henüz uygulanmadı).
- Eski test varsayımlarını güncellemek; özel-top HUD çakışma kontrolünü kalıcı regresyon testine taşımak.
- Gerçek cihaz performans ölçümü ve tarayıcı matrisi oluşturmak.

Teslim tarihi veya otomatik uygulama önceliği atanmadı; kullanıcı isteğiyle kapsamlandırılır.
