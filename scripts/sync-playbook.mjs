#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const map = JSON.parse(readFileSync(join(root, "skill-map.json"), "utf8"));
const args = process.argv.slice(2);
const sourceFlag = args.indexOf("--source");

if (sourceFlag < 0 || !args[sourceFlag + 1]) {
  throw new Error("Usage: node scripts/sync-playbook.mjs --source /path/to/playbook");
}

const sourceRoot = resolve(args[sourceFlag + 1]);
const chaptersDir = join(sourceRoot, "content", "playbook", "chapters");
if (!existsSync(chaptersDir)) {
  throw new Error(`Playbook chapter directory not found: ${chaptersDir}`);
}

const chapterSlugs = [
  "solo-company", "business-model", "decisions", "english", "market", "users",
  "research", "interviews", "validation", "pmf", "scope", "requirements", "mvp",
  "positioning", "landing-page", "design", "design-handoff", "pricing", "trial",
  "billing", "economics", "launch", "product-hunt", "app-store", "aso", "ecosystems",
  "content", "build-public", "x-profile", "x-content", "repurposing", "youtube", "seo",
  "authority", "channels", "acquisition", "ads", "creators", "community", "outbound",
  "affiliates", "onboarding", "retention", "ecommerce", "company", "tax", "privacy",
  "compliance",
];

const files = readdirSync(chaptersDir)
  .filter((file) => /^\d+-.*\.md$/.test(file))
  .sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10));

if (files.length !== 48) {
  throw new Error(`Expected 48 public Playbook chapters, found ${files.length}.`);
}

