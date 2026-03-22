# Color Swatches + Variant Image Swap

Renders native color swatches using Shopify's `swatch.color` and `swatch.image` Liquid objects (available in Dawn 13+ / Winter 2024 Edition). JavaScript swaps the product card image when a swatch is hovered or clicked.

## Requirements

- Shopify OS 2.0 theme (Dawn 13+, Horizon, Craft, or similar)
- Color option named exactly **"Color"** (case-sensitive)

## Setup

1. Copy `swatches.liquid` to `snippets/`
2. Copy `swatches.js` to `assets/`
3. In your product card snippet (e.g., `snippets/card-product.liquid`), replace the existing variant selector with:
   ```liquid
   {% render 'swatches', product: card_product %}
   {{ 'swatches.js' | asset_url | script_tag }}
   ```

## How It Works

Each swatch button stores the variant image URL in a `data-image` attribute. When clicked or hovered, `swatches.js` swaps the card's `<img>` `src` and `srcset` with no page reload and no API calls.
