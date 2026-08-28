# Product

## Purpose

Replace Xiaohongshu's explore feed with a calm search-first overlay so the user can enter with intent instead of consuming recommendations.

## Required Behavior

- Show the focus overlay on `/explore`, `/explore/`, and `/explore?...`.
- Do not show the overlay on search-result, profile, or unrelated routes.
- Search trims the query and navigates to Xiaohongshu's native search-result route.
- Empty searches do nothing.
- The top-right avatar discovers the signed-in profile from the page and links to that account's favorites-note tab.
- The original page remains loaded behind the overlay.

## Product Boundaries

- Do not block network requests or remove the underlying page.
- Do not scrape or store user content.
- Do not modify account state.
- Do not turn the extension into a general Xiaohongshu redesign without explicit user approval.

## Acceptance

Automated checks must pass, and visible changes require manual verification in Chrome on an explore route, search-result route, and profile route.
