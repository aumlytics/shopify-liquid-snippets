# Rotating Announcement Bar with Multiple Messages

A production-ready Shopify snippet that automatically cycles through multiple promotional messages, shipping notices, or announcements in the header bar with smooth transitions.

## What It Solves

- **Multiple Messages**: Display several announcements without cluttering the header
- **Automatic Rotation**: Messages cycle automatically with configurable timing
- **Smooth Transitions**: CSS-based transitions for professional appearance
- **Accessibility**: Full screen reader support with live regions
- **Mobile Responsive**: Adapts to all screen sizes
- **Performance**: Lightweight with no external dependencies

## Installation

### Step 1: Create the Snippet File

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code**
3. Under **Snippets**, click **Add a new snippet**
4. Name it `announcement-bar-rotating`
5. Paste the contents of `announcement-bar-rotating.liquid`
6. Click **Save**

### Step 2: Include the Snippet

Add this code to your theme's `layout/theme.liquid` file, right after the opening `<body>` tag:

{% render 'announcement-bar-rotating',
  messages: "Free shipping on orders $50+ | 🎉 Summer Sale: 20% off everything | New arrivals just dropped!",
  rotation_speed: 4000,
  background_color: "#2c2c2c",
  text_color: "#ffffff",
  show_close_button: true,
  link_url: "/collections/sale",
  pause_on_hover: true
%}

### Step 3: Alternative - Schema-Based Setup (Recommended for Merchants)

For section-based control, create a new section file `sections/announcement-bar-rotating.liquid`:

```liquid
{% render 'announcement-bar-rotating',
  messages: section.settings.messages,
  rotation_speed: section.settings.rotation_speed,
  background_color: section.settings.background_color,
  text_color: section.settings.text_color,
  show_close_button: section.settings.show_close_button,
  link_url: section.settings.link_url,
  pause_on_hover: section.settings.pause_on_hover,
  show_navigation: section.settings.show_navigation,
  transition_style: section.settings.transition_style
%}

{% schema %}
{
  "name": "Rotating Announcement Bar",
  "class": "announcement-bar-section",
  "settings": [
    {
      "type": "textarea",
      "id": "messages",
      "label": "Messages",
      "default": "Free shipping on orders $50+ | 🎉 Summer Sale: 20% off everything | New arrivals!",
      "info": "Separate multiple messages with | character"
    },
    {
      "type": "range",
      "id": "rotation_speed",
      "min": 2000,
      "max": 10000,
      "step": 500,
      "default": 4000,
      "unit": "ms",
      "label": "Rotation Speed"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background Color",
      "default": "#2c2c2c"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text Color",
      "default": "#ffffff"
    },
    {
      "type": "checkbox",
      "id": "show_close_button",
      "label": "Show Close Button",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "pause_on_hover",
      "label": "Pause on Hover",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_navigation",
      "label": "Show Navigation Dots",
      "default": true
    },
    {
      "type": "url",
      "id": "link_url",
      "label": "Link URL (optional)"
    },
    {
      "type": "select",
      "id": "transition_style",
      "label": "Transition Style",
      "default": "fade",
      "options": [
        { "value": "fade", "label": "Fade" },
        { "value": "slide", "label": "Slide Up" },
        { "value": "slide-left", "label": "Slide Left" }
      ]
    }
  ],
  "presets": [
    {
      "name": "Rotating Announcement Bar"
    }
  ]
}
{% endschema %}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `messages` | String | Required | Messages separated by `\|` character |
| `rotation_speed` | Number | `4000` | Time between rotations in milliseconds |
| `background_color` | String | `#2c2c2c` | Background color (hex, rgb, or CSS color) |
| `text_color` | String | `#ffffff` | Text color |
| `show_close_button` | Boolean | `true` | Display dismiss button |
| `link_url` | String | `nil` | Optional URL to wrap messages in a link |
| `pause_on_hover` | Boolean | `true` | Pause rotation when user hovers |
| `show_navigation` | Boolean | `true` | Show dot navigation indicators |
| `transition_style` | String | `fade` | Animation style: `fade`, `slide`, `slide-left` |
| `cookie_days` | Number | `1` | Days to remember dismissed state |
| `bar_id` | String | `main` | Unique ID (for multiple bars) |

## Examples

### Basic Usage
```liquid
{% render 'announcement-bar-rotating',
  messages: "Free shipping on orders $50+ | Use code SAVE20 for 20% off"
%}
```

### With Link and Custom Colors
```liquid
{% render 'announcement-bar-rotating',
  messages: "🎁 Holiday Sale Now Live! | Up to 50% off select items",
  link_url: "/collections/sale",
  background_color: "#dc2626",
  text_color: "#ffffff",
  rotation_speed: 3000
%}
```

### Using Liquid Variables
```liquid
{% capture announcement_messages %}
  Free shipping on orders over {{ settings.free_shipping_threshold | money_without_trailing_zeros }} |
  {% if customer %}Welcome back, {{ customer.first_name }}!{% else %}Sign up for 10% off{% endif %} |
  {{ shop.name }} - Quality products since 2020
{% endcapture %}

{% render 'announcement-bar-rotating',
  messages: announcement_messages,
  show_navigation: true,
  transition_style: "slide"
%}
```

### Multiple Announcement Bars
```liquid
{% render 'announcement-bar-rotating',
  bar_id: "shipping",
  messages: "Free shipping on orders $75+",
  background_color: "#059669"
%}

{% render 'announcement-bar-rotating',
  bar_id: "sale",
  messages: "Flash Sale: 30% off today only!",
  background_color: "#dc2626"
%}
```

## Accessibility Features

- **ARIA Live Region**: Screen readers announce message changes
- **Keyboard Navigation**: Full keyboard support for controls
- **Pause on Focus**: Rotation pauses when focused
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Semantic HTML**: Proper heading hierarchy and roles

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## Troubleshooting

### Bar Not Showing
1. Check that messages parameter is not empty
2. Clear browser cookies (may be dismissed)
3. Check for CSS conflicts with theme

### Animation Issues
1. Check for conflicting CSS transitions
2. Verify `transition_style` value is valid
3. Test with `prefers-reduced-motion` disabled

### Messages Not Rotating
1. Verify multiple messages are separated by `|`
2. Check browser console for JavaScript errors
3. Ensure `rotation_speed` is a valid number

## Performance Notes

- **CSS-Only Transitions**: No JavaScript animation libraries
- **Event Delegation**: Minimal event listeners
- **Lazy Initialization**: Loads only when needed
- **Small Footprint**: ~4KB total (unminified)

---
