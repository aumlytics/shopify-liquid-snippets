# GA4 Purchase Event — Custom Pixel

Tracks the GA4 `purchase` event on the order confirmation page using Shopify's Custom Pixel API. Required for all stores since `checkout.liquid` was deprecated in August 2024.

## What It Solves

After the `checkout.liquid` deprecation, scripts placed there stopped firing. This Custom Pixel uses `analytics.subscribe('checkout_completed')` to send a properly structured GA4 `purchase` event including items array, revenue, tax, shipping, and transaction ID.

## Setup

1. In Shopify Admin → **Settings → Customer events → Add custom pixel**
2. Name it `GA4 Purchase Tracking`
3. Paste the contents of `ga4-purchase-pixel.js`
4. Replace `G-XXXXXXXXXX` with your GA4 Measurement ID
5. Set permission to **Not required** (no consent needed for analytics in most regions — adjust for GDPR)
6. Click **Save** and **Connect**

## Notes

- Works independently of GTM — use this if you only need GA4 purchase tracking
- For full GTM + GA4 setup, use snippet 02 instead
- The `items` array maps Shopify's checkout line items to GA4's e-commerce item format
