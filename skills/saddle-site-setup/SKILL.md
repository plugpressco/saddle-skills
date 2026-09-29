---
name: saddle-site-setup
description: Set Saddle up for one WordPress site the first time — interview the owner once about the site, its audience, key pages, voice and rules, and store the answers in the site's own Saddle memory so every later session and every AI app starts informed. Use right after connecting Saddle, or when the user says the AI keeps forgetting how their site works.
license: GPL-2.0-or-later
metadata:
  author: PlugPress
  homepage: https://saddle.to
---

# Saddle site setup

Interview the owner once and save what matters in the site's own memory with
`saddle-remember`. That memory lives in their WordPress, not in this chat: any
app connected to the site can read it with `saddle-recall`, and the owner can
review, pin or delete every entry in Saddle → Memory.

Be friendly and brief. Ask in small batches. Skip anything already known.

## 1. Check the connection and what is already known

1. Call `saddle-get-site-info`. Confirm with the user that this is the site
   they mean.
2. Call `saddle-self-check`. If it lists problems, fix those first (see
   `saddle-connect`). Note the access level in force: at "Just reading" you
   can only read and remember.
3. Call `saddle-recall` with "site setup" and a second time with "rules".
   Summarise what is already stored and confirm or correct it instead of
   asking again.

## 2. Look before you ask

Gather facts the site can answer itself, so the interview is short:

- `saddle-list-pages` and `saddle-list-post-types`: the main pages and any
  custom content (products, events, docs).
- `saddle-context-bundle` on a block site, or `saddle-divi-context-bundle` on
  Divi 5: the colours, fonts and patterns the site already uses.
- `saddle-list-menus`: what the navigation links to.
- `saddle-list-plugins`: the SEO plugin, shop and forms in use.

## 3. Ask the owner

1. What the site is for and who it serves, in two sentences.
2. The pages that matter most: the money pages, and the ones never to touch.
3. Voice: formal or casual, sentence case or title case, words to avoid.
4. Rules for the AI: publish directly or leave drafts? Anything that always
   needs their approval?
5. Who to credit as author, and the default category for new posts.

## 4. Save what you learned

One `saddle-remember` call per durable fact, with a stable `key` so a later
session updates it instead of duplicating it. Use `type` "fact", "preference"
or "decision". Keep each entry short and factual.

Suggested keys: `site-purpose`, `audience`, `key-pages`, `do-not-touch`,
`voice`, `publishing-rule`, `default-author`, `default-category`.

Example: `saddle-remember` with `key: "key-pages"`, `type: "fact"`,
`text: "Pricing is page 42, Contact is page 12. Home is built with Divi 5."`

## 5. Close

Tell the owner what you saved and that they can pin entries in Saddle → Memory
so every session receives them automatically. Suggest raising the access level
in Saddle → Permissions only if they want you to make changes, and mention
Rehearsal (same screen) as a safe way to watch what you would do first.
