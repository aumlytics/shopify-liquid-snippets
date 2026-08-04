# Add to Cart Quantity Selector with Plus/Minus Buttons

A production-ready Shopify snippet that replaces the default browser number input with beautifully styled plus/minus buttons for quantity selection. Designed for Shopify OS 2.0 themes.

## What It Solves

- **Poor Mobile UX**: Native number inputs are difficult to tap on mobile devices
- **Input Errors**: Users accidentally type invalid quantities or make typos
- **Inconsistent Styling**: Browser number inputs look different across platforms
- **Accessibility Gaps**: Default inputs often lack proper ARIA labels

## Features

- ✅ Fully accessible (WCAG 2.1 AA compliant)
- ✅ Works on product pages and cart
- ✅ Respects inventory limits
- ✅ Supports minimum/maximum quantities
- ✅ Keyboard navigation support
- ✅ Touch-optimized for mobile
- ✅ No external dependencies
- ✅ CSS scoped to prevent conflicts
- ✅ Smooth animations and visual feedback
- ✅ Works with Dawn, Horizon, Craft, and custom OS 2.0 themes

## Installation

### Step 1: Create the Liquid Snippet

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code**
3. Under **Snippets**, click **Add a new snippet**
4. Name it `add-to-cart-quantity-selector`
5. Paste the contents of `add-to-cart-quantity-selector.liquid`
6. Save the file

### Step 2: Add the JavaScript

**Option A: Inline (Recommended for single use)**
The JavaScript is already included in the Liquid snippet.

**Option B: Separate file (For multiple instances)**
1. Under **Assets**, click **Add a new asset**
2. Create `quantity-selector.js`
3. Paste the contents of `snippet.js`
4. Uncomment the script reference in the Liquid file

### Step 3: Include in Your Theme

Add the snippet where you need a quantity selector:

**Product Page (sections/main-product.liquid):**
```liquid
{% render 'add-to-cart-quantity-selector',
  product: product,
  variant: product.selected_or_first_available_variant
%}

**Cart Line Item (sections/main-cart-items.liquid):**
```liquid
{% render 'add-to-cart-quantity-selector',
  line_item: item,
  cart_mode: true
%}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `product` | Product | `nil` | The product object (for product pages) |
| `variant` | Variant | `nil` | The variant object (for inventory checking) |
| `line_item` | Line Item | `nil` | Cart line item (for cart mode) |
| `cart_mode` | Boolean | `false` | Enable cart-specific functionality |
| `initial_quantity` | Integer | `1` | Starting quantity value |
| `min_quantity` | Integer | `1` | Minimum allowed quantity |
| `max_quantity` | Integer | `99` | Maximum allowed quantity (overridden by inventory) |
| `show_label` | Boolean | `true` | Show "Quantity" label |
| `size` | String | `'medium'` | Size variant: 'small', 'medium', 'large' |
| `style` | String | `'default'` | Style variant: 'default', 'minimal', 'rounded' |
| `enable_inventory_tracking` | Boolean | `true` | Respect inventory limits |
| `input_name` | String | `'quantity'` | Name attribute for the input |
| `input_id` | String | auto | Custom ID for the input element |

## Examples

### Basic Product Page Usage

```liquid
{% render 'add-to-cart-quantity-selector',
  product: product,
  variant: product.selected_or_first_available_variant
%}
```

### Cart Line Item

```liquid
{% for item in cart.items %}
  {% render 'add-to-cart-quantity-selector',
    line_item: item,
    cart_mode: true,
    input_name: 'updates[]'
  %}
{% endfor %}
```

### Custom Styling

```liquid
{% render 'add-to-cart-quantity-selector',
  product: product,
  variant: product.selected_or_first_available_variant,
  size: 'large',
  style: 'rounded',
  show_label: false
%}
```

### Limited Quantity (e.g., wholesale minimum)

```liquid
{% render 'add-to-cart-quantity-selector',
  product: product,
  variant: product.selected_or_first_available_variant,
  min_quantity: 6,
  max_quantity: 100,
  initial_quantity: 6
%}
```

### With Custom Input Name (for forms)

```liquid
{% render 'add-to-cart-quantity-selector',
  initial_quantity: 1,
  input_name: 'items[][quantity]',
  input_id: 'quantity-{{ product.id }}'
%}
```

## Customization

### CSS Custom Properties

Override these CSS variables in your theme's CSS to customize appearance:

```css
:root {
  --qty-btn-bg: #f5f5f5;
  --qty-btn-bg-hover: #e0e0e0;
  --qty-btn-bg-active: #d0d0d0;
  --qty-btn-color: #333333;
  --qty-btn-disabled-opacity: 0.4;
  --qty-input-bg: #ffffff;
  --qty-input-border: #dddddd;
  --qty-input-focus-border: #333333;
  --qty-border-radius: 4px;
  --qty-font-family: inherit;
}
```

### JavaScript Events

The component dispatches custom events you can listen to:

```javascript
document.addEventListener('quantity:change', (event) => {
  console.log('New quantity:', event.detail.quantity);
  console.log('Input element:', event.detail.input);
  console.log('Is cart mode:', event.detail.cartMode);
});

document.addEventListener('quantity:limit-reached', (event) => {
  console.log('Limit type:', event.detail.limitType); // 'min' or 'max'
  console.log('Current quantity:', event.detail.quantity);
});
```

## Integration with Theme Cart

For AJAX cart functionality, the component works with standard Shopify patterns:

```javascript
// Example: Update cart when quantity changes in cart mode
document.addEventListener('quantity:change', async (event) => {
  if (!event.detail.cartMode) return;
  
  const { lineItemKey, quantity } = event.detail;
  
  await fetch('/cart/change.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: lineItemKey,
      quantity: quantity
    })
  });
  
  // Refresh cart UI
  location.reload(); // Or use your theme's cart update method
});
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Chrome for Android 60+

## Accessibility Features

- Full keyboard navigation (Tab, Arrow keys, Enter)
- ARIA labels on all interactive elements
- Screen reader announcements for quantity changes
- Focus indicators meet WCAG contrast requirements
- Disabled states properly communicated
- Touch targets meet minimum 44x44px guidelines

## Troubleshooting

### Quantity doesn't update cart
Ensure you're using `cart_mode: true` and have the AJAX cart JavaScript listening to the `quantity:change` event.

### Inventory limits not working
Check that `enable_inventory_tracking: true` and the variant has inventory tracking enabled in Shopify admin.

### Styling conflicts
The component uses scoped CSS with unique class prefixes. If conflicts occur, increase specificity by wrapping in a parent class.

## Changelog

### v1.0.0
- Initial release
- Product page and cart support
- Three size variants
- Three style variants
- Full accessibility support
- Inventory tracking integration

## License

MIT License - Free for personal and commercial use.
```

---
