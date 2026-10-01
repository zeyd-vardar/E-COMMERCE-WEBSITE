interface UserMenuDependencies {
  navigate: (path: string) => void;
  closeSidebar: () => void;
  showFallback: () => void;
}

const categoryRoutes: Record<string, string> = {
  women: '/category/women',
  men: '/category/men',
  kids: '/category/kids',
  accessories: '/category/accessories',
  sale: '/category/sale',
};

const accountRoutes: Record<string, string> = {
  account: '/account',
  cart: '/cart',
  favorites: '/favorites',
  tracking: '/tracking',
};

async function handleUserMenuClick(
  element: HTMLElement,
  event: Event,
  dependencies: UserMenuDependencies,
): Promise<void> {
  if (element.tagName === 'A') {
    event.preventDefault();
  }

  dependencies.closeSidebar();

  const routeKey = element.dataset.route;
  const path = routeKey
    ? (categoryRoutes[routeKey] ?? accountRoutes[routeKey])
    : undefined;

  if (path) {
    dependencies.navigate(path);
    return;
  }

  dependencies.showFallback();
}

export function bindUserMenuClickEvents(
  dependencies: UserMenuDependencies,
): void {
  document
    .querySelectorAll<HTMLElement>('.route-btn,[data-route]')
    .forEach((element) => {
      element.addEventListener('click', (event) => {
        void handleUserMenuClick(element, event, dependencies);
      });
    });
}
