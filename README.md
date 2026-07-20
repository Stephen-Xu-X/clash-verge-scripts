# Clash Verge 全局拓展脚本

```text
.
├── Final Script by Codex.js
├── README.md
└── JS
    ├── Global Extend Script for Clash Verge.js
    └── Reference Script.js
```

## 文件说明

- `Final Script by Codex.js`

  个人自用的 Clash Verge Rev 全局扩展脚本。该脚本不提供任何网络安全、稳定性、可用性或兼容性保证，请自行检查并按实际网络环境使用。

  该文件以 `JS/Reference Script.js` 为基础调整：统一使用 [MetaCubeX/meta-rules-dat](https://github.com/MetaCubeX/meta-rules-dat) 的公开 `.mrs` 规则集；增加独立 AI 服务分组、服务图标、国家节点列表、自定义域名规则区、规则分流 DNS 与广告过滤开关；不修改订阅链接、端口、TUN 或局域网监听配置。

- `JS/Reference Script.js`

  参考脚本。用于保留原有设计、规则来源、分组模式和图标实现，便于后续还原或对比；不作为日常使用脚本。

- `JS/Global Extend Script for Clash Verge.js`

  Clash Verge 的原始初始化脚本备份。用于在需要时还原或对比最初配置；不作为日常使用脚本。

## 使用方式

在 Clash Verge Rev 的“全局扩展脚本”中使用 `Final Script by Codex.js`。

后续需要添加网站规则时，优先编辑该文件顶部的：

```js
const extraDirectDomains = [
  // "example.com",
];

const extraProxyDomains = [
  // "example.com",
];
```

`extraDirectDomains` 中的域名会优先走“全局直连”；`extraProxyDomains` 中的域名会优先走“节点选择”。两者均匹配域名及其子域名。

## 交给 Agent 的指令

```text
请先阅读 README.md、Final Script by Codex.js、JS/Reference Script.js 和 JS/Global Extend Script for Clash Verge.js。

这是一个个人自用的 Clash Verge Rev 全局扩展脚本仓库。请先用简洁语言说明：各文件的用途、Final Script by Codex.js 当前的主要分组与规则行为、以及本次需求可能影响哪些部分。

在我明确说明希望如何修改之前，不要编辑、重命名、删除、格式化、提交或发布任何文件。请先根据当前脚本信息询问我想实现什么效果；若需求有歧义，列出需要确认的关键点。

我确认修改范围后，默认只允许修改 Final Script by Codex.js。JS/Reference Script.js 与 JS/Global Extend Script for Clash Verge.js 是参考和备份文件，除非我明确要求，否则禁止修改、重命名、删除或格式化。

未经我明确要求，不要添加订阅链接、机场地址、账号、令牌、密码、个人域名、mixed-port、allow-lan、bind-address、TUN、系统代理或其他客户端级配置；不要调整 IPv6 默认关闭的行为。

如需修改域名规则，优先使用 Final Script by Codex.js 顶部的 extraDirectDomains 和 extraProxyDomains，并保证其优先级高于规则集。不要无说明地替换公开规则源、引入个人仓库，或增加与需求无关的复杂分组。

修改完成后，说明实际改动、执行 Final Script by Codex.js 的 JavaScript 语法检查，并明确哪些行为仍需要在 Clash Verge Rev 中实际导入后验证。
```
