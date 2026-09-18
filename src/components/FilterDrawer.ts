import { icon } from '../utils/icons';
import type { CatalogProduct, Language } from '../types';
import { categoryTree } from '../data/categories';

const unique = (values: string[]) =>
  [...new Set(values)].filter(Boolean).sort((a, b) => a.localeCompare(b, 'tr'));
const categoryNames: Record<string, { tr: string; en: string }> = {
  women: { tr: 'Kadın', en: 'Women' },
  men: { tr: 'Erkek', en: 'Men' },
  kids: { tr: 'Çocuk', en: 'Kids' },
  accessories: { tr: 'Aksesuar', en: 'Accessories' },
};
const categoryLabels = new Map<string, { tr: string; en: string }>();
const collectLabels = (nodes: typeof categoryTree) =>
  nodes.forEach((node) => {
    categoryLabels.set(node.slug, node.name);
    if (node.children) collectLabels(node.children);
  });
collectLabels(categoryTree);
const checks = (
  key: string,
  label: string,
  values: string[],
  active: Map<string, Set<string>>,
  translate?: (value: string) => string,
) =>
  values.length
    ? `<fieldset>
<legend>
${label}
</legend>
${values
  .map(
    (value) => `<label>
<input type="checkbox" data-filter-key="${key}" value="${value}" ${active.get(key)?.has(value) ? 'checked' : ''}>
<span>
${translate?.(value) ?? value}
</span>
</label>`,
  )
  .join('')}
</fieldset>`
    : '';

export const FilterDrawer = (
  _category: string,
  language: Language,
  active: Map<string, Set<string>>,
  items: CatalogProduct[],
) => {
  const categories = unique(items.map((product) => product.categoryId)),
    clothingCategories = unique(
      items
        .filter((product) => product.categoryPath?.includes('clothing'))
        .map((product) => product.categoryPath?.at(-1) ?? ''),
    ),
    brands = unique(items.map((product) => product.brand)),
    colors = unique(items.flatMap((product) => product.colors)),
    sizes = unique(items.flatMap((product) => product.sizes));
  const min = active.get('minPrice')?.values().next().value ?? '',
    max = active.get('maxPrice')?.values().next().value ?? '';
  const filterGroups = [
    checks(
      'category',
      language === 'tr' ? 'Kategori' : 'Category',
      categories,
      active,
      (value) => categoryNames[value]?.[language] ?? value,
    ),
    checks(
      'clothingCategory',
      language === 'tr' ? 'Giyim Kategorisi' : 'Clothing Category',
      clothingCategories,
      active,
      (value) => categoryLabels.get(value)?.[language] ?? value,
    ),
    checks('brand', language === 'tr' ? 'Marka' : 'Brand', brands, active),
    checks('color', language === 'tr' ? 'Renk' : 'Color', colors, active),
    checks('size', language === 'tr' ? 'Beden' : 'Size', sizes, active),
    checks(
      'availability',
      language === 'tr' ? 'Stok Durumu' : 'Availability',
      ['in-stock', 'out-of-stock'],
      active,
      (value) => {
        if (value === 'in-stock') {
          return language === 'tr' ? 'Stokta var' : 'In stock';
        }

        return language === 'tr' ? 'Stokta yok' : 'Out of stock';
      },
    ),
    checks('discount', language === 'tr' ? 'İndirim' : 'Discount', ['discounted'], active, () =>
      language === 'tr' ? 'İndirimli ürünler' : 'On sale',
    ),
  ].join('');

  return `<div class="filter-overlay">
</div>
<aside class="filter-drawer" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="filter-title">
<header>
<div>
<p class="eyebrow">STORE</p>
<h2 id="filter-title">
${language === 'tr' ? 'Filtrele' : 'Filter'}
</h2>
</div>
<button class="icon-btn filter-close" aria-label="${language === 'tr' ? 'Filtreyi kapat' : 'Close filters'}">
${icon('x')}
</button>
</header>
<div class="filter-groups">
${filterGroups}
<fieldset>
<legend>
${language === 'tr' ? 'Fiyat Aralığı' : 'Price Range'}
</legend>
<div class="price-range">
<label>
<span>
${language === 'tr' ? 'Minimum' : 'Minimum'}
</span>
<input type="number" min="0" step="10" inputmode="numeric" data-price-filter="minPrice" value="${min}" placeholder="0">
</label>
<label>
<span>
${language === 'tr' ? 'Maksimum' : 'Maximum'}
</span>
<input type="number" min="0" step="10" inputmode="numeric" data-price-filter="maxPrice" value="${max}" placeholder="∞">
</label>
</div>
</fieldset>
</div>
<footer>
<button class="filter-clear">
${language === 'tr' ? 'TEMİZLE' : 'CLEAR'}
</button>
<button class="filter-apply">
${language === 'tr' ? 'SONUÇLARI GÖSTER' : 'SHOW RESULTS'}
</button>
</footer>
</aside>`;
};
