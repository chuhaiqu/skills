#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const map = JSON.parse(readFileSync(join(root, "skill-map.json"), "utf8"));
const lock = JSON.parse(readFileSync(join(root, "source-lock.json"), "utf8"));
const errors = [];
const expectedNames = new Set(map.skills.map((skill) => skill.name));

function check(condition, message) {
  if (!condition) errors.push(message);
}

check(map.skills.length === 30, `Expected 30 skills, found ${map.skills.length}.`);
check(expectedNames.size === map.skills.length, "Skill names are not unique.");
check(lock.chapterCount === 48 && lock.chapters.length === 48, "Source lock must contain 48 chapters.");

const coverage = new Set(map.skills.flatMap((skill) => skill.chapters));
check(coverage.size === 48, `Expected all 48 chapters to be covered, found ${coverage.size}.`);
for (let number = 1; number <= 48; number += 1) {
  check(coverage.has(number), `Chapter ${number} is not covered by any skill.`);
}

const actualSkillDirs = readdirSync(join(root, "skills"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
for (const name of actualSkillDirs) check(expectedNames.has(name), `Unexpected skill directory: ${name}.`);
for (const name of expectedNames) check(actualSkillDirs.includes(name), `Missing skill directory: ${name}.`);

for (const skill of map.skills) {
  const dir = join(root, "skills", skill.name);
  const skillMd = join(dir, "SKILL.md");
  const openaiYaml = join(dir, "agents", "openai.yaml");
  const indexMd = join(dir, "references", "INDEX.md");
  const license = join(dir, "LICENSE");
  const notice = join(dir, "NOTICE");
  check(existsSync(skillMd), `${skill.name}: missing SKILL.md.`);
  check(existsSync(openaiYaml), `${skill.name}: missing agents/openai.yaml.`);
  check(existsSync(indexMd), `${skill.name}: missing references/INDEX.md.`);
  check(existsSync(license), `${skill.name}: missing LICENSE.`);
  check(existsSync(notice), `${skill.name}: missing NOTICE.`);
  if (!existsSync(skillMd)) continue;

  const body = readFileSync(skillMd, "utf8");
  const lines = body.split(/\r?\n/);
  const frontmatter = body.match(/^---\n([\s\S]*?)\n---/);
  check(Boolean(frontmatter), `${skill.name}: invalid frontmatter.`);
  if (frontmatter) {
    const keys = [...frontmatter[1].matchAll(/^([a-zA-Z0-9_-]+):/gm)].map((match) => match[1]);
    check(keys.join(",") === "name,description", `${skill.name}: frontmatter must contain only name and description.`);
    check(frontmatter[1].includes(`name: ${skill.name}`), `${skill.name}: frontmatter name mismatch.`);
  }
  check(lines.length < 500, `${skill.name}: SKILL.md has ${lines.length} lines; keep it under 500.`);
  check(!body.includes("TODO"), `${skill.name}: SKILL.md contains TODO.`);

  const yaml = existsSync(openaiYaml) ? readFileSync(openaiYaml, "utf8") : "";
  check(yaml.includes(`display_name: \"${skill.displayName}\"`), `${skill.name}: display_name mismatch.`);
  check(yaml.includes(`short_description: \"${skill.shortDescription}\"`), `${skill.name}: short_description mismatch.`);
  check(yaml.includes(`$${skill.name}`), `${skill.name}: default_prompt must mention the skill explicitly.`);
  check(skill.shortDescription.length >= 25 && skill.shortDescription.length <= 64, `${skill.name}: shortDescription must be 25-64 chars.`);

  if (existsSync(notice)) {
    const noticeText = readFileSync(notice, "utf8");
    check(noticeText.includes(`(${skill.name})`), `${skill.name}: NOTICE must identify the installed skill.`);
    check(noticeText.includes("出海去 (Chuhaiqu)"), `${skill.name}: NOTICE must retain Chuhaiqu attribution.`);
    check(noticeText.includes("Modified"), `${skill.name}: NOTICE must mention modification notices.`);
  }
  if (existsSync(license)) {
    check(readFileSync(license, "utf8").includes("Apache License\n                           Version 2.0"), `${skill.name}: unexpected license.`);
  }

  const expectedRefs = new Set(skill.chapters.map((number) => `playbook-${String(number).padStart(2, "0")}.md`));
  const actualRefs = readdirSync(join(dir, "references")).filter((file) => /^playbook-\d{2}\.md$/.test(file));
  check(actualRefs.length === expectedRefs.size, `${skill.name}: wrong number of chapter references.`);
  for (const file of actualRefs) check(expectedRefs.has(file), `${skill.name}: unexpected reference ${file}.`);
  for (const number of skill.chapters) {
    const file = `playbook-${String(number).padStart(2, "0")}.md`;
    const refPath = join(dir, "references", file);
    check(existsSync(refPath), `${skill.name}: missing ${file}.`);
    if (existsSync(refPath)) {
      const sha256 = createHash("sha256").update(readFileSync(refPath)).digest("hex");
      check(sha256 === lock.chapters[number - 1].sha256, `${skill.name}: ${file} differs from source lock.`);
    }
  }
}

function walk(path) {
  const entries = readdirSync(path, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = join(path, entry.name);
    if (entry.isDirectory() && entry.name !== ".git") return walk(full);
    return entry.isFile() || entry.isSymbolicLink() ? [full] : [];
  });
}

const files = walk(root);
let totalBytes = 0;
const privateLocalPath = ["", "Users", "thons"].join("/");
const privateImportPath = ["imports", "private"].join("/");
for (const file of files) {
  const stat = lstatSync(file);
  check(!stat.isSymbolicLink(), `Symlink is not allowed in distributable repo: ${relative(root, file)}.`);
  if (!stat.isFile()) continue;
  totalBytes += stat.size;
  if (/\.(md|json|ya?ml|mjs)$/.test(file)) {
    const text = readFileSync(file, "utf8");
    check(!text.includes(privateLocalPath), `Private local path found in ${relative(root, file)}.`);
    check(!text.includes(privateImportPath), `Private import path found in ${relative(root, file)}.`);
  }
}
check(totalBytes < 25 * 1024 * 1024, `Repository payload is ${totalBytes} bytes; keep it below 25 MB.`);
check(readFileSync(join(root, "LICENSE"), "utf8").includes("Apache License\n                           Version 2.0"), "Unexpected license text.");
check(existsSync(join(root, "NOTICE")), "Missing NOTICE.");
check(existsSync(join(root, "CATALOG.md")), "Missing CATALOG.md.");

if (errors.length) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${map.skills.length} skills, 48/48 chapter coverage, ${files.length} files, ${totalBytes} bytes.`);
