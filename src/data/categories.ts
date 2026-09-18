import type { Category, CategoryNode, LocalizedText } from '../types';

const localized = (tr: string, en: string): LocalizedText => ({ tr, en });
const leaf = (id: string, slug: string, tr: string, en: string): CategoryNode => ({
  id,
  slug,
  name: localized(tr, en),
});
const group = (
  id: string,
  slug: string,
  tr: string,
  en: string,
  children: CategoryNode[],
): CategoryNode => ({ id, slug, name: localized(tr, en), children });
const scopedLeaf = (scope: string, slug: string, tr: string, en: string) =>
  leaf(`${scope}-${slug}`, slug, tr, en);

const womenClothing = [
  scopedLeaf('women-clothing', 'new-arrivals', 'Yeni Gelenler', 'New Arrivals'),
  scopedLeaf('women-clothing', 'dresses', 'Elbise', 'Dresses'),
  scopedLeaf('women-clothing', 'evening-dresses', 'Abiye', 'Evening Dresses'),
  scopedLeaf('women-clothing', 'tshirts', 'Tişört', 'T-Shirts'),
  scopedLeaf('women-clothing', 'blouses', 'Bluz', 'Blouses'),
  scopedLeaf('women-clothing', 'shirts', 'Gömlek', 'Shirts'),
  scopedLeaf('women-clothing', 'sweatshirts', 'Sweatshirt', 'Sweatshirts'),
  scopedLeaf('women-clothing', 'knitwear', 'Kazak & Triko', 'Knitwear'),
  scopedLeaf('women-clothing', 'trousers', 'Pantolon', 'Trousers'),
  scopedLeaf('women-clothing', 'jeans', 'Jean', 'Jeans'),
  scopedLeaf('women-clothing', 'skirts', 'Etek', 'Skirts'),
  scopedLeaf('women-clothing', 'shorts', 'Şort', 'Shorts'),
  scopedLeaf('women-clothing', 'leggings', 'Tayt', 'Leggings'),
  scopedLeaf('women-clothing', 'suits', 'Takım', 'Sets'),
  scopedLeaf('women-clothing', 'jackets', 'Ceket', 'Jackets'),
  scopedLeaf('women-clothing', 'blazers', 'Blazer', 'Blazers'),
  scopedLeaf('women-clothing', 'puffer-jackets', 'Mont', 'Puffer Jackets'),
  scopedLeaf('women-clothing', 'coats', 'Kaban', 'Coats'),
  scopedLeaf('women-clothing', 'trenchcoats', 'Trençkot', 'Trench Coats'),
];
const womenShoes = [
  scopedLeaf('women-shoes', 'sneakers', 'Spor Ayakkabı', 'Sneakers'),
  scopedLeaf('women-shoes', 'casual-shoes', 'Günlük Ayakkabı', 'Casual Shoes'),
  scopedLeaf('women-shoes', 'heels', 'Topuklu Ayakkabı', 'Heels'),
  scopedLeaf('women-shoes', 'flats', 'Babet', 'Flats'),
  scopedLeaf('women-shoes', 'loafers', 'Loafer', 'Loafers'),
  scopedLeaf('women-shoes', 'sandals', 'Sandalet', 'Sandals'),
  scopedLeaf('women-shoes', 'slippers', 'Terlik', 'Slippers'),
  scopedLeaf('women-shoes', 'boots', 'Bot', 'Boots'),
  scopedLeaf('women-shoes', 'tall-boots', 'Çizme', 'Tall Boots'),
];
const womenBags = [
  scopedLeaf('women-bags', 'shoulder-bags', 'Omuz Çantası', 'Shoulder Bags'),
  scopedLeaf('women-bags', 'handbags', 'El Çantası', 'Handbags'),
  scopedLeaf('women-bags', 'crossbody-bags', 'Çapraz Çanta', 'Crossbody Bags'),
  scopedLeaf('women-bags', 'backpacks', 'Sırt Çantası', 'Backpacks'),
  scopedLeaf('women-bags', 'clutches', 'Clutch', 'Clutches'),
  scopedLeaf('women-bags', 'wallets', 'Cüzdan', 'Wallets'),
];
const womenAccessories = [
  scopedLeaf('women-accessories', 'watches', 'Saat', 'Watches'),
  scopedLeaf('women-accessories', 'jewelry', 'Takı', 'Jewelry'),
  scopedLeaf('women-accessories', 'eyewear', 'Gözlük', 'Eyewear'),
  scopedLeaf('women-accessories', 'belts', 'Kemer', 'Belts'),
  scopedLeaf('women-accessories', 'hats', 'Şapka & Bere', 'Hats'),
  scopedLeaf('women-accessories', 'scarves', 'Şal & Fular', 'Scarves'),
  scopedLeaf('women-accessories', 'hair-accessories', 'Saç Aksesuarları', 'Hair Accessories'),
];

