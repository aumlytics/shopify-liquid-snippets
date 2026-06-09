# Collection Filter Results Count

## What It Solves

When customers use collection filters, they often encounter frustration from selecting filter combinations that yield zero results. This snippet displays the number of products matching current filter selections **in real-time before applying filters**, preventing dead-end filter combinations and improving the shopping experience.

### Key Benefits
- **Reduces bounce rate** by preventing zero-result frustration
- **Improves UX** with instant feedback on filter selections
- **Accessible** with proper ARIA attributes and screen reader support
- **Lightweight** with no external dependencies
- **Theme-agnostic** works with Dawn, Horizon, Craft, and custom OS 2.0 themes

---

## Installation

### Step 1: Add the Liquid Snippet

1. In your Shopify Admin, go to **Online Store > Themes**
2. Click **Actions > Edit code**
3. Under **Snippets**, click **Add a new snippet**
4. Name it `collection-filter-current-count`
5. Paste the contents of `collection-filter-current-count.liquid`
6. Save the file

### Step 2: Add the JavaScript

1. Under **Assets**, click **Add a new asset**
2. Create `collection-filter-count.js`
3. Paste the contents of `snippet.js`
4. Save the file

### Step 3: Include the Snippet

Add this line to your collection template or filter component (typically in `main-collection-product-grid.liquid` or `facets.liquid`):

```liquid
{% render 'collection-filter-current-count',
  collection: collection,
  current_filter_count: collection.products_count
%}

### Step 4: Load the JavaScript

Add to your `theme.liquid` before `</body>` or in your collection template:

```liquid
<script src="{{ 'collection-filter-count.js' | asset_url }}" defer></script>
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `collection` | Object | Yes | - | The current collection object |
| `current_filter_count` | Number | No | `collection.products_count` | Override the initial product count |
| `show_total` | Boolean | No | `true` | Show total products in collection alongside filtered count |
| `position` | String | No | `'inline'` | Display position: `'inline'`, `'sticky'`, or `'floating'` |
| `update_url_count` | Boolean | No | `true` | Update count when URL changes (for AJAX filtering) |
| `debounce_delay` | Number | No | `150` | Milliseconds to wait before fetching count |
| `show_loading` | Boolean | No | `true` | Show loading indicator during count fetch |
| `animate` | Boolean | No | `true` | Animate count changes |
| `i18n_products` | String | No | `'products'` | Plural text for products |
| `i18n_product` | String | No | `'product'` | Singular text for product |
| `i18n_of` | String | No | `'of'` | Text between filtered/total count |
| `i18n_showing` | String | No | `'Showing'` | Prefix text |
| `i18n_no_results` | String | No | `'No products match your filters'` | Zero results message |

---

## Usage Examples

### Basic Usage

```liquid
{% render 'collection-filter-current-count', collection: collection %}
```

### With Custom Position (Sticky Bar)

```liquid
{% render 'collection-filter-current-count',
  collection: collection,
  position: 'sticky'
%}
```

### Floating Badge Style

```liquid
{% render 'collection-filter-current-count',
  collection: collection,
  position: 'floating',
  show_total: false
%}
```

### Multi-language Support

```liquid
{% render 'collection-filter-current-count',
  collection: collection,
  i18n_showing: 'Affichage de',
  i18n_products: 'produits',
  i18n_product: 'produit',
  i18n_of: 'sur',
  i18n_no_results: 'Aucun produit ne correspond'
%}
```

### Integration with Dawn Theme Facets

In your `facets.liquid`, add near the filter form:

```liquid
<facet-filters-form>
  <form>
    {% render 'collection-filter-current-count',
      collection: collection,
      position: 'inline'
    %}
    <!-- existing filter markup -->
  </form>
</facet-filters-form>
```

---

## Customization

### CSS Custom Properties

Override these CSS variables in your theme's stylesheet:

```css
:root {
  --filter-count-bg: #f8f9fa;
  --filter-count-text: #1a1a1a;
  --filter-count-accent: #000000;
  --filter-count-border: #e5e5e5;
  --filter-count-radius: 4px;
  --filter-count-padding: 0.75rem 1rem;
  --filter-count-font-size: 0.875rem;
  --filter-count-zero-bg: #fff3cd;
  --filter-count-zero-text: #856404;
}
```

### JavaScript Events

The snippet emits custom events you can listen to:

```javascript
// Fired when count is updated
document.addEventListener('filter-count:updated', (e) => {
  console.log('New count:', e.detail.count);
  console.log('Total:', e.detail.total);
});

// Fired when count fetch fails
document.addEventListener('filter-count:error', (e) => {
  console.error('Error:', e.detail.error);
});

// Fired before count fetch starts
document.addEventListener('filter-count:loading', (e) => {
  console.log('Fetching count for:', e.detail.url);
});
```

---

## How It Works

1. **Initial Render**: Displays the current filtered product count from Liquid
2. **Filter Interaction**: Listens for changes to filter inputs (checkboxes, radios, selects, price ranges)
3. **URL Construction**: Builds a preview URL with the proposed filter selections
4. **AJAX Fetch**: Requests the collection page with filters applied (minimal HTML)
5. **Count Extraction**: Parses the response to extract the product count
6. **Display Update**: Updates the UI with the new count, with optional animation

---

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

---

## Troubleshooting

### Count not updating?
- Ensure the JavaScript file is loaded after the DOM
- Check browser console for errors
- Verify the collection URL is accessible

### Wrong count displayed?
- Some themes modify product visibility via JavaScript
- Check if inventory hiding is affecting counts
- Verify filter parameter names match your theme

### Performance concerns?
- The snippet uses debouncing (default 150ms)
- Requests are aborted when new filters are selected
- Consider increasing `debounce_delay` on slower connections

---

## Changelog

### v1.0.0
- Initial release
- Support for Dawn, Horizon, and Craft themes
- Accessible markup with ARIA live regions
- Three display positions: inline, sticky, floating
```

---
