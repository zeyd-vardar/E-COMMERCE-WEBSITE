var wt=Object.defineProperty;var At=(e,t,r)=>t in e?wt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var je=(e,t,r)=>At(e,typeof t!="symbol"?t+"":t,r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();const Lt={menu:`<line x1="4" x2="20" y1="7" y2="7"/>
<line x1="4" x2="20" y1="12" y2="12"/>
<line x1="4" x2="20" y1="17" y2="17"/>`,search:`<circle cx="11" cy="11" r="7"/>
<path d="m20 20-4-4"/>`,x:'<path d="M18 6 6 18M6 6l12 12"/>',truck:`<path d="M10 17h4V5H2v12h3m9-8h4l4 4v4h-3"/>
<circle cx="7.5" cy="17.5" r="2.5"/>
<circle cx="16.5" cy="17.5" r="2.5"/>`,heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',bag:`<path d="M6 8h12l1 13H5L6 8Z"/>
<path d="M9 9V6a3 3 0 0 1 6 0v3"/>`,user:`<circle cx="12" cy="8" r="4"/>
<path d="M4 21a8 8 0 0 1 16 0"/>`,chevron:'<path d="m9 18 6-6-6-6"/>',message:'<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',send:`<path d="m22 2-7 20-4-9-9-4Z"/>
<path d="M22 2 11 13"/>`},A=(e,t=20)=>`<svg aria-hidden="true" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
${Lt[e]}
</svg>`,Tt=(e,t,r=0)=>`
<header class="site-header" id="site-header">
 <div class="header-inner">
  <button class="icon-btn menu-trigger" id="menu-trigger" aria-label="${e==="tr"?"Menüyü aç":"Open menu"}" aria-expanded="false" aria-controls="sidebar">
${A("menu",24)}
</button>
  <a class="brand brand-logo-link" href="/" data-home-route aria-label="${e==="tr"?"STORE ana sayfa":"STORE home page"}">
<img class="brand-logo" src="/store-logo.svg" alt="STORE">
</a>
  <div class="desktop-search search-shell" id="desktop-search">
<label class="sr-only" for="search-input">
${e==="tr"?"Ürün veya kategori ara":"Search products or categories"}
</label>
${A("search",18)}
<input id="search-input" type="search" autocomplete="off" placeholder="${e==="tr"?"Ürün veya kategori ara":"Search products or categories"}"/>
<button class="search-clear" type="button" aria-label="${e==="tr"?"Aramayı temizle":"Clear search"}">
${A("x",16)}
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
${A("truck")}
</button>
    <button class="icon-btn route-btn" data-route="favorites" data-tooltip="${e==="tr"?"Favoriler":"Favorites"}" aria-label="${e==="tr"?"Favoriler":"Favorites"}">
${A("heart")}
</button>
    <button class="icon-btn route-btn cart-header-btn" data-route="cart" data-tooltip="${e==="tr"?"Sepetim":"Cart"}" aria-label="${e==="tr"?"Sepetim":"Cart"}">
${A("bag")}
<span class="cart-count ${r?"is-visible":""}">
${r}
</span>
</button>
    <button class="icon-btn route-btn desktop-account" data-route="account" data-tooltip="${e==="tr"?"Hesabım":"Account"}" aria-label="${e==="tr"?"Hesabım":"Account"}">
${A("user")}
</button>
   </nav>
   <button class="icon-btn mobile-search-trigger" aria-label="${e==="tr"?"Aramayı aç":"Open search"}">
${A("search",21)}
</button>
  </div>
 </div>
 <div class="mobile-search-panel" id="mobile-search">
<div class="search-shell">
<label class="sr-only" for="mobile-search-input">
${e==="tr"?"Ürün veya kategori ara":"Search products or categories"}
</label>
${A("search",18)}
<input id="mobile-search-input" type="search" autocomplete="off" placeholder="${e==="tr"?"Ürün veya kategori ara":"Search products or categories"}"/>
<button class="mobile-search-close icon-btn" aria-label="${e==="tr"?"Aramayı kapat":"Close search"}">
${A("x")}
</button>
<div class="search-results" role="listbox">
</div>
</div>
</div>
</header>`,ge=(e,t,r)=>({id:e,label:{tr:t,en:r},href:`/${e}`}),Rt=[ge("about","Hakkımızda","About us"),ge("stores","Mağazalar","Stores"),ge("contact","İletişim","Contact"),ge("help","Yardım","Help")],et=(e,t)=>({tr:e,en:t}),qt=(e,t,r,a)=>({id:e,slug:t,name:et(r,a)}),R=(e,t,r,a,s)=>({id:e,slug:t,name:et(r,a),children:s}),o=(e,t,r,a)=>qt(`${e}-${t}`,t,r,a),Ct=[o("women-clothing","new-arrivals","Yeni Gelenler","New Arrivals"),o("women-clothing","dresses","Elbise","Dresses"),o("women-clothing","evening-dresses","Abiye","Evening Dresses"),o("women-clothing","tshirts","Tişört","T-Shirts"),o("women-clothing","blouses","Bluz","Blouses"),o("women-clothing","shirts","Gömlek","Shirts"),o("women-clothing","sweatshirts","Sweatshirt","Sweatshirts"),o("women-clothing","knitwear","Kazak & Triko","Knitwear"),o("women-clothing","trousers","Pantolon","Trousers"),o("women-clothing","jeans","Jean","Jeans"),o("women-clothing","skirts","Etek","Skirts"),o("women-clothing","shorts","Şort","Shorts"),o("women-clothing","leggings","Tayt","Leggings"),o("women-clothing","suits","Takım","Sets"),o("women-clothing","jackets","Ceket","Jackets"),o("women-clothing","blazers","Blazer","Blazers"),o("women-clothing","puffer-jackets","Mont","Puffer Jackets"),o("women-clothing","coats","Kaban","Coats"),o("women-clothing","trenchcoats","Trençkot","Trench Coats")],Dt=[o("women-shoes","sneakers","Spor Ayakkabı","Sneakers"),o("women-shoes","casual-shoes","Günlük Ayakkabı","Casual Shoes"),o("women-shoes","heels","Topuklu Ayakkabı","Heels"),o("women-shoes","flats","Babet","Flats"),o("women-shoes","loafers","Loafer","Loafers"),o("women-shoes","sandals","Sandalet","Sandals"),o("women-shoes","slippers","Terlik","Slippers"),o("women-shoes","boots","Bot","Boots"),o("women-shoes","tall-boots","Çizme","Tall Boots")],zt=[o("women-bags","shoulder-bags","Omuz Çantası","Shoulder Bags"),o("women-bags","handbags","El Çantası","Handbags"),o("women-bags","crossbody-bags","Çapraz Çanta","Crossbody Bags"),o("women-bags","backpacks","Sırt Çantası","Backpacks"),o("women-bags","clutches","Clutch","Clutches"),o("women-bags","wallets","Cüzdan","Wallets")],Pt=[o("women-accessories","watches","Saat","Watches"),o("women-accessories","jewelry","Takı","Jewelry"),o("women-accessories","eyewear","Gözlük","Eyewear"),o("women-accessories","belts","Kemer","Belts"),o("women-accessories","hats","Şapka & Bere","Hats"),o("women-accessories","scarves","Şal & Fular","Scarves"),o("women-accessories","hair-accessories","Saç Aksesuarları","Hair Accessories")],Mt=[o("men-clothing","new-arrivals","Yeni Gelenler","New Arrivals"),o("men-clothing","tshirts","Tişört","T-Shirts"),o("men-clothing","polo","Polo Yaka","Polo Shirts"),o("men-clothing","shirts","Gömlek","Shirts"),o("men-clothing","sweatshirts","Sweatshirt","Sweatshirts"),o("men-clothing","hoodies","Hoodie","Hoodies"),o("men-clothing","knitwear","Kazak & Triko","Knitwear"),o("men-clothing","trousers","Pantolon","Trousers"),o("men-clothing","jeans","Jean","Jeans"),o("men-clothing","shorts","Şort","Shorts"),o("men-clothing","tracksuits","Eşofman","Tracksuits"),o("men-clothing","suits","Takım Elbise","Suits"),o("men-clothing","jackets","Ceket","Jackets"),o("men-clothing","blazers","Blazer","Blazers"),o("men-clothing","puffer-jackets","Mont","Puffer Jackets"),o("men-clothing","coats","Kaban","Coats")],Ot=[o("men-shoes","sneakers","Spor Ayakkabı","Sneakers"),o("men-shoes","casual-shoes","Günlük Ayakkabı","Casual Shoes"),o("men-shoes","formal-shoes","Klasik Ayakkabı","Formal Shoes"),o("men-shoes","loafers","Loafer","Loafers"),o("men-shoes","boots","Bot","Boots"),o("men-shoes","sandals","Sandalet","Sandals"),o("men-shoes","slippers","Terlik","Slippers")],Kt=[o("men-bags","backpacks","Sırt Çantası","Backpacks"),o("men-bags","shoulder-bags","Omuz Çantası","Shoulder Bags"),o("men-bags","briefcases","Evrak Çantası","Briefcases"),o("men-bags","belt-bags","Bel Çantası","Belt Bags"),o("men-bags","wallets","Cüzdan","Wallets")],Nt=[o("men-accessories","watches","Saat","Watches"),o("men-accessories","eyewear","Gözlük","Eyewear"),o("men-accessories","belts","Kemer","Belts"),o("men-accessories","ties","Kravat","Ties"),o("men-accessories","bow-ties","Papyon","Bow Ties"),o("men-accessories","hats","Şapka & Bere","Hats"),o("men-accessories","jewelry","Takı","Jewelry")],Ue=(e,t=[])=>[o(e,"tshirts","Tişört","T-Shirts"),o(e,"sweatshirts","Sweatshirt","Sweatshirts"),o(e,"knitwear","Kazak","Knitwear"),o(e,"trousers","Pantolon","Trousers"),o(e,"jeans","Jean","Jeans"),o(e,"shorts","Şort","Shorts"),o(e,"leggings","Tayt","Leggings"),o(e,"coats","Mont & Kaban","Coats"),o(e,"pajamas","Pijama","Pajamas"),...t],Bt=[R("kids-girls","girls","Kız Çocuk","Girls",Ue("kids-girls",[o("kids-girls","dresses","Elbise","Dresses"),o("kids-girls","skirts","Etek","Skirts")])),R("kids-boys","boys","Erkek Çocuk","Boys",Ue("kids-boys",[o("kids-boys","shirts","Gömlek","Shirts")])),R("kids-baby-girls","baby-girls","Bebek Kız","Baby Girls",[o("kids-baby-girls","bodysuits","Body","Bodysuits"),o("kids-baby-girls","rompers","Tulum","Rompers"),o("kids-baby-girls","dresses","Elbise","Dresses"),o("kids-baby-girls","sets","Takımlar","Sets"),o("kids-baby-girls","pajamas","Pijama","Pajamas"),o("kids-baby-girls","coats","Mont","Coats")]),R("kids-baby-boys","baby-boys","Bebek Erkek","Baby Boys",[o("kids-baby-boys","bodysuits","Body","Bodysuits"),o("kids-baby-boys","rompers","Tulum","Rompers"),o("kids-baby-boys","tshirts","Tişört","T-Shirts"),o("kids-baby-boys","sets","Takımlar","Sets"),o("kids-baby-boys","pajamas","Pijama","Pajamas"),o("kids-baby-boys","coats","Mont","Coats")]),R("kids-shoes","shoes","Ayakkabı","Shoes",[o("kids-shoes","sneakers","Spor Ayakkabı","Sneakers"),o("kids-shoes","casual-shoes","Günlük Ayakkabı","Casual Shoes"),o("kids-shoes","sandals","Sandalet","Sandals"),o("kids-shoes","boots","Bot","Boots"),o("kids-shoes","slippers","Terlik","Slippers")]),R("kids-accessories","accessories","Aksesuar","Accessories",[o("kids-accessories","bags","Çanta","Bags"),o("kids-accessories","hats","Şapka & Bere","Hats"),o("kids-accessories","socks","Çorap","Socks"),o("kids-accessories","scarves","Atkı","Scarves"),o("kids-accessories","gloves","Eldiven","Gloves")])],It=[R("accessories-bags","bags","Çanta","Bags",[o("accessories-bags","women-bags","Kadın Çanta","Women’s Bags"),o("accessories-bags","men-bags","Erkek Çanta","Men’s Bags"),o("accessories-bags","shoulder-bags","Omuz Çantası","Shoulder Bags"),o("accessories-bags","backpacks","Sırt Çantası","Backpacks"),o("accessories-bags","crossbody-bags","Çapraz Çanta","Crossbody Bags"),o("accessories-bags","handbags","El Çantası","Handbags"),o("accessories-bags","wallets","Cüzdan","Wallets")]),R("accessories-watches","watches","Saat","Watches",[o("accessories-watches","women-watches","Kadın Saatleri","Women’s Watches"),o("accessories-watches","men-watches","Erkek Saatleri","Men’s Watches"),o("accessories-watches","smart-watches","Akıllı Saatler","Smart Watches")]),R("accessories-jewelry","jewelry","Takı","Jewelry",[o("accessories-jewelry","necklaces","Kolye","Necklaces"),o("accessories-jewelry","bracelets","Bileklik","Bracelets"),o("accessories-jewelry","earrings","Küpe","Earrings"),o("accessories-jewelry","rings","Yüzük","Rings")]),R("accessories-eyewear","eyewear","Gözlük","Eyewear",[o("accessories-eyewear","women-sunglasses","Kadın Güneş Gözlüğü","Women’s Sunglasses"),o("accessories-eyewear","men-sunglasses","Erkek Güneş Gözlüğü","Men’s Sunglasses")]),R("accessories-other","other","Diğer","Other",[o("accessories-other","belts","Kemer","Belts"),o("accessories-other","hats","Şapka & Bere","Hats"),o("accessories-other","scarves","Şal & Fular","Scarves"),o("accessories-other","gloves","Eldiven","Gloves")])],Ie=(e,t)=>t.map(([r,a,s])=>o(e,r,a,s)),Yt=Ie("sale",[["all-sale","Tüm İndirimler","All Sale"],["women-sale","Kadın İndirim","Women Sale"],["men-sale","Erkek İndirim","Men Sale"],["kids-sale","Çocuk İndirim","Kids Sale"],["shoes-sale","Ayakkabı İndirim","Shoes Sale"],["accessories-sale","Aksesuar İndirim","Accessories Sale"],["outlet-deals","Outlet Fırsatları","Outlet Deals"]]),Ft=Ie("outlet",[["all-outlet","Tüm Outlet","All Outlet"],["women-outlet","Kadın Outlet","Women Outlet"],["men-outlet","Erkek Outlet","Men Outlet"],["kids-outlet","Çocuk Outlet","Kids Outlet"],["shoes-outlet","Ayakkabı Outlet","Shoes Outlet"],["accessories-outlet","Aksesuar Outlet","Accessories Outlet"],["last-chance","Son Şans","Last Chance"]]),ee=[R("all","all","Tüm Ürünler","All Products",Ie("all",[["women","Kadın","Women"],["men","Erkek","Men"],["kids","Çocuk ve Bebek","Kids & Baby"],["new-arrivals","Yeni Gelenler","New Arrivals"],["best-sellers","Çok Satanlar","Best Sellers"]])),R("sale","sale","İndirimli Ürünler","Sale",Yt),R("men","men","Erkek","Men",[R("men-clothing","clothing","Giyim","Clothing",Mt),R("men-shoes","shoes","Ayakkabı","Shoes",Ot),R("men-bags","bags","Çanta","Bags",Kt),R("men-accessories","accessories","Aksesuar","Accessories",Nt)]),R("women","women","Kadın","Women",[R("women-clothing","clothing","Giyim","Clothing",Ct),R("women-shoes","shoes","Ayakkabı","Shoes",Dt),R("women-bags","bags","Çanta","Bags",zt),R("women-accessories","accessories","Aksesuar","Accessories",Pt)]),R("kids","kids","Çocuk ve Bebek","Kids & Baby",Bt),R("accessories","accessories","Aksesuar","Accessories",It),R("outlet","outlet","Outlet","Outlet",Ft)],tt=(e,t)=>e.flatMap(r=>[{id:r.id,slug:r.slug,name:r.name,parentId:t},...tt(r.children??[],r.id)]),ke=tt(ee);ke.filter(e=>!e.parentId);const xt=e=>ke.find(t=>t.id===e||t.slug===e)??ke[0],rt=(e,t=ee,r=[])=>{for(const a of t){const s=[...r,a];if(a.id===e||a.slug===e)return s;const i=rt(e,a.children??[],s);if(i.length)return i}return[]},qe=e=>e.filter(Boolean).join("/"),Ye=e=>`/category/${qe(e)}`,jt=(e,t)=>{const r=[];let a=e;for(const s of t){const i=a.find(c=>c.slug===s);if(!i)return[];r.push(i),a=i.children??[]}return r},st=(e,t,r,a=0)=>e.map(s=>{var m;const i=[...r,s.slug],c=qe(i),n=Ye(i);return(m=s.children)!=null&&m.length?`<div class="sidebar-category depth-${a}">
<button class="sidebar-category-toggle" aria-expanded="false">
<span>
${s.name[t]}
</span>
${A("chevron",16)}
</button>
<div class="sidebar-children">
<a class="sidebar-all-link" href="${n}" data-category-route="${c}">
${t==="tr"?`Tüm ${s.name.tr}`:`All ${s.name.en}`} →</a>
${st(s.children,t,i,a+1)}
</div>
</div>`:`<a class="sidebar-leaf depth-${a}" href="${n}" data-category-route="${c}">
${s.name[t]}
</a>`}).join(""),Ut=(e,t)=>`<div class="sidebar-overlay" id="sidebar-overlay">
</div>
<aside class="sidebar" id="sidebar" aria-hidden="true" aria-label="${e==="tr"?"Ana menü":"Main menu"}">
<div class="sidebar-head">
<a class="brand sidebar-brand-logo" href="/" data-home-route aria-label="STORE">
<img src="/store-logo.svg" alt="STORE">
</a>
<button class="icon-btn sidebar-close" aria-label="${e==="tr"?"Menüyü kapat":"Close menu"}">
${A("x",24)}
</button>
</div>
<nav class="sidebar-tree" aria-label="${e==="tr"?"Kategoriler":"Categories"}">
${st(ee,e,[])}
</nav>
<nav class="sidebar-actions" aria-label="${e==="tr"?"Hızlı işlemler":"Quick actions"}">
<a href="/tracking" data-route="tracking">
${A("truck",18)}
<span>
${e==="tr"?"Kargo Takip":"Track order"}
</span>
</a>
<a href="/favorites" data-route="favorites">
${A("heart",18)}
<span>
${e==="tr"?"Favoriler":"Favorites"}
</span>
</a>
<a href="/cart" data-route="cart">
${A("bag",18)}
<span>
${e==="tr"?"Sepet":"Cart"}
</span>
</a>
<a href="/account" data-route="account">
${A("user",18)}
<span>
${e==="tr"?"Hesabım":"Account"}
</span>
</a>
</nav>
<nav class="sidebar-secondary">
${Rt.map(r=>`<a href="${r.href}" data-route="${r.id}">
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
confidence.`},description:{tr:"Yeni sezonun rafine silüetleriyle kendi ritmini bul.",en:"Find your rhythm in the refined silhouettes of the new season."},cta:{tr:"KOLEKSİYONU KEŞFET",en:"EXPLORE THE COLLECTION"}},exchangeRates:{TRY:1,USD:.031,EUR:.028}},Gt=e=>{const t=Fe.hero;return`<section class="hero" id="home" aria-labelledby="hero-title">
<img
  class="hero-image"
  src="/images/aurea-hero.png"
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
${t.cta[e]} ${A("arrow",19)}
</a>
</div>
<a href="#recommended" class="scroll-cue" aria-label="${e==="tr"?"Önerilen ürünlere kaydır":"Scroll to recommended products"}">
<span>SCROLL</span>
<i>
</i>
</a>
<div class="hero-index">01 <span>
</span> 04</div>
</section>`},Ht=(e,t)=>`<section class="campaign-section">
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
</section>`,Wt=e=>`<div class="support">
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
${A("x")}
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
${A("send",19)}
</button>
</form>
</div>
</div>`,Vt=()=>`<div class="toast" id="toast" role="status" aria-live="polite">
</div>`,P={get(e,t,r){try{const a=localStorage.getItem(e);return a&&r.includes(a)?a:t}catch{return t}},set(e,t){try{localStorage.setItem(e,t)}catch{}},getJson(e,t){try{const r=localStorage.getItem(e);return r?JSON.parse(r):t}catch{return t}},setJson(e,t){this.set(e,JSON.stringify(t))}},Se=(e,t)=>{const r=qe(e);return`class="mega-menu-link mega-menu-${t}" href="${Ye(e)}" data-category-link data-category-route="${r}" data-category-kind="${t}"`},at=(e,t,r)=>e.map(a=>{var i;const s=[...r,a.slug];return(i=a.children)!=null&&i.length?`<div class="mega-subgroup">
<h4>
<a ${Se(s,"group")}>
${a.name[t]}
</a>
</h4>
${at(a.children,t,s)}
</div>`:`<a ${Se(s,"leaf")} data-category-leaf="${a.id}" data-category-id="${a.id}">
${a.name[t]}
</a>`}).join(""),Jt=(e,t,r)=>{var s;const a=[t.slug,e.slug];return`<div class="mega-column">
<h3>
<a ${Se(a,"group")}>
${e.name[r]}
</a>
</h3>
${(s=e.children)!=null&&s.length?at(e.children,r,a):`<a ${Se(a,"leaf")} data-category-leaf="${e.id}" data-category-id="${e.id}">
${r==="tr"?"Tümünü Gör":"View All"}
</a>`}
</div>`},Ee=(e,t)=>`<nav class="category-nav" aria-label="${t==="tr"?"Ürün kategorileri":"Product categories"}">
<div class="category-triggers">
${ee.map(r=>`<button
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
${ee.map(r=>`<section
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
${(r.children??[]).map(a=>Jt(a,r,t)).join("")}
</div>
</section>`).join("")}
</nav>
<button class="mega-overlay" type="button" aria-label="${t==="tr"?"Kategori menüsünü kapat":"Close category menu"}">
</button>`,W=(e,t,r)=>new Intl.NumberFormat(r==="tr"?"tr-TR":"en-US",{style:"currency",currency:t,maximumFractionDigits:t==="TRY"?0:2}).format(e*Fe.exchangeRates[t]),Re=e=>e.originalPrice?Math.round((e.originalPrice-e.price)/e.originalPrice*100):0,it=(e,t,r)=>{const a=r??rt(t).map(n=>n.slug),[s,i]=a,c=s==="sale"?e:e.filter(n=>!n.saleOnly);return s==="all"?c.filter(n=>i==="women"||i==="men"||i==="kids"?n.categoryId===i:i==="new-arrivals"?n.isNew:i==="best-sellers"?n.isBestSeller:!0):s==="sale"?e.filter(n=>{var m;return!!n.originalPrice&&(i==="women-sale"?n.categoryId==="women":i==="men-sale"?n.categoryId==="men":i==="kids-sale"?n.categoryId==="kids":i==="shoes-sale"?(m=n.categoryPath)==null?void 0:m.includes("shoes"):i==="accessories-sale"?n.categoryId==="accessories":i==="outlet-deals"?n.isOutlet:!0)}):s==="outlet"?c.filter(n=>{var m;return n.isOutlet&&(i==="women-outlet"?n.categoryId==="women":i==="men-outlet"?n.categoryId==="men":i==="kids-outlet"?n.categoryId==="kids":i==="shoes-outlet"?(m=n.categoryPath)==null?void 0:m.includes("shoes"):i==="accessories-outlet"?n.categoryId==="accessories":i==="last-chance"?!!n.originalPrice:!0)}):c.filter(n=>n.categoryPath?a.every((m,u)=>{var y;return((y=n.categoryPath)==null?void 0:y[u])===m}):a.length===1?n.categoryId===s:a.length===2?n.categoryId===s&&n.subcategoryId===i:!1)},Zt=(e,t)=>e.filter(r=>[...t].every(([a,s])=>!s.size||[...s].some(i=>{var c,n;return a==="category"?r.categoryId===i||r.subcategoryId===i||!!((c=r.categoryPath)!=null&&c.includes(i)):a==="clothingCategory"?!!((n=r.categoryPath)!=null&&n.includes("clothing")&&r.categoryPath.includes(i)):a==="brand"?r.brand===i:a==="color"?r.colors.includes(i):a==="size"?r.sizes.includes(i):a==="availability"?i==="in-stock"?r.stock>0:r.stock===0:a==="discount"?!!r.originalPrice:a==="minPrice"?r.price>=Number(i):a==="maxPrice"?r.price<=Number(i):!0}))),_t=(e,t,r)=>[...e].sort((a,s)=>t==="price-asc"?a.price-s.price:t==="price-desc"?s.price-a.price:t==="newest"?s.createdAt-a.createdAt:t==="discount"?Re(s)-Re(a):t==="name-asc"?a.name[r].localeCompare(s.name[r],r):t==="name-desc"?s.name[r].localeCompare(a.name[r],r):Number(s.isBestSeller)-Number(a.isBestSeller)),Xt=(e,t)=>t.filter(r=>r.id!==e.id).map(r=>({p:r,score:(r.subcategoryId===e.subcategoryId?4:0)+(r.categoryId===e.categoryId?2:0)+(r.brand===e.brand?1:0)+(Math.abs(r.price-e.price)<1e3?1:0)})).sort((r,a)=>a.score-r.score).slice(0,8).map(r=>r.p);class ot{constructor(t){je(this,"values");this.key=t,this.values=new Set(P.getJson(t,[]))}has(t){return this.values.has(t)}all(){return[...this.values]}toggle(t){return this.values.has(t)?this.values.delete(t):this.values.add(t),this.save(),this.values.has(t)}remove(t){this.values.delete(t),this.save()}clear(){this.values.clear(),this.save()}save(){P.setJson(this.key,this.all())}}const te=new ot("aurea-favorites"),H=new ot("aurea-comparison"),nt=(e,t,r,a)=>{const s=Re(e),i=e.images.length;return`<article class="catalog-card" data-product-id="${e.id}">
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
${i>1?`<button type="button" class="catalog-gallery-arrow is-prev" data-gallery-direction="-1" aria-label="${t==="tr"?"Önceki görsel":"Previous image"}" disabled>${A("chevron",16)}</button>
<button type="button" class="catalog-gallery-arrow is-next" data-gallery-direction="1" aria-label="${t==="tr"?"Sonraki görsel":"Next image"}">${A("chevron",16)}</button>
<div class="catalog-gallery-dots" aria-label="${i} ${t==="tr"?"görsel":"images"}">
${e.images.map((c,n)=>`<span class="catalog-gallery-dot ${n===0?"is-active":""}"></span>`).join("")}
</div>`:""}
<button class="icon-btn catalog-favorite ${te.has(e.id)?"is-active":""}" aria-label="${t==="tr"?"Favoriyi değiştir":"Toggle favorite"}">
${A("heart",19)}
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
${W(e.originalPrice,r,t)}
</s>`:""}
<strong>
${W(e.price,r,t)}
</strong>
</div>
<label class="compare-choice">
<input type="checkbox" class="compare-input" ${H.has(e.id)?"checked":""}>
<span>
${t==="tr"?"Karşılaştır":"Compare"}
</span>
</label>
<button class="catalog-cart ${e.stock===0?"notify-btn":"add-cart"}">
${e.stock===0?t==="tr"?"GELİNCE HABER VER":"NOTIFY ME":t==="tr"?"SEPETE EKLE":"ADD TO CART"}
</button>
</div>
</article>`},be=e=>[...new Set(e)].filter(Boolean).sort((t,r)=>t.localeCompare(r,"tr")),Qt={women:{tr:"Kadın",en:"Women"},men:{tr:"Erkek",en:"Men"},kids:{tr:"Çocuk",en:"Kids"},accessories:{tr:"Aksesuar",en:"Accessories"}},ct=new Map,lt=e=>e.forEach(t=>{ct.set(t.slug,t.name),t.children&&lt(t.children)});lt(ee);const ae=(e,t,r,a,s)=>r.length?`<fieldset>
<legend>
${t}
</legend>
${r.map(i=>{var c;return`<label>
<input type="checkbox" data-filter-key="${e}" value="${i}" ${(c=a.get(e))!=null&&c.has(i)?"checked":""}>
<span>
${(s==null?void 0:s(i))??i}
</span>
</label>`}).join("")}
</fieldset>`:"",er=(e,t,r,a)=>{var w,$;const s=be(a.map(p=>p.categoryId)),i=be(a.filter(p=>{var b;return(b=p.categoryPath)==null?void 0:b.includes("clothing")}).map(p=>{var b;return((b=p.categoryPath)==null?void 0:b.at(-1))??""})),c=be(a.map(p=>p.brand)),n=be(a.flatMap(p=>p.colors)),m=be(a.flatMap(p=>p.sizes)),u=((w=r.get("minPrice"))==null?void 0:w.values().next().value)??"",y=(($=r.get("maxPrice"))==null?void 0:$.values().next().value)??"",v=[ae("category",t==="tr"?"Kategori":"Category",s,r,p=>{var b;return((b=Qt[p])==null?void 0:b[t])??p}),ae("clothingCategory",t==="tr"?"Giyim Kategorisi":"Clothing Category",i,r,p=>{var b;return((b=ct.get(p))==null?void 0:b[t])??p}),ae("brand",t==="tr"?"Marka":"Brand",c,r),ae("color",t==="tr"?"Renk":"Color",n,r),ae("size",t==="tr"?"Beden":"Size",m,r),ae("availability",t==="tr"?"Stok Durumu":"Availability",["in-stock","out-of-stock"],r,p=>p==="in-stock"?t==="tr"?"Stokta var":"In stock":t==="tr"?"Stokta yok":"Out of stock"),ae("discount",t==="tr"?"İndirim":"Discount",["discounted"],r,()=>t==="tr"?"İndirimli ürünler":"On sale")].join("");return`<div class="filter-overlay">
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
${A("x")}
</button>
</header>
<div class="filter-groups">
${v}
<fieldset>
<legend>
${t==="tr"?"Fiyat Aralığı":"Price Range"}
</legend>
<div class="price-range">
<label>
<span>
Minimum
</span>
<input type="number" min="0" step="10" inputmode="numeric" data-price-filter="minPrice" value="${u}" placeholder="0">
</label>
<label>
<span>
${t==="tr"?"Maksimum":"Maximum"}
</span>
<input type="number" min="0" step="10" inputmode="numeric" data-price-filter="maxPrice" value="${y}" placeholder="∞">
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
</aside>`},tr=(e,t)=>`<div class="comparison-bar ${e>=2?"is-visible":""}">
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
</div>`,dt=e=>`<div class="modal-overlay">
</div>
<dialog class="notify-dialog">
<button class="icon-btn notify-close" aria-label="${e==="tr"?"Kapat":"Close"}">
${A("x")}
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
</dialog>`,Ge=["#E8E4DC","#DDE5E4","#E7DDD8","#E1E5DB","#E5DFE8","#E8E1D5"],rr=e=>e.replace(/[<>&'\"]/g,t=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"})[t]??t),me=(e,t)=>{const r=e.length>28?`${e.slice(0,27)}…`:e,a=r.length>22?30:r.length>15?36:44,s=`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
<rect width="900" height="1200" fill="${Ge[t%Ge.length]}"/>
<text x="450" y="600" text-anchor="middle" dominant-baseline="middle" fill="#282724" font-family="Arial,sans-serif" font-size="${a}" letter-spacing="3">
${rr(r.toUpperCase())}
</text>
<text x="450" y="655" text-anchor="middle" fill="#77736c" font-family="Arial,sans-serif" font-size="15" letter-spacing="5">STORE COLLECTION</text>
</svg>`;return`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(s)}`},ce=[{tr:"Keten Karışımlı Ceket",en:"Linen Blend Jacket",cat:"women",sub:"clothing"},{tr:"Rahat Kesim Blazer",en:"Relaxed Blazer",cat:"women",sub:"clothing"},{tr:"Saten Midi Elbise",en:"Satin Midi Dress",cat:"women",sub:"clothing"},{tr:"Yüksek Bel Pantolon",en:"High Waist Trousers",cat:"women",sub:"clothing"},{tr:"Dokulu Overshirt",en:"Textured Overshirt",cat:"men",sub:"clothing"},{tr:"Yün Karışımlı Ceket",en:"Wool Blend Jacket",cat:"men",sub:"clothing"},{tr:"Regular Fit Gömlek",en:"Regular Fit Shirt",cat:"men",sub:"clothing"},{tr:"Pileli Pantolon",en:"Pleated Trousers",cat:"men",sub:"clothing"},{tr:"Luna Omuz Çantası",en:"Luna Shoulder Bag",cat:"accessories",sub:"bags"},{tr:"Mini Deri Çanta",en:"Mini Leather Bag",cat:"accessories",sub:"bags"},{tr:"Klasik Kol Saati",en:"Classic Wrist Watch",cat:"accessories",sub:"watches"},{tr:"İnce Kordon Saat",en:"Slim Strap Watch",cat:"accessories",sub:"watches"},{tr:"Cat Eye Güneş Gözlüğü",en:"Cat Eye Sunglasses",cat:"accessories",sub:"jewelry"},{tr:"Minimal Halka Küpe",en:"Minimal Hoop Earrings",cat:"accessories",sub:"jewelry"},{tr:"Deri Sneaker",en:"Leather Sneakers",cat:"men",sub:"shoes"},{tr:"Süet Loafer",en:"Suede Loafers",cat:"women",sub:"shoes"},{tr:"Pamuklu Çocuk Sweatshirt",en:"Kids Cotton Sweatshirt",cat:"kids",sub:"clothing"},{tr:"Çocuk Keten Takım",en:"Kids Linen Set",cat:"kids",sub:"clothing"}],He=["STORE","NOMA","ATELIER 26","STUDIO N"],sr=["0% 0%","100% 0%","0% 100%","100% 100%"],ar=[20,25,30,35],ir=Array.from({length:54},(e,t)=>{const r=ce[t%ce.length],a=1290+t%9*450,s=t<4,i=s||t%4===0,c=s?ar[t]:25,n={tr:`${r.tr}${t>=ce.length?` ${Math.floor(t/ce.length)+1}`:""}`,en:`${r.en}${t>=ce.length?` ${Math.floor(t/ce.length)+1}`:""}`};return{id:`ap-${t+1}`,slug:`${r.en.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${t+1}`,name:n,categoryId:r.cat,subcategoryId:r.sub,brand:He[t%He.length],sku:`AU-${String(t+1).padStart(4,"0")}`,price:i?Math.round(a*(1-c/100)):a,originalPrice:i?a:void 0,images:[s?"/images/aurea-products.jpg":me(n.tr,t),me(`${n.tr} · DETAY`,t+1),me(`${n.tr} · GÖRÜNÜM`,t+2)],imagePosition:s?sr[t]:"50% 50%",colors:[t%2?"Siyah":"Ekru",t%3?"Kum":"Haki"],sizes:t%5===0?[]:["XS","S","M","L"],stock:t%11===0?0:3+t%12,isNew:t%5===0,isBestSeller:t%7===0,isOutlet:t%6===0,saleOnly:s,createdAt:Date.now()-t*864e5,description:{tr:"Günlük ritme uyum sağlayan rafine formu, özenli dikişleri ve uzun ömürlü materyal seçimiyle tasarlandı.",en:"Designed for everyday rhythm with a refined silhouette, considered stitching and enduring materials."},rating:4.2+t%7/10,reviewCount:18+t%9*11,attributes:{Materyal:t%2?"Pamuk":"Yün Karışım",Sezon:"2026",Kalıp:t%3?"Regular":"Rahat",SuGeçirmezlik:r.sub==="watches"?"3 ATM":"—"}}}),We=10,or=new Set(["women","men","kids","accessories"]),mt=(e=ee,t=[])=>e.flatMap(r=>{var s;const a=[...t,r];return(s=r.children)!=null&&s.length?mt(r.children,a):t.length&&or.has(t[0].id)?[{node:r,path:a}]:[]}),nr=e=>e.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ı/g,"i").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""),cr=e=>e.some(t=>["shoes","sneakers","boots","sandals","slippers","loafers","heels"].includes(t))?"shoes":e.some(t=>["watches","women-watches","men-watches","smart-watches"].includes(t))?"watch":e.some(t=>["jewelry","necklaces","bracelets","earrings","rings"].includes(t))?"jewelry":e.some(t=>["bags","shoulder-bags","handbags","backpacks","wallets"].includes(t))?"bag":e[0]==="kids"?"kids":"clothing",lr={clothing:[490,3290],kids:[290,1790],shoes:[890,4990],bag:[690,5990],watch:[1290,12990],jewelry:[290,3490]},Ve=["STORE","FORM","MODE","LINE"],dr=[12,5,0,18,2,9,0,3,14,7],mr=[0,10,0,20,0,30,0,15,0,25],ur=()=>mt().flatMap(({node:e,path:t},r)=>Array.from({length:We},(a,s)=>{const i=s+1,c=t.map(M=>M.id),n=t.map(M=>M.slug),m=cr(n),[u,y]=lr[m],v=Math.round((u+(y-u)*(s/We))/10)*10,w=mr[s],$=t.length>3?t.at(-2).name:t[0].name,p={tr:`${$.tr} ${e.name.tr} ${i}`.toUpperCase(),en:`${$.en} ${e.name.en} ${i}`.toUpperCase()},b=c.join("-"),L=["watch","jewelry","bag"].includes(m),N=m==="watch"?{Kordon:"Deri",KasaÇapı:"42 mm",SuGeçirmezlik:"5 ATM"}:m==="jewelry"?{Materyal:"Paslanmaz Çelik",Uzunluk:"45 cm"}:m==="shoes"?{Materyal:"Deri",Taban:"Kauçuk",Kalıp:"Normal"}:{Materyal:"Pamuk Karışımlı",Kalıp:"Regular",Sezon:"2026"};return{id:`item-${b}-${String(i).padStart(2,"0")}`,slug:nr(`${b}-${i}`),name:p,categoryId:c[0],subcategoryId:e.id,categoryPath:n,brand:Ve[(r+s)%Ve.length],sku:`ST-${r+1}-${i}`,price:w?Math.round(v*(1-w/100)/10)*10:v,originalPrice:w?v:void 0,images:[me(p.tr,r+s),me(`${p.tr} · DETAY`,r+s+1),me(`${p.tr} · GÖRÜNÜM`,r+s+2)],imagePosition:"50% 50%",colors:[s%2?"Siyah":"Ekru",s%3?"Lacivert":"Kum"],sizes:L?[]:m==="shoes"?n[0]==="kids"?["28","29","30","31","32"]:["36","37","38","39","40","41","42"]:["XS","S","M","L","XL"],stock:dr[s],isNew:s%4===0,isBestSeller:s%5===0,isOutlet:(r+s)%7===0,createdAt:Date.UTC(2026,7,17)-r*864e5-s*36e5,description:{tr:`${e.name.tr} kategorisinin seçili koleksiyon parçası.`,en:`A selected piece from the ${e.name.en} collection.`},rating:4.1+s%5*.17,reviewCount:12+s*13,attributes:N}})),pr=ur(),Y=[...ir,...pr],ut="aurea-cart",le=()=>{const e=P.getJson(ut,[]);return Array.isArray(e)?e.filter(t=>!!(t&&typeof t=="object"&&"productId"in t&&"quantity"in t)):e&&typeof e=="object"?Object.entries(e).map(([t,r])=>({productId:t,quantity:r})):[]},we=e=>P.setJson(ut,e),K={all:le,add(e,t={}){const r=le(),a=r.find(s=>s.productId===e&&s.color===t.color&&s.size===t.size);a?a.quantity+=1:r.push({productId:e,...t,quantity:1}),we(r),this.emit()},setQuantity(e,t){const r=le();r[e]&&(t<=0?r.splice(e,1):r[e].quantity=t,we(r),this.emit())},remove(e){const t=le();t[e]&&(t.splice(e,1),we(t),this.emit())},prune(e){const t=le(),r=t.filter(a=>e.has(a.productId)&&Number.isFinite(a.quantity)&&a.quantity>0);r.length!==t.length&&we(r)},count(){return le().reduce((e,t)=>e+t.quantity,0)},emit(){dispatchEvent(new CustomEvent("aurea:cart"))}},ie=12;let Z=ie,se=new Map,ve;const pt=()=>location.pathname.split("/").filter(Boolean).at(-1)??"all",hr=()=>location.pathname.split("/").filter(Boolean).slice(1),ht=()=>new URLSearchParams(location.search).get("sort")??"recommended",Oe=e=>_t(Zt(it(Y,pt(),location.pathname.split("/").filter(Boolean).slice(1)),se),ht(),e),yr=(e,t)=>{var w;const r=pt(),a=hr(),s=jt(ee,a),i=s.at(-1)??xt(r),c=((w=s[0])==null?void 0:w.id)??r,n=it(Y,r,a),m=Oe(e),u=Math.min(Z,m.length),y=[...se.values()].reduce(($,p)=>$+p.size,0),v=s.slice(0,-1).map(($,p)=>{const b=qe(a.slice(0,p+1));return`<a href="${Ye(a.slice(0,p+1))}" data-category-route="${b}">
${$.name[e]}
</a>
<span>/</span>`}).join("");return`${Ee(c,e)}
<div class="category-page">
<nav class="breadcrumbs" aria-label="Breadcrumb">
<a href="/" data-home-route>
${e==="tr"?"Ana Sayfa":"Home"}
</a>
<span>/</span>
${v}
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
${m.length} ${e==="tr"?"ürün":"products"}
</span>
</div>
<div class="toolbar-actions">
<button class="compare-toolbar">
${e==="tr"?"Karşılaştır":"Compare"} <span>(${H.all().length})</span>
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
${e==="tr"?"Filtrele":"Filter"}${y?` <span>(${y})</span>`:""}
</button>
</div>
</header>
<div class="active-filters">
${[...se].flatMap(([$,p])=>[...p].map(b=>`<button data-remove-filter="${$}:${b}">
${b} ×</button>`)).join("")}
</div>
${m.length?`<section class="catalog-grid" aria-label="${i.name[e]}">
${m.slice(0,u).map(($,p)=>nt($,e,t,p)).join("")}
</section>
<div class="infinite-sentinel" aria-live="polite">
${u<m.length?`<span class="loader">
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
${er(r,e,se,n)}${tr(H.all().length,e)}${dt(e)}`},br=()=>{Z=ie,se=new Map},vr=(e,t,r,a)=>{var p,b,L,N,M,d,E,q,T,O,j;document.querySelector(".sort-select").value=ht();const s=()=>{ve==null||ve.disconnect(),t()};document.querySelectorAll(".catalog-card").forEach(f=>{var C,F,pe,he;const k=f.dataset.productId;(C=f.querySelector(".catalog-favorite"))==null||C.addEventListener("click",l=>{const h=te.toggle(k);l.currentTarget.classList.toggle("is-active",h),r(h?e==="tr"?"Favorilere eklendi.":"Added to favorites.":e==="tr"?"Favorilerden çıkarıldı.":"Removed from favorites.")}),(F=f.querySelector(".compare-input"))==null||F.addEventListener("change",()=>{H.toggle(k),s()}),(pe=f.querySelector(".add-cart"))==null||pe.addEventListener("click",()=>{K.add(k);const l=document.querySelector(".cart-count");l&&(l.textContent=String(K.count()),l.classList.add("is-visible")),r(e==="tr"?"Ürün sepete eklendi.":"Added to cart.")}),(he=f.querySelector(".notify-btn"))==null||he.addEventListener("click",()=>w())});const i=document.querySelector(".filter-drawer"),c=document.querySelector(".filter-overlay"),n=f=>{var k;i==null||i.classList.toggle("is-open",f),c==null||c.classList.toggle("is-open",f),i==null||i.setAttribute("aria-hidden",String(!f)),f&&((k=i==null?void 0:i.querySelector("button"))==null||k.focus())};(p=document.querySelector(".filter-trigger"))==null||p.addEventListener("click",()=>n(!0)),(b=document.querySelector(".filter-close"))==null||b.addEventListener("click",()=>n(!1)),c==null||c.addEventListener("click",()=>n(!1)),(L=document.querySelector(".filter-apply"))==null||L.addEventListener("click",()=>{const f=new Map;i==null||i.querySelectorAll("[data-filter-key]:checked").forEach(k=>{const C=k.dataset.filterKey;f.has(C)||f.set(C,new Set),f.get(C).add(k.value)}),i==null||i.querySelectorAll("[data-price-filter]").forEach(k=>{const C=k.value.trim();C&&f.set(k.dataset.priceFilter,new Set([C]))}),se=f,Z=ie,s()});const m=()=>{se.clear(),Z=ie,s()};(N=document.querySelector(".filter-clear"))==null||N.addEventListener("click",m),(M=document.querySelector(".empty-clear"))==null||M.addEventListener("click",m),document.querySelectorAll("[data-remove-filter]").forEach(f=>f.addEventListener("click",()=>{var F;const[k,C]=f.dataset.removeFilter.split(":");(F=se.get(k))==null||F.delete(C),Z=ie,s()})),(d=document.querySelector(".sort-select"))==null||d.addEventListener("change",f=>{const k=f.target.value,C=new URL(location.href);k==="recommended"?C.searchParams.delete("sort"):C.searchParams.set("sort",k),history.replaceState({},"",C),Z=ie,s()}),(E=document.querySelector(".comparison-clear"))==null||E.addEventListener("click",()=>{H.clear(),s()}),(q=document.querySelector("[data-compare-route]"))==null||q.addEventListener("click",f=>{f.preventDefault(),a("/compare")});const u=document.querySelector(".infinite-sentinel");u&&Z<Oe(e).length&&(ve=new IntersectionObserver(f=>{var k;(k=f[0])!=null&&k.isIntersecting&&(Z=Math.min(Z+ie,Oe(e).length),s())},{rootMargin:"500px"}),ve.observe(u));const y=document.querySelector(".notify-dialog"),v=document.querySelector(".modal-overlay");function w(){y==null||y.showModal(),v==null||v.classList.add("is-open")}const $=()=>{y==null||y.close(),v==null||v.classList.remove("is-open")};(T=document.querySelector(".notify-close"))==null||T.addEventListener("click",$),v==null||v.addEventListener("click",$),(O=y==null?void 0:y.querySelector("form"))==null||O.addEventListener("submit",f=>{f.preventDefault(),f.currentTarget.reportValidity()&&($(),r(e==="tr"?"Talebiniz alındı. Ürün tekrar stoklara geldiğinde bilgilendirileceksiniz.":"Request received. We’ll notify you when it is back."))}),(j=document.querySelector(".compare-toolbar"))==null||j.addEventListener("click",()=>H.all().length>=2?a("/compare"):r(e==="tr"?"Karşılaştırmak için en az 2 ürün seçin.":"Select at least 2 products."))},$r=(e,t)=>{const r=Y.filter(s=>H.has(s.id)),a=[...new Set(r.flatMap(s=>Object.keys(s.attributes)))];return`${Ee("",e)}
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
${W(s.price,t,e)}
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
</main>`},fr=[{id:"r1",productId:"all",author:"STORE Member 01",rating:5,title:{tr:"Beklentimin üzerinde",en:"Above expectations"},comment:{tr:"Dokusu ve kalıbı çok iyi. Paketleme de oldukça özenliydi.",en:"Excellent texture and fit. The packaging was beautifully considered."},date:"2026-06-14",verifiedPurchase:!0},{id:"r2",productId:"all",author:"STORE Member 02",rating:4,comment:{tr:"Zamansız ve kolay kombinlenen bir parça.",en:"A timeless piece that is easy to style."},date:"2026-05-28",verifiedPurchase:!0}],Ae={deliveryDays:"1–3",returnDays:14},Je="aurea-recently-viewed",kr={add(e){const t=[e,...this.all().filter(r=>r!==e)].slice(0,8);P.setJson(Je,t)},all(){return P.getJson(Je,[])}};let ue=0,oe="",D="",_=1;const yt=()=>location.pathname.split("/").filter(Boolean).at(-1)??"",bt=e=>Y.find(t=>t.slug===e),Sr={Siyah:"#242321",Ekru:"#e7dfd0",Kum:"#b7a184",Haki:"#68705c"},Ke=e=>`<span class="stars" aria-hidden="true">
${Array.from({length:5},(t,r)=>`<svg viewBox="0 0 24 24">
<path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9Z" ${r<Math.round(e)?'fill="currentColor"':""}/>
</svg>`).join("")}
</span>`,Er=(e,t)=>{const r=["0% 0%","100% 0%","0% 100%","100% 100%"];return`<section class="detail-gallery">
<button class="detail-main-image image-viewer-open" aria-label="${t==="tr"?"Ürün görselini büyüt":"Enlarge product image"}">
<img src="${e.images[0]}" alt="${e.name[t]}" style="transform-origin:${r[ue]}" fetchpriority="high">
<span class="image-counter">
${ue+1} / 4</span>
<span class="zoom-hint">
${A("search",17)} ${t==="tr"?"BÜYÜT":"ZOOM"}
</span>
</button>
<div class="detail-thumbnails">
${r.map((a,s)=>`<button class="${s===ue?"is-active":""}" data-image-index="${s}" aria-label="${s+1}. ${t==="tr"?"ürün görselini göster":"product image"}">
<img src="${e.images[0]}" alt="" loading="lazy" style="transform-origin:${a}">
</button>`).join("")}
</div>
</section>`},vt=(e,t,r)=>`<div class="detail-price">
${e.originalPrice?`<s>
${W(e.originalPrice,r,t)}
</s>`:""}
<strong>
${W(e.price,r,t)}
</strong>
${e.originalPrice?`<span>−%${Re(e)}
</span>`:""}
</div>`,gr=(e,t,r)=>{var a;return`<section class="detail-info">
<p class="detail-brand">
${e.brand}
</p>
<h1>
${e.name[t]}
</h1>
<a href="#reviews" class="rating-link">
${Ke(e.rating??0)} <span>
${(e.rating??0).toFixed(1)} (${e.reviewCount??0} ${t==="tr"?"yorum":"reviews"})</span>
</a>
${vt(e,t,r)}
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
  style="--swatch:${Sr[s]??"#aaa"}"
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
${e.sizes.map((s,i)=>`<button data-size="${s}" class="${D===s?"is-active":""}" ${i===1&&e.stock<5?"disabled":""}>
${s}
</button>`).join("")}
</div>
</div>`:""}
<div class="purchase-row">
<div class="quantity" aria-label="${t==="tr"?"Adet":"Quantity"}">
<button class="quantity-minus" aria-label="${t==="tr"?"Azalt":"Decrease"}">−</button>
<span>
${_}
</span>
<button class="quantity-plus" aria-label="${t==="tr"?"Artır":"Increase"}">+</button>
</div>
<button class="detail-cart ${e.stock===0?"detail-notify":"detail-add-cart"}">
${e.stock===0?t==="tr"?"GELİNCE HABER VER":"NOTIFY ME":t==="tr"?"SEPETE EKLE":"ADD TO CART"}
</button>
</div>
<div class="secondary-actions">
<button class="detail-favorite ${te.has(e.id)?"is-active":""}">
${A("heart",18)}
<span>
${te.has(e.id)?t==="tr"?"Favorilerden Çıkar":"Remove Favorite":t==="tr"?"Favorilere Ekle":"Add to Favorites"}
</span>
</button>
<button class="detail-compare ${H.has(e.id)?"is-active":""}">
${A("arrow",18)}
<span>
${H.has(e.id)?t==="tr"?"Karşılaştırmadan Çıkar":"Remove from Compare":t==="tr"?"Karşılaştırmaya Ekle":"Add to Compare"}
</span>
</button>
</div>
<div class="delivery-notes">
<p>
${A("truck",18)}
<span>
${t==="tr"?`Kargo: ${Ae.deliveryDays} iş günü`:`Delivery: ${Ae.deliveryDays} business days`}
</span>
</p>
<p>
${A("arrow",18)}
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
</section>`},wr=(e,t)=>`<section class="product-reviews" id="reviews">
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
${Ke(e.rating??0)}
<p>
${e.reviewCount??0} ${t==="tr"?"değerlendirme":"ratings"}
</p>
</div>
</div>
<div class="review-list">
${fr.map(r=>{var a;return`<article>
<div>
${Ke(r.rating)}
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
</section>`,Ar=(e,t)=>`<div class="viewer-overlay">
<div class="image-viewer" role="dialog" aria-modal="true" aria-label="${t==="tr"?"Ürün görseli":"Product image"}">
<button class="icon-btn viewer-close" aria-label="${t==="tr"?"Kapat":"Close"}">
${A("x",24)}
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
${A("x")}
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
${dt(t)}`,Lr=(e,t)=>{const r=bt(yt());if(!r)return`${Ee("",e)}
<main class="product-not-found">
<p class="eyebrow">404</p>
<h1>
${e==="tr"?"Ürün bulunamadı.":"Product not found."}
</h1>
<a href="/category/all" data-category-route="all">
${e==="tr"?"ÜRÜNLERE DÖN":"BACK TO PRODUCTS"}
</a>
</main>`;kr.add(r.id);const a=ke.find(c=>c.id===r.categoryId),s=ke.find(c=>c.id===r.subcategoryId),i=Xt(r,Y).slice(0,4);return document.title=`${r.name[e]} | STORE`,`${Ee(r.categoryId,e)}
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
${Er(r,e)}${gr(r,e,t)}
</div>
${wr(r,e)}${i.length?`<section class="detail-recommendations">
<header>
<p class="eyebrow">DISCOVER MORE</p>
<h2>
${e==="tr"?"Benzer Ürünler":"You may also like"}
</h2>
</header>
<div>
${i.map((c,n)=>nt(c,e,t,n)).join("")}
</div>
</section>`:""}
</main>
${Ar(r,e)}
<div class="mobile-product-cta">
${vt(r,e,t)}
<button class="${r.stock===0?"detail-notify":"detail-add-cart"}">
${r.stock===0?e==="tr"?"HABER VER":"NOTIFY ME":e==="tr"?"SEPETE EKLE":"ADD TO CART"}
</button>
</div>`},$t=()=>{ue=0,oe="",D="",_=1},Tr=e=>e==="Siyah"?"brightness(.72) contrast(1.08)":e==="Kum"?"sepia(.2) saturate(.82) brightness(1.06)":e==="Haki"?"sepia(.25) hue-rotate(28deg) saturate(.78)":e==="Lacivert"?"brightness(.78) saturate(1.15) hue-rotate(178deg)":"brightness(1.06) saturate(.82)",de=(e,t,r)=>{var a,s;return((s=(a=e.variantStock)==null?void 0:a[t])==null?void 0:s[r])??Math.max(0,Math.min(e.stock,(e.id.length+t.length+e.sizes.indexOf(r))%5===0?0:1+(e.stock+e.sizes.indexOf(r))%4))},Rr=(e,t,r,a)=>{var w,$,p,b,L,N,M;const s=bt(yt());if(!s)return;const i=()=>oe||s.colors[0]||"",c=()=>{const d=document.querySelector(".cart-count");d&&(d.textContent=String(K.count()),d.classList.toggle("is-visible",K.count()>0))},n=()=>{var j;const d=i(),E=Tr(d),q=`#variant-${encodeURIComponent(d)}`;(j=document.querySelector(".variant-group strong"))==null||j.replaceChildren(d),document.querySelectorAll(".detail-gallery img,.image-viewer img").forEach(f=>{f.src=`${s.images[0].split("#")[0]}${q}`,f.style.filter=E}),document.querySelectorAll("[data-color]").forEach(f=>{const k=f.dataset.color===d;f.classList.toggle("is-active",k),f.setAttribute("aria-pressed",String(k))}),document.querySelectorAll("[data-size]").forEach(f=>{const k=f.dataset.size??"",C=de(s,d,k),F=D===k;f.disabled=C===0,f.classList.toggle("is-active",F),f.setAttribute("aria-pressed",String(F)),f.setAttribute("aria-label",`${e==="tr"?"Beden":"Size"} ${k}${C===0?` — ${e==="tr"?"stokta yok":"out of stock"}`:""}`)});const T=D?de(s,d,D):s.stock,O=document.querySelector(".stock-note");O&&(O.textContent=T===0?e==="tr"?"Bu varyant stokta yok":"This variant is out of stock":T<=3?e==="tr"?`Bu varyantta son ${T} ürün`:`Only ${T} left in this variant`:e==="tr"?"Stokta":"In stock")};n(),document.querySelectorAll("[data-image-index]").forEach(d=>d.addEventListener("click",()=>{ue=Number(d.dataset.imageIndex),t()})),document.querySelectorAll("[data-color]").forEach(d=>d.addEventListener("click",()=>{oe=d.dataset.color??"",ue=0,D&&de(s,oe,D)===0&&(D=""),n()})),document.querySelectorAll("[data-size]").forEach(d=>d.addEventListener("click",()=>{D=d.dataset.size??"",_=Math.min(_,de(s,i(),D)),n()})),document.querySelectorAll(".quantity-minus").forEach(d=>d.addEventListener("click",()=>{_=Math.max(1,_-1),t()})),document.querySelectorAll(".quantity-plus").forEach(d=>d.addEventListener("click",()=>{const E=D?de(s,i(),D):s.stock;_=Math.min(E,_+1),t()}));const m=()=>{if(s.sizes.length&&!D){r(e==="tr"?"Lütfen bir beden seçin.":"Please select a size.");return}if(D&&de(s,i(),D)===0){r(e==="tr"?"Seçtiğiniz varyant stokta yok.":"The selected variant is out of stock.");return}for(let d=0;d<_;d++)K.add(s.id,{color:i()||void 0,size:D||void 0});c(),r(e==="tr"?`${i()} / ${D} sepete eklendi.`:`${i()} / ${D} added to cart.`)};document.querySelectorAll(".detail-add-cart").forEach(d=>d.addEventListener("click",m)),document.querySelectorAll(".detail-notify").forEach(d=>d.addEventListener("click",()=>{var E;return(E=document.querySelector(".notify-dialog"))==null?void 0:E.showModal()})),(w=document.querySelector(".detail-favorite"))==null||w.addEventListener("click",()=>{te.toggle(s.id),t(),r(te.has(s.id)?e==="tr"?"Favorilere eklendi.":"Added to favorites.":e==="tr"?"Favorilerden çıkarıldı.":"Removed from favorites.")}),($=document.querySelector(".detail-compare"))==null||$.addEventListener("click",()=>{H.toggle(s.id),t(),r(e==="tr"?"Karşılaştırma listeniz güncellendi.":"Comparison list updated.")}),document.querySelectorAll(".detail-accordions>div>button").forEach(d=>d.addEventListener("click",()=>{const E=d.getAttribute("aria-expanded")==="true";d.setAttribute("aria-expanded",String(!E)),d.querySelector("span").textContent=E?"+":"−",d.nextElementSibling.hidden=E}));const u=document.querySelector(".size-guide");(p=document.querySelector(".size-guide-open"))==null||p.addEventListener("click",()=>u==null?void 0:u.showModal()),(b=document.querySelector(".size-guide-close"))==null||b.addEventListener("click",()=>u==null?void 0:u.close()),(L=document.querySelector(".review-write"))==null||L.addEventListener("click",()=>r(e==="tr"?"Yorumunuz değerlendirilmek üzere alındı.":"Your review was received for moderation."));const y=document.querySelector(".viewer-overlay"),v=d=>y==null?void 0:y.classList.toggle("is-open",d);(N=document.querySelector(".image-viewer-open"))==null||N.addEventListener("click",()=>v(!0)),(M=document.querySelector(".viewer-close"))==null||M.addEventListener("click",()=>v(!1)),y==null||y.addEventListener("click",d=>{d.target===y&&v(!1)}),document.querySelectorAll(".detail-recommendations [data-product-route]").forEach(d=>d.addEventListener("click",E=>{E.preventDefault(),$t(),a(`/product/${d.dataset.productRoute}`)}))},$e={address:{tr:`Merkez Mah. Örnek Cad. No: 10
İstanbul / Türkiye`,en:`Merkez District, Örnek Ave. No: 10
Istanbul / Türkiye`},phone:"+90 212 000 00 00",phoneHref:"+902120000000",email:"info@store.com"},qr={ios:"",android:""},x=(e,t,r,a)=>({id:e,label:{tr:t,en:r},href:a}),Cr=[{id:"corporate",title:{tr:"Kurumsal",en:"Corporate"},links:[x("about","Hakkımızda","About Us","/about"),x("mission","Misyonumuz","Our Mission","/mission"),x("stores","Mağazalarımız","Our Stores","/stores"),x("blog","Blog","Blog","/blog"),x("privacy","Gizlilik Bildirimi","Privacy Notice","/privacy")]},{id:"support",title:{tr:"Destek",en:"Support"},links:[x("contact","Bize Ulaşın","Contact Us","/contact"),x("returns","İade Şartları","Return Policy","/returns"),x("shipping","Sipariş ve Teslimat","Orders & Delivery","/shipping"),x("tracking","Sipariş Takip","Order Tracking","/tracking"),x("faq","Sıkça Sorulan Sorular","Frequently Asked Questions","/faq"),x("sitemap","Site Haritası","Sitemap","/sitemap")]}],Dr=`<svg aria-hidden="true" viewBox="0 0 24 24">
<path fill="currentColor" d="M17.1 12.5c0-2.8 2.3-4.1 2.4-4.2a5.1 5.1 0 0 0-4-2.2c-1.7-.2-3.3 1-4.1 1s-2.1-1-3.5-1C6.1 6.1 4.4 7.2 3.5 8.8c-2 3.4-.5 8.5 1.4 11.3.9 1.4 2 2.9 3.5 2.8 1.4-.1 1.9-.9 3.6-.9s2.2.9 3.6.9c1.5 0 2.5-1.4 3.4-2.8a12 12 0 0 0 1.5-3.1 4.8 4.8 0 0 1-3.4-4.5ZM14.4 4.3A4.8 4.8 0 0 0 15.5.8a4.9 4.9 0 0 0-3.2 1.7 4.5 4.5 0 0 0-1.1 3.3 4 4 0 0 0 3.2-1.5Z"/>
</svg>`,zr=`<svg aria-hidden="true" viewBox="0 0 24 24">
<path fill="currentColor" d="M3.6 2.4a2 2 0 0 0-.4 1.2v16.8c0 .5.1.9.4 1.2L13 12 3.6 2.4Zm10.7 10.9-2.2 2.2-7.2 6.3c.4.1.8 0 1.2-.2l11.1-6.3-2.9-2Zm4.1-2.3-2.9-1.7-2.4 2.5 2.4 2.5 2.9-1.7c1-.5 1-1.1 0-1.6ZM4.9 2.2l7.2 6.3 2.2 2.2 2.9-2L6.1 2.4c-.4-.2-.8-.3-1.2-.2Z"/>
</svg>`,Pr=e=>`<footer class="site-footer">
<div class="footer-main">
<a class="footer-brand footer-brand-logo" href="/" data-home-route aria-label="STORE">
<img src="/store-logo.svg" alt="STORE">
</a>
<div class="footer-columns">
${Cr.map(t=>`<nav class="footer-section" aria-label="${t.title[e]}">
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
${Dr}
<span>
<small>
${e==="tr"?"App Store’dan":"Download on the"}
</small>App Store</span>
</button>
<button data-app-store="android">
${zr}
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
${A("arrow",20)}
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
</footer>`,Ne=[{id:"o1",orderNumber:"AU-10254",date:"2026-08-12",itemCount:3,total:4799,status:"delivered",trackingNumber:"TRK10254"},{id:"o2",orderNumber:"AU-10318",date:"2026-08-16",itemCount:1,total:2490,status:"shipped",trackingNumber:"TRK10318"}],ft=[{id:"m1",subject:{tr:"Siparişiniz kargoya verildi",en:"Your order has shipped"},preview:{tr:"AU-10318 numaralı siparişiniz yola çıktı.",en:"Your order AU-10318 is on its way."},createdAt:"2026-08-16",isRead:!1,type:"order"},{id:"m2",subject:{tr:"İade talebiniz alındı",en:"Your return request was received"},preview:{tr:"Talebiniz inceleniyor.",en:"Your request is being reviewed."},createdAt:"2026-08-10",isRead:!1,type:"return"}],kt="aurea-addresses",Mr=[{id:"address-1",title:"Ev",firstName:"Zeynep",lastName:"Yılmaz",phone:"+90 555 000 00 00",addressLine:"Bağdat Caddesi No: 10 D: 4",city:"İstanbul",district:"Kadıköy",country:"Türkiye",isDefault:!0},{id:"address-2",title:"İş",firstName:"Zeynep",lastName:"Yılmaz",phone:"+90 555 000 00 00",addressLine:"Büyükdere Caddesi No: 22",city:"İstanbul",district:"Şişli",country:"Türkiye",isDefault:!1}],Le=()=>P.getJson(kt,Mr),De=e=>P.setJson(kt,e),Q={all:Le,add(e){const t=Le(),r=t.findIndex(a=>a.id===e.id);r>=0?t[r]={...t[r],...e,isDefault:t[r].isDefault}:t.push(e),De(t)},remove(e){De(Le().filter(t=>t.id!==e))},makeDefault(e){De(Le().map(t=>({...t,isDefault:t.id===e})))}},St="aurea-stock-watch",ze=()=>P.getJson(St,[]),Ze=e=>P.setJson(St,e),Ce={all:ze,add(e,t,r){const a=ze();a.some(s=>s.productId===e)||Ze([...a,{productId:e,desiredColor:t,desiredSize:r,createdAt:new Date().toISOString()}])},remove(e){Ze(ze().filter(t=>t.productId!==e))}},_e="aurea-user-profile",Or={id:"store-user",firstName:"Zeynep",lastName:"Yılmaz",email:"zeynep@store.com",phone:"+90 555 000 00 00"},ne={get(){return{...Or,...P.getJson(_e,{})}},save(e){P.setJson(_e,e)}},Kr=()=>location.pathname,I={tr:{title:"Profilim",hello:"Merhaba",intro:"Hesabınızı, siparişlerinizi ve tercihlerinizi buradan yönetebilirsiniz.",cart:"Sepetim",addresses:"Adreslerim",orders:"Geçmiş Siparişlerim",favorites:"Favorilerim",tracking:"Sipariş Takip",stock:"Stok Takip",messages:"Mesajlarım",profile:"Kişisel Bilgilerim",back:"Profilime Dön",signout:"Çıkış Yap"},en:{title:"My Account",hello:"Hello",intro:"Manage your account, orders and preferences here.",cart:"My Cart",addresses:"My Addresses",orders:"Order History",favorites:"My Favorites",tracking:"Order Tracking",stock:"Stock Alerts",messages:"My Messages",profile:"Personal Information",back:"Back to Account",signout:"Sign Out"}},Nr=e=>{const t=I[e];return[{id:"cart",title:t.cart,desc:`${K.count()} ${e==="tr"?"ürün":"items"}`,icon:"bag",path:"/cart"},{id:"addresses",title:t.addresses,desc:`${Q.all().length} ${e==="tr"?"kayıtlı adres":"saved addresses"}`,icon:"truck",path:"/account/addresses"},{id:"orders",title:t.orders,desc:`${Ne.length} ${e==="tr"?"sipariş":"orders"}`,icon:"bag",path:"/account/orders"},{id:"favorites",title:t.favorites,desc:`${te.all().length} ${e==="tr"?"ürün":"items"}`,icon:"heart",path:"/favorites"},{id:"tracking",title:t.tracking,desc:`${Ne.filter(r=>r.status==="shipped").length} ${e==="tr"?"aktif sipariş":"active order"}`,icon:"truck",path:"/tracking"},{id:"stock",title:t.stock,desc:`${Ce.all().length} ${e==="tr"?"ürün":"items"}`,icon:"message",path:"/account/stock-alerts"},{id:"messages",title:t.messages,desc:`${ft.filter(r=>!r.isRead).length} ${e==="tr"?"okunmamış":"unread"}`,icon:"message",path:"/account/messages"},{id:"profile",title:t.profile,desc:e==="tr"?"Hesap bilgilerini yönet":"Manage account details",icon:"user",path:"/account/profile"}]},V=(e,t,r)=>`<div class="account-subhead">
<a href="/account" data-account-route="/account">← ${I[t].back}
</a>
<h1>
${e}
</h1>
</div>
${r}`,xe=(e,t,r,a)=>`<span class="sale-price-pair">
${e.originalPrice&&e.originalPrice>e.price?`<s>
${W(e.originalPrice*t,a,r)}
</s>`:""}
<strong>
${W(e.price*t,a,r)}
</strong>
</span>`,Be=(e,t,r)=>{const a=e.reduce((i,{line:c,product:n})=>i+((n==null?void 0:n.price)??0)*c.quantity,0),s=e.reduce((i,{line:c,product:n})=>i+((n==null?void 0:n.originalPrice)??(n==null?void 0:n.price)??0)*c.quantity,0);return`<span class="sale-price-pair total-price-pair">
${s>a?`<s>
${W(s,r,t)}
</s>`:""}
<strong>
${W(a,r,t)}
</strong>
</span>`},Br=e=>V(I[e].addresses,e,`<div class="address-grid">
${Q.all().map(t=>`<article class="address-card">
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
</form>`),Ir=(e,t)=>V(I[e].orders,e,`<div class="account-list">
${Ne.map(r=>`<article class="order-row">
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
${W(r.total,t,e)}
</strong>
</div>
<button data-demo-action>
${e==="tr"?"DETAYLAR":"DETAILS"} →</button>
</article>`).join("")}
</div>`),Yr=(e,t)=>{const r=Y.filter(a=>te.has(a.id));return V(I[e].favorites,e,r.length?`<div class="favorite-product-grid">
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
${xe(a,1,e,t)}${a.stock>0?`<span>
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
</div>`)},Fr=(e,t)=>{const r=K.all().map((a,s)=>({line:a,index:s,product:Y.find(i=>i.id===a.productId)})).filter(a=>a.product);return r.length?V(I[e].cart,e,`<div class="cart-layout">
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
${xe(i,a.quantity,e,t)}
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
${Be(r,e,t)}
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
${Be(r,e,t)}
</footer>
<a class="checkout-link" href="/checkout" data-account-route="/checkout">
${e==="tr"?"ÖDEMEYE GEÇ":"PROCEED TO CHECKOUT"}
</a>
</aside>
</div>`):V(I[e].cart,e,`<div class="account-empty">
<h2>
${e==="tr"?"Sepetiniz şu anda boş.":"Your cart is currently empty."}
</h2>
<a href="/category/all" data-category-route="all">
${e==="tr"?"ALIŞVERİŞE BAŞLA":"START SHOPPING"}
</a>
</div>`)},xr=(e,t)=>{const r=Q.all().find(i=>i.isDefault)??Q.all()[0],a=ne.get(),s=K.all().map(i=>({line:i,product:Y.find(c=>c.id===i.productId)})).filter(i=>i.product);return s.length?`<div class="checkout-head">
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
${xe(c,i.quantity,e,t)}
</div>`).join("")}
<div class="checkout-total">
<span>
${e==="tr"?"Toplam":"Total"}
</span>
${Be(s,e,t)}
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
</div>`:V(e==="tr"?"Ödeme":"Checkout",e,`<div class="account-empty">
<h2>
${e==="tr"?"Ödeme için sepetinize ürün ekleyin.":"Add products to your cart before checkout."}
</h2>
<a href="/category/all" data-category-route="all">
${e==="tr"?"ÜRÜNLERİ KEŞFET":"EXPLORE PRODUCTS"}
</a>
</div>`)},jr=e=>{const t=Ce.all().map(r=>({w:r,p:Y.find(a=>a.id===r.productId)})).filter(r=>r.p);return V(I[e].stock,e,t.length?`<div class="account-product-list">
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
</div>`)},Ur=e=>V(I[e].messages,e,`<div class="account-list">
${ft.map(t=>`<article class="message-row ${t.isRead?"":"is-unread"}">
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
</div>`),Gr=e=>{const t=ne.get();return V(I[e].profile,e,`<form class="profile-form">
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
</form>`)},Hr=e=>V(I[e].tracking,e,`<div class="tracking-box">
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
</div>`),Wr=(e,t)=>{var i;const r=ne.get();let a="";const s=Kr();if(s==="/account"){const c=I[e];a=`<header class="account-hero">
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
${Nr(e).map(n=>`<a href="${n.path}" data-account-route="${n.path}" class="account-card">
<span>
${A(n.icon,27)}
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
</button>`}else{const c={"/account/addresses":()=>Br(e),"/account/orders":()=>Ir(e,t),"/favorites":()=>Yr(e,t),"/account/stock-alerts":()=>jr(e),"/account/messages":()=>Ur(e),"/account/profile":()=>Gr(e),"/tracking":()=>Hr(e),"/cart":()=>Fr(e,t),"/checkout":()=>xr(e,t)};a=((i=c[s])==null?void 0:i.call(c))??a}return`${Ee("",e)}
<main class="account-page">
${a}
</main>`},Vr=(e,t,r,a)=>{var s,i,c,n,m;document.querySelectorAll("[data-account-route]").forEach(u=>u.addEventListener("click",y=>{y.preventDefault(),y.stopImmediatePropagation(),a(u.dataset.accountRoute)})),(s=document.querySelector(".signout-btn"))==null||s.addEventListener("click",()=>r(e==="tr"?"Oturumunuz açık bırakıldı.":"Your session remains active.")),(i=document.querySelector(".new-address-trigger"))==null||i.addEventListener("click",()=>{const u=document.querySelector(".address-form");u&&(u.hidden=!1)}),(c=document.querySelector(".address-form"))==null||c.addEventListener("submit",u=>{u.preventDefault();const y=new FormData(u.currentTarget);Q.add({id:`address-${Date.now()}`,title:String(y.get("title")),firstName:ne.get().firstName,lastName:ne.get().lastName,phone:String(y.get("phone")),addressLine:String(y.get("address")),city:String(y.get("city")),district:String(y.get("district")),country:"Türkiye",isDefault:!1}),r(e==="tr"?"Adresiniz kaydedildi.":"Address saved."),t()}),document.querySelectorAll("[data-delete-address]").forEach(u=>u.addEventListener("click",()=>{Q.remove(u.dataset.deleteAddress),t()})),document.querySelectorAll("[data-default-address]").forEach(u=>u.addEventListener("click",()=>{Q.makeDefault(u.dataset.defaultAddress),t()})),document.querySelectorAll("[data-remove-favorite]").forEach(u=>u.addEventListener("click",y=>{y.preventDefault(),y.stopImmediatePropagation(),te.remove(u.dataset.removeFavorite),t()})),document.querySelectorAll("[data-remove-stock]").forEach(u=>u.addEventListener("click",()=>{Ce.remove(u.dataset.removeStock),t()})),(n=document.querySelector(".profile-form"))==null||n.addEventListener("submit",u=>{u.preventDefault();const y=new FormData(u.currentTarget);ne.save({id:"store-user",firstName:String(y.get("firstName")),lastName:String(y.get("lastName")),email:String(y.get("email")),phone:String(y.get("phone")),birthDate:String(y.get("birthDate"))}),r(e==="tr"?"Bilgileriniz kaydedildi.":"Your information was saved.")}),(m=document.querySelector(".tracking-box form"))==null||m.addEventListener("submit",u=>{u.preventDefault(),r(e==="tr"?"Sipariş durumu güncellendi.":"Order status updated.")}),document.querySelectorAll("[data-demo-action]").forEach(u=>u.addEventListener("click",()=>r(e==="tr"?"Sipariş detayları görüntüleniyor.":"Order details are displayed.")))},Jr=()=>{document.querySelectorAll(".catalog-gallery").forEach(e=>{const t=e.closest(".catalog-card"),r=[...(t==null?void 0:t.querySelectorAll(".catalog-gallery-dot"))??[]],a=[...(t==null?void 0:t.querySelectorAll(".catalog-gallery-arrow"))??[]];if(!r.length)return;let s=0;const i=c=>{s=Math.max(0,Math.min(r.length-1,c)),r.forEach((n,m)=>{const u=m===s;n.classList.toggle("is-active",u)}),a.forEach(n=>{const m=Number(n.dataset.galleryDirection);n.disabled=m<0&&s===0||m>0&&s===r.length-1}),e.scrollTo({left:e.clientWidth*s,behavior:"smooth"})};a.forEach(c=>c.addEventListener("click",()=>i(s+Number(c.dataset.galleryDirection))))})},Et=document.querySelector("#app");if(!Et)throw new Error("Application root was not found.");let g=P.get("aurea-language","tr",["tr","en"]),re=P.get("aurea-currency","TRY",["TRY","USD","EUR"]),Pe=0,Me=0,Xe=()=>{};const B=()=>{var n,m,u,y;document.documentElement.lang=g,document.body.classList.remove("menu-open","mega-menu-open"),K.prune(new Set(Y.map(v=>v.id)));const e=location.pathname.startsWith("/category/"),t=location.pathname==="/compare",r=location.pathname.startsWith("/product/"),a=location.pathname.startsWith("/account")||["/cart","/checkout","/favorites","/tracking"].includes(location.pathname);r||(document.title="STORE | Modern Essentials");const s=e?yr(g,re):t?$r(g,re):r?Lr(g,re):a?Wr(g,re):`<main>
${Gt(g)}${Ht(g)}
</main>`;document.body.classList.toggle("home-view",location.pathname==="/"),document.body.classList.toggle("catalog-view",e||t||r||a),document.body.classList.toggle("product-view",r),document.body.classList.toggle("account-view",a);const i=location.pathname.split("/").filter(Boolean),c=i[0]==="category"?i[1]??null:null;if(Et.innerHTML=`${Tt(g,re,K.count())}${Ut(g,re)}${s}${Pr(g)}${Wt(g)}${Vt()}`,document.querySelectorAll("[data-mega-trigger]").forEach(v=>{const w=c!==null&&v.dataset.categorySlug===c;v.classList.toggle("is-active",w),w?v.setAttribute("aria-current","page"):v.removeAttribute("aria-current")}),Zr(),Jr(),Xr(),e&&vr(g,B,X,G),r&&Rr(g,B,X,G),a){Vr(g,B,X,G),document.querySelectorAll("[data-cart-minus]").forEach(p=>p.addEventListener("click",()=>{const b=Number(p.dataset.cartMinus),L=K.all()[b];L&&(K.setQuantity(b,L.quantity-1),B())})),document.querySelectorAll("[data-cart-plus]").forEach(p=>p.addEventListener("click",()=>{const b=Number(p.dataset.cartPlus),L=K.all()[b];L&&(K.setQuantity(b,L.quantity+1),B())})),document.querySelectorAll("[data-cart-remove]").forEach(p=>p.addEventListener("click",()=>{K.remove(Number(p.dataset.cartRemove)),B()}));const v=document.querySelectorAll('input[name="payment"]'),w=document.querySelector(".card-fields"),$=()=>{var b;const p=((b=document.querySelector('input[name="payment"]:checked'))==null?void 0:b.value)==="card";w&&(w.hidden=!p,w.querySelectorAll("input").forEach(L=>L.required=p))};v.forEach(p=>p.addEventListener("change",$)),$(),(n=document.querySelector('input[name="cardNumber"]'))==null||n.addEventListener("input",p=>{const b=p.currentTarget;b.value=b.value.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim()}),(m=document.querySelector('input[name="expiry"]'))==null||m.addEventListener("input",p=>{const b=p.currentTarget,L=b.value.replace(/\D/g,"").slice(0,4);b.value=L.length>2?`${L.slice(0,2)}/${L.slice(2)}`:L}),(u=document.querySelector(".checkout-form"))==null||u.addEventListener("submit",p=>{p.preventDefault();const b=p.currentTarget;if(!b.reportValidity())return;b.hidden=!0;const L=document.querySelector(".checkout-success");L&&(L.hidden=!1),scrollTo({top:0,behavior:"smooth"})})}if(a){const v=document.querySelector(".address-form");document.querySelectorAll("[data-edit-address]").forEach(w=>w.addEventListener("click",()=>{const $=Q.all().find(p=>p.id===w.dataset.editAddress);!$||!v||(v.hidden=!1,v.elements.namedItem("id").value=$.id,v.elements.namedItem("title").value=$.title,v.elements.namedItem("city").value=$.city,v.elements.namedItem("district").value=$.district,v.elements.namedItem("phone").value=$.phone,v.elements.namedItem("address").value=$.addressLine,v.querySelector("h2").textContent=g==="tr"?"Adresi Düzenle":"Edit Address",v.querySelector(":scope>button").textContent=g==="tr"?"DEĞİŞİKLİKLERİ KAYDET":"SAVE CHANGES",v.scrollIntoView({behavior:"smooth",block:"start"}))})),(y=document.querySelector(".new-address-trigger"))==null||y.addEventListener("click",()=>{v&&(v.reset(),v.elements.namedItem("id").value="",v.querySelector("h2").textContent=g==="tr"?"Yeni Adres":"New Address",v.querySelector(":scope>button").textContent=g==="tr"?"ADRESİ KAYDET":"SAVE ADDRESS")}),v==null||v.addEventListener("submit",w=>{const $=w.currentTarget,p=$.elements.namedItem("id").value;if(!p)return;w.preventDefault(),w.stopImmediatePropagation();const b=new FormData($),L=ne.get();Q.add({id:p,title:String(b.get("title")),firstName:L.firstName,lastName:L.lastName,phone:String(b.get("phone")),addressLine:String(b.get("address")),city:String(b.get("city")),district:String(b.get("district")),country:"Türkiye",isDefault:!1}),X(g==="tr"?"Adresiniz güncellendi.":"Address updated."),B()},{capture:!0})}},G=e=>{history.pushState({},"",e),e.startsWith("/category/")&&br(),e.startsWith("/product/")&&$t(),B(),scrollTo({top:0,behavior:"smooth"})},X=e=>{const t=document.querySelector("#toast");t&&(t.textContent=e??(g==="tr"?"Bu bölüm yakında eklenecek.":"This section is coming soon."),t.classList.add("is-visible"),window.setTimeout(()=>t.classList.remove("is-visible"),2600))},J=e=>{var i;const t=document.querySelector("#sidebar"),r=document.querySelector("#sidebar-overlay"),a=document.querySelector("#menu-trigger");if(!t||!r||!a)return;const s=matchMedia("(max-width: 767px)").matches;t.classList.toggle("is-open",e),r.classList.toggle("is-open",e),t.setAttribute("aria-hidden",String(!e)),a.setAttribute("aria-expanded",String(e)),document.body.classList.toggle("menu-open",e),e&&s&&((i=t.querySelector("button"))==null||i.focus())},fe=e=>{const t=document.querySelector("#mobile-search");t&&(t.classList.toggle("is-open",e),e&&window.setTimeout(()=>{var r;return(r=t.querySelector("input"))==null?void 0:r.focus()},120))},Te=e=>{var a;const t=document.querySelector(".support-panel"),r=document.querySelector(".sidebar-support-trigger");!t||!r||(t.classList.toggle("is-open",e),t.setAttribute("aria-hidden",String(!e)),r.setAttribute("aria-expanded",String(e)),e&&((a=t.querySelector("input"))==null||a.focus()))},gt=(e,t=[])=>e.flatMap(r=>{const a=[...t,r.slug];return[{node:r,route:a.join("/")},...gt(r.children??[],a)]}),Qe=e=>{const t=e.closest(".search-shell"),r=t==null?void 0:t.querySelector(".search-results"),a=t==null?void 0:t.querySelector(".search-clear");if(!r)return;const s=e.value.trim(),i=s.toLocaleLowerCase(g==="tr"?"tr-TR":"en-US");if(a==null||a.classList.toggle("is-visible",!!s),!i){r.classList.remove("is-open"),r.innerHTML="";return}const c=Y.filter(m=>`${m.name[g]} ${m.brand} ${m.categoryId}`.toLocaleLowerCase(g==="tr"?"tr-TR":"en-US").includes(i)).slice(0,5),n=gt(ee).filter(({node:m})=>m.name[g].toLocaleLowerCase(g==="tr"?"tr-TR":"en-US").includes(i)).slice(0,5);r.innerHTML=c.length||n.length?`${c.length?`<p class="result-label">
${g==="tr"?"ÜRÜNLER":"PRODUCTS"}
</p>
${c.map(m=>`<a href="/product/${m.slug}" data-search-product="${m.slug}">
<span>
${m.name[g]}
<small>
${m.brand}
</small>
</span>
<span>→</span>
</a>`).join("")}`:""}${n.length?`<p class="result-label">
${g==="tr"?"KATEGORİLER":"CATEGORIES"}
</p>
<div class="category-results">
${n.map(({node:m,route:u})=>`<a href="/category/${u}" data-search-category="${u}">
${m.name[g]}
</a>`).join("")}
</div>`:""}`:`<div class="empty-result">
${g==="tr"?"Aramanızla eşleşen sonuç bulunamadı.":"No results matched your search."}
</div>`,r.classList.add("is-open"),r.querySelectorAll("[data-search-product]").forEach(m=>m.addEventListener("click",u=>{u.button!==0||u.metaKey||u.ctrlKey||u.shiftKey||u.altKey||(u.preventDefault(),fe(!1),G(`/product/${m.dataset.searchProduct}`))})),r.querySelectorAll("[data-search-category]").forEach(m=>m.addEventListener("click",u=>{u.button!==0||u.metaKey||u.ctrlKey||u.shiftKey||u.altKey||(u.preventDefault(),fe(!1),G(`/category/${m.dataset.searchCategory}`))}))};function Zr(){var L,N,M,d,E,q,T,O,j,f,k,C,F,pe,he;Xe(),Xe=_r();const e=document.querySelector(".site-header"),t=document.querySelector(".category-nav"),r=document.querySelector(".back-to-top"),a=()=>{var S;const l=Math.max(scrollY,0),h=l>Me;if(h&&((S=document.querySelector(".mega-overlay.is-open"))==null||S.click()),e==null||e.classList.toggle("is-scrolled",l>24),r==null||r.classList.toggle("is-scroll-visible",l>20),t){const z=h&&l>140&&!document.body.classList.contains("menu-open");e==null||e.classList.toggle("scroll-hidden",z),t.classList.toggle("scroll-hidden",z)}else e==null||e.classList.remove("scroll-hidden");Me=l};Me=Math.max(scrollY,0),a(),window.onscroll=a;const s=document.querySelector("#menu-trigger");s==null||s.addEventListener("click",()=>J(s.getAttribute("aria-expanded")!=="true")),s==null||s.addEventListener("mouseenter",()=>{matchMedia("(hover: hover) and (min-width: 768px)").matches&&(clearTimeout(Pe),J(!0))});const i=document.querySelector("#sidebar");i==null||i.addEventListener("mouseenter",()=>clearTimeout(Pe)),[s,i].forEach(l=>l==null?void 0:l.addEventListener("mouseleave",()=>{matchMedia("(hover: hover) and (min-width: 768px)").matches&&(Pe=window.setTimeout(()=>J(!1),300))})),document.querySelectorAll(".sidebar-category-toggle").forEach(l=>l.addEventListener("click",()=>{var S;const h=l.getAttribute("aria-expanded")==="true";l.setAttribute("aria-expanded",String(!h)),(S=l.parentElement)==null||S.classList.toggle("is-open",!h)}));let c=0,n=null,m=null;const u=(l=!1)=>{var h;clearTimeout(c),n==null||n.classList.remove("is-open"),n==null||n.setAttribute("aria-hidden","true"),m==null||m.setAttribute("aria-expanded","false"),l&&(m==null||m.focus()),(h=document.querySelector(".mega-overlay"))==null||h.classList.remove("is-open"),document.body.classList.remove("mega-menu-open"),n=null,m=null},y=()=>{clearTimeout(c),c=window.setTimeout(()=>{!(n!=null&&n.contains(document.activeElement))&&!(m!=null&&m.contains(document.activeElement))&&u()},700)},v=()=>clearTimeout(c);document.querySelectorAll("[data-mega-trigger]").forEach(l=>{l.addEventListener("click",()=>{var z;const h=document.querySelector(`[data-mega-panel="${l.dataset.megaTrigger}"]`),S=l.getAttribute("aria-expanded")==="true";u(),!S&&h&&(n=h,m=l,l.setAttribute("aria-expanded","true"),h.classList.add("is-open"),h.setAttribute("aria-hidden","false"),(z=document.querySelector(".mega-overlay"))==null||z.classList.add("is-open"),document.body.classList.add("mega-menu-open"))}),l.addEventListener("pointerenter",v),l.addEventListener("pointerleave",y)}),document.querySelectorAll("[data-mega-panel]").forEach(l=>{l.addEventListener("pointerenter",v),l.addEventListener("pointerleave",y)});const w=document.querySelector(".category-nav");(L=document.querySelector(".mega-overlay"))==null||L.addEventListener("click",()=>u()),(N=document.querySelector(".sidebar-close"))==null||N.addEventListener("click",()=>J(!1)),(M=document.querySelector("#sidebar-overlay"))==null||M.addEventListener("click",()=>J(!1)),(d=document.querySelector(".mobile-search-trigger"))==null||d.addEventListener("click",()=>fe(!0)),(E=document.querySelector(".mobile-search-close"))==null||E.addEventListener("click",()=>fe(!1)),document.querySelectorAll(".search-shell input").forEach(l=>l.addEventListener("input",()=>Qe(l))),document.querySelectorAll(".search-clear").forEach(l=>l.addEventListener("click",()=>{var S;const h=(S=l.parentElement)==null?void 0:S.querySelector("input");h&&(h.value="",Qe(h),h.focus())}));const $=document.querySelector(".notify-dialog");if(document.querySelectorAll(".notify-btn").forEach(l=>l.addEventListener("click",()=>{var S;const h=(S=l.closest("[data-product-id]"))==null?void 0:S.dataset.productId;h&&$&&($.dataset.productId=h)})),document.body.classList.contains("product-view")&&$){const l=Y.find(h=>h.slug===location.pathname.split("/").at(-1));l&&($.dataset.productId=l.id)}(q=$==null?void 0:$.querySelector("form"))==null||q.addEventListener("submit",()=>{const l=$.dataset.productId;l&&Ce.add(l)}),document.querySelectorAll("#currency,#sidebar-currency").forEach(l=>l.addEventListener("change",h=>{re=h.target.value,P.set("aurea-currency",re),B()}));const p=()=>{g=g==="tr"?"en":"tr",P.set("aurea-language",g),B()};(T=document.querySelector(".language-toggle"))==null||T.addEventListener("click",p),(O=document.querySelector(".sidebar-lang"))==null||O.addEventListener("click",p),document.querySelectorAll(".route-btn,[data-route]").forEach(l=>l.addEventListener("click",h=>{l.tagName==="A"&&h.preventDefault(),J(!1);const S=l.dataset.route,z={women:"women",men:"men",kids:"kids",accessories:"accessories",sale:"sale"},U={account:"/account",cart:"/cart",favorites:"/favorites",tracking:"/tracking"};S&&z[S]?G(`/category/${z[S]}`):S&&U[S]?G(U[S]):X()})),document.querySelectorAll("[data-category-route]").forEach(l=>l.addEventListener("click",h=>{if(h.button!==0||h.metaKey||h.ctrlKey||h.shiftKey||h.altKey)return;const S=l.dataset.categoryRoute;S&&(h.preventDefault(),clearTimeout(c),u(),J(!1),G(`/category/${S}`))})),document.querySelectorAll("[data-home-route]").forEach(l=>l.addEventListener("click",h=>{h.preventDefault(),G("/")})),document.querySelectorAll("[data-product-route]").forEach(l=>l.addEventListener("click",h=>{h.preventDefault(),h.stopImmediatePropagation(),G(`/product/${l.dataset.productRoute}`)}));const b=document.querySelector(".sidebar-support-trigger");if(b==null||b.addEventListener("click",()=>{J(!1),Te(!0)}),(j=document.querySelector(".support-close"))==null||j.addEventListener("click",()=>Te(!1)),(f=document.querySelector(".support-form"))==null||f.addEventListener("submit",l=>{l.preventDefault(),X(g==="tr"?"Mesajınız alındı.":"Your message was received."),Te(!1)}),document.querySelectorAll("[data-footer-route]").forEach(l=>l.addEventListener("click",h=>{h.preventDefault(),X(g==="tr"?"Bu sayfa sonraki geliştirme aşamasında eklenecek.":"This page will be added in the next development phase.")})),document.querySelectorAll("[data-app-store]").forEach(l=>l.addEventListener("click",()=>{const h=l.dataset.appStore==="ios"?"ios":"android",S=qr[h];S?location.assign(S):X(h==="ios"?g==="tr"?"Mobil uygulamamız yakında App Store’da.":"Our mobile app is coming soon to the App Store.":g==="tr"?"Mobil uygulamamız yakında Google Play’de.":"Our mobile app is coming soon to Google Play.")})),(k=document.querySelector(".back-to-top"))==null||k.addEventListener("click",()=>scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})),document.querySelectorAll(".footer-section-toggle").forEach(l=>l.addEventListener("click",()=>{var S;const h=l.getAttribute("aria-expanded")==="true";l.setAttribute("aria-expanded",String(!h)),l.querySelector("i").textContent=h?"+":"−",(S=l.parentElement)==null||S.classList.toggle("is-open",!h)})),document.body.classList.contains("product-view")){const l=document.querySelector(".notify-dialog");(C=document.querySelector(".notify-close"))==null||C.addEventListener("click",()=>l==null?void 0:l.close()),(F=l==null?void 0:l.querySelector("form"))==null||F.addEventListener("submit",U=>{U.preventDefault(),U.currentTarget.reportValidity()&&(l.close(),X(g==="tr"?"Talebiniz alındı. Ürün tekrar stoklara geldiğinde bilgilendirileceksiniz.":"Request received. We’ll notify you when it is back."))});let h=0;const S=["0% 0%","100% 0%","0% 100%","100% 100%"],z=U=>{h=(h+U+S.length)%S.length;const ye=document.querySelector(".image-viewer img");ye&&(ye.style.transformOrigin=S[h])};(pe=document.querySelector(".viewer-prev"))==null||pe.addEventListener("click",()=>z(-1)),(he=document.querySelector(".viewer-next"))==null||he.addEventListener("click",()=>z(1))}document.onclick=l=>{const h=l.target;document.querySelectorAll(".search-results.is-open").forEach(S=>{var z;(z=S.parentElement)!=null&&z.contains(h)||S.classList.remove("is-open")}),n&&!(w!=null&&w.contains(h))&&u()},document.onkeydown=l=>{var h,S,z,U;l.key==="Escape"&&(u(!0),J(!1),fe(!1),Te(!1),document.querySelectorAll(".search-results").forEach(ye=>ye.classList.remove("is-open")),(h=document.querySelector(".filter-close"))==null||h.click(),(S=document.querySelector(".notify-close"))==null||S.click(),(z=document.querySelector(".viewer-close"))==null||z.click(),(U=document.querySelector(".size-guide-close"))==null||U.click())}}function _r(){if(!document.body.classList.contains("home-view"))return()=>{};const e=[...document.querySelectorAll("main > .hero, main > .campaign-section, main > .gender-campaign")],t=document.querySelector(".site-footer"),r=t?[...e,t]:e;if(e.length<2)return()=>{};let a=!1,s=!0,i=0,c=0,n=0,m=null;const u=matchMedia("(prefers-reduced-motion: reduce)").matches,y=d=>d.getBoundingClientRect().top+scrollY,v=()=>{let d=0,E=Number.POSITIVE_INFINITY;return r.forEach((q,T)=>{const O=Math.abs(y(q)-scrollY);O<E&&(d=T,E=O)}),d},w=d=>{if(a||d<0||d>=r.length)return;const E=scrollY,q=y(r[d]);if(Math.abs(q-E)<2)return;a=!0,s=!1;const T=performance.now(),O=u?80:200,j=k=>k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2,f=k=>{const C=Math.min((k-T)/O,1);scrollTo({top:E+(q-E)*j(C),behavior:"auto"}),C<1?i=requestAnimationFrame(f):a=!1};i=requestAnimationFrame(f)},$=d=>{const E=v(),q=t?y(t):Number.POSITIVE_INFINITY;if(t&&scrollY>=q+2&&(d>0||scrollY>q+24))return!1;const T=E+d;return T<0||T>=r.length?!1:(w(T),!0)},p=d=>{if(d.ctrlKey||document.body.classList.contains("menu-open")||document.querySelector(".mega-menu.is-open"))return;const E=t?y(t):Number.POSITIVE_INFINITY;if(t&&scrollY>E+24&&d.deltaY>0)return;d.preventDefault();const q=performance.now(),T=Math.abs(d.deltaY),O=q-c>90||T>18&&T>Math.max(n*2.2,18);c=q,n=T,!(a||T<4)&&(!s&&!O||(s=!0,s=!1,$(d.deltaY>0?1:-1)))},b=d=>{var E;document.body.classList.contains("menu-open")||document.querySelector(".mega-menu.is-open")||(m=((E=d.touches[0])==null?void 0:E.clientY)??null)},L=d=>{m!==null&&!document.body.classList.contains("menu-open")&&d.preventDefault()},N=d=>{var T;if(m===null||a)return;const E=((T=d.changedTouches[0])==null?void 0:T.clientY)??m,q=m-E;m=null,!(Math.abs(q)<42)&&$(q>0?1:-1)},M=d=>{const E=d.target;if(E!=null&&E.matches('input, textarea, select, button, [contenteditable="true"]'))return;const q=d.key==="ArrowDown"||d.key==="PageDown"||d.key===" "?1:d.key==="ArrowUp"||d.key==="PageUp"?-1:0;q&&(d.preventDefault(),!d.repeat&&!a&&$(q))};return addEventListener("wheel",p,{passive:!1}),addEventListener("touchstart",b,{passive:!0}),addEventListener("touchmove",L,{passive:!1}),addEventListener("touchend",N,{passive:!0}),addEventListener("keydown",M),()=>{removeEventListener("wheel",p),removeEventListener("touchstart",b),removeEventListener("touchmove",L),removeEventListener("touchend",N),removeEventListener("keydown",M),cancelAnimationFrame(i)}}function Xr(){if(matchMedia("(prefers-reduced-motion: reduce)").matches){document.querySelectorAll(".reveal").forEach(t=>t.classList.add("is-visible"));return}const e=new IntersectionObserver(t=>t.forEach(r=>{r.isIntersecting&&(r.target.classList.add("is-visible"),e.unobserve(r.target))}),{threshold:.12});document.querySelectorAll(".reveal").forEach(t=>e.observe(t))}B();addEventListener("popstate",()=>B());
