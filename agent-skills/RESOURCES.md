# Agent Skills Resources

## Knowledge

- [Talk: "Building Great Agent Skills: The Missing Manual" — Matt Pocock, AI Engineer (Jun 2026)](https://www.youtube.com/watch?v=UNzCG3lw6O0)
  The seed for this mission. Encodes the **Trigger → Structure → Steering → Pruning** checklist and shows how it shows up in real skill rewrites. Use for: the canonical definition of each axis and the leading-word technique.

- [Skill: `writing-great-skills` — mattpocock/skills](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-great-skills/SKILL.md)
  The skill Matt mentions at the end of the talk — the actual checklist runnable as a skill. Use for: running the audit on my own skills (or community skills I'm reviewing).

- [Skills repo: mattpocock/skills](https://github.com/mattpocock/skills)
  Reference implementations of user-invoked skills. Useful for studying minimal, well-steered examples. Matt is explicit about preferring user-invoked.

- [Skills repo: obra/superpowers](https://github.com/obra/superpowers)
  Reference implementations of *model-invoked* skills. The contrast with Matt's repo is the heart of the Trigger discussion. Use for: seeing how descriptions are tuned to be model-discoverable.

- [Docs: Cursor Skills](https://docs.cursor.com/skills)
  Harness specifics for where I'm authoring most of my skills. Use for: frontmatter shape, `disable-model-invocation` semantics.

- [Docs: Claude Code Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview)
  Harness specifics for Claude Code. Use for: same — frontmatter, invocation mechanics.

## Wisdom (Communities)

- [r/ClaudeAI](https://reddit.com/r/ClaudeAI) — large, mixed signal but frequent skill-authoring threads. Use for: seeing what no-ops other people are shipping and how they get caught.
- [Cursor Forum — Skills & Commands](https://forum.cursor.com) — practitioners posting their own skills. Use for: real examples to audit using the checklist.
- GitHub: `awesome-claude-skills`, `awesome-cursor-rules` repos — curated lists. Use for: finding candidates to run the deletion test against.

## Gaps

- No rigorous, peer-reviewed evaluation of the four-axis framework. The talk is one expert's opinion (well-reasoned, but not empirically validated).
- No community of practice for "skill deletion tests" — most skill repos don't include the negative results (what was deleted and why).
- Limited public data on the cognitive-load vs context-load tradeoff at scale (what does the cost curve look like at 100 model-invoked skills?).