const menClothing = [
  scopedLeaf('men-clothing', 'new-arrivals', 'Yeni Gelenler', 'New Arrivals'),
  scopedLeaf('men-clothing', 'tshirts', 'Tişört', 'T-Shirts'),
  scopedLeaf('men-clothing', 'polo', 'Polo Yaka', 'Polo Shirts'),
  scopedLeaf('men-clothing', 'shirts', 'Gömlek', 'Shirts'),
  scopedLeaf('men-clothing', 'sweatshirts', 'Sweatshirt', 'Sweatshirts'),
  scopedLeaf('men-clothing', 'hoodies', 'Hoodie', 'Hoodies'),
  scopedLeaf('men-clothing', 'knitwear', 'Kazak & Triko', 'Knitwear'),
  scopedLeaf('men-clothing', 'trousers', 'Pantolon', 'Trousers'),
  scopedLeaf('men-clothing', 'jeans', 'Jean', 'Jeans'),
  scopedLeaf('men-clothing', 'shorts', 'Şort', 'Shorts'),
  scopedLeaf('men-clothing', 'tracksuits', 'Eşofman', 'Tracksuits'),
  scopedLeaf('men-clothing', 'suits', 'Takım Elbise', 'Suits'),
  scopedLeaf('men-clothing', 'jackets', 'Ceket', 'Jackets'),
  scopedLeaf('men-clothing', 'blazers', 'Blazer', 'Blazers'),
  scopedLeaf('men-clothing', 'puffer-jackets', 'Mont', 'Puffer Jackets'),
  scopedLeaf('men-clothing', 'coats', 'Kaban', 'Coats'),
];
const menShoes = [
  scopedLeaf('men-shoes', 'sneakers', 'Spor Ayakkabı', 'Sneakers'),
  scopedLeaf('men-shoes', 'casual-shoes', 'Günlük Ayakkabı', 'Casual Shoes'),
  scopedLeaf('men-shoes', 'formal-shoes', 'Klasik Ayakkabı', 'Formal Shoes'),
  scopedLeaf('men-shoes', 'loafers', 'Loafer', 'Loafers'),
  scopedLeaf('men-shoes', 'boots', 'Bot', 'Boots'),
  scopedLeaf('men-shoes', 'sandals', 'Sandalet', 'Sandals'),
  scopedLeaf('men-shoes', 'slippers', 'Terlik', 'Slippers'),
];
const menBags = [
  scopedLeaf('men-bags', 'backpacks', 'Sırt Çantası', 'Backpacks'),
  scopedLeaf('men-bags', 'shoulder-bags', 'Omuz Çantası', 'Shoulder Bags'),
  scopedLeaf('men-bags', 'briefcases', 'Evrak Çantası', 'Briefcases'),
  scopedLeaf('men-bags', 'belt-bags', 'Bel Çantası', 'Belt Bags'),
  scopedLeaf('men-bags', 'wallets', 'Cüzdan', 'Wallets'),
];
const menAccessories = [
  scopedLeaf('men-accessories', 'watches', 'Saat', 'Watches'),
  scopedLeaf('men-accessories', 'eyewear', 'Gözlük', 'Eyewear'),
  scopedLeaf('men-accessories', 'belts', 'Kemer', 'Belts'),
  scopedLeaf('men-accessories', 'ties', 'Kravat', 'Ties'),
  scopedLeaf('men-accessories', 'bow-ties', 'Papyon', 'Bow Ties'),
  scopedLeaf('men-accessories', 'hats', 'Şapka & Bere', 'Hats'),
  scopedLeaf('men-accessories', 'jewelry', 'Takı', 'Jewelry'),
];

