# demo-workflow

A small Node.js API used to demonstrate the **github-workflow-mcp** agent integration.

The agent can read this repo, inspect open PRs, lint code, create branches, push commits, and every action is logged to the [audit dashboard](https://github-workflow-mcp-production.up.railway.app/audit).

## Structure

```
src/
  index.ts        entry point
  router.ts       Express routes
  users.ts        user domain logic
  logger.ts       pino logger setup
```

## Running locally

```bash
npm install
npm run dev
```

## What the agent can do here

- List repositories and branches
- Read open pull requests and changed files
- Lint TypeScript files and apply safe fixes
- Create branches and push commits
- Create releases
- All actions appear in the audit log
