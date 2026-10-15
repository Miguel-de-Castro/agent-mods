# agent-mods

Mods for Claude Code agents, as a plugin marketplace.

| Plugin | What it does |
| --- | --- |
| [subagents-tab-view](plugins/subagents-tab-view) | Panel of subagents with model, cost, a Steps accordion per agent and a crab whose costume follows the model |
| [subagent-model-router](plugins/subagent-model-router) | Picks opus, sonnet or haiku for each built-in subagent from keywords in its task |

## Install

```bash
claude plugin marketplace add <owner>/agent-mods
claude plugin install subagents-tab-view@agent-mods
claude plugin install subagent-model-router@agent-mods
```

## Credits

`subagents-tab-view` is a fork of the agents panel from [claude-kit](https://github.com/JohnnyVizz/claude-kit) by JohnnyVizz (MIT). See [LICENSE](LICENSE).
