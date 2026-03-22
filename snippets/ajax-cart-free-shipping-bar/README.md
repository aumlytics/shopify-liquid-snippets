# AJAX Cart Drawer + Free Shipping Progress Bar

A slide-out cart drawer that opens on "Add to Cart" without a page reload, with an animated progress bar showing how close the customer is to free shipping. Uses the Shopify AJAX Cart API — no app required.

## Setup

1. Copy `cart-drawer.liquid` to `snippets/`
2. Copy `cart-drawer.js` to `assets/`
3. In `layout/theme.liquid`, just before `</body>`:
   ```liquid
   {% render 'cart-drawer' %}
   {{ 'cart-drawer.js' | asset_url | script_tag }}
   ```
4. Set your free shipping threshold in `cart-drawer.js`:
   ```js
   const FREE_SHIPPING_THRESHOLD = 5000; // in cents ($50.00)
   ```
5. On your ATC button, add `data-open-cart` to trigger the drawer:
   ```liquid
   <button type="submit" data-open-cart>Add to Cart</button>
   ```

## Features

- Opens/closes with CSS transitions (no jank)
- Progress bar animates on cart total change
- Quantity update and item removal without page reload
- Accessible: focus trap and `aria-modal`
