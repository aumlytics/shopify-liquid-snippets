# Quantity Breaks Tiered Pricing Display

A Shopify snippet that displays volume discount pricing tiers on product pages and automatically updates the unit price when customers adjust quantity, encouraging bulk purchases.

## What It Solves

- **Increases Average Order Value (AOV)**: Visual pricing tiers encourage customers to buy more
- **Reduces Friction**: Customers see savings instantly without calculating themselves
- **Improves Transparency**: Clear pricing structure builds trust
- **Enhances UX**: Real-time price updates provide immediate feedback

## Features

- 🎯 Dynamic price updates based on quantity selection
- 💰 Visual savings calculator showing total discount
- 📱 Fully responsive design
- ♿ WCAG 2.1 AA accessible
- 🎨 Customizable via CSS variables
- 🔧 Works with Shopify's native quantity selectors
- 📦 No external dependencies
- 🚀 Optimized for performance

## Installation

### Step 1: Create the Liquid Snippet

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code**
3. Under **Snippets**, click **Add a new snippet**
4. Name it `quantity-breaks-tiered-pricing`
5. Paste the contents of `quantity-breaks-tiered-pricing.liquid`
6. Save the file

### Step 2: Add the JavaScript

1. Under **Assets**, click **Add a new asset**
2. Create a file named `quantity-breaks-tiered-pricing.js`
3. Paste the contents of `snippet.js`
4. Save the file

### Step 3: Include in Product Template

Add this to your product template (usually `sections/main-product.liquid` or `templates/product.json`):

```liquid
{% render 'quantity-breaks-tiered-pricing',
  product: product,
  current_variant: product.selected_or_first_available_variant
%}

### Step 4: Configure Pricing Tiers

#### Option A: Using Metafields (Recommended)

Create a product metafield with namespace `custom` and key `quantity_breaks`:

```json
[
  {"min_qty": 1, "max_qty": 4, "discount_percent": 0},
  {"min_qty": 5, "max_qty": 9, "discount_percent": 10},
  {"min_qty": 10, "max_qty": 24, "discount_percent": 15},
  {"min_qty": 25, "max_qty": null, "discount_percent": 20}
]
```

#### Option B: Using Snippet Parameters

```liquid
{% render 'quantity-breaks-tiered-pricing',
  product: product,
  current_variant: product.selected_or_first_available_variant,
  tier_1_qty: 5,
  tier_1_discount: 10,
  tier_2_qty: 10,
  tier_2_discount: 15,
  tier_3_qty: 25,
  tier_3_discount: 20
%}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `product` | Object | Required | The product object |
| `current_variant` | Object | Required | The currently selected variant |
| `show_savings` | Boolean | `true` | Show the "You Save" calculator |
| `show_unit_price` | Boolean | `true` | Display the per-unit price |
| `highlight_best_value` | Boolean | `true` | Highlight the best value tier |
| `tier_1_qty` | Number | `5` | Minimum quantity for tier 1 |
| `tier_1_discount` | Number | `10` | Discount percentage for tier 1 |
| `tier_2_qty` | Number | `10` | Minimum quantity for tier 2 |
| `tier_2_discount` | Number | `15` | Discount percentage for tier 2 |
| `tier_3_qty` | Number | `25` | Minimum quantity for tier 3 |
| `tier_3_discount` | Number | `20` | Discount percentage for tier 3 |
| `currency_symbol` | String | `$` | Currency symbol to display |
| `heading_text` | String | `Buy More, Save More` | Section heading |
| `quantity_selector` | String | `[name="quantity"]` | CSS selector for quantity input |

## Customization

### CSS Variables

Override these CSS variables in your theme's stylesheet:

```css
:root {
  --qb-primary-color: #2c6e49;
  --qb-primary-hover: #1e4d34;
  --qb-background: #f8faf9;
  --qb-border-color: #e0e7e3;
  --qb-active-background: #e8f5e9;
  --qb-active-border: #2c6e49;
  --qb-best-value-bg: #fff3cd;
  --qb-best-value-color: #856404;
  --qb-savings-color: #2c6e49;
  --qb-text-primary: #1a1a1a;
  --qb-text-secondary: #666666;
  --qb-border-radius: 8px;
}
```

### Custom Styling Example

```css
/* Make tiers horizontal on desktop */
@media (min-width: 768px) {
  .qb-tiers-list {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .qb-tier-item {
    flex: 1 1 calc(50% - 0.5rem);
  }
}
```

## Integration Examples

### With Dawn Theme

```liquid
{%- comment -%} In sections/main-product.liquid, after the quantity selector {%- endcomment -%}
<div class="product-form__quantity-breaks">
  {% render 'quantity-breaks-tiered-pricing',
    product: product,
    current_variant: product.selected_or_first_available_variant,
    quantity_selector: '.quantity__input'
  %}
</div>
```

### With AJAX Cart

The snippet automatically dispatches custom events you can listen for:

```javascript
document.addEventListener('quantityBreaks:tierChanged', (event) => {
  const { tier, quantity, unitPrice, totalPrice, savings } = event.detail;
  // Update your cart or UI
});

document.addEventListener('quantityBreaks:priceUpdated', (event) => {
  const { originalPrice, discountedPrice, discountPercent } = event.detail;
  // Sync with your cart functionality
});
```

### With Variant Changes

```javascript
document.addEventListener('variant:changed', (event) => {
  const newVariant = event.detail.variant;
  // The snippet handles this automatically if you use Shopify's native variant selector
});
```

## Accessibility Features

- Full keyboard navigation support
- ARIA labels for screen readers
- Live regions for price updates
- High contrast mode support
- Focus indicators
- Semantic HTML structure

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Chrome for Android 60+

## Troubleshooting

### Prices not updating

1. Verify the `quantity_selector` parameter matches your theme's quantity input
2. Check browser console for JavaScript errors
3. Ensure the snippet is included after the quantity selector in the DOM

### Tiers not showing

1. Confirm the product has valid pricing
2. Check that either metafields or parameters are configured
3. Verify the variant is available for purchase

### Styling conflicts

1. The snippet uses scoped CSS with `.qb-` prefix
2. Use `!important` sparingly if needed
3. Increase specificity rather than using `!important`

## Performance Notes

- JavaScript is loaded with `defer` attribute
- CSS is inlined to prevent FOUC
- Event listeners use delegation for efficiency
- Calculations are debounced for smooth UX

## License

MIT License - Use freely in your Shopify projects.

## Changelog

### v1.0.0
- Initial release
- Dynamic pricing tiers
- Savings calculator
- Full accessibility support
```

---
