/* Progressive enhancement only: every page and navigation link works without JS. */
(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 761px)');
  const header = document.querySelector('header');
  const sizeHeader = () => document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
  sizeHeader();
  if ('ResizeObserver' in window) new ResizeObserver(sizeHeader).observe(header);
  const windows = [...document.querySelectorAll('.image-window')];
  let scheduled = false;
  const update = () => {
    scheduled = false;
    document.body.classList.toggle('scrolled', scrollY > 15);
    for (const window of windows) {
      const rect = window.getBoundingClientRect();
      const shift = !reducedMotion.matches && desktop.matches
        ? Math.max(-60, Math.min(60, (innerHeight / 2 - rect.top - rect.height / 2) * .12)) : 0;
      window.style.setProperty('--image-shift', `${shift.toFixed(1)}px`);
    }
  };
  const schedule = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  reducedMotion.addEventListener('change', schedule);
  update();

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: .08 });
    document.querySelectorAll('.feature-copy, .experience .copy > div, .service-card').forEach(node => {
      // Never hide content already in view, and never gate content on an animation.
      if (node.getBoundingClientRect().top > innerHeight) {
        node.classList.add('reveal-target', 'reveal-pending');
        observer.observe(node);
      }
    });
    reducedMotion.addEventListener('change', () => {
      document.querySelectorAll('.reveal-pending').forEach(node => node.classList.remove('reveal-pending'));
    });
  }

  const menus = [...document.querySelectorAll('nav details')];
  for (const menu of menus) {
    menu.addEventListener('toggle', () => { if (menu.open) menus.forEach(other => { if (other !== menu) other.open = false; }); });
    menu.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse' && desktop.matches) menu.open = true; });
    menu.addEventListener('pointerleave', event => { if (event.pointerType === 'mouse' && desktop.matches && !menu.contains(document.activeElement)) menu.open = false; });
  }
  document.addEventListener('keydown', event => { if (event.key === 'Escape') menus.forEach(menu => { if (menu.open) { menu.open = false; menu.querySelector('summary').focus(); } }); });
  document.addEventListener('click', event => { if (!event.target.closest('nav')) menus.forEach(menu => { menu.open = false; }); });
})();
