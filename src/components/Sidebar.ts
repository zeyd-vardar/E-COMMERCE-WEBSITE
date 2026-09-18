import { secondaryMenu } from '../data/menu';
import { categoryTree } from '../data/categories';
import { categoryHref, categoryPath } from '../utils/categoryRoutes';
import { icon } from '../utils/icons';
import type { CategoryNode, Currency, Language } from '../types';

const nested = (nodes: CategoryNode[], language: Language, path: string[], depth = 0): string =>
  nodes
    .map((node) => {
      const segments = [...path, node.slug];
      const route = categoryPath(segments);
      const href = categoryHref(segments);
      return node.children?.length
        ? `<div class="sidebar-category depth-${depth}">
<button class="sidebar-category-toggle" aria-expanded="false">
<span>
${node.name[language]}
</span>
${icon('chevron', 16)}
</button>
<div class="sidebar-children">
<a class="sidebar-all-link" href="${href}" data-category-route="${route}">
${language === 'tr' ? `Tüm ${node.name.tr}` : `All ${node.name.en}`} →</a>
${nested(node.children, language, segments, depth + 1)}
</div>
</div>`
        : `<a class="sidebar-leaf depth-${depth}" href="${href}" data-category-route="${route}">
${node.name[language]}
</a>`;
    })
    .join('');

export const Sidebar = (language: Language, currency: Currency) =>
  `<div class="sidebar-overlay" id="sidebar-overlay">
</div>
<aside class="sidebar" id="sidebar" aria-hidden="true" aria-label="${language === 'tr' ? 'Ana menü' : 'Main menu'}">
<div class="sidebar-head">
<a class="brand sidebar-brand-logo" href="/" data-home-route aria-label="STORE">
<img src="/store-logo.svg" alt="STORE">
</a>
<button class="icon-btn sidebar-close" aria-label="${language === 'tr' ? 'Menüyü kapat' : 'Close menu'}">
${icon('x', 24)}
</button>
</div>
<nav class="sidebar-tree" aria-label="${language === 'tr' ? 'Kategoriler' : 'Categories'}">
${nested(categoryTree, language, [])}
</nav>
<nav class="sidebar-actions" aria-label="${language === 'tr' ? 'Hızlı işlemler' : 'Quick actions'}">
<a href="/tracking" data-route="tracking">
${icon('truck', 18)}
<span>
${language === 'tr' ? 'Kargo Takip' : 'Track order'}
</span>
</a>
<a href="/favorites" data-route="favorites">
${icon('heart', 18)}
<span>
${language === 'tr' ? 'Favoriler' : 'Favorites'}
</span>
</a>
<a href="/cart" data-route="cart">
${icon('bag', 18)}
<span>
${language === 'tr' ? 'Sepet' : 'Cart'}
</span>
</a>
<a href="/account" data-route="account">
${icon('user', 18)}
<span>
${language === 'tr' ? 'Hesabım' : 'Account'}
</span>
</a>
</nav>
<nav class="sidebar-secondary">
${secondaryMenu
  .map(
    (item) => `<a href="${item.href}" data-route="${item.id}">
${item.label[language]}
</a>
${
  item.id === 'help'
    ? `<button class="sidebar-support-trigger" type="button" aria-expanded="false" aria-controls="support-panel">
${language === 'tr' ? 'Canlı Destek' : 'Live Support'}
</button>`
    : ''
}`,
  )
  .join('')}
</nav>
<div class="sidebar-footer">
<label>
<span class="sr-only">
${language === 'tr' ? 'Para birimi' : 'Currency'}
</span>
<select id="sidebar-currency">
<option ${currency === 'TRY' ? 'selected' : ''}>TRY</option>
<option ${currency === 'USD' ? 'selected' : ''}>USD</option>
<option ${currency === 'EUR' ? 'selected' : ''}>EUR</option>
</select>
</label>
<button class="sidebar-lang">
${language === 'tr' ? 'English' : 'Türkçe'}
</button>
<span>© 2026 STORE</span>
</div>
</aside>`;
