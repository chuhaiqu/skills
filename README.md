# 出海去孵化器 Skills

把出海去孵化器过去几年的社区实践、嘉宾分享、实战课程和持续积累的经验，变成 Codex、Claude Code 等 Agent 可以直接调用的 30 个专业 Skills。

它不是一组通用提示词，也不只是供人阅读的资料。每个 Skill 都围绕一个具体经营任务，提供判断边界、执行工作流、参考资料和明确交付物，帮助「一人公司」与出海独立产品把问题真正推进到下一步。

## 它可以帮你做什么

| 业务板块 | 可以解决的问题 |
| --- | --- |
| 诊断与经营 | 判断下一步先做什么，设计一人公司经营方式，用证据决策，把工作交接清楚 |
| 市场与产品 | 研究市场和 ICP，开展用户访谈，验证需求，定义 MVP，完成定位、页面与产品设计 |
| 定价与发布 | 设计套餐和计费，核算单位经济，组织产品发布，完成 App Store 上架与增长 |
| 内容与自然增长 | 建立内容系统，运营 X 与 YouTube，获得搜索和 AI 搜索可见性 |
| 获客与外部协作 | 选择增长渠道，运行广告、创作者营销、社区、Cold Email 与伙伴计划 |
| 运营与履约 | 优化 Onboarding、留存、支付和客服，运营跨境电商完整链路 |
| 公司与合规 | 选择公司与收款架构，建立隐私、平台、知识产权和安全合规控制 |

不知道该选哪个时，从 [`growth-diagnosis`](./skills/growth-diagnosis/) 开始。它会先定位当前最主要的经营阻力，再把任务路由到更具体的 Skill。

## 快速开始

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

安装后，可以直接把你的真实业务上下文交给 Agent：

```text
使用 growth-diagnosis，结合我目前的产品阶段、数据和资源，判断未来 30 天最应该推进的一件事。

使用 demand-validation，把这个产品想法变成一个两周内可以完成的付费验证实验。

使用 product-positioning，根据这些访谈记录完成定位、Landing Page 结构和可直接使用的文案。

使用 channel-fit，比较我现在可选的获客渠道，只选一个主渠道并制定 30 天学习计划。
```

## Skills 能力清单

### 诊断与经营

| Skill | 可以完成 | 典型交付 |
| --- | --- | --- |
| [`growth-diagnosis`](./skills/growth-diagnosis/) | 把模糊的增长焦虑收敛为一个有证据、可执行、可复盘的下一步动作。 | 阶段与阻力诊断、候选动作比较表、唯一主动作及停止条件、7—30 天执行与复盘卡 |
| [`solo-business`](./skills/solo-business/) | 选择与个人能力、现金、风险和生活约束相匹配的经营路径，并明确本人必须拥有的责任。 | 经营约束卡、候选路径比较、责任边界图、短周期验证计划 |
| [`evidence-decisions`](./skills/evidence-decisions/) | 让一个经营判断可以追溯来源、暴露假设、指导行动并在结果出现后更新规则。 | 决策问题定义、证据与未知项表、带反证条件的决定、可持续更新的决策日志 |
| [`business-english`](./skills/business-english/) | 把泛化的英语焦虑改造成围绕真实工作任务的输入、练习、反馈和复盘系统。 | 语言任务优先级表、基线诊断、4—8 周训练安排、真实任务复盘模板 |
| [`work-handoff`](./skills/work-handoff/) | 把一个模糊委托变成可执行、可验收、可接管且权利和权限清楚的工作包。 | 可执行任务说明、状态与验收表、权限和权利清单、接管与退出计划 |

### 市场与产品

| Skill | 可以完成 | 典型交付 |
| --- | --- | --- |
| [`market-research`](./skills/market-research/) | 把个人痛点或产品想法转成有付费主体、真实任务、替代方案和可触达渠道的候选市场。 | 候选市场定义、ICP/JTBD/场景卡、替代方案与竞品地图、关键词和渠道证据表 |
| [`user-interviews`](./skills/user-interviews/) | 从真实过去行为和现有流程中找到问题、替代方案、约束和付费线索，而不是收集礼貌性的意见。 | 招募标准与邀请文案、行为型访谈提纲、统一访谈记录、证据归纳与下一步建议 |
| [`demand-validation`](./skills/demand-validation/) | 用最短、合规、可逆的实验验证最关键风险，并把兴趣、行为、付费和留存证据分层。 | 验证假设卡、实验设计与埋点口径、验证台账、PMF 证据阶段与决定 |
| [`product-scope`](./skills/product-scope/) | 让首版产品以最短但完整的路径交付一次可验证价值，并留下清楚的取舍理由。 | 核心用户与任务定义、最短价值路径、MVP 范围与功能决策表、Aha/TTFV 测量方案 |
| [`product-positioning`](./skills/product-positioning/) | 把真实用户、任务、替代方案和产品证据排成一条能支持目标行动的页面决策路径。 | 定位事实表、一页产品叙事、Landing Page 结构与可直接使用的文案、事件与理解测试计划 |
| [`product-design`](./skills/product-design/) | 在真实内容、状态、语言和设备中完成可访问、可本地化、可维护和可接管的设计交付。 | 设计约束与内容清单、组件和状态验收表、可访问性与本地化审查、资产权利和接管清单 |

### 定价与发布

