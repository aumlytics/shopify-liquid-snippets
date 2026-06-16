# Sticky Dismissible Announcement Bar with Cookie Memory

A production-ready Shopify snippet that creates a fully accessible, sticky announcement bar with dismiss functionality and cookie-based persistence.

## What it Solves

- Creates a prominent announcement bar that stays visible while scrolling
- Allows users to dismiss the bar with a single click
- Remembers dismissal using cookies to prevent annoyance
- Configurable expiration period (session-based or multi-day)
- Fully accessible with screen reader support and keyboard navigation

## Features

- 🎯 **Sticky positioning** - Stays at top of viewport while scrolling
- 🍪 **Cookie memory** - Remembers when users dismiss the bar
- ♿ **Fully accessible** - ARIA labels, roles, and keyboard support
- 📱 **Responsive** - Works on all device sizes
- 🎨 **Customizable** - Easy to style via parameters
- ⚡ **No dependencies** - Pure vanilla JavaScript
- 🔒 **XSS safe** - Proper output encoding

## Installation

### Step 1: Add the Liquid Snippet

Copy `sticky-announcement-bar-dismissible.liquid` to your theme's `snippets/` folder.

### Step 2: Add the JavaScript

**Option A (Recommended):** Copy `snippet.js` to your theme's `assets/` folder as `announcement-bar.js`, then add this to your `layout/theme.liquid` before `</body>`:

```liquid
<script src="{{ 'announcement-bar.js' | asset_url }}" defer></script>

**Option B:** Include the JavaScript inline within the snippet (already included as a fallback).

### Step 3: Include the Snippet

Add the snippet to your `layout/theme.liquid` file, typically right after the opening `<body>` tag:

```liquid
{% render 'sticky-announcement-bar-dismissible',
  message: 'Free shipping on orders over $50! 🚚',
  enabled: true
%}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `message` | String | `''` | The announcement text to display (supports HTML) |
| `enabled` | Boolean | `true` | Toggle the bar on/off without removing code |
| `link_url` | String | `''` | Optional URL to make the message clickable |
| `link_text` | String | `'Learn more'` | Text for the optional link |
| `cookie_days` | Number | `7` | Days until cookie expires (0 = session only) |
| `cookie_name` | String | `'announcement_dismissed'` | Cookie identifier (useful for multiple bars) |
| `bg_color` | String | `'#000000'` | Background color (hex, rgb, or CSS variable) |
| `text_color` | String | `'#ffffff'` | Text color |
| `link_color` | String | `'#ffffff'` | Link text color |
| `font_size` | String | `'14px'` | Base font size |
| `padding` | String | `'12px 20px'` | Inner padding |
| `z_index` | Number | `9999` | Stack order (increase if hidden behind elements) |
| `position` | String | `'top'` | Position: 'top' or 'bottom' |
| `show_close` | Boolean | `true` | Show/hide the close button |
| `animation` | String | `'slide'` | Animation type: 'slide', 'fade', or 'none' |
| `id` | String | `'announcement-bar'` | Unique ID (required for multiple bars) |

## Usage Examples

### Basic Usage

```liquid
{% render 'sticky-announcement-bar-dismissible',
  message: 'Welcome to our store!'
%}
```

### Sale Announcement with Link

```liquid
{% render 'sticky-announcement-bar-dismissible',
  message: '🔥 Summer Sale: Up to 50% off!',
  link_url: '/collections/sale',
  link_text: 'Shop Now',
  bg_color: '#e53e3e',
  cookie_days: 1
%}
```

### Session-Only Notice

```liquid
{% render 'sticky-announcement-bar-dismissible',
  message: 'Orders placed before 2pm ship same day',
  cookie_days: 0,
  bg_color: '#2d3748'
%}
```

### Bottom-Positioned Bar

```liquid
{% render 'sticky-announcement-bar-dismissible',
  message: 'Subscribe to our newsletter for 10% off',
  position: 'bottom',
  link_url: '#newsletter',
  link_text: 'Subscribe',
  cookie_name: 'newsletter_bar_dismissed'
%}
```

### Multiple Announcement Bars

```liquid
{% comment %} Top bar for shipping info {% endcomment %}
{% render 'sticky-announcement-bar-dismissible',
  id: 'shipping-bar',
  message: 'Free shipping over $50',
  cookie_name: 'shipping_bar_dismissed',
  position: 'top',
  bg_color: '#1a202c'
%}

{% comment %} Bottom bar for newsletter {% endcomment %}
{% render 'sticky-announcement-bar-dismissible',
  id: 'promo-bar',
  message: 'Use code SAVE20 for 20% off',
  cookie_name: 'promo_bar_dismissed',
  position: 'bottom',
  bg_color: '#744210'
%}
```

### Using Theme Settings

```liquid
{% render 'sticky-announcement-bar-dismissible',
  message: settings.announcement_text,
  enabled: settings.announcement_enabled,
  link_url: settings.announcement_link,
  bg_color: settings.announcement_bg_color,
  text_color: settings.announcement_text_color
%}
```

### Conditional Display (e.g., Homepage Only)

```liquid
{% if request.page_type == 'index' %}
  {% render 'sticky-announcement-bar-dismissible',
    message: 'Welcome! First-time customers get 15% off',
    cookie_name: 'homepage_welcome_dismissed'
  %}
{% endif %}
```

## Theme Settings Integration

Add these to your `config/settings_schema.json` for admin control:

```json
{
  "name": "Announcement Bar",
  "settings": [
    {
      "type": "checkbox",
      "id": "announcement_enabled",
      "label": "Enable announcement bar",
      "default": false
    },
    {
      "type": "text",
      "id": "announcement_text",
      "label": "Announcement text",
      "default": "Welcome to our store!"
    },
    {
      "type": "url",
      "id": "announcement_link",
      "label": "Link URL (optional)"
    },
    {
      "type": "text",
      "id": "announcement_link_text",
      "label": "Link text",
      "default": "Learn more"
    },
    {
      "type": "color",
      "id": "announcement_bg_color",
      "label": "Background color",
      "default": "#000000"
    },
    {
      "type": "color",
      "id": "announcement_text_color",
      "label": "Text color",
      "default": "#ffffff"
    },
    {
      "type": "range",
      "id": "announcement_cookie_days",
      "label": "Remember dismissal for (days)",
      "min": 0,
      "max": 30,
      "step": 1,
      "default": 7,
      "info": "0 = current session only"
    }
  ]
}
```

## Accessibility

This snippet follows WCAG 2.1 guidelines:

- Uses `role="banner"` for the announcement region
- Close button has descriptive `aria-label`
- Focus states are clearly visible
- Keyboard accessible (Tab to navigate, Enter/Space to activate)
- Sufficient color contrast (ensure your colors meet 4.5:1 ratio)
- Announcement uses `role="status"` for screen reader compatibility

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Chrome for Android 60+

## Troubleshooting

### Bar keeps reappearing after dismissal
- Check browser privacy settings (some block cookies)
- Verify `cookie_name` is unique if using multiple bars
- Check for JavaScript errors in console

### Bar appears behind other elements
- Increase `z_index` parameter
- Check for conflicting `z-index` in theme CSS

### Bar doesn't show at all
- Verify `enabled: true`
- Check if cookie already exists (clear cookies to test)
- Look for JavaScript errors in browser console

### Styling conflicts with theme
- The snippet uses scoped CSS with specific selectors
- Add `!important` to custom styles if needed
- Adjust the `id` parameter to create unique selectors

## License

MIT License - Use freely in personal and commercial projects.
```

---
