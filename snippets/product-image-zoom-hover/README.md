# Product Image Zoom on Hover

A production-ready Shopify snippet that enables smooth zoom functionality on product images. Customers can hover (desktop) or touch (mobile) to zoom into product details without leaving the page.

## What It Solves

- **Purchase Hesitation**: Customers often want to see product details (texture, stitching, material quality) before buying
- **User Experience**: Eliminates the need for opening images in new tabs or modals
- **Mobile Support**: Touch-friendly zoom that works seamlessly on all devices
- **Accessibility**: Full keyboard and screen reader support

## Features

- ✅ Smooth zoom on hover (desktop)
- ✅ Touch-and-drag zoom (mobile/tablet)
- ✅ Configurable zoom levels (1.5x to 4x)
- ✅ Works with Shopify OS 2.0 themes (Dawn, Horizon, Craft)
- ✅ No external dependencies
- ✅ Lazy loading support
- ✅ Full accessibility (WCAG 2.1 AA compliant)
- ✅ Respects `prefers-reduced-motion`
- ✅ Multiple instances per page supported

## Installation

### Step 1: Create the Snippet File

1. In your Shopify admin, go to **Online Store > Themes**
2. Click **Actions > Edit code**
3. Under **Snippets**, click **Add a new snippet**
4. Name it `product-image-zoom-hover`
5. Paste the contents of `product-image-zoom-hover.liquid`
6. Click **Save**

### Step 2: Include in Your Theme

Add the snippet to your product template or section where you want zoom functionality:

{% render 'product-image-zoom-hover',
  image: product.featured_image,
  zoom_level: 2.5,
  alt_text: product.title
%}

### Step 3: For Product Gallery (Multiple Images)

```liquid
{% for image in product.images %}
  {% render 'product-image-zoom-hover',
    image: image,
    zoom_level: 2.5,
    alt_text: image.alt | default: product.title,
    image_index: forloop.index
  %}
{% endfor %}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `image` | Image Object | **Required** | Shopify image object (e.g., `product.featured_image`) |
| `zoom_level` | Number | `2.5` | Zoom magnification (1.5 - 4.0 recommended) |
| `alt_text` | String | `"Product image"` | Accessible alt text for the image |
| `image_index` | Number | `1` | Unique index for multiple images (auto-increments) |
| `container_class` | String | `""` | Additional CSS classes for container |
| `enable_hint` | Boolean | `true` | Show "Hover to zoom" hint text |
| `hint_text` | String | `"Hover to zoom"` | Custom hint text |
| `mobile_hint_text` | String | `"Touch to zoom"` | Custom mobile hint text |
| `lazy_load` | Boolean | `true` | Enable lazy loading for images |
| `aspect_ratio` | String | `"natural"` | Aspect ratio: `"natural"`, `"square"`, `"portrait"`, `"landscape"` |
| `zoom_position` | String | `"cursor"` | Zoom follows: `"cursor"` or `"center"` |
| `border_radius` | String | `"0"` | CSS border-radius value |

## Usage Examples

### Basic Usage

```liquid
{% render 'product-image-zoom-hover', image: product.featured_image %}
```

### High Zoom for Detailed Products (Jewelry, Watches)

```liquid
{% render 'product-image-zoom-hover',
  image: product.featured_image,
  zoom_level: 4,
  alt_text: product.title | append: ' - detailed view',
  hint_text: 'Hover for detail'
%}
```

### Square Aspect Ratio (Instagram-style)

```liquid
{% render 'product-image-zoom-hover',
  image: product.featured_image,
  zoom_level: 2,
  aspect_ratio: 'square',
  border_radius: '8px'
%}
```

### Inside a Product Grid

```liquid
<div class="product-grid">
  {% for product in collection.products %}
    <div class="product-card">
      {% render 'product-image-zoom-hover',
        image: product.featured_image,
        zoom_level: 2,
        alt_text: product.title,
        container_class: 'product-card__image'
      %}
      <h3>{{ product.title }}</h3>
    </div>
  {% endfor %}
</div>
```

### Disable Hint for Clean Design

```liquid
{% render 'product-image-zoom-hover',
  image: product.featured_image,
  enable_hint: false
%}
```

### Custom Localized Hints

```liquid
{% render 'product-image-zoom-hover',
  image: product.featured_image,
  hint_text: 'Survoler pour zoomer',
  mobile_hint_text: 'Toucher pour zoomer'
%}
```

## Theme Integration Examples

### Dawn Theme (main-product.liquid)

Find the product media gallery section and replace the image rendering:

```liquid
{%- when 'image' -%}
  {% render 'product-image-zoom-hover',
    image: media,
    zoom_level: 2.5,
    alt_text: media.alt | default: product.title,
    aspect_ratio: section.settings.media_aspect_ratio
  %}
```

### Horizon Theme

```liquid
{%- for media in product.media -%}
  {%- if media.media_type == 'image' -%}
    {% render 'product-image-zoom-hover',
      image: media,
      zoom_level: 2.5,
      alt_text: media.alt,
      image_index: forloop.index
    %}
  {%- endif -%}
{%- endfor -%}
```

## Styling Customization

The snippet uses scoped CSS with `!important` flags to prevent theme conflicts. To customize, add CSS after the snippet:

```css
/* Custom styling */
.pz-container {
  --pz-hint-bg: #000000 !important;
  --pz-hint-color: #ffffff !important;
  --pz-transition-speed: 0.2s !important;
}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Chrome for Android 60+

## Troubleshooting

### Zoom not working?
1. Ensure the `image` parameter is a valid Shopify image object
2. Check browser console for JavaScript errors
3. Verify the snippet is properly closed (`{% render %}` syntax)

### Image appears stretched?
Set an explicit `aspect_ratio` parameter matching your product images.

### Zoom is too fast/slow?
The transition speed respects `prefers-reduced-motion`. For custom timing, adjust the CSS variable `--pz-transition-speed`.

### Multiple instances conflict?
Ensure each instance has a unique `image_index` parameter when rendering multiple zoom images.

## Accessibility Notes

- Full keyboard support (Tab to focus, Enter/Space to activate)
- Screen reader announcements for zoom state
- Respects `prefers-reduced-motion` system setting
- ARIA labels and roles properly implemented
- Focus visible indicators included

## Performance

- Images use native lazy loading
- No external dependencies (vanilla JS only)
- Efficient event delegation
- CSS transforms use GPU acceleration
- Debounced mouse tracking for smooth performance

## License

MIT License - Free for commercial and personal use.

---
