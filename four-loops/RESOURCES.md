# Resources

Curated, high-trust sources for the four-loop ladder. Lesson citations should pull from this list.

## Primary

- **[The Art of Loop Engineering](https://www.langchain.com/blog/the-art-of-loop-engineering)** — LangChain blog. The canonical source for the four-loop ladder. Defines the primitives in the table below. **Use this as the source of truth for the loop taxonomy.**

## Supporting (verified during course creation)

- **[Introducing Rubrics: Build Agents that Evaluate and Correct Their Work](https://www.langchain.com/blog/introducing-rubrics-for-deepagents)** — LangChain blog. Documentation for `RubricMiddleware`. Includes minimal code example.
- **[feat(sdk): RubricMiddleware for self-evaluated agent iteration · PR #3529](https://github.com/langchain-ai/deepagents/pull/3529)** — GitHub PR. Reference for the API surface (model, system_prompt, tools, max_iterations, on_evaluation).
- **[RubricMiddleware | deepagents | LangChain Reference](https://reference.langchain.com/python/deepagents/middleware/rubric/RubricMiddleware)** — Official API reference. Shows lifecycle hooks (`before_agent`, `after_agent`).
- **[How We Built LangSmith Engine, Our Agent for Improving Agents](https://www.langchain.com/blog/how-we-built-langsmith-engine-our-agent-for-improving-agents)** — LangChain blog. Engineering write-up of Loop 4. Explains the trace → issue → patch flow.

## Background math

- The "1.01³⁶⁵ = 37.78" formula is standard geometric compounding and verifiable with any calculator. No external citation needed.

## Claims NOT verified

The source text includes the line:

> "Loop engineering hit 6.5M views the same week LangChain put out the playbook, and I don't think a single person noticed they were the same thing."

I could not independently verify the **6.5M views** figure or the temporal alignment claim. The two posts do exist on the LangChain blog, but exact view counts and the "same week" framing are not corroborated by a public source. **Lessons will not repeat this claim as fact** — it is treated as the author's framing, not a verified data point.

## What is NOT in this list

- Speculative blog posts about "AI agents will replace X."
- Vendor posts that confuse marketing copy with engineering primitives.
- Anything without a primary source I could verify by reading the docs.
