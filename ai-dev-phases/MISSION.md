# Mission: Set up a reproducible AI-driven development workflow my team can run without me babysitting it

## Why

You are managing a team that ships a product. You have seen enough AI coding assistants (Claude Code, Cursor, Copilot, etc.) to know that *ad-hoc* usage — "engineer prompts, sometimes gets good output, merges if it looks fine" — does not scale. Individual engineers get faster, but the team's output quality drifts, knowledge silos grow, and the work becomes unreviewable.

Matt Pocock's video ["The 7 phases of AI-driven development"](https://www.youtube.com/watch?v=Ah9p7v7nJWg) names the seven phases he believes every serious AI-engineering setup must traverse — **idea → research → prototype → PRD → implementation planning → execution → QA** — and argues the phases are largely implementation-agnostic (Ralph, GSD, Spec Kit, raw loops all fold into the same shape). The value of the framework for *you* is not "how to use Claude Code better." It is: **a diagnostic vocabulary for finding where your team's current workflow is missing a phase, conflating two phases, or skipping a phase entirely.**

You are learning this because:

- **Manager view, not IC view.** You don't need to write the best PRD; you need your team to consistently produce PRDs *before* they touch implementation. The framework is what you brief them on and what you score them against.
- **Process is the leverage.** Hiring one brilliant prompt-engineer doesn't compound. A team that runs all seven phases compounds — every sprint leaves behind research, prototypes, PRDs, and QA plans that the next sprint reuses.
- **AFK-able execution is the goal.** Pocock's strongest claim: with research, prototype, PRD, and Kanban board in place, the *execution* phase can run unattended and still produce good work. That is what you want from your team — predictable throughput, not constant human-in-the-loop prompting.
- **This is moving fast.** The 7-phase frame is from March 2026 and is already widely cited. Knowing it cold lets you read AI Hero / Matt's newsletter, the GSD / Spec Kit / Ralph communities, and any AI-engineering job description without context-switching cost.

## What you want out of this workspace

- **A mental model** of the seven phases — phrased in your own words, with the *artifact* each phase produces clearly named, so you can brief the team without paraphrasing Pocock.
- **A diagnostic you can run on your current team workflow** — does each phase exist? Is anything conflated? Where does quality actually leak?
- **A reusable reference card** (`reference/`) you can hand to a new engineer on day one and to a hiring manager in an interview.
- **A vocabulary** that lets you talk to leadership ("we are losing 30% of velocity in phase 3 because there is no research step") and to engineers ("show me the PRD for this ticket before you start the implementation plan") using the same words.
- **A team workflow** you can defend in a retrospective — not "we tried AI," but "we ran phases 1–4 and the output of phase 3 cut our execution time by half."

## Success looks like (6-month horizon)

- You can hold a 30-minute team meeting and draw all seven phases on the whiteboard, naming the artifact at each one, in under 5 minutes total.
- Every ticket your team picks up in the next sprint has a visible PRD or equivalent spec *attached* before execution starts. (This is the leading indicator you are running phases 4 and 5.)
- You can name, without hesitation, the single phase your team is currently weakest at — and have a plan to fix it this quarter.
- You can articulate to your CEO *why* you want to spend a week setting up a research-and-prototype ritual, using the 7-phase frame.
- You have shipped at least one feature AFK-style (research + prototype + PRD + Kanban done up-front, execution looped, human only at QA) and can show the artifacts to leadership.
- The reference card in `reference/7-phases.md` is short enough to print on one page and cited enough that you trust every line in it.

## Constraints

- **Primary source** remains Matt Pocock's video. Transcript above; always check a quote before leaning on it.
- Lessons must end with **a team artifact or a managerial decision** — a workflow change, a memo, a reference card, a retro action — not a quiz on terminology.
- Lessons should be **role-aware**: speak to *you as manager* (what to brief, what to ask for, what to defend), not to the IC (how to prompt).
- The framework is implementation-agnostic on purpose. Do not get pinned to one tool (Ralph vs GSD vs Spec Kit) — focus on the *phases*, treat the tooling as swappable.
- Sessions are 30–45 minutes. Each lesson finishes with one concrete deliverable. No "build a full AI engineering org" arcs.
- You already have a team product and an existing workflow (whatever it is today). Lessons should diagnose *your* workflow against the 7 phases, not a generic startup workflow.

## Out of scope

- Learning Claude Code, Cursor, or any specific AI tool deeply. We assume basic competence; the question is workflow, not tools.
- Becoming an expert prompt-engineer. We want the team to follow the framework, not to be 10× individual prompters.
- Vendor selection for AI tooling. The phases matter; the brand does not.
- Prompt-engineering tricks, system-prompt design, MCP plumbing. Those belong in `claude-code-orchestration/` and `prompting/` workspaces if you start one.
- Comparing AI-generated code quality to human-generated code in the abstract. We are optimizing for team throughput, not per-line aesthetics.

## Primary source

- **Matt Pocock**, **"The 7 phases of AI-driven development"**, AI Hero / YouTube, 2026-03-03, 08:26.
  - Video: https://www.youtube.com/watch?v=Ah9p7v7nJWg
  - Companion: https://aihero.dev/getting-started-with-ralph (referenced in video description, primary deep-dive on the execution phase)
  - Companion: https://aihero.dev/s/QmBEIh ("How To Make Codebases AI Agents Love" — referenced in video description, addresses research and prototype phases)
- This is the only primary source for lesson 0001. Supplementary resources will be added to `RESOURCES.md` as the curriculum grows.

## How this workspace differs from your other learning tracks

- `tao-joyce/` is **defensive security strategy** (attacker model, kill chain, brokerage defense). It answers "what does the adversary do?"
- `pdpd-luat-an-ninh-mang/` is **legal/compliance** (Luật ANM 2025, Nghị định 356/2025). It answers "what does the regulator require?"
- `claude-code-orchestration/` and `prompting/` (if you have them) are about **tool-level skill** — how to drive an AI assistant well.
- **This workspace** is about **team-level process** — how to structure sprints, specs, reviews, and retros so AI assistance *as a team capability* gets better over time, not just faster.

The four are complements. A manager who knows all four can brief both engineers ("here is how we orchestrate Claude Code") and leadership ("here is why we need a research ritual before each sprint").

## First concrete deliverable

Before lesson 0001 closes, you commit to producing **one of**:

1. A 1-page `reference/team-workflow-diagnostic.md` mapping your team's current workflow against the 7 phases — flagging which phases exist, which are conflated, which are missing. (Preferred — fastest learning.)
2. A 15-minute team-meeting outline titled "How we ship with AI in 2026" that walks the team through the 7 phases using Pocock's vocabulary.

Lesson 0001 will check the deliverable and use it as the anchor for lesson 0002.
