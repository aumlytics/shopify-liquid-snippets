# Product Image Before/After Comparison Slider

An interactive, accessible image comparison slider for Shopify stores that lets customers compare two product images side-by-side using a draggable divider.

## What It Solves

- **Transformation Showcases**: Before/after product applications (skincare, cleaning products, etc.)
- **Color Variations**: Compare two product colors or finishes
- **Product Effects**: Show product impact (e.g., filter effects, treatments)
- **Version Comparisons**: Compare old vs. new product versions
- **Installation Views**: Show installed vs. uninstalled states

## Features

- ✅ Touch and mouse drag support
- ✅ Keyboard accessible (arrow keys)
- ✅ Screen reader friendly with ARIA labels
- ✅ Responsive design
- ✅ No external dependencies
- ✅ Customizable labels and styling
- ✅ Works with Shopify OS 2.0 themes
- ✅ Lazy loading support
- ✅ Smooth animations
- ✅ RTL language support

## Installation

### Step 1: Create the Snippet File

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code**
3. Under **Snippets**, click **Add a new snippet**
4. Name it `product-image-before-after-slider`
5. Paste the contents of `product-image-before-after-slider.liquid`
6. Click **Save**

### Step 2: Add the JavaScript

**Option A: Inline (Recommended)**
The JavaScript is already included inline in the liquid snippet. No additional setup needed.

**Option B: External File**
1. Under **Assets**, click **Add a new asset**
2. Upload `snippet.js` as `before-after-slider.js`
3. In the liquid file, uncomment the external script line and comment out the inline script

### Step 3: Include in Your Theme

Add the snippet wherever you want the slider to appear:

```liquid
{% render 'product-image-before-after-slider',
  before_image: product.images[0],
  after_image: product.images[1]
%}

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `before_image` | Image Object | required | The "before" image (left side) |
| `after_image` | Image Object | required | The "after" image (right side) |
| `before_image_url` | String | null | Alternative: direct URL for before image |
| `after_image_url` | String | null | Alternative: direct URL for after image |
| `before_label` | String | "Before" | Label shown on the before side |
| `after_label` | String | "After" | Label shown on the after side |
| `initial_position` | Number | 50 | Starting position of slider (0-100) |
| `slider_color` | String | "#ffffff" | Color of the slider handle and line |
| `slider_width` | Number | 4 | Width of the slider line in pixels |
| `handle_size` | Number | 44 | Size of the drag handle in pixels |
| `show_labels` | Boolean | true | Whether to show before/after labels |
| `labels_position` | String | "bottom" | Label position: "top", "bottom", or "middle" |
| `aspect_ratio` | String | "auto" | Aspect ratio: "auto", "1/1", "4/3", "16/9", "3/4" |
| `max_width` | String | "100%" | Maximum width of the slider container |
| `border_radius` | String | "0px" | Border radius of the container |
| `lazy_load` | Boolean | true | Enable lazy loading for images |
| `unique_id` | String | auto-generated | Unique identifier for multiple sliders |

## Usage Examples

### Basic Usage

```liquid
{% render 'product-image-before-after-slider',
  before_image: product.images[0],
  after_image: product.images[1]
%}
```

### With Custom Labels

```liquid
{% render 'product-image-before-after-slider',
  before_image: product.images[0],
  after_image: product.images[1],
  before_label: "Without Filter",
  after_label: "With Filter",
  labels_position: "top"
%}
```

### Using Direct URLs

```liquid
{% render 'product-image-before-after-slider',
  before_image_url: "https://cdn.shopify.com/your-before-image.jpg",
  after_image_url: "https://cdn.shopify.com/your-after-image.jpg"
%}
```

### Styled Container

```liquid
{% render 'product-image-before-after-slider',
  before_image: product.images[0],
  after_image: product.images[1],
  aspect_ratio: "16/9",
  max_width: "800px",
  border_radius: "12px",
  slider_color: "#ff6b6b",
  initial_position: 30
%}
```

### In a Product Section

```liquid
{% if product.images.size >= 2 %}
  <div class="product-comparison">
    <h3>See the Difference</h3>
    {% render 'product-image-before-after-slider',
      before_image: product.images[0],
      after_image: product.images[1],
      before_label: product.metafields.custom.before_label | default: "Before",
      after_label: product.metafields.custom.after_label | default: "After"
    %}
  </div>
{% endif %}
```

### Multiple Sliders on Same Page

```liquid
{% render 'product-image-before-after-slider',
  before_image: product.images[0],
  after_image: product.images[1],
  unique_id: "slider-1"
%}

{% render 'product-image-before-after-slider',
  before_image: product.images[2],
  after_image: product.images[3],
  unique_id: "slider-2"
%}
```

### Using Product Metafields

First, create metafields for before/after images in Shopify Admin, then:

```liquid
{% if product.metafields.comparison.before_image and product.metafields.comparison.after_image %}
  {% render 'product-image-before-after-slider',
    before_image: product.metafields.comparison.before_image.value,
    after_image: product.metafields.comparison.after_image.value,
    before_label: product.metafields.comparison.before_label | default: "Before",
    after_label: product.metafields.comparison.after_label | default: "After"
  %}
{% endif %}
```

## Accessibility

This component follows WCAG 2.1 guidelines:

- **Keyboard Navigation**: Use Left/Right arrow keys to move the slider
- **Screen Readers**: Proper ARIA labels and roles
- **Focus Indicators**: Visible focus states for keyboard users
- **Touch Support**: Works on all touch devices
- **Reduced Motion**: Respects `prefers-reduced-motion` user preference

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari (latest)
- Android Chrome (latest)

## Troubleshooting

### Images not displaying
- Ensure both images are valid Shopify image objects or valid URLs
- Check that image URLs are accessible

### Slider not dragging
- Verify JavaScript is loaded (check browser console for errors)
- Ensure no CSS conflicts with `pointer-events`

### Multiple sliders interfering
- Use unique `unique_id` parameters for each slider instance

### Performance issues
- Enable `lazy_load: true` (default)
- Use appropriately sized images (Shopify's image_url filter handles this)

## Customization

### Custom CSS

Override styles by targeting the component's scoped classes:

```css
.ba-slider__handle {
  /* Custom handle styles */
}

.ba-slider__label {
  /* Custom label styles */
}
```

### Theme Integration

For Dawn/Horizon themes, add to a custom section:

```liquid
{% schema %}
{
  "name": "Image Comparison",
  "settings": [
    {
      "type": "image_picker",
      "id": "before_image",
      "label": "Before Image"
    },
    {
      "type": "image_picker",
      "id": "after_image", 
      "label": "After Image"
    }
  ]
}
{% endschema %}

{% render 'product-image-before-after-slider',
  before_image: section.settings.before_image,
  after_image: section.settings.after_image
%}
```

## License

MIT License - Free for commercial and personal use.
```

---
