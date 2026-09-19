import { CategoryNavigation } from '../components/CategoryNavigation';
import { CatalogProductCard } from '../components/CatalogProductCard';
import { NotifyStockDialog } from '../components/NotifyStockDialog';
import { catalogProducts } from '../data/allProducts';
import { categories } from '../data/categories';
import { reviews } from '../data/reviews';
import { commerceConfig } from '../config/commerce';
import { formatCurrency } from '../utils/currency';
import { discountOf, getSimilarProducts } from '../utils/catalog';
import { icon } from '../utils/icons';
import { cartService } from '../services/cartService';
import { favoritesService } from '../services/favoritesService';
import { comparisonService } from '../services/comparisonService';
import { recentlyViewedService } from '../services/recentlyViewedService';
import type { CatalogProduct, Currency, Language } from '../types';
import { currentRoute } from '../utils/router';
let selectedImage = 0,
  selectedColor = '',
  selectedSize = '',
  quantity = 1;
const slug = () => currentRoute().split('/').filter(Boolean).at(-1) ?? '';
export const getProductBySlug = (value: string) => catalogProducts.find((p) => p.slug === value);
const colorHex: Record<string, string> = {
  Siyah: '#242321',
  Ekru: '#e7dfd0',
  Kum: '#b7a184',
  Haki: '#68705c',
};
const stars = (rating: number) =>
  `<span class="stars" aria-hidden="true">
${Array.from(
  { length: 5 },
  (_, i) => `<svg viewBox="0 0 24 24">
<path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9Z" ${i < Math.round(rating) ? 'fill="currentColor"' : ''}/>
</svg>`,
).join('')}
</span>`;
const Gallery = (p: CatalogProduct, language: Language) => {
  const positions = ['0% 0%', '100% 0%', '0% 100%', '100% 100%'];
  return `<section class="detail-gallery">
<button class="detail-main-image image-viewer-open" aria-label="${language === 'tr' ? 'Ürün görselini büyüt' : 'Enlarge product image'}">
<img src="${p.images[0]}" alt="${p.name[language]}" style="transform-origin:${positions[selectedImage]}" fetchpriority="high">
<span class="image-counter">
${selectedImage + 1} / 4</span>
<span class="zoom-hint">
${icon('search', 17)} ${language === 'tr' ? 'BÜYÜT' : 'ZOOM'}
</span>
</button>
<div class="detail-thumbnails">
${positions
  .map(
    (
      position,
      i,
    ) => `<button class="${i === selectedImage ? 'is-active' : ''}" data-image-index="${i}" aria-label="${i + 1}. ${language === 'tr' ? 'ürün görselini göster' : 'product image'}">
<img src="${p.images[0]}" alt="" loading="lazy" style="transform-origin:${position}">
</button>`,
  )
  .join('')}
</div>
</section>`;
};
const Price = (p: CatalogProduct, language: Language, currency: Currency) =>
  `<div class="detail-price">
${
  p.originalPrice
    ? `<s>
${formatCurrency(p.originalPrice, currency, language)}
</s>`
    : ''
}
<strong>
${formatCurrency(p.price, currency, language)}
</strong>
${
  p.originalPrice
    ? `<span>−%${discountOf(p)}
</span>`
    : ''
}
</div>`;
const ProductInfo = (p: CatalogProduct, language: Language, currency: Currency) =>
  `<section class="detail-info">
<p class="detail-brand">
${p.brand}
</p>
<h1>
${p.name[language]}
</h1>
<a href="#reviews" class="rating-link">
${stars(p.rating ?? 0)} <span>
${(p.rating ?? 0).toFixed(1)} (${p.reviewCount ?? 0} ${language === 'tr' ? 'yorum' : 'reviews'})</span>
</a>
${Price(p, language, currency)}
<p class="stock-note">
${p.stock === 0 ? (language === 'tr' ? 'Stokta yok' : 'Out of stock') : p.stock <= 3 ? (language === 'tr' ? `Son ${p.stock} ürün` : `Only ${p.stock} left`) : language === 'tr' ? 'Stokta' : 'In stock'}
</p>
${
  p.colors.length
    ? `<div class="variant-group">
