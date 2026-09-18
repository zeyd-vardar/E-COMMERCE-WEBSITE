export const initCatalogGalleries = () => {
  document.querySelectorAll<HTMLElement>('.catalog-gallery').forEach((gallery) => {
    const card = gallery.closest<HTMLElement>('.catalog-card');
    const dots = [...(card?.querySelectorAll<HTMLElement>('.catalog-gallery-dot') ?? [])];
    const arrows = [...(card?.querySelectorAll<HTMLButtonElement>('.catalog-gallery-arrow') ?? [])];
    if (!dots.length) return;

    let current = 0;
    const select = (index: number) => {
      current = Math.max(0, Math.min(dots.length - 1, index));
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === current;
        dot.classList.toggle('is-active', active);
      });
      arrows.forEach((arrow) => {
        const direction = Number(arrow.dataset.galleryDirection);
        arrow.disabled =
          (direction < 0 && current === 0) || (direction > 0 && current === dots.length - 1);
      });
      gallery.scrollTo({ left: gallery.clientWidth * current, behavior: 'smooth' });
    };
    arrows.forEach((arrow) =>
      arrow.addEventListener('click', () =>
        select(current + Number(arrow.dataset.galleryDirection)),
      ),
    );
  });
};
