---
name: saddle-wordpress
description: Work on a WordPress site through Saddle, the self-hosted WordPress MCP server. Use for any request about a WordPress site that has Saddle connected — reading or editing posts, pages, products and other content, building or fixing pages, menus, templates, SEO fields, media, plugin and theme updates, site health, or undoing a change. Covers the connection check, how access levels, previews and rehearsal work, and which Saddle skill to follow next.
license: MIT-0
metadata:
  author: PlugPress
  homepage: https://saddle.to
---

# Working on WordPress with Saddle

Saddle is a WordPress plugin that turns the owner's own site into an MCP
server. Nothing goes through a third party: you talk to the site directly, and
the site decides what you may do. Every destructive step shows a preview and
waits for a confirmation. Follow this protocol so the owner can trust what you
do on a live site.

## 1. Find the connection

Saddle's tools are named `saddle-<action>`, for example `saddle-get-site-info`.
Your client may prefix them with the server's name (in Claude Code:
`mcp__saddle-mysite__saddle-get-site-info`). **Each connected server is one
site.** If several are connected, pick the one whose name or address matches
the site the user means, and ask when it is ambiguous.

- No `saddle-*` tools at all: Saddle isn't connected to this app. Follow the
  `saddle-connect` skill.
- Tools exist but fail with 401: the sign-in key was revoked or the host strips
  the Authorization header. Call `saddle-self-check` if it answers; otherwise
  send the user to Saddle → Apps in wp-admin.

## 2. Orient once per session

1. Read the site's instructions. Most apps receive them automatically when they
   connect; if you did not, call `saddle-get-instructions`. They say what this
   connection may do, the site's rules, and the owner's own instructions — the
   owner's instructions win over this skill.
2. Call `saddle-get-site-info` for the name, address and WordPress version.
3. If the task involves design or pages, call `saddle-context-bundle` once. It
   returns the design system, block types, patterns, templates and recipes in
   one call. On a Divi 5 site, `saddle-divi-context-bundle` is the equivalent.
4. Call `saddle-recall` with a `query` of a few words about the task: past
   sessions may have left facts and preferences for this site.

Do not call read tools just to test the connection; step 1 and 2 are enough.

## 3. Know the controls you are working under

- **Access level.** Just reading, Reading & writing, or Managing the site —
  set by the owner in Saddle → Permissions. Tools above the level are not
  listed; the instructions say how many are withheld. A refused call names the
  control that refused it.
- **Never retry a refusal in a loop.** Tell the user which control to check:
  Settings for pause, Permissions for the level, rehearsal and per-tool
  switches.
- **Previews.** A tool that deletes or overwrites answers the first call with
  `requires_confirmation`, a `preview` and a `confirm_token`. That is not an
  error. Show the user the preview in plain words and call again with the same
  arguments plus `confirm_token` only after they agree. Tokens are single-use,
  bound to those exact arguments, and expire in 15 minutes.
- **Rehearsal.** When the owner has turned rehearsal on, write tools answer
  with `rehearsal: true` and what they would have done, and nothing is saved.
  Tell the user what you would change; do not retry.
- **Drafts-only.** New posts land as drafts; publishing an existing one asks
  for confirmation.

## 4. Pick the skill for the job

| The user wants to… | Follow |
|---|---|
| connect Saddle to this app, or fix a connection | `saddle-connect` |
| set Saddle up for their site the first time | `saddle-site-setup` |
| change anything (every write) | `saddle-safe-changes`, always |
| build, rebuild or restyle a page | `saddle-build-page` |
| fix what a page check reported | `saddle-fix-page` |
| write or edit posts, pages, products, media, categories, menus | `saddle-content` |
| updates, site health, plugins, themes, templates, settings | `saddle-site-care` |
| SEO titles, descriptions, robots, schema | `saddle-seo` |

## 5. Finish honestly

A write returning success is not proof the page is right. Check it
(`saddle-verify-page`, `saddle-get-preview-url`) before you say it is done,
and tell the user anything you could not verify.

When you learn something durable about the site — where the pricing page is,
how the owner likes headings — save it with `saddle-remember` so the next
session starts informed. Save conclusions, not the conversation.
