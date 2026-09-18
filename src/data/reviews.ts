import type { ProductReview } from '../types';
export const reviews: ProductReview[] = [
  {
    id: 'r1',
    productId: 'all',
    author: 'STORE Member 01',
    rating: 5,
    title: { tr: 'Beklentimin üzerinde', en: 'Above expectations' },
    comment: {
      tr: 'Dokusu ve kalıbı çok iyi. Paketleme de oldukça özenliydi.',
      en: 'Excellent texture and fit. The packaging was beautifully considered.',
    },
    date: '2026-06-14',
    verifiedPurchase: true,
  },
  {
    id: 'r2',
    productId: 'all',
    author: 'STORE Member 02',
    rating: 4,
    comment: {
      tr: 'Zamansız ve kolay kombinlenen bir parça.',
      en: 'A timeless piece that is easy to style.',
    },
    date: '2026-05-28',
    verifiedPurchase: true,
  },
];
