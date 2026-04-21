# Auto-Select Single Available Variant

## What It Solves

When a product has multiple variants but only one is actually available (in stock), Shopify's default behavior often shows an "Unavailable" state, forcing customers to manually click through options to find what's purchasable. This creates friction and can lead to lost sales.

This snippet automatically detects and selects the only available variant, providing a seamless shopping experience.

## Features

- ✅ Automatically selects the single available variant on page load
- ✅ Works with single and multi-option products (Size/Color/Material combinations)
- ✅ Preserves URL variant parameter if specified
- ✅ Shows helpful messaging explaining the auto-selection
- ✅ Fires custom events for theme integration
- ✅ Fully accessible with ARIA live regions
- ✅ Zero external dependencies
- ✅ Works with Dawn, Horizon, Craft, and most OS 2.0 themes

## Installation

### Step 1: Create the Snippet

1. In your Shopify admin, go to **Online Store → Themes**
2. Click **Actions → Edit code**
3. Under **Snippets**, click **Add a new snippet**
4. Name it `auto-select-single-variant`
5. Paste the contents of `auto-select-single-variant.liquid`
6. Save the file

### Step 2: Include the Snippet

Add the snippet to your product template or main-product section. In Dawn theme, edit `sections/main-product.liquid`:

```liquid
{% comment %} Add this AFTER the product form {% endcomment %}
{% render 'auto-select-single-variant', product: product %}

### Step 3: (Optional) Customize Settings

```liquid
{% render 'auto-select-single-variant',
  product: product,
  enable_message: true,
  message_text: 'Auto-selected the only available option',
  message_duration: 5000,
  respect_url_variant: true,
  enable_analytics_event: true,
  selector_type: 'radios'
%}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `product` | Object | **required** | The product object |
| `enable_message` | Boolean | `true` | Show a message when auto-selection occurs |
| `message_text` | String | `"We've selected the only available option for you"` | Custom message text |
| `message_duration` | Number | `5000` | How long to show message (ms). Set to `0` for permanent |
| `respect_url_variant` | Boolean | `true` | Don't auto-select if URL has `?variant=` parameter |
| `enable_analytics_event` | Boolean | `true` | Fire custom event for analytics tracking |
| `selector_type` | String | `'radios'` | Variant selector type: `'radios'`, `'select'`, or `'auto'` |
| `form_id` | String | `''` | Specific form ID to target (auto-detected if empty) |
| `debug_mode` | Boolean | `false` | Log debug information to console |

## Events

The snippet dispatches custom events you can listen for:

```javascript
// Fired when a variant is auto-selected
document.addEventListener('auto-variant:selected', (event) => {
  console.log('Auto-selected variant:', event.detail.variant);
  console.log('Product:', event.detail.product);
  console.log('Reason:', event.detail.reason);
});

// Fired when auto-selection is skipped
document.addEventListener('auto-variant:skipped', (event) => {
  console.log('Skipped because:', event.detail.reason);
});
```

## Integration with Analytics

```javascript
document.addEventListener('auto-variant:selected', (event) => {
  // Google Analytics 4
  gtag('event', 'auto_variant_selected', {
    product_id: event.detail.product.id,
    variant_id: event.detail.variant.id,
    variant_title: event.detail.variant.title
  });
  
  // Klaviyo
  if (window.klaviyo) {
    klaviyo.track('Auto Variant Selected', {
      ProductID: event.detail.product.id,
      VariantID: event.detail.variant.id
    });
  }
});
```

## Theme Compatibility

### Dawn Theme
Works out of the box. Add to `sections/main-product.liquid` after the product form.

### Horizon Theme
Works out of the box. May need to set `selector_type: 'select'` if using dropdown selectors.

### Craft Theme
Works out of the box with radios.

### Custom Themes
If your theme uses custom variant selectors, you may need to:
1. Set the appropriate `selector_type`
2. Provide the `form_id` parameter
3. Ensure your variant inputs have `name="id"` or follow Shopify conventions

## Troubleshooting

### Variant not being selected
1. Enable `debug_mode: true` to see console logs
2. Check that the product actually has only one available variant
3. Verify the selector_type matches your theme's implementation

### Message not appearing
1. Check that `enable_message` is `true`
2. Ensure no CSS is hiding the `.auto-variant-message` element
3. Check console for JavaScript errors

### Conflicts with other scripts
The snippet waits for DOM ready and uses specific selectors. If you have other variant scripts:
1. Load this snippet after other variant scripts
2. Use the custom events to coordinate behavior

## Changelog

### v1.0.0
- Initial release
- Support for radio and select variant selectors
- Auto-detection of selector type
- Accessible messaging with ARIA live regions
- Custom events for analytics integration
```

---
