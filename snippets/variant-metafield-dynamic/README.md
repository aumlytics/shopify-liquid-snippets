# Variant Metafield Display (Dynamic)

Shows a product metafield value that updates in real time when the customer switches variants — without a page reload. Solves the most common Shopify metafield complaint: `{{ product.selected_or_first_available_variant.metafields.custom.key }}` renders once on load and never updates.

## Setup

1. Copy `variant-metafield.liquid` to your theme's `snippets/` folder
2. In `sections/main-product.liquid` (or your product template), add:
   ```liquid
   {% render 'variant-metafield',
     product: product,
     metafield_namespace: 'custom',
     metafield_key: 'material',
     label: 'Material'
   %}
   ```
3. The script reads all variant metafield data embedded as JSON and swaps the displayed value when the variant selector changes.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `product` | The product object | required |
| `metafield_namespace` | Metafield namespace | `custom` |
| `metafield_key` | Metafield key | required |
| `label` | Display label | `''` |

## How It Works

All variant metafield values are serialized into a `data-` attribute on load (no extra API calls). A small JS listener watches for Shopify's `variant:changed` event and swaps the displayed value from the pre-loaded map.
