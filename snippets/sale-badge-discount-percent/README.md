# Sale Badge + Discount Percentage

Displays a "SALE" badge with the exact percentage saved (e.g., "Save 32%") on product cards and product pages — calculated from `compare_at_price` vs `price` using Liquid math filters. No app required.

## Setup

1. Copy `sale-badge.liquid` to your theme's `snippets/` folder
2. In your product card template (e.g., `snippets/card-product.liquid`), add:
   ```liquid
   {% render 'sale-badge', product: card_product %}
   ```
3. Style the `.sale-badge` class in your theme CSS.

## Example Output

```html
<span class="sale-badge">Save 32%</span>
```

## CSS Starter

```css
.sale-badge {
  display: inline-block;
  background: #e53e3e;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```