<div class="variant-head">
<span>
${language === 'tr' ? 'Renk' : 'Color'}: <strong>
${selectedColor || p.colors[0]}
</strong>
</span>
</div>
<div class="color-swatches">
${p.colors
  .map(
    (color) => `<button
  style="--swatch:${colorHex[color] ?? '#aaa'}"
  class="${(selectedColor || p.colors[0]) === color ? 'is-active' : ''}"
  data-color="${color}"
  aria-label="${language === 'tr' ? 'Renk' : 'Color'}: ${color}"
  aria-pressed="${(selectedColor || p.colors[0]) === color}"
>
<i>
</i>
</button>`,
  )
  .join('')}
</div>
</div>`
    : ''
}${
    p.sizes.length
      ? `<div class="variant-group">
<div class="variant-head">
<span>
${language === 'tr' ? 'Beden' : 'Size'}
</span>
<button class="size-guide-open">
${language === 'tr' ? 'Beden Rehberi' : 'Size Guide'}
</button>
</div>
<div class="size-options">
${p.sizes
  .map(
    (
      size,
      i,
    ) => `<button data-size="${size}" class="${selectedSize === size ? 'is-active' : ''}" ${i === 1 && p.stock < 5 ? 'disabled' : ''}>
${size}
</button>`,
  )
  .join('')}
</div>
</div>`
      : ''
  }
<div class="purchase-row">
<div class="quantity" aria-label="${language === 'tr' ? 'Adet' : 'Quantity'}">
<button class="quantity-minus" aria-label="${language === 'tr' ? 'Azalt' : 'Decrease'}">−</button>
<span>
${quantity}
</span>
<button class="quantity-plus" aria-label="${language === 'tr' ? 'Artır' : 'Increase'}">+</button>
</div>
<button class="detail-cart ${p.stock === 0 ? 'detail-notify' : 'detail-add-cart'}">
${p.stock === 0 ? (language === 'tr' ? 'GELİNCE HABER VER' : 'NOTIFY ME') : language === 'tr' ? 'SEPETE EKLE' : 'ADD TO CART'}
</button>
</div>
<div class="secondary-actions">
<button class="detail-favorite ${favoritesService.has(p.id) ? 'is-active' : ''}">
${icon('heart', 18)}
<span>
${favoritesService.has(p.id) ? (language === 'tr' ? 'Favorilerden Çıkar' : 'Remove Favorite') : language === 'tr' ? 'Favorilere Ekle' : 'Add to Favorites'}
</span>
</button>
<button class="detail-compare ${comparisonService.has(p.id) ? 'is-active' : ''}">
${icon('arrow', 18)}
<span>
${comparisonService.has(p.id) ? (language === 'tr' ? 'Karşılaştırmadan Çıkar' : 'Remove from Compare') : language === 'tr' ? 'Karşılaştırmaya Ekle' : 'Add to Compare'}
</span>
</button>
</div>
<div class="delivery-notes">
<p>
${icon('truck', 18)}
<span>
${language === 'tr' ? `Kargo: ${commerceConfig.deliveryDays} iş günü` : `Delivery: ${commerceConfig.deliveryDays} business days`}
</span>
</p>
<p>
${icon('arrow', 18)}
<span>
${language === 'tr' ? `${commerceConfig.returnDays} gün ücretsiz iade` : `Free returns within ${commerceConfig.returnDays} days`}
</span>
</p>
</div>
<div class="detail-accordions">
<div>
<button aria-expanded="true">
${language === 'tr' ? 'Ürün Detayları' : 'Product Details'}
<span>−</span>
</button>
<section>
${
  p.description?.[language]
    ? `<p>
${p.description[language]}
</p>`
    : ''
}
<dl>
${Object.entries(p.attributes)
  .filter(([, v]) => v !== '—')
  .map(
    ([key, value]) => `<div>
<dt>
${key}
</dt>
<dd>
${String(value)}
</dd>
</div>`,
  )
  .join('')}
<div>
<dt>
${language === 'tr' ? 'Ürün Kodu' : 'Product Code'}
</dt>
<dd>
${p.sku}
</dd>
</div>
</dl>
</section>
</div>
<div>
<button aria-expanded="false">
${language === 'tr' ? 'Teslimat & İade' : 'Delivery & Returns'}
<span>+</span>
</button>
<section hidden>
<p>
${language === 'tr' ? 'Siparişiniz özenle hazırlanır. Kullanılmamış ürünleri 14 gün içinde ücretsiz iade edebilirsiniz.' : 'Your order is carefully prepared. Unused items can be returned free within 14 days.'}
</p>
</section>
</div>
</div>
</section>`;
const Reviews = (p: CatalogProduct, language: Language) =>
  `<section class="product-reviews" id="reviews">
<header>
<p class="eyebrow">STORE COMMUNITY</p>
<h2>
${language === 'tr' ? 'Yorumlar' : 'Reviews'}
</h2>
<button class="review-write">
${language === 'tr' ? 'YORUM YAZ' : 'WRITE A REVIEW'}
</button>
</header>
<div class="review-summary">
<strong>
${(p.rating ?? 0).toFixed(1)}
</strong>
<div>
${stars(p.rating ?? 0)}
<p>
${p.reviewCount ?? 0} ${language === 'tr' ? 'değerlendirme' : 'ratings'}
</p>
</div>
</div>
<div class="review-list">
${reviews
  .map(
    (r) => `<article>
