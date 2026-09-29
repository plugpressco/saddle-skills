---
name: saddle-site-care
description: Look after a WordPress site through Saddle — plugin and theme updates through WordPress's own updater, Site Health, activating plugins and themes, site settings, cache, and block-theme templates, header, footer and patterns. Use when the user asks to update plugins, check the site's health, change a setting, or edit a template, header or footer on a site connected through Saddle.
license: MIT-0
metadata:
  author: PlugPress
  homepage: https://saddle.to
---

# Site care with Saddle

Most of these tools need the "Managing the site" access level. Follow
`saddle-safe-changes` for every write.

## Health and updates

1. `saddle-get-site-health` runs WordPress's Site Health checks and returns
   each one as good, recommended or critical. Checks that need a live HTTP
   request (REST availability, loopback) are listed but not run.
2. `saddle-list-updates` lists the plugin and theme updates WordPress is
   already offering, and why any of them is blocked.
3. `saddle-update-plugin` / `saddle-update-theme` (up to 10 at a time): the
   first call previews every item; after the owner confirms, WordPress's own
   updater runs in the background, keeps a backup, and restores an active
   plugin that causes a fatal error. Call `saddle-list-updates` again to see
   the result.
4. `saddle-set-auto-update` turns WordPress's own auto-updates on or off for
   one plugin or theme.

Saddle never installs or deletes a plugin, never updates WordPress itself, and
updates can't be undone once applied — say so before confirming.

## Plugins, themes, settings

- `saddle-list-plugins`, `saddle-activate-plugin`,
  `saddle-deactivate-plugin`; `saddle-list-themes`, `saddle-activate-theme`.
- `saddle-list-options` / `saddle-get-option` / `saddle-update-option` for
  the settings Saddle allows: title, tagline, time and date, reading (front
  page, posts per page, search visibility), discussion defaults and
  permalinks.
  The site address, security keys, roles and admin email are never writable.
- `saddle-flush-cache` clears the object cache.

## Templates, header and footer (block themes)

1. `saddle-list-templates` lists templates and parts (header, footer…) and
   whether each is still the theme's original.
2. `saddle-get-template` returns one as addressable nodes.
3. `saddle-set-template` replaces its blocks. Overwriting changes every page
   that uses it, so the first call previews the lines that change. Saved in the
   database; the theme's files are never touched, and Appearance → Editor can
   reset it to the theme's version.
4. `saddle-create-template-part` adds a new part; `saddle-save-pattern` saves a
   section of a page as a reusable pattern.

Classic themes have no block templates; their header and footer live in PHP
files, which Saddle does not edit. Menus are in `saddle-content`.
