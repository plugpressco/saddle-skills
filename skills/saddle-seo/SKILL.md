---
name: saddle-seo
description: Read and edit SEO fields on a WordPress site through Saddle — SEO title, meta description, robots and schema in Yoast SEO, Rank Math or AIOSEO — and fix the SEO and accessibility findings Saddle's page check reports. Use when the user asks about SEO titles, descriptions, indexing, schema, or search appearance on a site connected through Saddle.
license: GPL-2.0-or-later
metadata:
  author: PlugPress
  homepage: https://saddle.to
---

# SEO with Saddle

## 1. Which SEO plugin?

Call the check tool for each that exists: `saddle-yoast-check-setup`,
`saddle-rank-math-check-setup`, `saddle-aioseo-check-setup`. Tools only exist
for plugins the site runs. Then get the site's own playbook:
`saddle-get-skill` with `name` `yoast-seo`, `rank-math-seo` or `aioseo-seo` —
it covers that plugin's traps (robots defaults, length targets).

## 2. Read, then edit

- Posts and pages: `saddle-<plugin>-get-post-seo`, then
  `saddle-<plugin>-edit-post-seo` with only the fields that change.
- Categories and tags: `saddle-<plugin>-get-term-seo` /
  `saddle-<plugin>-edit-term-seo` (Yoast and Rank Math).
- Schema type: `saddle-yoast-get-post-schema` / `saddle-yoast-edit-post-schema`.
- Aim for titles around 50–60 characters and descriptions around 140–160,
  written for the searcher, with the page's main topic early.

Follow `saddle-safe-changes`; every edit is logged and can be undone.

## 3. Page-level checks

`saddle-verify-page` also reports, as warnings: a title long enough to be cut
off in search results, a published post with no excerpt, link text like
"click here", links and buttons a screen reader can't name, missing alt text
and skipped heading levels. Fix the ones the owner agrees with.

## 4. When the site runs Saddle Rank

Saddle Rank adds `saddle-rank-*` tools for AI visibility (how AI assistants
see and cite the site). Use them when present; the check tools above still
cover the classic SEO fields.
