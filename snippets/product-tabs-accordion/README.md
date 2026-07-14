# Product Tabs & Accordion Toggle

A production-ready Shopify snippet that organizes product information into collapsible tabs (desktop) or accordion sections (mobile), providing a clean and accessible way to display product descriptions, specifications, shipping info, and reviews.

## What It Solves

- **Information Overload**: Long product pages overwhelm customers. This snippet organizes content into digestible sections.
- **Mobile UX**: Automatically switches to accordion layout on mobile for better touch interaction.
- **Accessibility**: Full keyboard navigation and screen reader support with proper ARIA attributes.
- **Performance**: Zero external dependencies, minimal JavaScript, CSS-only transitions.

## Features

- ✅ Responsive: Tabs on desktop, accordion on mobile
- ✅ Accessible: WCAG 2.1 AA compliant
- ✅ Customizable: 15+ parameters for full control
- ✅ SEO-friendly: Content is in the DOM, not hidden from crawlers
- ✅ Theme-agnostic: Works with Dawn, Horizon, Craft, and custom themes
- ✅ Metafield support: Pull specs and shipping from product metafields
- ✅ Review integration: Works with Shopify Product Reviews, Judge.me, Loox, etc.

## Installation

### Step 1: Create the Snippet File

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code**
3. Under **Snippets**, click **Add a new snippet**
4. Name it `product-tabs-accordion`
5. Paste the contents of `product-tabs-accordion.liquid`
6. Click **Save**

### Step 2: Add JavaScript (Optional but Recommended)

1. Under **Assets**, click **Add a new asset**
2. Upload or create `snippet-product-tabs.js`
3. Paste the contents of `snippet.js`
4. Click **Save**

### Step 3: Include in Product Template

Add this to your product template (e.g., `sections/main-product.liquid` or `templates/product.liquid`):

```liquid
{% render 'product-tabs-accordion',
  product: product,
  show_description: true,
  show_specifications: true,
  show_shipping: true,
  show_reviews: true
%}

## Parameters Reference

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `product` | Object | `product` | The product object to display |
| `show_description` | Boolean | `true` | Show product description tab |
| `show_specifications` | Boolean | `true` | Show specifications tab |
| `show_shipping` | Boolean | `true` | Show shipping info tab |
| `show_reviews` | Boolean | `true` | Show reviews tab |
| `default_open` | String | `'description'` | Which tab opens by default: `'description'`, `'specifications'`, `'shipping'`, `'reviews'`, or `'none'` |
| `mobile_breakpoint` | Number | `768` | Pixel width to switch to accordion |
| `animation_duration` | Number | `300` | Transition duration in ms |
| `allow_multiple_open` | Boolean | `false` | Allow multiple accordion panels open (mobile only) |
| `description_title` | String | `'Description'` | Custom title for description tab |
| `specifications_title` | String | `'Specifications'` | Custom title for specifications tab |
| `shipping_title` | String | `'Shipping & Returns'` | Custom title for shipping tab |
| `reviews_title` | String | `'Reviews'` | Custom title for reviews tab |
| `specs_metafield_namespace` | String | `'custom'` | Metafield namespace for specifications |
| `specs_metafield_key` | String | `'specifications'` | Metafield key for specifications |
| `shipping_metafield_namespace` | String | `'custom'` | Metafield namespace for shipping |
| `shipping_metafield_key` | String | `'shipping_info'` | Metafield key for shipping |
| `custom_class` | String | `''` | Additional CSS class for styling |

## Example Implementations

### Basic Usage

```liquid
{% render 'product-tabs-accordion', product: product %}
```

### Custom Tab Titles

```liquid
{% render 'product-tabs-accordion',
  product: product,
  description_title: 'About This Product',
  specifications_title: 'Tech Specs',
  shipping_title: 'Delivery Info',
  reviews_title: 'Customer Feedback'
%}
```

### Only Description and Reviews

```liquid
{% render 'product-tabs-accordion',
  product: product,
  show_description: true,
  show_specifications: false,
  show_shipping: false,
  show_reviews: true,
  default_open: 'reviews'
%}
```

### Multiple Accordions Open (Mobile)

```liquid
{% render 'product-tabs-accordion',
  product: product,
  allow_multiple_open: true,
  mobile_breakpoint: 1024
%}
```

### With Custom Metafields

First, create metafields in Shopify Admin:
- `custom.specifications` (JSON or multi-line text)
- `custom.shipping_info` (rich text or multi-line text)

Then use:

```liquid
{% render 'product-tabs-accordion',
  product: product,
  specs_metafield_namespace: 'custom',
  specs_metafield_key: 'specifications',
  shipping_metafield_namespace: 'custom',
  shipping_metafield_key: 'shipping_info'
%}
```

### Metafield JSON Format for Specifications

```json
{
  "Weight": "2.5 lbs",
  "Dimensions": "10\" x 8\" x 4\"",
  "Material": "100% Organic Cotton",
  "Care": "Machine wash cold"
}
```

## Styling Customization

### Override CSS Variables

Add to your theme's CSS:

```css
.product-tabs-accordion {
  --pta-primary-color: #your-brand-color;
  --pta-border-color: #your-border-color;
  --pta-border-radius: 8px;
  --pta-font-family: 'Your Font', sans-serif;
}
```

### Available CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--pta-primary-color` | `#121212` | Active tab/accordion color |
| `--pta-secondary-color` | `#666666` | Inactive text color |
| `--pta-border-color` | `#e5e5e5` | Border color |
| `--pta-background-color` | `#ffffff` | Content background |
| `--pta-hover-color` | `#f5f5f5` | Hover state background |
| `--pta-border-radius` | `4px` | Corner radius |
| `--pta-font-family` | `inherit` | Font family |
| `--pta-transition-duration` | `0.3s` | Animation speed |

## Review App Integration

### Shopify Product Reviews (Native)

```liquid
{% render 'product-tabs-accordion',
  product: product,
  show_reviews: true
%}
```

The snippet automatically detects `#shopify-product-reviews`.

### Judge.me

Add to the reviews content block in the snippet:

```liquid
<div class="jdgm-widget jdgm-review-widget" data-product-id="{{ product.id }}"></div>
```

### Loox

```liquid
<div id="looxReviews" data-product-id="{{ product.id }}"></div>
```

## Troubleshooting

### Tabs not switching
- Ensure JavaScript file is loaded
- Check browser console for errors
- Verify no JS conflicts with other scripts

### Accordion not collapsing smoothly
- Check if `animation_duration` is set correctly
- Ensure no CSS `!important` overrides on height

### Reviews not showing
- Verify review app is installed and configured
- Check if `show_reviews: true` is set
- Ensure review app's widget code is in the template

### Mobile breakpoint not working
- Clear browser cache
- Check if custom CSS overrides media queries
- Verify `mobile_breakpoint` value is correct

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## Changelog

### v1.0.0
- Initial release
- Tab and accordion layouts
- Full accessibility support
- Metafield integration
- Review app compatibility
```

---
