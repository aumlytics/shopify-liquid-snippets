# Compare At Price Bulk Display

A production-ready Shopify snippet that dynamically displays compare-at pricing with savings calculations on collection pages and product cards. Handles multiple variants with different compare prices gracefully.

## What It Solves

- **Inconsistent Pricing Display**: Shows compare-at prices consistently across all collection pages and product cards
- **Multiple Variant Handling**: Gracefully handles products with variants that have different compare-at prices (shows price ranges)
- **Dynamic Savings Calculation**: Automatically calculates and displays savings in both percentage and absolute values
- **Accessibility**: Full screen reader support with proper ARIA labels
- **Performance**: Minimal JavaScript with CSS-first approach

## Features

- ✅ OS 2.0 Compatible (Dawn, Horizon, Craft, and custom themes)
- ✅ Responsive design with mobile-first approach
- ✅ Accessible (WCAG 2.1 AA compliant)
- ✅ No external dependencies
- ✅ Handles edge cases (no compare price, variant ranges, sale badges)
- ✅ Customizable via snippet parameters
- ✅ RTL language support
- ✅ Multi-currency compatible

## Installation

### Step 1: Add the Liquid Snippet

Copy `compare-at-price-bulk-display.liquid` to your theme's `snippets/` folder.

### Step 2: Add the JavaScript (Optional)

Copy `snippet.js` contents to your theme's `assets/` folder as `compare-at-price-bulk-display.js`, or inline it in your theme.

### Step 3: Include in Your Theme

Add the snippet to your product card or collection template:

```liquid
{% render 'compare-at-price-bulk-display',
  product: product,
  show_badge: true,
  badge_style: 'percentage'
%}

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `product` | Object | **Required** | The Shopify product object |
| `current_variant` | Object | `product.selected_or_first_available_variant` | Specific variant to display pricing for |
| `show_badge` | Boolean | `true` | Whether to show the sale/savings badge |
| `badge_style` | String | `'percentage'` | Badge display type: `'percentage'`, `'amount'`, or `'both'` |
| `show_savings_text` | Boolean | `true` | Show "You save X" text below price |
| `price_class` | String | `''` | Additional CSS class for price container |
| `show_range` | Boolean | `true` | Show price range if variants have different prices |
| `locale_aware` | Boolean | `true` | Use shop's locale for number formatting |
| `compare_label` | String | `'Regular price'` | Screen reader label for compare price |
| `sale_label` | String | `'Sale price'` | Screen reader label for sale price |
| `hide_cents_if_zero` | Boolean | `false` | Hide .00 cents (e.g., $25 instead of $25.00) |

## Usage Examples

### Basic Usage (Product Card)

```liquid
{% for product in collection.products %}
  <div class="product-card">
    <h3>{{ product.title }}</h3>
    {% render 'compare-at-price-bulk-display', product: product %}
  </div>
{% endfor %}
```

### With Custom Badge Style

```liquid
{% render 'compare-at-price-bulk-display',
  product: product,
  badge_style: 'both',
  show_savings_text: true
%}
```

### For Specific Variant

```liquid
{% render 'compare-at-price-bulk-display',
  product: product,
  current_variant: product.variants.first,
  show_range: false
%}
```

### Minimal Display (Price Only)

```liquid
{% render 'compare-at-price-bulk-display',
  product: product,
  show_badge: false,
  show_savings_text: false
%}
```

### In a Section Schema

```liquid
{% schema %}
{
  "name": "Product Grid",
  "settings": [
    {
      "type": "checkbox",
      "id": "show_sale_badge",
      "label": "Show sale badge",
      "default": true
    },
    {
      "type": "select",
      "id": "badge_style",
      "label": "Badge style",
      "options": [
        { "value": "percentage", "label": "Percentage off" },
        { "value": "amount", "label": "Amount saved" },
        { "value": "both", "label": "Both" }
      ],
      "default": "percentage"
    }
  ]
}
{% endschema %}

{% render 'compare-at-price-bulk-display',
  product: product,
  show_badge: section.settings.show_sale_badge,
  badge_style: section.settings.badge_style
%}
```

## Customization

### CSS Custom Properties

Override these CSS variables in your theme's stylesheet:

```css
:root {
  --cap-sale-color: #dc2626;
  --cap-compare-color: #6b7280;
  --cap-badge-bg: #dc2626;
  --cap-badge-color: #ffffff;
  --cap-badge-radius: 4px;
  --cap-font-size-price: 1.125rem;
  --cap-font-size-compare: 0.875rem;
  --cap-font-size-badge: 0.75rem;
  --cap-spacing: 0.5rem;
}
```

### Theme Integration (Dawn)

For Dawn theme, add to `snippets/price.liquid` or replace the existing price display:

```liquid
{% comment %}
  Replace Dawn's default price display with compare-at-price-bulk-display
{% endcomment %}
{% render 'compare-at-price-bulk-display',
  product: product,
  current_variant: current_variant,
  show_badge: settings.show_sale_badge
%}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## Troubleshooting

### Prices Not Updating on Variant Change

Ensure you've included the JavaScript file and that your theme fires the `variant:changed` event. Add this to your variant selector:

```javascript
document.dispatchEvent(new CustomEvent('variant:changed', {
  detail: { variant: selectedVariant }
}));
```

### Badge Not Showing

Check that:
1. The product has a compare-at price set
2. `show_badge` parameter is `true`
3. The compare-at price is greater than the actual price

### Styling Conflicts

Add a custom `price_class` to scope your overrides:

```liquid
{% render 'compare-at-price-bulk-display',
  product: product,
  price_class: 'my-custom-price'
%}
```

## Changelog

### v1.0.0
- Initial release
- Full OS 2.0 compatibility
- Accessibility improvements
- Multi-variant support
```

---
