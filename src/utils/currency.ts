import { siteConfig } from '../config/site';
import type { Currency, Language } from '../types';
export const formatCurrency = (price: number, currency: Currency, language: Language) =>
  new Intl.NumberFormat(language === 'tr' ? 'tr-TR' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'TRY' ? 0 : 2,
  }).format(price * siteConfig.exchangeRates[currency]);