const childClothing = (scope: string, extra: CategoryNode[] = []) => [
  scopedLeaf(scope, 'tshirts', 'Tişört', 'T-Shirts'),
  scopedLeaf(scope, 'sweatshirts', 'Sweatshirt', 'Sweatshirts'),
  scopedLeaf(scope, 'knitwear', 'Kazak', 'Knitwear'),
  scopedLeaf(scope, 'trousers', 'Pantolon', 'Trousers'),
  scopedLeaf(scope, 'jeans', 'Jean', 'Jeans'),
  scopedLeaf(scope, 'shorts', 'Şort', 'Shorts'),
  scopedLeaf(scope, 'leggings', 'Tayt', 'Leggings'),
  scopedLeaf(scope, 'coats', 'Mont & Kaban', 'Coats'),
  scopedLeaf(scope, 'pajamas', 'Pijama', 'Pajamas'),
  ...extra,
];
const kidsGroups = [
  group(
    'kids-girls',
    'girls',
    'Kız Çocuk',
    'Girls',
    childClothing('kids-girls', [
      scopedLeaf('kids-girls', 'dresses', 'Elbise', 'Dresses'),
      scopedLeaf('kids-girls', 'skirts', 'Etek', 'Skirts'),
    ]),
  ),
  group(
    'kids-boys',
    'boys',
    'Erkek Çocuk',
    'Boys',
    childClothing('kids-boys', [scopedLeaf('kids-boys', 'shirts', 'Gömlek', 'Shirts')]),
  ),
  group('kids-baby-girls', 'baby-girls', 'Bebek Kız', 'Baby Girls', [
    scopedLeaf('kids-baby-girls', 'bodysuits', 'Body', 'Bodysuits'),
    scopedLeaf('kids-baby-girls', 'rompers', 'Tulum', 'Rompers'),
    scopedLeaf('kids-baby-girls', 'dresses', 'Elbise', 'Dresses'),
    scopedLeaf('kids-baby-girls', 'sets', 'Takımlar', 'Sets'),
    scopedLeaf('kids-baby-girls', 'pajamas', 'Pijama', 'Pajamas'),
    scopedLeaf('kids-baby-girls', 'coats', 'Mont', 'Coats'),
  ]),
  group('kids-baby-boys', 'baby-boys', 'Bebek Erkek', 'Baby Boys', [
    scopedLeaf('kids-baby-boys', 'bodysuits', 'Body', 'Bodysuits'),
    scopedLeaf('kids-baby-boys', 'rompers', 'Tulum', 'Rompers'),
    scopedLeaf('kids-baby-boys', 'tshirts', 'Tişört', 'T-Shirts'),
    scopedLeaf('kids-baby-boys', 'sets', 'Takımlar', 'Sets'),
    scopedLeaf('kids-baby-boys', 'pajamas', 'Pijama', 'Pajamas'),
    scopedLeaf('kids-baby-boys', 'coats', 'Mont', 'Coats'),
  ]),
  group('kids-shoes', 'shoes', 'Ayakkabı', 'Shoes', [
    scopedLeaf('kids-shoes', 'sneakers', 'Spor Ayakkabı', 'Sneakers'),
    scopedLeaf('kids-shoes', 'casual-shoes', 'Günlük Ayakkabı', 'Casual Shoes'),
    scopedLeaf('kids-shoes', 'sandals', 'Sandalet', 'Sandals'),
    scopedLeaf('kids-shoes', 'boots', 'Bot', 'Boots'),
    scopedLeaf('kids-shoes', 'slippers', 'Terlik', 'Slippers'),
  ]),
  group('kids-accessories', 'accessories', 'Aksesuar', 'Accessories', [
    scopedLeaf('kids-accessories', 'bags', 'Çanta', 'Bags'),
    scopedLeaf('kids-accessories', 'hats', 'Şapka & Bere', 'Hats'),
    scopedLeaf('kids-accessories', 'socks', 'Çorap', 'Socks'),
    scopedLeaf('kids-accessories', 'scarves', 'Atkı', 'Scarves'),
    scopedLeaf('kids-accessories', 'gloves', 'Eldiven', 'Gloves'),
  ]),
];

