# subagent-model-router

A Claude Code mod that picks `opus`, `sonnet` or `haiku` for each built-in subagent (`general-purpose`, `Explore`, `Plan`) from keywords in its description and prompt. An explicit `model` and custom agent types are left alone.

- Opus: architecture, security, root cause, concurrency, proofs, migration plans and the like, and every `Plan` agent.
- Haiku: classifying, summarizing, listing or locating files and other short lookups, and every `Explore` agent.
- Sonnet: everything else.

The keyword lists are in `hooks/register.ts`.
