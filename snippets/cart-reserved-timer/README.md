# Cart Reserved Timer

**Slug:** `cart-reserved-timer`

## What It Solves

Creates urgency by showing customers a countdown timer indicating how long items are "reserved" in their cart before they should complete checkout. This psychological trigger encourages faster checkout completion and reduces cart abandonment.

### Key Benefits
- **Increases conversion rates** by creating time-sensitive urgency
- **Reduces cart abandonment** through perceived scarcity
- **Improves checkout velocity** with visible countdown pressure
- **Persists across sessions** using localStorage (optional)

## Installation

### Step 1: Add the Liquid Snippet

Copy `cart-reserved-timer.liquid` to your theme's `snippets/` folder:

your-theme/
└── snippets/
    └── cart-reserved-timer.liquid
```

### Step 2: Include the Snippet

Add the snippet to your cart template or cart drawer. Common locations:

**For Cart Page (`templates/cart.liquid` or `sections/main-cart.liquid`):**
```liquid
{% render 'cart-reserved-timer' %}
```

**For Cart Drawer (Ajax cart):**
```liquid
{% render 'cart-reserved-timer', position: 'drawer' %}
```

**For Header Cart Icon Area:**
```liquid
{% render 'cart-reserved-timer', style: 'minimal' %}
```

### Step 3: Configure (Optional)

Customize the timer by passing parameters:

```liquid
{% render 'cart-reserved-timer',
  duration_minutes: 15,
  warning_threshold: 120,
  persist_timer: true,
  show_icon: true,
  expired_action: 'message',
  position: 'default',
  style: 'default'
%}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `duration_minutes` | Integer | `10` | Total countdown time in minutes |
| `warning_threshold` | Integer | `120` | Seconds remaining when timer turns "warning" (red) |
| `persist_timer` | Boolean | `true` | Save timer state in localStorage across page loads |
| `show_icon` | Boolean | `true` | Display clock icon next to timer |
| `expired_action` | String | `'message'` | Action when timer expires: `'message'`, `'redirect'`, `'refresh'`, or `'hide'` |
| `redirect_url` | String | `'/cart'` | URL to redirect to if `expired_action` is `'redirect'` |
| `position` | String | `'default'` | Layout position: `'default'`, `'drawer'`, `'sticky'` |
| `style` | String | `'default'` | Visual style: `'default'`, `'minimal'`, `'prominent'` |
| `show_on_empty_cart` | Boolean | `false` | Show timer even when cart is empty |
| `reset_on_cart_update` | Boolean | `true` | Reset timer when items are added to cart |
| `custom_class` | String | `''` | Additional CSS class for custom styling |

## Examples

### Basic Usage
```liquid
{% render 'cart-reserved-timer' %}
```

### Extended 20-Minute Timer with Redirect
```liquid
{% render 'cart-reserved-timer',
  duration_minutes: 20,
  expired_action: 'redirect',
  redirect_url: '/collections/all'
%}
```

### Minimal Style for Header
```liquid
{% render 'cart-reserved-timer',
  style: 'minimal',
  duration_minutes: 15,
  show_icon: false
%}
```

### Sticky Banner Style
```liquid
{% render 'cart-reserved-timer',
  position: 'sticky',
  style: 'prominent',
  duration_minutes: 10
%}
```

### Cart Drawer Integration
```liquid
{% render 'cart-reserved-timer',
  position: 'drawer',
  persist_timer: true,
  reset_on_cart_update: true
%}
```

### Non-Persistent Timer (Resets Each Page)
```liquid
{% render 'cart-reserved-timer',
  persist_timer: false,
  duration_minutes: 5
%}
```

## Theme Compatibility

Tested and compatible with:
- ✅ Dawn (Shopify's default OS 2.0 theme)
- ✅ Horizon
- ✅ Craft
- ✅ Sense
- ✅ Refresh
- ✅ Most OS 2.0 themes

## Customization

### CSS Custom Properties

Override these CSS variables for easy theming:

```css
:root {
  --cart-timer-bg: #fef3c7;
  --cart-timer-text: #92400e;
  --cart-timer-warning-bg: #fee2e2;
  --cart-timer-warning-text: #dc2626;
  --cart-timer-border-radius: 8px;
  --cart-timer-font-size: 14px;
}
```

### Custom Styling via Class

```liquid
{% render 'cart-reserved-timer', custom_class: 'my-custom-timer' %}
```

```css
.my-custom-timer {
  /* Your custom styles */
}
```

## JavaScript API

The timer exposes a global API for advanced integrations:

```javascript
// Get timer instance
const timer = window.CartReservedTimer;

// Check remaining time
console.log(timer.getRemainingSeconds());

// Reset timer programmatically
timer.reset();

// Pause/Resume
timer.pause();
timer.resume();

// Listen for events
document.addEventListener('cart-timer:expired', (e) => {
  console.log('Timer expired!');
});

document.addEventListener('cart-timer:warning', (e) => {
  console.log('Timer entering warning phase');
});

document.addEventListener('cart-timer:reset', (e) => {
  console.log('Timer was reset');
});
```

## Accessibility

This snippet follows WCAG 2.1 guidelines:
- Uses `role="timer"` for screen reader compatibility
- Includes `aria-live="polite"` for countdown announcements
- Provides `aria-label` descriptions
- Respects `prefers-reduced-motion` for animations
- Keyboard navigable and focusable

## Troubleshooting

### Timer resets on every page load
Ensure `persist_timer: true` is set and localStorage is available.

### Timer not showing
Check that the cart has items (or set `show_on_empty_cart: true`).

### Timer conflicts with cart drawer
Use `position: 'drawer'` and ensure the snippet is inside your drawer HTML.

### Custom fonts not applied
Add your font family to the CSS custom properties or use `custom_class`.

## Changelog

### v1.0.0
- Initial release
- Full OS 2.0 compatibility
- localStorage persistence
- Multiple styles and positions
- Accessibility compliant
- JavaScript API

## License

MIT License - Free for commercial and personal use.
```

---
