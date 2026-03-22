/**
 * GA4 Purchase Event — Shopify Custom Pixel
 * ─────────────────────────────────────────
 * Fires a GA4 `purchase` event when a checkout is completed.
 * Add this as a Custom Pixel in: Admin → Settings → Customer events
 *
 * Replace G-XXXXXXXXXX with your GA4 Measurement ID.
 */

const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Load gtag.js inside the sandboxed pixel environment
const script = document.createElement('script');
script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
script.async = true;
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', GA4_MEASUREMENT_ID, { send_page_view: false });

// Subscribe to checkout_completed event
analytics.subscribe('checkout_completed', (event) => {
  const checkout = event.data.checkout;

  if (!checkout) return;

  // Map Shopify line items → GA4 items array
  const items = (checkout.lineItems || []).map((item, index) => ({
    item_id: item.variant?.sku || item.variant?.id || item.id,
    item_name: item.title,
    item_variant: item.variant?.title !== 'Default Title' ? item.variant?.title : undefined,
    item_brand: item.variant?.product?.vendor,
    item_category: item.variant?.product?.type,
    price: parseFloat(item.variant?.price?.amount || 0),
    quantity: item.quantity,
    index: index,
  }));

  gtag('event', 'purchase', {
    transaction_id: checkout.order?.id || checkout.token,
    value: parseFloat(checkout.totalPrice?.amount || 0),
    tax: parseFloat(checkout.totalTax?.amount || 0),
    shipping: parseFloat(checkout.shippingLine?.price?.amount || 0),
    currency: checkout.currencyCode,
    coupon: checkout.discountApplications?.[0]?.title || undefined,
    items: items,
  });
});
