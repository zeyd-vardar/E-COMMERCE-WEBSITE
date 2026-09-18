import type { CatalogProduct, LocalizedText } from '../types';
import { createPlaceholderSvg } from '../utils/placeholderImage';
const names: { tr: string; en: string; cat: string; sub: string }[] = [
  { tr: 'Keten Karışımlı Ceket', en: 'Linen Blend Jacket', cat: 'women', sub: 'clothing' },
  { tr: 'Rahat Kesim Blazer', en: 'Relaxed Blazer', cat: 'women', sub: 'clothing' },
  { tr: 'Saten Midi Elbise', en: 'Satin Midi Dress', cat: 'women', sub: 'clothing' },
  { tr: 'Yüksek Bel Pantolon', en: 'High Waist Trousers', cat: 'women', sub: 'clothing' },
  { tr: 'Dokulu Overshirt', en: 'Textured Overshirt', cat: 'men', sub: 'clothing' },
  { tr: 'Yün Karışımlı Ceket', en: 'Wool Blend Jacket', cat: 'men', sub: 'clothing' },
  { tr: 'Regular Fit Gömlek', en: 'Regular Fit Shirt', cat: 'men', sub: 'clothing' },
  { tr: 'Pileli Pantolon', en: 'Pleated Trousers', cat: 'men', sub: 'clothing' },
  { tr: 'Luna Omuz Çantası', en: 'Luna Shoulder Bag', cat: 'accessories', sub: 'bags' },
  { tr: 'Mini Deri Çanta', en: 'Mini Leather Bag', cat: 'accessories', sub: 'bags' },
  { tr: 'Klasik Kol Saati', en: 'Classic Wrist Watch', cat: 'accessories', sub: 'watches' },
  { tr: 'İnce Kordon Saat', en: 'Slim Strap Watch', cat: 'accessories', sub: 'watches' },
  { tr: 'Cat Eye Güneş Gözlüğü', en: 'Cat Eye Sunglasses', cat: 'accessories', sub: 'jewelry' },
  { tr: 'Minimal Halka Küpe', en: 'Minimal Hoop Earrings', cat: 'accessories', sub: 'jewelry' },
  { tr: 'Deri Sneaker', en: 'Leather Sneakers', cat: 'men', sub: 'shoes' },
  { tr: 'Süet Loafer', en: 'Suede Loafers', cat: 'women', sub: 'shoes' },
  { tr: 'Pamuklu Çocuk Sweatshirt', en: 'Kids Cotton Sweatshirt', cat: 'kids', sub: 'clothing' },
  { tr: 'Çocuk Keten Takım', en: 'Kids Linen Set', cat: 'kids', sub: 'clothing' },
];
const brands = ['STORE', 'NOMA', 'ATELIER 26', 'STUDIO N'];
const positions = ['0% 0%', '100% 0%', '0% 100%', '100% 100%'];
const saleRates = [20, 25, 30, 35];
export const catalogProducts: CatalogProduct[] = Array.from({ length: 54 }, (_, index) => {
  const base = names[index % names.length];
  const price = 1290 + (index % 9) * 450;
  const saleOnly = index < 4;
  const discounted = saleOnly || index % 4 === 0;
  const discountRate = saleOnly ? saleRates[index] : 25;
  const name: LocalizedText = {
    tr: `${base.tr}${index >= names.length ? ` ${Math.floor(index / names.length) + 1}` : ''}`,
    en: `${base.en}${index >= names.length ? ` ${Math.floor(index / names.length) + 1}` : ''}`,
  };
  return {
    id: `ap-${index + 1}`,
    slug: `${base.en.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index + 1}`,
    name,
    categoryId: base.cat,
    subcategoryId: base.sub,
    brand: brands[index % brands.length],
    sku: `AU-${String(index + 1).padStart(4, '0')}`,
    price: discounted ? Math.round(price * (1 - discountRate / 100)) : price,
    originalPrice: discounted ? price : undefined,
    images: [
      saleOnly ? '/images/aurea-products.jpg' : createPlaceholderSvg(name.tr, index),
      createPlaceholderSvg(`${name.tr} · DETAY`, index + 1),
      createPlaceholderSvg(`${name.tr} · GÖRÜNÜM`, index + 2),
    ],
    imagePosition: saleOnly ? positions[index] : '50% 50%',
    colors: [index % 2 ? 'Siyah' : 'Ekru', index % 3 ? 'Kum' : 'Haki'],
    sizes: index % 5 === 0 ? [] : ['XS', 'S', 'M', 'L'],
    stock: index % 11 === 0 ? 0 : 3 + (index % 12),
    isNew: index % 5 === 0,
    isBestSeller: index % 7 === 0,
    isOutlet: index % 6 === 0,
    saleOnly,
    createdAt: Date.now() - index * 86400000,
    description: {
      tr: 'Günlük ritme uyum sağlayan rafine formu, özenli dikişleri ve uzun ömürlü materyal seçimiyle tasarlandı.',
      en: 'Designed for everyday rhythm with a refined silhouette, considered stitching and enduring materials.',
    },
    rating: 4.2 + (index % 7) / 10,
    reviewCount: 18 + (index % 9) * 11,
    attributes: {
      Materyal: index % 2 ? 'Pamuk' : 'Yün Karışım',
      Sezon: '2026',
      Kalıp: index % 3 ? 'Regular' : 'Rahat',
      SuGeçirmezlik: base.sub === 'watches' ? '3 ATM' : '—',
    },
  };
});
