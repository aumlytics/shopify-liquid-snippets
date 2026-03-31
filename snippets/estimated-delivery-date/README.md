# Estimated Delivery Date Display

A production-ready Shopify snippet that displays estimated delivery date ranges on product and cart pages. Builds customer confidence and reduces "Where's my order?" support tickets.

## What It Solves

- **Customer Uncertainty**: Shows clear delivery expectations before purchase
- **Reduced Support Tickets**: Fewer "When will my order arrive?" inquiries
- **Increased Conversions**: Transparency builds trust and encourages purchase
- **Cart Abandonment**: Clear shipping timelines reduce last-minute doubts

## Features

- ✅ Configurable processing time (business days)
- ✅ Multiple shipping method support
- ✅ Automatic business day calculation (excludes weekends)
- ✅ Optional holiday exclusion
- ✅ Cutoff time support ("Order within X hours for faster shipping")
- ✅ Localization-ready date formatting
- ✅ Fully accessible (WCAG 2.1 AA compliant)
- ✅ No external dependencies
- ✅ Works with OS 2.0 themes (Dawn, Horizon, Craft)

## Installation

### Step 1: Add the Snippet File

Copy `estimated-delivery-date.liquid` to your theme's `snippets/` folder:


your-theme/
└── snippets/
    └── estimated-delivery-date.liquid
```

### Step 2: Add the JavaScript File

Copy `snippet.js` contents to one of these locations:

**Option A (Recommended):** Add to your theme's `assets/` folder as `estimated-delivery-date.js` and include it:
```liquid
{{ 'estimated-delivery-date.js' | asset_url | script_tag }}
```

**Option B:** Add directly in your `theme.liquid` before `</body>`:
```liquid
<script>
  // Paste snippet.js contents here
</script>
```

### Step 3: Include the Snippet

Add to your product page (`sections/main-product.liquid` or `templates/product.liquid`):

```liquid
{% render 'estimated-delivery-date',
  processing_days_min: 1,
  processing_days_max: 2,
  shipping_methods: 'standard:5:7:Free Shipping,express:2:3:Express ($9.99),overnight:1:1:Next Day ($19.99)',
  default_method: 'standard',
  cutoff_hour: 14,
  show_countdown: true
%}
```

Add to your cart page (`sections/main-cart.liquid` or `templates/cart.liquid`):

```liquid
{% render 'estimated-delivery-date',
  context: 'cart',
  processing_days_min: 1,
  processing_days_max: 2,
  shipping_methods: 'standard:5:7:Free Shipping',
  show_icon: true
%}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `processing_days_min` | Integer | `1` | Minimum business days to process order |
| `processing_days_max` | Integer | `2` | Maximum business days to process order |
| `shipping_methods` | String | `'standard:5:7:Standard Shipping'` | Comma-separated shipping options (format: `id:min_days:max_days:label`) |
| `default_method` | String | `'standard'` | Pre-selected shipping method ID |
| `cutoff_hour` | Integer | `14` | Hour (24h format) cutoff for same-day processing |
| `cutoff_timezone` | String | `'America/New_York'` | Timezone for cutoff calculation |
| `show_countdown` | Boolean | `true` | Show "Order within X hours" countdown |
| `show_icon` | Boolean | `true` | Show delivery truck icon |
| `show_method_selector` | Boolean | `true` | Allow users to switch shipping methods |
| `context` | String | `'product'` | Display context: `'product'` or `'cart'` |
| `date_format` | String | `'weekday_month_day'` | Date format: `'weekday_month_day'`, `'month_day'`, `'full'`, `'short'` |
| `locale` | String | `'en-US'` | Locale for date formatting |
| `holidays` | String | `''` | Comma-separated holidays to exclude (format: `MM-DD` or `YYYY-MM-DD`) |
| `exclude_weekends` | Boolean | `true` | Exclude Saturday and Sunday from business days |
| `wrapper_class` | String | `''` | Additional CSS class for wrapper element |
| `id_prefix` | String | `'edd'` | Prefix for element IDs (for multiple instances) |

## Shipping Methods Format

