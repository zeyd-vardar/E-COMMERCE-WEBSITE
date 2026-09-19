import './styles/index.css';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { LiveSupport } from './components/LiveSupport';
import { Toast } from './components/Toast';
import { storage } from './utils/storage';
import type { Currency, Language } from './types';
import { CategoryPage, initCategoryPage, resetCategoryState } from './pages/CategoryPage';
import { ComparePage } from './pages/ComparePage';
import { cartService } from './services/cartService';
import { catalogProducts } from './data/allProducts';
import { ProductDetailPage, initProductDetail, resetProductState } from './pages/ProductDetailPage';
import { Footer } from './components/Footer';
import { appLinks } from './config/company';
import { AccountPage, initAccountPage } from './pages/AccountPage';
import { stockWatchService } from './services/stockWatchService';
import { addressService } from './services/addressService';
import { userService } from './services/userService';
import { categoryTree } from './data/categories';
import type { CategoryNode } from './types';
import { initCatalogGalleries } from './utils/catalogGallery';
import { appRoute, currentRoute } from './utils/router';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Application root was not found.');
let language = storage.get<Language>('aurea-language', 'tr', ['tr', 'en']);
let currency = storage.get<Currency>('aurea-currency', 'TRY', ['TRY', 'USD', 'EUR']);
let sidebarTimer = 0;
let lastScrollPosition = 0;
let homeSectionScrollCleanup = () => {};

const redirectedRoute = new URLSearchParams(location.search).get('redirect');
if (redirectedRoute?.startsWith('/') && !redirectedRoute.startsWith('//')) {
  history.replaceState({}, '', appRoute(redirectedRoute));
}