| Skill | 可以完成 | 典型交付 |
| --- | --- | --- |
| [`pricing-strategy`](./skills/pricing-strategy/) | 让价值、计费单位、套餐、首次付费路径、现金和履约义务形成一致的经营系统。 | 定价假设与证据表、套餐和权益矩阵、首次付费与退款状态流、计费组合及实验计划 |
| [`unit-economics`](./skills/unit-economics/) | 用同一核算单位连接净收入、完整成本、客户价值、现金回收和渠道上限。 | 指标口径表、单位经济模型、渠道经营与容量表、放量/修复/停止建议 |
| [`product-launch`](./skills/product-launch/) | 把发布从单日曝光变成包含承接、分发、测量、反馈和长期资产的可重复系统。 | 发布目标与范围、发布包清单、上线运行手册、测量与复盘模板 |
| [`app-store-growth`](./skills/app-store-growth/) | 让 App 从可复现审核、准确披露和清晰元数据进入持续的商店曝光—下载—价值—收入循环。 | 提交冻结清单、App Review 信息与 Notes、ASO 关键词/元数据方案、商店增长与 Apple Ads 实验计划 |
| [`ecosystem-products`](./skills/ecosystem-products/) | 在平台依赖、用户任务、付费主体、分发、成本和退出风险都清楚的前提下验证一个生态机会。 | 生态机会卡、经营形态比较、六周验证计划、平台依赖与退出清单 |

### 内容与自然增长

| Skill | 可以完成 | 典型交付 |
| --- | --- | --- |
| [`content-system`](./skills/content-system/) | 把材料、内容、发布和产品信号连接成有来源、有权利边界、可复用、可维护的经营系统。 | 材料与权利清单、内容对象和网络地图、披露与多账号治理规则、四周内容运营计划 |
| [`x-growth`](./skills/x-growth/) | 在目标用户确实存在于 X 的前提下，用身份、关系、内容和产品反馈形成可持续增长循环。 | X 渠道与身份定义、Profile 和关系研究方案、选题/素材/结构系统、两周冷启动与四周内容日历 |
| [`youtube-growth`](./skills/youtube-growth/) | 围绕一个稳定受众任务建立制作负担可控、可诊断并能连接产品结果的视频系统。 | 频道模型与边界、四周选题和制作计划、单期视频 Brief、视频到产品的诊断表 |
| [`search-discovery`](./skills/search-discovery/) | 把真实查询意图转成可抓取、可理解、可引用、可维护并能连接业务结果的公开资产。 | 查询意图与页面地图、技术 SEO 检查、可链接/可引用资产计划、四周搜索与 AI 可见性实验 |

### 获客与外部协作

| Skill | 可以完成 | 典型交付 |
| --- | --- | --- |
| [`channel-fit`](./skills/channel-fit/) | 根据用户行为、产品形态、单位经济和团队能力选择一个可学习的主渠道，而不是同时铺开。 | 渠道匹配比较表、主渠道假设、30 天学习计划、每周复盘与停止规则 |
| [`paid-acquisition`](./skills/paid-acquisition/) | 用完整路径、可靠口径和可承受预算判断广告问题发生在哪一层，并只在单位经济允许时放量。 | 付费获客就绪审查、实验 Brief 与预算、Meta/Google 漏斗诊断、放量和停止决定 |
| [`creator-marketing`](./skills/creator-marketing/) | 把创作者合作从单条内容采购变成有选择逻辑、创意边界、权利、归因和经营复盘的项目。 | 候选创作者评分表、外联与合作 Brief、权利/披露/追踪表、业务结果复盘和放大决定 |
| [`community-ops`](./skills/community-ops/) | 让社区承担明确的支持、反馈、关系和留存任务，而不是只追求成员数量和消息量。 | 社区任务与成员路径、频道/角色/版规设计、支持与升级流程、四周上线和月度复盘计划 |
| [`outbound-sales`](./skills/outbound-sales/) | 从可搜索 ICP 到真实商业结果建立合规、低压力、可诊断的早期销售链路。 | 可搜索 ICP 与名单字段、合规外联序列、Pipeline 阶段与口径、四周发送和销售复盘计划 |
| [`partner-programs`](./skills/partner-programs/) | 让激励、单位经济、真实增量、权利义务、支付和退出规则共同成立。 | 伙伴关系与价值定义、激励和单位经济模型、计划条款与运营流程、归因/欺诈/月度复盘表 |

### 运营与履约

| Skill | 可以完成 | 典型交付 |
| --- | --- | --- |
| [`lifecycle-ops`](./skills/lifecycle-ops/) | 把首次价值、持续价值、沟通、支持、退款和支付风险接成可测量且可恢复的用户状态系统。 | 用户状态与事件表、价值/付费/留存漏斗、生命周期与支持流程、四周实验和周度经营节奏 |
| [`ecommerce-ops`](./skills/ecommerce-ops/) | 把选品、获客、页面、支付、履约、售后和复购放进同一条净收入与现金链路。 | 选品与最大损失评估、落地成本和现金模型、转化/履约/售后流程、四周验证与月度经营表 |

### 公司与合规

| Skill | 可以完成 | 典型交付 |
| --- | --- | --- |
| [`company-setup`](./skills/company-setup/) | 从真实业务触发条件出发选择可运营的主体和收款链路，并把持续义务做成有负责人和证据的日历。 | 事实与触发条件地图、主体/法域比较记录、合同与收款资金链、税务和公司义务日历 |
| [`compliance-audit`](./skills/compliance-audit/) | 把抽象合规要求转换成与真实数据流、平台、内容、合作方和发布阶段相匹配的可复核经营控制。 | 数据与经营事实地图、分阶段风险与控制台账、合同/权限/权利检查、发布和季度复核清单 |

## Skill 结构

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
