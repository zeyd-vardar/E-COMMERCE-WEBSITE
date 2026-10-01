# REST API özeti

Temel URL: `https://api.site-adiniz.com/api/v1`  
Korumalı uçlarda `Authorization: Bearer <jwt>` başlığı gerekir. Tüm istek ve yanıtlar JSON’dur.

| İşlem                                                | Uç                                                              |
| ---------------------------------------------------- | --------------------------------------------------------------- |
| Sağlık denetimi                                      | `GET /health`                                                   |
| Katalog, `q`, `category`, `page`, `limit` filtreleri | `GET /products`                                                 |
| Ürün detayı                                          | `GET /products/:slug`                                           |
| Ürün ekleme (demo; canlıda admin rolü gerekir)       | `POST /products`                                                |
| Kayıt / giriş                                        | `POST /auth/register`, `POST /auth/login`                       |
| Adresler                                             | `GET, POST /me/addresses`                                       |
| Adres güncelleme                                     | `PUT /me/addresses/:addressId`                                  |
| Varsayılan adres                                     | `PATCH /me/addresses/:addressId/default`                        |
| Adres silme                                          | `DELETE /me/addresses/:addressId`                               |
| Sepet                                                | `GET /cart`; `PUT /cart/items`; `DELETE /cart/items/:productId` |
| Siparişler                                           | `GET /orders`; `POST /orders`                                   |

`PUT /cart/items` gövdesi:

```json
{ "productId": "UUID", "quantity": 2 }
```

`POST /orders` gövdesi:

```json
{ "shippingAddressId": "UUID" }
```

Sipariş oluşturma işlemi tek PostgreSQL transaction’ı içinde çalışır; ürün stokları satır kilidiyle denetlenir ve sonra düşülür. Bu, aynı ürüne eşzamanlı siparişlerde aşırı satış riskini önler.

Katmanların sorumlulukları ve istek zincirleri
[architecture.md](architecture.md) dosyasında açıklanmıştır.
