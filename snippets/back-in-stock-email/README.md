# Back-in-Stock Email Capture

Shows an "Email me when available" form when all product variants are sold out. Uses Shopify's native `product_notify_me` form — no app required.

## Setup

1. Copy `back-in-stock.liquid` to your theme's `snippets/` folder
2. In `sections/main-product.liquid`, wrap your ATC button section:
   ```liquid
   {%- if product.available -%}
     <!-- your existing add to cart button -->
   {%- else -%}
     {% render 'back-in-stock', product: product %}
   {%- endif -%}
   ```

## Notes

- Submitted emails go to **Admin → Marketing → Emails** (not automatic — you'll need to manually email or export to Klaviyo)
- For automated restock emails, connect Klaviyo and use their back-in-stock flow
- The form uses Shopify's native `contact` action with a hidden `subject` field to identify restock requests
