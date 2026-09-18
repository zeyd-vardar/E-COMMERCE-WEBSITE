import type { Currency, LocalizedText } from '../types';
export const siteConfig = {
  brand: 'STORE',
  hero: {
    eyebrow: { tr: 'İLKBAHAR / YAZ 2026', en: 'SPRING / SUMMER 2026' } as LocalizedText,
    title: { tr: 'Sessiz bir\nözgüven.', en: 'Quiet\nconfidence.' } as LocalizedText,
    description: {
      tr: 'Yeni sezonun rafine silüetleriyle kendi ritmini bul.',
      en: 'Find your rhythm in the refined silhouettes of the new season.',
    } as LocalizedText,
    cta: { tr: 'KOLEKSİYONU KEŞFET', en: 'EXPLORE THE COLLECTION' } as LocalizedText,
  },
  exchangeRates: { TRY: 1, USD: 0.031, EUR: 0.028 } satisfies Record<Currency, number>,
};
