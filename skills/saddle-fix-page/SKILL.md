---
name: saddle-fix-page
description: Fix what Saddle's page check reports on a WordPress page — structural breaks, ignored styles, contrast, headings, alt text, link names — in the right order, until the page verifies clean. Use when saddle-verify-page or saddle-lint-page returned findings, or the user says a page looks broken.
license: MIT-0
metadata:
  author: PlugPress
  homepage: https://saddle.to
---

# Fixing a page with Saddle

1. **Get the site's repair playbook:** `saddle-get-skill` with
   `name: "fix-page"`. Follow it where it is more specific than this.
2. **Run the check:** `saddle-verify-page` with the page id. Every finding has
   an `address`, a `source`, a severity, and a fix hint.
3. **Fix in this order:**
   1. `structural` — the tree doesn't hold together (content that isn't
      blocks, a wrapper that closes before its children). These cap the grade
      at C. Rebuild the broken node with `saddle-remove-block` +
      `saddle-add-block`, or the page with `saddle-set-blocks`.
   2. `echo` — attributes saved but ignored by WordPress; the style never took
      effect. Rewrite them on a path the block supports (see
      `saddle-get-block-schema`).
   3. lint **errors** — objective defects: unreadable contrast, a link or
      button with no name.
   4. lint **warnings** — weigh against the design intent: heading order, alt
      text, vague link text, long title, missing excerpt.
4. **Re-read after every structural edit.** Addresses move. Call
   `saddle-get-blocks` again before the next fix, and fix one address at a
   time.
5. **Re-run `saddle-verify-page`** until errors are gone. Explain any warning
   you left on purpose.
6. **Look at it:** `saddle-get-preview-url`. A clean score is not a
   screenshot.

Follow `saddle-safe-changes` for every edit.
