# Claude Code build package — Japan private travel site

Built from *Japan Private Travel — Brand & Site Strategy, v2* (26 Sep 2026).

## What is in here

| File | Goes where | Purpose |
|---|---|---|
| `CLAUDE.md` | Repo root | Standing rules Claude Code reads at the start of every session. |
| `docs/DESIGN.md` | `docs/` | The design system: concept, tokens, type, grid, components, page wireframes. |
| `docs/CONTENT.md` | `docs/` | All page copy. **LOCKED** text is from the strategy; **DRAFT** text needs your approval; `[[KEYS]]` are facts only you can supply. |
| `docs/COMPLIANCE.md` | `docs/` | §7 of the strategy turned into machine-checked rules. Production builds fail if any rule fails. |
| `docs/PROMPTS.md` | `docs/` | Nine prompts, pasted into Claude Code one at a time, each ending in a checkpoint. |
| `docs/DECISIONS.md` | `docs/` | Open decisions and problems found in the strategy. Read this first. |

## How to run it

1. Create an empty repo. Copy `CLAUDE.md` to the root and `docs/` alongside it.
2. Open Claude Code in the repo.
3. Paste **Prompt 0** from `docs/PROMPTS.md`. It reads everything and reports back without writing code.
4. Paste each following prompt only after you have reviewed the previous checkpoint report and screenshots.
5. Keep `docs/CONTENT.md` as the single source of copy. Change copy there first, then ask Claude Code to sync — never the other way round.

## What the build can and cannot do without you

The whole site can be built, styled and tested with placeholders in place. It **cannot ship**: the compliance guard blocks a production build while any registration detail, DRAFT copy, unsourced claim or unlicensed image remains. That is deliberate — it is §7 of the strategy enforced in code.
