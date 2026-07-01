# Pipedream — LoopQuest

[Pipedream](https://pipedream.com) components for [LoopQuest](https://loopquest.tomphillips.uk) — put a human in the loop on your AI and automation output. **Block** a downstream action until a person approves it (gate), or review quality in the **background** without pausing anything (monitor).

Layout mirrors `components/loopquest/` in [PipedreamHQ/pipedream](https://github.com/PipedreamHQ/pipedream) so it drops straight into a contribution PR.

## Components

- **Create Review Task** (action) — send content to a human. Pick the game (Swiper, Versus, Sorter, Detective, Fixer, Redact, Grounding) and the mode (gate or monitor); optional timeout + on-timeout fallback. Returns the task `id`.
- **New Verdict** (source/trigger) — a webhook source that emits the moment a review resolves, with the verdict, choice, reason, flags (`escalated`, `timed_out`) and your `external_id`. It subscribes on deploy and unsubscribes when you remove it.
- **Get Task Status** (action) — poll a single task's status / verdict on demand.

Auth: a LoopQuest **API key** (`api_key`) and optional **Base URL** (`base_url`).

## Gate vs monitor

- **Monitor** — Create Review Task and carry on. Reviews happen in the background for quality and audit; nothing waits.
- **Gate** — split the flow across two workflows:
  1. **Workflow A** does the work, then **Create Review Task** with **Mode = gate**.
  2. **Workflow B** is triggered by **New Verdict**, then branches: on `verdict === true` run the real action; on a flag or timeout route to a fallback.

  The action never runs unless a human approves. The **External ID** you set comes back on the verdict so Workflow B knows which item to act on. Set a **Timeout** + **On Timeout** so a gate never hangs (defaults to escalate, fail-closed).

## How the trigger works

The **New Verdict** source exposes a Pipedream HTTP endpoint and registers it with LoopQuest (`POST /api/v1/hooks`) when deployed; LoopQuest then POSTs every resolved verdict to it. Deleting the source unsubscribes (`DELETE /api/v1/hooks/{id}`). Subscriptions are idempotent by URL.

## Develop / submit

```bash
npm test     # unit tests for the request builder
```

Deploy privately with the [`pd` CLI](https://pipedream.com/docs/components/guidelines), or contribute the `components/loopquest/` directory to PipedreamHQ/pipedream and open a PR for the public registry.

## API endpoints used

| Component | Call |
|-----------|------|
| Auth | `GET /api/v1/me` |
| Create Review Task | `POST /api/v1/tasks` |
| Get Task Status | `GET /api/v1/tasks/{id}` |
| New Verdict — subscribe | `POST /api/v1/hooks` |
| New Verdict — unsubscribe | `DELETE /api/v1/hooks/{id}` |

Full API: https://loopquest.tomphillips.uk/docs · spec: https://loopquest.tomphillips.uk/openapi.json

## License

MIT
