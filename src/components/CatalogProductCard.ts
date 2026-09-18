import type { CatalogProduct, Currency, Language } from '../types';
import { icon } from '../utils/icons';
import { formatCurrency } from '../utils/currency';
import { discountOf } from '../utils/catalog';
import { favoritesService } from '../services/favoritesService';
import { comparisonService } from '../services/comparisonService';
export const CatalogProductCard = (
  p: CatalogProduct,
  language: Language,
  currency: Currency,
  index: number,
) => {
  const discount = discountOf(p);
  const imageCount = p.images.length;
  return `<article class="catalog-card" data-product-id="${p.id}">
<div class="catalog-image" style="--image-position:${p.imagePosition}">
<div class="catalog-gallery" aria-label="${p.name[language]} — ${imageCount} ${language === 'tr' ? 'görsel' : 'images'}">
${p.images
  .map(
    (
      image,
      imageIndex,
    ) => `<a class="catalog-gallery-slide" href="/product/${p.slug}" data-product-route="${p.slug}" aria-label="${p.name[language]}${imageCount > 1 ? `, ${imageIndex + 1}. ${language === 'tr' ? 'görsel' : 'image'}` : ''}">
<img
  src="${image}"
  alt="${imageIndex === 0 ? p.name[language] : ''}"
  draggable="false"
  loading="${index < 6 && imageIndex === 0 ? 'eager' : 'lazy'}"
  style="transform-origin:${imageIndex === 0 ? p.imagePosition : '50% 50%'}"
  onerror="this.hidden=true;this.parentElement?.classList.add('image-error')"
>
</a>`,
  )
  .join('')}
</div>
${
  imageCount > 1
    ? `<button type="button" class="catalog-gallery-arrow is-prev" data-gallery-direction="-1" aria-label="${language === 'tr' ? 'Önceki görsel' : 'Previous image'}" disabled>${icon('chevron', 16)}</button>
<button type="button" class="catalog-gallery-arrow is-next" data-gallery-direction="1" aria-label="${language === 'tr' ? 'Sonraki görsel' : 'Next image'}">${icon('chevron', 16)}</button>
<div class="catalog-gallery-dots" aria-label="${imageCount} ${language === 'tr' ? 'görsel' : 'images'}">
${p.images.map((_, imageIndex) => `<span class="catalog-gallery-dot ${imageIndex === 0 ? 'is-active' : ''}"></span>`).join('')}
</div>`
    : ''
}
<button class="icon-btn catalog-favorite ${favoritesService.has(p.id) ? 'is-active' : ''}" aria-label="${language === 'tr' ? 'Favoriyi değiştir' : 'Toggle favorite'}">
${icon('heart', 19)}
</button>
${
  discount
    ? `<span class="discount-badge">−%${discount}
</span>`
    : p.isNew
      ? `<span class="new-badge">
${language === 'tr' ? 'YENİ' : 'NEW'}
</span>`
      : ''
}${
    p.stock === 0
      ? `<span class="stock-badge">
${language === 'tr' ? 'STOKTA YOK' : 'OUT OF STOCK'}
</span>`
      : ''
  }
</div>
<div class="catalog-info">
<p class="catalog-brand">
${p.brand}
</p>
<a href="/product/${p.slug}" data-product-route="${p.slug}">
<h3>
${p.name[language]}
</h3>
</a>
<div class="catalog-price">
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
</div>
<label class="compare-choice">
<input type="checkbox" class="compare-input" ${comparisonService.has(p.id) ? 'checked' : ''}>
<span>
${language === 'tr' ? 'Karşılaştır' : 'Compare'}
</span>
</label>
<button class="catalog-cart ${p.stock === 0 ? 'notify-btn' : 'add-cart'}">
${p.stock === 0 ? (language === 'tr' ? 'GELİNCE HABER VER' : 'NOTIFY ME') : language === 'tr' ? 'SEPETE EKLE' : 'ADD TO CART'}
</button>
</div>
</article>`;
};