const chapters = files.map((file, index) => {
  const number = Number.parseInt(file, 10);
  if (number !== index + 1) throw new Error(`Unexpected chapter sequence at ${file}.`);
  const sourcePath = join(chaptersDir, file);
  const bytes = readFileSync(sourcePath);
  const text = bytes.toString("utf8");
  const title = text.match(/^#\s+(.+)$/m)?.[1]?.trim();
  if (!title) throw new Error(`Missing H1 title in ${file}.`);
  return {
    number,
    file,
    sourcePath,
    title,
    slug: chapterSlugs[index],
    sha256: createHash("sha256").update(bytes).digest("hex"),
    bytes: bytes.length,
  };
});

let sourceCommit = "unknown";
try {
  sourceCommit = execFileSync("git", ["-C", sourceRoot, "rev-parse", "HEAD"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
} catch {
  // A source commit is useful provenance but not required for a detached export.
}

function yamlString(value) {
  return JSON.stringify(value);
}

function renderAgentYaml(skill) {
  const defaultPrompt = `Use $${skill.name} to help me complete this task with a source-grounded, actionable deliverable.`;
  return `interface:
  display_name: ${yamlString(skill.displayName)}
  short_description: ${yamlString(skill.shortDescription)}
  default_prompt: ${yamlString(defaultPrompt)}
`;
}

function renderNotice(skill) {
  return `Chuhaiqu Playbook Skill: ${skill.displayName} (${skill.name})
Copyright 2026 Velocity1, LLC

This Skill is based on the Chuhaiqu Playbook by 出海去 (Chuhaiqu):
https://chuhaiqu.club/playbook

Licensed under the Apache License, Version 2.0. Redistributions must retain
this NOTICE and the original copyright and attribution notices. Modified
files must carry prominent notices stating that they were changed.

A clear attribution for redistributed or adapted versions is:
"Based on the Chuhaiqu Playbook Skills by 出海去 (Chuhaiqu),
Copyright 2026 Velocity1, LLC."

Third-party materials identified in Playbook citations remain subject to
their respective rights and terms. The License applies only to material
that Velocity1, LLC is authorized to license.
`;
}

function renderSkill(skill) {
  const routing = skill.referenceRouting.map((route) => {
    const links = route.chapters
      .map((number) => {
        const chapter = chapters[number - 1];
        return `[${String(number).padStart(2, "0")} ${chapter.title}](references/playbook-${String(number).padStart(2, "0")}.md)`;
      })
      .join("、");
    return `- ${links}：${route.when}。`;
  }).join("\n");

  return `---
name: ${skill.name}
description: ${yamlString(skill.description)}
---

# ${skill.displayName}

## 目标

${skill.goal}

不适用：${skill.notFor}

## 开始前

1. 先读 [来源索引](references/INDEX.md)，确认本技能使用的 Playbook 章节和来源快照。
2. 根据下面的“参考资料路由”只加载当前任务需要的章节，不要默认一次读完全部参考资料。
3. 收集当前业务阶段、目标用户或对象、已有证据、时间和预算、不可改变的约束，以及用户希望得到的最终交付物。
4. 缺少信息时，先用已有材料推进；只有会实质改变方向的缺口才向用户提问，并明确暂用的假设。

## 工作流

${skill.workflow.map((step, index) => `${index + 1}. ${step}`).join("\n")}

## 参考资料路由

${routing}

## 必须交付

${skill.deliverables.map((item) => `- ${item}`).join("\n")}

交付物应能直接用于决策或执行。优先给出已填充的表、清单、Brief、文案、流程或计划，不只解释概念。

## 质量与证据边界

- 把已验证事实、用户提供的信息、解释、假设和待核验项明确分开。
- 不发明案例、来源、数字、法律结论、平台规则或用户证据；Playbook 没有答案时直接说明。
- 对价格、法律、税务、平台政策、产品字段和市场规则等会变化的信息，使用当前权威一手来源核验，并记录核验日期。
- 不在回答中大段复现参考章节。把方法应用到用户的具体情境，生成新的工作成果。
- 保留必要的风险、权利、隐私、披露和停止条件；不要为了显得确定而删除边界。
- 默认使用用户的语言。中文交付应直接、具体、可复制，避免空泛的策略词。
`;
}

function renderIndex(skill) {
  const rows = skill.chapters.map((number) => {
    const chapter = chapters[number - 1];
    return `| ${String(number).padStart(2, "0")} | [${chapter.title}](playbook-${String(number).padStart(2, "0")}.md) | [官网](${map.source.website}/${chapter.slug}) | \`${chapter.sha256}\` |`;
  }).join("\n");

  return `# 来源索引

本技能来自出海去公开 Playbook 的当前内容快照。参考文件保持源章节原文；技能本身负责把这些材料变成可执行工作流。

- 源仓库：${map.source.repository}
- 官网：${map.source.website}
- 源提交：\`${sourceCommit}\`
- 同步规则：只读取 \`content/playbook/chapters/\` 下 48 个公开章节，不读取任何私有导入、逐字稿或内部资料。

| 章 | 内容 | 公开页面 | SHA-256 |
| --- | --- | --- | --- |
${rows}

需要引用对外事实时，优先打开官网或章节“参考资料”中的一手来源核验当前状态。
`;
}

for (const skill of map.skills) {
  const skillDir = join(root, "skills", skill.name);
  const referencesDir = join(skillDir, "references");
  if (!existsSync(skillDir)) {
    throw new Error(`Skill not scaffolded: ${skill.name}. Run npm run scaffold first.`);
  }
  mkdirSync(referencesDir, { recursive: true });

  for (const file of readdirSync(referencesDir)) {
    if (/^playbook-\d{2}\.md$/.test(file) || file === "INDEX.md") {
      unlinkSync(join(referencesDir, file));
    }
  }

  for (const number of skill.chapters) {
    const chapter = chapters[number - 1];
    const target = join(referencesDir, `playbook-${String(number).padStart(2, "0")}.md`);
    copyFileSync(chapter.sourcePath, target);
  }

  writeFileSync(join(referencesDir, "INDEX.md"), renderIndex(skill));
  writeFileSync(join(skillDir, "SKILL.md"), renderSkill(skill));
  mkdirSync(join(skillDir, "agents"), { recursive: true });
  writeFileSync(join(skillDir, "agents", "openai.yaml"), renderAgentYaml(skill));
  copyFileSync(join(root, "LICENSE"), join(skillDir, "LICENSE"));
  writeFileSync(join(skillDir, "NOTICE"), renderNotice(skill));
}

const corpusSha256 = createHash("sha256")
  .update(Buffer.concat(chapters.map((chapter) => readFileSync(chapter.sourcePath))))
  .digest("hex");

writeFileSync(
  join(root, "source-lock.json"),
  `${JSON.stringify({
    sourceRepository: map.source.repository,
    sourceWebsite: map.source.website,
    sourceCommit,
    corpusSha256,
    chapterCount: chapters.length,
    chapters: chapters.map(({ number, file, title, slug, sha256, bytes }) => ({
      number, file, title, slug, sha256, bytes,
    })),
  }, null, 2)}\n`,
);

const groups = new Map(map.groups.map((group) => [group.id, group]));
const catalogSections = map.groups.map((group) => {
  const rows = map.skills
    .filter((skill) => skill.group === group.id)
    .map((skill) => `| \`${skill.name}\` | ${skill.displayName} | ${skill.goal} |`)
    .join("\n");
  return `## ${group.title}\n\n| Skill | 中文名 | 完成的工作 |\n| --- | --- | --- |\n${rows}`;
}).join("\n\n");

for (const skill of map.skills) {
  if (!groups.has(skill.group)) throw new Error(`Unknown group for ${skill.name}: ${skill.group}`);
}

writeFileSync(
  join(root, "CATALOG.md"),
  `# Skill Catalog\n\n共 ${map.skills.length} 个可独立选择的 Skill。模块按用户要完成的工作划分，不按 48 章一一映射。\n\n${catalogSections}\n`,
);

console.log(`Synced 48 chapters into ${map.skills.length} skills from ${sourceCommit}.`);
