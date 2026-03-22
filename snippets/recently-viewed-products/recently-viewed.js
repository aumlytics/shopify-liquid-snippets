/**
 * Recently Viewed Products
 * Uses localStorage to track and display visited products.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'rv_products';
  const MAX_STORED  = 20;

  function getStored() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }

  function setStored(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }
    catch {}
  }

  // ── Track current product ──────────────────────────────────────────────
  const trackEl = document.getElementById('rv-track');
  if (trackEl) {
    const handle = trackEl.dataset.handle;
    if (handle) {
      let stored = getStored().filter(h => h !== handle);
      stored.unshift(handle);
      if (stored.length > MAX_STORED) stored = stored.slice(0, MAX_STORED);
      setStored(stored);
    }
  }

  // ── Display recently viewed ────────────────────────────────────────────
  const displayEl = document.getElementById('rv-display');
  if (!displayEl) return;

  const grid    = document.getElementById('rv-grid');
  const max     = parseInt(displayEl.dataset.max, 10) || 4;
  const handles = getStored().slice(0, max);

  if (handles.length === 0) return;

  const formatter = new Intl.NumberFormat(
    document.documentElement.lang || 'en-US',
    { style: 'currency', currency: window.Shopify?.currency?.active || 'USD' }
  );

  Promise.all(
    handles.map(handle =>
      fetch(`/products/${handle}.js`)
        .then(r => r.ok ? r.json() : null)
        .catch(() => null)
    )
  ).then(products => {
    const valid = products.filter(Boolean);
    if (valid.length === 0) return;

    valid.forEach(product => {
      const variant = product.variants[0];
      const image   = product.images[0] || '';
      const card    = document.createElement('a');
      card.href     = `/products/${product.handle}`;
      card.className = 'rv-card';
      card.innerHTML = `
        ${image ? `<img src="${image}" alt="${product.title}" loading="lazy" width="300" height="300">` : ''}
        <p class="rv-card__title">${product.title}</p>
        <p class="rv-card__price">${formatter.format(variant.price / 100)}</p>
      `;
      grid.appendChild(card);
    });

    displayEl.style.display = '';
  });
})();
