# Dynamic Buy Now Pay Later Messaging

A production-ready Shopify snippet that displays real-time installment pricing for popular BNPL providers (Shop Pay Installments, Klarna, Afterpay, Affirm) and dynamically updates when product variants change.

## What It Solves

- **Static pricing displays** that don't update when customers select different variants
- **Missing BNPL information** that reduces conversion rates
- **Inconsistent messaging** across different payment providers
- **Accessibility issues** with existing BNPL widgets
- **Performance problems** from loading multiple third-party scripts

## Features

- ✅ Real-time price updates on variant selection
- ✅ Support for Shop Pay, Klarna, Afterpay, and Affirm
- ✅ Configurable installment periods (4-pay, 6-pay, etc.)
- ✅ Price threshold support (min/max order values)
- ✅ Full accessibility compliance (WCAG 2.1 AA)
- ✅ Zero external dependencies
- ✅ Works with all OS 2.0 themes
- ✅ Currency formatting respects store settings
- ✅ Mobile-responsive design
- ✅ Customizable styling via CSS variables

## Installation

### Step 1: Add the Liquid Snippet

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code**
3. Under **Snippets**, click **Add a new snippet**
4. Name it `dynamic-bnpl-messaging`
5. Paste the contents of `dynamic-bnpl-messaging.liquid`
6. Click **Save**

### Step 2: Add the JavaScript

1. Under **Assets**, click **Add a new asset**
2. Create a file named `dynamic-bnpl-messaging.js`
3. Paste the contents of `snippet.js`
4. Click **Save**

### Step 3: Include in Product Template

Add the snippet to your product template (usually `sections/main-product.liquid` or `templates/product.json`):

```liquid
{% render 'dynamic-bnpl-messaging',
  product: product,
  current_variant: product.selected_or_first_available_variant
%}

### Step 4: Configure Your Providers

Edit the snippet and update the `providers` configuration to match your enabled payment methods.

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `product` | Product | Yes | - | The product object |
| `current_variant` | Variant | Yes | - | The currently selected variant |
| `providers` | String | No | `'shoppay,klarna,afterpay,affirm'` | Comma-separated list of enabled providers |
| `installments` | Number | No | `4` | Number of installments to display |
| `min_price` | Number | No | `50` | Minimum price (in dollars) for BNPL to show |
| `max_price` | Number | No | `3000` | Maximum price (in dollars) for BNPL |
| `show_logo` | Boolean | No | `true` | Whether to display provider logos |
| `show_learn_more` | Boolean | No | `true` | Whether to show "Learn more" links |
| `custom_class` | String | No | `''` | Additional CSS class for styling |
| `position` | String | No | `'below-price'` | Position hint for styling |

## Example Usage

### Basic Usage

```liquid
{% render 'dynamic-bnpl-messaging',
  product: product,
  current_variant: product.selected_or_first_available_variant
%}
```

### Single Provider (Afterpay Only)

```liquid
{% render 'dynamic-bnpl-messaging',
  product: product,
  current_variant: product.selected_or_first_available_variant,
  providers: 'afterpay',
  installments: 4
%}
```

### Custom Price Thresholds

```liquid
{% render 'dynamic-bnpl-messaging',
  product: product,
  current_variant: product.selected_or_first_available_variant,
  min_price: 35,
  max_price: 1500,
  providers: 'klarna,afterpay'
%}
```

### Minimal Display (No Logos)

```liquid
{% render 'dynamic-bnpl-messaging',
  product: product,
  current_variant: product.selected_or_first_available_variant,
  show_logo: false,
  show_learn_more: false
%}
```

### With Custom Styling Class

```liquid
{% render 'dynamic-bnpl-messaging',
  product: product,
  current_variant: product.selected_or_first_available_variant,
  custom_class: 'bnpl-compact'
%}
```

## Styling Customization

The snippet uses CSS custom properties for easy theming. Add these to your theme's CSS:

```css
:root {
  /* Colors */
  --bnpl-text-color: #1a1a1a;
  --bnpl-accent-color: #5c6ac4;
  --bnpl-background: #f9fafb;
  --bnpl-border-color: #e5e7eb;
  --bnpl-price-color: #059669;
  
  /* Typography */
  --bnpl-font-size: 14px;
  --bnpl-font-family: inherit;
  --bnpl-line-height: 1.5;
  
  /* Spacing */
  --bnpl-padding: 16px;
  --bnpl-border-radius: 8px;
  --bnpl-gap: 12px;
  
  /* Logo sizes */
  --bnpl-logo-height: 20px;
}
```

## JavaScript Events

The snippet emits custom events you can listen for:

```javascript
// Fired when BNPL messaging updates
document.addEventListener('bnpl:updated', (event) => {
  console.log('New price:', event.detail.price);
  console.log('Installment amount:', event.detail.installmentAmount);
  console.log('Is eligible:', event.detail.isEligible);
});

// Fired when a provider modal opens
document.addEventListener('bnpl:modal-opened', (event) => {
  console.log('Provider:', event.detail.provider);
});
```

## Integration with Variant Selectors

The snippet automatically listens for variant changes. It supports:

- Native Shopify variant selectors
- Custom `variant:changed` events
- URL parameter changes
- Direct API calls

To manually trigger an update:

```javascript
window.BNPLMessaging.updatePrice(2999); // Price in cents
```

## Troubleshooting

### BNPL messaging not showing

1. Check that the product price is within min/max thresholds
2. Verify the product is not a subscription product
3. Ensure JavaScript file is loading (check console for errors)

### Prices not updating on variant change

1. Verify your theme fires `variant:changed` events
2. Check that variant data includes price information
3. Look for JavaScript errors in the console

### Wrong currency formatting

The snippet uses the store's money format. Ensure your theme's `money_format` is correctly set in `settings_schema.json`.

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Chrome for Android 60+

## Performance

- **Zero external dependencies**
- **< 5KB total** (minified + gzipped)
- **No layout shift** - reserves space during load
- **Lazy initialization** - only runs when element is visible

## License

MIT License - Free for commercial and personal use.

## Changelog

### v1.0.0
- Initial release
- Support for Shop Pay, Klarna, Afterpay, Affirm
- Real-time variant price updates
- Full accessibility support
```

---
