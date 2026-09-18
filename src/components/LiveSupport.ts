import { icon } from '../utils/icons';
import type { Language } from '../types';
export const LiveSupport = (language: Language) =>
  `<div class="support">
<div class="support-panel" id="support-panel" role="dialog" aria-modal="false" aria-labelledby="support-title" aria-hidden="true">
<header>
<div>
<small>
${language === 'tr' ? 'Genellikle birkaç dakika içinde yanıt veririz.' : 'We usually reply in a few minutes.'}
</small>
<h2 id="support-title">
${language === 'tr' ? 'Nasıl yardımcı olabiliriz?' : 'How can we help?'}
</h2>
</div>
<button class="icon-btn support-close" aria-label="${language === 'tr' ? 'Desteği kapat' : 'Close support'}">
${icon('x')}
</button>
</header>
<div class="support-body">
<div class="avatar">A</div>
<div class="chat-bubble">
<p>
${language === 'tr' ? 'Merhaba! Size nasıl yardımcı olabiliriz?' : 'Hello! How can we help you?'}
</p>
<time>Şimdi</time>
</div>
</div>
<form class="support-form">
<label class="sr-only" for="support-message">
${language === 'tr' ? 'Mesajınız' : 'Your message'}
</label>
<input id="support-message" placeholder="${language === 'tr' ? 'Mesajınızı yazın...' : 'Type your message...'}"/>
<button aria-label="${language === 'tr' ? 'Mesajı gönder' : 'Send message'}">
${icon('send', 19)}
</button>
</form>
</div>
</div>`;
