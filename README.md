# Saddle skills

Skills that teach any AI agent to work on a WordPress site safely through
[Saddle](https://saddle.to), the self-hosted WordPress MCP server.

Saddle turns your own WordPress into an MCP server: nothing goes through a
third party, nothing runs agent code, and every destructive step shows a
preview and waits for your approval. These skills give the agent the protocol
that goes with it — check the connection, orient, preview, confirm, verify,
undo — so it works on a live site the way a careful developer would.

They are plain [Agent Skills](https://agentskills.io) (`SKILL.md`), so they
work in Claude Code, Claude, Codex, Cursor, Gemini CLI, OpenClaw, Grok Build
and any other agent that reads the format.

## Install

**Any agent** (the [skills](https://skills.sh) installer picks the agents it
finds on your computer):

```bash
npx skills add plugpressco/saddle-skills
```

Add `-g` to install for your user instead of the current project, or
`-a openclaw` (`-a codex`, `-a cursor`, …) to choose the agent.

**Claude Code** (the skills plus your site's connection in one plugin; it asks
for your site's Saddle address):

```text
/plugin marketplace add plugpressco/saddle-skills
/plugin install saddle@saddle
```

**Claude (claude.ai and the desktop app):** download a skill's folder as a ZIP
and upload it in Customize → Skills → + → Upload a skill. Start with
`saddle-wordpress`.

**OpenClaw:** `npx skills add plugpressco/saddle-skills -a openclaw -g`.

## Then connect your site

Install Saddle on your WordPress site (Plugins → Add New → "Saddle"), open
**Saddle → Apps**, turn on sign-in for apps, and pick your app: it shows the
exact step, or a one-click button for Claude, Cursor and VS Code. Or ask your
agent — the `saddle-connect` skill knows the steps for every app.

## The skills

| Skill | What it does |
|---|---|
| `saddle-wordpress` | The entry point: finds the connection, orients once, explains access levels, previews and rehearsal, and routes to the others |
| `saddle-connect` | Connects Saddle to Claude, Claude Code, ChatGPT, Codex, Cursor, VS Code, Gemini CLI, Windsurf, OpenClaw or Grok, and fixes failing connections |
| `saddle-site-setup` | Interviews the owner once and stores the site's purpose, key pages, voice and rules in the site's own Saddle memory |
| `saddle-safe-changes` | The protocol for every write: recent changes, previews, confirmation, verification, and undo |
| `saddle-build-page` | Builds or restyles a page in the site's own design system, then proves it |
| `saddle-fix-page` | Works a page check report down to clean, in the right order |
| `saddle-content` | Posts, pages, custom content types, media, categories and menus |
| `saddle-site-care` | Updates, Site Health, plugins, themes, settings, templates, header and footer |
| `saddle-seo` | SEO fields in Yoast SEO, Rank Math or AIOSEO, and the SEO findings of the page check |

Each site also serves its own playbooks, written for its theme and builder;
the skills fetch them with `saddle-get-skill` instead of copying them, so the
two never disagree.

## Keeping the skills true

`scripts/validate.mjs` checks every skill against the Agent Skills format and
fails if a skill names a tool Saddle doesn't have. The tool list in
`scripts/tools.txt` is exported from the Saddle plugin:

```bash
# from a checkout of plugpressco/saddle, next to this repo
grep -rhoE "'saddle/[a-z0-9-]+'" includes/abilities/*.php | sort -u | tr -d "'" \
  | sed 's#saddle/#saddle-#' > ../saddle-skills/scripts/tools.txt
node ../saddle-skills/scripts/validate.mjs
```

## Support

Questions, problems or ideas: **team@plugpress.io**, or open an issue here.

## License

MIT-0. Saddle itself is GPL-2.0-or-later and lives at
[plugpressco/saddle](https://github.com/plugpressco/saddle).
