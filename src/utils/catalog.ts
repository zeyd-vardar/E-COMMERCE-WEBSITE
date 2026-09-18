import type { CatalogProduct, Language, SortOption } from '../types';
import { getCategoryPath } from '../data/categories';
export const discountOf = (p: CatalogProduct) =>
  p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
export const productsForCategory = (
  items: CatalogProduct[],
  category: string,
  routePath?: string[],
) => {
  const path = routePath ?? getCategoryPath(category).map((node) => node.slug);
  const [root, leaf] = path;
  const categoryItems = root === 'sale' ? items : items.filter((product) => !product.saleOnly);
  if (root === 'all')
    return categoryItems.filter((product) =>
      leaf === 'women' || leaf === 'men' || leaf === 'kids'
        ? product.categoryId === leaf
        : leaf === 'new-arrivals'
          ? product.isNew
          : leaf === 'best-sellers'
            ? product.isBestSeller
            : true,
    );
  if (root === 'sale')
    return items.filter(
      (product) =>
        Boolean(product.originalPrice) &&
        (leaf === 'women-sale'
          ? product.categoryId === 'women'
          : leaf === 'men-sale'
            ? product.categoryId === 'men'
            : leaf === 'kids-sale'
              ? product.categoryId === 'kids'
              : leaf === 'shoes-sale'
                ? product.categoryPath?.includes('shoes')
                : leaf === 'accessories-sale'
                  ? product.categoryId === 'accessories'
                  : leaf === 'outlet-deals'
                    ? product.isOutlet
                    : true),
    );
  if (root === 'outlet')
    return categoryItems.filter(
      (product) =>
        product.isOutlet &&
        (leaf === 'women-outlet'
          ? product.categoryId === 'women'
          : leaf === 'men-outlet'
            ? product.categoryId === 'men'
            : leaf === 'kids-outlet'
              ? product.categoryId === 'kids'
              : leaf === 'shoes-outlet'
                ? product.categoryPath?.includes('shoes')
                : leaf === 'accessories-outlet'
                  ? product.categoryId === 'accessories'
                  : leaf === 'last-chance'
                    ? Boolean(product.originalPrice)
                    : true),
    );
  return categoryItems.filter((product) => {
    if (product.categoryPath)
      return path.every((segment, index) => product.categoryPath?.[index] === segment);
    if (path.length === 1) return product.categoryId === root;
    if (path.length === 2) return product.categoryId === root && product.subcategoryId === leaf;
    return false;
  });
};
export const applyFilters = (items: CatalogProduct[], filters: Map<string, Set<string>>) =>
  items.filter((p) =>
    [...filters].every(
      ([key, values]) =>
        !values.size ||
        [...values].some((value) =>
          key === 'category'
            ? p.categoryId === value ||
              p.subcategoryId === value ||
              Boolean(p.categoryPath?.includes(value))
            : key === 'clothingCategory'
              ? Boolean(p.categoryPath?.includes('clothing') && p.categoryPath.includes(value))
              : key === 'brand'
                ? p.brand === value
                : key === 'color'
                  ? p.colors.includes(value)
                  : key === 'size'
                    ? p.sizes.includes(value)
                    : key === 'availability'
                      ? value === 'in-stock'
                        ? p.stock > 0
                        : p.stock === 0
                      : key === 'discount'
                        ? Boolean(p.originalPrice)
                        : key === 'minPrice'
                          ? p.price >= Number(value)
                          : key === 'maxPrice'
                            ? p.price <= Number(value)
                            : true,
        ),
    ),
  );
export const sortCatalog = (items: CatalogProduct[], sort: SortOption, language: Language) =>
  [...items].sort((a, b) =>
    sort === 'price-asc'
      ? a.price - b.price
      : sort === 'price-desc'
        ? b.price - a.price
        : sort === 'newest'
          ? b.createdAt - a.createdAt
          : sort === 'discount'
            ? discountOf(b) - discountOf(a)
            : sort === 'name-asc'
              ? a.name[language].localeCompare(b.name[language], language)
              : sort === 'name-desc'
                ? b.name[language].localeCompare(a.name[language], language)
                : Number(b.isBestSeller) - Number(a.isBestSeller),
  );
export const getSimilarProducts = (product: CatalogProduct, items: CatalogProduct[]) =>
  items
    .filter((p) => p.id !== product.id)
    .map((p) => ({
      p,
      score:
        (p.subcategoryId === product.subcategoryId ? 4 : 0) +
        (p.categoryId === product.categoryId ? 2 : 0) +
        (p.brand === product.brand ? 1 : 0) +
        (Math.abs(p.price - product.price) < 1000 ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((x) => x.p);
