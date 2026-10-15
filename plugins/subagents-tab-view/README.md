# subagents-tab-view

A Claude Code mod that lists your subagents in a panel: running, finished and planned, each with its model, context fill, estimated cost and time.

- **Steps accordion**: every agent row has a "Steps" button that opens the steps the agent reported, with ✓ for the finished ones and ● for the current one. By default each subagent's brief gets a request to report through the `step` tool, so it works without asking for it in the prompt.
- **Costumes**: a pixel crab walks while the agent runs, and its costume follows the model. Haiku is a racer with a flag, Sonnet a chef tossing an omelette, Opus a detective with a magnifier, Fable an astronaut. `Explore` agents scout with a cutlass and `Plan` agents turn a wrench. `prefers-reduced-motion` stops the animation.
- **Progress bar** (optional): a multi-agent orchestrator can call `progress` to show a title, phase and accepted tasks above the prompt. Without a caller the bar does not appear.
- `/agents-info` toggles the panel; `/agents-info open` opens it or brings it forward.

Cost is a rough estimate from token counts and a built-in per-model price table (`PRICES` in `hooks/register.tsx`), not a bill.

## Settings

- `language`: `auto` (default), `en`, `ru` or `he`.
- `autoOpen`: `plan` (default) opens the panel when a plan is reported; `any` also opens it, once per session, when any subagent starts.
- `stepsFor`: `all` (default) or `off`. With `all`, every subagent is asked to report its steps.

## Credits

Fork of the agents panel from [claude-kit](https://github.com/JohnnyVizz/claude-kit) by JohnnyVizz, MIT. The panel, the crab sprites and their animations come from there; this fork adds the Steps accordion, model-based costumes and the step request for every subagent.
