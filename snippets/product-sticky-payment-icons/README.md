# Sticky Payment Icons Trust Bar

A production-ready Shopify snippet that displays a persistent, customizable bar showing accepted payment methods. This trust bar follows users as they scroll, reinforcing payment security and reducing cart abandonment.

## Features

- 🔒 **Trust Building**: Displays recognizable payment icons to reassure customers
- 📱 **Fully Responsive**: Adapts seamlessly to all screen sizes
- ♿ **Accessible**: WCAG 2.1 compliant with proper ARIA attributes
- ⚡ **Performance Optimized**: Lightweight SVG icons, no external dependencies
- 🎨 **Highly Customizable**: 20+ configurable parameters
- 🛡️ **Smart Visibility**: Shows/hides based on scroll position and page context

## Installation

### Step 1: Create the Snippet File

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code** on your active theme
3. Under **Snippets**, click **Add a new snippet**
4. Name it `product-sticky-payment-icons`
5. Paste the contents of `product-sticky-payment-icons.liquid`
6. Click **Save**

### Step 2: Include in Your Theme

Add the snippet to your product template or theme layout. Choose one of these locations:

**Option A: Product Pages Only (Recommended)**

Edit `sections/main-product.liquid` or `templates/product.liquid`:

```liquid
{% render 'product-sticky-payment-icons' %}

**Option B: All Pages**

Edit `layout/theme.liquid`, just before `</body>`:

```liquid
{% render 'product-sticky-payment-icons', show_on_all_pages: true %}
```

### Step 3: (Optional) Add JavaScript

If you want advanced scroll behavior, create a new asset:

1. Under **Assets**, click **Add a new asset**
2. Create a blank file named `product-sticky-payment-icons.js`
3. Paste the contents of `snippet.js`
4. Save the file

The snippet will automatically detect and load this file when needed.

## Parameters Reference

### Display Settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable/disable the entire snippet |
| `position` | String | `'bottom'` | Bar position: `'top'` or `'bottom'` |
| `show_on_all_pages` | Boolean | `false` | Show on all pages vs product pages only |
| `show_on_mobile` | Boolean | `true` | Display on mobile devices |
| `show_on_desktop` | Boolean | `true` | Display on desktop devices |

### Scroll Behavior

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `scroll_trigger` | Number | `200` | Pixels scrolled before bar appears |
| `hide_on_scroll_up` | Boolean | `false` | Hide bar when scrolling up |
| `always_visible` | Boolean | `false` | Keep bar visible without scroll trigger |

### Content Settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `title_text` | String | `'Secure Payment'` | Title displayed in the bar |
| `show_title` | Boolean | `true` | Show/hide the title |
| `show_lock_icon` | Boolean | `true` | Show security lock icon |
| `subtitle_text` | String | `''` | Optional subtitle text |

### Payment Icons

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `show_visa` | Boolean | `true` | Show Visa icon |
| `show_mastercard` | Boolean | `true` | Show Mastercard icon |
| `show_amex` | Boolean | `true` | Show American Express icon |
| `show_paypal` | Boolean | `true` | Show PayPal icon |
| `show_shop_pay` | Boolean | `true` | Show Shop Pay icon |
| `show_apple_pay` | Boolean | `true` | Show Apple Pay icon |
| `show_google_pay` | Boolean | `true` | Show Google Pay icon |
| `show_discover` | Boolean | `false` | Show Discover icon |
| `show_klarna` | Boolean | `false` | Show Klarna icon |
| `show_afterpay` | Boolean | `false` | Show Afterpay icon |

### Styling

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `background_color` | String | `'#ffffff'` | Bar background color |
| `text_color` | String | `'#333333'` | Title/text color |
| `border_color` | String | `'#e5e5e5'` | Border color |
| `icon_size` | String | `'32px'` | Payment icon dimensions |
| `bar_padding` | String | `'12px 20px'` | Inner padding of the bar |
| `z_index` | Number | `9999` | CSS z-index for stacking |
| `shadow` | Boolean | `true` | Show drop shadow |
| `border_radius` | String | `'0'` | Border radius for the bar |

## Usage Examples

### Basic Usage

```liquid
{% render 'product-sticky-payment-icons' %}
```

### Minimal Icons (US Store)

```liquid
{% render 'product-sticky-payment-icons',
  show_amex: true,
  show_discover: true,
  show_paypal: false,
  show_shop_pay: false,
  show_apple_pay: true,
  show_google_pay: true,
  show_klarna: false,
  show_afterpay: false,
  title_text: 'We Accept'
%}
```

### European Store with BNPL

```liquid
{% render 'product-sticky-payment-icons',
  show_discover: false,
  show_klarna: true,
  show_afterpay: true,
  title_text: 'Secure Checkout',
  subtitle_text: 'Buy now, pay later available'
%}
```

### Top Position with Custom Styling

```liquid
{% render 'product-sticky-payment-icons',
  position: 'top',
  background_color: '#1a1a1a',
  text_color: '#ffffff',
  border_color: '#333333',
  scroll_trigger: 100,
  shadow: false
%}
```

### Always Visible (No Scroll Trigger)

```liquid
{% render 'product-sticky-payment-icons',
  always_visible: true,
  scroll_trigger: 0,
  title_text: 'Accepted Payments',
  bar_padding: '8px 16px',
  icon_size: '28px'
%}
```

### Mobile-Only Trust Bar

```liquid
{% render 'product-sticky-payment-icons',
  show_on_desktop: false,
  show_on_mobile: true,
  position: 'bottom',
  icon_size: '24px'
%}
```

### With Locale-Based Payment Methods

```liquid
{% assign show_klarna_local = false %}
{% assign show_afterpay_local = false %}