const accessoriesGroups = [
  group('accessories-bags', 'bags', 'Çanta', 'Bags', [
    scopedLeaf('accessories-bags', 'women-bags', 'Kadın Çanta', 'Women’s Bags'),
    scopedLeaf('accessories-bags', 'men-bags', 'Erkek Çanta', 'Men’s Bags'),
    scopedLeaf('accessories-bags', 'shoulder-bags', 'Omuz Çantası', 'Shoulder Bags'),
    scopedLeaf('accessories-bags', 'backpacks', 'Sırt Çantası', 'Backpacks'),
    scopedLeaf('accessories-bags', 'crossbody-bags', 'Çapraz Çanta', 'Crossbody Bags'),
    scopedLeaf('accessories-bags', 'handbags', 'El Çantası', 'Handbags'),
    scopedLeaf('accessories-bags', 'wallets', 'Cüzdan', 'Wallets'),
  ]),
  group('accessories-watches', 'watches', 'Saat', 'Watches', [
    scopedLeaf('accessories-watches', 'women-watches', 'Kadın Saatleri', 'Women’s Watches'),
    scopedLeaf('accessories-watches', 'men-watches', 'Erkek Saatleri', 'Men’s Watches'),
    scopedLeaf('accessories-watches', 'smart-watches', 'Akıllı Saatler', 'Smart Watches'),
  ]),
  group('accessories-jewelry', 'jewelry', 'Takı', 'Jewelry', [
    scopedLeaf('accessories-jewelry', 'necklaces', 'Kolye', 'Necklaces'),
    scopedLeaf('accessories-jewelry', 'bracelets', 'Bileklik', 'Bracelets'),
    scopedLeaf('accessories-jewelry', 'earrings', 'Küpe', 'Earrings'),
    scopedLeaf('accessories-jewelry', 'rings', 'Yüzük', 'Rings'),
  ]),
  group('accessories-eyewear', 'eyewear', 'Gözlük', 'Eyewear', [
    scopedLeaf(
      'accessories-eyewear',
      'women-sunglasses',
      'Kadın Güneş Gözlüğü',
      'Women’s Sunglasses',
    ),
    scopedLeaf('accessories-eyewear', 'men-sunglasses', 'Erkek Güneş Gözlüğü', 'Men’s Sunglasses'),
  ]),
  group('accessories-other', 'other', 'Diğer', 'Other', [
    scopedLeaf('accessories-other', 'belts', 'Kemer', 'Belts'),
    scopedLeaf('accessories-other', 'hats', 'Şapka & Bere', 'Hats'),
    scopedLeaf('accessories-other', 'scarves', 'Şal & Fular', 'Scarves'),
    scopedLeaf('accessories-other', 'gloves', 'Eldiven', 'Gloves'),
  ]),
];

const simpleLeaves = (scope: string, entries: [string, string, string][]) =>
  entries.map(([slug, tr, en]) => scopedLeaf(scope, slug, tr, en));
