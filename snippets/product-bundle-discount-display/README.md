# Product Bundle Discount Display

A production-ready Shopify snippet that displays dynamic bundle pricing and savings when customers add multiple complementary products together. Shows real-time discount calculations and encourages higher average order values.

## What It Solves

- Displays bundle pricing for complementary products
- Shows real-time savings calculations as customers select items
- Encourages higher AOV through visual discount incentives
- Provides clear pricing transparency for bundle deals
- Supports tiered discounts (buy more, save more)

## Features

- 🎯 Dynamic price calculations with real-time updates
- 💰 Tiered discount support (e.g., 10% for 2 items, 15% for 3+)
- 🎨 Fully customizable styling via CSS variables
- ♿ WCAG 2.1 AA accessible
- 📱 Fully responsive design
- 🚀 Zero external dependencies
- 🛒 Direct add-to-cart functionality for entire bundle
- ⚡ Optimized performance with debounced calculations

## Installation

### Step 1: Create the Liquid Snippet

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code**
3. Under `snippets/`, click **Add a new snippet**
4. Name it `product-bundle-discount-display`
5. Paste the contents of `product-bundle-discount-display.liquid`
6. Click **Save**

### Step 2: Add the JavaScript

1. Under `assets/`, click **Add a new asset**
2. Upload or create `product-bundle-discount.js`
3. Paste the contents of `snippet.js`
4. Click **Save**

### Step 3: Include in Your Theme

Add to your `product.liquid`, `main-product.liquid`, or relevant section:

```liquid
{% render 'product-bundle-discount-display',
  bundle_products: bundle_collection.products,
  bundle_title: 'Complete the Look',
  discount_type: 'percentage',
  discount_tiers: '2:10,3:15,4:20'
%}

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `bundle_products` | Array | `nil` | Array of product objects to display in bundle |
| `bundle_product_handles` | String | `nil` | Comma-separated product handles (alternative to bundle_products) |
| `bundle_title` | String | `'Bundle & Save'` | Title displayed above the bundle |
| `bundle_description` | String | `''` | Optional description text |
| `discount_type` | String | `'percentage'` | Type of discount: `percentage` or `fixed` |
| `discount_tiers` | String | `'2:10,3:15'` | Tier configuration as `quantity:discount` pairs |
| `max_bundle_items` | Number | `6` | Maximum items allowed in bundle |
| `show_individual_prices` | Boolean | `true` | Show original prices per item |
| `show_savings_badge` | Boolean | `true` | Show savings badge on bundle |
| `primary_color` | String | `'#000000'` | Primary accent color |
| `sale_color` | String | `'#e63946'` | Color for sale/discount elements |
| `enable_quick_add` | Boolean | `true` | Enable add-all-to-cart functionality |
| `preselect_all` | Boolean | `false` | Pre-select all bundle items |
| `current_product` | Product | `product` | Current product (auto-included in bundle) |
| `show_current_product` | Boolean | `true` | Include current product in bundle display |

## Example Configurations

### Basic Bundle (2+ items = 10% off)

```liquid
{% render 'product-bundle-discount-display',
  bundle_product_handles: 'product-1,product-2,product-3',
  discount_tiers: '2:10'
%}
```

### Tiered Discounts

```liquid
{% render 'product-bundle-discount-display',
  bundle_products: collections['accessories'].products | limit: 4,
  discount_tiers: '2:10,3:15,4:20',
  bundle_title: 'Build Your Set',
  bundle_description: 'The more you add, the more you save!'
%}
```

### Fixed Amount Discounts

```liquid
{% render 'product-bundle-discount-display',
  bundle_product_handles: 'shirt-blue,pants-khaki,belt-leather',
  discount_type: 'fixed',
  discount_tiers: '2:15,3:30',
  bundle_title: 'Complete Outfit Deal',
  show_savings_badge: true
%}
```

### Metafield-Driven Bundles

```liquid
{% assign bundle_handles = product.metafields.custom.bundle_products.value %}
{% render 'product-bundle-discount-display',
  bundle_product_handles: bundle_handles,
  discount_tiers: product.metafields.custom.bundle_discount_tiers.value | default: '2:10,3:15'
%}
```

### Collection-Based Bundle

```liquid
{% assign related = collections[product.metafields.custom.related_collection].products | limit: 5 %}
{% render 'product-bundle-discount-display',
  bundle_products: related,
  current_product: product,
  preselect_all: false,
  bundle_title: 'Frequently Bought Together'
%}
```

## Discount Tiers Explained

The `discount_tiers` parameter accepts a comma-separated string of `quantity:discount` pairs:

- `'2:10'` = 10% off when 2 items selected
- `'2:10,3:15'` = 10% off for 2 items, 15% off for 3+ items
- `'2:10,3:15,4:20,5:25'` = Progressive discounts

For `fixed` discount type, values represent currency amounts instead of percentages.

## Customization

### CSS Variables

Override these in your theme's CSS:

```css
:root {
  --bundle-primary-color: #000000;
  --bundle-sale-color: #e63946;
  --bundle-border-radius: 8px;
  --bundle-spacing: 1rem;
  --bundle-card-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

### Styling Classes

- `.product-bundle` - Main container
- `.product-bundle__header` - Title and description area
- `.product-bundle__grid` - Product cards grid
- `.product-bundle__card` - Individual product card
- `.product-bundle__summary` - Pricing summary section
- `.product-bundle__cta` - Add to cart button

## Cart Integration

The snippet uses Shopify's Cart API to add all selected items at once. Ensure your theme's cart is set up to handle AJAX cart additions, or the page will redirect to the cart page.

## Accessibility

- Full keyboard navigation support
- ARIA labels for all interactive elements
- Screen reader announcements for price changes
- Focus management for selections
- Color contrast compliant

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Troubleshooting

### Products Not Displaying

- Verify product handles are correct and products are published
- Check that products are available in the current sales channel
- Ensure bundle_products array is not empty

### Discounts Not Calculating

- Verify discount_tiers format is correct
- Check browser console for JavaScript errors
- Ensure snippet.js is loaded properly

### Add to Cart Not Working

- Verify your theme supports AJAX cart
- Check that product variants are available
- Review browser console for API errors

## Changelog

### v1.0.0
- Initial release
- Tiered discount support
- AJAX cart integration
- Full accessibility support
```

---
