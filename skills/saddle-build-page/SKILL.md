---
name: saddle-build-page
description: Build, rebuild or restyle a WordPress page through Saddle with real, editable blocks (block editor) or Divi 5 modules, in the site's own design system, and prove it is right before calling it done. Use when the user asks for a new page, a landing page, a section, or a redesign on a site connected through Saddle.
license: GPL-2.0-or-later
metadata:
  author: PlugPress
  homepage: https://saddle.to
---

# Building a page with Saddle

Each site serves its own page-building playbook, written for that site's theme,
builder and design system. **Follow the site's playbook; this skill gets you to
it and holds you to the finish.**

## 1. Orient

1. Follow `saddle-wordpress` step 2 if you haven't this session.
2. Which builder? `saddle-get-page` shows it. Divi 5 pages use the
   `saddle-divi-*` tools and `saddle-divi-context-bundle`; block editor pages
   use `saddle-context-bundle` and the block tools. Pages made with another
   page builder can't be rebuilt safely — say so.
3. Get the site's playbook with `saddle-get-skill`: `name: "build-page"` on a
   block editor site, `name: "divi-build-page"` on Divi 5.
   `saddle-list-skills` shows every playbook the site offers.

## 2. Plan

- Start from what the site already has: a theme pattern
  (`saddle-list-block-patterns`), the owner's saved patterns
  (`saddle-list-saved-patterns`) or a recipe (`saddle-list-section-recipes`,
  `saddle-get-section-recipe`). A pattern arrives already styled for this site.
- Use the design system's colour and size **slugs**, never raw hex or pixel
  values, so the page follows the owner's palette if it changes.
- Read `saddle-get-block-schema` before using a block type for the first time.

## 3. Build

- New page: `saddle-create-page` (a draft unless the user says publish), then
  `saddle-set-blocks` with the nodes. Existing page: `saddle-get-blocks`, then
  small edits with `saddle-add-block`, `saddle-edit-block`, `saddle-move-block`.
- Never dump raw HTML into one block to fake a layout.
- Addresses shift after structural edits: re-read with `saddle-get-blocks`
  before addressing another node.
- Follow `saddle-safe-changes` for previews, rehearsal and refusals.

## 4. Prove it

1. `saddle-verify-page`. Work the findings down with `saddle-fix-page`.
2. `saddle-get-preview-url` and look at the page (a screenshot if your app can
   open it). The score is server-side only; it can't see pixels.
3. Tell the user the page link, the score, and anything you couldn't check.
4. If the page's layout is worth reusing, offer `saddle-save-pattern`.