const render = () => {
  document.documentElement.lang = language;
  document.body.classList.remove('menu-open', 'mega-menu-open');
  cartService.prune(new Set(catalogProducts.map((product) => product.id)));
  const route = currentRoute();
  const isCategory = route.startsWith('/category/');
  const isCompare = route === '/compare';
  const isProduct = route.startsWith('/product/');
  const isAccount =
    route.startsWith('/account') ||
    ['/cart', '/checkout', '/favorites', '/tracking'].includes(route);
  if (!isProduct) document.title = 'STORE | Modern Essentials';
  const content = isCategory
    ? CategoryPage(language, currency)
    : isCompare
      ? ComparePage(language, currency)
      : isProduct
        ? ProductDetailPage(language, currency)
        : isAccount
          ? AccountPage(language, currency)
          : `<main>
${Hero(language)}${Products(language, currency)}
</main>`;
  document.body.classList.toggle('home-view', route === '/');
  document.body.classList.toggle('catalog-view', isCategory || isCompare || isProduct || isAccount);
  document.body.classList.toggle('product-view', isProduct);
  document.body.classList.toggle('account-view', isAccount);
  const routeSegments = route.split('/').filter(Boolean);
  const activeCategorySlug = routeSegments[0] === 'category' ? (routeSegments[1] ?? null) : null;
  app.innerHTML = `${Header(language, currency, cartService.count())}${Sidebar(language, currency)}${content}${Footer(language)}${LiveSupport(language)}${Toast()}`;
  document.querySelectorAll<HTMLElement>('[data-mega-trigger]').forEach((trigger) => {
    const active =
      activeCategorySlug !== null && trigger.dataset.categorySlug === activeCategorySlug;
    trigger.classList.toggle('is-active', active);
    if (active) trigger.setAttribute('aria-current', 'page');
    else trigger.removeAttribute('aria-current');
  });
  bindEvents();
  initCatalogGalleries();
  observeReveals();
  if (isCategory) initCategoryPage(language, render, showToast, navigate);
  if (isProduct) initProductDetail(language, render, showToast, navigate);
  if (isAccount) {
    initAccountPage(language, render, showToast, navigate);
    document.querySelectorAll<HTMLElement>('[data-cart-minus]').forEach((button) =>
      button.addEventListener('click', () => {
        const index = Number(button.dataset.cartMinus),
          line = cartService.all()[index];
        if (line) {
          cartService.setQuantity(index, line.quantity - 1);
          render();
        }
      }),
    );
    document.querySelectorAll<HTMLElement>('[data-cart-plus]').forEach((button) =>
      button.addEventListener('click', () => {
        const index = Number(button.dataset.cartPlus),
          line = cartService.all()[index];
        if (line) {
          cartService.setQuantity(index, line.quantity + 1);
          render();
        }
      }),
    );
    document.querySelectorAll<HTMLElement>('[data-cart-remove]').forEach((button) =>
      button.addEventListener('click', () => {
        cartService.remove(Number(button.dataset.cartRemove));
        render();
      }),
    );
    const paymentOptions = document.querySelectorAll<HTMLInputElement>('input[name="payment"]'),
      cardFields = document.querySelector<HTMLElement>('.card-fields');
    const updatePayment = () => {
      const card =
        document.querySelector<HTMLInputElement>('input[name="payment"]:checked')?.value === 'card';
      if (cardFields) {
        cardFields.hidden = !card;
        cardFields
          .querySelectorAll<HTMLInputElement>('input')
          .forEach((input) => (input.required = card));
      }
    };
    paymentOptions.forEach((input) => input.addEventListener('change', updatePayment));
    updatePayment();
    document
      .querySelector<HTMLInputElement>('input[name="cardNumber"]')
      ?.addEventListener('input', (event) => {
        const input = event.currentTarget as HTMLInputElement;
        input.value = input.value
          .replace(/\D/g, '')
          .slice(0, 16)
          .replace(/(.{4})/g, '$1 ')
          .trim();
      });
    document
      .querySelector<HTMLInputElement>('input[name="expiry"]')
      ?.addEventListener('input', (event) => {
        const input = event.currentTarget as HTMLInputElement,
          digits = input.value.replace(/\D/g, '').slice(0, 4);
        input.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
      });
    document
      .querySelector<HTMLFormElement>('.checkout-form')
      ?.addEventListener('submit', (event) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        if (!form.reportValidity()) return;
        form.hidden = true;
        const success = document.querySelector<HTMLElement>('.checkout-success');
        if (success) success.hidden = false;
        scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
  if (isAccount) {
    const addressForm = document.querySelector<HTMLFormElement>('.address-form');
    document.querySelectorAll<HTMLElement>('[data-edit-address]').forEach((button) =>
      button.addEventListener('click', () => {
        const address = addressService.all().find((item) => item.id === button.dataset.editAddress);
        if (!address || !addressForm) return;
        addressForm.hidden = false;
        (addressForm.elements.namedItem('id') as HTMLInputElement).value = address.id;
        (addressForm.elements.namedItem('title') as HTMLInputElement).value = address.title;
        (addressForm.elements.namedItem('city') as HTMLInputElement).value = address.city;
        (addressForm.elements.namedItem('district') as HTMLInputElement).value = address.district;
        (addressForm.elements.namedItem('phone') as HTMLInputElement).value = address.phone;
        (addressForm.elements.namedItem('address') as HTMLTextAreaElement).value =
          address.addressLine;
        addressForm.querySelector('h2')!.textContent =
          language === 'tr' ? 'Adresi Düzenle' : 'Edit Address';
        addressForm.querySelector<HTMLButtonElement>(':scope>button')!.textContent =
          language === 'tr' ? 'DEĞİŞİKLİKLERİ KAYDET' : 'SAVE CHANGES';
        addressForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }),
    );
    document.querySelector('.new-address-trigger')?.addEventListener('click', () => {
      if (!addressForm) return;
      addressForm.reset();
      (addressForm.elements.namedItem('id') as HTMLInputElement).value = '';
      addressForm.querySelector('h2')!.textContent =
        language === 'tr' ? 'Yeni Adres' : 'New Address';
      addressForm.querySelector<HTMLButtonElement>(':scope>button')!.textContent =
        language === 'tr' ? 'ADRESİ KAYDET' : 'SAVE ADDRESS';
    });
    addressForm?.addEventListener(
      'submit',
      (event) => {
        const formElement = event.currentTarget as HTMLFormElement,
          id = (formElement.elements.namedItem('id') as HTMLInputElement).value;
        if (!id) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        const data = new FormData(formElement),
          user = userService.get();
        addressService.add({
          id,
          title: String(data.get('title')),
          firstName: user.firstName,
          lastName: user.lastName,
          phone: String(data.get('phone')),
          addressLine: String(data.get('address')),
          city: String(data.get('city')),
          district: String(data.get('district')),
          country: 'Türkiye',
          isDefault: false,
        });
        showToast(language === 'tr' ? 'Adresiniz güncellendi.' : 'Address updated.');
        render();
      },
      { capture: true },
    );
  }
};
const navigate = (path: string) => {
  history.pushState({}, '', appRoute(path));
  if (path.startsWith('/category/')) resetCategoryState();
  if (path.startsWith('/product/')) resetProductState();
  render();
  scrollTo({ top: 0, behavior: 'smooth' });
};

const showToast = (message?: string) => {
  const toast = document.querySelector<HTMLElement>('#toast');
  if (!toast) return;
  toast.textContent =
    message ?? (language === 'tr' ? 'Bu bölüm yakında eklenecek.' : 'This section is coming soon.');
  toast.classList.add('is-visible');
  window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
};
const setSidebar = (open: boolean) => {
  const sidebar = document.querySelector<HTMLElement>('#sidebar');
  const overlay = document.querySelector<HTMLElement>('#sidebar-overlay');
  const trigger = document.querySelector<HTMLElement>('#menu-trigger');
  if (!sidebar || !overlay || !trigger) return;
  const isMobile = matchMedia('(max-width: 767px)').matches;
  sidebar.classList.toggle('is-open', open);
  overlay.classList.toggle('is-open', open);
  sidebar.setAttribute('aria-hidden', String(!open));
  trigger.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
  if (open && isMobile) sidebar.querySelector<HTMLElement>('button')?.focus();
};
const setMobileSearch = (open: boolean) => {
  const panel = document.querySelector<HTMLElement>('#mobile-search');
  if (!panel) return;
  panel.classList.toggle('is-open', open);
  if (open) window.setTimeout(() => panel.querySelector<HTMLInputElement>('input')?.focus(), 120);
};
const setSupport = (open: boolean) => {
  const panel = document.querySelector<HTMLElement>('.support-panel');
  const trigger = document.querySelector<HTMLElement>('.sidebar-support-trigger');
  if (!panel || !trigger) return;
  panel.classList.toggle('is-open', open);
  panel.setAttribute('aria-hidden', String(!open));
  trigger.setAttribute('aria-expanded', String(open));
  if (open) panel.querySelector<HTMLInputElement>('input')?.focus();
};
const searchableCategories = (
  nodes: CategoryNode[],
  parent: string[] = [],
): { node: CategoryNode; route: string }[] =>
  nodes.flatMap((node) => {
    const path = [...parent, node.slug];
    return [{ node, route: path.join('/') }, ...searchableCategories(node.children ?? [], path)];
  });
const renderSearch = (input: HTMLInputElement) => {
  const shell = input.closest<HTMLElement>('.search-shell'),
    panel = shell?.querySelector<HTMLElement>('.search-results'),
    clear = shell?.querySelector<HTMLElement>('.search-clear');
  if (!panel) return;
  const query = input.value.trim(),
    term = query.toLocaleLowerCase(language === 'tr' ? 'tr-TR' : 'en-US');
  clear?.classList.toggle('is-visible', Boolean(query));
  if (!term) {
    panel.classList.remove('is-open');
    panel.innerHTML = '';
    return;
  }
  const productResults = catalogProducts
      .filter((p) =>
        `${p.name[language]} ${p.brand} ${p.categoryId}`
          .toLocaleLowerCase(language === 'tr' ? 'tr-TR' : 'en-US')
          .includes(term),
      )
      .slice(0, 5),
    categoryResults = searchableCategories(categoryTree)
      .filter(({ node }) =>
        node.name[language].toLocaleLowerCase(language === 'tr' ? 'tr-TR' : 'en-US').includes(term),
      )
      .slice(0, 5);
  panel.innerHTML =
    productResults.length || categoryResults.length
      ? `${
          productResults.length
            ? `<p class="result-label">
${language === 'tr' ? 'ÜRÜNLER' : 'PRODUCTS'}
</p>
${productResults
  .map(
    (p) => `<a href="/product/${p.slug}" data-search-product="${p.slug}">
<span>
${p.name[language]}
<small>
${p.brand}
</small>
</span>
<span>→</span>
</a>`,
  )
  .join('')}`
            : ''
        }${
          categoryResults.length
            ? `<p class="result-label">
${language === 'tr' ? 'KATEGORİLER' : 'CATEGORIES'}
</p>
<div class="category-results">
${categoryResults
  .map(
    ({ node, route }) => `<a href="/category/${route}" data-search-category="${route}">
${node.name[language]}
</a>`,
  )
  .join('')}
</div>`
            : ''
        }`
      : `<div class="empty-result">
${language === 'tr' ? 'Aramanızla eşleşen sonuç bulunamadı.' : 'No results matched your search.'}
</div>`;
  panel.classList.add('is-open');
  panel.querySelectorAll<HTMLAnchorElement>('[data-search-product]').forEach((link) =>
    link.addEventListener('click', (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      event.preventDefault();
      setMobileSearch(false);
      navigate(`/product/${link.dataset.searchProduct}`);
    }),
  );
  panel.querySelectorAll<HTMLAnchorElement>('[data-search-category]').forEach((link) =>
    link.addEventListener('click', (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      event.preventDefault();
      setMobileSearch(false);
      navigate(`/category/${link.dataset.searchCategory}`);
    }),
  );
};

function bindEvents() {
  homeSectionScrollCleanup();
  homeSectionScrollCleanup = initHomeSectionScroll();
  const header = document.querySelector('.site-header');
  const categoryNav = document.querySelector('.category-nav');
  const backToTop = document.querySelector('.back-to-top');
  const onScroll = () => {
    const current = Math.max(scrollY, 0);
    const movingDown = current > lastScrollPosition;
    if (movingDown) document.querySelector<HTMLButtonElement>('.mega-overlay.is-open')?.click();
    header?.classList.toggle('is-scrolled', current > 24);
    backToTop?.classList.toggle('is-scroll-visible', current > 20);
    if (categoryNav) {
      const shouldHide =
        movingDown && current > 140 && !document.body.classList.contains('menu-open');
      header?.classList.toggle('scroll-hidden', shouldHide);
      categoryNav.classList.toggle('scroll-hidden', shouldHide);
    } else header?.classList.remove('scroll-hidden');
    lastScrollPosition = current;
  };
  lastScrollPosition = Math.max(scrollY, 0);
  onScroll();
  window.onscroll = onScroll;
  const trigger = document.querySelector<HTMLElement>('#menu-trigger');
  trigger?.addEventListener('click', () =>
    setSidebar(trigger.getAttribute('aria-expanded') !== 'true'),
  );
  trigger?.addEventListener('mouseenter', () => {
    if (matchMedia('(hover: hover) and (min-width: 768px)').matches) {
      clearTimeout(sidebarTimer);
      setSidebar(true);
    }
  });
  const sidebar = document.querySelector<HTMLElement>('#sidebar');
  sidebar?.addEventListener('mouseenter', () => clearTimeout(sidebarTimer));
  [trigger, sidebar].forEach((el) =>
    el?.addEventListener('mouseleave', () => {
      if (matchMedia('(hover: hover) and (min-width: 768px)').matches)
        sidebarTimer = window.setTimeout(() => setSidebar(false), 300);
    }),
  );
  document.querySelectorAll<HTMLElement>('.sidebar-category-toggle').forEach((button) =>
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      button.parentElement?.classList.toggle('is-open', !open);
    }),
  );
  let megaTimer = 0;
  let activeMega: HTMLElement | null = null;
  let activeMegaTrigger: HTMLElement | null = null;
  const closeMega = (restoreFocus = false) => {
    clearTimeout(megaTimer);
    activeMega?.classList.remove('is-open');
    activeMega?.setAttribute('aria-hidden', 'true');
    activeMegaTrigger?.setAttribute('aria-expanded', 'false');
    if (restoreFocus) activeMegaTrigger?.focus();
    document.querySelector('.mega-overlay')?.classList.remove('is-open');
    document.body.classList.remove('mega-menu-open');
    activeMega = null;
    activeMegaTrigger = null;
  };
  const scheduleMegaClose = () => {
    clearTimeout(megaTimer);
    megaTimer = window.setTimeout(() => {
      if (
        !activeMega?.contains(document.activeElement) &&
        !activeMegaTrigger?.contains(document.activeElement)
      )
        closeMega();
    }, 700);
  };
  const cancelMegaClose = () => clearTimeout(megaTimer);
  document.querySelectorAll<HTMLElement>('[data-mega-trigger]').forEach((button) => {
    button.addEventListener('click', () => {
      const panel = document.querySelector<HTMLElement>(
        `[data-mega-panel="${button.dataset.megaTrigger}"]`,
      );
      const wasOpen = button.getAttribute('aria-expanded') === 'true';
      closeMega();
      if (!wasOpen && panel) {
        activeMega = panel;
        activeMegaTrigger = button;
        button.setAttribute('aria-expanded', 'true');
        panel.classList.add('is-open');
        panel.setAttribute('aria-hidden', 'false');
        document.querySelector('.mega-overlay')?.classList.add('is-open');
        document.body.classList.add('mega-menu-open');
      }
    });
    button.addEventListener('pointerenter', cancelMegaClose);
    button.addEventListener('pointerleave', scheduleMegaClose);
  });
  document.querySelectorAll<HTMLElement>('[data-mega-panel]').forEach((panel) => {
    panel.addEventListener('pointerenter', cancelMegaClose);
    panel.addEventListener('pointerleave', scheduleMegaClose);
  });
  const megaNav = document.querySelector<HTMLElement>('.category-nav');
  document.querySelector('.mega-overlay')?.addEventListener('click', () => closeMega());
  document.querySelector('.sidebar-close')?.addEventListener('click', () => setSidebar(false));
  document.querySelector('#sidebar-overlay')?.addEventListener('click', () => setSidebar(false));
  document
    .querySelector('.mobile-search-trigger')
    ?.addEventListener('click', () => setMobileSearch(true));
  document
    .querySelector('.mobile-search-close')
    ?.addEventListener('click', () => setMobileSearch(false));
  document
    .querySelectorAll<HTMLInputElement>('.search-shell input')
    .forEach((input) => input.addEventListener('input', () => renderSearch(input)));
  document.querySelectorAll<HTMLElement>('.search-clear').forEach((clear) =>
    clear.addEventListener('click', () => {
      const input = clear.parentElement?.querySelector<HTMLInputElement>('input');
      if (input) {
        input.value = '';
        renderSearch(input);
        input.focus();
      }
    }),
  );
  const notifyDialogGlobal = document.querySelector<HTMLDialogElement>('.notify-dialog');
  document.querySelectorAll<HTMLElement>('.notify-btn').forEach((button) =>
    button.addEventListener('click', () => {
      const id = button.closest<HTMLElement>('[data-product-id]')?.dataset.productId;
      if (id && notifyDialogGlobal) notifyDialogGlobal.dataset.productId = id;
    }),
  );
  if (document.body.classList.contains('product-view') && notifyDialogGlobal) {
    const product = catalogProducts.find((item) => item.slug === currentRoute().split('/').at(-1));
    if (product) notifyDialogGlobal.dataset.productId = product.id;
  }
  notifyDialogGlobal?.querySelector('form')?.addEventListener('submit', () => {
    const id = notifyDialogGlobal.dataset.productId;
    if (id) stockWatchService.add(id);
  });
  document.querySelectorAll<HTMLSelectElement>('#currency,#sidebar-currency').forEach((select) =>
    select.addEventListener('change', (event) => {
      currency = (event.target as HTMLSelectElement).value as Currency;
      storage.set('aurea-currency', currency);
      render();
    }),
  );
  const toggleLanguage = () => {
    language = language === 'tr' ? 'en' : 'tr';
    storage.set('aurea-language', language);
    render();
  };
  document.querySelector('.language-toggle')?.addEventListener('click', toggleLanguage);
  document.querySelector('.sidebar-lang')?.addEventListener('click', toggleLanguage);
  document.querySelectorAll<HTMLElement>('.route-btn,[data-route]').forEach((el) =>
    el.addEventListener('click', (event) => {
      if (el.tagName === 'A') event.preventDefault();
      setSidebar(false);
      const route = el.dataset.route;
      const categoryMap: Record<string, string> = {
        women: 'women',
        men: 'men',
        kids: 'kids',
        accessories: 'accessories',
        sale: 'sale',
      };
      const pageMap: Record<string, string> = {
        account: '/account',
        cart: '/cart',
        favorites: '/favorites',
        tracking: '/tracking',
      };
      if (route && categoryMap[route]) navigate(`/category/${categoryMap[route]}`);
      else if (route && pageMap[route]) navigate(pageMap[route]);
      else showToast();
    }),
  );
  document.querySelectorAll<HTMLAnchorElement>('[data-category-route]').forEach((link) =>
    link.addEventListener('click', (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const route = link.dataset.categoryRoute;
      if (!route) return;
      event.preventDefault();
      clearTimeout(megaTimer);
      closeMega();
      setSidebar(false);
      navigate(`/category/${route}`);
    }),
  );
  document.querySelectorAll<HTMLElement>('[data-home-route]').forEach((el) =>
    el.addEventListener('click', (event) => {
      event.preventDefault();
      navigate('/');
    }),
  );
  document.querySelectorAll<HTMLElement>('[data-product-route]').forEach((el) =>
    el.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      navigate(`/product/${el.dataset.productRoute}`);
    }),
  );
  const supportTrigger = document.querySelector<HTMLElement>('.sidebar-support-trigger');
  supportTrigger?.addEventListener('click', () => {
    setSidebar(false);
    setSupport(true);
  });
  document.querySelector('.support-close')?.addEventListener('click', () => setSupport(false));
  document.querySelector<HTMLFormElement>('.support-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    showToast(language === 'tr' ? 'Mesajınız alındı.' : 'Your message was received.');
    setSupport(false);
  });
  document.querySelectorAll<HTMLElement>('[data-footer-route]').forEach((link) =>
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showToast(
        language === 'tr'
          ? 'Bu sayfa sonraki geliştirme aşamasında eklenecek.'
          : 'This page will be added in the next development phase.',
      );
    }),
  );
  document.querySelectorAll<HTMLElement>('[data-app-store]').forEach((button) =>
    button.addEventListener('click', () => {
      const store = button.dataset.appStore === 'ios' ? 'ios' : 'android';
      const url = appLinks[store];
      if (url) location.assign(url);
      else
        showToast(
          store === 'ios'
            ? language === 'tr'
              ? 'Mobil uygulamamız yakında App Store’da.'
              : 'Our mobile app is coming soon to the App Store.'
            : language === 'tr'
              ? 'Mobil uygulamamız yakında Google Play’de.'
              : 'Our mobile app is coming soon to Google Play.',
        );
    }),
  );
  document.querySelector('.back-to-top')?.addEventListener('click', () =>
    scrollTo({
      top: 0,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    }),
  );
  document.querySelectorAll<HTMLElement>('.footer-section-toggle').forEach((button) =>
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      button.querySelector('i')!.textContent = open ? '+' : '−';
      button.parentElement?.classList.toggle('is-open', !open);
    }),
  );
  if (document.body.classList.contains('product-view')) {
    const notifyDialog = document.querySelector<HTMLDialogElement>('.notify-dialog');
    document.querySelector('.notify-close')?.addEventListener('click', () => notifyDialog?.close());
    notifyDialog?.querySelector('form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.currentTarget as HTMLFormElement;
      if (!form.reportValidity()) return;
      notifyDialog.close();
      showToast(
        language === 'tr'
          ? 'Talebiniz alındı. Ürün tekrar stoklara geldiğinde bilgilendirileceksiniz.'
          : 'Request received. We’ll notify you when it is back.',
      );
    });
    let viewerIndex = 0;
    const viewerPositions = ['0% 0%', '100% 0%', '0% 100%', '100% 100%'];
    const updateViewer = (step: number) => {
      viewerIndex = (viewerIndex + step + viewerPositions.length) % viewerPositions.length;
      const image = document.querySelector<HTMLImageElement>('.image-viewer img');
      if (image) image.style.transformOrigin = viewerPositions[viewerIndex];
    };
    document.querySelector('.viewer-prev')?.addEventListener('click', () => updateViewer(-1));
    document.querySelector('.viewer-next')?.addEventListener('click', () => updateViewer(1));
  }
  document.onclick = (event) => {
    const target = event.target as Node;
    document.querySelectorAll<HTMLElement>('.search-results.is-open').forEach((panel) => {
      if (!panel.parentElement?.contains(target)) panel.classList.remove('is-open');
    });
    if (activeMega && !megaNav?.contains(target)) closeMega();
  };
  document.onkeydown = (event) => {
    if (event.key === 'Escape') {
      closeMega(true);
      setSidebar(false);
      setMobileSearch(false);
      setSupport(false);
      document.querySelectorAll('.search-results').forEach((p) => p.classList.remove('is-open'));
      (document.querySelector('.filter-close') as HTMLButtonElement | null)?.click();
      (document.querySelector('.notify-close') as HTMLButtonElement | null)?.click();
      (document.querySelector('.viewer-close') as HTMLButtonElement | null)?.click();
      (document.querySelector('.size-guide-close') as HTMLButtonElement | null)?.click();
    }
  };
}

