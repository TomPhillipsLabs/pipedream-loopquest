# Pipedream — LoopQuest

[Pipedream](https://pipedream.com) components for [LoopQuest](https://loopquest.tomphillips.uk) — send AI/automation output for gamified human-in-the-loop review.

Layout mirrors `components/loopquest/` in [PipedreamHQ/pipedream](https://github.com/PipedreamHQ/pipedream) so it drops straight into a contribution PR.

## Components

- **Create Review Task** — POST content for a human to approve or flag.
- **Get Task Status** — poll a task's status / verdict.

Auth: a LoopQuest **API key** (`api_key`) and optional **Base URL** (`base_url`).

## Verdict trigger

LoopQuest returns the verdict asynchronously. Add an **HTTP / Webhook** trigger in Pipedream, copy its URL, and pass it as the `callbackUrl` on Create Review Task — the signed verdict (with `external_id`) starts that workflow.

## Develop / submit

```bash
npm test     # unit tests for the request builder
```

Contribute the `components/loopquest/` directory to PipedreamHQ/pipedream and open a PR; their team reviews and lists it in the registry.

## License

MIT
