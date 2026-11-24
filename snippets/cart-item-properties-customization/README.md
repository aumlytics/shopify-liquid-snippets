# Cart Item Properties Customization

A flexible Shopify snippet that enables customers to add personalized text, engravings, monograms, or custom messages to products. All customizations are captured as line item properties and passed through to orders for fulfillment.

## What It Solves

- Allows customers to add personalized text to products (engravings, monograms, custom messages)
- Captures customization data as line item properties visible in orders
- Validates input (character limits, required fields, pattern matching)
- Displays customizations in cart and checkout
- Supports multiple customization fields per product
- Works with AJAX carts and standard form submissions

## Features

- ✅ Multiple field types (text, textarea, select, checkbox)
- ✅ Character counting with limits
- ✅ Required field validation
- ✅ Pattern validation (letters only, numbers only, etc.)
- ✅ Real-time preview of customization
- ✅ Works with AJAX cart (Section Rendering API)
- ✅ Accessible (WCAG 2.1 AA compliant)
- ✅ Mobile responsive
- ✅ No external dependencies
- ✅ OS 2.0 compatible (Dawn, Horizon, Craft, etc.)

## Installation

### Step 1: Create the Snippet Files

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code**
3. Under **Snippets**, click **Add a new snippet**
4. Name it `cart-item-properties-customization`
5. Paste the contents of `cart-item-properties-customization.liquid`
6. Save the file

### Step 2: Add JavaScript

1. Under **Assets**, click **Add a new asset**
2. Create a file named `cart-item-properties.js`
3. Paste the contents of `snippet.js`
4. Save the file

### Step 3: Include in Product Template

Add the snippet to your product form (usually in `sections/main-product.liquid` or similar):

```liquid
{%- form 'product', product, id: 'product-form', class: 'product-form' -%}
  
  <!-- Include customization fields BEFORE the add to cart button -->
  {% render 'cart-item-properties-customization',
    product: product,
    enabled: true,
    fields: 'engraving,gift_message',
    engraving_label: 'Custom Engraving',
    engraving_max_chars: 20,
    engraving_required: false,
    gift_message_label: 'Gift Message',
    gift_message_max_chars: 150
  %}
  
  <button type="submit" name="add" class="product-form__submit">
    Add to Cart
  </button>
  
{%- endform -%}

### Step 4: Load JavaScript

Add to your `theme.liquid` before `</body>`:

```liquid
<script src="{{ 'cart-item-properties.js' | asset_url }}" defer></script>
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `product` | Object | required | The product object |
| `enabled` | Boolean | `true` | Enable/disable the entire snippet |
| `fields` | String | `'engraving'` | Comma-separated list of fields to show |
| `section_title` | String | `'Personalization'` | Title for the customization section |
| `show_preview` | Boolean | `true` | Show real-time preview of text |
| `preview_font` | String | `'inherit'` | Font family for preview text |

### Field-Specific Parameters

For each field type, prefix with the field name:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `{field}_label` | String | Field name | Label text |
| `{field}_placeholder` | String | `''` | Placeholder text |
| `{field}_required` | Boolean | `false` | Make field required |
| `{field}_max_chars` | Number | `50` | Maximum characters allowed |
| `{field}_type` | String | `'text'` | Field type: text, textarea, select |
| `{field}_pattern` | String | `''` | Validation pattern: letters, numbers, alphanumeric |
| `{field}_options` | String | `''` | For select: comma-separated options |
| `{field}_price` | Number | `0` | Additional price in cents (display only) |

## Example Configurations

### Basic Engraving

```liquid
{% render 'cart-item-properties-customization',
  product: product,
  fields: 'engraving',
  engraving_label: 'Add Engraving',
  engraving_max_chars: 15,
  engraving_pattern: 'letters'
%}
```

### Multiple Customizations

```liquid
{% render 'cart-item-properties-customization',
  product: product,
  section_title: 'Make It Yours',
  fields: 'monogram,font_style,gift_wrap',
  monogram_label: 'Monogram (3 letters)',
  monogram_max_chars: 3,
  monogram_pattern: 'letters',
  monogram_required: true,
  font_style_label: 'Font Style',
  font_style_type: 'select',
  font_style_options: 'Script,Block,Modern,Classic',
  gift_wrap_label: 'Add Gift Wrapping (+$5)',
  gift_wrap_type: 'checkbox',
  gift_wrap_price: 500
%}
```

### Gift Message with Preview

```liquid
{% render 'cart-item-properties-customization',
  product: product,
  fields: 'gift_message',
  show_preview: true,
  gift_message_label: 'Gift Message',
  gift_message_type: 'textarea',
  gift_message_max_chars: 200,
  gift_message_placeholder: 'Enter your heartfelt message here...'
%}
```

### Conditional by Product Tag

```liquid
{% if product.tags contains 'customizable' %}
  {% render 'cart-item-properties-customization',
    product: product,
    fields: 'custom_text',
    custom_text_required: true
  %}
{% endif %}
```

## Displaying in Cart

The properties automatically appear in your cart. For custom styling, you can access them in your cart template:

```liquid
{% for property in item.properties %}
  {% unless property.last == blank or property.first contains '_' %}
    <div class="cart-item__property">
      <span class="property-name">{{ property.first }}:</span>
      <span class="property-value">{{ property.last }}</span>
    </div>
  {% endunless %}
{% endfor %}
```

## Troubleshooting

### Properties not showing in cart
- Ensure the input `name` follows the format `properties[Property Name]`
- Check that the form is submitting correctly
- Verify AJAX cart code captures form data

### Validation not working
- Ensure JavaScript file is loaded
- Check browser console for errors
- Verify `defer` attribute on script tag

### Preview not updating
- JavaScript must be loaded after DOM
- Check for conflicting event handlers

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## Changelog

### v1.0.0
- Initial release
- Text, textarea, select, and checkbox field types
- Character counting and validation
- Real-time preview
- AJAX cart support
```

---
