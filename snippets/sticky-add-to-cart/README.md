# Sticky Add-to-Cart Bar

A fixed bar that appears at the bottom of the viewport when the main "Add to Cart" button scrolls out of view. Shows product title, selected variant, price, and an ATC button. Uses Intersection Observer — no scroll event listeners, no performance impact.

## Setup

1. Copy `sticky-atc.liquid` to `snippets/`
2. Copy `sticky-atc.js` to your theme's `assets/` folder
3. In `sections/main-product.liquid`, near the bottom:
   ```liquid
   {% render 'sticky-atc', product: product, section: section %}
   {{ 'sticky-atc.js' | asset_url | script_tag }}
   ```
4. Add `id="MainATC"` to your existing Add to Cart button so the observer knows when to show/hide.

## Customisation

- Change `--sticky-atc-bg` CSS variable to match your brand
- The bar only appears after the user scrolls past the main ATC button
- Submits to the same cart form, so all existing cart logic (drawers, redirects) still applies