Define shipping methods as a comma-separated string:
```
id:min_days:max_days:Display Label
```

**Example:**
```liquid
shipping_methods: 'ground:5:7:Ground Shipping,priority:3:5:Priority Mail,express:1:2:Express Delivery'
```

## Holiday Exclusion

Exclude specific dates from delivery calculations:

```liquid
{% comment %} Recurring holidays (same date every year) {% endcomment %}
holidays: '12-25,01-01,07-04'

{% comment %} Specific year holidays {% endcomment %}
holidays: '2024-11-28,2024-12-25,2025-01-01'

{% comment %} Mixed format {% endcomment %}
holidays: '12-25,12-26,2024-11-28'
```

## Date Formats

| Format | Example Output |
|--------|---------------|
| `weekday_month_day` | Wednesday, January 15 |
| `month_day` | January 15 |
| `full` | Wednesday, January 15, 2025 |
| `short` | Jan 15 |

## Styling Customization

Override default styles by adding CSS after the snippet or in your theme's stylesheet:

```css
/* Custom colors */
.edd-wrapper {
  --edd-primary-color: #2E7D32;
  --edd-secondary-color: #1565C0;
  --edd-background-color: #F1F8E9;
  --edd-border-color: #C8E6C9;
  --edd-text-color: #1B5E20;
  --edd-countdown-color: #D84315;
}

/* Custom sizing */
.edd-wrapper {
  --edd-font-size-base: 14px;
  --edd-font-size-small: 12px;
  --edd-spacing-sm: 8px;
  --edd-spacing-md: 12px;
  --edd-border-radius: 8px;
}
```

## JavaScript API

The snippet exposes a global API for programmatic control:

```javascript
// Get instance
const edd = window.EstimatedDeliveryDate.getInstance('edd');

// Update shipping method programmatically
edd.setShippingMethod('express');

// Refresh calculation (e.g., after timezone change)
edd.refresh();

// Get current delivery estimate
const estimate = edd.getEstimate();
console.log(estimate);
// { minDate: Date, maxDate: Date, method: 'express', businessDays: { min: 3, max: 5 } }

// Listen for changes
document.addEventListener('edd:updated', (event) => {
  console.log('New estimate:', event.detail);
});
```

## Integration Examples

### With Product Variants

```liquid
{% render 'estimated-delivery-date',
  processing_days_min: product.selected_or_first_available_variant.metafields.shipping.processing_min | default: 1,
  processing_days_max: product.selected_or_first_available_variant.metafields.shipping.processing_max | default: 2,
  shipping_methods: 'standard:5:7:Standard Shipping'
%}
```

### With Inventory-Based Processing

```liquid
{% assign in_stock = product.selected_or_first_available_variant.inventory_quantity > 0 %}
{% render 'estimated-delivery-date',
  processing_days_min: in_stock ? 1 : 5,
  processing_days_max: in_stock ? 2 : 10,
  shipping_methods: 'standard:5:7:Standard Shipping'
%}
```

### Multiple Instances

```liquid
{% comment %} Product page instance {% endcomment %}
{% render 'estimated-delivery-date',
  id_prefix: 'edd-product',
  context: 'product'
%}

{% comment %} Sticky cart instance {% endcomment %}
{% render 'estimated-delivery-date',
  id_prefix: 'edd-sticky',
  context: 'cart',
  show_method_selector: false
%}
```

## Accessibility

This snippet is fully accessible:

- Uses semantic HTML (`<time>`, `<fieldset>`, `<legend>`)
- Proper ARIA labels and live regions
- Keyboard navigable
- Screen reader announcements for updates
- Respects `prefers-reduced-motion`
- Sufficient color contrast (WCAG AA)

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## Troubleshooting

### Dates not updating?
Ensure JavaScript is loaded after the DOM. Check for console errors.

### Wrong timezone?
Set the `cutoff_timezone` parameter to your store's timezone.

### Holidays not excluded?
Verify date format matches `MM-DD` or `YYYY-MM-DD`.

### Multiple snippets conflicting?
Use unique `id_prefix` values for each instance.

## License

MIT License - Use freely in personal and commercial projects.
```

---
