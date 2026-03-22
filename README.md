# Shopify Liquid Snippets

**Free, copy-paste Shopify Liquid snippets and JavaScript scripts** — battle-tested solutions for the most common Shopify development problems. No apps required.

> Built and maintained by [Aumlytics](https://aumlytics.com) — analytics & Shopify development specialists.

---

## Why This Repo Exists

Every week, hundreds of Shopify merchants and developers ask the same questions on r/shopify and r/shopifydev:

- *"How do I track GA4 purchases after checkout.liquid was deprecated?"*
- *"How do I show a free shipping progress bar in my cart?"*
- *"How do I display variant-specific metafields without a page refresh?"*

These snippets are the answers — production-ready, well-commented, and updated for **Shopify 2025+**.

---

## Snippets

| # | Snippet | What It Solves | Complexity |
|---|---------|----------------|------------|
| 01 | [GA4 Purchase Event — Custom Pixel](snippets/ga4-custom-pixel-purchase/) | Track purchases after `checkout.liquid` deprecation | ⭐⭐ |
| 02 | [GTM via Custom Pixel + dataLayer Bridge](snippets/gtm-custom-pixel-datalayer/) | Load GTM inside Shopify's sandboxed pixel environment | ⭐⭐⭐ |
| 03 | [Variant Metafield Display (Dynamic)](snippets/variant-metafield-dynamic/) | Update metafield content on variant switch without page reload | ⭐⭐ |
| 04 | [AJAX Cart Drawer + Free Shipping Bar](snippets/ajax-cart-free-shipping-bar/) | Slide-out cart with animated progress bar toward free shipping | ⭐⭐⭐ |
| 05 | [Sale Badge + Discount % on Product Cards](snippets/sale-badge-discount-percent/) | Show "Save 30%" badges calculated from compare_at_price | ⭐ |
| 06 | [Sticky Add-to-Cart Bar](snippets/sticky-add-to-cart/) | Fixed ATC bar that appears when the main button scrolls out of view | ⭐⭐ |
| 07 | [Color Swatches + Variant Image Swap](snippets/color-swatches-variant-swap/) | Native color swatches with live image swap on hover/click | ⭐⭐ |
| 08 | [Back-in-Stock Email Capture](snippets/back-in-stock-email/) | "Notify me" form for sold-out products — no app needed | ⭐ |
| 09 | [Recently Viewed Products](snippets/recently-viewed-products/) | localStorage-based recently viewed carousel | ⭐⭐ |
| 10 | [Countdown Timer (Metafield-driven)](snippets/countdown-timer/) | Sale/shipping cutoff countdown from a product metafield | ⭐⭐ |
| 11 | [JSON-LD Schema (Product + Breadcrumb)](snippets/json-ld-schema-product/) | Rich results for Google — product, breadcrumb, organization | ⭐ |
| 12 | [Responsive Image with srcset](snippets/responsive-image-srcset/) | Correct srcset/sizes for Shopify images — kills LCP issues | ⭐ |
| 13 | [Infinite Scroll Collection Pages](snippets/infinite-scroll-collection/) | Load more products automatically as users scroll — no pagination clicks | ⭐⭐ |

> New snippets are added automatically every week via GitHub Actions + Claude AI, researched from r/shopify and r/shopifydev.

---

## How to Use

1. Browse to the snippet folder you need
2. Read the `README.md` inside for setup instructions
3. Copy the `.liquid` file into your theme's `snippets/` folder
4. `{% render 'snippet-name' %}` where needed
5. Copy any `.js` file into `assets/` and reference it with `{{ 'snippet-name.js' | asset_url | script_tag }}`

---

## Compatibility

- Shopify Online Store 2.0 themes (Dawn, Sense, Refresh, Crave, Craft, Horizon)
- Shopify Liquid (latest)
- Checkout Extensibility (post-August 2024)
- Shopify Markets / multi-currency
- Legacy themes (Debut, Brooklyn) may need minor adjustments

---

## Contributing

Found a bug? Have a snippet that solves a common problem? PRs welcome.

1. Fork the repo
2. Create a folder in `snippets/your-snippet-name/`
3. Add `README.md`, your `.liquid` file, and any `.js` files
4. Open a PR with a description of what it solves

---

## Need Custom Analytics or Shopify Development?

These snippets scratch the surface. If you need a full GA4 + GTM implementation, custom Shopify app development, Amazon SP-API integrations, or AI agent automation for your store — **[book a free consultation with Aumlytics](https://aumlytics.com/contact)**.

We're practitioners who implement these solutions daily for e-commerce brands.

---

## License

MIT — free to use in any project, commercial or personal.

*Maintained by [Aumlytics](https://aumlytics.com) · [@aumlytics on X](https://x.com/aumlytics)*
