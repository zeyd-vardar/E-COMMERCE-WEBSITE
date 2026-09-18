export type Language = 'tr' | 'en';
export type Currency = 'TRY' | 'USD' | 'EUR';
export interface LocalizedText {
  tr: string;
  en: string;
}
export interface MenuItem {
  id: string;
  label: LocalizedText;
  href: string;
}
export interface Category {
  id: string;
  slug: string;
  name: LocalizedText;
  parentId?: string;
}
export interface CategoryNode {
  id: string;
  slug: string;
  name: LocalizedText;
  children?: CategoryNode[];
}
export interface CatalogProduct {
  id: string;
  slug: string;
  name: LocalizedText;
  categoryId: string;
  subcategoryId?: string;
  categoryPath?: string[];
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  imagePosition: string;
  colors: string[];
  sizes: string[];
  stock: number;
  isNew: boolean;
  isBestSeller: boolean;
  isOutlet: boolean;
  variantStock?: Record<string, Record<string, number>>;
  saleOnly?: boolean;
  createdAt: number;
  attributes: Record<string, string | number | boolean>;
  sku?: string;
  description?: LocalizedText;
  rating?: number;
  reviewCount?: number;
}
export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title?: LocalizedText;
  comment: LocalizedText;
  date: string;
  verifiedPurchase: boolean;
}
export type SortOption =
  'recommended' | 'price-asc' | 'price-desc' | 'newest' | 'discount' | 'name-asc' | 'name-desc';
