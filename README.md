# 出海去孵化器 Skills

面向「一人公司」和出海独立产品的 Agent Skills，覆盖经营判断、市场验证、产品、定价、发布、全球增长、持续运营与合规。

这些 Skills 来自出海去孵化器过去几年的社区实践、嘉宾分享、实战课程和持续沉淀的经验，帮助 Codex、Claude Code 等 Agent 直接完成具体工作。

## 安装

交互式查看并自由选择：

```bash
npx skills add chuhaiqu/skills
```

只查看可安装的 Skill：

```bash
npx skills add chuhaiqu/skills --list
```

安装一个指定 Skill：

```bash
npx skills add chuhaiqu/skills --skill demand-validation
```

把全部 Skill 全局安装到 Codex 和 Claude Code：

```bash
npx skills add chuhaiqu/skills --skill '*' -a codex -a claude-code -g -y
```

本仓库仍在整理，暂未公开。获得仓库访问权限的测试用户可以安装使用。

完整模块见 [CATALOG.md](./CATALOG.md)。

## 结构

```text
skills/
  <skill-name>/
    SKILL.md
    agents/openai.yaml
    references/
      INDEX.md
      source-XX.md
```

每个 Skill 都是自包含目录。安装单个 Skill 时，不依赖仓库根目录或其他 Skill 的共享文件。`SKILL.md` 承载可执行工作流、触发边界和交付标准，`references/` 提供完成任务所需的经验资料。

## 维护与验证

维护者从内容仓库同步：

```bash
npm run scaffold
npm run sync -- --source /path/to/canonical-content-directory
npm run validate
```

`source-lock.json` 记录内容快照和文件哈希。验证脚本检查：

- 30 个 Skill 均符合目录和元数据约定；
- 所有维护中的经验资料均被对应能力覆盖；
- 每个 Skill 自包含且与内容快照一致；
- 不含私有导入路径、本机绝对路径或符号链接；
- 仓库负载保持在安装工具的安全范围内。

## 使用许可

本仓库采用 [Apache License 2.0](./LICENSE)，允许使用、修改和再分发。再分发时必须保留 [NOTICE](./NOTICE)、原始版权与署名；修改过的文件必须明确标注已经修改。推荐署名为：`Based on 出海去孵化器 Skills (Chuhaiqu Incubator Skills), Copyright 2026 Velocity1, LLC.`
