async function handleAccountNavigationClick(
  link: HTMLElement,
  event: Event,
  dependencies: AccountNavigationDependencies,
): Promise<void> {
  event.preventDefault();
  event.stopImmediatePropagation();

  const path = link.dataset.accountRoute;
  if (!path) return;

  await dependencies.beforeNavigate?.(path);
  dependencies.navigate(path);
}

interface AccountNavigationDependencies {
  navigate: (path: string) => void;
  beforeNavigate?: (path: string) => Promise<void>;
  onError?: (error: unknown) => void;
}

export function bindAccountNavigationClickEvents(
  dependencies: AccountNavigationDependencies,
): void {
  document
    .querySelectorAll<HTMLElement>('[data-account-route]')
    .forEach((link) => {
      link.addEventListener('click', (event) => {
        void handleAccountNavigationClick(link, event, dependencies).catch(
          (error) => dependencies.onError?.(error),
        );
      });
    });
}
