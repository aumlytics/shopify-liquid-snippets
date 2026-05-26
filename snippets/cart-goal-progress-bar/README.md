# Cart Goal Progress Bar with Tiered Rewards

A production-ready Shopify snippet that displays a dynamic progress bar showing customers how close they are to unlocking tiered rewards. Designed to increase average order value (AOV) through gamification and clear incentive visualization.

## Features

- 🎯 **Multiple Reward Tiers** - Configure up to 5 tiered rewards (free shipping, free gifts, discounts)
- 📊 **Animated Progress Bar** - Smooth animations with configurable colors
- 🔄 **Real-time Updates** - Automatically updates when cart changes via AJAX
- 📱 **Fully Responsive** - Works on all device sizes
- ♿ **Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- 🎨 **Customizable** - Easy to match your brand colors and styling
- 🌍 **Multi-currency** - Respects Shopify's currency formatting
- 🚀 **Performance Optimized** - Minimal footprint, no external dependencies

## Installation

### Step 1: Create the Snippet File

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code** on your active theme
3. In the **Snippets** folder, click **Add a new snippet**
4. Name it `cart-goal-progress-bar`
5. Paste the contents of `cart-goal-progress-bar.liquid`
6. Click **Save**

### Step 2: Add JavaScript (Optional but Recommended)

For AJAX cart updates:

1. In the **Assets** folder, click **Add a new asset**
2. Create a file named `cart-goal-progress-bar.js`
3. Paste the contents of `snippet.js`
4. Click **Save**

### Step 3: Include the Snippet

Add the snippet to your desired location(s). Common placements:

#### In Cart Page (`templates/cart.liquid` or `sections/main-cart.liquid`):
```liquid
{% render 'cart-goal-progress-bar',
  tier1_threshold: 50,
  tier1_reward: 'Free Shipping',
  tier1_icon: '🚚',
  tier2_threshold: 100,
  tier2_reward: 'Free Gift',
  tier2_icon: '🎁',
  tier3_threshold: 150,
  tier3_reward: '10% Off Next Order',
  tier3_icon: '💰'
%}

#### In Cart Drawer (varies by theme):
```liquid
{% render 'cart-goal-progress-bar',
  compact_mode: true,
  tier1_threshold: 75,
  tier1_reward: 'Free Shipping',
  tier1_icon: '🚚'
%}
```

#### In Announcement Bar:
```liquid
{% render 'cart-goal-progress-bar',
  minimal_mode: true,
  show_milestones: false,
  tier1_threshold: 50,
  tier1_reward: 'Free Shipping'
%}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `tier1_threshold` | Number | `50` | First reward threshold in store currency |
| `tier1_reward` | String | `'Free Shipping'` | First reward description |
| `tier1_icon` | String | `'🚚'` | Emoji or text icon for first reward |
| `tier2_threshold` | Number | `0` | Second reward threshold (0 = disabled) |
| `tier2_reward` | String | `''` | Second reward description |
| `tier2_icon` | String | `'🎁'` | Emoji or text icon for second reward |
| `tier3_threshold` | Number | `0` | Third reward threshold (0 = disabled) |
| `tier3_reward` | String | `''` | Third reward description |
| `tier3_icon` | String | `'💰'` | Emoji or text icon for third reward |
| `tier4_threshold` | Number | `0` | Fourth reward threshold (0 = disabled) |
| `tier4_reward` | String | `''` | Fourth reward description |
| `tier4_icon` | String | `'⭐'` | Emoji or text icon for fourth reward |
| `tier5_threshold` | Number | `0` | Fifth reward threshold (0 = disabled) |
| `tier5_reward` | String | `''` | Fifth reward description |
| `tier5_icon` | String | `'👑'` | Emoji or text icon for fifth reward |
| `bar_color` | String | `'#4CAF50'` | Progress bar fill color |
| `bar_bg_color` | String | `'#e0e0e0'` | Progress bar background color |
| `text_color` | String | `'#333333'` | Primary text color |
| `success_color` | String | `'#2E7D32'` | Color for unlocked rewards |
| `compact_mode` | Boolean | `false` | Use compact layout for sidebars |
| `minimal_mode` | Boolean | `false` | Ultra-minimal single-line display |
| `show_milestones` | Boolean | `true` | Show milestone markers on bar |
| `animate` | Boolean | `true` | Enable animations |
| `show_unlocked_message` | Boolean | `true` | Show celebration when tier unlocked |
| `currency_symbol` | String | `cart.currency.symbol` | Override currency symbol |
| `class_prefix` | String | `'cgpb'` | CSS class prefix for styling |

