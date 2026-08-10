#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const map = JSON.parse(readFileSync(join(root, "skill-map.json"), "utf8"));
const skillsDir = join(root, "skills");
const creatorDir = process.env.SKILL_CREATOR_DIR
  ? resolve(process.env.SKILL_CREATOR_DIR)
  : join(homedir(), ".codex", "skills", ".system", "skill-creator");
const initializer = join(creatorDir, "scripts", "init_skill.py");

if (!existsSync(initializer)) {
  throw new Error(
    `Cannot find skill-creator initializer at ${initializer}. Set SKILL_CREATOR_DIR to the skill-creator directory.`,
  );
}

for (const skill of map.skills) {
  const target = join(skillsDir, skill.name);
  if (existsSync(target)) {
    console.log(`[skip] ${skill.name}`);
    continue;
  }

  const defaultPrompt = `Use $${skill.name} to help me complete this task with a source-grounded, actionable deliverable.`;
  execFileSync(
    "python3",
    [
      initializer,
      skill.name,
      "--path",
      skillsDir,
      "--resources",
      "references",
      "--interface",
      `display_name=${skill.displayName}`,
      "--interface",
      `short_description=${skill.shortDescription}`,
      "--interface",
      `default_prompt=${defaultPrompt}`,
    ],
    { stdio: "inherit" },
  );
}

console.log(`Scaffolded ${map.skills.length} skills.`);
