/**
 * GTM Custom Pixel — Shopify Sandbox Side
 * ────────────────────────────────────────
 * Loads GTM inside the Custom Pixel sandbox and listens for
 * dataLayer events bridged from the storefront via postMessage.
 *
 * Replace GTM-XXXXXXX with your GTM container ID.
 */

const GTM_ID = 'GTM-XXXXXXX';

// ── 1. Initialize dataLayer and load GTM ──────────────────────────────────
window.dataLayer = window.dataLayer || [];
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l !== 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', GTM_ID);

// ── 2. Bridge: receive events from storefront and push to dataLayer ───────
window.addEventListener('message', (event) => {
  // Only accept messages from the same Shopify store origin
  if (!event.data || event.data.source !== 'shopify-gtm-bridge') return;
  window.dataLayer.push(event.data.payload);
});

// ── 3. Subscribe to Shopify Customer Events and forward to GTM ─────────
analytics.subscribe('checkout_completed', (event) => {
  const checkout = event.data.checkout;
  const items = (checkout.lineItems || []).map((item) => ({
    item_id: item.variant?.sku || item.variant?.id,
    item_name: item.title,
    item_variant: item.variant?.title,
    price: parseFloat(item.variant?.price?.amount || 0),
    quantity: item.quantity,
  }));

  window.dataLayer.push({
    event: 'purchase',
    ecommerce: {
      transaction_id: checkout.order?.id || checkout.token,
      value: parseFloat(checkout.totalPrice?.amount || 0),
      tax: parseFloat(checkout.totalTax?.amount || 0),
      shipping: parseFloat(checkout.shippingLine?.price?.amount || 0),
      currency: checkout.currencyCode,
      items,
    },
  });
});

analytics.subscribe('product_added_to_cart', (event) => {
  const item = event.data.cartLine;
  window.dataLayer.push({
    event: 'add_to_cart',
    ecommerce: {
      currency: item.merchandise?.price?.currencyCode,
      value: parseFloat(item.merchandise?.price?.amount || 0) * item.quantity,
      items: [{
        item_id: item.merchandise?.sku || item.merchandise?.id,
        item_name: item.merchandise?.product?.title,
        item_variant: item.merchandise?.title,
        price: parseFloat(item.merchandise?.price?.amount || 0),
        quantity: item.quantity,
      }],
    },
  });
});
