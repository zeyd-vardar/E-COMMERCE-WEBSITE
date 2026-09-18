import type { Currency, Language } from '../types';
export const Products = (language: Language, _currency: Currency) =>
  `<section class="campaign-section">
<div class="campaign-copy reveal">
<p class="eyebrow">STORE SALE</p>
<h2>
${language === 'tr' ? 'İndirimleri\nkaçırma.' : 'Don’t miss\nthe sale.'}
</h2>
<p>
${language === 'tr' ? 'Seçili ürünlerdeki özel fiyatları keşfet.' : 'Discover special prices on selected pieces.'}
</p>
<a class="sale-cta" href="/category/sale" data-category-route="sale">
${language === 'tr' ? 'İNDİRİMLERİ KAÇIRMA' : 'DON’T MISS THE SALE'}
</a>
</div>
</section>
<section class="gender-campaign gender-campaign-men" aria-labelledby="men-campaign-title">
<div class="gender-campaign-copy reveal">
<p class="eyebrow">STORE MEN</p>
<h2 id="men-campaign-title">
${language === 'tr' ? 'Erkek' : 'Men'}
</h2>
<p>
${language === 'tr' ? 'Modern erkek stilinin zamansız parçalarını keşfet.' : 'Discover timeless pieces for modern menswear.'}
</p>
<a class="gender-campaign-cta" href="/category/men" data-category-route="men">
${language === 'tr' ? 'ERKEK ÜRÜNLERİNİ KEŞFET' : 'EXPLORE MEN'}
</a>
</div>
</section>
<section class="gender-campaign gender-campaign-women" aria-labelledby="women-campaign-title">
<div class="gender-campaign-copy reveal">
<p class="eyebrow">STORE WOMEN</p>
<h2 id="women-campaign-title">
${language === 'tr' ? 'Kadın' : 'Women'}
</h2>
<p>
${language === 'tr' ? 'Güçlü ve zarif kadın stilinin yeni seçkisini keşfet.' : 'Discover the new edit of confident, refined womenswear.'}
</p>
<a class="gender-campaign-cta" href="/category/women" data-category-route="women">
${language === 'tr' ? 'KADIN ÜRÜNLERİNİ KEŞFET' : 'EXPLORE WOMEN'}
</a>
</div>
</section>`;
