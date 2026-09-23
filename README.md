# Aurea Storefront — Portföy Demo

Bu repo, statik vitrin arayüzünü ve yayınlanmaya hazır PostgreSQL destekli REST API’yi birlikte içerir. Arayüz demo modunda `localStorage` kullanmaya devam eder; böylece backend kapalıyken de portföy gösterimi sorunsuz çalışır.

## Yerelde çalıştırma

1. `.env.example` dosyasını `.env` olarak kopyalayın ve özellikle `JWT_SECRET` değerini değiştirin.
2. `docker compose up --build` çalıştırın. PostgreSQL şeması ve örnek katalog otomatik yüklenir.
3. Ayrı terminalde `npm run dev` ile vitrini açın.

API adresi: `http://localhost:3001/api/v1`  
Sağlık kontrolü: `GET /api/v1/health`

## API kapsamı

- Katalog: ürün listeleme, arama, kategoriye göre filtreleme ve ürün detayı
- Kimlik: kayıt ve JWT ile giriş
- Hesap: teslimat adresleri
- Ticaret: kullanıcı sepeti, stok kilitlemeli sipariş oluşturma

Tüm veri modeli [database/migrations/001_initial_schema.sql](database/migrations/001_initial_schema.sql) içindedir. Örnek ürünler [database/seeds/001_demo_catalog.sql](database/seeds/001_demo_catalog.sql) ile gelir.
Uçların kısa sözleşmesi [docs/api.md](docs/api.md) dosyasındadır.

## Yayınlama notu

Vitrin Vercel/Netlify/Cloudflare Pages üzerinde; API ise Docker destekleyen Render, Railway, Fly.io veya bir VPS üzerinde çalıştırılabilir. API için yönetilen PostgreSQL kullanın, `DATABASE_URL`, güçlü `JWT_SECRET` ve alan adınızı içeren `CLIENT_ORIGIN=https://site-adiniz.com` değişkenlerini tanımlayın. Domain yönlendirmesinde API’yi `api.site-adiniz.com` altında yayınlamak uygundur.

Canlı ödeme entegrasyonu ve yönetici yetkilendirmesi portföy demosunda bilinçli olarak aktif değildir; gerçek satışa geçmeden önce ödeme sağlayıcısı webhooks’u, rol tabanlı admin yetkisi, e-posta doğrulaması, hız sınırlama ve gözlemlenebilirlik eklenmelidir.
