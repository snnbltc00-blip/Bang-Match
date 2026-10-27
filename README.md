# Bang Match

Renkli top zincirlerini atomlara ulaşmadan eşleştirip patlattığın, 100 seviyeli tek modlu tarayıcı oyunu. Fare veya dokunmatik sürükleme, özel toplar, kombolar ve yerel ilerleme kaydı içerir.

## Çalıştırma

[index.html](index.html) dosyasını modern tarayıcıda aç. Depo kökündeki index.html güncel oyundur. Kurulum veya derleme zorunlu değildir.

Oyun tek HTML içindeki CSS ve JavaScript ile Canvas 2D üzerinde çalışır. Web Audio ses üretir; Google Fonts yazı tipleri ağdan yüklenir, alternatif fontlar tanımlıdır. Kayıtlar tarayıcıda tutulur; cihazlar arasında otomatik eşitlenmez. İnternetsiz yeniden açılma/PWA desteği garanti edilmez.

Yayın: [Bang Match](https://snnbltc00-blip.github.io/Bang-Match/). Yerel sürüm yayından yeni olabilir; [CHANGELOG](docs/CHANGELOG.md) ayrımı belirtir.

## Belgeler

- [Çalışma kuralları ve seçici okuma](AGENTS.md)
- [Teknik bağlam ve test rehberi](docs/PROJECT_CONTEXT.md)
- [Oyun tasarımı](docs/GAME_DESIGN.md)
- [Yol haritası](docs/ROADMAP.md)
- [Teslim referansı](docs/DEPLOYMENT.md)

Ayrı klasik İstop bu oyunun modu değildir. Tarihsel kaynaklar güncel özellik listesi olarak kullanılmaz.

## Geliştirme testleri

Node.js ve npm kurulu olmalı. İlk kurulum: `npm install`, ardından `npx playwright install chromium`. Temel kontroller: `npm test`. Geometri/tema: `npm run test:backdrop`; yerleşim: `npm run test:layout`. İsteğe bağlı kurulu tarayıcı için BROWSER_CHANNEL ortam değişkeni kullanılabilir (ör. msedge). Testler PNG çıktıları oluşturabilir; bunlar Git'e eklenmez.

Bu depoda tarihsel İstop kaynakları, geçiş betikleri ve yerel teslim araçları bulunmaz.
