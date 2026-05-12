# Buy X Get Y Discount Display

A production-ready Shopify snippet that displays BOGO/BXGY (Buy X Get Y) promotion details on product pages and calculates real-time savings without requiring any third-party apps.

## What This Solves

Merchants frequently run "Buy X Get Y" promotions but struggle to communicate these deals effectively to customers. This snippet:

- **Displays promotion details prominently** on product pages
- **Calculates real-time savings** based on current cart context
- **Works with Shopify's native automatic discounts** (no app dependencies)
- **Supports multiple promotion types**: BOGO, Buy 2 Get 1, percentage off, fixed amount off
- **Enhances conversion** by showing clear value propositions

## Features

- ✅ Zero external dependencies
- ✅ Full OS 2.0 theme compatibility (Dawn, Horizon, Craft, etc.)
- ✅ WCAG 2.1 AA accessible
- ✅ Mobile-responsive design
- ✅ RTL language support
- ✅ Customizable through theme editor
- ✅ Performance optimized (no layout shifts)
- ✅ Works with automatic discounts API

## Installation

### Step 1: Create the Snippet Files

1. In your Shopify admin, go to **Online Store → Themes → Edit code**
2. Under **Snippets**, click **Add a new snippet**
3. Name it `buy-x-get-y-discount-display` and paste the Liquid code
4. Under **Assets**, click **Add a new asset**
5. Name it `buy-x-get-y-discount-display.js` and paste the JavaScript code

### Step 2: Include in Product Template

Add this line to your `sections/main-product.liquid` or product template where you want the promotion to appear:

{% render 'buy-x-get-y-discount-display',
  product: product,
  promotion_type: 'bogo',
  buy_quantity: 2,
  get_quantity: 1,
  discount_type: 'percentage',
  discount_value: 100,
  promotion_title: 'Buy 2 Get 1 FREE!',
  show_savings: true,
  show_progress: true
%}

### Step 3: Configure Your Promotion

Set up a matching **Automatic Discount** in Shopify Admin (Settings → Discounts) to ensure the discount actually applies at checkout.

## Parameters Reference

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `product` | Object | Required | The product object to display promotion for |
| `promotion_type` | String | `'bxgy'` | Type: `'bogo'`, `'bxgy'`, `'bundle'`, `'tiered'` |
| `buy_quantity` | Number | `2` | Quantity customer must buy |
| `get_quantity` | Number | `1` | Quantity customer receives discounted |
| `discount_type` | String | `'percentage'` | Type: `'percentage'`, `'fixed_amount'`, `'free'` |
| `discount_value` | Number | `100` | Discount amount (100 = 100% or $100 based on type) |
| `promotion_title` | String | Auto-generated | Custom promotion headline |
| `promotion_description` | String | Auto-generated | Custom description text |
| `eligible_products` | String | `'current'` | Scope: `'current'`, `'collection'`, `'all'` |
| `eligible_collection` | String | `''` | Collection handle if scope is 'collection' |
| `show_savings` | Boolean | `true` | Display calculated savings amount |
| `show_progress` | Boolean | `true` | Show progress bar toward deal |
| `show_countdown` | Boolean | `false` | Display countdown timer |
| `end_date` | String | `''` | Promotion end date (ISO format) |
| `badge_text` | String | `'DEAL'` | Badge label text |
| `theme_color` | String | `'#008060'` | Primary accent color |
| `position` | String | `'below-price'` | Display position hint |

## Example Configurations

### Classic BOGO (Buy One Get One Free)
```liquid
{% render 'buy-x-get-y-discount-display',
  product: product,
  promotion_type: 'bogo',
  buy_quantity: 1,
  get_quantity: 1,
  discount_type: 'free',
  discount_value: 100,
  promotion_title: 'Buy One Get One FREE!'
%}
```

### Buy 2 Get 1 50% Off
```liquid
{% render 'buy-x-get-y-discount-display',
  product: product,
  promotion_type: 'bxgy',
  buy_quantity: 2,
  get_quantity: 1,
  discount_type: 'percentage',
  discount_value: 50,
  promotion_title: 'Buy 2, Get 1 at 50% Off'
%}
```

### Buy 3 Get $10 Off
```liquid
{% render 'buy-x-get-y-discount-display',
  product: product,
  promotion_type: 'bxgy',
  buy_quantity: 3,
  get_quantity: 1,
  discount_type: 'fixed_amount',
  discount_value: 10,
  show_countdown: true,
  end_date: '2025-01-31T23:59:59'
%}
```

### Tiered Bundle Deal
```liquid
{% render 'buy-x-get-y-discount-display',
  product: product,
  promotion_type: 'tiered',
  buy_quantity: 5,
  get_quantity: 1,
  discount_type: 'percentage',
  discount_value: 20,
  promotion_title: 'Buy 5+ Save 20%',
  eligible_products: 'collection',
  eligible_collection: 'sale-items'
%}
```

## Customization

### CSS Custom Properties

Override these CSS variables in your theme's CSS for easy customization:

```css
:root {
  --bxgy-primary-color: #008060;
  --bxgy-secondary-color: #004c3f;
  --bxgy-background: #f0fdf4;
  --bxgy-border-radius: 8px;
  --bxgy-badge-background: #dc2626;
  --bxgy-progress-height: 8px;
}
```

### Theme Editor Integration

Add this to your `config/settings_schema.json` for theme editor controls:

```json
{
  "name": "Buy X Get Y Promotions",
  "settings": [
    {
      "type": "checkbox",
      "id": "bxgy_enabled",
      "label": "Enable BXGY promotions",
      "default": true
    },
    {
      "type": "color",
      "id": "bxgy_theme_color",
      "label": "Promotion accent color",
      "default": "#008060"
    }
  ]
}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## Accessibility

This snippet follows WCAG 2.1 AA guidelines:
- Proper heading hierarchy
- ARIA labels for interactive elements
- Screen reader announcements for dynamic updates
- Keyboard navigation support
- Sufficient color contrast ratios
- Reduced motion support

## Troubleshooting

### Promotion not displaying
1. Ensure the product object is passed correctly
2. Check that `buy_quantity` is greater than 0
3. Verify no Liquid syntax errors in the theme

### Savings calculation incorrect
1. Confirm product has a valid price
2. Check `discount_type` matches `discount_value` format
3. Ensure cart data is loading (check browser console)

### Countdown not working
1. Verify `show_countdown: true` is set
2. Check `end_date` is valid ISO format
3. Ensure end date is in the future

## Performance Notes

- Snippet uses CSS containment for paint optimization
- JavaScript is deferred and non-blocking
- No external API calls on page load
- Cart data fetched only when progress bar is enabled
- IntersectionObserver used for lazy initialization

## License

MIT License - Free for commercial and personal use.

---
