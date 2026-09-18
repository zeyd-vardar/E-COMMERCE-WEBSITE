import type { Language } from '../types';
export const ComparisonBar = (count: number, language: Language) =>
  `<div class="comparison-bar ${count >= 2 ? 'is-visible' : ''}">
<p>
<strong>
${count}
</strong> ${language === 'tr' ? 'ürün seçildi' : 'products selected'}
</p>
<div>
<button class="comparison-clear">
${language === 'tr' ? 'TEMİZLE' : 'CLEAR'}
</button>
<a href="/compare" data-compare-route>
${language === 'tr' ? 'KARŞILAŞTIR' : 'COMPARE'}
</a>
</div>
</div>`;