<div>
${stars(r.rating)}
<time>
${new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-US').format(new Date(r.date))}
</time>
</div>
<h3>
${r.title?.[language] ?? (language === 'tr' ? 'Ürün değerlendirmesi' : 'Product review')}
</h3>
<p>
${r.comment[language]}
</p>
<small>
${r.author}${r.verifiedPurchase ? ` · ${language === 'tr' ? 'Doğrulanmış alışveriş' : 'Verified purchase'}` : ''}
</small>
</article>`,
  )
  .join('')}
</div>
</section>`;
const Modals = (p: CatalogProduct, language: Language) =>
  `<div class="viewer-overlay">
<div class="image-viewer" role="dialog" aria-modal="true" aria-label="${language === 'tr' ? 'Ürün görseli' : 'Product image'}">
<button class="icon-btn viewer-close" aria-label="${language === 'tr' ? 'Kapat' : 'Close'}">
${icon('x', 24)}
</button>
<button class="viewer-prev" aria-label="${language === 'tr' ? 'Önceki' : 'Previous'}">‹</button>
<div>
<img src="${p.images[0]}" alt="${p.name[language]}">
</div>
<button class="viewer-next" aria-label="${language === 'tr' ? 'Sonraki' : 'Next'}">›</button>
</div>
</div>
<dialog class="size-guide">
<button class="icon-btn size-guide-close" aria-label="${language === 'tr' ? 'Kapat' : 'Close'}">
${icon('x')}
</button>
<p class="eyebrow">STORE FIT</p>
<h2>
${language === 'tr' ? 'Beden Rehberi' : 'Size Guide'}
</h2>
<table>
<thead>
<tr>
<th>
${language === 'tr' ? 'Beden' : 'Size'}
</th>
<th>
${language === 'tr' ? 'Göğüs' : 'Chest'}
</th>
<th>
${language === 'tr' ? 'Bel' : 'Waist'}
</th>
<th>
${language === 'tr' ? 'Kalça' : 'Hip'}
</th>
</tr>
</thead>
<tbody>
<tr>
<td>S</td>
<td>86</td>
<td>68</td>
<td>94</td>
</tr>
<tr>
<td>M</td>
<td>92</td>
<td>74</td>
<td>100</td>
</tr>
<tr>
<td>L</td>
<td>98</td>
<td>80</td>
<td>106</td>
</tr>
</tbody>
</table>
</dialog>
${NotifyStockDialog(language)}`;
export const ProductDetailPage = (language: Language, currency: Currency) => {
  const p = getProductBySlug(slug());
  if (!p)
    return `${CategoryNavigation('', language)}
<main class="product-not-found">
<p class="eyebrow">404</p>
<h1>
${language === 'tr' ? 'Ürün bulunamadı.' : 'Product not found.'}
</h1>
<a href="/category/all" data-category-route="all">
${language === 'tr' ? 'ÜRÜNLERE DÖN' : 'BACK TO PRODUCTS'}
</a>
</main>`;
  recentlyViewedService.add(p.id);
  const category = categories.find((c) => c.id === p.categoryId);
  const sub = categories.find((c) => c.id === p.subcategoryId);
  const similar = getSimilarProducts(p, catalogProducts).slice(0, 4);
  document.title = `${p.name[language]} | STORE`;
  return `${CategoryNavigation(p.categoryId, language)}
<main class="product-page">
<nav class="breadcrumbs" aria-label="Breadcrumb">
<a href="/" data-home-route>
${language === 'tr' ? 'Ana Sayfa' : 'Home'}
</a>
<span>/</span>
<a href="/category/${p.categoryId}" data-category-route="${p.categoryId}">
${category?.name[language] ?? p.categoryId}
</a>
${
  sub
    ? `<span>/</span>
<a href="/category/${p.categoryId}/${sub.slug}" data-category-route="${sub.slug}">
${sub.name[language]}
</a>`
    : ''
}
<span>/</span>
<span aria-current="page">
${p.name[language]}
</span>
</nav>
<div class="product-detail">
${Gallery(p, language)}${ProductInfo(p, language, currency)}
</div>
${Reviews(p, language)}${
    similar.length
      ? `<section class="detail-recommendations">
<header>
<p class="eyebrow">DISCOVER MORE</p>
<h2>
${language === 'tr' ? 'Benzer Ürünler' : 'You may also like'}
</h2>
</header>
<div>
${similar.map((item, i) => CatalogProductCard(item, language, currency, i)).join('')}
</div>
</section>`
      : ''
  }
</main>
${Modals(p, language)}
<div class="mobile-product-cta">
${Price(p, language, currency)}
<button class="${p.stock === 0 ? 'detail-notify' : 'detail-add-cart'}">
${p.stock === 0 ? (language === 'tr' ? 'HABER VER' : 'NOTIFY ME') : language === 'tr' ? 'SEPETE EKLE' : 'ADD TO CART'}
</button>
</div>`;
};
export const resetProductState = () => {
  selectedImage = 0;
  selectedColor = '';
  selectedSize = '';
  quantity = 1;
};
const colorFilter = (color: string) =>
  color === 'Siyah'
    ? 'brightness(.72) contrast(1.08)'
    : color === 'Kum'
      ? 'sepia(.2) saturate(.82) brightness(1.06)'
      : color === 'Haki'
        ? 'sepia(.25) hue-rotate(28deg) saturate(.78)'
        : color === 'Lacivert'
          ? 'brightness(.78) saturate(1.15) hue-rotate(178deg)'
          : 'brightness(1.06) saturate(.82)';
const variantStock = (p: CatalogProduct, color: string, size: string) =>
  p.variantStock?.[color]?.[size] ??
  Math.max(
    0,
    Math.min(
      p.stock,
      (p.id.length + color.length + p.sizes.indexOf(size)) % 5 === 0
        ? 0
        : 1 + ((p.stock + p.sizes.indexOf(size)) % 4),
    ),
  );
export const initProductDetail = (
  language: Language,
  rerender: () => void,
  toast: (message: string) => void,
  navigate: (path: string) => void,
) => {
  const p = getProductBySlug(slug());
  if (!p) return;
  const activeColor = () => selectedColor || p.colors[0] || '';
  const updateBadge = () => {
    const badge = document.querySelector<HTMLElement>('.cart-count');
    if (badge) {
      badge.textContent = String(cartService.count());
      badge.classList.toggle('is-visible', cartService.count() > 0);
    }
  };
  const updateVariants = () => {
    const color = activeColor(),
      filter = colorFilter(color),
      suffix = `#variant-${encodeURIComponent(color)}`;
    document.querySelector<HTMLElement>('.variant-group strong')?.replaceChildren(color);
    document
      .querySelectorAll<HTMLImageElement>('.detail-gallery img,.image-viewer img')
      .forEach((image) => {
        image.src = `${p.images[0].split('#')[0]}${suffix}`;
        image.style.filter = filter;
      });
    document.querySelectorAll<HTMLButtonElement>('[data-color]').forEach((button) => {
      const active = button.dataset.color === color;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll<HTMLButtonElement>('[data-size]').forEach((button) => {
      const size = button.dataset.size ?? '',
        stock = variantStock(p, color, size),
        active = selectedSize === size;
      button.disabled = stock === 0;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute(
        'aria-label',
        `${language === 'tr' ? 'Beden' : 'Size'} ${size}${stock === 0 ? ` — ${language === 'tr' ? 'stokta yok' : 'out of stock'}` : ''}`,
      );
    });
    const available = selectedSize ? variantStock(p, color, selectedSize) : p.stock;
    const note = document.querySelector<HTMLElement>('.stock-note');
    if (note)
      note.textContent =
        available === 0
          ? language === 'tr'
            ? 'Bu varyant stokta yok'
            : 'This variant is out of stock'
          : available <= 3
            ? language === 'tr'
              ? `Bu varyantta son ${available} ürün`
              : `Only ${available} left in this variant`
            : language === 'tr'
              ? 'Stokta'
              : 'In stock';
  };
  updateVariants();
  document.querySelectorAll<HTMLElement>('[data-image-index]').forEach((btn) =>
    btn.addEventListener('click', () => {
      selectedImage = Number(btn.dataset.imageIndex);
      rerender();
    }),
  );
  document.querySelectorAll<HTMLButtonElement>('[data-color]').forEach((btn) =>
    btn.addEventListener('click', () => {
      selectedColor = btn.dataset.color ?? '';
      selectedImage = 0;
      if (selectedSize && variantStock(p, selectedColor, selectedSize) === 0) selectedSize = '';
      updateVariants();
    }),
  );
  document.querySelectorAll<HTMLButtonElement>('[data-size]').forEach((btn) =>
    btn.addEventListener('click', () => {
      selectedSize = btn.dataset.size ?? '';
      quantity = Math.min(quantity, variantStock(p, activeColor(), selectedSize));
      updateVariants();
    }),
  );
  document.querySelectorAll('.quantity-minus').forEach((btn) =>
    btn.addEventListener('click', () => {
      quantity = Math.max(1, quantity - 1);
      rerender();
    }),
  );
  document.querySelectorAll('.quantity-plus').forEach((btn) =>
    btn.addEventListener('click', () => {
      const limit = selectedSize ? variantStock(p, activeColor(), selectedSize) : p.stock;
      quantity = Math.min(limit, quantity + 1);
      rerender();
    }),
  );
  const add = () => {
    if (p.sizes.length && !selectedSize) {
      toast(language === 'tr' ? 'Lütfen bir beden seçin.' : 'Please select a size.');
      return;
    }
    if (selectedSize && variantStock(p, activeColor(), selectedSize) === 0) {
      toast(
        language === 'tr'
          ? 'Seçtiğiniz varyant stokta yok.'
          : 'The selected variant is out of stock.',
      );
      return;
    }
    for (let i = 0; i < quantity; i++)
      cartService.add(p.id, { color: activeColor() || undefined, size: selectedSize || undefined });
    updateBadge();
    toast(
      language === 'tr'
        ? `${activeColor()} / ${selectedSize} sepete eklendi.`
        : `${activeColor()} / ${selectedSize} added to cart.`,
    );
  };
  document
    .querySelectorAll('.detail-add-cart')
    .forEach((btn) => btn.addEventListener('click', add));
  document
    .querySelectorAll('.detail-notify')
    .forEach((btn) =>
      btn.addEventListener('click', () =>
        document.querySelector<HTMLDialogElement>('.notify-dialog')?.showModal(),
      ),
    );
  document.querySelector('.detail-favorite')?.addEventListener('click', () => {
    favoritesService.toggle(p.id);
    rerender();
    toast(
      favoritesService.has(p.id)
        ? language === 'tr'
          ? 'Favorilere eklendi.'
          : 'Added to favorites.'
        : language === 'tr'
          ? 'Favorilerden çıkarıldı.'
          : 'Removed from favorites.',
    );
  });
  document.querySelector('.detail-compare')?.addEventListener('click', () => {
    comparisonService.toggle(p.id);
    rerender();
    toast(language === 'tr' ? 'Karşılaştırma listeniz güncellendi.' : 'Comparison list updated.');
  });
  document.querySelectorAll('.detail-accordions>div>button').forEach((btn) =>
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      btn.querySelector('span')!.textContent = open ? '+' : '−';
      (btn.nextElementSibling as HTMLElement).hidden = open;
    }),
  );
  const guide = document.querySelector<HTMLDialogElement>('.size-guide');
  document.querySelector('.size-guide-open')?.addEventListener('click', () => guide?.showModal());
  document.querySelector('.size-guide-close')?.addEventListener('click', () => guide?.close());
  document
    .querySelector('.review-write')
    ?.addEventListener('click', () =>
      toast(
        language === 'tr'
          ? 'Yorumunuz değerlendirilmek üzere alındı.'
          : 'Your review was received for moderation.',
      ),
    );
  const viewer = document.querySelector<HTMLElement>('.viewer-overlay');
  const setViewer = (open: boolean) => viewer?.classList.toggle('is-open', open);
  document.querySelector('.image-viewer-open')?.addEventListener('click', () => setViewer(true));
  document.querySelector('.viewer-close')?.addEventListener('click', () => setViewer(false));
  viewer?.addEventListener('click', (e) => {
    if (e.target === viewer) setViewer(false);
  });
  document.querySelectorAll('.detail-recommendations [data-product-route]').forEach((link) =>
    link.addEventListener('click', (event) => {
      event.preventDefault();
      resetProductState();
      navigate(`/product/${(link as HTMLElement).dataset.productRoute}`);
    }),
  );
};
