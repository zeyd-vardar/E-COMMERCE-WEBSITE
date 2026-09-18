# STORE Mobile

Flutter ile geliştirilen, WebView kullanmayan iOS ve Android e-ticaret uygulamasıdır. Web projesinden ayrıdır; mobil katalog webdeki kategori ağacını ve deterministik 10 ürün/leaf kuralını taşır.

## Gereksinimler ve çalıştırma

- Flutter 3.41+ / Dart 3.12+
- `flutter pub get`, `flutter run`, `flutter analyze`, `flutter test`
- Android: `flutter run -d <android-device>` veya `flutter build apk --debug`
- iOS: `flutter run -d <ios-simulator>` veya `flutter build ios --simulator`

## Mimari

`app/` router, tema ve Riverpod state; `core/` modeller; `data/` deterministik demo katalog; `features/` ekranlar; `shared/` ortak widget'lardır. `go_router` merkezi/deep-link-ready routing, `SharedPreferences` dil, para birimi, sepet, favori, karşılaştırma, adres, arama, stok alarmı, profil ve son görüntüleme kalıcılığı sağlar. Demo hesap, sipariş, mesaj, kargo takibi kullanılabilir; checkout tahsilat yapmaz.

## Future setup

Data katmanı REST, Firebase veya Supabase ile değiştirilebilir. Auth email/telefon/Google/Apple'a, notification APNs/FCM'e, checkout payment provider'a bağlanabilir. Kaynak koda secret eklemeyin.

Yayın için `GoogleService-Info.plist`, `google-services.json`, OAuth/Apple Sign In, APNs/FCM credentials, production backend, payment provider, App Store signing/provisioning ve Android release keystore/Play Console gerekir. Bunlar demo projede kasıtlı olarak yoktur.
