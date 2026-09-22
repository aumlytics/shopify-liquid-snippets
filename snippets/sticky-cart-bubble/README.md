# Sticky Floating Cart Bubble

A persistent floating cart icon that follows users as they scroll, displaying the current item count and providing one-click access to the cart from anywhere on the page.

## What It Solves

- **Lost conversions**: Users can access their cart instantly without scrolling back to the header
- **Mobile UX**: Provides a thumb-friendly cart access point on mobile devices
- **Cart awareness**: Keeps users informed of their cart status with a visible item count badge
- **Reduced friction**: One-click cart access from any point on the page

## Features

- ✅ Smooth entrance/exit animations
- ✅ Real-time cart count updates (via AJAX)
- ✅ Configurable position (all four corners)
- ✅ Hide when cart is empty (optional)
- ✅ Hide on cart page (optional)
- ✅ Pulse animation on cart updates
- ✅ Fully accessible (ARIA labels, keyboard navigation)
- ✅ Mobile-responsive
- ✅ No external dependencies
- ✅ Works with OS 2.0 themes (Dawn, Horizon, Craft)
- ✅ Compatible with AJAX add-to-cart

## Installation

### Step 1: Create the Snippet File

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code** on your active theme
3. In the **Snippets** folder, click **Add a new snippet**
4. Name it `sticky-cart-bubble` (without .liquid extension)
5. Paste the contents of `sticky-cart-bubble.liquid`
6. Click **Save**

### Step 2: Include the Snippet

Add the following line to your `theme.liquid` file, just before the closing `</body>` tag:

```liquid
{% render 'sticky-cart-bubble' %}

Or with custom parameters:

```liquid
{% render 'sticky-cart-bubble',
  position: 'bottom-right',
  bg_color: '#000000',
  icon_color: '#ffffff',
  badge_bg: '#ff0000',
  badge_color: '#ffffff',
  size: 56,
  offset_x: 20,
  offset_y: 20,
  hide_empty: true,
  hide_on_cart: true,
  show_on_scroll: false,
  scroll_threshold: 300,
  z_index: 9999
%}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `position` | String | `'bottom-right'` | Bubble position: `'bottom-right'`, `'bottom-left'`, `'top-right'`, `'top-left'` |
| `bg_color` | String | `'#000000'` | Background color of the bubble |
| `icon_color` | String | `'#ffffff'` | Color of the cart icon |
| `badge_bg` | String | `'#ff4444'` | Background color of the count badge |
| `badge_color` | String | `'#ffffff'` | Text color of the count badge |
| `size` | Number | `56` | Size of the bubble in pixels |
| `offset_x` | Number | `20` | Horizontal offset from edge in pixels |
| `offset_y` | Number | `20` | Vertical offset from edge in pixels |
| `hide_empty` | Boolean | `false` | Hide bubble when cart is empty |
| `hide_on_cart` | Boolean | `true` | Hide bubble on the cart page |
| `show_on_scroll` | Boolean | `false` | Only show bubble after scrolling |
| `scroll_threshold` | Number | `300` | Pixels to scroll before showing (if `show_on_scroll` is true) |
| `z_index` | Number | `9999` | CSS z-index for stacking order |

## Examples

### Basic Usage (Default Settings)

```liquid
{% render 'sticky-cart-bubble' %}
```

### Custom Colors to Match Brand

```liquid
{% render 'sticky-cart-bubble',
  bg_color: '#2c5aa0',
  badge_bg: '#e74c3c',
  position: 'bottom-left'
%}
```

### Show Only After Scrolling

```liquid
{% render 'sticky-cart-bubble',
  show_on_scroll: true,
  scroll_threshold: 500,
  hide_empty: true
%}
```

### Larger Bubble for Mobile-First Design

```liquid
{% render 'sticky-cart-bubble',
  size: 70,
  offset_x: 15,
  offset_y: 15
%}
```

### Top Corner Placement

```liquid
{% render 'sticky-cart-bubble',
  position: 'top-right',
  offset_y: 80
%}
```

## Integration with AJAX Cart

The bubble automatically listens for cart updates. If you're using a custom AJAX add-to-cart solution, dispatch a custom event after updating the cart:

```javascript
// After your AJAX cart update succeeds:
document.dispatchEvent(new CustomEvent('cart:updated', {
  detail: { item_count: newItemCount }
}));
```

The bubble will also poll for updates if cart changes are detected via the Cart API.

## Customizing the Icon

To use a custom icon, locate the SVG in the snippet and replace it with your own. Ensure you maintain the `fill="currentColor"` attribute for color inheritance:

```liquid
<svg class="sticky-cart-bubble__icon" ...>
  <!-- Your custom SVG path here -->
</svg>
```

## Accessibility

The bubble includes:
- `role="button"` for assistive technologies
- `aria-label` describing the cart status and item count
- `tabindex="0"` for keyboard navigation
- Enter/Space key activation
- Focus-visible styles
- Reduced motion support for users who prefer it

## Troubleshooting

### Bubble not showing
1. Check that the snippet is rendered in `theme.liquid`
2. Verify `hide_empty` isn't true with an empty cart
3. Check `hide_on_cart` if you're on the cart page
4. Inspect z-index conflicts with other elements

### Cart count not updating
1. Ensure your theme uses standard Shopify AJAX cart endpoints
2. Check browser console for JavaScript errors
3. Verify the cart API returns valid JSON

### Position conflicts
1. Adjust `offset_x` and `offset_y` to avoid other floating elements
2. Modify `z_index` if the bubble appears behind other elements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari
- Android Chrome

## License

MIT License - Free for commercial and personal use.
```

---
