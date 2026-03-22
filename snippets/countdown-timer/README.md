# Countdown Timer (Metafield-driven)

A JavaScript countdown timer on the product page that reads the end date from a product metafield. Shows "Order in 2h 14m for same-day dispatch" or sale countdown — no hardcoded dates, no $15/month app.

## Setup

### Step 1 — Create the metafield definition
In Admin → **Settings → Custom data → Products**, add:
- Namespace: `custom`
- Key: `sale_end_date`
- Type: **Date and time**

### Step 2 — Set values
Edit any product and set a `sale_end_date` value.

### Step 3 — Add the snippet
1. Copy `countdown-timer.liquid` to `snippets/`
2. In `sections/main-product.liquid`:
   ```liquid
   {% render 'countdown-timer', product: product %}
   ```

## Behaviour

- Hides automatically when the timer reaches zero
- Shows nothing if no `sale_end_date` metafield is set
- Updates every second via `setInterval`
