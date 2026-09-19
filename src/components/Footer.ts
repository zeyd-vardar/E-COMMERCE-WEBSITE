import { siteConfig } from '../config/site';
import { companyInfo } from '../config/company';
import { footerSections } from '../data/footer';
import { assetPath } from '../utils/assetPath';
import { icon } from '../utils/icons';
import type { Language } from '../types';
const appleIcon = `<svg aria-hidden="true" viewBox="0 0 24 24">
<path fill="currentColor" d="M17.1 12.5c0-2.8 2.3-4.1 2.4-4.2a5.1 5.1 0 0 0-4-2.2c-1.7-.2-3.3 1-4.1 1s-2.1-1-3.5-1C6.1 6.1 4.4 7.2 3.5 8.8c-2 3.4-.5 8.5 1.4 11.3.9 1.4 2 2.9 3.5 2.8 1.4-.1 1.9-.9 3.6-.9s2.2.9 3.6.9c1.5 0 2.5-1.4 3.4-2.8a12 12 0 0 0 1.5-3.1 4.8 4.8 0 0 1-3.4-4.5ZM14.4 4.3A4.8 4.8 0 0 0 15.5.8a4.9 4.9 0 0 0-3.2 1.7 4.5 4.5 0 0 0-1.1 3.3 4 4 0 0 0 3.2-1.5Z"/>
</svg>`;
const playIcon = `<svg aria-hidden="true" viewBox="0 0 24 24">
<path fill="currentColor" d="M3.6 2.4a2 2 0 0 0-.4 1.2v16.8c0 .5.1.9.4 1.2L13 12 3.6 2.4Zm10.7 10.9-2.2 2.2-7.2 6.3c.4.1.8 0 1.2-.2l11.1-6.3-2.9-2Zm4.1-2.3-2.9-1.7-2.4 2.5 2.4 2.5 2.9-1.7c1-.5 1-1.1 0-1.6ZM4.9 2.2l7.2 6.3 2.2 2.2 2.9-2L6.1 2.4c-.4-.2-.8-.3-1.2-.2Z"/>
</svg>`;
export const Footer = (language: Language) =>
  `<footer class="site-footer">
<div class="footer-main">
<a class="footer-brand footer-brand-logo" href="/" data-home-route aria-label="STORE">
<img src="${assetPath('store-logo.svg')}" alt="STORE">
</a>
<div class="footer-columns">
${footerSections
  .map(
    (section) => `<nav class="footer-section" aria-label="${section.title[language]}">
<button class="footer-section-toggle" aria-expanded="true">
<span>
${section.title[language]}
</span>
<i>+</i>
</button>
<h2>
${section.title[language]}
</h2>
<div>
${section.links
  .map(
    (item) => `<a href="${item.href}" data-footer-route="${item.id}">
${item.label[language]}
</a>`,
  )
  .join('')}
</div>
</nav>`,
  )
  .join('')}
<section class="footer-contact">
<button class="footer-section-toggle" aria-expanded="true">
<span>
${language === 'tr' ? 'İletişim' : 'Contact'}
</span>
<i>+</i>
</button>
<h2>
${language === 'tr' ? 'İletişim' : 'Contact'}
</h2>
<div>
<p>
<span>
${language === 'tr' ? 'Adres' : 'Address'}
</span>
${companyInfo.address[language].replace('\n', '<br>')}
</p>
<p>
<span>
${language === 'tr' ? 'Telefon' : 'Phone'}
</span>
<a href="tel:${companyInfo.phoneHref}">
${companyInfo.phone}
</a>
</p>
<p>
<span>
${language === 'tr' ? 'E-posta' : 'Email'}
</span>
<a href="mailto:${companyInfo.email}">
${companyInfo.email}
</a>
</p>
</div>
</section>
</div>
</div>
<div class="footer-apps">
<p class="eyebrow">
${language === 'tr' ? 'UYGULAMAMIZI İNDİRİN' : 'DOWNLOAD OUR APP'}
</p>
<div>
<button data-app-store="ios">
${appleIcon}
<span>
<small>
${language === 'tr' ? 'App Store’dan' : 'Download on the'}
</small>App Store</span>
</button>
<button data-app-store="android">
${playIcon}
<span>
<small>
${language === 'tr' ? 'Google Play’den' : 'Get it on'}
</small>Google Play</span>
</button>
</div>
</div>
<div class="footer-back">
<button class="back-to-top" aria-label="${language === 'tr' ? 'Sayfanın başına dön' : 'Back to top'}">
<span>
${icon('arrow', 20)}
</span>
${language === 'tr' ? 'YUKARI ÇIK' : 'BACK TO TOP'}
</button>
</div>
<div class="footer-bottom">
<p>© ${new Date().getFullYear()} ${siteConfig.brand}. ${language === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
</p>
<div>
<a href="/privacy" data-footer-route="privacy">
${language === 'tr' ? 'Gizlilik' : 'Privacy'}
</a>
<a href="/terms" data-footer-route="terms">
${language === 'tr' ? 'Kullanım Koşulları' : 'Terms of Use'}
</a>
</div>
</div>
</footer>`;
