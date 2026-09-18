import { CategoryNavigation } from '../components/CategoryNavigation';
import { catalogProducts } from '../data/allProducts';
import { comparisonService } from '../services/comparisonService';
import { formatCurrency } from '../utils/currency';
import type { Currency, Language } from '../types';
export const ComparePage = (language: Language, currency: Currency) => {
  const selected = catalogProducts.filter((p) => comparisonService.has(p.id));
  const attrs = [...new Set(selected.flatMap((p) => Object.keys(p.attributes)))];
  return `${CategoryNavigation('', language)}
<main class="compare-page">
<a href="/category/all" data-category-route="all" class="back-link">← ${language === 'tr' ? 'Ürünlere dön' : 'Back to products'}
</a>
<p class="eyebrow">STORE SELECT</p>
<h1>
${language === 'tr' ? 'Ürün Karşılaştırma' : 'Product Comparison'}
</h1>
${
  selected.length
    ? `<div class="compare-table" style="--compare-count:${selected.length}">
<div class="compare-label">
${language === 'tr' ? 'Ürün' : 'Product'}
</div>
${selected
  .map(
    (p) => `<div>
<strong>
${p.name[language]}
</strong>
<small>
${p.brand}
</small>
</div>`,
  )
  .join('')}
<div class="compare-label">
${language === 'tr' ? 'Fiyat' : 'Price'}
</div>
${selected
  .map(
    (p) => `<div>
${formatCurrency(p.price, currency, language)}
</div>`,
  )
  .join('')}
<div class="compare-label">
${language === 'tr' ? 'Kategori' : 'Category'}
</div>
${selected
  .map(
    (p) => `<div>
${p.categoryId}
</div>`,
  )
  .join('')}
<div class="compare-label">
${language === 'tr' ? 'Stok' : 'Stock'}
</div>
${selected
  .map(
    (p) => `<div>
${p.stock || '—'}
</div>`,
  )
  .join('')}${attrs
        .map(
          (a) => `<div class="compare-label">
${a}
</div>
${selected
  .map(
    (p) => `<div>
${String(p.attributes[a] ?? '—')}
</div>`,
  )
  .join('')}`,
        )
        .join('')}
</div>`
    : `<div class="catalog-empty">
<h2>
${language === 'tr' ? 'Karşılaştırmak için ürün seçin.' : 'Choose products to compare.'}
</h2>
<a href="/category/all" data-category-route="all">
${language === 'tr' ? 'ÜRÜNLERİ GÖR' : 'VIEW PRODUCTS'}
</a>
</div>`
}
</main>`;
};
