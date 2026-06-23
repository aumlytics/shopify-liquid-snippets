# Size Chart Modal Popup

A production-ready, accessible size chart modal popup snippet for Shopify stores. Reduces sizing-related returns by providing clear, easy-to-access size information directly on product pages.

## Features

- ✅ Fully accessible (WCAG 2.1 AA compliant)
- ✅ Keyboard navigation support (Tab, Escape, Enter)
- ✅ Focus trapping within modal
- ✅ Screen reader friendly with proper ARIA attributes
- ✅ Responsive design (mobile-first)
- ✅ Customizable size data via metafields or default chart
- ✅ Smooth animations with reduced-motion support
- ✅ No external dependencies
- ✅ Works with Dawn, Horizon, Craft, and other OS 2.0 themes
- ✅ Multiple unit support (inches/centimeters)
- ✅ Print-friendly size chart

## Installation

### Step 1: Create the Snippet File

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code** on your active theme
3. Under **Snippets**, click **Add a new snippet**
4. Name it `size-chart-modal` and paste the contents of `size-chart-modal.liquid`
5. Click **Save**

### Step 2: Add JavaScript

1. Under **Assets**, click **Add a new asset**
2. Create a file named `size-chart-modal.js` and paste the contents of `snippet.js`
3. Click **Save**

### Step 3: Include in Product Template

Add this line to your product template (usually `sections/main-product.liquid` or `templates/product.json`):

{% render 'size-chart-modal', product: product %}

### Step 4 (Optional): Create Metafield Definitions

For custom size charts per product:

1. Go to **Settings > Custom data > Products**
2. Add a metafield with namespace `custom` and key `size_chart_data`
3. Type: JSON
4. Add your size chart data (see format below)

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `product` | Object | `product` | The product object to check for metafield data |
| `trigger_text` | String | `'Size Guide'` | Text displayed on the trigger link |
| `trigger_icon` | Boolean | `true` | Show ruler icon next to trigger text |
| `modal_title` | String | `'Size Chart'` | Title displayed in the modal header |
| `show_unit_toggle` | Boolean | `true` | Show inches/cm toggle switch |
| `default_unit` | String | `'in'` | Default unit: `'in'` or `'cm'` |
| `chart_type` | String | `'clothing'` | Default chart type: `'clothing'`, `'shoes'`, `'rings'`, or `'custom'` |
| `custom_headers` | Array | `nil` | Custom table headers for custom charts |
| `custom_rows` | Array | `nil` | Custom table rows for custom charts |
| `show_how_to_measure` | Boolean | `true` | Show measurement instructions |
| `trigger_class` | String | `''` | Additional CSS classes for trigger element |
| `theme` | String | `'light'` | Color theme: `'light'` or `'dark'` |

## Example Usage

### Basic Usage

```liquid
{% render 'size-chart-modal', product: product %}
```

### Custom Trigger Text

```liquid
{% render 'size-chart-modal',
  product: product,
  trigger_text: 'View Sizing Info',
  trigger_icon: false
%}
```

### Shoes Size Chart

```liquid
{% render 'size-chart-modal',
  product: product,
  chart_type: 'shoes',
  modal_title: 'Shoe Size Guide'
%}
```

### Dark Theme

```liquid
{% render 'size-chart-modal',
  product: product,
  theme: 'dark'
%}
```

### Custom Size Chart

```liquid
{% render 'size-chart-modal',
  product: product,
  chart_type: 'custom',
  modal_title: 'Hat Sizes',
  custom_headers: 'Size,Head Circumference (in),Head Circumference (cm)',
  custom_rows: 'S,21.5-22,54.5-56|M,22-22.75,56-57.5|L,22.75-23.5,57.5-59.5|XL,23.5-24.5,59.5-62'
%}
```

## Metafield JSON Format

For product-specific size charts, use this JSON structure in the `custom.size_chart_data` metafield:

```json
{
  "title": "Women's Dress Sizes",
  "headers": ["Size", "US", "Bust", "Waist", "Hips"],
  "rows": [
    ["XS", "0-2", "31-32", "24-25", "34-35"],
    ["S", "4-6", "33-34", "26-27", "36-37"],
    ["M", "8-10", "35-36", "28-29", "38-39"],
    ["L", "12-14", "37-39", "30-32", "40-42"],
    ["XL", "16-18", "40-42", "33-35", "43-45"]
  ],
  "measurements": {
    "Bust": "Measure around the fullest part of your bust",
    "Waist": "Measure around your natural waistline",
    "Hips": "Measure around the fullest part of your hips"
  },
  "units": {
    "in": {
      "rows": [
        ["XS", "0-2", "31-32", "24-25", "34-35"],
        ["S", "4-6", "33-34", "26-27", "36-37"],
        ["M", "8-10", "35-36", "28-29", "38-39"],
        ["L", "12-14", "37-39", "30-32", "40-42"],
        ["XL", "16-18", "40-42", "33-35", "43-45"]
      ]
    },
    "cm": {
      "rows": [
        ["XS", "0-2", "79-81", "61-64", "86-89"],
        ["S", "4-6", "84-86", "66-69", "91-94"],
        ["M", "8-10", "89-91", "71-74", "97-99"],
        ["L", "12-14", "94-99", "76-81", "102-107"],
        ["XL", "16-18", "102-107", "84-89", "109-114"]
      ]
    }
  }
}
```

## Styling Customization

The snippet uses CSS custom properties for easy theming. Override these in your theme's CSS:

```css
:root {
  --size-chart-primary: #000000;
  --size-chart-secondary: #666666;
  --size-chart-background: #ffffff;
  --size-chart-border: #e5e5e5;
  --size-chart-hover: #f5f5f5;
  --size-chart-accent: #000000;
  --size-chart-radius: 8px;
  --size-chart-font: inherit;
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

### Modal doesn't open
- Ensure JavaScript file is properly loaded
- Check browser console for errors
- Verify snippet is rendered (inspect HTML)

### Styling conflicts
- The snippet uses scoped CSS with specific selectors
- Add `!important` to custom overrides if needed
- Check for CSS specificity issues

### Accessibility issues
- Ensure no duplicate IDs on the page
- Test with screen readers (NVDA, VoiceOver)
- Verify focus states are visible

## Changelog

### v1.0.0
- Initial release
- Full accessibility support
- Multiple chart types
- Unit conversion toggle
- Metafield integration

---

**License:** MIT
**Author:** Your Store Name
**Compatibility:** Shopify OS 2.0+