## Example Configurations

### Basic Single Tier (Free Shipping)
```liquid
{% render 'cart-goal-progress-bar',
  tier1_threshold: 75,
  tier1_reward: 'Free Shipping',
  tier1_icon: '🚚'
%}
```

### Three Tiers with Custom Colors
```liquid
{% render 'cart-goal-progress-bar',
  tier1_threshold: 50,
  tier1_reward: 'Free Shipping',
  tier1_icon: '🚚',
  tier2_threshold: 100,
  tier2_reward: 'Free Sample Pack',
  tier2_icon: '🎁',
  tier3_threshold: 200,
  tier3_reward: '15% Off Everything',
  tier3_icon: '🏷️',
  bar_color: '#FF6B6B',
  success_color: '#4ECDC4'
%}
```

### Compact Cart Drawer Version
```liquid
{% render 'cart-goal-progress-bar',
  compact_mode: true,
  show_milestones: false,
  tier1_threshold: 50,
  tier1_reward: 'Free Shipping',
  tier1_icon: '🚚',
  tier2_threshold: 100,
  tier2_reward: 'Free Gift',
  tier2_icon: '🎁'
%}
```

### Luxury Brand (5 Tiers)
```liquid
{% render 'cart-goal-progress-bar',
  tier1_threshold: 100,
  tier1_reward: 'Complimentary Shipping',
  tier1_icon: '✈️',
  tier2_threshold: 250,
  tier2_reward: 'Deluxe Sample',
  tier2_icon: '💎',
  tier3_threshold: 500,
  tier3_reward: 'VIP Gift Wrapping',
  tier3_icon: '🎀',
  tier4_threshold: 750,
  tier4_reward: 'Personal Stylist Call',
  tier4_icon: '👔',
  tier5_threshold: 1000,
  tier5_reward: 'Elite Member Status',
  tier5_icon: '👑',
  bar_color: '#D4AF37',
  text_color: '#1a1a1a'
%}
```

## Theme Compatibility

Tested and compatible with:
- ✅ Dawn (and all Dawn-based themes)
- ✅ Horizon
- ✅ Craft
- ✅ Sense
- ✅ Taste
- ✅ Colorblock
- ✅ Studio
- ✅ Ride
- ✅ Origin
- ✅ Crave

## Customization

### Overriding Styles

The snippet uses scoped CSS with a configurable prefix. To override styles:

```css
/* In your theme.css or via Theme Customizer */
.cgpb-container {
  /* Your custom container styles */
}

.cgpb-bar-fill {
  /* Custom progress bar styles */
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%) !important;
}

.cgpb-milestone-marker {
  /* Custom milestone marker styles */
}
```

### Using with AJAX Carts

The JavaScript automatically listens for cart updates. For custom AJAX implementations, dispatch this event after cart changes:

```javascript
document.dispatchEvent(new CustomEvent('cart:updated', {
  detail: { cart: cartData }
}));
```

Or use the global update function:

```javascript
window.CartGoalProgressBar.refresh();
```

## Troubleshooting

### Progress bar not updating
- Ensure the JavaScript file is loaded
- Check browser console for errors
- Verify your theme's cart AJAX events

### Styling conflicts
- Increase specificity of custom CSS
- Use the `class_prefix` parameter to avoid conflicts
- Check for `!important` rules in theme CSS

### Currency not displaying correctly
- Use the `currency_symbol` parameter to override
- Check your Shopify Markets configuration

## Performance

- **CSS**: ~3KB (inlined, scoped)
- **JavaScript**: ~5KB (minified)
- **No external dependencies**
- **Lazy-loaded animations**
- **Debounced cart updates**

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## License

MIT License - Free for commercial and personal use.

## Support

For issues or feature requests, contact your theme developer or create an issue in your project repository.
```

---
