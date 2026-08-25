# Cart Note Gift Message Field

A production-ready Shopify snippet that adds a customizable gift message/order notes field to your cart. Messages are saved to cart attributes and appear in the Shopify admin for merchants to fulfill personalized orders.

## What It Solves

- Allows customers to add personalized gift messages to their orders
- Saves messages as cart attributes (visible in Shopify admin under Orders)
- Provides a seamless, accessible user experience
- Auto-saves to prevent lost messages
- Works with both standard page reloads and AJAX cart updates

## Features

- 🎁 Collapsible gift message section (optional)
- 💾 Auto-save with debouncing (no submit button needed)
- ♿ Full accessibility support (ARIA labels, keyboard navigation)
- 🎨 Fully customizable styling via CSS variables
- 📱 Mobile-responsive design
- 🔄 Works with AJAX carts and standard form submissions
- ✅ Character counter with limit enforcement
- 🌐 Translation-ready with Shopify's translation system

## Installation

### Step 1: Create the Snippet File

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code** on your active theme
3. Under **Snippets**, click **Add a new snippet**
4. Name it `cart-note-gift-message`
5. Paste the contents of `cart-note-gift-message.liquid`
6. Click **Save**

### Step 2: Add JavaScript (Optional but Recommended)

1. Under **Assets**, click **Add a new asset**
2. Upload or create `cart-note-gift-message.js`
3. Paste the contents of `snippet.js`
4. Click **Save**

### Step 3: Include in Your Cart Template

Add this line to your cart template (`templates/cart.liquid` or `sections/main-cart.liquid`):

{% render 'cart-note-gift-message' %}

### For Dawn Theme (and similar OS 2.0 themes):

Open `sections/main-cart-items.liquid` and add before the closing `</cart-items>` or before the checkout button:

```liquid
{% render 'cart-note-gift-message',
  enable_gift_wrap_option: true,
  max_characters: 200
%}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `show_by_default` | Boolean | `false` | Whether the gift message field is expanded by default |
| `max_characters` | Number | `250` | Maximum characters allowed in the message |
| `enable_gift_wrap_option` | Boolean | `false` | Show a "This is a gift" checkbox |
| `collapsible` | Boolean | `true` | Whether the section can be collapsed |
| `attribute_name` | String | `'Gift Message'` | The cart attribute name shown in admin |
| `gift_wrap_attribute` | String | `'Gift Wrap Requested'` | Attribute name for gift wrap option |
| `placeholder_text` | String | `'Enter your gift message here...'` | Textarea placeholder text |
| `heading_text` | String | `'Add a Gift Message'` | Section heading text |
| `auto_save` | Boolean | `true` | Auto-save message as user types |
| `auto_save_delay` | Number | `800` | Debounce delay in milliseconds |

## Example Implementations

### Basic Usage

```liquid
{% render 'cart-note-gift-message' %}
```

### With Gift Wrap Option

```liquid
{% render 'cart-note-gift-message',
  enable_gift_wrap_option: true,
  heading_text: 'Gift Options',
  max_characters: 150
%}
```

### Always Expanded (No Collapse)

```liquid
{% render 'cart-note-gift-message',
  collapsible: false,
  show_by_default: true
%}
```

### Custom Styling via CSS Variables

```liquid
{% render 'cart-note-gift-message' %}

<style>
  .gift-message-wrapper {
    --gift-message-primary-color: #8B4513;
    --gift-message-border-radius: 12px;
    --gift-message-font-family: 'Georgia', serif;
  }
</style>
```

### Multiple Languages (Translation Keys)

Add these to your `locales/en.default.json`:

```json
{
  "cart": {
    "gift_message": {
      "heading": "Add a Gift Message",
      "placeholder": "Write your personalized message here...",
      "checkbox_label": "This order is a gift",
      "characters_remaining": "characters remaining",
      "saved": "Message saved",
      "saving": "Saving..."
    }
  }
}
```

Then use:

```liquid
{% render 'cart-note-gift-message',
  heading_text: 'cart.gift_message.heading' | t,
  placeholder_text: 'cart.gift_message.placeholder' | t
%}
```

## Accessing the Gift Message in Admin

The gift message appears in two places:

1. **Order Details Page**: Under "Additional details" section
2. **Order Printer / Packing Slips**: Access via `{{ attributes['Gift Message'] }}`

### In Order Confirmation Email

Edit your order confirmation email template to include:

```liquid
{% if attributes['Gift Message'] != blank %}
  <p><strong>Gift Message:</strong></p>
  <p>{{ attributes['Gift Message'] }}</p>
{% endif %}

{% if attributes['Gift Wrap Requested'] == 'Yes' %}
  <p>🎁 <strong>Gift wrapping requested</strong></p>
{% endif %}
```

## CSS Customization

Override these CSS variables to match your theme:

```css
.gift-message-wrapper {
  /* Colors */
  --gift-message-primary-color: #333333;
  --gift-message-border-color: #e0e0e0;
  --gift-message-bg-color: #ffffff;
  --gift-message-focus-color: #000000;
  --gift-message-success-color: #28a745;
  --gift-message-error-color: #dc3545;
  
  /* Typography */
  --gift-message-font-family: inherit;
  --gift-message-font-size: 14px;
  
  /* Spacing */
  --gift-message-padding: 16px;
  --gift-message-border-radius: 8px;
  --gift-message-spacing: 12px;
}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## Troubleshooting

### Message Not Saving

1. Ensure JavaScript file is loaded
2. Check browser console for errors
3. Verify cart form has standard Shopify structure

### Styling Conflicts

Add more specific selectors:

```css
.cart-page .gift-message-wrapper {
  /* Your overrides */
}
```

### AJAX Cart Compatibility

If using a custom AJAX cart, trigger save manually:

```javascript
document.dispatchEvent(new CustomEvent('gift-message:save'));
```

## Changelog

### v1.0.0
- Initial release
- Auto-save functionality
- Accessibility compliance
- Gift wrap option
- Character counter

---

**License:** MIT
**Author:** Expert Shopify Developer
**Compatibility:** Shopify OS 2.0+ themes
