/**
 * Sticky Add-to-Cart Bar
 * Watches the main ATC button with IntersectionObserver.
 * Shows the sticky bar when the button scrolls out of view.
 */
(function () {
  'use strict';

  const stickyBar    = document.getElementById('StickyATC');
  const mainATC      = document.getElementById('MainATC');
  const stickyVariId = document.getElementById('StickyVariantId');
  const stickyPrice  = document.getElementById('StickyATCPrice');
  const stickyBtn    = stickyBar?.querySelector('.sticky-atc__btn');

  if (!stickyBar || !mainATC) return;

  // ── Show/hide bar based on main ATC visibility ──────────────────────────
  const observer = new IntersectionObserver(
    ([entry]) => {
      stickyBar.classList.toggle('is-visible', !entry.isIntersecting);
      stickyBar.setAttribute('aria-hidden', String(entry.isIntersecting));
    },
    { rootMargin: '0px', threshold: 0 }
  );
  observer.observe(mainATC);

  // ── Sync variant when selector changes ────────────────────────────────
  const variantInput = document.querySelector('input[name="id"], select[name="id"]');
  if (variantInput && stickyVariId) {
    variantInput.addEventListener('change', () => {
      stickyVariId.value = variantInput.value;
    });
  }

  // ── Sync price from main page ─────────────────────────────────────────
  document.addEventListener('variant:changed', (e) => {
    const variant = e.detail?.variant;
    if (!variant || !stickyPrice) return;

    const formatter = new Intl.NumberFormat(
      document.documentElement.lang || 'en-US',
      { style: 'currency', currency: window.Shopify?.currency?.active || 'USD' }
    );
    stickyPrice.textContent = formatter.format(variant.price / 100);

    if (stickyBtn) {
      stickyBtn.disabled    = !variant.available;
      stickyBtn.textContent = variant.available ? 'Add to Cart' : 'Sold Out';
      stickyVariId.value    = variant.id;
    }
  });
})();
