# Uygulama mimarisi

## İstek akışı

Veritabanı işlemi oluşturan kullanıcı eylemleri aşağıdaki katmanlardan geçer:

```text
DOM tıklama veya form olayı
  → frontend event
  → frontend application service
  → frontend API modülü
  → HTTP isteği
  → backend middleware
  → backend route
  → backend controller
  → backend service
  → backend repository
  → PostgreSQL
```

Her controller, service, repository ve frontend API fonksiyonu açıkça
`Promise` döndürür. Controller yalnızca HTTP girdisi ve çıktısıyla, service iş
kurallarıyla, repository ise SQL ile ilgilenir.

## Frontend klasörleri

```text
src/
├── core/
│   ├── api/             Ortak HTTP istemcisi
│   └── auth/            JWT saklama işlemleri
└── features/
    ├── account/
    │   ├── api/         Adres, sepet ve sipariş HTTP çağrıları
    │   ├── events/      Tıklama ve form olayları
    │   └── services/    Frontend iş akışları ve veri eşitleme
    ├── auth/api/        Kayıt, giriş ve çıkış işlemleri
    ├── catalog/api/     Ürün sorguları
    └── navigation/events/
                         Kullanıcı menüsü yönlendirme olayları
```

Frontend API adresi `VITE_API_BASE_URL` ile değiştirilebilir. Varsayılan değer
`http://localhost:3001/api/v1` şeklindedir.

JWT mevcutsa hesap işlemleri backend API üzerinden yürütülür. JWT yoksa vitrin
demo olarak çalışmaya devam edebilmesi için mevcut yerel veri davranışını korur.

## Backend klasörleri

```text
server/src/
├── core/database/       PostgreSQL havuzu ve transaction yönetimi
├── middlewares/         Kimlik doğrulama ve hata yönetimi
├── modules/
│   ├── addresses/
│   ├── auth/
│   ├── cart/
│   ├── health/
│   ├── orders/
│   └── products/
├── shared/              Ortak HTTP ve hata araçları
├── app.ts               Route kayıtları ve Express yapılandırması
└── server.ts            Uygulamanın başlatılması ve kapatılması
```

Her backend modülünde görevler şu dosyalara ayrılır:

- `*.routes.ts`: HTTP yöntemi, URL ve middleware zinciri.
- `*.controller.ts`: İstek doğrulama ve HTTP yanıtı.
- `*.service.ts`: İş kuralları ve hata kararları.
- `*.repository.ts`: Parametreli PostgreSQL sorguları.
- `*.schema.ts`: Zod istek doğrulama şemaları.

## Örnek: adres kaydetme

```text
address.events.ts
  → addressApplicationService.ts
  → addressApi.ts
  → POST /api/v1/me/addresses
  → auth.middleware.ts
  → address.routes.ts
  → address.controller.ts
  → address.service.ts
  → address.repository.ts
  → postgres.ts
  → addresses tablosu
```

## Örnek: sipariş oluşturma

```text
checkout.events.ts
  → orderApi.ts
  → POST /api/v1/orders
  → auth.middleware.ts
  → order.routes.ts
  → order.controller.ts
  → order.service.ts
  → order.repository.ts
  → PostgreSQL transaction
```

Sipariş repository katmanı adresi ve sepeti denetler, ürün satırlarını kilitler,
siparişi oluşturur, stokları düşürür ve sepeti temizler. İşlemlerden biri hata
verirse transaction geri alınır.
