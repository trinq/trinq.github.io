# Mission: Writing Great Agent Skills

## Why

I have ~30 skills across `~/.claude/skills/`, `~/.cursor/skills-cursor/`, `~/.agents/skills/`, and project-local `.cursor/skills/`. They work, but I can feel "skill hell" — many were written quickly, some are model-invoked by accident, several are bloated, and I have no shared rubric to know which are pulling their weight. I want a small, opinionated framework I can run each skill through so my agent's context stays cheap and the skills actually fire when I need them.

Matt Pocock's "Building Great Agent Skills: The Missing Manual" is the seed. The checklist — **Trigger → Structure → Steering → Pruning** — gives me four discrete failure modes to audit against, with concrete tests (e.g. "delete this paragraph — does the agent still do the thing?").

## Success looks like

- Can articulate the four checklist axes (Trigger / Structure / Steering / Pruning) and name a concrete failure each one catches
- Can look at any of my existing skills and say which axis is the worst offender, with a one-sentence fix
- Have audited and rewritten at least 3 of my highest-leverage skills using the framework
- Have a personal "no-op" detection habit: when I write a new skill, I delete paragraphs and watch what the agent does
- Have a small set of **leading words** (e.g. *vertical slice*, *minimal pivot*, *evidence before assertions*) that I reuse consistently across skills and can spot in my own reasoning traces

## Constraints

- This is a working session, not a survey — I want to leave with skills I've actually rewritten, not notes I've taken
- My existing skill ecosystem spans three harnesses (Claude Code, Cursor, Codex). The framework should be harness-agnostic where possible
- I'm not building a skill-authoring tool — just internalising the rubric so my own skills get better
- Output should be lessons I can re-skim in 5 minutes next month
- Time budget: a handful of focused sessions, not a course

## Out of scope

- Building a skill marketplace or community repo
- Benchmarking skills against each other quantitatively
- Deep dives into specific harness APIs (Skill tool, hooks, MCP servers)
- Eval frameworks for skills (e.g. SWE-bench-style skill testing)
- Skills for non-engineering domains (writing, planning, fitness) — those are *inspiration*, not the target

## Glossary (working)

- **Skill** — a markdown file (typically `SKILL.md`) with frontmatter that an agent loads to perform a specific task. The unit of authored behaviour.
- **Skill hell** — Matt's term for the state of having many skills you can't tell good from bad, so they don't deliver the value they promise.
- **Trigger** — how a skill gets loaded: by the user explicitly (`/skill-name`) or by the model deciding to based on the description.
- **User-invoked** — only the user can fire it. No description in agent context. Lower context load, higher cognitive load on pilot.
- **Model-invoked** — the agent can fire it itself based on the description sitting in its context. Higher context load, lower cognitive load on pilot.
- **Context pointer** — a short description (frontmatter `description`) that sits in the agent's context and points to the full skill file. Lets the agent choose to load more.
- **Structure** — the internal layout of a skill: steps (procedures the agent follows) vs reference (material the agent reads), with branching material pushed behind context pointers.
- **Step** — an imperative action the agent takes inside a skill. "Read the file. Run the test. Ask the user."
- **Reference** — descriptive material the agent reads to inform its actions, like a glossary or template.
- **Context load** — the cost imposed on the *agent* by having skills loaded (every model-invoked skill adds its description to every request).
- **Cognitive load** — the cost imposed on the *user* by having to remember and decide which skill to fire.
- **Steering** — how the skill gets the agent to do what you want. Primarily through *leading words*.
- **Leading word** — a term that packs dense meaning into a small phrase, repeated throughout a skill so the agent adopts it in its reasoning traces (e.g. *vertical slice*, *red-green-refactor*).
- **Leg work** — the depth of effort the agent puts into a single step. Plan-mode agents famously do too little *ask clarifying questions* leg work because they can see the future goal of "create plan".
- **Pruning** — the final pass to remove sediment, crud, and no-ops.
- **Sediment** — irrelevant legacy material accumulated as multiple people contributed without deleting.
- **Crud** — generic material that doesn't apply to every branch of the skill's use cases.
- **No-op** — an instruction that *looks* like it does something but doesn't actually change the agent's behaviour. The deletion test catches these.
- **Deletion test** — delete a paragraph and see if the agent's output changes. If not, the paragraph is a no-op.
- **Vertical slice** — Matt's example leading word: ship a thin end-to-end slice, not a horizontal layer (all the DB, then all the API, then all the UI).
- **Single source of truth** — each piece of reference material should live in exactly one place; reference it from elsewhere rather than copying.