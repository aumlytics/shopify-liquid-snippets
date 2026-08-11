# Cart Item Quantity Limit

A production-ready Shopify snippet that prevents customers from adding more than a specified quantity of a product to their cart, with real-time validation and user feedback.

## What It Solves

- **Inventory Protection**: Prevents overselling by limiting quantities per product
- **Fair Distribution**: Ensures more customers can purchase limited items
- **User Experience**: Provides immediate feedback when limits are reached
- **Flexibility**: Supports global limits, per-product limits, and collection-based limits

## Features

- ✅ Real-time validation on quantity inputs
- ✅ AJAX cart interception (works with dynamic carts)
- ✅ Form submission validation
- ✅ Accessible error messages with ARIA attributes
- ✅ Customizable messaging
- ✅ Works with product pages, quick-add, and cart page
- ✅ Metafield support for per-product limits
- ✅ OS 2.0 Theme compatible (Dawn, Horizon, Craft)

## Installation

### Step 1: Create the Snippet

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code**
3. Under **Snippets**, click **Add a new snippet**
4. Name it `cart-item-quantity-limit`
5. Paste the contents of `cart-item-quantity-limit.liquid`
6. Save the file

### Step 2: Add JavaScript

1. Under **Assets**, click **Add a new asset**
2. Create a file named `cart-item-quantity-limit.js`
3. Paste the contents of `snippet.js`
4. Save the file

### Step 3: Include the Snippet

Add the snippet to your theme by including it in `theme.liquid` before the closing `</body>` tag:

{% render 'cart-item-quantity-limit',
  default_limit: 5,
  enable_per_product_limits: true,
  limit_message: "Sorry, you can only purchase {limit} of this item.",
  show_remaining: true
%}

### Step 4: (Optional) Set Per-Product Limits via Metafields

1. Go to **Settings > Custom data > Products**
2. Add a metafield definition:
   - Name: `Quantity Limit`
   - Namespace and key: `custom.quantity_limit`
   - Type: `Integer`
3. Edit products and set individual limits as needed

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `default_limit` | Integer | `10` | Default maximum quantity per product |
| `enable_per_product_limits` | Boolean | `true` | Allow products to have individual limits via metafields |
| `limit_message` | String | `"Maximum {limit} per order"` | Message shown when limit is reached. Use `{limit}` as placeholder |
| `show_remaining` | Boolean | `true` | Show remaining quantity available |
| `remaining_message` | String | `"{remaining} remaining"` | Message for remaining quantity. Use `{remaining}` as placeholder |
| `enforce_on_cart_page` | Boolean | `true` | Also enforce limits on the cart page |
| `collection_limits` | Object | `nil` | JSON object of collection handle to limit mappings |
| `excluded_products` | String | `""` | Comma-separated list of product handles to exclude |
| `error_position` | String | `"below"` | Position of error message: `"below"`, `"above"`, or `"toast"` |
| `animation` | String | `"shake"` | Error animation: `"shake"`, `"pulse"`, or `"none"` |

## Usage Examples

### Basic Usage (Global Limit)

```liquid
{% render 'cart-item-quantity-limit', default_limit: 3 %}
```

### Per-Product Limits with Metafields

```liquid
{% render 'cart-item-quantity-limit',
  default_limit: 10,
  enable_per_product_limits: true,
  limit_message: "Limited to {limit} per customer"
%}
```

### Collection-Based Limits

```liquid
{% render 'cart-item-quantity-limit',
  default_limit: 10,
  collection_limits: '{"limited-edition": 2, "sale": 5, "new-arrivals": 3}'
%}
```

### Exclude Certain Products

```liquid
{% render 'cart-item-quantity-limit',
  default_limit: 5,
  excluded_products: "gift-card,bundle-deal,subscription-box"
%}
```

### Custom Styling with Toast Notifications

```liquid
{% render 'cart-item-quantity-limit',
  default_limit: 3,
  error_position: "toast",
  animation: "pulse",
  limit_message: "🚫 Maximum {limit} allowed per order"
%}
```

### Full Configuration Example

```liquid
{% render 'cart-item-quantity-limit',
  default_limit: 5,
  enable_per_product_limits: true,
  limit_message: "Sorry, this item is limited to {limit} per order",
  show_remaining: true,
  remaining_message: "Only {remaining} more available to add",
  enforce_on_cart_page: true,
  collection_limits: '{"flash-sale": 1, "limited-edition": 2}',
  excluded_products: "gift-card",
  error_position: "below",
  animation: "shake"
%}
```

## How It Works

1. **Initialization**: On page load, the snippet scans for quantity inputs and add-to-cart forms
2. **Data Attributes**: Product limits are stored as `data-quantity-limit` attributes
3. **Event Listeners**: Monitors `change`, `input`, and `submit` events
4. **AJAX Interception**: Overrides `fetch` and `XMLHttpRequest` to catch dynamic cart updates
5. **Validation**: Checks current cart quantities + requested quantity against limits
6. **Feedback**: Displays accessible error messages and prevents invalid submissions

## Customizing Styles

The snippet includes scoped CSS that you can override in your theme's stylesheet:

```css
/* Override error message styling */
.qty-limit-error {
  background-color: #your-color !important;
  border-radius: 8px !important;
}

/* Override toast positioning */
.qty-limit-toast {
  top: 100px !important;
}

/* Custom shake animation */
@keyframes qty-limit-shake {
  /* Your custom keyframes */
}
```

## Troubleshooting

### Limits Not Working on Quick-Add

Ensure the quick-add buttons have the proper data attributes. Add to your quick-add snippet:

```liquid
data-product-id="{{ product.id }}"
data-variant-id="{{ product.selected_or_first_available_variant.id }}"
```

### AJAX Cart Not Being Intercepted

Some themes use custom cart implementations. Check that your theme uses standard `/cart/add.js` or `/cart/change.js` endpoints.

### Metafield Limits Not Applying

Verify the metafield namespace and key match exactly: `custom.quantity_limit`

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT License - Free for personal and commercial use.

---
