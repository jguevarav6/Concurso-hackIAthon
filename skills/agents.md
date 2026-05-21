# Project Instructions

## General

- This is a production frontend project.
- Prioritize maintainability, clean code, and minimal diffs.
- Do not rewrite large sections unless necessary.
- Follow existing folder structure, naming conventions, and styling approach.
- Ask before adding new production dependencies.
- Never expose secrets or modify environment files without explicit permission.

## Verification

Before finalizing frontend changes, run the available checks from this project:

- npm run build
- npm run lint
- npm run typecheck
- npm test

If a command does not exist, do not invent it. Use the closest available project command.

## Frontend Quality

- Use TypeScript strictly.
- Avoid `any`.
- Handle loading, empty, success, and error states.
- Keep UI responsive.
- Preserve accessibility.
- Avoid unnecessary API calls.
- Avoid memory leaks.
- Keep business logic out of UI components when possible.
hablar siempre en español