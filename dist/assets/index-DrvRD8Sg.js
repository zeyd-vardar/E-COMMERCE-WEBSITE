var At=Object.defineProperty;var Lt=(e,t,r)=>t in e?At(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Ue=(e,t,r)=>Lt(e,typeof t!="symbol"?t+"":t,r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();const qe=e=>`/${e}`,Tt={menu:`<line x1="4" x2="20" y1="7" y2="7"/>
<line x1="4" x2="20" y1="12" y2="12"/>
<line x1="4" x2="20" y1="17" y2="17"/>`,search:`<circle cx="11" cy="11" r="7"/>
<path d="m20 20-4-4"/>`,x:'<path d="M18 6 6 18M6 6l12 12"/>',truck:`<path d="M10 17h4V5H2v12h3m9-8h4l4 4v4h-3"/>
<circle cx="7.5" cy="17.5" r="2.5"/>
<circle cx="16.5" cy="17.5" r="2.5"/>`,heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',bag:`<path d="M6 8h12l1 13H5L6 8Z"/>
<path d="M9 9V6a3 3 0 0 1 6 0v3"/>`,user:`<circle cx="12" cy="8" r="4"/>
<path d="M4 21a8 8 0 0 1 16 0"/>`,chevron:'<path d="m9 18 6-6-6-6"/>',message:'<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',send:`<path d="m22 2-7 20-4-9-9-4Z"/>
<path d="M22 2 11 13"/>`},w=(e,t=20)=>`<svg aria-hidden="true" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
${Tt[e]}
</svg>`,Rt=(e,t,r=0)=>`
<header class="site-header" id="site-header">
 <div class="header-inner">
  <button class="icon-btn menu-trigger" id="menu-trigger" aria-label="${e==="tr"?"Menüyü aç":"Open menu"}" aria-expanded="false" aria-controls="sidebar">
${w("menu",24)}
</button>
  <a class="brand brand-logo-link" href="/" data-home-route aria-label="${e==="tr"?"STORE ana sayfa":"STORE home page"}">
<img class="brand-logo" src="${qe("store-logo.svg")}" alt="STORE">
</a>
  <div class="desktop-search search-shell" id="desktop-search">
<label class="sr-only" for="search-input">
${e==="tr"?"Ürün veya kategori ara":"Search products or categories"}
</label>
${w("search",18)}
<input id="search-input" type="search" autocomplete="off" placeholder="${e==="tr"?"Ürün veya kategori ara":"Search products or categories"}"/>
<button class="search-clear" type="button" aria-label="${e==="tr"?"Aramayı temizle":"Clear search"}">
${w("x",16)}
</button>
<div class="search-results" role="listbox">
</div>
</div>
  <div class="header-actions">
   <div class="select-wrap">
<label class="sr-only" for="currency">
${e==="tr"?"Para birimi":"Currency"}
</label>
<select id="currency">
<option ${t==="TRY"?"selected":""}>TRY</option>
<option ${t==="USD"?"selected":""}>USD</option>
<option ${t==="EUR"?"selected":""}>EUR</option>
</select>
</div>
   <button class="language-toggle text-btn" type="button" aria-label="${e==="tr"?"Dili İngilizce yap":"Dili Türkçe yap"}">
${e.toUpperCase()}
</button>
   <nav class="utility-nav" aria-label="${e==="tr"?"Hızlı işlemler":"Quick actions"}">
    <button class="icon-btn route-btn" data-route="tracking" data-tooltip="${e==="tr"?"Kargo Takip":"Track order"}" aria-label="${e==="tr"?"Kargo Takip":"Track order"}">
${w("truck")}
</button>
    <button class="icon-btn route-btn" data-route="favorites" data-tooltip="${e==="tr"?"Favoriler":"Favorites"}" aria-label="${e==="tr"?"Favoriler":"Favorites"}">
${w("heart")}
</button>
    <button class="icon-btn route-btn cart-header-btn" data-route="cart" data-tooltip="${e==="tr"?"Sepetim":"Cart"}" aria-label="${e==="tr"?"Sepetim":"Cart"}">
${w("bag")}
<span class="cart-count ${r?"is-visible":""}">
${r}
</span>
</button>
    <button class="icon-btn route-btn desktop-account" data-route="account" data-tooltip="${e==="tr"?"Hesabım":"Account"}" aria-label="${e==="tr"?"Hesabım":"Account"}">
${w("user")}
</button>
   </nav>
   <button class="icon-btn mobile-search-trigger" aria-label="${e==="tr"?"Aramayı aç":"Open search"}">
${w("search",21)}
</button>
  </div>
 </div>
 <div class="mobile-search-panel" id="mobile-search">
<div class="search-shell">
<label class="sr-only" for="mobile-search-input">
${e==="tr"?"Ürün veya kategori ara":"Search products or categories"}
</label>
${w("search",18)}
<input id="mobile-search-input" type="search" autocomplete="off" placeholder="${e==="tr"?"Ürün veya kategori ara":"Search products or categories"}"/>
<button class="mobile-search-close icon-btn" aria-label="${e==="tr"?"Aramayı kapat":"Close search"}">
${w("x")}
</button>
<div class="search-results" role="listbox">
</div>
</div>
</div>
</header>`,ge=(e,t,r)=>({id:e,label:{tr:t,en:r},href:`/${e}`}),qt=[ge("about","Hakkımızda","About us"),ge("stores","Mağazalar","Stores"),ge("contact","İletişim","Contact"),ge("help","Yardım","Help")],tt=(e,t)=>({tr:e,en:t}),Ct=(e,t,r,a)=>({id:e,slug:t,name:tt(r,a)}),T=(e,t,r,a,s)=>({id:e,slug:t,name:tt(r,a),children:s}),o=(e,t,r,a)=>Ct(`${e}-${t}`,t,r,a),Dt=[o("women-clothing","new-arrivals","Yeni Gelenler","New Arrivals"),o("women-clothing","dresses","Elbise","Dresses"),o("women-clothing","evening-dresses","Abiye","Evening Dresses"),o("women-clothing","tshirts","Tişört","T-Shirts"),o("women-clothing","blouses","Bluz","Blouses"),o("women-clothing","shirts","Gömlek","Shirts"),o("women-clothing","sweatshirts","Sweatshirt","Sweatshirts"),o("women-clothing","knitwear","Kazak & Triko","Knitwear"),o("women-clothing","trousers","Pantolon","Trousers"),o("women-clothing","jeans","Jean","Jeans"),o("women-clothing","skirts","Etek","Skirts"),o("women-clothing","shorts","Şort","Shorts"),o("women-clothing","leggings","Tayt","Leggings"),o("women-clothing","suits","Takım","Sets"),o("women-clothing","jackets","Ceket","Jackets"),o("women-clothing","blazers","Blazer","Blazers"),o("women-clothing","puffer-jackets","Mont","Puffer Jackets"),o("women-clothing","coats","Kaban","Coats"),o("women-clothing","trenchcoats","Trençkot","Trench Coats")],zt=[o("women-shoes","sneakers","Spor Ayakkabı","Sneakers"),o("women-shoes","casual-shoes","Günlük Ayakkabı","Casual Shoes"),o("women-shoes","heels","Topuklu Ayakkabı","Heels"),o("women-shoes","flats","Babet","Flats"),o("women-shoes","loafers","Loafer","Loafers"),o("women-shoes","sandals","Sandalet","Sandals"),o("women-shoes","slippers","Terlik","Slippers"),o("women-shoes","boots","Bot","Boots"),o("women-shoes","tall-boots","Çizme","Tall Boots")],Pt=[o("women-bags","shoulder-bags","Omuz Çantası","Shoulder Bags"),o("women-bags","handbags","El Çantası","Handbags"),o("women-bags","crossbody-bags","Çapraz Çanta","Crossbody Bags"),o("women-bags","backpacks","Sırt Çantası","Backpacks"),o("women-bags","clutches","Clutch","Clutches"),o("women-bags","wallets","Cüzdan","Wallets")],Mt=[o("women-accessories","watches","Saat","Watches"),o("women-accessories","jewelry","Takı","Jewelry"),o("women-accessories","eyewear","Gözlük","Eyewear"),o("women-accessories","belts","Kemer","Belts"),o("women-accessories","hats","Şapka & Bere","Hats"),o("women-accessories","scarves","Şal & Fular","Scarves"),o("women-accessories","hair-accessories","Saç Aksesuarları","Hair Accessories")],Ot=[o("men-clothing","new-arrivals","Yeni Gelenler","New Arrivals"),o("men-clothing","tshirts","Tişört","T-Shirts"),o("men-clothing","polo","Polo Yaka","Polo Shirts"),o("men-clothing","shirts","Gömlek","Shirts"),o("men-clothing","sweatshirts","Sweatshirt","Sweatshirts"),o("men-clothing","hoodies","Hoodie","Hoodies"),o("men-clothing","knitwear","Kazak & Triko","Knitwear"),o("men-clothing","trousers","Pantolon","Trousers"),o("men-clothing","jeans","Jean","Jeans"),o("men-clothing","shorts","Şort","Shorts"),o("men-clothing","tracksuits","Eşofman","Tracksuits"),o("men-clothing","suits","Takım Elbise","Suits"),o("men-clothing","jackets","Ceket","Jackets"),o("men-clothing","blazers","Blazer","Blazers"),o("men-clothing","puffer-jackets","Mont","Puffer Jackets"),o("men-clothing","coats","Kaban","Coats")],Kt=[o("men-shoes","sneakers","Spor Ayakkabı","Sneakers"),o("men-shoes","casual-shoes","Günlük Ayakkabı","Casual Shoes"),o("men-shoes","formal-shoes","Klasik Ayakkabı","Formal Shoes"),o("men-shoes","loafers","Loafer","Loafers"),o("men-shoes","boots","Bot","Boots"),o("men-shoes","sandals","Sandalet","Sandals"),o("men-shoes","slippers","Terlik","Slippers")],Nt=[o("men-bags","backpacks","Sırt Çantası","Backpacks"),o("men-bags","shoulder-bags","Omuz Çantası","Shoulder Bags"),o("men-bags","briefcases","Evrak Çantası","Briefcases"),o("men-bags","belt-bags","Bel Çantası","Belt Bags"),o("men-bags","wallets","Cüzdan","Wallets")],Bt=[o("men-accessories","watches","Saat","Watches"),o("men-accessories","eyewear","Gözlük","Eyewear"),o("men-accessories","belts","Kemer","Belts"),o("men-accessories","ties","Kravat","Ties"),o("men-accessories","bow-ties","Papyon","Bow Ties"),o("men-accessories","hats","Şapka & Bere","Hats"),o("men-accessories","jewelry","Takı","Jewelry")],Ge=(e,t=[])=>[o(e,"tshirts","Tişört","T-Shirts"),o(e,"sweatshirts","Sweatshirt","Sweatshirts"),o(e,"knitwear","Kazak","Knitwear"),o(e,"trousers","Pantolon","Trousers"),o(e,"jeans","Jean","Jeans"),o(e,"shorts","Şort","Shorts"),o(e,"leggings","Tayt","Leggings"),o(e,"coats","Mont & Kaban","Coats"),o(e,"pajamas","Pijama","Pajamas"),...t],It=[T("kids-girls","girls","Kız Çocuk","Girls",Ge("kids-girls",[o("kids-girls","dresses","Elbise","Dresses"),o("kids-girls","skirts","Etek","Skirts")])),T("kids-boys","boys","Erkek Çocuk","Boys",Ge("kids-boys",[o("kids-boys","shirts","Gömlek","Shirts")])),T("kids-baby-girls","baby-girls","Bebek Kız","Baby Girls",[o("kids-baby-girls","bodysuits","Body","Bodysuits"),o("kids-baby-girls","rompers","Tulum","Rompers"),o("kids-baby-girls","dresses","Elbise","Dresses"),o("kids-baby-girls","sets","Takımlar","Sets"),o("kids-baby-girls","pajamas","Pijama","Pajamas"),o("kids-baby-girls","coats","Mont","Coats")]),T("kids-baby-boys","baby-boys","Bebek Erkek","Baby Boys",[o("kids-baby-boys","bodysuits","Body","Bodysuits"),o("kids-baby-boys","rompers","Tulum","Rompers"),o("kids-baby-boys","tshirts","Tişört","T-Shirts"),o("kids-baby-boys","sets","Takımlar","Sets"),o("kids-baby-boys","pajamas","Pijama","Pajamas"),o("kids-baby-boys","coats","Mont","Coats")]),T("kids-shoes","shoes","Ayakkabı","Shoes",[o("kids-shoes","sneakers","Spor Ayakkabı","Sneakers"),o("kids-shoes","casual-shoes","Günlük Ayakkabı","Casual Shoes"),o("kids-shoes","sandals","Sandalet","Sandals"),o("kids-shoes","boots","Bot","Boots"),o("kids-shoes","slippers","Terlik","Slippers")]),T("kids-accessories","accessories","Aksesuar","Accessories",[o("kids-accessories","bags","Çanta","Bags"),o("kids-accessories","hats","Şapka & Bere","Hats"),o("kids-accessories","socks","Çorap","Socks"),o("kids-accessories","scarves","Atkı","Scarves"),o("kids-accessories","gloves","Eldiven","Gloves")])],xt=[T("accessories-bags","bags","Çanta","Bags",[o("accessories-bags","women-bags","Kadın Çanta","Women’s Bags"),o("accessories-bags","men-bags","Erkek Çanta","Men’s Bags"),o("accessories-bags","shoulder-bags","Omuz Çantası","Shoulder Bags"),o("accessories-bags","backpacks","Sırt Çantası","Backpacks"),o("accessories-bags","crossbody-bags","Çapraz Çanta","Crossbody Bags"),o("accessories-bags","handbags","El Çantası","Handbags"),o("accessories-bags","wallets","Cüzdan","Wallets")]),T("accessories-watches","watches","Saat","Watches",[o("accessories-watches","women-watches","Kadın Saatleri","Women’s Watches"),o("accessories-watches","men-watches","Erkek Saatleri","Men’s Watches"),o("accessories-watches","smart-watches","Akıllı Saatler","Smart Watches")]),T("accessories-jewelry","jewelry","Takı","Jewelry",[o("accessories-jewelry","necklaces","Kolye","Necklaces"),o("accessories-jewelry","bracelets","Bileklik","Bracelets"),o("accessories-jewelry","earrings","Küpe","Earrings"),o("accessories-jewelry","rings","Yüzük","Rings")]),T("accessories-eyewear","eyewear","Gözlük","Eyewear",[o("accessories-eyewear","women-sunglasses","Kadın Güneş Gözlüğü","Women’s Sunglasses"),o("accessories-eyewear","men-sunglasses","Erkek Güneş Gözlüğü","Men’s Sunglasses")]),T("accessories-other","other","Diğer","Other",[o("accessories-other","belts","Kemer","Belts"),o("accessories-other","hats","Şapka & Bere","Hats"),o("accessories-other","scarves","Şal & Fular","Scarves"),o("accessories-other","gloves","Eldiven","Gloves")])],xe=(e,t)=>t.map(([r,a,s])=>o(e,r,a,s)),Yt=xe("sale",[["all-sale","Tüm İndirimler","All Sale"],["women-sale","Kadın İndirim","Women Sale"],["men-sale","Erkek İndirim","Men Sale"],["kids-sale","Çocuk İndirim","Kids Sale"],["shoes-sale","Ayakkabı İndirim","Shoes Sale"],["accessories-sale","Aksesuar İndirim","Accessories Sale"],["outlet-deals","Outlet Fırsatları","Outlet Deals"]]),Ft=xe("outlet",[["all-outlet","Tüm Outlet","All Outlet"],["women-outlet","Kadın Outlet","Women Outlet"],["men-outlet","Erkek Outlet","Men Outlet"],["kids-outlet","Çocuk Outlet","Kids Outlet"],["shoes-outlet","Ayakkabı Outlet","Shoes Outlet"],["accessories-outlet","Aksesuar Outlet","Accessories Outlet"],["last-chance","Son Şans","Last Chance"]]),Q=[T("all","all","Tüm Ürünler","All Products",xe("all",[["women","Kadın","Women"],["men","Erkek","Men"],["kids","Çocuk ve Bebek","Kids & Baby"],["new-arrivals","Yeni Gelenler","New Arrivals"],["best-sellers","Çok Satanlar","Best Sellers"]])),T("sale","sale","İndirimli Ürünler","Sale",Yt),T("men","men","Erkek","Men",[T("men-clothing","clothing","Giyim","Clothing",Ot),T("men-shoes","shoes","Ayakkabı","Shoes",Kt),T("men-bags","bags","Çanta","Bags",Nt),T("men-accessories","accessories","Aksesuar","Accessories",Bt)]),T("women","women","Kadın","Women",[T("women-clothing","clothing","Giyim","Clothing",Dt),T("women-shoes","shoes","Ayakkabı","Shoes",zt),T("women-bags","bags","Çanta","Bags",Pt),T("women-accessories","accessories","Aksesuar","Accessories",Mt)]),T("kids","kids","Çocuk ve Bebek","Kids & Baby",It),T("accessories","accessories","Aksesuar","Accessories",xt),T("outlet","outlet","Outlet","Outlet",Ft)],rt=(e,t)=>e.flatMap(r=>[{id:r.id,slug:r.slug,name:r.name,parentId:t},...rt(r.children??[],r.id)]),ke=rt(Q);ke.filter(e=>!e.parentId);const jt=e=>ke.find(t=>t.id===e||t.slug===e)??ke[0],st=(e,t=Q,r=[])=>{for(const a of t){const s=[...r,a];if(a.id===e||a.slug===e)return s;const i=st(e,a.children??[],s);if(i.length)return i}return[]},Ce=e=>e.filter(Boolean).join("/"),Ye=e=>`/category/${Ce(e)}`,Ut=(e,t)=>{const r=[];let a=e;for(const s of t){const i=a.find(c=>c.slug===s);if(!i)return[];r.push(i),a=i.children??[]}return r},at=(e,t,r,a=0)=>e.map(s=>{var u;const i=[...r,s.slug],c=Ce(i),n=Ye(i);return(u=s.children)!=null&&u.length?`<div class="sidebar-category depth-${a}">
<button class="sidebar-category-toggle" aria-expanded="false">
<span>
${s.name[t]}
</span>
${w("chevron",16)}
</button>
<div class="sidebar-children">
<a class="sidebar-all-link" href="${n}" data-category-route="${c}">
${t==="tr"?`Tüm ${s.name.tr}`:`All ${s.name.en}`} →</a>
${at(s.children,t,i,a+1)}
</div>
</div>`:`<a class="sidebar-leaf depth-${a}" href="${n}" data-category-route="${c}">
${s.name[t]}
</a>`}).join(""),Gt=(e,t)=>`<div class="sidebar-overlay" id="sidebar-overlay">
</div>
<aside class="sidebar" id="sidebar" aria-hidden="true" aria-label="${e==="tr"?"Ana menü":"Main menu"}">
<div class="sidebar-head">
<a class="brand sidebar-brand-logo" href="/" data-home-route aria-label="STORE">
<img src="${qe("store-logo.svg")}" alt="STORE">
</a>
<button class="icon-btn sidebar-close" aria-label="${e==="tr"?"Menüyü kapat":"Close menu"}">
${w("x",24)}
</button>
</div>
<nav class="sidebar-tree" aria-label="${e==="tr"?"Kategoriler":"Categories"}">
${at(Q,e,[])}
</nav>
<nav class="sidebar-actions" aria-label="${e==="tr"?"Hızlı işlemler":"Quick actions"}">
<a href="/tracking" data-route="tracking">
${w("truck",18)}
<span>
${e==="tr"?"Kargo Takip":"Track order"}
</span>
</a>
<a href="/favorites" data-route="favorites">
${w("heart",18)}
<span>
${e==="tr"?"Favoriler":"Favorites"}
</span>
</a>
<a href="/cart" data-route="cart">
${w("bag",18)}
<span>
${e==="tr"?"Sepet":"Cart"}
</span>
</a>
<a href="/account" data-route="account">
${w("user",18)}
<span>
${e==="tr"?"Hesabım":"Account"}
</span>
</a>
</nav>
<nav class="sidebar-secondary">
${qt.map(r=>`<a href="${r.href}" data-route="${r.id}">
${r.label[e]}
</a>
${r.id==="help"?`<button class="sidebar-support-trigger" type="button" aria-expanded="false" aria-controls="support-panel">
${e==="tr"?"Canlı Destek":"Live Support"}
</button>`:""}`).join("")}
</nav>
<div class="sidebar-footer">
<label>
<span class="sr-only">
${e==="tr"?"Para birimi":"Currency"}
</span>
<select id="sidebar-currency">
<option ${t==="TRY"?"selected":""}>TRY</option>
<option ${t==="USD"?"selected":""}>USD</option>
<option ${t==="EUR"?"selected":""}>EUR</option>
</select>
</label>
<button class="sidebar-lang">
${e==="tr"?"English":"Türkçe"}
</button>
<span>© 2026 STORE</span>
</div>
</aside>`,Fe={brand:"STORE",hero:{eyebrow:{tr:"İLKBAHAR / YAZ 2026",en:"SPRING / SUMMER 2026"},title:{tr:`Sessiz bir
özgüven.`,en:`Quiet
confidence.`},description:{tr:"Yeni sezonun rafine silüetleriyle kendi ritmini bul.",en:"Find your rhythm in the refined silhouettes of the new season."},cta:{tr:"KOLEKSİYONU KEŞFET",en:"EXPLORE THE COLLECTION"}},exchangeRates:{TRY:1,USD:.031,EUR:.028}},Ht=e=>{const t=Fe.hero;return`<section class="hero" id="home" aria-labelledby="hero-title">
<img
  class="hero-image"
  src="${qe("images/aurea-hero.png")}"
  alt="${e==="tr"?"Modern taş mimaride yeni sezon STORE koleksiyonunu giyen iki model":"Two models wearing the STORE new season collection in modern stone architecture"}"
  fetchpriority="high"
  width="1536"
  height="1024"
/>
<div class="hero-shade">
</div>
<div class="hero-content">
<p class="eyebrow">
${t.eyebrow[e]}
</p>
<h1 id="hero-title">
${t.title[e].replace(`
`,"<br>")}
</h1>
<p>
${t.description[e]}
</p>
<a class="link-cta" href="/category/all" data-category-route="all">
${t.cta[e]} ${w("arrow",19)}
</a>
</div>
<a href="#recommended" class="scroll-cue" aria-label="${e==="tr"?"Önerilen ürünlere kaydır":"Scroll to recommended products"}">
<span>SCROLL</span>
<i>
</i>
</a>
<div class="hero-index">01 <span>
</span> 04</div>
</section>`},Wt=(e,t)=>`<section class="campaign-section">
<div class="campaign-copy reveal">
<p class="eyebrow">STORE SALE</p>
<h2>
${e==="tr"?`İndirimleri
kaçırma.`:`Don’t miss
the sale.`}
</h2>
<p>
${e==="tr"?"Seçili ürünlerdeki özel fiyatları keşfet.":"Discover special prices on selected pieces."}
</p>
<a class="sale-cta" href="/category/sale" data-category-route="sale">
${e==="tr"?"İNDİRİMLERİ KAÇIRMA":"DON’T MISS THE SALE"}
</a>
</div>
</section>
<section class="gender-campaign gender-campaign-men" aria-labelledby="men-campaign-title">
<div class="gender-campaign-copy reveal">
<p class="eyebrow">STORE MEN</p>
<h2 id="men-campaign-title">
${e==="tr"?"Erkek":"Men"}
</h2>
<p>
${e==="tr"?"Modern erkek stilinin zamansız parçalarını keşfet.":"Discover timeless pieces for modern menswear."}
</p>
<a class="gender-campaign-cta" href="/category/men" data-category-route="men">
${e==="tr"?"ERKEK ÜRÜNLERİNİ KEŞFET":"EXPLORE MEN"}
</a>
</div>
</section>
<section class="gender-campaign gender-campaign-women" aria-labelledby="women-campaign-title">
<div class="gender-campaign-copy reveal">
<p class="eyebrow">STORE WOMEN</p>
<h2 id="women-campaign-title">
${e==="tr"?"Kadın":"Women"}
</h2>
<p>
${e==="tr"?"Güçlü ve zarif kadın stilinin yeni seçkisini keşfet.":"Discover the new edit of confident, refined womenswear."}
</p>
<a class="gender-campaign-cta" href="/category/women" data-category-route="women">
${e==="tr"?"KADIN ÜRÜNLERİNİ KEŞFET":"EXPLORE WOMEN"}
</a>
</div>
</section>`,Vt=e=>`<div class="support">
<div class="support-panel" id="support-panel" role="dialog" aria-modal="false" aria-labelledby="support-title" aria-hidden="true">
<header>
<div>
<small>
${e==="tr"?"Genellikle birkaç dakika içinde yanıt veririz.":"We usually reply in a few minutes."}
</small>
<h2 id="support-title">
${e==="tr"?"Nasıl yardımcı olabiliriz?":"How can we help?"}
</h2>
</div>
<button class="icon-btn support-close" aria-label="${e==="tr"?"Desteği kapat":"Close support"}">
${w("x")}
</button>
</header>
<div class="support-body">
<div class="avatar">A</div>
<div class="chat-bubble">
<p>
${e==="tr"?"Merhaba! Size nasıl yardımcı olabiliriz?":"Hello! How can we help you?"}
</p>
<time>Şimdi</time>
</div>
</div>
<form class="support-form">
<label class="sr-only" for="support-message">
${e==="tr"?"Mesajınız":"Your message"}
</label>
<input id="support-message" placeholder="${e==="tr"?"Mesajınızı yazın...":"Type your message..."}"/>
<button aria-label="${e==="tr"?"Mesajı gönder":"Send message"}">
${w("send",19)}
</button>
</form>
</div>
</div>`,Jt=()=>`<div class="toast" id="toast" role="status" aria-live="polite">
</div>`,P={get(e,t,r){try{const a=localStorage.getItem(e);return a&&r.includes(a)?a:t}catch{return t}},set(e,t){try{localStorage.setItem(e,t)}catch{}},getJson(e,t){try{const r=localStorage.getItem(e);return r?JSON.parse(r):t}catch{return t}},setJson(e,t){this.set(e,JSON.stringify(t))}},Se=(e,t)=>{const r=Ce(e);return`class="mega-menu-link mega-menu-${t}" href="${Ye(e)}" data-category-link data-category-route="${r}" data-category-kind="${t}"`},it=(e,t,r)=>e.map(a=>{var i;const s=[...r,a.slug];return(i=a.children)!=null&&i.length?`<div class="mega-subgroup">
<h4>
<a ${Se(s,"group")}>
${a.name[t]}
</a>
</h4>
${it(a.children,t,s)}
</div>`:`<a ${Se(s,"leaf")} data-category-leaf="${a.id}" data-category-id="${a.id}">
${a.name[t]}
</a>`}).join(""),Zt=(e,t,r)=>{var s;const a=[t.slug,e.slug];return`<div class="mega-column">
<h3>
<a ${Se(a,"group")}>
${e.name[r]}
</a>
</h3>
${(s=e.children)!=null&&s.length?it(e.children,r,a):`<a ${Se(a,"leaf")} data-category-leaf="${e.id}" data-category-id="${e.id}">
${r==="tr"?"Tümünü Gör":"View All"}
</a>`}
</div>`},Ee=(e,t)=>`<nav class="category-nav" aria-label="${t==="tr"?"Ürün kategorileri":"Product categories"}">
<div class="category-triggers">
${Q.map(r=>`<button
  class="category-trigger ${r.id===e?"is-active":""}"
  type="button"
  data-mega-trigger="${r.id}"
  data-category-slug="${r.slug}"
  aria-expanded="false"
  aria-controls="mega-${r.id}"
>
${r.name[t]}
</button>`).join("")}
</div>
${Q.map(r=>`<section
  class="mega-menu"
  id="mega-${r.id}"
  data-mega-panel="${r.id}"
  aria-hidden="true"
>
<header>
<div>
<p class="eyebrow">STORE / ${r.name[t].toUpperCase()}
</p>
<h2>
${r.name[t]}
</h2>
</div>
<a ${Se([r.slug],"cta")}>
${t==="tr"?`Tüm ${r.name.tr} Ürünlerini Gör`:`View All ${r.name.en}`} →</a>
</header>
<div class="mega-columns">
${(r.children??[]).map(a=>Zt(a,r,t)).join("")}
</div>
</section>`).join("")}
</nav>
<button class="mega-overlay" type="button" aria-label="${t==="tr"?"Kategori menüsünü kapat":"Close category menu"}">
</button>`,H=(e,t,r)=>new Intl.NumberFormat(r==="tr"?"tr-TR":"en-US",{style:"currency",currency:t,maximumFractionDigits:t==="TRY"?0:2}).format(e*Fe.exchangeRates[t]),Re=e=>e.originalPrice?Math.round((e.originalPrice-e.price)/e.originalPrice*100):0,ot=(e,t,r)=>{const a=r??st(t).map(n=>n.slug),[s,i]=a,c=s==="sale"?e:e.filter(n=>!n.saleOnly);return s==="all"?c.filter(n=>i==="women"||i==="men"||i==="kids"?n.categoryId===i:i==="new-arrivals"?n.isNew:i==="best-sellers"?n.isBestSeller:!0):s==="sale"?e.filter(n=>{var u;return!!n.originalPrice&&(i==="women-sale"?n.categoryId==="women":i==="men-sale"?n.categoryId==="men":i==="kids-sale"?n.categoryId==="kids":i==="shoes-sale"?(u=n.categoryPath)==null?void 0:u.includes("shoes"):i==="accessories-sale"?n.categoryId==="accessories":i==="outlet-deals"?n.isOutlet:!0)}):s==="outlet"?c.filter(n=>{var u;return n.isOutlet&&(i==="women-outlet"?n.categoryId==="women":i==="men-outlet"?n.categoryId==="men":i==="kids-outlet"?n.categoryId==="kids":i==="shoes-outlet"?(u=n.categoryPath)==null?void 0:u.includes("shoes"):i==="accessories-outlet"?n.categoryId==="accessories":i==="last-chance"?!!n.originalPrice:!0)}):c.filter(n=>n.categoryPath?a.every((u,m)=>{var v;return((v=n.categoryPath)==null?void 0:v[m])===u}):a.length===1?n.categoryId===s:a.length===2?n.categoryId===s&&n.subcategoryId===i:!1)},_t=(e,t)=>e.filter(r=>[...t].every(([a,s])=>!s.size||[...s].some(i=>{var c,n;return a==="category"?r.categoryId===i||r.subcategoryId===i||!!((c=r.categoryPath)!=null&&c.includes(i)):a==="clothingCategory"?!!((n=r.categoryPath)!=null&&n.includes("clothing")&&r.categoryPath.includes(i)):a==="brand"?r.brand===i:a==="color"?r.colors.includes(i):a==="size"?r.sizes.includes(i):a==="availability"?i==="in-stock"?r.stock>0:r.stock===0:a==="discount"?!!r.originalPrice:a==="minPrice"?r.price>=Number(i):a==="maxPrice"?r.price<=Number(i):!0}))),Xt=(e,t,r)=>[...e].sort((a,s)=>t==="price-asc"?a.price-s.price:t==="price-desc"?s.price-a.price:t==="newest"?s.createdAt-a.createdAt:t==="discount"?Re(s)-Re(a):t==="name-asc"?a.name[r].localeCompare(s.name[r],r):t==="name-desc"?s.name[r].localeCompare(a.name[r],r):Number(s.isBestSeller)-Number(a.isBestSeller)),Qt=(e,t)=>t.filter(r=>r.id!==e.id).map(r=>({p:r,score:(r.subcategoryId===e.subcategoryId?4:0)+(r.categoryId===e.categoryId?2:0)+(r.brand===e.brand?1:0)+(Math.abs(r.price-e.price)<1e3?1:0)})).sort((r,a)=>a.score-r.score).slice(0,8).map(r=>r.p);class nt{constructor(t){Ue(this,"values");this.key=t,this.values=new Set(P.getJson(t,[]))}has(t){return this.values.has(t)}all(){return[...this.values]}toggle(t){return this.values.has(t)?this.values.delete(t):this.values.add(t),this.save(),this.values.has(t)}remove(t){this.values.delete(t),this.save()}clear(){this.values.clear(),this.save()}save(){P.setJson(this.key,this.all())}}const ee=new nt("aurea-favorites"),G=new nt("aurea-comparison"),ct=(e,t,r,a)=>{const s=Re(e),i=e.images.length;return`<article class="catalog-card" data-product-id="${e.id}">
<div class="catalog-image" style="--image-position:${e.imagePosition}">
<div class="catalog-gallery" aria-label="${e.name[t]} — ${i} ${t==="tr"?"görsel":"images"}">
${e.images.map((c,n)=>`<a class="catalog-gallery-slide" href="/product/${e.slug}" data-product-route="${e.slug}" aria-label="${e.name[t]}${i>1?`, ${n+1}. ${t==="tr"?"görsel":"image"}`:""}">
<img
  src="${c}"
  alt="${n===0?e.name[t]:""}"
  draggable="false"
  loading="${a<6&&n===0?"eager":"lazy"}"
  style="transform-origin:${n===0?e.imagePosition:"50% 50%"}"
  onerror="this.hidden=true;this.parentElement?.classList.add('image-error')"
>
</a>`).join("")}
</div>
${i>1?`<button type="button" class="catalog-gallery-arrow is-prev" data-gallery-direction="-1" aria-label="${t==="tr"?"Önceki görsel":"Previous image"}" disabled>${w("chevron",16)}</button>
<button type="button" class="catalog-gallery-arrow is-next" data-gallery-direction="1" aria-label="${t==="tr"?"Sonraki görsel":"Next image"}">${w("chevron",16)}</button>
<div class="catalog-gallery-dots" aria-label="${i} ${t==="tr"?"görsel":"images"}">
${e.images.map((c,n)=>`<span class="catalog-gallery-dot ${n===0?"is-active":""}"></span>`).join("")}
</div>`:""}
<button class="icon-btn catalog-favorite ${ee.has(e.id)?"is-active":""}" aria-label="${t==="tr"?"Favoriyi değiştir":"Toggle favorite"}">
${w("heart",19)}
</button>
${s?`<span class="discount-badge">−%${s}
</span>`:e.isNew?`<span class="new-badge">
${t==="tr"?"YENİ":"NEW"}
</span>`:""}${e.stock===0?`<span class="stock-badge">
${t==="tr"?"STOKTA YOK":"OUT OF STOCK"}
</span>`:""}
</div>
<div class="catalog-info">
<p class="catalog-brand">
${e.brand}
</p>
<a href="/product/${e.slug}" data-product-route="${e.slug}">
<h3>
${e.name[t]}
</h3>
</a>
<div class="catalog-price">
${e.originalPrice?`<s>
${H(e.originalPrice,r,t)}
</s>`:""}
<strong>
${H(e.price,r,t)}
</strong>
</div>
<label class="compare-choice">
<input type="checkbox" class="compare-input" ${G.has(e.id)?"checked":""}>
<span>
${t==="tr"?"Karşılaştır":"Compare"}
</span>
</label>
<button class="catalog-cart ${e.stock===0?"notify-btn":"add-cart"}">
${e.stock===0?t==="tr"?"GELİNCE HABER VER":"NOTIFY ME":t==="tr"?"SEPETE EKLE":"ADD TO CART"}
</button>
</div>
</article>`},be=e=>[...new Set(e)].filter(Boolean).sort((t,r)=>t.localeCompare(r,"tr")),er={women:{tr:"Kadın",en:"Women"},men:{tr:"Erkek",en:"Men"},kids:{tr:"Çocuk",en:"Kids"},accessories:{tr:"Aksesuar",en:"Accessories"}},lt=new Map,dt=e=>e.forEach(t=>{lt.set(t.slug,t.name),t.children&&dt(t.children)});dt(Q);const ae=(e,t,r,a,s)=>r.length?`<fieldset>
<legend>
${t}
</legend>
${r.map(i=>{var c;return`<label>
<input type="checkbox" data-filter-key="${e}" value="${i}" ${(c=a.get(e))!=null&&c.has(i)?"checked":""}>
<span>
${(s==null?void 0:s(i))??i}
</span>
</label>`}).join("")}
</fieldset>`:"",tr=(e,t,r,a)=>{var g,$;const s=be(a.map(p=>p.categoryId)),i=be(a.filter(p=>{var y;return(y=p.categoryPath)==null?void 0:y.includes("clothing")}).map(p=>{var y;return((y=p.categoryPath)==null?void 0:y.at(-1))??""})),c=be(a.map(p=>p.brand)),n=be(a.flatMap(p=>p.colors)),u=be(a.flatMap(p=>p.sizes)),m=((g=r.get("minPrice"))==null?void 0:g.values().next().value)??"",v=(($=r.get("maxPrice"))==null?void 0:$.values().next().value)??"",b=[ae("category",t==="tr"?"Kategori":"Category",s,r,p=>{var y;return((y=er[p])==null?void 0:y[t])??p}),ae("clothingCategory",t==="tr"?"Giyim Kategorisi":"Clothing Category",i,r,p=>{var y;return((y=lt.get(p))==null?void 0:y[t])??p}),ae("brand",t==="tr"?"Marka":"Brand",c,r),ae("color",t==="tr"?"Renk":"Color",n,r),ae("size",t==="tr"?"Beden":"Size",u,r),ae("availability",t==="tr"?"Stok Durumu":"Availability",["in-stock","out-of-stock"],r,p=>p==="in-stock"?t==="tr"?"Stokta var":"In stock":t==="tr"?"Stokta yok":"Out of stock"),ae("discount",t==="tr"?"İndirim":"Discount",["discounted"],r,()=>t==="tr"?"İndirimli ürünler":"On sale")].join("");return`<div class="filter-overlay">
</div>
<aside class="filter-drawer" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="filter-title">
<header>
<div>
<p class="eyebrow">STORE</p>
<h2 id="filter-title">
${t==="tr"?"Filtrele":"Filter"}
</h2>
</div>
<button class="icon-btn filter-close" aria-label="${t==="tr"?"Filtreyi kapat":"Close filters"}">
${w("x")}
</button>
</header>
<div class="filter-groups">
${b}
<fieldset>
<legend>
${t==="tr"?"Fiyat Aralığı":"Price Range"}
</legend>
<div class="price-range">
<label>
<span>
Minimum
</span>
<input type="number" min="0" step="10" inputmode="numeric" data-price-filter="minPrice" value="${m}" placeholder="0">
</label>
<label>
<span>
${t==="tr"?"Maksimum":"Maximum"}
</span>
<input type="number" min="0" step="10" inputmode="numeric" data-price-filter="maxPrice" value="${v}" placeholder="∞">
</label>
</div>
</fieldset>
</div>
<footer>
<button class="filter-clear">
${t==="tr"?"TEMİZLE":"CLEAR"}
</button>
<button class="filter-apply">
${t==="tr"?"SONUÇLARI GÖSTER":"SHOW RESULTS"}
</button>
</footer>
</aside>`},rr=(e,t)=>`<div class="comparison-bar ${e>=2?"is-visible":""}">
<p>
<strong>
${e}
</strong> ${t==="tr"?"ürün seçildi":"products selected"}
</p>
<div>
<button class="comparison-clear">
${t==="tr"?"TEMİZLE":"CLEAR"}
</button>
<a href="/compare" data-compare-route>
${t==="tr"?"KARŞILAŞTIR":"COMPARE"}
</a>
</div>
</div>`,mt=e=>`<div class="modal-overlay">
</div>
<dialog class="notify-dialog">
<button class="icon-btn notify-close" aria-label="${e==="tr"?"Kapat":"Close"}">
${w("x")}
</button>
<p class="eyebrow">BACK IN STOCK</p>
<h2>
${e==="tr"?"Size haber verelim.":"Let us notify you."}
</h2>
<p>
${e==="tr"?"Bu ürün yeniden stoklara geldiğinde e-posta adresinize bilgi gönderelim.":"Enter your email and we’ll let you know when this item is back."}
</p>
<form>
<label for="notify-email">
${e==="tr"?"E-posta adresiniz":"Email address"}
</label>
<input id="notify-email" type="email" required autocomplete="email" placeholder="name@example.com">
<button>
${e==="tr"?"BENİ BİLGİLENDİR":"NOTIFY ME"}
</button>
</form>
</dialog>`,He=["#E8E4DC","#DDE5E4","#E7DDD8","#E1E5DB","#E5DFE8","#E8E1D5"],sr=e=>e.replace(/[<>&'\"]/g,t=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"})[t]??t),me=(e,t)=>{const r=e.length>28?`${e.slice(0,27)}…`:e,a=r.length>22?30:r.length>15?36:44,s=`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
<rect width="900" height="1200" fill="${He[t%He.length]}"/>
<text x="450" y="600" text-anchor="middle" dominant-baseline="middle" fill="#282724" font-family="Arial,sans-serif" font-size="${a}" letter-spacing="3">
${sr(r.toUpperCase())}
</text>
<text x="450" y="655" text-anchor="middle" fill="#77736c" font-family="Arial,sans-serif" font-size="15" letter-spacing="5">STORE COLLECTION</text>
</svg>`;return`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(s)}`},ce=[{tr:"Keten Karışımlı Ceket",en:"Linen Blend Jacket",cat:"women",sub:"clothing"},{tr:"Rahat Kesim Blazer",en:"Relaxed Blazer",cat:"women",sub:"clothing"},{tr:"Saten Midi Elbise",en:"Satin Midi Dress",cat:"women",sub:"clothing"},{tr:"Yüksek Bel Pantolon",en:"High Waist Trousers",cat:"women",sub:"clothing"},{tr:"Dokulu Overshirt",en:"Textured Overshirt",cat:"men",sub:"clothing"},{tr:"Yün Karışımlı Ceket",en:"Wool Blend Jacket",cat:"men",sub:"clothing"},{tr:"Regular Fit Gömlek",en:"Regular Fit Shirt",cat:"men",sub:"clothing"},{tr:"Pileli Pantolon",en:"Pleated Trousers",cat:"men",sub:"clothing"},{tr:"Luna Omuz Çantası",en:"Luna Shoulder Bag",cat:"accessories",sub:"bags"},{tr:"Mini Deri Çanta",en:"Mini Leather Bag",cat:"accessories",sub:"bags"},{tr:"Klasik Kol Saati",en:"Classic Wrist Watch",cat:"accessories",sub:"watches"},{tr:"İnce Kordon Saat",en:"Slim Strap Watch",cat:"accessories",sub:"watches"},{tr:"Cat Eye Güneş Gözlüğü",en:"Cat Eye Sunglasses",cat:"accessories",sub:"jewelry"},{tr:"Minimal Halka Küpe",en:"Minimal Hoop Earrings",cat:"accessories",sub:"jewelry"},{tr:"Deri Sneaker",en:"Leather Sneakers",cat:"men",sub:"shoes"},{tr:"Süet Loafer",en:"Suede Loafers",cat:"women",sub:"shoes"},{tr:"Pamuklu Çocuk Sweatshirt",en:"Kids Cotton Sweatshirt",cat:"kids",sub:"clothing"},{tr:"Çocuk Keten Takım",en:"Kids Linen Set",cat:"kids",sub:"clothing"}],We=["STORE","NOMA","ATELIER 26","STUDIO N"],ar=["0% 0%","100% 0%","0% 100%","100% 100%"],ir=[20,25,30,35],or=Array.from({length:54},(e,t)=>{const r=ce[t%ce.length],a=1290+t%9*450,s=t<4,i=s||t%4===0,c=s?ir[t]:25,n={tr:`${r.tr}${t>=ce.length?` ${Math.floor(t/ce.length)+1}`:""}`,en:`${r.en}${t>=ce.length?` ${Math.floor(t/ce.length)+1}`:""}`};return{id:`ap-${t+1}`,slug:`${r.en.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${t+1}`,name:n,categoryId:r.cat,subcategoryId:r.sub,brand:We[t%We.length],sku:`AU-${String(t+1).padStart(4,"0")}`,price:i?Math.round(a*(1-c/100)):a,originalPrice:i?a:void 0,images:[s?"/images/aurea-products.jpg":me(n.tr,t),me(`${n.tr} · DETAY`,t+1),me(`${n.tr} · GÖRÜNÜM`,t+2)],imagePosition:s?ar[t]:"50% 50%",colors:[t%2?"Siyah":"Ekru",t%3?"Kum":"Haki"],sizes:t%5===0?[]:["XS","S","M","L"],stock:t%11===0?0:3+t%12,isNew:t%5===0,isBestSeller:t%7===0,isOutlet:t%6===0,saleOnly:s,createdAt:Date.now()-t*864e5,description:{tr:"Günlük ritme uyum sağlayan rafine formu, özenli dikişleri ve uzun ömürlü materyal seçimiyle tasarlandı.",en:"Designed for everyday rhythm with a refined silhouette, considered stitching and enduring materials."},rating:4.2+t%7/10,reviewCount:18+t%9*11,attributes:{Materyal:t%2?"Pamuk":"Yün Karışım",Sezon:"2026",Kalıp:t%3?"Regular":"Rahat",SuGeçirmezlik:r.sub==="watches"?"3 ATM":"—"}}}),Ve=10,nr=new Set(["women","men","kids","accessories"]),ut=(e=Q,t=[])=>e.flatMap(r=>{var s;const a=[...t,r];return(s=r.children)!=null&&s.length?ut(r.children,a):t.length&&nr.has(t[0].id)?[{node:r,path:a}]:[]}),cr=e=>e.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ı/g,"i").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""),lr=e=>e.some(t=>["shoes","sneakers","boots","sandals","slippers","loafers","heels"].includes(t))?"shoes":e.some(t=>["watches","women-watches","men-watches","smart-watches"].includes(t))?"watch":e.some(t=>["jewelry","necklaces","bracelets","earrings","rings"].includes(t))?"jewelry":e.some(t=>["bags","shoulder-bags","handbags","backpacks","wallets"].includes(t))?"bag":e[0]==="kids"?"kids":"clothing",dr={clothing:[490,3290],kids:[290,1790],shoes:[890,4990],bag:[690,5990],watch:[1290,12990],jewelry:[290,3490]},Je=["STORE","FORM","MODE","LINE"],mr=[12,5,0,18,2,9,0,3,14,7],ur=[0,10,0,20,0,30,0,15,0,25],pr=()=>ut().flatMap(({node:e,path:t},r)=>Array.from({length:Ve},(a,s)=>{const i=s+1,c=t.map(M=>M.id),n=t.map(M=>M.slug),u=lr(n),[m,v]=dr[u],b=Math.round((m+(v-m)*(s/Ve))/10)*10,g=ur[s],$=t.length>3?t.at(-2).name:t[0].name,p={tr:`${$.tr} ${e.name.tr} ${i}`.toUpperCase(),en:`${$.en} ${e.name.en} ${i}`.toUpperCase()},y=c.join("-"),A=["watch","jewelry","bag"].includes(u),K=u==="watch"?{Kordon:"Deri",KasaÇapı:"42 mm",SuGeçirmezlik:"5 ATM"}:u==="jewelry"?{Materyal:"Paslanmaz Çelik",Uzunluk:"45 cm"}:u==="shoes"?{Materyal:"Deri",Taban:"Kauçuk",Kalıp:"Normal"}:{Materyal:"Pamuk Karışımlı",Kalıp:"Regular",Sezon:"2026"};return{id:`item-${y}-${String(i).padStart(2,"0")}`,slug:cr(`${y}-${i}`),name:p,categoryId:c[0],subcategoryId:e.id,categoryPath:n,brand:Je[(r+s)%Je.length],sku:`ST-${r+1}-${i}`,price:g?Math.round(b*(1-g/100)/10)*10:b,originalPrice:g?b:void 0,images:[me(p.tr,r+s),me(`${p.tr} · DETAY`,r+s+1),me(`${p.tr} · GÖRÜNÜM`,r+s+2)],imagePosition:"50% 50%",colors:[s%2?"Siyah":"Ekru",s%3?"Lacivert":"Kum"],sizes:A?[]:u==="shoes"?n[0]==="kids"?["28","29","30","31","32"]:["36","37","38","39","40","41","42"]:["XS","S","M","L","XL"],stock:mr[s],isNew:s%4===0,isBestSeller:s%5===0,isOutlet:(r+s)%7===0,createdAt:Date.UTC(2026,7,17)-r*864e5-s*36e5,description:{tr:`${e.name.tr} kategorisinin seçili koleksiyon parçası.`,en:`A selected piece from the ${e.name.en} collection.`},rating:4.1+s%5*.17,reviewCount:12+s*13,attributes:K}})),hr=pr(),I=[...or,...hr],pt="aurea-cart",le=()=>{const e=P.getJson(pt,[]);return Array.isArray(e)?e.filter(t=>!!(t&&typeof t=="object"&&"productId"in t&&"quantity"in t)):e&&typeof e=="object"?Object.entries(e).map(([t,r])=>({productId:t,quantity:r})):[]},we=e=>P.setJson(pt,e),O={all:le,add(e,t={}){const r=le(),a=r.find(s=>s.productId===e&&s.color===t.color&&s.size===t.size);a?a.quantity+=1:r.push({productId:e,...t,quantity:1}),we(r),this.emit()},setQuantity(e,t){const r=le();r[e]&&(t<=0?r.splice(e,1):r[e].quantity=t,we(r),this.emit())},remove(e){const t=le();t[e]&&(t.splice(e,1),we(t),this.emit())},prune(e){const t=le(),r=t.filter(a=>e.has(a.productId)&&Number.isFinite(a.quantity)&&a.quantity>0);r.length!==t.length&&we(r)},count(){return le().reduce((e,t)=>e+t.quantity,0)},emit(){dispatchEvent(new CustomEvent("aurea:cart"))}},ie=12;let J=ie,se=new Map,ve;const ht=()=>location.pathname.split("/").filter(Boolean).at(-1)??"all",yr=()=>location.pathname.split("/").filter(Boolean).slice(1),yt=()=>new URLSearchParams(location.search).get("sort")??"recommended",Ke=e=>Xt(_t(ot(I,ht(),location.pathname.split("/").filter(Boolean).slice(1)),se),yt(),e),br=(e,t)=>{var g;const r=ht(),a=yr(),s=Ut(Q,a),i=s.at(-1)??jt(r),c=((g=s[0])==null?void 0:g.id)??r,n=ot(I,r,a),u=Ke(e),m=Math.min(J,u.length),v=[...se.values()].reduce(($,p)=>$+p.size,0),b=s.slice(0,-1).map(($,p)=>{const y=Ce(a.slice(0,p+1));return`<a href="${Ye(a.slice(0,p+1))}" data-category-route="${y}">
${$.name[e]}
</a>
<span>/</span>`}).join("");return`${Ee(c,e)}
<div class="category-page">
<nav class="breadcrumbs" aria-label="Breadcrumb">
<a href="/" data-home-route>
${e==="tr"?"Ana Sayfa":"Home"}
</a>
<span>/</span>
${b}
<span aria-current="page">
${i.name[e]}
</span>
</nav>
<header class="category-toolbar">
<div>
<p class="eyebrow">STORE COLLECTION</p>
<h1>
${i.name[e]}
</h1>
<span class="product-count">
${u.length} ${e==="tr"?"ürün":"products"}
</span>
</div>
<div class="toolbar-actions">
<button class="compare-toolbar">
${e==="tr"?"Karşılaştır":"Compare"} <span>(${G.all().length})</span>
</button>
<label>
<span>
${e==="tr"?"Sırala":"Sort"}
</span>
<select class="sort-select">
<option value="recommended">
${e==="tr"?"Önerilen":"Recommended"}
</option>
<option value="price-asc">
${e==="tr"?"Fiyat: Artan":"Price: Low to high"}
</option>
<option value="price-desc">
${e==="tr"?"Fiyat: Azalan":"Price: High to low"}
</option>
<option value="newest">
${e==="tr"?"En Yeni":"Newest"}
</option>
<option value="discount">
${e==="tr"?"En Çok İndirim":"Biggest discount"}
</option>
<option value="name-asc">
${e==="tr"?"Ürün Adı: A-Z":"Product: A-Z"}
</option>
<option value="name-desc">
${e==="tr"?"Ürün Adı: Z-A":"Product: Z-A"}
</option>
</select>
</label>
<button class="filter-trigger">
${e==="tr"?"Filtrele":"Filter"}${v?` <span>(${v})</span>`:""}
</button>
</div>
</header>
<div class="active-filters">
${[...se].flatMap(([$,p])=>[...p].map(y=>`<button data-remove-filter="${$}:${y}">
${y} ×</button>`)).join("")}
</div>
${u.length?`<section class="catalog-grid" aria-label="${i.name[e]}">
${u.slice(0,m).map(($,p)=>ct($,e,t,p)).join("")}
</section>
<div class="infinite-sentinel" aria-live="polite">
${m<u.length?`<span class="loader">
</span>`:e==="tr"?"Tüm ürünleri görüntülediniz.":"You have viewed all products."}
</div>`:`<div class="catalog-empty">
<h2>
${e==="tr"?"Aradığınız ürünleri bulamadık.":"No matching products."}
</h2>
<p>
${e==="tr"?"Filtreleri temizleyerek yeniden deneyin.":"Clear your filters and try again."}
</p>
<button class="empty-clear">
${e==="tr"?"FİLTRELERİ TEMİZLE":"CLEAR FILTERS"}
</button>
</div>`}
</div>
${tr(r,e,se,n)}${rr(G.all().length,e)}${mt(e)}`},vr=()=>{J=ie,se=new Map},$r=(e,t,r,a)=>{var p,y,A,K,M,d,E,R,D,x,te;document.querySelector(".sort-select").value=yt();const s=()=>{ve==null||ve.disconnect(),t()};document.querySelectorAll(".catalog-card").forEach(f=>{var q,Y,pe,he;const L=f.dataset.productId;(q=f.querySelector(".catalog-favorite"))==null||q.addEventListener("click",l=>{const h=ee.toggle(L);l.currentTarget.classList.toggle("is-active",h),r(h?e==="tr"?"Favorilere eklendi.":"Added to favorites.":e==="tr"?"Favorilerden çıkarıldı.":"Removed from favorites.")}),(Y=f.querySelector(".compare-input"))==null||Y.addEventListener("change",()=>{G.toggle(L),s()}),(pe=f.querySelector(".add-cart"))==null||pe.addEventListener("click",()=>{O.add(L);const l=document.querySelector(".cart-count");l&&(l.textContent=String(O.count()),l.classList.add("is-visible")),r(e==="tr"?"Ürün sepete eklendi.":"Added to cart.")}),(he=f.querySelector(".notify-btn"))==null||he.addEventListener("click",()=>g())});const i=document.querySelector(".filter-drawer"),c=document.querySelector(".filter-overlay"),n=f=>{var L;i==null||i.classList.toggle("is-open",f),c==null||c.classList.toggle("is-open",f),i==null||i.setAttribute("aria-hidden",String(!f)),f&&((L=i==null?void 0:i.querySelector("button"))==null||L.focus())};(p=document.querySelector(".filter-trigger"))==null||p.addEventListener("click",()=>n(!0)),(y=document.querySelector(".filter-close"))==null||y.addEventListener("click",()=>n(!1)),c==null||c.addEventListener("click",()=>n(!1)),(A=document.querySelector(".filter-apply"))==null||A.addEventListener("click",()=>{const f=new Map;i==null||i.querySelectorAll("[data-filter-key]:checked").forEach(L=>{const q=L.dataset.filterKey;f.has(q)||f.set(q,new Set),f.get(q).add(L.value)}),i==null||i.querySelectorAll("[data-price-filter]").forEach(L=>{const q=L.value.trim();q&&f.set(L.dataset.priceFilter,new Set([q]))}),se=f,J=ie,s()});const u=()=>{se.clear(),J=ie,s()};(K=document.querySelector(".filter-clear"))==null||K.addEventListener("click",u),(M=document.querySelector(".empty-clear"))==null||M.addEventListener("click",u),document.querySelectorAll("[data-remove-filter]").forEach(f=>f.addEventListener("click",()=>{var Y;const[L,q]=f.dataset.removeFilter.split(":");(Y=se.get(L))==null||Y.delete(q),J=ie,s()})),(d=document.querySelector(".sort-select"))==null||d.addEventListener("change",f=>{const L=f.target.value,q=new URL(location.href);L==="recommended"?q.searchParams.delete("sort"):q.searchParams.set("sort",L),history.replaceState({},"",q),J=ie,s()}),(E=document.querySelector(".comparison-clear"))==null||E.addEventListener("click",()=>{G.clear(),s()}),(R=document.querySelector("[data-compare-route]"))==null||R.addEventListener("click",f=>{f.preventDefault(),a("/compare")});const m=document.querySelector(".infinite-sentinel");m&&J<Ke(e).length&&(ve=new IntersectionObserver(f=>{var L;(L=f[0])!=null&&L.isIntersecting&&(J=Math.min(J+ie,Ke(e).length),s())},{rootMargin:"500px"}),ve.observe(m));const v=document.querySelector(".notify-dialog"),b=document.querySelector(".modal-overlay");function g(){v==null||v.showModal(),b==null||b.classList.add("is-open")}const $=()=>{v==null||v.close(),b==null||b.classList.remove("is-open")};(D=document.querySelector(".notify-close"))==null||D.addEventListener("click",$),b==null||b.addEventListener("click",$),(x=v==null?void 0:v.querySelector("form"))==null||x.addEventListener("submit",f=>{f.preventDefault(),f.currentTarget.reportValidity()&&($(),r(e==="tr"?"Talebiniz alındı. Ürün tekrar stoklara geldiğinde bilgilendirileceksiniz.":"Request received. We’ll notify you when it is back."))}),(te=document.querySelector(".compare-toolbar"))==null||te.addEventListener("click",()=>G.all().length>=2?a("/compare"):r(e==="tr"?"Karşılaştırmak için en az 2 ürün seçin.":"Select at least 2 products."))},fr=(e,t)=>{const r=I.filter(s=>G.has(s.id)),a=[...new Set(r.flatMap(s=>Object.keys(s.attributes)))];return`${Ee("",e)}
<main class="compare-page">
<a href="/category/all" data-category-route="all" class="back-link">← ${e==="tr"?"Ürünlere dön":"Back to products"}
</a>
<p class="eyebrow">STORE SELECT</p>
<h1>
${e==="tr"?"Ürün Karşılaştırma":"Product Comparison"}
</h1>
${r.length?`<div class="compare-table" style="--compare-count:${r.length}">
<div class="compare-label">
${e==="tr"?"Ürün":"Product"}
</div>
${r.map(s=>`<div>
<strong>
${s.name[e]}
</strong>
<small>
${s.brand}
</small>
</div>`).join("")}
<div class="compare-label">
${e==="tr"?"Fiyat":"Price"}
</div>
${r.map(s=>`<div>
${H(s.price,t,e)}
</div>`).join("")}
<div class="compare-label">
${e==="tr"?"Kategori":"Category"}
</div>
${r.map(s=>`<div>
${s.categoryId}
</div>`).join("")}
<div class="compare-label">
${e==="tr"?"Stok":"Stock"}
</div>
${r.map(s=>`<div>
${s.stock||"—"}
</div>`).join("")}${a.map(s=>`<div class="compare-label">
${s}
</div>
${r.map(i=>`<div>
${String(i.attributes[s]??"—")}
</div>`).join("")}`).join("")}
</div>`:`<div class="catalog-empty">
<h2>
${e==="tr"?"Karşılaştırmak için ürün seçin.":"Choose products to compare."}
</h2>
<a href="/category/all" data-category-route="all">
${e==="tr"?"ÜRÜNLERİ GÖR":"VIEW PRODUCTS"}
</a>
</div>`}
</main>`},kr=[{id:"r1",productId:"all",author:"STORE Member 01",rating:5,title:{tr:"Beklentimin üzerinde",en:"Above expectations"},comment:{tr:"Dokusu ve kalıbı çok iyi. Paketleme de oldukça özenliydi.",en:"Excellent texture and fit. The packaging was beautifully considered."},date:"2026-06-14",verifiedPurchase:!0},{id:"r2",productId:"all",author:"STORE Member 02",rating:4,comment:{tr:"Zamansız ve kolay kombinlenen bir parça.",en:"A timeless piece that is easy to style."},date:"2026-05-28",verifiedPurchase:!0}],Ae={deliveryDays:"1–3",returnDays:14},Ze="aurea-recently-viewed",Sr={add(e){const t=[e,...this.all().filter(r=>r!==e)].slice(0,8);P.setJson(Ze,t)},all(){return P.getJson(Ze,[])}};let ue=0,oe="",C="",Z=1;const bt=()=>location.pathname.split("/").filter(Boolean).at(-1)??"",vt=e=>I.find(t=>t.slug===e),Er={Siyah:"#242321",Ekru:"#e7dfd0",Kum:"#b7a184",Haki:"#68705c"},Ne=e=>`<span class="stars" aria-hidden="true">
${Array.from({length:5},(t,r)=>`<svg viewBox="0 0 24 24">
<path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9Z" ${r<Math.round(e)?'fill="currentColor"':""}/>
</svg>`).join("")}
</span>`,gr=(e,t)=>{const r=["0% 0%","100% 0%","0% 100%","100% 100%"];return`<section class="detail-gallery">
<button class="detail-main-image image-viewer-open" aria-label="${t==="tr"?"Ürün görselini büyüt":"Enlarge product image"}">
<img src="${e.images[0]}" alt="${e.name[t]}" style="transform-origin:${r[ue]}" fetchpriority="high">
<span class="image-counter">
${ue+1} / 4</span>
<span class="zoom-hint">
${w("search",17)} ${t==="tr"?"BÜYÜT":"ZOOM"}
</span>
</button>
<div class="detail-thumbnails">
${r.map((a,s)=>`<button class="${s===ue?"is-active":""}" data-image-index="${s}" aria-label="${s+1}. ${t==="tr"?"ürün görselini göster":"product image"}">
<img src="${e.images[0]}" alt="" loading="lazy" style="transform-origin:${a}">
</button>`).join("")}
</div>
</section>`},$t=(e,t,r)=>`<div class="detail-price">
${e.originalPrice?`<s>
${H(e.originalPrice,r,t)}
</s>`:""}
<strong>
${H(e.price,r,t)}
</strong>
${e.originalPrice?`<span>−%${Re(e)}
</span>`:""}
</div>`,wr=(e,t,r)=>{var a;return`<section class="detail-info">
<p class="detail-brand">
${e.brand}
</p>
<h1>
${e.name[t]}
</h1>
<a href="#reviews" class="rating-link">
${Ne(e.rating??0)} <span>
${(e.rating??0).toFixed(1)} (${e.reviewCount??0} ${t==="tr"?"yorum":"reviews"})</span>
</a>
${$t(e,t,r)}
<p class="stock-note">
${e.stock===0?t==="tr"?"Stokta yok":"Out of stock":e.stock<=3?t==="tr"?`Son ${e.stock} ürün`:`Only ${e.stock} left`:t==="tr"?"Stokta":"In stock"}
</p>
${e.colors.length?`<div class="variant-group">
<div class="variant-head">
<span>
${t==="tr"?"Renk":"Color"}: <strong>
${oe||e.colors[0]}
</strong>
</span>
</div>
<div class="color-swatches">
${e.colors.map(s=>`<button
  style="--swatch:${Er[s]??"#aaa"}"
  class="${(oe||e.colors[0])===s?"is-active":""}"
  data-color="${s}"
  aria-label="${t==="tr"?"Renk":"Color"}: ${s}"
  aria-pressed="${(oe||e.colors[0])===s}"
>
<i>
</i>
</button>`).join("")}
</div>
</div>`:""}${e.sizes.length?`<div class="variant-group">
<div class="variant-head">
<span>
${t==="tr"?"Beden":"Size"}
</span>
<button class="size-guide-open">
${t==="tr"?"Beden Rehberi":"Size Guide"}
</button>
</div>
<div class="size-options">
${e.sizes.map((s,i)=>`<button data-size="${s}" class="${C===s?"is-active":""}" ${i===1&&e.stock<5?"disabled":""}>
${s}
</button>`).join("")}
</div>
</div>`:""}
<div class="purchase-row">
<div class="quantity" aria-label="${t==="tr"?"Adet":"Quantity"}">
<button class="quantity-minus" aria-label="${t==="tr"?"Azalt":"Decrease"}">−</button>
<span>
${Z}
</span>
<button class="quantity-plus" aria-label="${t==="tr"?"Artır":"Increase"}">+</button>
</div>
<button class="detail-cart ${e.stock===0?"detail-notify":"detail-add-cart"}">
${e.stock===0?t==="tr"?"GELİNCE HABER VER":"NOTIFY ME":t==="tr"?"SEPETE EKLE":"ADD TO CART"}
</button>
</div>
<div class="secondary-actions">
<button class="detail-favorite ${ee.has(e.id)?"is-active":""}">
${w("heart",18)}
<span>
${ee.has(e.id)?t==="tr"?"Favorilerden Çıkar":"Remove Favorite":t==="tr"?"Favorilere Ekle":"Add to Favorites"}
</span>
</button>
<button class="detail-compare ${G.has(e.id)?"is-active":""}">
${w("arrow",18)}
<span>
${G.has(e.id)?t==="tr"?"Karşılaştırmadan Çıkar":"Remove from Compare":t==="tr"?"Karşılaştırmaya Ekle":"Add to Compare"}
</span>
</button>
</div>
<div class="delivery-notes">
<p>
${w("truck",18)}
<span>
${t==="tr"?`Kargo: ${Ae.deliveryDays} iş günü`:`Delivery: ${Ae.deliveryDays} business days`}
</span>
</p>
<p>
${w("arrow",18)}
<span>
${t==="tr"?`${Ae.returnDays} gün ücretsiz iade`:`Free returns within ${Ae.returnDays} days`}
</span>
</p>
</div>
<div class="detail-accordions">
<div>
<button aria-expanded="true">
${t==="tr"?"Ürün Detayları":"Product Details"}
<span>−</span>
</button>
<section>
${(a=e.description)!=null&&a[t]?`<p>
${e.description[t]}
</p>`:""}
<dl>
${Object.entries(e.attributes).filter(([,s])=>s!=="—").map(([s,i])=>`<div>
<dt>
${s}
</dt>
<dd>
${String(i)}
</dd>
</div>`).join("")}
<div>
<dt>
${t==="tr"?"Ürün Kodu":"Product Code"}
</dt>
<dd>
${e.sku}
</dd>
</div>
</dl>
</section>
</div>
<div>
<button aria-expanded="false">
${t==="tr"?"Teslimat & İade":"Delivery & Returns"}
<span>+</span>
</button>
<section hidden>
<p>
${t==="tr"?"Siparişiniz özenle hazırlanır. Kullanılmamış ürünleri 14 gün içinde ücretsiz iade edebilirsiniz.":"Your order is carefully prepared. Unused items can be returned free within 14 days."}
</p>
</section>
</div>
</div>
</section>`},Ar=(e,t)=>`<section class="product-reviews" id="reviews">
<header>
<p class="eyebrow">STORE COMMUNITY</p>
<h2>
${t==="tr"?"Yorumlar":"Reviews"}
</h2>
<button class="review-write">
${t==="tr"?"YORUM YAZ":"WRITE A REVIEW"}
</button>
</header>
<div class="review-summary">
<strong>
${(e.rating??0).toFixed(1)}
</strong>
<div>
${Ne(e.rating??0)}
<p>
${e.reviewCount??0} ${t==="tr"?"değerlendirme":"ratings"}
</p>
</div>
</div>
<div class="review-list">
${kr.map(r=>{var a;return`<article>
<div>
${Ne(r.rating)}
<time>
${new Intl.DateTimeFormat(t==="tr"?"tr-TR":"en-US").format(new Date(r.date))}
</time>
</div>
<h3>
${((a=r.title)==null?void 0:a[t])??(t==="tr"?"Ürün değerlendirmesi":"Product review")}
</h3>
<p>
${r.comment[t]}
</p>
<small>
${r.author}${r.verifiedPurchase?` · ${t==="tr"?"Doğrulanmış alışveriş":"Verified purchase"}`:""}
</small>
</article>`}).join("")}
</div>
</section>`,Lr=(e,t)=>`<div class="viewer-overlay">
<div class="image-viewer" role="dialog" aria-modal="true" aria-label="${t==="tr"?"Ürün görseli":"Product image"}">
<button class="icon-btn viewer-close" aria-label="${t==="tr"?"Kapat":"Close"}">
${w("x",24)}
</button>
<button class="viewer-prev" aria-label="${t==="tr"?"Önceki":"Previous"}">‹</button>
<div>
<img src="${e.images[0]}" alt="${e.name[t]}">
</div>
<button class="viewer-next" aria-label="${t==="tr"?"Sonraki":"Next"}">›</button>
</div>
</div>
<dialog class="size-guide">
<button class="icon-btn size-guide-close" aria-label="${t==="tr"?"Kapat":"Close"}">
${w("x")}
</button>
<p class="eyebrow">STORE FIT</p>
<h2>
${t==="tr"?"Beden Rehberi":"Size Guide"}
</h2>
<table>
<thead>
<tr>
<th>
${t==="tr"?"Beden":"Size"}
</th>
<th>
${t==="tr"?"Göğüs":"Chest"}
</th>
<th>
${t==="tr"?"Bel":"Waist"}
</th>
<th>
${t==="tr"?"Kalça":"Hip"}
</th>
</tr>
</thead>
<tbody>
<tr>
<td>S</td>
<td>86</td>
<td>68</td>
<td>94</td>
</tr>
<tr>
<td>M</td>
<td>92</td>
<td>74</td>
<td>100</td>
</tr>
<tr>
<td>L</td>
<td>98</td>
<td>80</td>
<td>106</td>
</tr>
</tbody>
</table>
</dialog>
${mt(t)}`,Tr=(e,t)=>{const r=vt(bt());if(!r)return`${Ee("",e)}
<main class="product-not-found">
<p class="eyebrow">404</p>
<h1>
${e==="tr"?"Ürün bulunamadı.":"Product not found."}
</h1>
<a href="/category/all" data-category-route="all">
${e==="tr"?"ÜRÜNLERE DÖN":"BACK TO PRODUCTS"}
</a>
</main>`;Sr.add(r.id);const a=ke.find(c=>c.id===r.categoryId),s=ke.find(c=>c.id===r.subcategoryId),i=Qt(r,I).slice(0,4);return document.title=`${r.name[e]} | STORE`,`${Ee(r.categoryId,e)}
<main class="product-page">
<nav class="breadcrumbs" aria-label="Breadcrumb">
<a href="/" data-home-route>
${e==="tr"?"Ana Sayfa":"Home"}
</a>
<span>/</span>
<a href="/category/${r.categoryId}" data-category-route="${r.categoryId}">
${(a==null?void 0:a.name[e])??r.categoryId}
</a>
${s?`<span>/</span>
<a href="/category/${r.categoryId}/${s.slug}" data-category-route="${s.slug}">
${s.name[e]}
</a>`:""}
<span>/</span>
<span aria-current="page">
${r.name[e]}
</span>
</nav>
<div class="product-detail">
${gr(r,e)}${wr(r,e,t)}
</div>
${Ar(r,e)}${i.length?`<section class="detail-recommendations">
<header>
<p class="eyebrow">DISCOVER MORE</p>
<h2>
${e==="tr"?"Benzer Ürünler":"You may also like"}
</h2>
</header>
<div>
${i.map((c,n)=>ct(c,e,t,n)).join("")}
</div>
</section>`:""}
</main>
${Lr(r,e)}
<div class="mobile-product-cta">
${$t(r,e,t)}
<button class="${r.stock===0?"detail-notify":"detail-add-cart"}">
${r.stock===0?e==="tr"?"HABER VER":"NOTIFY ME":e==="tr"?"SEPETE EKLE":"ADD TO CART"}
</button>
</div>`},ft=()=>{ue=0,oe="",C="",Z=1},Rr=e=>e==="Siyah"?"brightness(.72) contrast(1.08)":e==="Kum"?"sepia(.2) saturate(.82) brightness(1.06)":e==="Haki"?"sepia(.25) hue-rotate(28deg) saturate(.78)":e==="Lacivert"?"brightness(.78) saturate(1.15) hue-rotate(178deg)":"brightness(1.06) saturate(.82)",de=(e,t,r)=>{var a,s;return((s=(a=e.variantStock)==null?void 0:a[t])==null?void 0:s[r])??Math.max(0,Math.min(e.stock,(e.id.length+t.length+e.sizes.indexOf(r))%5===0?0:1+(e.stock+e.sizes.indexOf(r))%4))},qr=(e,t,r,a)=>{var g,$,p,y,A,K,M;const s=vt(bt());if(!s)return;const i=()=>oe||s.colors[0]||"",c=()=>{const d=document.querySelector(".cart-count");d&&(d.textContent=String(O.count()),d.classList.toggle("is-visible",O.count()>0))},n=()=>{var te;const d=i(),E=Rr(d),R=`#variant-${encodeURIComponent(d)}`;(te=document.querySelector(".variant-group strong"))==null||te.replaceChildren(d),document.querySelectorAll(".detail-gallery img,.image-viewer img").forEach(f=>{f.src=`${s.images[0].split("#")[0]}${R}`,f.style.filter=E}),document.querySelectorAll("[data-color]").forEach(f=>{const L=f.dataset.color===d;f.classList.toggle("is-active",L),f.setAttribute("aria-pressed",String(L))}),document.querySelectorAll("[data-size]").forEach(f=>{const L=f.dataset.size??"",q=de(s,d,L),Y=C===L;f.disabled=q===0,f.classList.toggle("is-active",Y),f.setAttribute("aria-pressed",String(Y)),f.setAttribute("aria-label",`${e==="tr"?"Beden":"Size"} ${L}${q===0?` — ${e==="tr"?"stokta yok":"out of stock"}`:""}`)});const D=C?de(s,d,C):s.stock,x=document.querySelector(".stock-note");x&&(x.textContent=D===0?e==="tr"?"Bu varyant stokta yok":"This variant is out of stock":D<=3?e==="tr"?`Bu varyantta son ${D} ürün`:`Only ${D} left in this variant`:e==="tr"?"Stokta":"In stock")};n(),document.querySelectorAll("[data-image-index]").forEach(d=>d.addEventListener("click",()=>{ue=Number(d.dataset.imageIndex),t()})),document.querySelectorAll("[data-color]").forEach(d=>d.addEventListener("click",()=>{oe=d.dataset.color??"",ue=0,C&&de(s,oe,C)===0&&(C=""),n()})),document.querySelectorAll("[data-size]").forEach(d=>d.addEventListener("click",()=>{C=d.dataset.size??"",Z=Math.min(Z,de(s,i(),C)),n()})),document.querySelectorAll(".quantity-minus").forEach(d=>d.addEventListener("click",()=>{Z=Math.max(1,Z-1),t()})),document.querySelectorAll(".quantity-plus").forEach(d=>d.addEventListener("click",()=>{const E=C?de(s,i(),C):s.stock;Z=Math.min(E,Z+1),t()}));const u=()=>{if(s.sizes.length&&!C){r(e==="tr"?"Lütfen bir beden seçin.":"Please select a size.");return}if(C&&de(s,i(),C)===0){r(e==="tr"?"Seçtiğiniz varyant stokta yok.":"The selected variant is out of stock.");return}for(let d=0;d<Z;d++)O.add(s.id,{color:i()||void 0,size:C||void 0});c(),r(e==="tr"?`${i()} / ${C} sepete eklendi.`:`${i()} / ${C} added to cart.`)};document.querySelectorAll(".detail-add-cart").forEach(d=>d.addEventListener("click",u)),document.querySelectorAll(".detail-notify").forEach(d=>d.addEventListener("click",()=>{var E;return(E=document.querySelector(".notify-dialog"))==null?void 0:E.showModal()})),(g=document.querySelector(".detail-favorite"))==null||g.addEventListener("click",()=>{ee.toggle(s.id),t(),r(ee.has(s.id)?e==="tr"?"Favorilere eklendi.":"Added to favorites.":e==="tr"?"Favorilerden çıkarıldı.":"Removed from favorites.")}),($=document.querySelector(".detail-compare"))==null||$.addEventListener("click",()=>{G.toggle(s.id),t(),r(e==="tr"?"Karşılaştırma listeniz güncellendi.":"Comparison list updated.")}),document.querySelectorAll(".detail-accordions>div>button").forEach(d=>d.addEventListener("click",()=>{const E=d.getAttribute("aria-expanded")==="true";d.setAttribute("aria-expanded",String(!E)),d.querySelector("span").textContent=E?"+":"−",d.nextElementSibling.hidden=E}));const m=document.querySelector(".size-guide");(p=document.querySelector(".size-guide-open"))==null||p.addEventListener("click",()=>m==null?void 0:m.showModal()),(y=document.querySelector(".size-guide-close"))==null||y.addEventListener("click",()=>m==null?void 0:m.close()),(A=document.querySelector(".review-write"))==null||A.addEventListener("click",()=>r(e==="tr"?"Yorumunuz değerlendirilmek üzere alındı.":"Your review was received for moderation."));const v=document.querySelector(".viewer-overlay"),b=d=>v==null?void 0:v.classList.toggle("is-open",d);(K=document.querySelector(".image-viewer-open"))==null||K.addEventListener("click",()=>b(!0)),(M=document.querySelector(".viewer-close"))==null||M.addEventListener("click",()=>b(!1)),v==null||v.addEventListener("click",d=>{d.target===v&&b(!1)}),document.querySelectorAll(".detail-recommendations [data-product-route]").forEach(d=>d.addEventListener("click",E=>{E.preventDefault(),ft(),a(`/product/${d.dataset.productRoute}`)}))},$e={address:{tr:`Merkez Mah. Örnek Cad. No: 10
İstanbul / Türkiye`,en:`Merkez District, Örnek Ave. No: 10
Istanbul / Türkiye`},phone:"+90 212 000 00 00",phoneHref:"+902120000000",email:"info@store.com"},Cr={ios:"",android:""},F=(e,t,r,a)=>({id:e,label:{tr:t,en:r},href:a}),Dr=[{id:"corporate",title:{tr:"Kurumsal",en:"Corporate"},links:[F("about","Hakkımızda","About Us","/about"),F("mission","Misyonumuz","Our Mission","/mission"),F("stores","Mağazalarımız","Our Stores","/stores"),F("blog","Blog","Blog","/blog"),F("privacy","Gizlilik Bildirimi","Privacy Notice","/privacy")]},{id:"support",title:{tr:"Destek",en:"Support"},links:[F("contact","Bize Ulaşın","Contact Us","/contact"),F("returns","İade Şartları","Return Policy","/returns"),F("shipping","Sipariş ve Teslimat","Orders & Delivery","/shipping"),F("tracking","Sipariş Takip","Order Tracking","/tracking"),F("faq","Sıkça Sorulan Sorular","Frequently Asked Questions","/faq"),F("sitemap","Site Haritası","Sitemap","/sitemap")]}],zr=`<svg aria-hidden="true" viewBox="0 0 24 24">
<path fill="currentColor" d="M17.1 12.5c0-2.8 2.3-4.1 2.4-4.2a5.1 5.1 0 0 0-4-2.2c-1.7-.2-3.3 1-4.1 1s-2.1-1-3.5-1C6.1 6.1 4.4 7.2 3.5 8.8c-2 3.4-.5 8.5 1.4 11.3.9 1.4 2 2.9 3.5 2.8 1.4-.1 1.9-.9 3.6-.9s2.2.9 3.6.9c1.5 0 2.5-1.4 3.4-2.8a12 12 0 0 0 1.5-3.1 4.8 4.8 0 0 1-3.4-4.5ZM14.4 4.3A4.8 4.8 0 0 0 15.5.8a4.9 4.9 0 0 0-3.2 1.7 4.5 4.5 0 0 0-1.1 3.3 4 4 0 0 0 3.2-1.5Z"/>
</svg>`,Pr=`<svg aria-hidden="true" viewBox="0 0 24 24">
<path fill="currentColor" d="M3.6 2.4a2 2 0 0 0-.4 1.2v16.8c0 .5.1.9.4 1.2L13 12 3.6 2.4Zm10.7 10.9-2.2 2.2-7.2 6.3c.4.1.8 0 1.2-.2l11.1-6.3-2.9-2Zm4.1-2.3-2.9-1.7-2.4 2.5 2.4 2.5 2.9-1.7c1-.5 1-1.1 0-1.6ZM4.9 2.2l7.2 6.3 2.2 2.2 2.9-2L6.1 2.4c-.4-.2-.8-.3-1.2-.2Z"/>
</svg>`,Mr=e=>`<footer class="site-footer">
<div class="footer-main">
<a class="footer-brand footer-brand-logo" href="/" data-home-route aria-label="STORE">
<img src="${qe("store-logo.svg")}" alt="STORE">
</a>
<div class="footer-columns">
${Dr.map(t=>`<nav class="footer-section" aria-label="${t.title[e]}">
<button class="footer-section-toggle" aria-expanded="true">
<span>
${t.title[e]}
</span>
<i>+</i>
</button>
<h2>
${t.title[e]}
</h2>
<div>
${t.links.map(r=>`<a href="${r.href}" data-footer-route="${r.id}">
${r.label[e]}
</a>`).join("")}
</div>
</nav>`).join("")}
<section class="footer-contact">
<button class="footer-section-toggle" aria-expanded="true">
<span>
${e==="tr"?"İletişim":"Contact"}
</span>
<i>+</i>
</button>
<h2>
${e==="tr"?"İletişim":"Contact"}
</h2>
<div>
<p>
<span>
${e==="tr"?"Adres":"Address"}
</span>
${$e.address[e].replace(`
`,"<br>")}
</p>
<p>
<span>
${e==="tr"?"Telefon":"Phone"}
</span>
<a href="tel:${$e.phoneHref}">
${$e.phone}
</a>
</p>
<p>
<span>
${e==="tr"?"E-posta":"Email"}
</span>
<a href="mailto:${$e.email}">
${$e.email}
</a>
</p>
</div>
</section>
</div>
</div>
<div class="footer-apps">
<p class="eyebrow">
${e==="tr"?"UYGULAMAMIZI İNDİRİN":"DOWNLOAD OUR APP"}
</p>
<div>
<button data-app-store="ios">
${zr}
<span>
<small>
${e==="tr"?"App Store’dan":"Download on the"}
</small>App Store</span>
</button>
<button data-app-store="android">
${Pr}
<span>
<small>
${e==="tr"?"Google Play’den":"Get it on"}
</small>Google Play</span>
</button>
</div>
</div>
<div class="footer-back">
<button class="back-to-top" aria-label="${e==="tr"?"Sayfanın başına dön":"Back to top"}">
<span>
${w("arrow",20)}
</span>
${e==="tr"?"YUKARI ÇIK":"BACK TO TOP"}
</button>
</div>
<div class="footer-bottom">
<p>© ${new Date().getFullYear()} ${Fe.brand}. ${e==="tr"?"Tüm hakları saklıdır.":"All rights reserved."}
</p>
<div>
<a href="/privacy" data-footer-route="privacy">
${e==="tr"?"Gizlilik":"Privacy"}
</a>
<a href="/terms" data-footer-route="terms">
${e==="tr"?"Kullanım Koşulları":"Terms of Use"}
</a>
</div>
</div>
</footer>`,Be=[{id:"o1",orderNumber:"AU-10254",date:"2026-08-12",itemCount:3,total:4799,status:"delivered",trackingNumber:"TRK10254"},{id:"o2",orderNumber:"AU-10318",date:"2026-08-16",itemCount:1,total:2490,status:"shipped",trackingNumber:"TRK10318"}],kt=[{id:"m1",subject:{tr:"Siparişiniz kargoya verildi",en:"Your order has shipped"},preview:{tr:"AU-10318 numaralı siparişiniz yola çıktı.",en:"Your order AU-10318 is on its way."},createdAt:"2026-08-16",isRead:!1,type:"order"},{id:"m2",subject:{tr:"İade talebiniz alındı",en:"Your return request was received"},preview:{tr:"Talebiniz inceleniyor.",en:"Your request is being reviewed."},createdAt:"2026-08-10",isRead:!1,type:"return"}],St="aurea-addresses",Or=[{id:"address-1",title:"Ev",firstName:"Zeynep",lastName:"Yılmaz",phone:"+90 555 000 00 00",addressLine:"Bağdat Caddesi No: 10 D: 4",city:"İstanbul",district:"Kadıköy",country:"Türkiye",isDefault:!0},{id:"address-2",title:"İş",firstName:"Zeynep",lastName:"Yılmaz",phone:"+90 555 000 00 00",addressLine:"Büyükdere Caddesi No: 22",city:"İstanbul",district:"Şişli",country:"Türkiye",isDefault:!1}],Le=()=>P.getJson(St,Or),ze=e=>P.setJson(St,e),X={all:Le,add(e){const t=Le(),r=t.findIndex(a=>a.id===e.id);r>=0?t[r]={...t[r],...e,isDefault:t[r].isDefault}:t.push(e),ze(t)},remove(e){ze(Le().filter(t=>t.id!==e))},makeDefault(e){ze(Le().map(t=>({...t,isDefault:t.id===e})))}},Et="aurea-stock-watch",Pe=()=>P.getJson(Et,[]),_e=e=>P.setJson(Et,e),De={all:Pe,add(e,t,r){const a=Pe();a.some(s=>s.productId===e)||_e([...a,{productId:e,desiredColor:t,desiredSize:r,createdAt:new Date().toISOString()}])},remove(e){_e(Pe().filter(t=>t.productId!==e))}},Xe="aurea-user-profile",Kr={id:"store-user",firstName:"Zeynep",lastName:"Yılmaz",email:"zeynep@store.com",phone:"+90 555 000 00 00"},ne={get(){return{...Kr,...P.getJson(Xe,{})}},save(e){P.setJson(Xe,e)}},Nr=()=>location.pathname,B={tr:{title:"Profilim",hello:"Merhaba",intro:"Hesabınızı, siparişlerinizi ve tercihlerinizi buradan yönetebilirsiniz.",cart:"Sepetim",addresses:"Adreslerim",orders:"Geçmiş Siparişlerim",favorites:"Favorilerim",tracking:"Sipariş Takip",stock:"Stok Takip",messages:"Mesajlarım",profile:"Kişisel Bilgilerim",back:"Profilime Dön",signout:"Çıkış Yap"},en:{title:"My Account",hello:"Hello",intro:"Manage your account, orders and preferences here.",cart:"My Cart",addresses:"My Addresses",orders:"Order History",favorites:"My Favorites",tracking:"Order Tracking",stock:"Stock Alerts",messages:"My Messages",profile:"Personal Information",back:"Back to Account",signout:"Sign Out"}},Br=e=>{const t=B[e];return[{id:"cart",title:t.cart,desc:`${O.count()} ${e==="tr"?"ürün":"items"}`,icon:"bag",path:"/cart"},{id:"addresses",title:t.addresses,desc:`${X.all().length} ${e==="tr"?"kayıtlı adres":"saved addresses"}`,icon:"truck",path:"/account/addresses"},{id:"orders",title:t.orders,desc:`${Be.length} ${e==="tr"?"sipariş":"orders"}`,icon:"bag",path:"/account/orders"},{id:"favorites",title:t.favorites,desc:`${ee.all().length} ${e==="tr"?"ürün":"items"}`,icon:"heart",path:"/favorites"},{id:"tracking",title:t.tracking,desc:`${Be.filter(r=>r.status==="shipped").length} ${e==="tr"?"aktif sipariş":"active order"}`,icon:"truck",path:"/tracking"},{id:"stock",title:t.stock,desc:`${De.all().length} ${e==="tr"?"ürün":"items"}`,icon:"message",path:"/account/stock-alerts"},{id:"messages",title:t.messages,desc:`${kt.filter(r=>!r.isRead).length} ${e==="tr"?"okunmamış":"unread"}`,icon:"message",path:"/account/messages"},{id:"profile",title:t.profile,desc:e==="tr"?"Hesap bilgilerini yönet":"Manage account details",icon:"user",path:"/account/profile"}]},W=(e,t,r)=>`<div class="account-subhead">
<a href="/account" data-account-route="/account">← ${B[t].back}
</a>
<h1>
${e}
</h1>
</div>
${r}`,je=(e,t,r,a)=>`<span class="sale-price-pair">
${e.originalPrice&&e.originalPrice>e.price?`<s>
${H(e.originalPrice*t,a,r)}
</s>`:""}
<strong>
${H(e.price*t,a,r)}
</strong>
</span>`,Ie=(e,t,r)=>{const a=e.reduce((i,{line:c,product:n})=>i+((n==null?void 0:n.price)??0)*c.quantity,0),s=e.reduce((i,{line:c,product:n})=>i+((n==null?void 0:n.originalPrice)??(n==null?void 0:n.price)??0)*c.quantity,0);return`<span class="sale-price-pair total-price-pair">
${s>a?`<s>
${H(s,r,t)}
</s>`:""}
<strong>
${H(a,r,t)}
</strong>
</span>`},Ir=e=>W(B[e].addresses,e,`<div class="address-grid">
${X.all().map(t=>`<article class="address-card">
<div>
<h2>
${t.title}
</h2>
${t.isDefault?`<span>
${e==="tr"?"VARSAYILAN":"DEFAULT"}
</span>`:""}
</div>
<p>
${t.firstName} ${t.lastName}
<br>
${t.addressLine}
<br>
${t.district} / ${t.city}
<br>
${t.phone}
</p>
<footer>
<button data-edit-address="${t.id}">
${e==="tr"?"Düzenle":"Edit"}
</button>
${t.isDefault?"":`<button data-default-address="${t.id}">
${e==="tr"?"Varsayılan Yap":"Make Default"}
</button>`}
<button data-delete-address="${t.id}">
${e==="tr"?"Sil":"Delete"}
</button>
</footer>
</article>`).join("")}
<button class="new-address-trigger">+<span>
${e==="tr"?"Yeni Adres Ekle":"Add New Address"}
</span>
</button>
</div>
<form class="address-form" hidden>
<input type="hidden" name="id">
<h2>
${e==="tr"?"Yeni Adres":"New Address"}
</h2>
<div>
<label>
${e==="tr"?"Başlık":"Title"}
<input name="title" required>
</label>
<label>
${e==="tr"?"Şehir":"City"}
<input name="city" required>
</label>
<label>
${e==="tr"?"İlçe":"District"}
<input name="district" required>
</label>
<label>
${e==="tr"?"Telefon":"Phone"}
<input name="phone" required>
</label>
<label class="wide">
${e==="tr"?"Adres":"Address"}
<textarea name="address" required>
</textarea>
</label>
</div>
<button>
${e==="tr"?"ADRESİ KAYDET":"SAVE ADDRESS"}
</button>
</form>`),xr=(e,t)=>W(B[e].orders,e,`<div class="account-list">
${Be.map(r=>`<article class="order-row">
<div>
<small>
${e==="tr"?"SİPARİŞ":"ORDER"}
</small>
<h2>#${r.orderNumber}
</h2>
<p>
${new Intl.DateTimeFormat(e==="tr"?"tr-TR":"en-US").format(new Date(r.date))}
</p>
</div>
<div>
<span class="status-${r.status}">
${r.status==="delivered"?e==="tr"?"Teslim Edildi":"Delivered":e==="tr"?"Kargoda":"Shipped"}
</span>
<p>
${r.itemCount} ${e==="tr"?"ürün":"items"}
</p>
<strong>
${H(r.total,t,e)}
</strong>
</div>
<button data-demo-action>
${e==="tr"?"DETAYLAR":"DETAILS"} →</button>
</article>`).join("")}
</div>`),Yr=(e,t)=>{const r=I.filter(a=>ee.has(a.id));return W(B[e].favorites,e,r.length?`<div class="favorite-product-grid">
${r.map(a=>`<article class="favorite-product-card">
<a class="favorite-product-image ${a.images[0].includes("aurea-products")?"is-sprite":""}" href="/product/${a.slug}" data-product-route="${a.slug}" aria-label="${a.name[e]}">
<img src="${a.images[0]}" alt="${a.name[e]}" loading="lazy" style="transform-origin:${a.imagePosition}">
</a>
<div class="favorite-product-info">
<p>
${a.brand}
</p>
<a href="/product/${a.slug}" data-product-route="${a.slug}">
<h2>
${a.name[e]}
</h2>
</a>
<div>
${je(a,1,e,t)}${a.stock>0?`<span>
${e==="tr"?"Stokta":"In stock"}
</span>`:`<span>
${e==="tr"?"Stokta yok":"Out of stock"}
</span>`}
</div>
<button type="button" data-remove-favorite="${a.id}">
${e==="tr"?"FAVORİLERDEN ÇIKAR":"REMOVE FROM FAVORITES"}
</button>
</div>
</article>`).join("")}
</div>`:`<div class="account-empty">
<h2>
${e==="tr"?"Henüz favori ürününüz bulunmuyor.":"You have no favorite products yet."}
</h2>
<a href="/category/all" data-category-route="all">
${e==="tr"?"ÜRÜNLERİ KEŞFET":"EXPLORE PRODUCTS"}
</a>
</div>`)},Fr=(e,t)=>{const r=O.all().map((a,s)=>({line:a,index:s,product:I.find(i=>i.id===a.productId)})).filter(a=>a.product);return r.length?W(B[e].cart,e,`<div class="cart-layout">
<section class="cart-lines" aria-label="${e==="tr"?"Sepetteki ürünler":"Cart items"}">
${r.map(({line:a,index:s,product:i})=>`<article class="cart-line">
<a class="cart-line-image ${i.images[0].includes("aurea-products")?"is-sprite":""}" href="/product/${i.slug}" data-product-route="${i.slug}">
<img src="${i.images[0]}" alt="${i.name[e]}" style="transform-origin:${i.imagePosition}">
</a>
<div class="cart-line-info">
<p>
${i.brand}
</p>
<a href="/product/${i.slug}" data-product-route="${i.slug}">
<h2>
${i.name[e]}
</h2>
</a>
<dl>
${a.color?`<div>
<dt>
${e==="tr"?"Renk":"Color"}
</dt>
<dd>
${a.color}
</dd>
</div>`:""}${a.size?`<div>
<dt>
${e==="tr"?"Beden":"Size"}
</dt>
<dd>
${a.size}
</dd>
</div>`:""}
</dl>
<div class="cart-line-actions">
<div class="cart-quantity">
<button data-cart-minus="${s}" aria-label="${e==="tr"?"Adedi azalt":"Decrease quantity"}">−</button>
<span>
${a.quantity}
</span>
<button data-cart-plus="${s}" aria-label="${e==="tr"?"Adedi artır":"Increase quantity"}">+</button>
</div>
<button class="cart-remove" data-cart-remove="${s}">
${e==="tr"?"KALDIR":"REMOVE"}
</button>
</div>
</div>
${je(i,a.quantity,e,t)}
</article>`).join("")}
</section>
<aside class="cart-summary">
<h2>
${e==="tr"?"Sipariş Özeti":"Order Summary"}
</h2>
<div>
<span>
${e==="tr"?"Ara Toplam":"Subtotal"}
</span>
${Ie(r,e,t)}
</div>
<div>
<span>
${e==="tr"?"Kargo":"Shipping"}
</span>
<strong>
${e==="tr"?"Ücretsiz":"Free"}
</strong>
</div>
<footer>
<span>
${e==="tr"?"Toplam":"Total"}
</span>
${Ie(r,e,t)}
</footer>
<a class="checkout-link" href="/checkout" data-account-route="/checkout">
${e==="tr"?"ÖDEMEYE GEÇ":"PROCEED TO CHECKOUT"}
</a>
</aside>
</div>`):W(B[e].cart,e,`<div class="account-empty">
<h2>
${e==="tr"?"Sepetiniz şu anda boş.":"Your cart is currently empty."}
</h2>
<a href="/category/all" data-category-route="all">
${e==="tr"?"ALIŞVERİŞE BAŞLA":"START SHOPPING"}
</a>
</div>`)},jr=(e,t)=>{const r=X.all().find(i=>i.isDefault)??X.all()[0],a=ne.get(),s=O.all().map(i=>({line:i,product:I.find(c=>c.id===i.productId)})).filter(i=>i.product);return s.length?`<div class="checkout-head">
<a href="/cart" data-account-route="/cart">← ${e==="tr"?"Sepete Dön":"Back to Cart"}
</a>
<p class="eyebrow">STORE CHECKOUT</p>
<h1>
${e==="tr"?"Ödeme":"Checkout"}
</h1>
</div>
<form class="checkout-form">
<div class="checkout-fields">
<section>
<h2>1. ${e==="tr"?"Teslimat Bilgileri":"Delivery Details"}
</h2>
<div class="checkout-grid">
<label>
${e==="tr"?"Ad":"First Name"}
<input name="firstName" value="${a.firstName}" required autocomplete="given-name">
</label>
<label>
${e==="tr"?"Soyad":"Last Name"}
<input name="lastName" value="${a.lastName}" required autocomplete="family-name">
</label>
<label>
${e==="tr"?"E-posta":"Email"}
<input name="email" type="email" value="${a.email}" required autocomplete="email">
</label>
<label>
${e==="tr"?"Telefon":"Phone"}
<input name="phone" value="${a.phone??""}" required autocomplete="tel">
</label>
<label class="wide">
${e==="tr"?"Adres":"Address"}
<textarea name="address" required autocomplete="street-address">
${(r==null?void 0:r.addressLine)??""}
</textarea>
</label>
<label>
${e==="tr"?"İlçe":"District"}
<input name="district" value="${(r==null?void 0:r.district)??""}" required>
</label>
<label>
${e==="tr"?"Şehir":"City"}
<input name="city" value="${(r==null?void 0:r.city)??""}" required autocomplete="address-level1">
</label>
</div>
</section>
<section>
<h2>2. ${e==="tr"?"Ödeme Yöntemi":"Payment Method"}
</h2>
<div class="payment-options">
<label>
<input type="radio" name="payment" value="door" checked>
<span>
<strong>
${e==="tr"?"Kapıda Ödeme":"Cash on Delivery"}
</strong>
<small>
${e==="tr"?"Siparişinizi teslim alırken ödeyin.":"Pay when your order is delivered."}
</small>
</span>
</label>
<label>
<input type="radio" name="payment" value="card">
<span>
<strong>
${e==="tr"?"Online Kredi/Banka Kartı":"Online Credit/Debit Card"}
</strong>
<small>Visa · Mastercard · Troy</small>
</span>
</label>
</div>
<div class="card-fields" hidden>
<label>
${e==="tr"?"Kart Üzerindeki İsim":"Name on Card"}
<input name="cardName" autocomplete="cc-name">
</label>
<label>
${e==="tr"?"Kart Numarası":"Card Number"}
<input name="cardNumber" inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000" autocomplete="cc-number">
</label>
<div>
<label>
${e==="tr"?"Son Kullanma Tarihi":"Expiry Date"}
<input name="expiry" inputmode="numeric" maxlength="5" placeholder="AA/YY" autocomplete="cc-exp">
</label>
<label>CVV<input name="cvv" inputmode="numeric" maxlength="3" placeholder="000" autocomplete="cc-csc">
</label>
</div>
</div>
</section>
</div>
<aside class="checkout-summary">
<h2>
${e==="tr"?"Sipariş Özeti":"Order Summary"}
</h2>
${s.map(({line:i,product:c})=>`<div class="checkout-item">
<span>
${c.name[e]}
<small>
${[i.color,i.size].filter(Boolean).join(" · ")} × ${i.quantity}
</small>
</span>
${je(c,i.quantity,e,t)}
</div>`).join("")}
<div class="checkout-total">
<span>
${e==="tr"?"Toplam":"Total"}
</span>
${Ie(s,e,t)}
</div>
<button type="submit">
${e==="tr"?"SİPARİŞİ TAMAMLA":"COMPLETE ORDER"}
</button>
</aside>
</form>
<div class="checkout-success" hidden>
<span>✓</span>
<h2>
${e==="tr"?"Siparişiniz Alındı":"Order Confirmed"}
</h2>
<p>
${e==="tr"?"Siparişiniz başarıyla oluşturuldu.":"Your order has been created successfully."}
</p>
<a href="/" data-home-route>
${e==="tr"?"ANA SAYFAYA DÖN":"RETURN HOME"}
</a>
</div>`:W(e==="tr"?"Ödeme":"Checkout",e,`<div class="account-empty">
<h2>
${e==="tr"?"Ödeme için sepetinize ürün ekleyin.":"Add products to your cart before checkout."}
</h2>
<a href="/category/all" data-category-route="all">
${e==="tr"?"ÜRÜNLERİ KEŞFET":"EXPLORE PRODUCTS"}
</a>
</div>`)},Ur=e=>{const t=De.all().map(r=>({w:r,p:I.find(a=>a.id===r.productId)})).filter(r=>r.p);return W(B[e].stock,e,t.length?`<div class="account-product-list">
${t.map(({w:r,p:a})=>`<div>
<span>
<strong>
${a.brand}
</strong>
${a.name[e]}
<small>
${a.stock>0?e==="tr"?"Stokta":"In stock":e==="tr"?"Stok bekleniyor":"Awaiting stock"}
</small>
</span>
<button data-remove-stock="${r.productId}">
${e==="tr"?"TAKİBİ BIRAK":"STOP TRACKING"}
</button>
</div>`).join("")}
</div>`:`<div class="account-empty">
<h2>
${e==="tr"?"Takip ettiğiniz stok bulunmuyor.":"You have no stock alerts."}
</h2>
<a href="/category/all" data-category-route="all">
${e==="tr"?"ÜRÜNLERİ KEŞFET":"EXPLORE PRODUCTS"}
</a>
</div>`)},Gr=e=>W(B[e].messages,e,`<div class="account-list">
${kt.map(t=>`<article class="message-row ${t.isRead?"":"is-unread"}">
<small>
${new Intl.DateTimeFormat(e==="tr"?"tr-TR":"en-US").format(new Date(t.createdAt))}
</small>
<h2>
${t.subject[e]}
</h2>
<p>
${t.preview[e]}
</p>
${t.isRead?"":`<span>
${e==="tr"?"OKUNMAMIŞ":"UNREAD"}
</span>`}
</article>`).join("")}
</div>`),Hr=e=>{const t=ne.get();return W(B[e].profile,e,`<form class="profile-form">
<div>
<label>
${e==="tr"?"Ad":"First Name"}
<input name="firstName" required value="${t.firstName}">
</label>
<label>
${e==="tr"?"Soyad":"Last Name"}
<input name="lastName" required value="${t.lastName}">
</label>
<label>
${e==="tr"?"E-posta":"Email"}
<input name="email" type="email" required value="${t.email}">
</label>
<label>
${e==="tr"?"Telefon":"Phone"}
<input name="phone" value="${t.phone??""}">
</label>
<label>
${e==="tr"?"Doğum Tarihi":"Birth Date"}
<input name="birthDate" type="date" value="${t.birthDate??""}">
</label>
</div>
<button>
${e==="tr"?"BİLGİLERİ KAYDET":"SAVE CHANGES"}
</button>
</form>`)},Wr=e=>W(B[e].tracking,e,`<div class="tracking-box">
<form>
<label>
${e==="tr"?"Sipariş veya takip numarası":"Order or tracking number"}
<input value="TRK10318" required>
</label>
<button>
${e==="tr"?"SORGULA":"TRACK"}
</button>
</form>
<ol>
<li class="done">
${e==="tr"?"Sipariş Alındı":"Order Received"}
</li>
<li class="done">
${e==="tr"?"Hazırlanıyor":"Preparing"}
</li>
<li class="done">
${e==="tr"?"Kargoya Verildi":"Shipped"}
</li>
<li>
${e==="tr"?"Dağıtımda":"Out for Delivery"}
</li>
<li>
${e==="tr"?"Teslim Edildi":"Delivered"}
</li>
</ol>
</div>`),Vr=(e,t)=>{var i;const r=ne.get();let a="";const s=Nr();if(s==="/account"){const c=B[e];a=`<header class="account-hero">
<p class="eyebrow">STORE MEMBERS</p>
<h1>
${c.title}
</h1>
<h2>
${c.hello}, ${r.firstName}
</h2>
<p>
${c.intro}
</p>
</header>
<section class="account-grid">
${Br(e).map(n=>`<a href="${n.path}" data-account-route="${n.path}" class="account-card">
<span>
${w(n.icon,27)}
</span>
<div>
<h2>
${n.title}
</h2>
<p>
${n.desc}
</p>
</div>
<i>→</i>
</a>`).join("")}
</section>
<button class="signout-btn">
${c.signout}
</button>`}else{const c={"/account/addresses":()=>Ir(e),"/account/orders":()=>xr(e,t),"/favorites":()=>Yr(e,t),"/account/stock-alerts":()=>Ur(e),"/account/messages":()=>Gr(e),"/account/profile":()=>Hr(e),"/tracking":()=>Wr(e),"/cart":()=>Fr(e,t),"/checkout":()=>jr(e,t)};a=((i=c[s])==null?void 0:i.call(c))??a}return`${Ee("",e)}
<main class="account-page">
${a}
</main>`},Jr=(e,t,r,a)=>{var s,i,c,n,u;document.querySelectorAll("[data-account-route]").forEach(m=>m.addEventListener("click",v=>{v.preventDefault(),v.stopImmediatePropagation(),a(m.dataset.accountRoute)})),(s=document.querySelector(".signout-btn"))==null||s.addEventListener("click",()=>r(e==="tr"?"Oturumunuz açık bırakıldı.":"Your session remains active.")),(i=document.querySelector(".new-address-trigger"))==null||i.addEventListener("click",()=>{const m=document.querySelector(".address-form");m&&(m.hidden=!1)}),(c=document.querySelector(".address-form"))==null||c.addEventListener("submit",m=>{m.preventDefault();const v=new FormData(m.currentTarget);X.add({id:`address-${Date.now()}`,title:String(v.get("title")),firstName:ne.get().firstName,lastName:ne.get().lastName,phone:String(v.get("phone")),addressLine:String(v.get("address")),city:String(v.get("city")),district:String(v.get("district")),country:"Türkiye",isDefault:!1}),r(e==="tr"?"Adresiniz kaydedildi.":"Address saved."),t()}),document.querySelectorAll("[data-delete-address]").forEach(m=>m.addEventListener("click",()=>{X.remove(m.dataset.deleteAddress),t()})),document.querySelectorAll("[data-default-address]").forEach(m=>m.addEventListener("click",()=>{X.makeDefault(m.dataset.defaultAddress),t()})),document.querySelectorAll("[data-remove-favorite]").forEach(m=>m.addEventListener("click",v=>{v.preventDefault(),v.stopImmediatePropagation(),ee.remove(m.dataset.removeFavorite),t()})),document.querySelectorAll("[data-remove-stock]").forEach(m=>m.addEventListener("click",()=>{De.remove(m.dataset.removeStock),t()})),(n=document.querySelector(".profile-form"))==null||n.addEventListener("submit",m=>{m.preventDefault();const v=new FormData(m.currentTarget);ne.save({id:"store-user",firstName:String(v.get("firstName")),lastName:String(v.get("lastName")),email:String(v.get("email")),phone:String(v.get("phone")),birthDate:String(v.get("birthDate"))}),r(e==="tr"?"Bilgileriniz kaydedildi.":"Your information was saved.")}),(u=document.querySelector(".tracking-box form"))==null||u.addEventListener("submit",m=>{m.preventDefault(),r(e==="tr"?"Sipariş durumu güncellendi.":"Order status updated.")}),document.querySelectorAll("[data-demo-action]").forEach(m=>m.addEventListener("click",()=>r(e==="tr"?"Sipariş detayları görüntüleniyor.":"Order details are displayed.")))},Zr=()=>{document.querySelectorAll(".catalog-gallery").forEach(e=>{const t=e.closest(".catalog-card"),r=[...(t==null?void 0:t.querySelectorAll(".catalog-gallery-dot"))??[]],a=[...(t==null?void 0:t.querySelectorAll(".catalog-gallery-arrow"))??[]];if(!r.length)return;let s=0;const i=c=>{s=Math.max(0,Math.min(r.length-1,c)),r.forEach((n,u)=>{const m=u===s;n.classList.toggle("is-active",m)}),a.forEach(n=>{const u=Number(n.dataset.galleryDirection);n.disabled=u<0&&s===0||u>0&&s===r.length-1}),e.scrollTo({left:e.clientWidth*s,behavior:"smooth"})};a.forEach(c=>c.addEventListener("click",()=>i(s+Number(c.dataset.galleryDirection))))})},gt=document.querySelector("#app");if(!gt)throw new Error("Application root was not found.");let S=P.get("aurea-language","tr",["tr","en"]),re=P.get("aurea-currency","TRY",["TRY","USD","EUR"]),Me=0,Oe=0,Qe=()=>{};const N=()=>{var n,u,m,v;document.documentElement.lang=S,document.body.classList.remove("menu-open","mega-menu-open"),O.prune(new Set(I.map(b=>b.id)));const e=location.pathname.startsWith("/category/"),t=location.pathname==="/compare",r=location.pathname.startsWith("/product/"),a=location.pathname.startsWith("/account")||["/cart","/checkout","/favorites","/tracking"].includes(location.pathname);r||(document.title="STORE | Modern Essentials");const s=e?br(S,re):t?fr(S,re):r?Tr(S,re):a?Vr(S,re):`<main>
${Ht(S)}${Wt(S)}
</main>`;document.body.classList.toggle("home-view",location.pathname==="/"),document.body.classList.toggle("catalog-view",e||t||r||a),document.body.classList.toggle("product-view",r),document.body.classList.toggle("account-view",a);const i=location.pathname.split("/").filter(Boolean),c=i[0]==="category"?i[1]??null:null;if(gt.innerHTML=`${Rt(S,re,O.count())}${Gt(S,re)}${s}${Mr(S)}${Vt(S)}${Jt()}`,document.querySelectorAll("[data-mega-trigger]").forEach(b=>{const g=c!==null&&b.dataset.categorySlug===c;b.classList.toggle("is-active",g),g?b.setAttribute("aria-current","page"):b.removeAttribute("aria-current")}),_r(),Zr(),Xr(),e&&$r(S,N,_,U),r&&qr(S,N,_,U),a){Jr(S,N,_,U),document.querySelectorAll("[data-cart-minus]").forEach(p=>p.addEventListener("click",()=>{const y=Number(p.dataset.cartMinus),A=O.all()[y];A&&(O.setQuantity(y,A.quantity-1),N())})),document.querySelectorAll("[data-cart-plus]").forEach(p=>p.addEventListener("click",()=>{const y=Number(p.dataset.cartPlus),A=O.all()[y];A&&(O.setQuantity(y,A.quantity+1),N())})),document.querySelectorAll("[data-cart-remove]").forEach(p=>p.addEventListener("click",()=>{O.remove(Number(p.dataset.cartRemove)),N()}));const b=document.querySelectorAll('input[name="payment"]'),g=document.querySelector(".card-fields"),$=()=>{var y;const p=((y=document.querySelector('input[name="payment"]:checked'))==null?void 0:y.value)==="card";g&&(g.hidden=!p,g.querySelectorAll("input").forEach(A=>A.required=p))};b.forEach(p=>p.addEventListener("change",$)),$(),(n=document.querySelector('input[name="cardNumber"]'))==null||n.addEventListener("input",p=>{const y=p.currentTarget;y.value=y.value.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim()}),(u=document.querySelector('input[name="expiry"]'))==null||u.addEventListener("input",p=>{const y=p.currentTarget,A=y.value.replace(/\D/g,"").slice(0,4);y.value=A.length>2?`${A.slice(0,2)}/${A.slice(2)}`:A}),(m=document.querySelector(".checkout-form"))==null||m.addEventListener("submit",p=>{p.preventDefault();const y=p.currentTarget;if(!y.reportValidity())return;y.hidden=!0;const A=document.querySelector(".checkout-success");A&&(A.hidden=!1),scrollTo({top:0,behavior:"smooth"})})}if(a){const b=document.querySelector(".address-form");document.querySelectorAll("[data-edit-address]").forEach(g=>g.addEventListener("click",()=>{const $=X.all().find(p=>p.id===g.dataset.editAddress);!$||!b||(b.hidden=!1,b.elements.namedItem("id").value=$.id,b.elements.namedItem("title").value=$.title,b.elements.namedItem("city").value=$.city,b.elements.namedItem("district").value=$.district,b.elements.namedItem("phone").value=$.phone,b.elements.namedItem("address").value=$.addressLine,b.querySelector("h2").textContent=S==="tr"?"Adresi Düzenle":"Edit Address",b.querySelector(":scope>button").textContent=S==="tr"?"DEĞİŞİKLİKLERİ KAYDET":"SAVE CHANGES",b.scrollIntoView({behavior:"smooth",block:"start"}))})),(v=document.querySelector(".new-address-trigger"))==null||v.addEventListener("click",()=>{b&&(b.reset(),b.elements.namedItem("id").value="",b.querySelector("h2").textContent=S==="tr"?"Yeni Adres":"New Address",b.querySelector(":scope>button").textContent=S==="tr"?"ADRESİ KAYDET":"SAVE ADDRESS")}),b==null||b.addEventListener("submit",g=>{const $=g.currentTarget,p=$.elements.namedItem("id").value;if(!p)return;g.preventDefault(),g.stopImmediatePropagation();const y=new FormData($),A=ne.get();X.add({id:p,title:String(y.get("title")),firstName:A.firstName,lastName:A.lastName,phone:String(y.get("phone")),addressLine:String(y.get("address")),city:String(y.get("city")),district:String(y.get("district")),country:"Türkiye",isDefault:!1}),_(S==="tr"?"Adresiniz güncellendi.":"Address updated."),N()},{capture:!0})}},U=e=>{history.pushState({},"",e),e.startsWith("/category/")&&vr(),e.startsWith("/product/")&&ft(),N(),scrollTo({top:0,behavior:"smooth"})},_=e=>{const t=document.querySelector("#toast");t&&(t.textContent=e??(S==="tr"?"Bu bölüm yakında eklenecek.":"This section is coming soon."),t.classList.add("is-visible"),window.setTimeout(()=>t.classList.remove("is-visible"),2600))},V=e=>{var i;const t=document.querySelector("#sidebar"),r=document.querySelector("#sidebar-overlay"),a=document.querySelector("#menu-trigger");if(!t||!r||!a)return;const s=matchMedia("(max-width: 767px)").matches;t.classList.toggle("is-open",e),r.classList.toggle("is-open",e),t.setAttribute("aria-hidden",String(!e)),a.setAttribute("aria-expanded",String(e)),document.body.classList.toggle("menu-open",e),e&&s&&((i=t.querySelector("button"))==null||i.focus())},fe=e=>{const t=document.querySelector("#mobile-search");t&&(t.classList.toggle("is-open",e),e&&window.setTimeout(()=>{var r;return(r=t.querySelector("input"))==null?void 0:r.focus()},120))},Te=e=>{var a;const t=document.querySelector(".support-panel"),r=document.querySelector(".sidebar-support-trigger");!t||!r||(t.classList.toggle("is-open",e),t.setAttribute("aria-hidden",String(!e)),r.setAttribute("aria-expanded",String(e)),e&&((a=t.querySelector("input"))==null||a.focus()))},wt=(e,t=[])=>e.flatMap(r=>{const a=[...t,r.slug];return[{node:r,route:a.join("/")},...wt(r.children??[],a)]}),et=e=>{const t=e.closest(".search-shell"),r=t==null?void 0:t.querySelector(".search-results"),a=t==null?void 0:t.querySelector(".search-clear");if(!r)return;const s=e.value.trim(),i=s.toLocaleLowerCase(S==="tr"?"tr-TR":"en-US");if(a==null||a.classList.toggle("is-visible",!!s),!i){r.classList.remove("is-open"),r.innerHTML="";return}const c=I.filter(u=>`${u.name[S]} ${u.brand} ${u.categoryId}`.toLocaleLowerCase(S==="tr"?"tr-TR":"en-US").includes(i)).slice(0,5),n=wt(Q).filter(({node:u})=>u.name[S].toLocaleLowerCase(S==="tr"?"tr-TR":"en-US").includes(i)).slice(0,5);r.innerHTML=c.length||n.length?`${c.length?`<p class="result-label">
${S==="tr"?"ÜRÜNLER":"PRODUCTS"}
</p>
${c.map(u=>`<a href="/product/${u.slug}" data-search-product="${u.slug}">
<span>
${u.name[S]}
<small>
${u.brand}
</small>
</span>
<span>→</span>
</a>`).join("")}`:""}${n.length?`<p class="result-label">
${S==="tr"?"KATEGORİLER":"CATEGORIES"}
</p>
<div class="category-results">
${n.map(({node:u,route:m})=>`<a href="/category/${m}" data-search-category="${m}">
${u.name[S]}
</a>`).join("")}
</div>`:""}`:`<div class="empty-result">
${S==="tr"?"Aramanızla eşleşen sonuç bulunamadı.":"No results matched your search."}
</div>`,r.classList.add("is-open"),r.querySelectorAll("[data-search-product]").forEach(u=>u.addEventListener("click",m=>{m.button!==0||m.metaKey||m.ctrlKey||m.shiftKey||m.altKey||(m.preventDefault(),fe(!1),U(`/product/${u.dataset.searchProduct}`))})),r.querySelectorAll("[data-search-category]").forEach(u=>u.addEventListener("click",m=>{m.button!==0||m.metaKey||m.ctrlKey||m.shiftKey||m.altKey||(m.preventDefault(),fe(!1),U(`/category/${u.dataset.searchCategory}`))}))};function _r(){var A,K,M,d,E,R,D,x,te,f,L,q,Y,pe,he;Qe(),Qe=Qr();const e=document.querySelector(".site-header"),t=document.querySelector(".category-nav"),r=document.querySelector(".back-to-top"),a=()=>{var k;const l=Math.max(scrollY,0),h=l>Oe;if(h&&((k=document.querySelector(".mega-overlay.is-open"))==null||k.click()),e==null||e.classList.toggle("is-scrolled",l>24),r==null||r.classList.toggle("is-scroll-visible",l>20),t){const z=h&&l>140&&!document.body.classList.contains("menu-open");e==null||e.classList.toggle("scroll-hidden",z),t.classList.toggle("scroll-hidden",z)}else e==null||e.classList.remove("scroll-hidden");Oe=l};Oe=Math.max(scrollY,0),a(),window.onscroll=a;const s=document.querySelector("#menu-trigger");s==null||s.addEventListener("click",()=>V(s.getAttribute("aria-expanded")!=="true")),s==null||s.addEventListener("mouseenter",()=>{matchMedia("(hover: hover) and (min-width: 768px)").matches&&(clearTimeout(Me),V(!0))});const i=document.querySelector("#sidebar");i==null||i.addEventListener("mouseenter",()=>clearTimeout(Me)),[s,i].forEach(l=>l==null?void 0:l.addEventListener("mouseleave",()=>{matchMedia("(hover: hover) and (min-width: 768px)").matches&&(Me=window.setTimeout(()=>V(!1),300))})),document.querySelectorAll(".sidebar-category-toggle").forEach(l=>l.addEventListener("click",()=>{var k;const h=l.getAttribute("aria-expanded")==="true";l.setAttribute("aria-expanded",String(!h)),(k=l.parentElement)==null||k.classList.toggle("is-open",!h)}));let c=0,n=null,u=null;const m=(l=!1)=>{var h;clearTimeout(c),n==null||n.classList.remove("is-open"),n==null||n.setAttribute("aria-hidden","true"),u==null||u.setAttribute("aria-expanded","false"),l&&(u==null||u.focus()),(h=document.querySelector(".mega-overlay"))==null||h.classList.remove("is-open"),document.body.classList.remove("mega-menu-open"),n=null,u=null},v=()=>{clearTimeout(c),c=window.setTimeout(()=>{!(n!=null&&n.contains(document.activeElement))&&!(u!=null&&u.contains(document.activeElement))&&m()},700)},b=()=>clearTimeout(c);document.querySelectorAll("[data-mega-trigger]").forEach(l=>{l.addEventListener("click",()=>{var z;const h=document.querySelector(`[data-mega-panel="${l.dataset.megaTrigger}"]`),k=l.getAttribute("aria-expanded")==="true";m(),!k&&h&&(n=h,u=l,l.setAttribute("aria-expanded","true"),h.classList.add("is-open"),h.setAttribute("aria-hidden","false"),(z=document.querySelector(".mega-overlay"))==null||z.classList.add("is-open"),document.body.classList.add("mega-menu-open"))}),l.addEventListener("pointerenter",b),l.addEventListener("pointerleave",v)}),document.querySelectorAll("[data-mega-panel]").forEach(l=>{l.addEventListener("pointerenter",b),l.addEventListener("pointerleave",v)});const g=document.querySelector(".category-nav");(A=document.querySelector(".mega-overlay"))==null||A.addEventListener("click",()=>m()),(K=document.querySelector(".sidebar-close"))==null||K.addEventListener("click",()=>V(!1)),(M=document.querySelector("#sidebar-overlay"))==null||M.addEventListener("click",()=>V(!1)),(d=document.querySelector(".mobile-search-trigger"))==null||d.addEventListener("click",()=>fe(!0)),(E=document.querySelector(".mobile-search-close"))==null||E.addEventListener("click",()=>fe(!1)),document.querySelectorAll(".search-shell input").forEach(l=>l.addEventListener("input",()=>et(l))),document.querySelectorAll(".search-clear").forEach(l=>l.addEventListener("click",()=>{var k;const h=(k=l.parentElement)==null?void 0:k.querySelector("input");h&&(h.value="",et(h),h.focus())}));const $=document.querySelector(".notify-dialog");if(document.querySelectorAll(".notify-btn").forEach(l=>l.addEventListener("click",()=>{var k;const h=(k=l.closest("[data-product-id]"))==null?void 0:k.dataset.productId;h&&$&&($.dataset.productId=h)})),document.body.classList.contains("product-view")&&$){const l=I.find(h=>h.slug===location.pathname.split("/").at(-1));l&&($.dataset.productId=l.id)}(R=$==null?void 0:$.querySelector("form"))==null||R.addEventListener("submit",()=>{const l=$.dataset.productId;l&&De.add(l)}),document.querySelectorAll("#currency,#sidebar-currency").forEach(l=>l.addEventListener("change",h=>{re=h.target.value,P.set("aurea-currency",re),N()}));const p=()=>{S=S==="tr"?"en":"tr",P.set("aurea-language",S),N()};(D=document.querySelector(".language-toggle"))==null||D.addEventListener("click",p),(x=document.querySelector(".sidebar-lang"))==null||x.addEventListener("click",p),document.querySelectorAll(".route-btn,[data-route]").forEach(l=>l.addEventListener("click",h=>{l.tagName==="A"&&h.preventDefault(),V(!1);const k=l.dataset.route,z={women:"women",men:"men",kids:"kids",accessories:"accessories",sale:"sale"},j={account:"/account",cart:"/cart",favorites:"/favorites",tracking:"/tracking"};k&&z[k]?U(`/category/${z[k]}`):k&&j[k]?U(j[k]):_()})),document.querySelectorAll("[data-category-route]").forEach(l=>l.addEventListener("click",h=>{if(h.button!==0||h.metaKey||h.ctrlKey||h.shiftKey||h.altKey)return;const k=l.dataset.categoryRoute;k&&(h.preventDefault(),clearTimeout(c),m(),V(!1),U(`/category/${k}`))})),document.querySelectorAll("[data-home-route]").forEach(l=>l.addEventListener("click",h=>{h.preventDefault(),U("/")})),document.querySelectorAll("[data-product-route]").forEach(l=>l.addEventListener("click",h=>{h.preventDefault(),h.stopImmediatePropagation(),U(`/product/${l.dataset.productRoute}`)}));const y=document.querySelector(".sidebar-support-trigger");if(y==null||y.addEventListener("click",()=>{V(!1),Te(!0)}),(te=document.querySelector(".support-close"))==null||te.addEventListener("click",()=>Te(!1)),(f=document.querySelector(".support-form"))==null||f.addEventListener("submit",l=>{l.preventDefault(),_(S==="tr"?"Mesajınız alındı.":"Your message was received."),Te(!1)}),document.querySelectorAll("[data-footer-route]").forEach(l=>l.addEventListener("click",h=>{h.preventDefault(),_(S==="tr"?"Bu sayfa sonraki geliştirme aşamasında eklenecek.":"This page will be added in the next development phase.")})),document.querySelectorAll("[data-app-store]").forEach(l=>l.addEventListener("click",()=>{const h=l.dataset.appStore==="ios"?"ios":"android",k=Cr[h];k?location.assign(k):_(h==="ios"?S==="tr"?"Mobil uygulamamız yakında App Store’da.":"Our mobile app is coming soon to the App Store.":S==="tr"?"Mobil uygulamamız yakında Google Play’de.":"Our mobile app is coming soon to Google Play.")})),(L=document.querySelector(".back-to-top"))==null||L.addEventListener("click",()=>scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})),document.querySelectorAll(".footer-section-toggle").forEach(l=>l.addEventListener("click",()=>{var k;const h=l.getAttribute("aria-expanded")==="true";l.setAttribute("aria-expanded",String(!h)),l.querySelector("i").textContent=h?"+":"−",(k=l.parentElement)==null||k.classList.toggle("is-open",!h)})),document.body.classList.contains("product-view")){const l=document.querySelector(".notify-dialog");(q=document.querySelector(".notify-close"))==null||q.addEventListener("click",()=>l==null?void 0:l.close()),(Y=l==null?void 0:l.querySelector("form"))==null||Y.addEventListener("submit",j=>{j.preventDefault(),j.currentTarget.reportValidity()&&(l.close(),_(S==="tr"?"Talebiniz alındı. Ürün tekrar stoklara geldiğinde bilgilendirileceksiniz.":"Request received. We’ll notify you when it is back."))});let h=0;const k=["0% 0%","100% 0%","0% 100%","100% 100%"],z=j=>{h=(h+j+k.length)%k.length;const ye=document.querySelector(".image-viewer img");ye&&(ye.style.transformOrigin=k[h])};(pe=document.querySelector(".viewer-prev"))==null||pe.addEventListener("click",()=>z(-1)),(he=document.querySelector(".viewer-next"))==null||he.addEventListener("click",()=>z(1))}document.onclick=l=>{const h=l.target;document.querySelectorAll(".search-results.is-open").forEach(k=>{var z;(z=k.parentElement)!=null&&z.contains(h)||k.classList.remove("is-open")}),n&&!(g!=null&&g.contains(h))&&m()},document.onkeydown=l=>{var h,k,z,j;l.key==="Escape"&&(m(!0),V(!1),fe(!1),Te(!1),document.querySelectorAll(".search-results").forEach(ye=>ye.classList.remove("is-open")),(h=document.querySelector(".filter-close"))==null||h.click(),(k=document.querySelector(".notify-close"))==null||k.click(),(z=document.querySelector(".viewer-close"))==null||z.click(),(j=document.querySelector(".size-guide-close"))==null||j.click())}}function Xr(){if(matchMedia("(prefers-reduced-motion: reduce)").matches){document.querySelectorAll(".reveal").forEach(t=>t.classList.add("is-visible"));return}const e=new IntersectionObserver(t=>t.forEach(r=>{r.isIntersecting&&(r.target.classList.add("is-visible"),e.unobserve(r.target))}),{threshold:.12});document.querySelectorAll(".reveal").forEach(t=>e.observe(t))}function Qr(){if(!document.body.classList.contains("home-view"))return()=>{};const e=[...document.querySelectorAll("main > .hero, main > .campaign-section, main > .gender-campaign")],t=document.querySelector(".site-footer"),r=t?[...e,t]:e;if(e.length<2)return()=>{};let a=!1,s=null,i=!1,c=!1,n=0,u=0,m=0;const v=d=>d.getBoundingClientRect().top+scrollY,b=()=>{let d=0,E=Number.POSITIVE_INFINITY;return r.forEach((R,D)=>{const x=Math.abs(v(R)-scrollY);x<E&&(d=D,E=x)}),d},g=d=>{if(a||d<0||d>=r.length)return;const E=v(r[d]);Math.abs(E-scrollY)<2||(a=!0,window.scrollTo({top:E,behavior:"auto"}),a=!1,i=!1)},$=d=>{if(i)return!1;const R=b()+d;return R<0||R>=r.length?!1:(i=!0,g(R),!0)},p=d=>{if(d.ctrlKey||document.body.classList.contains("menu-open")||document.querySelector(".mega-menu.is-open")||Math.abs(d.deltaY)<1)return;d.preventDefault();const E=d.deltaMode===WheelEvent.DOM_DELTA_LINE,R=Math.abs(d.deltaY);if(E){!a&&!i&&$(d.deltaY>0?1:-1);return}const D=c&&m<=u*.45&&R>Math.max(m*1.7,4);window.clearTimeout(n),n=window.setTimeout(()=>{c=!1,u=0,m=0},50),D&&(c=!1,u=0),m=R,u=Math.max(u,R),!(a||i||c)&&(c=!0,$(d.deltaY>0?1:-1))},y=d=>{var E;document.body.classList.contains("menu-open")||document.querySelector(".mega-menu.is-open")||(s=((E=d.touches[0])==null?void 0:E.clientY)??null)},A=d=>{s!==null&&!document.body.classList.contains("menu-open")&&d.preventDefault()},K=d=>{var D;if(s===null||a)return;const E=((D=d.changedTouches[0])==null?void 0:D.clientY)??s,R=s-E;s=null,!(Math.abs(R)<24)&&$(R>0?1:-1)},M=d=>{const E=d.target;if(E!=null&&E.matches('input, textarea, select, button, [contenteditable="true"]'))return;const R=d.key==="ArrowDown"||d.key==="PageDown"||d.key===" "?1:d.key==="ArrowUp"||d.key==="PageUp"?-1:0;!R||a||(d.preventDefault(),$(R))};return addEventListener("wheel",p,{passive:!1}),addEventListener("touchstart",y,{passive:!0}),addEventListener("touchmove",A,{passive:!1}),addEventListener("touchend",K,{passive:!0}),addEventListener("keydown",M),()=>{removeEventListener("wheel",p),removeEventListener("touchstart",y),removeEventListener("touchmove",A),removeEventListener("touchend",K),removeEventListener("keydown",M),clearTimeout(n)}}N();addEventListener("popstate",()=>N());
