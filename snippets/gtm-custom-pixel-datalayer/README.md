# GTM via Custom Pixel + dataLayer Bridge

Loads Google Tag Manager inside Shopify's sandboxed Custom Pixel environment and bridges `dataLayer` events from the main storefront into the pixel sandbox. Required for stores that use GTM to manage GA4, Google Ads, Meta Pixel, and other tags.

## What It Solves

Shopify's Custom Pixel runs in a sandboxed iframe — GTM can load inside it, but it cannot access `dataLayer` events pushed from your theme's front end. The bridge script (`gtm-bridge.js`) runs on the storefront and re-sends click events, page views, and add-to-cart events into the pixel sandbox via `postMessage`.

## Files

- `pixel.js` — goes into the Custom Pixel (Admin → Settings → Customer events)
- `bridge.js` — goes into your theme's `assets/` folder, loaded in `theme.liquid`

## Setup

### Step 1 — Custom Pixel
1. Admin → **Settings → Customer events → Add custom pixel**
2. Name it `GTM Pixel`
3. Paste `pixel.js` contents
4. Replace `GTM-XXXXXXX` with your GTM container ID
5. Save and Connect

### Step 2 — Bridge Script
1. Upload `bridge.js` to your theme's `assets/` folder
2. In `layout/theme.liquid`, before `</body>`:
   ```liquid
   {{ 'gtm-bridge.js' | asset_url | script_tag }}
   ```

## How It Works

```
Storefront page → bridge.js pushes events → postMessage to pixel iframe
Pixel iframe ← pixel.js listens → pushes to GTM dataLayer → fires tags
```
