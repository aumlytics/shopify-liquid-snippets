# Recently Viewed Products

A "Recently Viewed" product section built with vanilla JavaScript and `localStorage`. Stores visited product handles and fetches card data from the Shopify AJAX API — no app, no server-side session, no cookies.

## Setup

1. Copy `recently-viewed.liquid` to `snippets/`
2. Copy `recently-viewed.js` to `assets/`
3. In `sections/main-product.liquid` (to track visits):
   ```liquid
   {% render 'recently-viewed', product: product, mode: 'track' %}
   {{ 'recently-viewed.js' | asset_url | script_tag }}
   ```
4. Where you want the carousel displayed (e.g., a new section or under related products):
   ```liquid
   {% render 'recently-viewed', mode: 'display', max_items: 4 %}
   ```

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `mode` | `track` or `display` | `track` |
| `max_items` | Max products to show | `4` |
| `product` | Current product (track mode) | required in track mode |
