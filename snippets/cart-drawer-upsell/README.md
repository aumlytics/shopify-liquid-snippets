# Cart Drawer Upsell Product Recommendations

A Shopify snippet that displays intelligent product recommendations within the cart drawer to increase average order value (AOV).

## What It Solves

- **Low Average Order Value**: Encourages customers to add complementary products before checkout
- **Missed Cross-sell Opportunities**: Automatically suggests relevant products based on cart contents
- **Cart Abandonment**: Keeps customers engaged with personalized recommendations
- **Manual Upselling**: Automates the recommendation process using product tags, collections, or Shopify's native recommendations API

## Features

- 🎯 Multiple recommendation strategies (tags, collections, Shopify API, manual)
- 🔄 Real-time updates when cart changes
- 📱 Fully responsive design
- ♿ WCAG 2.1 AA accessible
- 🎨 Customizable styling via CSS variables
- ⚡ Lazy loading for performance
- 🛒 AJAX add-to-cart functionality
- 🚫 Automatically excludes products already in cart

## Installation

### Step 1: Create the Snippet File

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code**
3. Under **Snippets**, click **Add a new snippet**
4. Name it `cart-drawer-upsell`
5. Paste the contents of `cart-drawer-upsell.liquid`
6. Click **Save**

### Step 2: Add the JavaScript

**Option A: Separate file (recommended for caching)**
1. Under **Assets**, click **Add a new asset**
2. Create `cart-drawer-upsell.js`
3. Paste the contents of `snippet.js`

**Option B: Inline (simpler setup)**
- The liquid file includes the option to inline the JS

### Step 3: Include in Cart Drawer

Find your theme's cart drawer file (common locations):
- `sections/cart-drawer.liquid`
- `snippets/cart-drawer.liquid`
- `sections/main-cart.liquid`

Add the snippet render call:

```liquid
{% render 'cart-drawer-upsell',
  strategy: 'tags',
  max_products: 4,
  heading: 'You might also like',
  min_cart_total: 0
%}

### Step 4: Configure Product Relationships (Optional)

For tag-based recommendations, add matching tags to related products:
- Product A: `upsell-category-skincare`
- Product B: `upsell-category-skincare`

For collection-based recommendations, create collections like:
- `upsell-for-shirts` → contains pants, belts, accessories
- `upsell-for-electronics` → contains cables, cases, warranties

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `strategy` | string | `'shopify'` | Recommendation strategy: `'shopify'`, `'tags'`, `'collection'`, `'manual'` |
| `max_products` | number | `4` | Maximum number of recommendations to display |
| `heading` | string | `'Complete your order'` | Section heading text |
| `heading_tag` | string | `'h3'` | HTML tag for heading (h2, h3, h4, etc.) |
| `min_cart_total` | number | `0` | Minimum cart total (in cents) to show recommendations |
| `max_cart_total` | number | `nil` | Maximum cart total to show recommendations (for free gift thresholds) |
| `exclude_tags` | string | `''` | Comma-separated tags to exclude from recommendations |
| `include_only_tags` | string | `''` | Only show products with these tags (comma-separated) |
| `collection_handle` | string | `''` | Specific collection to pull recommendations from |
| `manual_products` | string | `''` | Comma-separated product handles for manual strategy |
| `show_price` | boolean | `true` | Display product prices |
| `show_compare_price` | boolean | `true` | Show compare-at prices for sale items |
| `show_vendor` | boolean | `false` | Display product vendor |
| `button_text` | string | `'Add'` | Add to cart button text |
| `quick_add` | boolean | `true` | Enable AJAX add to cart |
| `image_aspect_ratio` | string | `'square'` | Image aspect ratio: `'square'`, `'portrait'`, `'landscape'`, `'natural'` |
| `layout` | string | `'scroll'` | Layout type: `'scroll'`, `'grid'`, `'stack'` |
| `enable_animation` | boolean | `true` | Enable slide-in animations |
| `priority` | string | `'price-asc'` | Sort priority: `'price-asc'`, `'price-desc'`, `'bestselling'`, `'random'` |

## Example Configurations

### Basic Setup (Shopify Recommendations API)
```liquid
{% render 'cart-drawer-upsell' %}
```

### Tag-Based Cross-sells
```liquid
{% render 'cart-drawer-upsell',
  strategy: 'tags',
  max_products: 3,
  heading: 'Pairs well with',
  button_text: 'Add to cart'
%}
```

### Collection-Based Upsells
```liquid
{% render 'cart-drawer-upsell',
  strategy: 'collection',
  collection_handle: 'best-sellers',
  max_products: 4,
  heading: 'Customers also bought',
  show_vendor: true
%}
```

### Free Gift Threshold
```liquid
{% render 'cart-drawer-upsell',
  strategy: 'collection',
  collection_handle: 'free-gifts',
  max_products: 1,
  max_cart_total: 4999,
  heading: 'Add ${{ cart.total_price | minus: 5000 | abs | money_without_trailing_zeros }} more for a FREE gift!',
  button_text: 'Select gift'
%}
```

### Manual Product Selection
```liquid
{% render 'cart-drawer-upsell',
  strategy: 'manual',
  manual_products: 'product-handle-1,product-handle-2,product-handle-3',
  heading: 'Staff Picks'
%}
```

### Minimal Design
```liquid
{% render 'cart-drawer-upsell',
  layout: 'stack',
  show_price: false,
  show_vendor: false,
  image_aspect_ratio: 'landscape',
  enable_animation: false
%}
```

## CSS Customization

Override these CSS variables in your theme's CSS:

```css
.cart-drawer-upsell {
  --upsell-spacing: 1rem;
  --upsell-card-width: 140px;
  --upsell-card-gap: 0.75rem;
  --upsell-border-radius: 8px;
  --upsell-heading-size: 1rem;
  --upsell-product-title-size: 0.875rem;
  --upsell-price-size: 0.8125rem;
  --upsell-button-padding: 0.5rem 0.75rem;
  --upsell-primary-color: #000;
  --upsell-secondary-color: #666;
  --upsell-border-color: #e5e5e5;
  --upsell-background: #f9f9f9;
  --upsell-card-background: #fff;
  --upsell-sale-color: #dc3545;
}
```

## Troubleshooting

### Recommendations Not Showing
1. Check that cart has items (recommendations need context)
2. Verify products aren't excluded by tags
3. Ensure `min_cart_total` threshold is met
4. For Shopify API strategy, products need sufficient order history

### Products Already in Cart Showing
- Clear browser cache
- Check JavaScript console for errors
- Verify AJAX cart update events are firing

### Styling Conflicts
- Use more specific CSS selectors
- Check for `!important` rules in theme CSS
- Inspect element to find conflicting styles

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## Performance

- Lazy loads images below the fold
- Debounces cart update listeners
- Caches DOM queries
- Uses CSS containment for paint optimization
- Minimal JavaScript footprint (~4KB gzipped)

## Changelog

### v1.0.0
- Initial release
- Four recommendation strategies
- Full accessibility support
- Responsive layouts

## License

MIT License - Feel free to modify for your projects.
```

---
