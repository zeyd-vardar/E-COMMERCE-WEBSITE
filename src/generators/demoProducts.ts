import { categoryTree } from '../data/categories';
import type { CatalogProduct, CategoryNode } from '../types';
import { createPlaceholderSvg } from '../utils/placeholderImage';

export const PRODUCTS_PER_LEAF_CATEGORY = 10;
type Leaf = { node: CategoryNode; path: CategoryNode[] };
const productRoots = new Set(['women', 'men', 'kids', 'accessories']);
export const getProductLeafCategories = (nodes = categoryTree, path: CategoryNode[] = []): Leaf[] =>
  nodes.flatMap((node) => {
    const next = [...path, node];
    if (!node.children?.length)
      return path.length && productRoots.has(path[0].id) ? [{ node, path: next }] : [];
    return getProductLeafCategories(node.children, next);
  });
const slugify = (value: string) =>
  value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
const typeOf = (path: string[]) =>
  path.some((x) =>
    ['shoes', 'sneakers', 'boots', 'sandals', 'slippers', 'loafers', 'heels'].includes(x),
  )
    ? 'shoes'
    : path.some((x) => ['watches', 'women-watches', 'men-watches', 'smart-watches'].includes(x))
      ? 'watch'
      : path.some((x) => ['jewelry', 'necklaces', 'bracelets', 'earrings', 'rings'].includes(x))
        ? 'jewelry'
        : path.some((x) =>
              ['bags', 'shoulder-bags', 'handbags', 'backpacks', 'wallets'].includes(x),
            )
          ? 'bag'
          : path[0] === 'kids'
            ? 'kids'
            : 'clothing';
const ranges: Record<string, [number, number]> = {
  clothing: [490, 3290],
  kids: [290, 1790],
  shoes: [890, 4990],
  bag: [690, 5990],
  watch: [1290, 12990],
  jewelry: [290, 3490],
};
const brands = ['STORE', 'FORM', 'MODE', 'LINE'];
const stocks = [12, 5, 0, 18, 2, 9, 0, 3, 14, 7];
const discounts = [0, 10, 0, 20, 0, 30, 0, 15, 0, 25];
export const generateDemoCatalog = (): CatalogProduct[] =>
  getProductLeafCategories().flatMap(({ node, path }, leafIndex) =>
    Array.from({ length: PRODUCTS_PER_LEAF_CATEGORY }, (_, offset) => {
      const index = offset + 1,
        ids = path.map((x) => x.id),
        routePath = path.map((x) => x.slug),
        type = typeOf(routePath),
        [min, max] = ranges[type];
      const original =
          Math.round((min + (max - min) * (offset / PRODUCTS_PER_LEAF_CATEGORY)) / 10) * 10,
        discount = discounts[offset];
      const context = path.length > 3 ? path.at(-2)!.name : path[0].name;
      const name = {
        tr: `${context.tr} ${node.name.tr} ${index}`.toUpperCase(),
        en: `${context.en} ${node.name.en} ${index}`.toUpperCase(),
      };
      const pathKey = ids.join('-'),
        noSize = ['watch', 'jewelry', 'bag'].includes(type);
      const attributes: Record<string, string | number | boolean> =
        type === 'watch'
          ? { Kordon: 'Deri', KasaÇapı: '42 mm', SuGeçirmezlik: '5 ATM' }
          : type === 'jewelry'
            ? { Materyal: 'Paslanmaz Çelik', Uzunluk: '45 cm' }
            : type === 'shoes'
              ? { Materyal: 'Deri', Taban: 'Kauçuk', Kalıp: 'Normal' }
              : { Materyal: 'Pamuk Karışımlı', Kalıp: 'Regular', Sezon: '2026' };
      return {
        id: `item-${pathKey}-${String(index).padStart(2, '0')}`,
        slug: slugify(`${pathKey}-${index}`),
        name,
        categoryId: ids[0],
        subcategoryId: node.id,
        categoryPath: routePath,
        brand: brands[(leafIndex + offset) % brands.length],
        sku: `ST-${leafIndex + 1}-${index}`,
        price: discount ? Math.round((original * (1 - discount / 100)) / 10) * 10 : original,
        originalPrice: discount ? original : undefined,
        images: [
          createPlaceholderSvg(name.tr, leafIndex + offset),
          createPlaceholderSvg(`${name.tr} · DETAY`, leafIndex + offset + 1),
          createPlaceholderSvg(`${name.tr} · GÖRÜNÜM`, leafIndex + offset + 2),
        ],
        imagePosition: '50% 50%',
        colors: [offset % 2 ? 'Siyah' : 'Ekru', offset % 3 ? 'Lacivert' : 'Kum'],
        sizes: noSize
          ? []
          : type === 'shoes'
            ? routePath[0] === 'kids'
              ? ['28', '29', '30', '31', '32']
              : ['36', '37', '38', '39', '40', '41', '42']
            : ['XS', 'S', 'M', 'L', 'XL'],
        stock: stocks[offset],
        isNew: offset % 4 === 0,
        isBestSeller: offset % 5 === 0,
        isOutlet: (leafIndex + offset) % 7 === 0,
        createdAt: Date.UTC(2026, 7, 17) - leafIndex * 86400000 - offset * 3600000,
        description: {
          tr: `${node.name.tr} kategorisinin seçili koleksiyon parçası.`,
          en: `A selected piece from the ${node.name.en} collection.`,
        },
        rating: 4.1 + (offset % 5) * 0.17,
        reviewCount: 12 + offset * 13,
        attributes,
      };
    }),
  );
export const generatedProducts = generateDemoCatalog();
export const validateDemoCatalogCoverage = () =>
  getProductLeafCategories().every(
    ({ path }) =>
      generatedProducts.filter(
        (product) => product.categoryPath?.join('/') === path.map((x) => x.slug).join('/'),
      ).length >= PRODUCTS_PER_LEAF_CATEGORY,
  );