function observeReveals() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 },
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function initHomeSectionScroll() {
  if (!document.body.classList.contains('home-view')) return () => {};

  const sections = [
    ...document.querySelectorAll<HTMLElement>(
      'main > .hero, main > .campaign-section, main > .gender-campaign',
    ),
  ];
  const footer = document.querySelector<HTMLElement>('.site-footer');
  const targets = footer ? [...sections, footer] : sections;
  if (sections.length < 2) return () => {};

  let animating = false;
  let touchStartY: number | null = null;
  let gestureLock = false;
  let wheelGestureActive = false;
  let wheelReleaseTimer = 0;
  let scrollAnimationFrame = 0;
  let trackpadPeakDelta = 0;
  let lastTrackpadDelta = 0;

  const targetTop = (element: HTMLElement) => element.getBoundingClientRect().top + scrollY;

  const nearestIndex = () => {
    let nearest = 0;
    let distance = Number.POSITIVE_INFINITY;
    targets.forEach((target, index) => {
      const nextDistance = Math.abs(targetTop(target) - scrollY);
      if (nextDistance < distance) {
        nearest = index;
        distance = nextDistance;
      }
    });
    return nearest;
  };

  const animateTo = (index: number) => {
    if (animating || index < 0 || index >= targets.length) return;
    const to = targetTop(targets[index]);
    if (Math.abs(to - scrollY) < 2) {
      gestureLock = false;
      return;
    }
    animating = true;
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      window.scrollTo(0, to);
      animating = false;
      gestureLock = false;
      return;
    }

    const start = window.scrollY;
    const distance = to - start;
    const duration = 700;
    let startedAt: number | undefined;
    const step = (timestamp: number) => {
      startedAt ??= timestamp;
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      window.scrollTo(0, start + distance * eased);

      if (progress < 1) {
        scrollAnimationFrame = requestAnimationFrame(step);
      } else {
        scrollAnimationFrame = 0;
        animating = false;
        gestureLock = false;
      }
    };
    scrollAnimationFrame = requestAnimationFrame(step);
  };

  const move = (direction: 1 | -1) => {
    if (gestureLock) return false;
    const current = nearestIndex();
    const next = current + direction;
    if (next < 0 || next >= targets.length) return false;
    gestureLock = true;
    animateTo(next);
    return true;
  };

  const onWheel = (event: WheelEvent) => {
    if (
      event.ctrlKey ||
      document.body.classList.contains('menu-open') ||
      document.querySelector('.mega-menu.is-open')
    )
      return;

    if (Math.abs(event.deltaY) < 1) return;

    event.preventDefault();
    const isDiscreteWheel = event.deltaMode === WheelEvent.DOM_DELTA_LINE;
    const delta = Math.abs(event.deltaY);

    if (isDiscreteWheel) {
      if (!animating && !gestureLock) move(event.deltaY > 0 ? 1 : -1);
      return;
    }

    // A new trackpad swipe normally produces a sharp increase after the
    // previous gesture's momentum has slowed down. This re-arms the control
    // without requiring pointer movement, while continued momentum remains
    // locked to its original section.
    const isNewSwipeDuringMomentum =
      wheelGestureActive &&
      lastTrackpadDelta <= trackpadPeakDelta * 0.45 &&
      delta > Math.max(lastTrackpadDelta * 1.7, 4);

    window.clearTimeout(wheelReleaseTimer);
    wheelReleaseTimer = window.setTimeout(() => {
      wheelGestureActive = false;
      trackpadPeakDelta = 0;
      lastTrackpadDelta = 0;
    }, 120);

    if (isNewSwipeDuringMomentum) {
      wheelGestureActive = false;
      trackpadPeakDelta = 0;
    }

    lastTrackpadDelta = delta;
    trackpadPeakDelta = Math.max(trackpadPeakDelta, delta);
    if (animating || gestureLock || wheelGestureActive) return;

    wheelGestureActive = true;
    move(event.deltaY > 0 ? 1 : -1);
  };

  const onTouchStart = (event: TouchEvent) => {
    if (
      document.body.classList.contains('menu-open') ||
      document.querySelector('.mega-menu.is-open')
    )
      return;
    touchStartY = event.touches[0]?.clientY ?? null;
  };

  const onTouchMove = (event: TouchEvent) => {
    if (touchStartY !== null && !document.body.classList.contains('menu-open'))
      event.preventDefault();
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartY === null || animating) return;
    const endY = event.changedTouches[0]?.clientY ?? touchStartY;
    const delta = touchStartY - endY;
    touchStartY = null;
    if (Math.abs(delta) < 24) return;
    move(delta > 0 ? 1 : -1);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const element = event.target as HTMLElement | null;
    if (element?.matches('input, textarea, select, button, [contenteditable="true"]')) return;
    const direction =
      event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' '
        ? 1
        : event.key === 'ArrowUp' || event.key === 'PageUp'
          ? -1
          : 0;
    if (!direction || animating) return;
    event.preventDefault();
    move(direction);
  };

  addEventListener('wheel', onWheel, { passive: false });
  addEventListener('touchstart', onTouchStart, { passive: true });
  addEventListener('touchmove', onTouchMove, { passive: false });
  addEventListener('touchend', onTouchEnd, { passive: true });
  addEventListener('keydown', onKeyDown);

  return () => {
    removeEventListener('wheel', onWheel);
    removeEventListener('touchstart', onTouchStart);
    removeEventListener('touchmove', onTouchMove);
    removeEventListener('touchend', onTouchEnd);
    removeEventListener('keydown', onKeyDown);
    clearTimeout(wheelReleaseTimer);
    cancelAnimationFrame(scrollAnimationFrame);
  };
}

render();
addEventListener('popstate', () => render());
