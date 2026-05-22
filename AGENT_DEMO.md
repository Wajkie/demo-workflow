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

**Tools fired:** `list_repositories`, `list_pull_requests`

---

## Step 2 — Inspect the open PR

> Get the details of PR #1 in demo-workflow, including all changed files and their diffs.

**Tools fired:** `get_pr`, `get_changed_files`

---

## Step 3 — Lint the code

> Fetch src/users.ts from the demo-workflow repo (default branch) and lint it. Tell me what issues you find.

**Tools fired:** `get_file`, `lint_code`

Expected findings:
- Missing semicolons (`semi` rule — auto-fixable)
- Unused variable `DB_VERSION` (`no-unused-vars`)
- `any` type on `newUser` (`no-explicit-any`)

---

## Step 4 — Apply the safe fixes

> Fetch src/users.ts from demo-workflow on the feature/add-delete-endpoint branch and apply auto-fixable lint fixes directly to that branch.

**Tools fired:** `get_file`, `apply_safe_fixes`

This writes a commit directly to the existing `feature/add-delete-endpoint` branch.
Only `semi` violations are auto-fixable; `no-unused-vars` and `no-explicit-any` are reported but not rewritten.

---

## Step 5 — Create a new branch and make a change

> Create a branch called `agent/add-health-endpoint` from main in demo-workflow,
> then add a GET /health route to src/router.ts that returns { status: "ok" }.

**Tools fired:** `create_branch`, `create_or_update_file`

---

## Step 6 — Check the latest release

> What is the latest release of demo-workflow and what does it include?

**Tools fired:** `get_release_status`

---

## Step 7 — View the audit log

Open https://github-workflow-mcp-production.up.railway.app/audit in a browser.

You should see every tool call from steps 1–6 listed with actor, outcome, and timestamp.
