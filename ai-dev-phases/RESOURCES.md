# ai-dev-phases Resources

## Knowledge

- [Video: "The 7 phases of AI-driven development" — Matt Pocock](https://www.youtube.com/watch?v=Ah9p7v7nJWg)
  Primary source. 8:26, March 2026. Every lesson in this workspace traces back to a quote here. Use the *phases* as the spine; treat Ralph / GSD / Spec Kit as swappable implementations.

- [Article: "Getting started with Ralph" — AI Hero / Matt Pocock](https://aihero.dev/getting-started-with-ralph)
  Deep-dive on the **execution phase**. Use for: how the Ralph loop actually runs, what a `PROMPT.md` / `plans.md` looks like in practice, when to break out of the loop.

- [Article: "How To Make Codebases AI Agents Love" — AI Hero / Matt Pocock](https://aihero.dev/s/QmBEIh)
  Covers the **research and prototype phases** — how to structure a repo so an AI agent can navigate it efficiently. Use for: `research.md` / `agent.md` conventions, where to cache hard-won knowledge.

- [Newsletter: AI Hero — Matt Pocock](https://aihero.dev/s/RQqb0X)
  Weekly writing on AI engineering fundamentals. Use for: keeping the workspace current as the tooling landscape shifts; flagging when Pocock revises the 7-phase frame.

- [Tooling reference: GitHub Spec Kit](https://github.com/github/spec-kit) *(to be confirmed)*
  One of the implementations Pocock names in the video. Worth a deep read once `RESOURCES.md` is mature.

- [Tooling reference: GSD (Get Shit Done)](https://github.com/gsd-build/get-shit-done) *(to be confirmed)*
  Another implementation named in the video. Use for: how the phases are operationalized in a popular workflow.

- [Project / pattern reference: Claude Code subagents and skills](https://docs.claude.com/en/docs/claude-code) *(to be confirmed — see user's `claude-code-orchestration/` workspace)*
  Lower-level tooling. Not the focus here, but useful background when lessons touch on how teams assign AI tasks to specialized agents.

## Wisdom (Communities)

- [Discord: AI Hero](https://aihero.dev/s/N9eseO)
  Matt Pocock's community. High-signal for AI-engineering workflow questions. Use for: asking how other teams run the 7 phases in production.

- [Twitter / X: @mattpocockuk](https://twitter.com/mattpocockuk)
  Fast-moving commentary on AI tooling. Use for: catching when the 7-phase frame gets revised or extended.

*(More communities to be added as lessons surface gaps.)*

## Gaps

- No high-quality Vietnamese-language resource for AI-driven development workflow yet. If user wants to brief a Vietnamese-speaking team, lessons will need translation layers — flag in NOTES.
- No clear "manager-of-AI-engineers" community yet (most communities are IC-facing). The user is in a thin slice — flag as a future gap to fill, possibly with a local meetup.
- Limited post-mortems of teams that *failed* by skipping phases. Most public case studies are success stories; need to surface failure modes via the diagnostic in lesson 0001.
