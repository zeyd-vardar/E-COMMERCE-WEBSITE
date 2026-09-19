import { CategoryNavigation } from '../components/CategoryNavigation';
import { catalogProducts } from '../data/allProducts';
import { orders, messages } from '../data/account';
import { icon, type IconName } from '../utils/icons';
import { formatCurrency } from '../utils/currency';
import { cartService } from '../services/cartService';
import { favoritesService } from '../services/favoritesService';
import { addressService } from '../services/addressService';
import { stockWatchService } from '../services/stockWatchService';
import { userService } from '../services/userService';
import type { Currency, Language } from '../types';
import { currentRoute } from '../utils/router';
const route = () => currentRoute();
const labels = {
  tr: {
    title: 'Profilim',
    hello: 'Merhaba',
    intro: 'Hesabınızı, siparişlerinizi ve tercihlerinizi buradan yönetebilirsiniz.',
    cart: 'Sepetim',
    addresses: 'Adreslerim',
    orders: 'Geçmiş Siparişlerim',
    favorites: 'Favorilerim',
    tracking: 'Sipariş Takip',
    stock: 'Stok Takip',
    messages: 'Mesajlarım',
    profile: 'Kişisel Bilgilerim',
    back: 'Profilime Dön',
    signout: 'Çıkış Yap',
  },
  en: {
    title: 'My Account',
    hello: 'Hello',
    intro: 'Manage your account, orders and preferences here.',
    cart: 'My Cart',
    addresses: 'My Addresses',
    orders: 'Order History',
    favorites: 'My Favorites',
    tracking: 'Order Tracking',
    stock: 'Stock Alerts',
    messages: 'My Messages',
    profile: 'Personal Information',
    back: 'Back to Account',
    signout: 'Sign Out',
  },
};
const dashboardItems = (language: Language) => {
  const l = labels[language];
  return [
    {
      id: 'cart',
      title: l.cart,
      desc: `${cartService.count()} ${language === 'tr' ? 'ürün' : 'items'}`,
      icon: 'bag' as IconName,
      path: '/cart',
    },
    {
      id: 'addresses',
      title: l.addresses,
      desc: `${addressService.all().length} ${language === 'tr' ? 'kayıtlı adres' : 'saved addresses'}`,
      icon: 'truck' as IconName,
      path: '/account/addresses',
    },
    {
      id: 'orders',
      title: l.orders,
      desc: `${orders.length} ${language === 'tr' ? 'sipariş' : 'orders'}`,
      icon: 'bag' as IconName,
      path: '/account/orders',
    },
    {
      id: 'favorites',
      title: l.favorites,
      desc: `${favoritesService.all().length} ${language === 'tr' ? 'ürün' : 'items'}`,
      icon: 'heart' as IconName,
      path: '/favorites',
    },
    {
      id: 'tracking',
      title: l.tracking,
      desc: `${orders.filter((x) => x.status === 'shipped').length} ${language === 'tr' ? 'aktif sipariş' : 'active order'}`,
      icon: 'truck' as IconName,
      path: '/tracking',
    },
    {
      id: 'stock',
      title: l.stock,
      desc: `${stockWatchService.all().length} ${language === 'tr' ? 'ürün' : 'items'}`,
      icon: 'message' as IconName,
      path: '/account/stock-alerts',
    },
    {
      id: 'messages',
      title: l.messages,
      desc: `${messages.filter((x) => !x.isRead).length} ${language === 'tr' ? 'okunmamış' : 'unread'}`,
      icon: 'message' as IconName,
      path: '/account/messages',
    },
    {
      id: 'profile',
      title: l.profile,
      desc: language === 'tr' ? 'Hesap bilgilerini yönet' : 'Manage account details',
      icon: 'user' as IconName,
      path: '/account/profile',
    },
  ];
};
const Shell = (title: string, language: Language, content: string) =>
  `<div class="account-subhead">
<a href="/account" data-account-route="/account">← ${labels[language].back}
</a>
<h1>
${title}
</h1>
</div>
${content}`;
const LinePrice = (
  product: (typeof catalogProducts)[number],
  quantity: number,
  language: Language,
  currency: Currency,
) =>
  `<span class="sale-price-pair">
${
  product.originalPrice && product.originalPrice > product.price
    ? `<s>
