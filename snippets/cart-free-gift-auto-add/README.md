# Cart Free Gift Auto-Add

**Slug:** `cart-free-gift-auto-add`

## What It Solves

Automatically adds a designated free gift product to the customer's cart when they reach a spending threshold, and seamlessly removes it if they drop below. This creates a compelling incentive for customers to increase their order value while providing a delightful shopping experience.

## Features

- ✅ Automatic gift addition when threshold is reached
- ✅ Automatic gift removal when cart drops below threshold
- ✅ Progress bar showing how close customer is to free gift
- ✅ Prevents customers from manually adding multiple free gifts
- ✅ Works with AJAX cart updates (no page reload needed)
- ✅ Accessible (WCAG 2.1 AA compliant)
- ✅ Mobile responsive
- ✅ Compatible with OS 2.0 themes (Dawn, Horizon, Craft)
- ✅ Customizable messaging and styling
- ✅ Excludes gift product price from threshold calculation

## Installation

### Step 1: Create the Snippet

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code** on your active theme
3. Under **Snippets**, click **Add a new snippet**
4. Name it `cart-free-gift-auto-add`
5. Paste the contents of `cart-free-gift-auto-add.liquid`
6. Save the file

### Step 2: Add JavaScript

1. Under **Assets**, click **Add a new asset**
2. Create a file named `cart-free-gift-auto-add.js`
3. Paste the contents of `snippet.js`
4. Save the file

### Step 3: Include the Snippet

Add the snippet to your theme where you want the progress bar to appear.

**For cart page (`templates/cart.liquid` or `sections/main-cart.liquid`):**

```liquid
{% render 'cart-free-gift-auto-add',
  gift_product_handle: 'free-gift-product-handle',
  threshold_amount: 100,
  threshold_currency: 'USD'
%}

**For cart drawer (typically in `sections/cart-drawer.liquid`):**

```liquid
{% render 'cart-free-gift-auto-add',
  gift_product_handle: 'free-gift-tote-bag',
  threshold_amount: 75,
  show_in_drawer: true
%}
```

### Step 4: Configure Your Free Gift Product

1. Create a product in Shopify for your free gift
2. Set the price to $0.00 (or use a discount code)
3. Note the product handle (found in the URL)
4. Add the tag `free-gift` to the product (recommended)

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `gift_product_handle` | String | Yes | - | The handle of your free gift product |
| `threshold_amount` | Number | Yes | - | Minimum cart value to qualify (in base currency units) |
| `threshold_currency` | String | No | Shop currency | Currency code for display |
| `show_progress_bar` | Boolean | No | `true` | Show/hide the progress bar |
| `show_in_drawer` | Boolean | No | `false` | Optimizes display for cart drawer |
| `progress_bar_color` | String | No | `#4CAF50` | Color of the progress bar fill |
| `background_color` | String | No | `#f5f5f5` | Background color of the component |
| `message_below` | String | No | Auto-generated | Message when below threshold |
| `message_qualified` | String | No | Auto-generated | Message when qualified |
| `gift_image_size` | String | No | `80x80` | Size of the gift product image |
| `exclude_sale_items` | Boolean | No | `false` | Exclude sale items from threshold calculation |
| `max_gifts_allowed` | Number | No | `1` | Maximum free gifts per order |

## Example Configurations

### Basic Setup

```liquid
{% render 'cart-free-gift-auto-add',
  gift_product_handle: 'free-sample-kit',
  threshold_amount: 50
%}
```

### Premium Threshold with Custom Styling

```liquid
{% render 'cart-free-gift-auto-add',
  gift_product_handle: 'luxury-gift-box',
  threshold_amount: 150,
  progress_bar_color: '#gold',
  background_color: '#1a1a1a',
  message_below: 'Add {amount} more for a FREE Luxury Gift Box!',
  message_qualified: '🎁 You\'ve unlocked your FREE gift!'
%}
```

### Multiple Tier Gifts

To implement multiple tiers, include the snippet multiple times:

```liquid
{% comment %} Tier 1: $50 - Free Samples {% endcomment %}
{% render 'cart-free-gift-auto-add',
  gift_product_handle: 'free-samples',
  threshold_amount: 50,
  tier_id: 'tier-1'
%}

{% comment %} Tier 2: $100 - Free Tote {% endcomment %}
{% render 'cart-free-gift-auto-add',
  gift_product_handle: 'free-tote-bag',
  threshold_amount: 100,
  tier_id: 'tier-2'
%}
```

### Cart Drawer Integration

```liquid
{% render 'cart-free-gift-auto-add',
  gift_product_handle: 'mini-gift-set',
  threshold_amount: 75,
  show_in_drawer: true,
  gift_image_size: '60x60'
%}
```

## How It Works

1. **On Page Load:** The snippet checks the current cart total against the threshold
2. **Below Threshold:** Displays a progress bar and message showing how much more is needed
3. **Threshold Reached:** Automatically adds the free gift to cart via AJAX
4. **Cart Updates:** Listens for cart changes and recalculates eligibility
5. **Below Threshold Again:** Automatically removes the gift if cart total drops

## Customization

### Styling

The component uses scoped CSS with custom properties. Override styles in your theme:

```css
.free-gift-promo {
  --fgp-primary-color: #your-brand-color;
  --fgp-background: #your-background;
  --fgp-text-color: #your-text-color;
}
```

### Events

The snippet dispatches custom events you can listen for:

```javascript
document.addEventListener('freeGift:added', (e) => {
  console.log('Gift added:', e.detail);
  // Track with analytics, show notification, etc.
});

document.addEventListener('freeGift:removed', (e) => {
  console.log('Gift removed:', e.detail);
});

document.addEventListener('freeGift:qualified', (e) => {
  console.log('Customer qualified for gift:', e.detail);
});
```

## Troubleshooting

### Gift not being added

1. Verify the product handle is correct
2. Ensure the gift product is published and available
3. Check that the gift has inventory (or tracking is disabled)
4. Verify no cart validation apps are blocking the addition

### Gift being added multiple times

1. Ensure `max_gifts_allowed` is set to `1`
2. Check for duplicate snippet includes
3. Verify the gift product has the `free-gift` tag

### Progress bar not updating

1. Ensure JavaScript file is loading (check browser console)
2. Verify your theme's cart uses standard Shopify AJAX endpoints
3. Check for JavaScript errors in the console

### Not working with custom cart

If your theme uses a custom cart implementation:

```javascript
// Trigger recalculation after your cart updates
document.dispatchEvent(new CustomEvent('cart:updated'));
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## Performance

- No external dependencies
- Minimal DOM operations
- Debounced cart checks
- Lazy-loaded gift product image
- ~3KB JavaScript (minified)
- ~2KB CSS (minified)

## License

MIT License - Free for commercial and personal use.
```

---
