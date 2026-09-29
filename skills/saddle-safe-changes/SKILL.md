---
name: saddle-safe-changes
description: The protocol for every change made to a WordPress site through Saddle — check recent changes, respect rehearsal and previews, confirm destructive steps with the owner, verify the result on the live page, and undo cleanly when something went wrong. Use before any Saddle write, and whenever the user asks to undo, revert or roll back something the AI did.
license: MIT-0
metadata:
  author: PlugPress
  homepage: https://saddle.to
---

# Making changes safely with Saddle

The site is live. Follow these steps for every change, small ones included.

## Before you write

1. **Know what happened recently.** Call `saddle-recall-changes` (limit 10).
   If another session touched the same page in the last hours, say so before
   you change it again.
2. **Read before you write.** Get the current state first: `saddle-get-post`,
   `saddle-get-page`, `saddle-get-blocks`, `saddle-get-menu`,
   `saddle-get-template`… Change only what the user asked for.
3. **Say the plan in one or two sentences** when the change is bigger than a
   single field, and wait for a yes on anything that touches many items,
   deletes something, or goes public.

## While you write

- **Previews are the gate, not an error.** A destructive tool answers with
  `requires_confirmation`, a `preview` and a `confirm_token`. Show the preview
  to the user in plain words — what goes, what stays, whether it can be
  restored. Call again with the same arguments plus `confirm_token` only after
  they agree. Never pass a token the user has not seen the preview for.
- **Rehearsal.** A reply with `rehearsal: true` means the owner has turned
  rehearsal on: nothing was saved. Report what you would have changed, using
  `would` and `current`, and stop there.
- **Refusals.** A refused call names the control behind it (pause, access
  level, a switched-off tool, drafts-only). Tell the user which one; do not
  retry.
- **Prefer the reversible option.** Trash, not delete (`force` stays off).
  Drafts when unsure. Small edits (`saddle-edit-block`) over rewriting a whole
  page.

## After you write

1. **Verify.** For a page or post: `saddle-verify-page` (score, grade and the
   findings, each with an address), fix what it reports, then
   `saddle-get-preview-url` and look at it if you can. Success from the write
   tool is not proof.
2. **Report plainly:** what changed, where (ids or links), and anything you
   could not check.

## Undo

Every change Saddle makes is logged with what it replaced.

1. `saddle-recall-changes` lists entries newest first. Each has an `id` and an
   `undo` state: `available`, `undone`, or `not-recorded`.
2. `saddle-undo-changes` with `entries: [<ids>]`. The first call returns a
   preview of what comes back for each entry; confirm with the token after the
   user agrees.
3. Entries are undone newest first and whole. An entry is **skipped, with the
   reason**, when someone edited the same thing since, when it permanently
   deleted something, or when it predates undo. Plugin and theme updates can't
   be undone. Relay skipped reasons word for word.
4. An undo is itself logged, so it can be undone too.