${formatCurrency(product.originalPrice * quantity, currency, language)}
</s>`
    : ''
}
<strong>
${formatCurrency(product.price * quantity, currency, language)}
</strong>
</span>`;
const TotalPrice = (
  lines: { line: { quantity: number }; product: (typeof catalogProducts)[number] | undefined }[],
  language: Language,
  currency: Currency,
) => {
  const current = lines.reduce(
      (sum, { line, product }) => sum + (product?.price ?? 0) * line.quantity,
      0,
    ),
    original = lines.reduce(
      (sum, { line, product }) =>
        sum + (product?.originalPrice ?? product?.price ?? 0) * line.quantity,
      0,
    );
  return `<span class="sale-price-pair total-price-pair">
${
  original > current
    ? `<s>
${formatCurrency(original, currency, language)}
</s>`
    : ''
}
<strong>
${formatCurrency(current, currency, language)}
</strong>
</span>`;
};
const Addresses = (language: Language) =>
  Shell(
    labels[language].addresses,
    language,
    `<div class="address-grid">
${addressService
  .all()
  .map(
    (a) =>
      `<article class="address-card">
<div>
<h2>
${a.title}
</h2>
${
  a.isDefault
    ? `<span>
${language === 'tr' ? 'VARSAYILAN' : 'DEFAULT'}
</span>`
    : ''
}
</div>
<p>
${a.firstName} ${a.lastName}
<br>
${a.addressLine}
<br>
${a.district} / ${a.city}
<br>
${a.phone}
</p>
<footer>
<button data-edit-address="${a.id}">
${language === 'tr' ? 'Düzenle' : 'Edit'}
</button>
${
  a.isDefault
    ? ''
    : `<button data-default-address="${a.id}">
${language === 'tr' ? 'Varsayılan Yap' : 'Make Default'}
</button>`
}
<button data-delete-address="${a.id}">
${language === 'tr' ? 'Sil' : 'Delete'}
</button>
</footer>
</article>`,
  )
  .join('')}
<button class="new-address-trigger">+<span>
${language === 'tr' ? 'Yeni Adres Ekle' : 'Add New Address'}
</span>
</button>
</div>
<form class="address-form" hidden>
<input type="hidden" name="id">
<h2>
${language === 'tr' ? 'Yeni Adres' : 'New Address'}
</h2>
<div>
<label>
${language === 'tr' ? 'Başlık' : 'Title'}
<input name="title" required>
</label>
<label>
${language === 'tr' ? 'Şehir' : 'City'}
<input name="city" required>
</label>
<label>
${language === 'tr' ? 'İlçe' : 'District'}
<input name="district" required>
</label>
<label>
${language === 'tr' ? 'Telefon' : 'Phone'}
<input name="phone" required>
</label>
<label class="wide">
${language === 'tr' ? 'Adres' : 'Address'}
<textarea name="address" required>
</textarea>
</label>
</div>
<button>
${language === 'tr' ? 'ADRESİ KAYDET' : 'SAVE ADDRESS'}
</button>
</form>`,
  );
