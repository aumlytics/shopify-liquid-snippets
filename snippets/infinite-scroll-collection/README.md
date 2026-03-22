# Infinite Scroll Collection Pages

A production-ready Shopify snippet that automatically loads more products as users scroll down collection pages, replacing traditional pagination with a seamless browsing experience.

## What It Solves

- **Eliminates pagination friction**: Users no longer need to click "Next Page" buttons
- **Improves engagement**: Continuous scrolling keeps users browsing longer
- **Better mobile experience**: Touch-friendly infinite scrolling feels natural
- **SEO-friendly**: Maintains proper pagination links for search engine crawlers
- **Accessible**: Full keyboard navigation and screen reader support

## Features

- ✅ Works with Shopify OS 2.0 themes (Dawn, Horizon, Craft)
- ✅ Intersection Observer API for performance
- ✅ Graceful fallback for older browsers
- ✅ Loading states and error handling
- ✅ "Load More" button fallback option
- ✅ Back button history preservation
- ✅ Scroll position restoration
- ✅ No external dependencies
- ✅ Full accessibility support (ARIA labels, keyboard navigation)
- ✅ Customizable trigger threshold
- ✅ Optional product count display

## Installation

### Step 1: Create the Snippet File

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code**
3. Under **Snippets**, click **Add a new snippet**
4. Name it `infinite-scroll-collection`
5. Paste the contents of `infinite-scroll-collection.liquid`
6. Save the file

### Step 2: Add JavaScript

1. Under **Assets**, click **Add a new asset**
2. Create a file named `infinite-scroll-collection.js`
3. Paste the contents of `snippet.js`
4. Save the file

### Step 3: Include in Collection Template

Open your collection template (usually `templates/collection.liquid` or `sections/main-collection-product-grid.liquid`) and add:

```liquid
{% comment %} Replace your existing product grid and pagination with this {% endcomment %}

{% render 'infinite-scroll-collection',
  collection: collection,
  products_per_page: 12,
  enable_infinite_scroll: true,
  show_load_more_button: false,
  loading_threshold: '200px',
  show_product_count: true
%}

### Step 4: Update Theme Settings (Optional)

To make infinite scroll configurable from the theme editor, add this to your `config/settings_schema.json`:

```json
{
  "name": "Infinite Scroll",
  "settings": [
    {
      "type": "checkbox",
      "id": "enable_infinite_scroll",
      "label": "Enable infinite scroll on collections",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "infinite_scroll_show_button",
      "label": "Show 'Load More' button instead of auto-loading",
      "default": false
    },
    {
      "type": "range",
      "id": "products_per_page",
      "min": 8,
      "max": 48,
      "step": 4,
      "label": "Products per page",
      "default": 12
    }
  ]
}
```

Then update your render call:

```liquid
{% render 'infinite-scroll-collection',
  collection: collection,
  products_per_page: settings.products_per_page,
  enable_infinite_scroll: settings.enable_infinite_scroll,
  show_load_more_button: settings.infinite_scroll_show_button
%}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `collection` | Collection | *required* | The collection object to display |
| `products_per_page` | Integer | `12` | Number of products to load per page |
| `enable_infinite_scroll` | Boolean | `true` | Enable/disable infinite scroll functionality |
| `show_load_more_button` | Boolean | `false` | Show manual "Load More" button instead of auto-loading |
| `loading_threshold` | String | `'200px'` | Distance from bottom to trigger loading (CSS value) |
| `show_product_count` | Boolean | `true` | Display "Showing X of Y products" counter |
| `product_card_snippet` | String | `'product-card'` | Name of your theme's product card snippet |
| `grid_classes` | String | `''` | Additional CSS classes for the product grid |
| `animate_new_products` | Boolean | `true` | Animate products as they load in |

## Customization

### Using a Custom Product Card

If your theme uses a different product card snippet:

```liquid
{% render 'infinite-scroll-collection',
  collection: collection,
  product_card_snippet: 'card-product'
%}
```

### Custom Grid Classes

Add your theme's grid classes:

```liquid
{% render 'infinite-scroll-collection',
  collection: collection,
  grid_classes: 'grid grid--4-col-desktop grid--2-col-tablet'
%}
```

### Styling the Loading State

Override the default loading styles in your theme CSS:

```css
.infinite-scroll__loader {
  /* Your custom loading spinner */
}

.infinite-scroll__product--loading {
  /* Custom animation for new products */
}
```

## Browser Support

- Chrome 58+ ✅
- Firefox 55+ ✅
- Safari 12.1+ ✅
- Edge 16+ ✅
- IE 11 ⚠️ (falls back to traditional pagination)

## Accessibility

This snippet follows WCAG 2.1 guidelines:

- **Screen readers**: Announces when new products are loaded
- **Keyboard navigation**: Full keyboard support with focus management
- **Reduced motion**: Respects `prefers-reduced-motion` setting
- **ARIA labels**: Proper labeling for all interactive elements
- **Focus indicators**: Visible focus states for keyboard users

## Performance

- Uses Intersection Observer API (no scroll event listeners)
- Debounced loading to prevent rapid-fire requests
- Lazy-loads images in new products
- Minimal DOM manipulation
- No layout thrashing

## Troubleshooting

### Products not loading

1. Check browser console for errors
2. Verify the collection has more than one page of products
3. Ensure `paginate` block wraps the product loop correctly

### Duplicate products appearing

1. Clear your theme cache
2. Check for conflicting JavaScript
3. Verify pagination URLs are correct

### Styling issues

1. Ensure your product card snippet is correctly named
2. Check for CSS conflicts with existing grid styles
3. Verify grid classes match your theme

## Changelog

### v1.0.0
- Initial release
- Full infinite scroll functionality
- Accessibility support
- History state management
```
