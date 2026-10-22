# Sahil Electricals website

A responsive, single-page website for Sahil Electricals — AC Installation & Services. It uses plain HTML, CSS and JavaScript and is designed for static hosting on GitHub Pages.

## Features

- Responsive navigation and an automatically sliding three-banner carousel with overlay arrows, dot navigation, swipe support, and reduced-motion handling.
- Spacious white logo header with a separate dark teal navigation strip and responsive mobile menu.
- A full-width interactive service search directly below navigation, followed by the hero carousel and photo-led AC, electrical and appliance category cards.
- Service visit promotion and six concise business-benefit items using confirmed business information.
- The first banner's visible “BOOK A SERVICE” artwork button has a transparent, accessible HTML link aligned over it. It opens WhatsApp directly with an English booking message.
- WhatsApp booking links for each requested service include that service's name, plus location and preferred-visit-time prompts.
- Phone links for both business numbers, free-visiting information, the qualified 30-minute arrival target, service-area details, SEO metadata and LocalBusiness structured data.
- No customer reviews, ratings, awards, certifications, fixed prices or business history have been added.

## Files

- `index.html` — page content, metadata and structured business information.
- `styles.css` — colors, layout, responsive styles and reduced-motion rules.
- `script.js` — service-card rendering, live service search, encoded WhatsApp links, navigation and carousel behavior.
- `assets/logo.svg`, `assets/favicon.svg` — reusable Sahil Electricals house-and-plug mark.
- `assets/images/` — the three supplied Sahil Electricals banners, plus lightweight department photographs used on the service cards.

## Update the site

### Text and services

Edit the relevant section in `index.html`. The complete service names and descriptions are held in the `services` object near the top of `script.js`; each entry creates a service card and its WhatsApp booking link.

### Replace the banners

Put the replacement files in `assets/images/`, then update the three `<img>` paths in the carousel in `index.html`. Keep all three images at similar wide banner proportions (about 3:1) so the artwork and the first banner's button overlay continue to align. If the first banner's button moves, adjust `.banner-book-overlay` in `styles.css` at desktop and mobile breakpoints. The overlay opens WhatsApp; it does not make the rest of the banner a link.

### Logo and service artwork

Edit `assets/logo.svg` to update the reusable logo and `assets/favicon.svg` for the browser icon. The service category icons are inline SVGs in `index.html`; the repeated service-card icon is in `script.js`.

### Department photos

The AC and home-appliance department images are crops from the supplied Sahil Electricals banners. The electrical department image is a locally stored, optimized crop from Pixabay's photo hosted on Pexels: [Electrician Fixing an Opened Switchboard](https://www.pexels.com/photo/electrician-fixing-an-opened-switchboard-257736/). Pexels marks the photo free to use; its [license](https://www.pexels.com/license/) allows downloading, editing and use without required attribution. Each service card uses its department's representative photo, with lazy loading below the fold.

### WhatsApp booking links

The business number is configured as `919971602909` in `script.js`. General booking uses an English message; service-card messages are generated from each service's name and encoded with JavaScript's `encodeURIComponent`. Call links are ordinary `tel:` links in `index.html`. Update all of these values together if the contact details change.

## Authentication and request flow

This repository contains a public static website and currently has no application authentication system. There are no login or registration screens, user accounts, API endpoints, server-side session components, credential forms, or authentication libraries in the site.

The request flow is:

1. A visitor's browser downloads `index.html`, `styles.css`, `script.js`, and the local assets from the static host.
2. `script.js` renders service cards and builds a WhatsApp URL with the business number and URL-encoded English message. A service-specific booking message includes the chosen service, location and preferred-time prompts.
3. The visitor's browser opens `https://wa.me/919971602909?...`. The visitor can review and send the message through WhatsApp. This site does not send or confirm the message itself.

The site stores no passwords, access tokens, API keys, cookies, or session credentials. It does not collect customer form data. The WhatsApp link contains only the prefilled booking text and the business's public WhatsApp number. WhatsApp handles any account sign-in and credentials under its own service; those credentials do not pass through this repository. Repository publishing access is separate and is managed by GitHub for the site maintainer.

## Preview locally

Open `index.html` in a browser, or run a local static server from this directory, for example:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. No build step or package installation is required.

## GitHub Pages

The site is static and can be hosted at no cost by enabling GitHub Pages for the repository's `main` branch and `/ (root)` folder in **Settings → Pages**. Once enabled, GitHub Pages publishes `index.html` and its assets. Future updates can be made by editing the files on GitHub or by committing and pushing changes from a local Git checkout.

## Image sources and licensing

All three homepage banners were supplied by the business in this conversation and are stored locally in `assets/images/`. The logo mark is a purpose-made SVG recreation based on the supplied banner branding. The electrical department photo is from Pexels/Pixabay under the free Pexels license; source and license links are listed above. The AC and appliance department photos are derived from the supplied business banners. Google Fonts (DM Sans and Manrope) are requested from Google Fonts; system sans-serif fallbacks are provided if the font service is unavailable.

## Business details

Sahil Electricals · Shop C-62/1, Jaat Chowpal Road, Humayunpur, Safdarjung Enclave, New Delhi – 110029. Primary phone and WhatsApp: +91 9971602909. Additional phone: +91 8700646639. Free visiting for every customer. Prices on request. The 30-minute arrival message is a target subject to service availability, location and traffic; it is not a guarantee.
