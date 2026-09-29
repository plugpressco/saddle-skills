---
name: saddle-connect
description: Connect a WordPress site running the Saddle plugin to this AI app, or fix a Saddle connection that fails. Use when the user asks to connect, link or add their WordPress site, when no saddle-* tools are available, or when Saddle calls fail with 401 or missing tools. Gives the exact steps for Claude, Claude Code, ChatGPT, Codex, Cursor, VS Code, Gemini CLI, Windsurf and OpenClaw.
license: GPL-2.0-or-later
metadata:
  author: PlugPress
  homepage: https://saddle.to
---

# Connecting Saddle

Every WordPress site running Saddle is its own MCP server. There is no Saddle
relay: the app talks to the site directly.

**The site's address is** `https://<site>/wp-json/saddle/v1/mcp` — for example
`https://example.com/wp-json/saddle/v1/mcp`.

## Before anything: two things the owner does in wp-admin

1. Install and activate **Saddle** (Plugins → Add New → search "Saddle").
2. Open **Saddle → Apps**. If it offers **Turn on sign-in for apps**, turn it
   on. Then any app below needs only the address, and the owner approves it in
   the browser. (It needs HTTPS and pretty permalinks; without them, Saddle →
   Apps hands out a key instead — use "Use a key instead" in the steps.)

New installs can only read. The owner raises the level in Saddle → Permissions
when they want the app to make changes.

## Per app

Name the server after the site (`saddle-<site>`) so several sites stay apart.

- **Claude (claude.ai and the desktop app):** Settings → Connectors → Add
  custom connector. Name it, paste the address, leave the OAuth client ID and
  secret blank, Add. Claude opens the site's approval screen.
- **Claude Code:**
  `claude mcp add saddle-<site> --scope user --transport http https://<site>/wp-json/saddle/v1/mcp`
  then run `claude`, type `/mcp`, pick the server and choose Authenticate.
- **ChatGPT:** Settings → Apps & Connectors → Advanced settings → turn on
  Developer mode, then create a connector: paste the address, choose OAuth,
  leave client ID and secret blank. Write-capable connectors may need a
  Business, Enterprise or Edu workspace.
- **Codex:** add to `~/.codex/config.toml`:
  ```toml
  [mcp_servers.saddle-<site>]
  url = "https://<site>/wp-json/saddle/v1/mcp"
  startup_timeout_sec = 30
  ```
  then run `codex mcp login saddle-<site>`.
- **Cursor:** Saddle → Apps → Cursor → **Add to Cursor** (one click), or
  Settings → MCP → Add new server with `{"mcpServers":{"saddle-<site>":{"url":"https://<site>/wp-json/saddle/v1/mcp"}}}`;
  click **Needs login** next to it.
- **VS Code (Copilot agent mode):** Saddle → Apps → VS Code → **Add to VS
  Code**, or `.vscode/mcp.json` with
  `{"servers":{"saddle-<site>":{"type":"http","url":"https://<site>/wp-json/saddle/v1/mcp"}}}`.
- **Gemini CLI:**
  `gemini mcp add --scope user --transport http saddle-<site> https://<site>/wp-json/saddle/v1/mcp`
- **Windsurf:** Settings → MCP → Add custom server with
  `{"mcpServers":{"saddle-<site>":{"serverUrl":"https://<site>/wp-json/saddle/v1/mcp"}}}`.
- **OpenClaw:**
  `openclaw mcp add saddle-<site> --url https://<site>/wp-json/saddle/v1/mcp --transport streamable-http --auth oauth`
  then `openclaw mcp login saddle-<site>`.

For any other MCP app, give it the address; if it signs in with OAuth it will
open the approval screen, otherwise use a key from Saddle → Apps.

## When it doesn't work

1. If any `saddle-*` tool answers, call `saddle-self-check`. It says how this
   app signed in, the access level in force, how many tools are withheld and
   why, and a list of problems with the fix for each. Relay the fix in plain
   words.
2. **401 "no key arrived":** the web server strips the Authorization header.
   Saddle → Apps → Connection details & health → run the connection check; it
   fixes this on most hosts.
3. **401 "key rejected":** the key was revoked or rotated. Reconnect from
   Saddle → Apps.
4. **Connected but few tools:** the access level is low, or the account the
   app signed in as lacks the WordPress role. Saddle → Permissions.
5. **Everything refused:** Saddle is paused (Saddle → Settings).
6. **The approval screen never opens:** sign-in for apps is off, or the site
   isn't on HTTPS. Turn it on in Saddle → Apps, or use a key.

Never ask the user to paste a password or key into the chat. Keys go into the
app's settings, which Saddle → Apps prepares for them.
