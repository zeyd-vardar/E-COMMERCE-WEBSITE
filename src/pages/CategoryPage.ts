import { CategoryNavigation } from '../components/CategoryNavigation';
import { CatalogProductCard } from '../components/CatalogProductCard';
import { FilterDrawer } from '../components/FilterDrawer';
import { ComparisonBar } from '../components/ComparisonBar';
import { NotifyStockDialog } from '../components/NotifyStockDialog';
import { catalogProducts } from '../data/allProducts';
import { categoryTree, getCategory } from '../data/categories';
import { categoryHref, categoryPath, resolveCategoryPath } from '../utils/categoryRoutes';
import { applyFilters, productsForCategory, sortCatalog } from '../utils/catalog';
import { cartService } from '../services/cartService';
import { favoritesService } from '../services/favoritesService';
import { comparisonService } from '../services/comparisonService';
import type { Currency, Language, SortOption } from '../types';
const BATCH = 12;
let visible = BATCH;
let activeFilters = new Map<string, Set<string>>();
let observer: IntersectionObserver | undefined;
const currentSlug = () => location.pathname.split('/').filter(Boolean).at(-1) ?? 'all';
const currentSegments = () => location.pathname.split('/').filter(Boolean).slice(1);
const currentSort = (): SortOption =>
  (new URLSearchParams(location.search).get('sort') as SortOption) ?? 'recommended';
const listFor = (language: Language) =>
  sortCatalog(
    applyFilters(
      productsForCategory(
        catalogProducts,
        currentSlug(),
        location.pathname.split('/').filter(Boolean).slice(1),
      ),
      activeFilters,
    ),
    currentSort(),
    language,
  );
