import { icon } from '../utils/icons';
import type { Language } from '../types';
export const NotifyStockDialog = (language: Language) =>
  `<div class="modal-overlay">
</div>
<dialog class="notify-dialog">
<button class="icon-btn notify-close" aria-label="${language === 'tr' ? 'Kapat' : 'Close'}">
${icon('x')}
</button>
<p class="eyebrow">BACK IN STOCK</p>
<h2>
${language === 'tr' ? 'Size haber verelim.' : 'Let us notify you.'}
</h2>
<p>
${language === 'tr' ? 'Bu ürün yeniden stoklara geldiğinde e-posta adresinize bilgi gönderelim.' : 'Enter your email and we’ll let you know when this item is back.'}
</p>
<form>
<label for="notify-email">
${language === 'tr' ? 'E-posta adresiniz' : 'Email address'}
</label>
<input id="notify-email" type="email" required autocomplete="email" placeholder="name@example.com">
<button>
${language === 'tr' ? 'BENİ BİLGİLENDİR' : 'NOTIFY ME'}
</button>
</form>
</dialog>`;
