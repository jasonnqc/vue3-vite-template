# Set ENV Files

- Development: Create your own `.env.local` file (git ignored)
- Dev: `.env`
- Staging: `.env.staging`
- Production: `.env.production`

## Rules for Variables

- Variables should start with `QUEST_` prefix, otherwise it won't work.
- When defining new variable, make sure to declare its schema in [vite config](../vite.config.ts) for validation.

## How to access Env variables

Access via `import.meta.env`, e.g. `import.meta.env.QUEST_API_URL`
