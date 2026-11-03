# Sticky Collection Filter Sidebar

A Shopify snippet that keeps the collection filter sidebar visible and accessible while scrolling through products, dramatically improving UX on large catalogs.

## What It Solves

- **Lost Context**: Users no longer lose access to filters when scrolling through hundreds of products
- **Reduced Friction**: Eliminates the need to scroll back up to adjust filters
- **Mobile Optimization**: Transforms into an accessible slide-out drawer on mobile devices
- **Performance**: Lightweight implementation with no external dependencies

## Features

- ✅ Sticky positioning with smart boundaries (respects header/footer)
- ✅ Mobile-responsive slide-out drawer
- ✅ Keyboard navigation support
- ✅ Screen reader accessible (ARIA compliant)
- ✅ Smooth scroll behavior
- ✅ Works with native Shopify filtering
- ✅ Theme-agnostic (Dawn, Horizon, Craft compatible)
- ✅ No external dependencies
- ✅ Intersection Observer for performance

## Installation

### Step 1: Create the Snippet

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code**
3. Under **Snippets**, click **Add a new snippet**
4. Name it `collection-sticky-filter-sidebar`
5. Paste the contents of `collection-sticky-filter-sidebar.liquid`
6. Click **Save**

### Step 2: Add JavaScript (Optional but Recommended)

1. Under **Assets**, click **Add a new asset**
2. Create a file named `collection-sticky-filter-sidebar.js`
3. Paste the contents of `snippet.js`
4. Click **Save**

### Step 3: Include in Collection Template

Add the following to your collection template (usually `templates/collection.liquid` or `sections/main-collection.liquid`):

```liquid
{% render 'collection-sticky-filter-sidebar',
  collection: collection,
  enable_sticky: true,
  sticky_offset: 100,
  mobile_breakpoint: 768,
  show_filter_count: true,
  collapse_on_mobile: true
%}

### Step 4: Wrap Your Product Grid

Ensure your product grid has the correct data attribute:

```liquid
<div data-sticky-filter-content class="collection-products">
  {% for product in collection.products %}
    <!-- Your product cards -->
  {% endfor %}
</div>
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `collection` | Object | *required* | The collection object to filter |
| `enable_sticky` | Boolean | `true` | Enable/disable sticky behavior |
| `sticky_offset` | Number | `100` | Pixels from top when sticky (accounts for header) |
| `mobile_breakpoint` | Number | `768` | Screen width (px) to switch to mobile drawer |
| `show_filter_count` | Boolean | `true` | Show count of active filters |
| `collapse_on_mobile` | Boolean | `true` | Auto-collapse filters on mobile |
| `filter_groups` | Array | `nil` | Custom filter groups (uses collection.filters if nil) |
| `sidebar_width` | String | `'280px'` | Width of the sidebar |
| `z_index` | Number | `100` | Z-index for sticky positioning |
| `animation_duration` | Number | `300` | Animation duration in ms |

## Examples

### Basic Usage

```liquid
{% render 'collection-sticky-filter-sidebar', collection: collection %}
```

### With Custom Offset (Larger Header)

```liquid
{% render 'collection-sticky-filter-sidebar',
  collection: collection,
  sticky_offset: 150,
  z_index: 50
%}
```

### Desktop Only (No Mobile Drawer)

```liquid
{% render 'collection-sticky-filter-sidebar',
  collection: collection,
  collapse_on_mobile: false,
  mobile_breakpoint: 0
%}
```

### Custom Sidebar Width

```liquid
{% render 'collection-sticky-filter-sidebar',
  collection: collection,
  sidebar_width: '320px'
%}
```

## CSS Customization

The snippet uses CSS custom properties for easy theming:

```css
:root {
  --sticky-filter-bg: #ffffff;
  --sticky-filter-border: #e5e5e5;
  --sticky-filter-text: #333333;
  --sticky-filter-accent: #000000;
  --sticky-filter-radius: 8px;
  --sticky-filter-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

## Accessibility

- Full keyboard navigation (Tab, Enter, Escape, Arrow keys)
- ARIA labels and roles for screen readers
- Focus trap in mobile drawer mode
- Reduced motion support
- High contrast mode compatible

## Browser Support

- Chrome 64+
- Firefox 69+
- Safari 12.1+
- Edge 79+

## Troubleshooting

### Sidebar Not Sticking

1. Ensure parent container doesn't have `overflow: hidden`
2. Check that `sticky_offset` accounts for your header height
3. Verify no conflicting `position` styles

### Mobile Drawer Not Opening

1. Check JavaScript console for errors
2. Ensure the JS file is loading (check Network tab)
3. Verify `mobile_breakpoint` matches your needs

### Filters Not Updating

1. Ensure you're using Shopify's native filtering system
2. Check that your theme supports `collection.filters`
3. Verify AJAX filtering is properly configured

## Changelog

### v1.0.0
- Initial release
- Sticky sidebar with smart boundaries
- Mobile drawer implementation
- Full accessibility support
```

---
