---
name: senior-frontend-quality-loop
description: Use this skill for React, Angular, TypeScript, frontend refactors, UI architecture, component quality, performance, accessibility, QA review, and iterative implementation until the code passes review.
---

# Senior Frontend Quality Loop

## Overview

Use this skill to run frontend work as a quality loop, not a one-pass edit. It is for tasks where Codex should inspect the current app, make the smallest correct change, then verify the result against QA, architecture, accessibility, and project-specific checks.

## Workflow

1. Inspect the codebase before editing.
2. Identify the frontend framework and existing conventions.
3. Create a short internal plan covering files, risks, tests, acceptance criteria, and edge cases.
4. Make the minimal change that preserves the current architecture.
5. Review the result for quality, architecture, accessibility, and test coverage.
6. Iterate until the task is complete or the remaining failure is clearly unrelated.

## Token Policy

- Prefer the smallest useful context.
- Read only the files needed for the current step.
- Avoid parallel agents on trivial tasks.
- Use one subagent for a narrow, high-value check instead of many broad checks when the task is small.
- Reserve full multi-agent review loops for medium or large frontend changes.
- Prefer terse progress updates and concise notes in `development.md`.
- Keep the skill content in English.
- Reply to the user in Spanish.
- Write `development.md` entries in Spanish.

## What To Check

- React, Angular, Next.js, Vite, standalone Angular, module-based Angular, or mixed frontend setups
- TypeScript correctness and public API typing
- Component boundaries and separation of concerns
- Performance issues, repeated work, and avoidable re-renders
- Accessibility, semantic HTML, keyboard support, and loading or empty states
- Existing styling system and visual consistency
- Available project checks such as build, lint, typecheck, and tests

## Implementation Rules

- Keep diffs minimal.
- Avoid unnecessary rewrites and new dependencies.
- Follow existing folder structure, naming, and styling patterns.
- Keep business logic out of UI components when a cleaner abstraction already exists.
- Prefer clear, maintainable code over clever code.
- Do not claim verification results unless the commands were actually run.
- Use a different Git branch for each meaningful commit or task.
- Do not commit directly on `main` unless the user explicitly requests it.

## UI/UX Standards

- Prefer modern, actively maintained libraries when they clearly improve quality, speed, accessibility, or maintainability.
- Do not add UI libraries casually; use the project's existing stack first.
- Build modern, clean, attractive interfaces with light color palettes unless the existing product direction says otherwise.
- Keep visual hierarchy clear: spacing, alignment, typography, contrast, and grouping must make the UI easy to scan.
- Preserve responsive behavior across mobile, tablet, laptop, and desktop viewports.
- Treat mobile as a first-class experience, not an afterthought.
- Use accessible semantic HTML, labels, focus states, keyboard navigation, and ARIA only when needed.
- Design for user experience, not only visual appearance: loading, empty, error, success, disabled, and edge states must be handled.
- Avoid cluttered layouts, inconsistent spacing, tiny tap targets, overlapping text, and components that break at common screen sizes.
- Prefer reusable components when they improve consistency without over-engineering.

## Review Loop

When the task is medium or complex, use parallel review passes:

- Implementation review
- Code quality review
- Architecture review
- UI/UX and accessibility review
- Test and verification review

If a review finds a valid issue, fix it and run the loop again. Stop after the requested behavior is implemented, the reviews are clean, and the available checks pass or any remaining failures are unrelated.

## Development Log

Keep a running log in `development.md` at the skill root.

- Add one short entry per meaningful action.
- Record what changed, why, and any validation performed.
- Keep entries concise so the log stays useful without wasting tokens.
- Update the log when the skill itself changes or when it is used for a task that materially alters the workspace.
