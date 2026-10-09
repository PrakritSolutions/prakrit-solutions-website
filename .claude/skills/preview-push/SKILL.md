---
name: preview-push
description: Commit the current work to the preview branch and push to origin/preview. Never touches main.
disable-model-invocation: true
---

Ship current changes to the draft site. Rules: `preview` only, never `main`.

1. Run `git branch --show-current`. If not `preview`, stop and tell the user.
2. Run `git status --short`. List what will be committed. Leave untracked drafts (for example `docs/launch/`) out unless the user asked for them.
3. With `/opt/homebrew/bin` on PATH, run `npm run lint` and `npm run build`. Stop on failure and report the error.
4. Stage only the intended files by name. Commit with a short imperative message and the attribution line from the session.
5. Run `git push origin preview`. Never push another ref, never force.
6. Report the commit hash and that draft.prakritsolutions.in will rebuild. Merging `preview` into `main` is the user's job.
