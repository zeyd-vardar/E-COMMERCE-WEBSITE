import { assetPath } from '../utils/assetPath';
import { icon } from '../utils/icons';
import type { Currency, Language } from '../types';

export const Header = (language: Language, currency: Currency, cartCount = 0) => `
<header class="site-header" id="site-header">
 <div class="header-inner">
  <button class="icon-btn menu-trigger" id="menu-trigger" aria-label="${language === 'tr' ? 'Menüyü aç' : 'Open menu'}" aria-expanded="false" aria-controls="sidebar">
${icon('menu', 24)}
</button>
  <a class="brand brand-logo-link" href="/" data-home-route aria-label="${language === 'tr' ? 'STORE ana sayfa' : 'STORE home page'}">
<img class="brand-logo" src="${assetPath('store-logo.svg')}" alt="STORE">
</a>
  <div class="desktop-search search-shell" id="desktop-search">
<label class="sr-only" for="search-input">
${language === 'tr' ? 'Ürün veya kategori ara' : 'Search products or categories'}
</label>
${icon('search', 18)}
<input id="search-input" type="search" autocomplete="off" placeholder="${language === 'tr' ? 'Ürün veya kategori ara' : 'Search products or categories'}"/>
<button class="search-clear" type="button" aria-label="${language === 'tr' ? 'Aramayı temizle' : 'Clear search'}">
${icon('x', 16)}
</button>
<div class="search-results" role="listbox">
</div>
</div>
  <div class="header-actions">
   <div class="select-wrap">
<label class="sr-only" for="currency">
${language === 'tr' ? 'Para birimi' : 'Currency'}
</label>
<select id="currency">
<option ${currency === 'TRY' ? 'selected' : ''}>TRY</option>
<option ${currency === 'USD' ? 'selected' : ''}>USD</option>
<option ${currency === 'EUR' ? 'selected' : ''}>EUR</option>
</select>
</div>
   <button class="language-toggle text-btn" type="button" aria-label="${language === 'tr' ? 'Dili İngilizce yap' : 'Dili Türkçe yap'}">
${language.toUpperCase()}
</button>
   <nav class="utility-nav" aria-label="${language === 'tr' ? 'Hızlı işlemler' : 'Quick actions'}">
    <button class="icon-btn route-btn" data-route="tracking" data-tooltip="${language === 'tr' ? 'Kargo Takip' : 'Track order'}" aria-label="${language === 'tr' ? 'Kargo Takip' : 'Track order'}">
${icon('truck')}
</button>
    <button class="icon-btn route-btn" data-route="favorites" data-tooltip="${language === 'tr' ? 'Favoriler' : 'Favorites'}" aria-label="${language === 'tr' ? 'Favoriler' : 'Favorites'}">
${icon('heart')}
</button>
    <button class="icon-btn route-btn cart-header-btn" data-route="cart" data-tooltip="${language === 'tr' ? 'Sepetim' : 'Cart'}" aria-label="${language === 'tr' ? 'Sepetim' : 'Cart'}">
${icon('bag')}
<span class="cart-count ${cartCount ? 'is-visible' : ''}">
${cartCount}
</span>
</button>
    <button class="icon-btn route-btn desktop-account" data-route="account" data-tooltip="${language === 'tr' ? 'Hesabım' : 'Account'}" aria-label="${language === 'tr' ? 'Hesabım' : 'Account'}">
${icon('user')}
</button>
   </nav>
   <button class="icon-btn mobile-search-trigger" aria-label="${language === 'tr' ? 'Aramayı aç' : 'Open search'}">
${icon('search', 21)}
</button>
  </div>
 </div>
 <div class="mobile-search-panel" id="mobile-search">
<div class="search-shell">
<label class="sr-only" for="mobile-search-input">
${language === 'tr' ? 'Ürün veya kategori ara' : 'Search products or categories'}
</label>
${icon('search', 18)}
<input id="mobile-search-input" type="search" autocomplete="off" placeholder="${language === 'tr' ? 'Ürün veya kategori ara' : 'Search products or categories'}"/>
<button class="mobile-search-close icon-btn" aria-label="${language === 'tr' ? 'Aramayı kapat' : 'Close search'}">
${icon('x')}
</button>
<div class="search-results" role="listbox">
</div>
</div>
</div>
</header>`;
