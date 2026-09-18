import { categoryTree } from '../data/categories';
import { categoryHref, categoryPath } from '../utils/categoryRoutes';
import type { CategoryNode, Language } from '../types';

const routeAttributes = (segments: string[], kind: 'cta' | 'group' | 'leaf') => {
  const route = categoryPath(segments);
  return `class="mega-menu-link mega-menu-${kind}" href="${categoryHref(segments)}" data-category-link data-category-route="${route}" data-category-kind="${kind}"`;
};

const childLinks = (nodes: CategoryNode[], language: Language, path: string[]): string =>
  nodes
    .map((node) => {
      const segments = [...path, node.slug];
      if (node.children?.length) {
        return `<div class="mega-subgroup">
<h4>
<a ${routeAttributes(segments, 'group')}>
${node.name[language]}
</a>
</h4>
${childLinks(node.children, language, segments)}
</div>`;
      }
      return `<a ${routeAttributes(segments, 'leaf')} data-category-leaf="${node.id}" data-category-id="${node.id}">
${node.name[language]}
</a>`;
    })
    .join('');

const column = (node: CategoryNode, parent: CategoryNode, language: Language) => {
  const segments = [parent.slug, node.slug];
  return `<div class="mega-column">
<h3>
<a ${routeAttributes(segments, 'group')}>
${node.name[language]}
</a>
</h3>
${
  node.children?.length
    ? childLinks(node.children, language, segments)
    : `<a ${routeAttributes(segments, 'leaf')} data-category-leaf="${node.id}" data-category-id="${node.id}">
${language === 'tr' ? 'Tümünü Gör' : 'View All'}
</a>`
}
</div>`;
};

export const CategoryNavigation = (active: string, language: Language) =>
  `<nav class="category-nav" aria-label="${language === 'tr' ? 'Ürün kategorileri' : 'Product categories'}">
<div class="category-triggers">
${categoryTree
  .map(
    (node) => `<button
  class="category-trigger ${node.id === active ? 'is-active' : ''}"
  type="button"
  data-mega-trigger="${node.id}"
  data-category-slug="${node.slug}"
  aria-expanded="false"
  aria-controls="mega-${node.id}"
>
${node.name[language]}
</button>`,
  )
  .join('')}
</div>
${categoryTree
  .map(
    (node) => `<section
  class="mega-menu"
  id="mega-${node.id}"
  data-mega-panel="${node.id}"
  aria-hidden="true"
>
<header>
<div>
<p class="eyebrow">STORE / ${node.name[language].toUpperCase()}
</p>
<h2>
${node.name[language]}
</h2>
</div>
<a ${routeAttributes([node.slug], 'cta')}>
${language === 'tr' ? `Tüm ${node.name.tr} Ürünlerini Gör` : `View All ${node.name.en}`} →</a>
</header>
<div class="mega-columns">
${(node.children ?? []).map((child) => column(child, node, language)).join('')}
</div>
</section>`,
  )
  .join('')}
</nav>
<button class="mega-overlay" type="button" aria-label="${language === 'tr' ? 'Kategori menüsünü kapat' : 'Close category menu'}">
</button>`;
