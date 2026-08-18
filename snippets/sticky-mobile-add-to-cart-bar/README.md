# Sticky Mobile Add to Cart Bar

A conversion-optimized sticky bottom bar for mobile devices that appears when the main add-to-cart button scrolls out of view, keeping the purchase option always accessible.

## What It Solves

On mobile product pages, users often scroll down to read descriptions, reviews, or view additional images. When they decide to purchase, they must scroll back up to find the add-to-cart button. This friction point can lead to:

- Abandoned purchases due to inconvenience
- Lower mobile conversion rates
- Poor user experience on long product pages

This snippet eliminates that friction by providing a persistent, accessible add-to-cart option.

## Features

- ✅ Appears only when main ATC button is out of view
- ✅ Smooth slide-up/slide-down animations
- ✅ Shows product title, price, and variant info
- ✅ Respects variant selection from main product form
- ✅ Handles sold-out and unavailable states
- ✅ Fully accessible (ARIA labels, keyboard navigation)
- ✅ Works with OS 2.0 themes (Dawn, Horizon, Craft)
- ✅ Mobile-only (hidden on tablet/desktop)
- ✅ No external dependencies
- ✅ Respects reduced motion preferences

## Installation

### Step 1: Create the Snippet File

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code** on your active theme
3. Under **Snippets**, click **Add a new snippet**
4. Name it `sticky-mobile-add-to-cart-bar`
5. Paste the contents of `sticky-mobile-add-to-cart-bar.liquid`
6. Save the file

### Step 2: Include the Snippet

Add the snippet to your product template. The location depends on your theme:

**For Dawn/OS 2.0 themes:**

Edit `sections/main-product.liquid` and add before the closing `</section>` tag:

```liquid
{% render 'sticky-mobile-add-to-cart-bar',
  product: product,
  current_variant: current_variant,
  product_form_id: product_form_id
%}

**For themes using product.liquid:**

Edit `templates/product.liquid` and add near the bottom:

```liquid
{% render 'sticky-mobile-add-to-cart-bar',
  product: product,
  current_variant: product.selected_or_first_available_variant
%}
```

### Step 3: Identify Your Main ATC Button

The snippet needs to know which element is your main add-to-cart button to detect when it's out of view. By default, it looks for `[name="add"]` which works for most themes.

If your theme uses a different selector, update the `main_atc_selector` parameter:

```liquid
{% render 'sticky-mobile-add-to-cart-bar',
  product: product,
  current_variant: current_variant,
  main_atc_selector: '.product-form__submit'
%}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `product` | Object | **Required** | The product object |
| `current_variant` | Object | First available variant | The currently selected variant |
| `product_form_id` | String | Auto-generated | ID of the main product form (for variant sync) |
| `main_atc_selector` | String | `'[name="add"]'` | CSS selector for the main ATC button |
| `show_variant_title` | Boolean | `true` | Show the selected variant title |
| `show_compare_price` | Boolean | `true` | Show compare-at price if on sale |
| `show_product_image` | Boolean | `true` | Show product thumbnail |
| `bar_background` | String | `'#ffffff'` | Background color of the bar |
| `button_background` | String | `'#000000'` | Add to cart button background |
| `button_text_color` | String | `'#ffffff'` | Add to cart button text color |
| `z_index` | Number | `999` | Z-index of the sticky bar |
| `breakpoint` | Number | `749` | Max screen width to show bar (px) |

## Example Usage

### Basic Usage

```liquid
{% render 'sticky-mobile-add-to-cart-bar',
  product: product,
  current_variant: current_variant
%}
```

### Customized Colors (Match Your Brand)

```liquid
{% render 'sticky-mobile-add-to-cart-bar',
  product: product,
  current_variant: current_variant,
  bar_background: '#f8f8f8',
  button_background: '#2563eb',
  button_text_color: '#ffffff'
%}
```

### Minimal Display (No Image, No Variant Title)

```liquid
{% render 'sticky-mobile-add-to-cart-bar',
  product: product,
  current_variant: current_variant,
  show_product_image: false,
  show_variant_title: false
%}
```

### Custom ATC Selector (For Non-Standard Themes)

```liquid
{% render 'sticky-mobile-add-to-cart-bar',
  product: product,
  current_variant: current_variant,
  main_atc_selector: '#AddToCart-product-template'
%}
```

## How It Works

1. **Intersection Observer**: The snippet uses the Intersection Observer API to efficiently detect when the main ATC button enters/exits the viewport
2. **Variant Sync**: Listens for `variant:change` and native Shopify variant change events to stay in sync with the main product form
3. **Form Submission**: Uses the Cart AJAX API for seamless add-to-cart without page reload
4. **Accessibility**: Full keyboard navigation, ARIA labels, and screen reader support

## Browser Support

- Chrome 58+
- Firefox 55+
- Safari 12.1+
- Edge 79+
- iOS Safari 12.2+
- Chrome for Android 58+

For browsers without Intersection Observer support, the bar will always be visible on mobile (progressive enhancement).

## Troubleshooting

### Bar doesn't appear
1. Check that you're viewing on mobile (or resize browser below 749px)
2. Verify the `main_atc_selector` matches your theme's ATC button
3. Check browser console for JavaScript errors

### Bar doesn't sync with variant changes
1. Ensure `product_form_id` matches your theme's product form ID
2. Some themes use custom variant change events - check your theme's JS

### Styling conflicts
1. Increase the `z_index` parameter if bar appears behind other elements
2. Check for CSS that might override the scoped styles

### Add to cart not working
1. Verify your theme has the Cart API enabled
2. Check that the product/variant is available for sale
3. Look for JavaScript errors in the console

## Customization

### Changing the Animation

Find the CSS transitions in the snippet and modify:

```css
/* Change slide-up speed */
transform: translateY(0);
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Adding Quantity Selector

The snippet can be extended to include a quantity selector. Add the HTML inside the form and update the JavaScript to handle quantity changes.

### Integrating with Cart Drawer

If your theme uses a cart drawer, modify the `addToCart()` function to trigger the drawer after successful addition:

```javascript
// After successful add to cart
document.dispatchEvent(new CustomEvent('cart:refresh'));
// Or trigger your theme's cart drawer
```

## Performance

- **No layout shift**: Bar is positioned fixed, doesn't affect page layout
- **Minimal JavaScript**: ~3KB minified
- **Efficient observers**: Uses Intersection Observer instead of scroll events
- **Scoped CSS**: No conflicts with theme styles

## License

MIT License - Free for personal and commercial use.

## Support

For issues or feature requests, please open an issue in the repository.
```

---