const saleLeaves = simpleLeaves('sale', [
  ['all-sale', 'Tüm İndirimler', 'All Sale'],
  ['women-sale', 'Kadın İndirim', 'Women Sale'],
  ['men-sale', 'Erkek İndirim', 'Men Sale'],
  ['kids-sale', 'Çocuk İndirim', 'Kids Sale'],
  ['shoes-sale', 'Ayakkabı İndirim', 'Shoes Sale'],
  ['accessories-sale', 'Aksesuar İndirim', 'Accessories Sale'],
  ['outlet-deals', 'Outlet Fırsatları', 'Outlet Deals'],
]);
const outletLeaves = simpleLeaves('outlet', [
  ['all-outlet', 'Tüm Outlet', 'All Outlet'],
  ['women-outlet', 'Kadın Outlet', 'Women Outlet'],
  ['men-outlet', 'Erkek Outlet', 'Men Outlet'],
  ['kids-outlet', 'Çocuk Outlet', 'Kids Outlet'],
  ['shoes-outlet', 'Ayakkabı Outlet', 'Shoes Outlet'],
  ['accessories-outlet', 'Aksesuar Outlet', 'Accessories Outlet'],
  ['last-chance', 'Son Şans', 'Last Chance'],
]);

export const categoryTree: CategoryNode[] = [
  group(
    'all',
    'all',
    'Tüm Ürünler',
    'All Products',
    simpleLeaves('all', [
      ['women', 'Kadın', 'Women'],
      ['men', 'Erkek', 'Men'],
      ['kids', 'Çocuk ve Bebek', 'Kids & Baby'],
      ['new-arrivals', 'Yeni Gelenler', 'New Arrivals'],
      ['best-sellers', 'Çok Satanlar', 'Best Sellers'],
    ]),
  ),
  group('sale', 'sale', 'İndirimli Ürünler', 'Sale', saleLeaves),
  group('men', 'men', 'Erkek', 'Men', [
    group('men-clothing', 'clothing', 'Giyim', 'Clothing', menClothing),
    group('men-shoes', 'shoes', 'Ayakkabı', 'Shoes', menShoes),
    group('men-bags', 'bags', 'Çanta', 'Bags', menBags),
    group('men-accessories', 'accessories', 'Aksesuar', 'Accessories', menAccessories),
  ]),
  group('women', 'women', 'Kadın', 'Women', [
    group('women-clothing', 'clothing', 'Giyim', 'Clothing', womenClothing),
    group('women-shoes', 'shoes', 'Ayakkabı', 'Shoes', womenShoes),
    group('women-bags', 'bags', 'Çanta', 'Bags', womenBags),
    group('women-accessories', 'accessories', 'Aksesuar', 'Accessories', womenAccessories),
  ]),
  group('kids', 'kids', 'Çocuk ve Bebek', 'Kids & Baby', kidsGroups),
  group('accessories', 'accessories', 'Aksesuar', 'Accessories', accessoriesGroups),
  group('outlet', 'outlet', 'Outlet', 'Outlet', outletLeaves),
];

const flatten = (nodes: CategoryNode[], parentId?: string): Category[] =>
  nodes.flatMap((node) => [
    { id: node.id, slug: node.slug, name: node.name, parentId },
    ...flatten(node.children ?? [], node.id),
  ]);
export const categories = flatten(categoryTree);
export const topCategories = categories.filter((category) => !category.parentId);
export const getCategory = (slugOrId: string) =>
  categories.find((category) => category.id === slugOrId || category.slug === slugOrId) ??
  categories[0];
export const findCategoryNode = (
  slugOrId: string,
  nodes = categoryTree,
): CategoryNode | undefined => {
  for (const node of nodes) {
    if (node.id === slugOrId || node.slug === slugOrId) return node;
    const match = findCategoryNode(slugOrId, node.children ?? []);
    if (match) return match;
  }
  return undefined;
};
export const getCategoryPath = (
  slugOrId: string,
  nodes = categoryTree,
  path: CategoryNode[] = [],
): CategoryNode[] => {
  for (const node of nodes) {
    const next = [...path, node];
    if (node.id === slugOrId || node.slug === slugOrId) return next;
    const found = getCategoryPath(slugOrId, node.children ?? [], next);
    if (found.length) return found;
  }
  return [];
};
