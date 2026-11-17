# STUDIO 01

A demo clothing store built with plain HTML, CSS and JavaScript. No build step and no dependencies.

## Pages
- `index.html`: home, collection tiles, product grid, wishlist, entrance gate
- `collection.html?c=Men|Women|Accessories|All`: one page per collection, with filters and sorting
- `collection.html?q=word`: search results
- `product.html?id=1..8`: one page per product, with colour and size, size guide, add to bag and related products
- `checkout.html`: demo checkout (no payment is taken, nothing is sent anywhere)
- `confirmation.html`: order confirmation shown after checkout, with a printable receipt
- `info.html`: about, shipping and returns, contact, privacy, terms
- `404.html`: page not found (GitHub Pages serves this automatically for missing pages)

## Shared files
- `data.js`: the product catalogue, collection details and search. Edit products here.
- `styles.css`: design tokens, header, footer and buttons
- `shop.css`: styles for collection and product pages
- `premium.css`: the premium design layer (type, spacing, dark footer, buttons). Loaded last on every page.
- `bag.js`: the bag drawer on collection and product pages (same storage as the home page)
- `nav.js`: mobile menu and live search for every page except the home page

## Run it
Open `index.html` in a browser. To replay the entrance gate, open `index.html?gate=1`.

## Before a real launch
Replace the placeholders on `info.html` (brand story, returns, contact, privacy, terms) and connect a real payment provider in `checkout.html`.
