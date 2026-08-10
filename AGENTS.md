# Repository instructions

- Treat `/content/playbook/chapters/` in the public `chuhaiqu/playbook` repository as the only canonical content source.
- Never import transcripts, private source maps, guest-review packets, credentials, local absolute paths, or internal-only files.
- Preserve copied chapter files byte-for-byte. Put workflow interpretation in `SKILL.md`, not in the source references.
- Skills are organized by user job, not by chapter number. Any module change must keep every skill independently installable.
- Keep `SKILL.md` below 500 lines with only `name` and `description` in frontmatter.
- When source content changes, run the sync and full validation before committing.
- Do not weaken or replace the repository license without explicit authorization from Velocity1, LLC.