const Orders = (language: Language, currency: Currency) =>
  Shell(
    labels[language].orders,
    language,
    `<div class="account-list">
${orders
  .map(
    (o) => `<article class="order-row">
<div>
<small>
${language === 'tr' ? 'SİPARİŞ' : 'ORDER'}
</small>
<h2>#${o.orderNumber}
</h2>
<p>
${new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-US').format(new Date(o.date))}
</p>
</div>
<div>
<span class="status-${o.status}">
${o.status === 'delivered' ? (language === 'tr' ? 'Teslim Edildi' : 'Delivered') : language === 'tr' ? 'Kargoda' : 'Shipped'}
</span>
<p>
${o.itemCount} ${language === 'tr' ? 'ürün' : 'items'}
</p>
<strong>
${formatCurrency(o.total, currency, language)}
</strong>
</div>
<button data-demo-action>
${language === 'tr' ? 'DETAYLAR' : 'DETAILS'} →</button>
</article>`,
  )
  .join('')}
</div>`,
  );
const Favorites = (language: Language, currency: Currency) => {
  const items = catalogProducts.filter((p) => favoritesService.has(p.id));
  return Shell(
    labels[language].favorites,
    language,
    items.length
      ? `<div class="favorite-product-grid">
${items
  .map(
    (p) => `<article class="favorite-product-card">
<a class="favorite-product-image ${p.images[0].includes('aurea-products') ? 'is-sprite' : ''}" href="/product/${p.slug}" data-product-route="${p.slug}" aria-label="${p.name[language]}">
<img src="${p.images[0]}" alt="${p.name[language]}" loading="lazy" style="transform-origin:${p.imagePosition}">
</a>
<div class="favorite-product-info">
<p>
${p.brand}
</p>
<a href="/product/${p.slug}" data-product-route="${p.slug}">
<h2>
${p.name[language]}
</h2>
</a>
<div>
${LinePrice(p, 1, language, currency)}${
      p.stock > 0
        ? `<span>
${language === 'tr' ? 'Stokta' : 'In stock'}
</span>`
        : `<span>
${language === 'tr' ? 'Stokta yok' : 'Out of stock'}
</span>`
    }
</div>
<button type="button" data-remove-favorite="${p.id}">
${language === 'tr' ? 'FAVORİLERDEN ÇIKAR' : 'REMOVE FROM FAVORITES'}
</button>
</div>
</article>`,
  )
  .join('')}
</div>`
      : `<div class="account-empty">
<h2>
${language === 'tr' ? 'Henüz favori ürününüz bulunmuyor.' : 'You have no favorite products yet.'}
</h2>
<a href="/category/all" data-category-route="all">
${language === 'tr' ? 'ÜRÜNLERİ KEŞFET' : 'EXPLORE PRODUCTS'}
</a>
</div>`,
  );
};
const Cart = (language: Language, currency: Currency) => {
  const lines = cartService
    .all()
    .map((line, index) => ({
      line,
      index,
      product: catalogProducts.find((product) => product.id === line.productId),
    }))
    .filter((item) => item.product);
  if (!lines.length)
    return Shell(
      labels[language].cart,
      language,
      `<div class="account-empty">
<h2>
${language === 'tr' ? 'Sepetiniz şu anda boş.' : 'Your cart is currently empty.'}
</h2>
<a href="/category/all" data-category-route="all">
${language === 'tr' ? 'ALIŞVERİŞE BAŞLA' : 'START SHOPPING'}
</a>
</div>`,
    );
  return Shell(
    labels[language].cart,
    language,
    `<div class="cart-layout">
<section class="cart-lines" aria-label="${language === 'tr' ? 'Sepetteki ürünler' : 'Cart items'}">
${lines
  .map(
    ({ line, index, product }) => `<article class="cart-line">
<a class="cart-line-image ${product!.images[0].includes('aurea-products') ? 'is-sprite' : ''}" href="/product/${product!.slug}" data-product-route="${product!.slug}">
<img src="${product!.images[0]}" alt="${product!.name[language]}" style="transform-origin:${product!.imagePosition}">
</a>
<div class="cart-line-info">
<p>
${product!.brand}
</p>
<a href="/product/${product!.slug}" data-product-route="${product!.slug}">
<h2>
${product!.name[language]}
</h2>
</a>
<dl>
${
  line.color
    ? `<div>
<dt>
${language === 'tr' ? 'Renk' : 'Color'}
</dt>
<dd>
${line.color}
</dd>
</div>`
    : ''
}${
      line.size
        ? `<div>
<dt>
${language === 'tr' ? 'Beden' : 'Size'}
</dt>
<dd>
${line.size}
</dd>
</div>`
        : ''
    }
</dl>
<div class="cart-line-actions">
<div class="cart-quantity">
<button data-cart-minus="${index}" aria-label="${language === 'tr' ? 'Adedi azalt' : 'Decrease quantity'}">−</button>
<span>
${line.quantity}
</span>
<button data-cart-plus="${index}" aria-label="${language === 'tr' ? 'Adedi artır' : 'Increase quantity'}">+</button>
</div>
<button class="cart-remove" data-cart-remove="${index}">
${language === 'tr' ? 'KALDIR' : 'REMOVE'}
</button>
</div>
</div>
${LinePrice(product!, line.quantity, language, currency)}
</article>`,
  )
  .join('')}
</section>
<aside class="cart-summary">
<h2>
${language === 'tr' ? 'Sipariş Özeti' : 'Order Summary'}
</h2>
<div>
<span>
${language === 'tr' ? 'Ara Toplam' : 'Subtotal'}
</span>
${TotalPrice(lines, language, currency)}
</div>
<div>
<span>
${language === 'tr' ? 'Kargo' : 'Shipping'}
</span>
<strong>
${language === 'tr' ? 'Ücretsiz' : 'Free'}
</strong>
</div>
<footer>
<span>
${language === 'tr' ? 'Toplam' : 'Total'}
</span>
${TotalPrice(lines, language, currency)}
</footer>
<a class="checkout-link" href="/checkout" data-account-route="/checkout">
${language === 'tr' ? 'ÖDEMEYE GEÇ' : 'PROCEED TO CHECKOUT'}
</a>
</aside>
</div>`,
  );
};
const Checkout = (language: Language, currency: Currency) => {
  const address = addressService.all().find((item) => item.isDefault) ?? addressService.all()[0],
    user = userService.get(),
    lines = cartService
      .all()
      .map((line) => ({
        line,
        product: catalogProducts.find((product) => product.id === line.productId),
      }))
      .filter((item) => item.product);
  if (!lines.length)
    return Shell(
      language === 'tr' ? 'Ödeme' : 'Checkout',
      language,
      `<div class="account-empty">
<h2>
${language === 'tr' ? 'Ödeme için sepetinize ürün ekleyin.' : 'Add products to your cart before checkout.'}
</h2>
<a href="/category/all" data-category-route="all">
${language === 'tr' ? 'ÜRÜNLERİ KEŞFET' : 'EXPLORE PRODUCTS'}
</a>
</div>`,
    );
  return `<div class="checkout-head">
<a href="/cart" data-account-route="/cart">← ${language === 'tr' ? 'Sepete Dön' : 'Back to Cart'}
</a>
<p class="eyebrow">STORE CHECKOUT</p>
<h1>
${language === 'tr' ? 'Ödeme' : 'Checkout'}
</h1>
</div>
<form class="checkout-form">
<div class="checkout-fields">
<section>
<h2>1. ${language === 'tr' ? 'Teslimat Bilgileri' : 'Delivery Details'}
</h2>
<div class="checkout-grid">
<label>
${language === 'tr' ? 'Ad' : 'First Name'}
<input name="firstName" value="${user.firstName}" required autocomplete="given-name">
</label>
<label>
${language === 'tr' ? 'Soyad' : 'Last Name'}
<input name="lastName" value="${user.lastName}" required autocomplete="family-name">
</label>
<label>
${language === 'tr' ? 'E-posta' : 'Email'}
<input name="email" type="email" value="${user.email}" required autocomplete="email">
</label>
<label>
${language === 'tr' ? 'Telefon' : 'Phone'}
<input name="phone" value="${user.phone ?? ''}" required autocomplete="tel">
</label>
<label class="wide">
${language === 'tr' ? 'Adres' : 'Address'}
<textarea name="address" required autocomplete="street-address">
${address?.addressLine ?? ''}
</textarea>
</label>
<label>
${language === 'tr' ? 'İlçe' : 'District'}
<input name="district" value="${address?.district ?? ''}" required>
</label>
<label>
${language === 'tr' ? 'Şehir' : 'City'}
<input name="city" value="${address?.city ?? ''}" required autocomplete="address-level1">
</label>
</div>
</section>
<section>
<h2>2. ${language === 'tr' ? 'Ödeme Yöntemi' : 'Payment Method'}
</h2>
<div class="payment-options">
<label>
<input type="radio" name="payment" value="door" checked>
<span>
<strong>
${language === 'tr' ? 'Kapıda Ödeme' : 'Cash on Delivery'}
</strong>
<small>
${language === 'tr' ? 'Siparişinizi teslim alırken ödeyin.' : 'Pay when your order is delivered.'}
</small>
</span>
</label>
<label>
<input type="radio" name="payment" value="card">
<span>
<strong>
${language === 'tr' ? 'Online Kredi/Banka Kartı' : 'Online Credit/Debit Card'}
</strong>
<small>Visa · Mastercard · Troy</small>
</span>
</label>
</div>
<div class="card-fields" hidden>
<label>
${language === 'tr' ? 'Kart Üzerindeki İsim' : 'Name on Card'}
<input name="cardName" autocomplete="cc-name">
</label>
<label>
${language === 'tr' ? 'Kart Numarası' : 'Card Number'}
<input name="cardNumber" inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000" autocomplete="cc-number">
</label>
<div>
<label>
${language === 'tr' ? 'Son Kullanma Tarihi' : 'Expiry Date'}
<input name="expiry" inputmode="numeric" maxlength="5" placeholder="AA/YY" autocomplete="cc-exp">
</label>
<label>CVV<input name="cvv" inputmode="numeric" maxlength="3" placeholder="000" autocomplete="cc-csc">
</label>
</div>
</div>
</section>
</div>
<aside class="checkout-summary">
<h2>
${language === 'tr' ? 'Sipariş Özeti' : 'Order Summary'}
</h2>
${lines
  .map(
    ({ line, product }) => `<div class="checkout-item">
<span>
${product!.name[language]}
<small>
${[line.color, line.size].filter(Boolean).join(' · ')} × ${line.quantity}
</small>
</span>
${LinePrice(product!, line.quantity, language, currency)}
</div>`,
  )
  .join('')}
<div class="checkout-total">
<span>
${language === 'tr' ? 'Toplam' : 'Total'}
</span>
${TotalPrice(lines, language, currency)}
</div>
<button type="submit">
${language === 'tr' ? 'SİPARİŞİ TAMAMLA' : 'COMPLETE ORDER'}
</button>
</aside>
</form>
<div class="checkout-success" hidden>
<span>✓</span>
<h2>
${language === 'tr' ? 'Siparişiniz Alındı' : 'Order Confirmed'}
</h2>
<p>
${language === 'tr' ? 'Siparişiniz başarıyla oluşturuldu.' : 'Your order has been created successfully.'}
</p>
<a href="/" data-home-route>
${language === 'tr' ? 'ANA SAYFAYA DÖN' : 'RETURN HOME'}
</a>
</div>`;
};
const Stock = (language: Language) => {
  const watched = stockWatchService
    .all()
    .map((w) => ({ w, p: catalogProducts.find((p) => p.id === w.productId) }))
    .filter((x) => x.p);
  return Shell(
    labels[language].stock,
    language,
    watched.length
      ? `<div class="account-product-list">
${watched
  .map(
    ({ w, p }) => `<div>
<span>
<strong>
${p!.brand}
</strong>
${p!.name[language]}
<small>
${p!.stock > 0 ? (language === 'tr' ? 'Stokta' : 'In stock') : language === 'tr' ? 'Stok bekleniyor' : 'Awaiting stock'}
</small>
</span>
<button data-remove-stock="${w.productId}">
${language === 'tr' ? 'TAKİBİ BIRAK' : 'STOP TRACKING'}
</button>
</div>`,
  )
  .join('')}
</div>`
      : `<div class="account-empty">
<h2>
${language === 'tr' ? 'Takip ettiğiniz stok bulunmuyor.' : 'You have no stock alerts.'}
</h2>
<a href="/category/all" data-category-route="all">
${language === 'tr' ? 'ÜRÜNLERİ KEŞFET' : 'EXPLORE PRODUCTS'}
</a>
</div>`,
  );
};
const Messages = (language: Language) =>
  Shell(
    labels[language].messages,
    language,
    `<div class="account-list">
${messages
  .map(
    (m) => `<article class="message-row ${m.isRead ? '' : 'is-unread'}">
<small>
${new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-US').format(new Date(m.createdAt))}
</small>
<h2>
${m.subject[language]}
</h2>
<p>
${m.preview[language]}
</p>
${
  m.isRead
    ? ''
    : `<span>
${language === 'tr' ? 'OKUNMAMIŞ' : 'UNREAD'}
</span>`
}
</article>`,
  )
  .join('')}
</div>`,
  );
const Profile = (language: Language) => {
  const user = userService.get();
  return Shell(
    labels[language].profile,
    language,
    `<form class="profile-form">
<div>
<label>
${language === 'tr' ? 'Ad' : 'First Name'}
<input name="firstName" required value="${user.firstName}">
</label>
<label>
${language === 'tr' ? 'Soyad' : 'Last Name'}
<input name="lastName" required value="${user.lastName}">
</label>
<label>
${language === 'tr' ? 'E-posta' : 'Email'}
<input name="email" type="email" required value="${user.email}">
</label>
<label>
${language === 'tr' ? 'Telefon' : 'Phone'}
<input name="phone" value="${user.phone ?? ''}">
</label>
<label>
${language === 'tr' ? 'Doğum Tarihi' : 'Birth Date'}
<input name="birthDate" type="date" value="${user.birthDate ?? ''}">
</label>
</div>
<button>
${language === 'tr' ? 'BİLGİLERİ KAYDET' : 'SAVE CHANGES'}
</button>
</form>`,
  );
};
const Tracking = (language: Language) =>
  Shell(
    labels[language].tracking,
    language,
    `<div class="tracking-box">
<form>
<label>
${language === 'tr' ? 'Sipariş veya takip numarası' : 'Order or tracking number'}
<input value="TRK10318" required>
</label>
<button>
${language === 'tr' ? 'SORGULA' : 'TRACK'}
</button>
</form>
<ol>
<li class="done">
${language === 'tr' ? 'Sipariş Alındı' : 'Order Received'}
</li>
<li class="done">
${language === 'tr' ? 'Hazırlanıyor' : 'Preparing'}
</li>
<li class="done">
${language === 'tr' ? 'Kargoya Verildi' : 'Shipped'}
</li>
<li>
${language === 'tr' ? 'Dağıtımda' : 'Out for Delivery'}
</li>
<li>
${language === 'tr' ? 'Teslim Edildi' : 'Delivered'}
</li>
</ol>
</div>`,
  );
export const AccountPage = (language: Language, currency: Currency) => {
  const user = userService.get();
  let content = '';
  const path = route();
  if (path === '/account') {
    const l = labels[language];
    content = `<header class="account-hero">
<p class="eyebrow">STORE MEMBERS</p>
<h1>
${l.title}
</h1>
<h2>
${l.hello}, ${user.firstName}
</h2>
<p>
${l.intro}
</p>
</header>
<section class="account-grid">
${dashboardItems(language)
  .map(
    (item) =>
      `<a href="${item.path}" data-account-route="${item.path}" class="account-card">
<span>
${icon(item.icon, 27)}
</span>
<div>
<h2>
${item.title}
</h2>
<p>
${item.desc}
</p>
</div>
<i>→</i>
</a>`,
  )
  .join('')}
</section>
<button class="signout-btn">
${l.signout}
</button>`;
  } else {
    const accountPages: Record<string, () => string> = {
      '/account/addresses': () => Addresses(language),
      '/account/orders': () => Orders(language, currency),
      '/favorites': () => Favorites(language, currency),
      '/account/stock-alerts': () => Stock(language),
      '/account/messages': () => Messages(language),
      '/account/profile': () => Profile(language),
      '/tracking': () => Tracking(language),
      '/cart': () => Cart(language, currency),
      '/checkout': () => Checkout(language, currency),
    };
    content = accountPages[path]?.() ?? content;
  }
  return `${CategoryNavigation('', language)}
<main class="account-page">
${content}
</main>`;
};
export const initAccountPage = (
  language: Language,
  rerender: () => void,
  toast: (message: string) => void,
  navigate: (path: string) => void,
) => {
  document.querySelectorAll<HTMLElement>('[data-account-route]').forEach((link) =>
    link.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      navigate(link.dataset.accountRoute!);
    }),
  );
  document
    .querySelector('.signout-btn')
    ?.addEventListener('click', () =>
      toast(language === 'tr' ? 'Oturumunuz açık bırakıldı.' : 'Your session remains active.'),
    );
  document.querySelector('.new-address-trigger')?.addEventListener('click', () => {
    const form = document.querySelector<HTMLElement>('.address-form');
    if (form) form.hidden = false;
  });
  document.querySelector<HTMLFormElement>('.address-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    addressService.add({
      id: `address-${Date.now()}`,
      title: String(form.get('title')),
      firstName: userService.get().firstName,
      lastName: userService.get().lastName,
      phone: String(form.get('phone')),
      addressLine: String(form.get('address')),
      city: String(form.get('city')),
      district: String(form.get('district')),
      country: 'Türkiye',
      isDefault: false,
    });
    toast(language === 'tr' ? 'Adresiniz kaydedildi.' : 'Address saved.');
    rerender();
  });
  document.querySelectorAll<HTMLElement>('[data-delete-address]').forEach((btn) =>
    btn.addEventListener('click', () => {
      addressService.remove(btn.dataset.deleteAddress!);
      rerender();
    }),
  );
  document.querySelectorAll<HTMLElement>('[data-default-address]').forEach((btn) =>
    btn.addEventListener('click', () => {
      addressService.makeDefault(btn.dataset.defaultAddress!);
      rerender();
    }),
  );
  document.querySelectorAll<HTMLElement>('[data-remove-favorite]').forEach((btn) =>
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      favoritesService.remove(btn.dataset.removeFavorite!);
      rerender();
    }),
  );
  document.querySelectorAll<HTMLElement>('[data-remove-stock]').forEach((btn) =>
    btn.addEventListener('click', () => {
      stockWatchService.remove(btn.dataset.removeStock!);
      rerender();
    }),
  );
  document.querySelector<HTMLFormElement>('.profile-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    userService.save({
      id: 'store-user',
      firstName: String(form.get('firstName')),
      lastName: String(form.get('lastName')),
      email: String(form.get('email')),
      phone: String(form.get('phone')),
      birthDate: String(form.get('birthDate')),
    });
    toast(language === 'tr' ? 'Bilgileriniz kaydedildi.' : 'Your information was saved.');
  });
  document.querySelector('.tracking-box form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    toast(language === 'tr' ? 'Sipariş durumu güncellendi.' : 'Order status updated.');
  });
  document
    .querySelectorAll('[data-demo-action]')
    .forEach((btn) =>
      btn.addEventListener('click', () =>
        toast(
          language === 'tr' ? 'Sipariş detayları görüntüleniyor.' : 'Order details are displayed.',
        ),
      ),
    );
};
