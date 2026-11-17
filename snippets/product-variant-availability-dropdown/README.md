# Product Variant Availability Dropdown

A Shopify snippet that enhances variant selection dropdowns by clearly indicating sold-out variants with disabled states and "Sold Out" labels, improving the customer experience by preventing selection of unavailable product combinations.

## What It Solves

- **Customer Frustration**: Prevents customers from selecting unavailable variants only to see an error
- **Clear Communication**: Visually distinguishes available vs. sold-out options
- **Accessibility**: Screen reader support for availability status
- **Multi-Option Support**: Handles products with multiple option types (Size, Color, Material, etc.)

## Features

- ✅ Disables and greys out sold-out variants
- ✅ Adds "Sold Out" label to unavailable options
- ✅ Works with single and multi-option products
- ✅ Real-time updates when options change
- ✅ Accessible with ARIA labels and keyboard navigation
- ✅ No external dependencies
- ✅ Compatible with Dawn, Horizon, Craft, and other OS 2.0 themes
- ✅ Customizable styling via CSS variables
- ✅ Optional low stock warnings

## Installation

### Step 1: Add the Liquid Snippet

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code** on your active theme
3. Under **Snippets**, click **Add a new snippet**
4. Name it `product-variant-availability-dropdown`
5. Paste the contents of `product-variant-availability-dropdown.liquid`
6. Click **Save**

### Step 2: Add the JavaScript

1. Under **Assets**, click **Add a new asset**
2. Create a file named `product-variant-availability-dropdown.js`
3. Paste the contents of `snippet.js`
4. Click **Save**

### Step 3: Include in Your Product Template

Add this code to your product template (usually `sections/main-product.liquid` or `templates/product.liquid`):

```liquid
{% render 'product-variant-availability-dropdown',
  product: product,
  current_variant: product.selected_or_first_available_variant
%}

### Step 4: Include the JavaScript

Add this to your theme's `layout/theme.liquid` before the closing `</body>` tag, or in your product template:

```liquid
<script src="{{ 'product-variant-availability-dropdown.js' | asset_url }}" defer></script>
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `product` | Product | Yes | - | The product object |
| `current_variant` | Variant | No | First available variant | The currently selected variant |
| `show_availability_count` | Boolean | No | `false` | Show remaining inventory count |
| `low_stock_threshold` | Number | No | `5` | Threshold for "low stock" warning |
| `sold_out_text` | String | No | `"Sold Out"` | Text to display for sold-out options |
| `low_stock_text` | String | No | `"Low Stock"` | Text for low stock warning |
| `select_text` | String | No | `"Select"` | Text prefix for select labels |
| `enable_auto_select` | Boolean | No | `true` | Auto-select first available when sold out selected |
| `class_prefix` | String | No | `"variant-dropdown"` | CSS class prefix for styling |
| `id_prefix` | String | No | `"ProductVariant"` | ID prefix for form elements |

## Example Usage

### Basic Usage

```liquid
{% render 'product-variant-availability-dropdown',
  product: product
%}
```

### With Inventory Count Display

```liquid
{% render 'product-variant-availability-dropdown',
  product: product,
  current_variant: product.selected_or_first_available_variant,
  show_availability_count: true,
  low_stock_threshold: 10
%}
```

### Custom Text Labels

```liquid
{% render 'product-variant-availability-dropdown',
  product: product,
  sold_out_text: "Unavailable",
  low_stock_text: "Only a few left!",
  select_text: "Choose"
%}
```

### Full Customization

```liquid
{% render 'product-variant-availability-dropdown',
  product: product,
  current_variant: current_variant,
  show_availability_count: true,
  low_stock_threshold: 3,
  sold_out_text: "Out of Stock",
  low_stock_text: "Hurry! Low Stock",
  select_text: "Pick your",
  enable_auto_select: false,
  class_prefix: "my-variant",
  id_prefix: "CustomVariant"
%}
```

## Styling Customization

Override CSS variables in your theme's CSS:

```css
:root {
  --variant-dropdown-primary: #000000;
  --variant-dropdown-disabled: #999999;
  --variant-dropdown-disabled-bg: #f5f5f5;
  --variant-dropdown-border: #e0e0e0;
  --variant-dropdown-focus: #005bd3;
  --variant-dropdown-error: #dc2626;
  --variant-dropdown-warning: #f59e0b;
  --variant-dropdown-radius: 8px;
  --variant-dropdown-padding: 12px 16px;
}
```

## JavaScript Events

The snippet dispatches custom events you can listen for:

```javascript
// When a variant is selected
document.addEventListener('variant:changed', (event) => {
  console.log('New variant:', event.detail.variant);
  console.log('Product ID:', event.detail.productId);
});

// When availability is updated
document.addEventListener('variant:availability-updated', (event) => {
  console.log('Available options:', event.detail.availableOptions);
});
```

## Integration with Cart

The snippet includes a hidden input for the variant ID that works with standard Shopify cart forms:

```liquid
<form action="/cart/add" method="post">
  {% render 'product-variant-availability-dropdown', product: product %}
  <button type="submit">Add to Cart</button>
</form>
```

## Troubleshooting

### Variants not updating
- Ensure JavaScript file is loaded after the DOM
- Check browser console for errors
- Verify product has variants

### Styling conflicts
- Use the `class_prefix` parameter to avoid CSS collisions
- Check for `!important` rules in your theme CSS

### Form not submitting correct variant
- Ensure the hidden `id` input is inside your `<form>` tag
- Check that no other scripts are modifying the input value

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## License

MIT License - Free for commercial and personal use.
```

---
