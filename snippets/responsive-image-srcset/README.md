# Responsive Image with srcset

A reusable Liquid snippet that outputs `<img>` tags with proper `loading="lazy"`, `srcset`, and `sizes` — using Shopify's `image_url` filter. Replaces the common `| img_url: '400x'` anti-pattern that serves oversized images on mobile and tanks Lighthouse scores.

## Setup

1. Copy `responsive-image.liquid` to `snippets/`
2. Replace any `<img>` tag in your theme:
   ```liquid
   {% render 'responsive-image',
     image: product.featured_image,
     sizes: '(min-width: 768px) 50vw, 100vw',
     alt: product.title,
     loading: 'lazy',
     class: 'product-image'
   %}
   ```

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `image` | Shopify image object | required |
| `sizes` | CSS sizes attribute | `100vw` |
| `alt` | Alt text | `image.alt` |
| `loading` | `lazy` or `eager` | `lazy` |
| `class` | CSS class(es) | `''` |
| `widths` | Array of widths | `360,540,720,900,1200` |

## LCP Impact

Set `loading: 'eager'` for your above-the-fold hero image to prevent LCP delay.
