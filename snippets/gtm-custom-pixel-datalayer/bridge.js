/**
 * GTM Bridge — Storefront Side
 * ─────────────────────────────
 * Bridges dataLayer events from the main storefront page into
 * Shopify's sandboxed Custom Pixel iframe via postMessage.
 *
 * Load this in layout/theme.liquid before </body>:
 *   {{ 'gtm-bridge.js' | asset_url | script_tag }}
 */

(function () {
  'use strict';

  // Find the Shopify Custom Pixel iframe (injected by Shopify)
  function getPixelFrame() {
    return document.querySelector('iframe[id*="shopify-pixel"]') ||
           document.querySelector('iframe[src*="customer-events"]');
  }

  // Send a payload to the pixel iframe
  function sendToPixel(payload) {
    const frame = getPixelFrame();
    if (frame && frame.contentWindow) {
      frame.contentWindow.postMessage(
        { source: 'shopify-gtm-bridge', payload },
        '*'
      );
    }
  }

  // Intercept dataLayer.push so any GTM events also go to the pixel
  window.dataLayer = window.dataLayer || [];
  const _originalPush = window.dataLayer.push.bind(window.dataLayer);

  window.dataLayer.push = function (...args) {
    args.forEach((item) => {
      if (item && item.event) {
        sendToPixel(item);
      }
    });
    return _originalPush(...args);
  };

  // Also forward page_view on load
  window.addEventListener('load', () => {
    sendToPixel({
      event: 'page_view',
      page_location: window.location.href,
      page_title: document.title,
    });
  });
})();
