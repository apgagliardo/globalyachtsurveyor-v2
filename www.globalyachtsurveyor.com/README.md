# Global Yacht Surveyor — refined local preview

Ordinary HTML, one shared stylesheet, local assets/fonts, and a small site.js file for scroll effects and menu behavior. No framework, package installation or build step is required. Pages and native menus remain usable without JavaScript; reduced-motion preferences disable animation and parallax.

From this directory: `python3 -m http.server 8765 --bind 127.0.0.1`
Open http://127.0.0.1:8765/ . Edit the relevant HTML to change text. Shared navigation/contact markup is repeated across pages and should be kept consistent. Styling is in styles.css and progressive enhancement in site.js. Poppins licensing is included in assets/Poppins-OFL.txt.

This folder is the complete static build output. No publishing configuration or upstream Git history is included. See the accompanying cleanup-report.md for the removal audit and publication review items.

## Strategy notes

The accompanying `strategic-direction.md` (outside the public serving root) records the consulting positioning and proposed ongoing owner/cruising support concept. It is internal planning material. Do not publish or finalize names, pricing, unlimited access, subscription terms or page design during cleanup.
