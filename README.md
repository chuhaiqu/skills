# 出海去 Playbook Skills

把出海去 Playbook 转换成可被 Codex、Claude Code 等 Agent 安装的 Skill Set。仓库包含 30 个可独立选择的 Skill：1 个诊断路由器和 29 个执行技能。模块按用户要完成的工作划分，不按 48 章机械拆分。

## 安装

交互式查看并自由选择：

```bash
npx skills add chuhaiqu/skill
```

只查看可安装的 Skill：

```bash
npx skills add chuhaiqu/skill --list
```

安装一个指定 Skill：

```bash
npx skills add chuhaiqu/skill --skill demand-validation
```

把全部 Skill 全局安装到 Codex 和 Claude Code：

```bash
npx skills add chuhaiqu/skill --skill '*' -a codex -a claude-code -g -y
```

本仓库公开发布，任何人都可以安装、使用、修改和再分发，但必须遵守下面的署名和变更说明要求。

完整模块见 [CATALOG.md](./CATALOG.md)。

## 结构

```text
skills/
  <skill-name>/
    SKILL.md
    agents/openai.yaml
    references/
      INDEX.md
      playbook-XX.md
```

每个 Skill 都是自包含目录。安装单个 Skill 时，不依赖仓库根目录或其他 Skill 的共享文件。参考章节保留公开 Playbook 原文和来源，`SKILL.md` 只承载可执行工作流、触发边界和交付标准。

## 来源同步与验证

维护者从 Playbook 公共章节源同步：

```bash
npm run scaffold
npm run sync -- --source /path/to/chuhaiqu-playbook
npm run validate
```

`source-lock.json` 记录源提交、48 个章节的文件哈希和整个语料快照。验证脚本检查：

- 30 个 Skill 均符合目录和元数据约定；
- 48 章全部被至少一个能力模块覆盖；
- 每个 Skill 引用自包含且与来源哈希一致；
- 不含私有导入路径、本机绝对路径或符号链接；
- 仓库负载保持在安装工具的安全范围内。

## 使用许可

本仓库采用 [Apache License 2.0](./LICENSE)，允许使用、修改和再分发。再分发时必须保留 [NOTICE](./NOTICE)、原始版权与署名；修改过的文件必须明确标注已经修改。推荐署名为：`Based on the Chuhaiqu Playbook Skills by 出海去 (Chuhaiqu), Copyright 2026 Velocity1, LLC.`
