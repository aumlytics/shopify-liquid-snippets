/**
 * Color Swatches — Variant Image Swap
 * Swaps the product card image when a swatch is clicked/hovered.
 */
(function () {
  'use strict';

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.swatch-btn');
    if (!btn) return;

    const container = btn.closest('.product-swatches');
    if (!container) return;

    // Update active state
    container.querySelectorAll('.swatch-btn').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    // Swap image on the parent card
    const card  = container.closest('[data-product-id], .card-product, .product-card');
    const image = btn.dataset.image;

    if (card && image) {
      const img = card.querySelector('img');
      if (img) {
        img.src = image;
        // Clear srcset so browser uses src
        img.removeAttribute('srcset');
      }
    }
  });
})();
