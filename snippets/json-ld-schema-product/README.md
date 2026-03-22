# JSON-LD Schema — Product + Breadcrumb + Organization

Injects valid structured data into product pages so Google can generate rich results (star ratings, price, availability in SERPs). Also adds BreadcrumbList and Organization schema sitewide.

## What It Generates

- **Product schema** — name, description, image, SKU, brand, price, availability, aggregate rating
- **BreadcrumbList** — Home → Collection → Product
- **Organization** — on all pages (name, URL, logo, social links)

## Setup

1. Copy `schema-product.liquid` to `snippets/`
2. In `sections/main-product.liquid`, inside the `<head>` or just before `</body>`:
   ```liquid
   {% render 'schema-product', product: product, collection: collection %}
   ```
3. For Organization schema on all pages, add to `layout/theme.liquid`:
   ```liquid
   {% render 'schema-product' %}
   ```

## Validation

Test with [Google Rich Results Test](https://search.google.com/test/rich-results) after deploying.