export const CategoryPage = (language: Language, currency: Currency) => {
  const slug = currentSlug(),
    segments = currentSegments(),
    resolved = resolveCategoryPath(categoryTree, segments),
    category = resolved.at(-1) ?? getCategory(slug),
    active = resolved[0]?.id ?? slug;
  const baseList = productsForCategory(catalogProducts, slug, segments),
    list = listFor(language);
  const count = Math.min(visible, list.length);
  const activeFilterCount = [...activeFilters.values()].reduce(
    (total, values) => total + values.size,
    0,
  );
  const crumbs = resolved
    .slice(0, -1)
    .map((node, index) => {
      const route = categoryPath(segments.slice(0, index + 1));
      return `<a href="${categoryHref(segments.slice(0, index + 1))}" data-category-route="${route}">
${node.name[language]}
</a>
<span>/</span>`;
    })
    .join('');
  return `${CategoryNavigation(active, language)}
<div class="category-page">
<nav class="breadcrumbs" aria-label="Breadcrumb">
<a href="/" data-home-route>
${language === 'tr' ? 'Ana Sayfa' : 'Home'}
</a>
<span>/</span>
${crumbs}
<span aria-current="page">
${category.name[language]}
</span>
</nav>
<header class="category-toolbar">
<div>
<p class="eyebrow">STORE COLLECTION</p>
<h1>
${category.name[language]}
</h1>
<span class="product-count">
${list.length} ${language === 'tr' ? 'ürün' : 'products'}
</span>
</div>
<div class="toolbar-actions">
<button class="compare-toolbar">
${language === 'tr' ? 'Karşılaştır' : 'Compare'} <span>(${comparisonService.all().length})</span>
</button>
<label>
<span>
${language === 'tr' ? 'Sırala' : 'Sort'}
</span>
<select class="sort-select">
<option value="recommended">
${language === 'tr' ? 'Önerilen' : 'Recommended'}
</option>
<option value="price-asc">
${language === 'tr' ? 'Fiyat: Artan' : 'Price: Low to high'}
</option>
<option value="price-desc">
${language === 'tr' ? 'Fiyat: Azalan' : 'Price: High to low'}
</option>
<option value="newest">
${language === 'tr' ? 'En Yeni' : 'Newest'}
</option>
<option value="discount">
${language === 'tr' ? 'En Çok İndirim' : 'Biggest discount'}
</option>
<option value="name-asc">
${language === 'tr' ? 'Ürün Adı: A-Z' : 'Product: A-Z'}
</option>
<option value="name-desc">
${language === 'tr' ? 'Ürün Adı: Z-A' : 'Product: Z-A'}
</option>
</select>
</label>
<button class="filter-trigger">
${language === 'tr' ? 'Filtrele' : 'Filter'}${activeFilterCount ? ` <span>(${activeFilterCount})</span>` : ''}
</button>
</div>
</header>
<div class="active-filters">
${[...activeFilters]
  .flatMap(([key, set]) =>
    [...set].map(
      (value) => `<button data-remove-filter="${key}:${value}">
${value} ×</button>`,
    ),
  )
  .join('')}
</div>
${
  list.length
    ? `<section class="catalog-grid" aria-label="${category.name[language]}">
${list
  .slice(0, count)
  .map((p, i) => CatalogProductCard(p, language, currency, i))
  .join('')}
</section>
<div class="infinite-sentinel" aria-live="polite">
${
  count < list.length
    ? `<span class="loader">
</span>`
    : language === 'tr'
      ? 'Tüm ürünleri görüntülediniz.'
      : 'You have viewed all products.'
}
</div>`
    : `<div class="catalog-empty">
<h2>
${language === 'tr' ? 'Aradığınız ürünleri bulamadık.' : 'No matching products.'}
</h2>
<p>
${language === 'tr' ? 'Filtreleri temizleyerek yeniden deneyin.' : 'Clear your filters and try again.'}
</p>
<button class="empty-clear">
${language === 'tr' ? 'FİLTRELERİ TEMİZLE' : 'CLEAR FILTERS'}
</button>
</div>`
}
</div>
${FilterDrawer(slug, language, activeFilters, baseList)}${ComparisonBar(comparisonService.all().length, language)}${NotifyStockDialog(language)}`;
};
export const resetCategoryState = () => {
  visible = BATCH;
  activeFilters = new Map();
};
export const initCategoryPage = (
  language: Language,
  rerender: () => void,
  toast: (message: string) => void,
  navigate: (path: string) => void,
) => {
  document.querySelector<HTMLSelectElement>('.sort-select')!.value = currentSort();
  const refresh = () => {
    observer?.disconnect();
    rerender();
  };
  document.querySelectorAll<HTMLElement>('.catalog-card').forEach((card) => {
    const id = card.dataset.productId!;
    card.querySelector('.catalog-favorite')?.addEventListener('click', (event) => {
      const active = favoritesService.toggle(id);
      (event.currentTarget as HTMLElement).classList.toggle('is-active', active);
      toast(
        active
          ? language === 'tr'
            ? 'Favorilere eklendi.'
            : 'Added to favorites.'
          : language === 'tr'
            ? 'Favorilerden çıkarıldı.'
            : 'Removed from favorites.',
      );
    });
    card.querySelector('.compare-input')?.addEventListener('change', () => {
      comparisonService.toggle(id);
      refresh();
    });
    card.querySelector('.add-cart')?.addEventListener('click', () => {
      cartService.add(id);
      const badge = document.querySelector<HTMLElement>('.cart-count');
      if (badge) {
        badge.textContent = String(cartService.count());
        badge.classList.add('is-visible');
      }
      toast(language === 'tr' ? 'Ürün sepete eklendi.' : 'Added to cart.');
    });
    card.querySelector('.notify-btn')?.addEventListener('click', () => openNotify());
  });
  const drawer = document.querySelector<HTMLElement>('.filter-drawer');
  const overlay = document.querySelector<HTMLElement>('.filter-overlay');
  const setDrawer = (open: boolean) => {
    drawer?.classList.toggle('is-open', open);
    overlay?.classList.toggle('is-open', open);
    drawer?.setAttribute('aria-hidden', String(!open));
    if (open) drawer?.querySelector<HTMLElement>('button')?.focus();
  };
  document.querySelector('.filter-trigger')?.addEventListener('click', () => setDrawer(true));
  document.querySelector('.filter-close')?.addEventListener('click', () => setDrawer(false));
  overlay?.addEventListener('click', () => setDrawer(false));
  document.querySelector('.filter-apply')?.addEventListener('click', () => {
    const next = new Map<string, Set<string>>();
    drawer?.querySelectorAll<HTMLInputElement>('[data-filter-key]:checked').forEach((input) => {
      const key = input.dataset.filterKey!;
      if (!next.has(key)) next.set(key, new Set());
      next.get(key)!.add(input.value);
    });
    drawer?.querySelectorAll<HTMLInputElement>('[data-price-filter]').forEach((input) => {
      const value = input.value.trim();
      if (value) next.set(input.dataset.priceFilter!, new Set([value]));
    });
    activeFilters = next;
    visible = BATCH;
    refresh();
  });
  const clear = () => {
    activeFilters.clear();
    visible = BATCH;
    refresh();
  };
  document.querySelector('.filter-clear')?.addEventListener('click', clear);
  document.querySelector('.empty-clear')?.addEventListener('click', clear);
  document.querySelectorAll<HTMLElement>('[data-remove-filter]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const [key, value] = btn.dataset.removeFilter!.split(':');
      activeFilters.get(key)?.delete(value);
      visible = BATCH;
      refresh();
    }),
  );
  document.querySelector<HTMLSelectElement>('.sort-select')?.addEventListener('change', (event) => {
    const value = (event.target as HTMLSelectElement).value;
    const url = new URL(location.href);
    value === 'recommended' ? url.searchParams.delete('sort') : url.searchParams.set('sort', value);
    history.replaceState({}, '', url);
    visible = BATCH;
    refresh();
  });
  document.querySelector('.comparison-clear')?.addEventListener('click', () => {
    comparisonService.clear();
    refresh();
  });
  document.querySelector('[data-compare-route]')?.addEventListener('click', (event) => {
    event.preventDefault();
    navigate('/compare');
  });
  const sentinel = document.querySelector('.infinite-sentinel');
  if (sentinel && visible < listFor(language).length) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          visible = Math.min(visible + BATCH, listFor(language).length);
          refresh();
        }
      },
      { rootMargin: '500px' },
    );
    observer.observe(sentinel);
  }
  const dialog = document.querySelector<HTMLDialogElement>('.notify-dialog');
  const modalOverlay = document.querySelector<HTMLElement>('.modal-overlay');
  function openNotify() {
    dialog?.showModal();
    modalOverlay?.classList.add('is-open');
  }
  const closeNotify = () => {
    dialog?.close();
    modalOverlay?.classList.remove('is-open');
  };
  document.querySelector('.notify-close')?.addEventListener('click', closeNotify);
  modalOverlay?.addEventListener('click', closeNotify);
  dialog?.querySelector('form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (!form.reportValidity()) return;
    closeNotify();
    toast(
      language === 'tr'
        ? 'Talebiniz alındı. Ürün tekrar stoklara geldiğinde bilgilendirileceksiniz.'
        : 'Request received. We’ll notify you when it is back.',
    );
  });
  document
    .querySelector('.compare-toolbar')
    ?.addEventListener('click', () =>
      comparisonService.all().length >= 2
        ? navigate('/compare')
        : toast(
            language === 'tr'
              ? 'Karşılaştırmak için en az 2 ürün seçin.'
              : 'Select at least 2 products.',
          ),
    );
};
