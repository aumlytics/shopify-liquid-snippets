# Collection Load More Button

A production-ready Shopify snippet that replaces traditional pagination with a "Load More" button, dynamically appending products without full page reloads. This solution improves user experience while maintaining SEO benefits that infinite scroll often sacrifices.

## Features

- ✅ **SEO-Friendly**: Maintains crawlable pagination URLs for search engines
- ✅ **Accessible**: Full keyboard navigation and screen reader support
- ✅ **Progressive Enhancement**: Falls back to standard pagination when JS is disabled
- ✅ **Performance Optimized**: Uses fetch API with request caching
- ✅ **Theme Compatible**: Works with Dawn, Horizon, Craft, and OS 2.0 themes
- ✅ **Customizable**: Extensive configuration options via snippet parameters
- ✅ **Browser History**: Updates URL without page refresh for shareable links

## Installation

### Step 1: Add the Liquid Snippet

Copy `collection-load-more-button.liquid` to your theme's `snippets/` folder.

### Step 2: Add the JavaScript

Copy `snippet.js` content to your theme's `assets/` folder as `collection-load-more.js`.

Or include the JavaScript inline by setting `inline_js: true` when rendering the snippet.

### Step 3: Include in Collection Template

In your `templates/collection.liquid` or `sections/main-collection.liquid`, replace your existing pagination with:

{% render 'collection-load-more-button',
  paginate: paginate,
  product_card_snippet: 'product-card',
  products_container_id: 'product-grid'
%}

### Step 4: Ensure Product Grid Has Correct ID

Your product grid container must have an ID that matches `products_container_id`:

```liquid
<ul id="product-grid" class="collection-product-grid">
  {% for product in collection.products %}
    {% render 'product-card', product: product %}
  {% endfor %}
</ul>
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `paginate` | Object | **Required** | The paginate object from Liquid |
| `products_container_id` | String | `'ProductGrid'` | ID of the container where products will be appended |
| `product_card_snippet` | String | `'product-card'` | Name of your product card snippet |
| `button_text` | String | `'Load More Products'` | Text displayed on the button |
| `loading_text` | String | `'Loading...'` | Text shown while fetching products |
| `button_class` | String | `''` | Additional CSS classes for the button |
| `show_count` | Boolean | `true` | Show "X of Y products" counter |
| `scroll_to_new` | Boolean | `false` | Scroll to first new product after load |
| `update_url` | Boolean | `true` | Update browser URL with current page |
| `prefetch_next` | Boolean | `true` | Prefetch next page for faster loading |
| `inline_js` | Boolean | `false` | Include JS inline instead of external file |
| `animation` | String | `'fade'` | Animation type: 'fade', 'slide', or 'none' |

## Usage Examples

### Basic Usage

```liquid
{% paginate collection.products by 12 %}
  <ul id="product-grid">
    {% for product in collection.products %}
      {% render 'product-card', product: product %}
    {% endfor %}
  </ul>

  {% render 'collection-load-more-button',
    paginate: paginate,
    products_container_id: 'product-grid'
  %}
{% endpaginate %}
```

### With Custom Styling

```liquid
{% render 'collection-load-more-button',
  paginate: paginate,
  products_container_id: 'product-grid',
  button_text: 'Show More',
  button_class: 'btn btn--primary btn--large',
  show_count: true,
  animation: 'slide'
%}
```

### For Search Results

```liquid
{% paginate search.results by 12 %}
  {% render 'collection-load-more-button',
    paginate: paginate,
    products_container_id: 'search-results-grid',
    product_card_snippet: 'search-result-card',
    button_text: 'Load More Results'
  %}
{% endpaginate %}
```

### With Prefetching Disabled (Low-Bandwidth Users)

```liquid
{% render 'collection-load-more-button',
  paginate: paginate,
  products_container_id: 'product-grid',
  prefetch_next: false,
  update_url: false
%}
```

## Styling Customization

The snippet includes scoped CSS with CSS custom properties for easy theming:

```css
:root {
  --load-more-btn-bg: #000;
  --load-more-btn-color: #fff;
  --load-more-btn-border-radius: 4px;
  --load-more-btn-padding: 16px 32px;
  --load-more-btn-font-size: 14px;
  --load-more-progress-bg: rgba(0, 0, 0, 0.1);
  --load-more-progress-fill: #000;
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

### Products Not Appending

1. Verify `products_container_id` matches your grid's ID exactly
2. Check browser console for JavaScript errors
3. Ensure the product card snippet name is correct

### Duplicate Products Loading

1. Clear your Shopify theme cache
2. Verify pagination is set up correctly in your template
3. Check for conflicting JavaScript

### Styling Issues

1. Inspect element to check for CSS specificity conflicts
2. Use the `button_class` parameter to apply theme-specific classes
3. Override CSS custom properties in your theme's stylesheet

## Events

The snippet dispatches custom events you can listen for:

```javascript
document.addEventListener('loadmore:start', (e) => {
  console.log('Loading page:', e.detail.page);
});

document.addEventListener('loadmore:success', (e) => {
  console.log('Loaded products:', e.detail.count);
});

document.addEventListener('loadmore:complete', (e) => {
  console.log('All products loaded');
});

document.addEventListener('loadmore:error', (e) => {
  console.error('Load failed:', e.detail.error);
});
```

## License

MIT License - Free for commercial and personal use.

---
