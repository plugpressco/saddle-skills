---
name: saddle-content
description: Write and manage WordPress content through Saddle — posts, pages, custom content types such as products, events or docs, media, categories and tags, and navigation menus. Use when the user asks to draft, publish, edit, find, organise or remove content, upload images, or change a menu on a site connected through Saddle.
license: MIT-0
metadata:
  author: PlugPress
  homepage: https://saddle.to
---

# Content with Saddle

Follow `saddle-safe-changes` for every write.

## Find

- `saddle-search-content` searches posts, pages and custom types by keyword.
- `saddle-list-posts`, `saddle-list-pages` filter by status, author,
  category, parent. `saddle-get-post` / `saddle-get-page` return one item in
  full, custom fields included.

## Custom content types

`saddle-list-post-types` lists what the site has (products, events, docs…),
each type's taxonomies, and which tools reach it. Custom types use the **post
tools with `post_type`**: `saddle-list-posts`, `saddle-get-post`,
`saddle-create-post`, `saddle-update-post`, `saddle-delete-post` with
`post_type: "product"`, for example. Their own categories go in `terms`:
`{"product_cat": [12]}`. Without `post_type` the tools mean ordinary posts.

## Write

- `saddle-create-post` / `saddle-create-page` save a **draft** unless you pass
  `status: "publish"` and the user asked for it. On a drafts-only site,
  publishing asks for confirmation.
- `saddle-update-post` / `saddle-update-page` change only the fields you pass.
  WordPress keeps a revision.
- Page layouts: use the block tools (see `saddle-build-page`) rather than a raw
  `content` string. Pages built with Divi 5 use the `saddle-divi-*` tools.
- Custom fields go in `meta`; protected keys (leading underscore) are refused
  unless the owning plugin allows them, and come back in `meta_denied`.

## Media

- `saddle-upload-media` takes a public URL or the file itself (base64), with
  alt text. `saddle-update-media` fixes title, alt and caption.
- `saddle-unsplash-search` + `saddle-unsplash-import` when the owner has set an
  Unsplash key.

## Organise

`saddle-list-categories`, `saddle-list-tags`, `saddle-create-category`,
`saddle-create-tag`; assign with `category_ids` / `tags` on a post.

## Menus (classic themes; block themes use the navigation block)

1. `saddle-list-menus` shows the menus and which theme location each fills.
2. `saddle-get-menu` returns items in order with `id`, `parent`, `position`.
3. `saddle-add-menu-item` (`type`: custom with `url` + `title`, post with
   `object_id`, or term with `object_id`), `saddle-update-menu-item`,
   `saddle-move-menu-item` (carries nested items), `saddle-remove-menu-item`
   (preview first; nested items move up a level).
4. `saddle-set-menu-location` puts a menu in a theme location and reports the
   one it replaced.

## Remove

`saddle-delete-post` / `saddle-delete-page` move to the trash; the preview says
so. Only pass `force: true` when the user explicitly wants it gone for good —
that can't be undone.
