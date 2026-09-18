import { siteConfig } from '../config/site';
import { icon } from '../utils/icons';
import type { Language } from '../types';
export const Hero = (language: Language) => {
  const h = siteConfig.hero;
  return `<section class="hero" id="home" aria-labelledby="hero-title">
<img
  class="hero-image"
  src="/images/aurea-hero.png"
  alt="${language === 'tr' ? 'Modern taş mimaride yeni sezon STORE koleksiyonunu giyen iki model' : 'Two models wearing the STORE new season collection in modern stone architecture'}"
  fetchpriority="high"
  width="1536"
  height="1024"
/>
<div class="hero-shade">
</div>
<div class="hero-content">
<p class="eyebrow">
${h.eyebrow[language]}
</p>
<h1 id="hero-title">
${h.title[language].replace('\n', '<br>')}
</h1>
<p>
${h.description[language]}
</p>
<a class="link-cta" href="/category/all" data-category-route="all">
${h.cta[language]} ${icon('arrow', 19)}
</a>
</div>
<a href="#recommended" class="scroll-cue" aria-label="${language === 'tr' ? 'Önerilen ürünlere kaydır' : 'Scroll to recommended products'}">
<span>SCROLL</span>
<i>
</i>
</a>
<div class="hero-index">01 <span>
</span> 04</div>
</section>`;
};