{% case request.locale.iso_code %}
  {% when 'de' or 'se' or 'no' or 'fi' %}
    {% assign show_klarna_local = true %}
  {% when 'en-AU' or 'en-NZ' %}
    {% assign show_afterpay_local = true %}
{% endcase %}

{% render 'product-sticky-payment-icons',
  show_klarna: show_klarna_local,
  show_afterpay: show_afterpay_local
%}
```

## Customization

### Adding Custom Payment Icons

To add additional payment icons, edit the snippet and add a new SVG in the icons section:

```liquid
{%- if show_custom_payment -%}
  <div class="spi-icon" aria-label="Custom Payment">
    <svg viewBox="0 0 38 24" role="img">
      <!-- Your SVG path here -->
    </svg>
  </div>
{%- endif -%}
```

### Custom CSS Override

Add to your theme's CSS file to override styles:

```css
/* Make icons grayscale */
.sticky-payment-icons .spi-icon svg {
  filter: grayscale(100%);
  transition: filter 0.2s ease;
}

.sticky-payment-icons .spi-icon svg:hover {
  filter: grayscale(0%);
}

/* Custom animation */
.sticky-payment-icons.spi-visible {
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

## Troubleshooting

### Bar Not Appearing

1. Check if `enabled` is set to `true`
2. Verify you're on a product page (unless `show_on_all_pages` is true)
3. Scroll down past the `scroll_trigger` value
4. Check browser console for JavaScript errors

### Icons Not Displaying

1. Ensure the specific icon parameter is set to `true`
2. Check for CSS conflicts with `display: none`
3. Verify SVG code wasn't corrupted during copy/paste

### Z-Index Issues

If the bar appears behind other elements:

```liquid
{% render 'product-sticky-payment-icons',
  z_index: 99999
%}
```

### Performance Concerns

The snippet is optimized for performance:
- Inline SVGs eliminate HTTP requests
- CSS is scoped and minimal
- JavaScript uses passive event listeners
- Intersection Observer is used when available

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## Accessibility

This snippet follows WCAG 2.1 guidelines:

- Proper `role="img"` on SVG icons
- `aria-label` descriptions for all payment methods
- `aria-live="polite"` for dynamic visibility changes
- Respects `prefers-reduced-motion` user preference
- Keyboard navigable (icons are focusable)

## License

MIT License - Free for commercial and personal use.

## Support

For issues or feature requests, contact your theme developer or submit an issue to your theme's repository.
```

---
