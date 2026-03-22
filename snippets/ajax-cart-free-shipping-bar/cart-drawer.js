/**
 * AJAX Cart Drawer + Free Shipping Progress Bar
 * Set FREE_SHIPPING_THRESHOLD in cents (e.g. 5000 = $50.00)
 */
(function () {
  'use strict';

  const FREE_SHIPPING_THRESHOLD = 5000; // cents

  const drawer   = document.getElementById('CartDrawer');
  const overlay  = document.getElementById('CartDrawerOverlay');
  const closeBtn = document.getElementById('CartDrawerClose');
  const itemsEl  = document.getElementById('CartItems');
  const subtotal = document.getElementById('CartSubtotal');
  const barFill  = document.getElementById('ShippingBarFill');
  const barMsg   = document.getElementById('ShippingBarMsg');

  if (!drawer) return;

  const currency = window.Shopify?.currency?.active || 'USD';
  const locale   = document.documentElement.lang || 'en-US';
  const fmt = (cents) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency }).format(cents / 100);

  // ── Open / Close ──────────────────────────────────────────────────────
  function openDrawer() {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // ── Fetch and render cart ─────────────────────────────────────────────
  function fetchCart() {
    return fetch('/cart.js').then(r => r.json());
  }

  function renderCart(cart) {
    // Subtotal
    subtotal.textContent = fmt(cart.total_price);

    // Free shipping bar
    const pct = Math.min((cart.total_price / FREE_SHIPPING_THRESHOLD) * 100, 100);
    barFill.style.width = pct + '%';
    if (cart.total_price >= FREE_SHIPPING_THRESHOLD) {
      barMsg.textContent = '🎉 You qualify for free shipping!';
      barFill.style.background = '#16a34a';
    } else {
      const remaining = fmt(FREE_SHIPPING_THRESHOLD - cart.total_price);
      barMsg.textContent = `Add ${remaining} more for free shipping`;
      barFill.style.background = '#2563eb';
    }

    // Items
    if (cart.item_count === 0) {
      itemsEl.innerHTML = '<p class="cart-drawer-empty">Your cart is empty.</p>';
      return;
    }

    itemsEl.innerHTML = cart.items.map(item => `
      <div class="cart-item" data-key="${item.key}">
        ${item.image ? `<img class="cart-item__img" src="${item.image}" alt="${item.title}" loading="lazy" width="64" height="64">` : ''}
        <div class="cart-item__info">
          <p class="cart-item__title">${item.product_title}</p>
          ${item.variant_title && item.variant_title !== 'Default Title'
            ? `<p class="cart-item__variant">${item.variant_title}</p>` : ''}
          <p class="cart-item__price">${fmt(item.line_price)}</p>
          <div class="cart-item__qty">
            <button data-action="decrease" data-key="${item.key}" aria-label="Decrease quantity">−</button>
            <span>${item.quantity}</span>
            <button data-action="increase" data-key="${item.key}" aria-label="Increase quantity">+</button>
          </div>
          <button class="cart-item__remove" data-action="remove" data-key="${item.key}">Remove</button>
        </div>
      </div>
    `).join('');
  }

  function updateQuantity(key, quantity) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity }),
    })
      .then(r => r.json())
      .then(renderCart);
  }

  itemsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const key    = btn.dataset.key;
    const action = btn.dataset.action;
    const item   = drawer.querySelector(`.cart-item[data-key="${key}"]`);
    const qty    = parseInt(item?.querySelector('.cart-item__qty span')?.textContent || '1', 10);

    if (action === 'increase') updateQuantity(key, qty + 1);
    if (action === 'decrease') updateQuantity(key, Math.max(0, qty - 1));
    if (action === 'remove')   updateQuantity(key, 0);
  });

  // ── Intercept ATC forms ───────────────────────────────────────────────
  document.addEventListener('submit', (e) => {
    const form = e.target.closest('form[action="/cart/add"]');
    if (!form) return;
    e.preventDefault();

    const formData = new FormData(form);
    fetch('/cart/add.js', { method: 'POST', body: formData })
      .then(() => fetchCart())
      .then(cart => {
        renderCart(cart);
        openDrawer();
      })
      .catch(() => {
        // Fallback to normal form submit
        form.submit();
      });
  });

  // Also open on data-open-cart button clicks (non-form triggers)
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-open-cart]')) {
      fetchCart().then(cart => {
        renderCart(cart);
        openDrawer();
      });
    }
  });

  // Initial render on page load
  fetchCart().then(renderCart);
})();
