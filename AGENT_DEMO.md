# Agent demo script

Run these prompts in sequence with an MCP client connected to the Railway endpoint.
Every action is logged to https://github-workflow-mcp-production.up.railway.app/audit

The MCP server must have these Railway env vars set:
- `GITHUB_ORG=Wajkie`
- `ALLOWED_REPOS=demo-workflow`
- `ALLOW_WRITES=true`

---

## Step 1 — Explore the repo

> List all repositories available, then show me the open pull requests in demo-workflow.

**Tools fired:** `list_repos`, `list_pull_requests`

---

## Step 2 — Inspect the open PR

> Get the details of PR #1 in demo-workflow, including all changed files and their diffs.

**Tools fired:** `get_pull_request`, `get_changed_files`

---

## Step 3 — Lint the code

> Lint src/users.ts in the demo-workflow repo and tell me what issues you find.

**Tools fired:** `lint_file`

Expected findings:
- Unused variable `DB_VERSION`
- `any` type on `newUser`

---

## Step 4 — Apply the safe fixes

> Apply the auto-fixable lint issues in src/users.ts in demo-workflow.

**Tools fired:** `apply_safe_fixes`

This writes a commit directly to the `feature/add-delete-endpoint` branch.

---

## Step 5 — Create a new branch and make a change

> Create a branch called `agent/add-health-endpoint` from main in demo-workflow,
> then add a GET /health route to src/router.ts that returns { status: "ok" }.

**Tools fired:** `create_branch`, `create_or_update_file`

---

## Step 6 — Check the latest release

> What is the latest release of demo-workflow and what does it include?

**Tools fired:** `get_latest_release`

---

## Step 7 — View the audit log

Open https://github-workflow-mcp-production.up.railway.app/audit in a browser.

You should see every tool call from steps 1–6 listed with actor, outcome, and timestamp.
