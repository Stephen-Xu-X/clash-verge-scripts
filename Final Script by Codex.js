/**
 * Clash Verge Rev 全局扩展脚本
 *
 * 使用方式：将本文件完整内容粘贴到 Clash Verge Rev 的“全局扩展脚本”。
 * 只会覆盖 DNS、规则、代理组与 IPv6 配置；不会修改端口、TUN、局域网监听。
 */

// ==================== 个人规则：后续只编辑这里 ====================
// 域名会匹配自身及所有子域名，例如 example.com 也会匹配 www.example.com。
const extraDirectDomains = [
  // "example.com",
];

const extraProxyDomains = [
  // "example.com",
];

// ================================================================

const testUrl = "https://www.gstatic.com/generate_204";
const testInterval = 300;
const testTolerance = 80;

const domesticNameservers = [
  "https://dns.alidns.com/dns-query",
  "https://doh.pub/dns-query",
];

const foreignNameservers = [
  "https://dns.cloudflare.com/dns-query",
  "https://dns.google/dns-query",
];

const ruleProviderCommon = {
  type: "http",
  format: "mrs",
  interval: 86400,
};

const domainRule = (file) => ({
  ...ruleProviderCommon,
  behavior: "domain",
  url: `https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/${file}.mrs`,
  path: `./ruleset/metacubex/${file}.mrs`,
});

const ipRule = (file) => ({
  ...ruleProviderCommon,
  behavior: "ipcidr",
  url: `https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geoip/${file}.mrs`,
  path: `./ruleset/metacubex/${file}.mrs`,
});

const ruleProviders = {
  private: domainRule("private"),
  cn: domainRule("cn"),
  ads: domainRule("category-ads-all"),
  openai: domainRule("openai"),
  anthropic: domainRule("anthropic"),
  gemini: domainRule("google-gemini"),
  google: domainRule("google"),
  apple: domainRule("apple"),
  bing: domainRule("bing"),
  github: domainRule("github"),
  onedrive: domainRule("onedrive"),
  microsoft: domainRule("microsoft"),
  youtube: domainRule("youtube"),
  netflix: domainRule("netflix"),
  tiktok: domainRule("tiktok"),
  spotify: domainRule("spotify"),
  bilibili: domainRule("bilibili"),
  adobe: domainRule("adobe"),
  pornhub: domainRule("pornhub"),
  speedtest: domainRule("speedtest"),
  steam: domainRule("steam"),
  telegram: domainRule("telegram"),
  whatsapp: domainRule("whatsapp"),
  proxy: domainRule("proxy"),
  gfw: domainRule("gfw"),
  "tld-not-cn": domainRule("tld-!cn"),
  privateip: ipRule("private"),
  cnip: ipRule("cn"),
  netflixip: ipRule("netflix"),
  telegramip: ipRule("telegram"),
};

const groupBase = {
  interval: testInterval,
  timeout: 5000,
  url: testUrl,
  lazy: true,
  hidden: false,
  "disable-udp": false,
};

const nodeFilter = "^(?!.*(官网|套餐|流量|异常|剩余|到期|过期)).*$";
const iconBase = "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons";

const regions = [
  { name: "香港节点", filter: "(?i)(🇭🇰|香港|hong ?kong|(^|[^a-z])hk([^a-z]|$)|hkg)", icon: `${iconBase}/flags/hk.svg` },
  { name: "台湾节点", filter: "(?i)(🇹🇼|台湾|taiwan|taipei|(^|[^a-z])tw([^a-z]|$)|twn)", icon: `${iconBase}/flags/tw.svg` },
  { name: "狮城节点", filter: "(?i)(🇸🇬|新加坡|狮城|singapore|(^|[^a-z])sg([^a-z]|$)|sgp)", icon: `${iconBase}/flags/sg.svg` },
  { name: "日本节点", filter: "(?i)(🇯🇵|日本|japan|tokyo|osaka|(^|[^a-z])jp([^a-z]|$)|jpn)", icon: `${iconBase}/flags/jp.svg` },
  { name: "韩国节点", filter: "(?i)(🇰🇷|韩国|korea|seoul|(^|[^a-z])kr([^a-z]|$)|kor)", icon: `${iconBase}/flags/kr.svg` },
  { name: "美国节点", filter: "(?i)(🇺🇸|美国|united ?states|america|los angeles|san jose|silicon valley|(^|[^a-z])us([^a-z]|$)|usa)", icon: `${iconBase}/flags/us.svg` },
  { name: "英国节点", filter: "(?i)(🇬🇧|英国|united ?kingdom|london|(^|[^a-z])uk([^a-z]|$)|gbr)", icon: `${iconBase}/flags/gb.svg` },
];

function serviceGroup(name, icon, first = "延迟选优") {
  return {
    ...groupBase,
    name,
    type: "select",
    proxies: [first, "手动选择", "地区选择", "故障转移", "负载均衡(散列)", "全局直连"],
    "include-all": true,
    filter: nodeFilter,
    icon,
  };
}

const proxyGroups = [
  {
    ...groupBase,
    name: "节点选择",
    type: "select",
    proxies: ["延迟选优", "手动选择", "地区选择", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
    icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Airport.png",
  },
  {
    ...groupBase,
    name: "手动选择",
    type: "select",
    "include-all": true,
    filter: nodeFilter,
    icon: `${iconBase}/adjust.svg`,
  },
  {
    ...groupBase,
    name: "延迟选优",
    type: "url-test",
    tolerance: testTolerance,
    "include-all": true,
    filter: nodeFilter,
    icon: `${iconBase}/speed.svg`,
  },
  {
    ...groupBase,
    name: "故障转移",
    type: "fallback",
    "include-all": true,
    filter: nodeFilter,
    icon: `${iconBase}/ambulance.svg`,
  },
  {
    ...groupBase,
    name: "负载均衡(散列)",
    type: "load-balance",
    strategy: "consistent-hashing",
    "include-all": true,
    filter: nodeFilter,
    icon: `${iconBase}/merry_go.svg`,
  },
  {
    ...groupBase,
    name: "负载均衡(轮询)",
    type: "load-balance",
    strategy: "round-robin",
    "include-all": true,
    filter: nodeFilter,
    icon: `${iconBase}/balance.svg`,
  },
  serviceGroup("漏网之鱼", `${iconBase}/fish.svg`),
  serviceGroup("OpenAI", "https://www.clashverge.dev/assets/icons/chatgpt.svg"),
  serviceGroup("Claude", "https://fastly.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-png/light/claude-color.png"),
  serviceGroup("Gemini", "https://fastly.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-png/light/gemini-color.png"),
  serviceGroup("谷歌服务", "https://www.clashverge.dev/assets/icons/google.svg"),
  serviceGroup("苹果服务", "https://www.clashverge.dev/assets/icons/apple.svg", "全局直连"),
  serviceGroup("Bing", "https://www.bing.com/favicon.ico", "全局直连"),
  serviceGroup("Github", "https://www.clashverge.dev/assets/icons/github.svg"),
  serviceGroup("微软服务", `${iconBase}/microsoft.svg`, "全局直连"),
  serviceGroup("OneDrive", "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/OneDrive.png", "全局直连"),
  serviceGroup("YouTube", `${iconBase}/youtube.svg`),
  serviceGroup("Netflix", "https://www.clashverge.dev/assets/icons/netflix.svg"),
  serviceGroup("TikTok", "https://fastly.jsdelivr.net/gh/shindgewongxj/WHATSINStash@master/icon/tiktok.png"),
  serviceGroup("Spotify", "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Spotify.png"),
  serviceGroup("Bilibili", "https://fastly.jsdelivr.net/gh/Orz-3/mini@master/Color/Bili.png", "全局直连"),
  serviceGroup("Adobe", "https://www.adobe.com/favicon.ico", "全局直连"),
  serviceGroup("Pornhub", "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Pornhub_1.png"),
  serviceGroup("游戏服务", "https://www.clashverge.dev/assets/icons/steam.svg", "全局直连"),
  serviceGroup("网速测试", "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Speedtest.png", "全局直连"),
  serviceGroup("电报消息", `${iconBase}/telegram.svg`),
  serviceGroup("WhatsApp", "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/WhatsApp.png"),
  {
    ...groupBase,
    name: "广告过滤",
    type: "select",
    proxies: ["REJECT", "DIRECT"],
    icon: `${iconBase}/bug.svg`,
  },
  {
    ...groupBase,
    name: "全局直连",
    type: "select",
    proxies: ["DIRECT", "节点选择", "手动选择"],
    icon: `${iconBase}/link.svg`,
  },
];

const dnsConfig = {
  enable: true,
  ipv6: false,
  "prefer-h3": false,
  "use-hosts": false,
  "use-system-hosts": true,
  listen: "0.0.0.0:1053",
  "cache-algorithm": "arc",
  "respect-rules": true,
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter-mode": "blacklist",
  "fake-ip-filter": [
    "rule-set:private,cn",
    "+.lan",
    "+.local",
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    "localhost.work.weixin.qq.com",
    "*.localdomain",
    "*.localhost",
    "*.test",
    "*.home.arpa",
  ],
  "default-nameserver": ["tls://223.5.5.5", "tls://119.29.29.29"],
  nameserver: foreignNameservers,
  "direct-nameserver": domesticNameservers,
  "direct-nameserver-follow-policy": true,
  "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
  "nameserver-policy": {
    "rule-set:private,cn": domesticNameservers,
  },
};

const snifferConfig = {
  enable: true,
  "force-dns-mapping": true,
  "parse-pure-ip": true,
  "override-destination": true,
  sniff: {
    TLS: { ports: [443, 8443] },
    HTTP: { ports: [80, "8080-8880"], "override-destination": true },
    QUIC: { ports: [443, 8443] },
  },
};

function matchesRegion(nodeName, filter) {
  const pattern = filter
    .replace("(?i)", "")
    .replace(/\(\^\|\[\^a-z\]\)/g, "(?:^|[^a-z])")
    .replace(/\(\[\^a-z\]\|\$\)/g, "(?:[^a-z]|$)");
  try {
    return new RegExp(pattern, "i").test(nodeName);
  } catch (_) {
    return false;
  }
}

function addRegionGroups(config) {
  const entries = config["proxy-groups"];
  const providerNames = Object.keys(config["proxy-providers"] || {});
  const nodeNames = (config.proxies || []).map((proxy) => proxy && proxy.name).filter(Boolean);
  const visibleRegions = nodeNames.length > 0
    ? regions.filter((region) => nodeNames.some((name) => matchesRegion(name, region.filter)))
    : regions;

  if (visibleRegions.length === 0) return;

  const regionNames = [];
  for (const region of visibleRegions) {
    const group = {
      ...groupBase,
      name: region.name,
      type: "select",
      filter: region.filter,
      icon: region.icon,
    };
    if (providerNames.length > 0 && nodeNames.length === 0) {
      group.use = providerNames;
    } else {
      group["include-all"] = true;
    }
    entries.push(group);
    regionNames.push(region.name);
  }

  entries.splice(2, 0, {
    ...groupBase,
    name: "地区选择",
    type: "select",
    proxies: regionNames,
  });
}

function customDomainRules(domains, target) {
  return domains
    .map((domain) => String(domain || "").trim())
    .filter(Boolean)
    .map((domain) => `DOMAIN-SUFFIX,${domain},${target}`);
}

function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const providerCount = Object.keys(config?.["proxy-providers"] || {}).length;
  if (proxyCount === 0 && providerCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  config.profile = { "store-selected": true, "store-fake-ip": true };
  config.ipv6 = false;
  config["geodata-loader"] = "standard";
  config["geosite-matcher"] = "mph";
  config["global-client-fingerprint"] = "chrome";
  config["global-ua"] = "chrome";
  config["unified-delay"] = true;
  config["tcp-concurrent"] = true;
  config.dns = dnsConfig;
  config.sniffer = snifferConfig;
  config["rule-providers"] = ruleProviders;
  config["proxy-groups"] = proxyGroups.map((group) => (
    group.proxies ? { ...group, proxies: [...group.proxies] } : { ...group }
  ));
  addRegionGroups(config);

  config.rules = [
    ...customDomainRules(extraDirectDomains, "全局直连"),
    ...customDomainRules(extraProxyDomains, "节点选择"),
    "RULE-SET,private,DIRECT",
    "RULE-SET,privateip,DIRECT,no-resolve",
    "RULE-SET,ads,广告过滤",
    "RULE-SET,openai,OpenAI",
    "RULE-SET,anthropic,Claude",
    "RULE-SET,gemini,Gemini",
    "RULE-SET,google,谷歌服务",
    "RULE-SET,apple,苹果服务",
    "RULE-SET,bing,Bing",
    "RULE-SET,github,Github",
    "RULE-SET,onedrive,OneDrive",
    "RULE-SET,microsoft,微软服务",
    "RULE-SET,youtube,YouTube",
    "RULE-SET,netflix,Netflix",
    "RULE-SET,netflixip,Netflix,no-resolve",
    "RULE-SET,tiktok,TikTok",
    "RULE-SET,spotify,Spotify",
    "RULE-SET,bilibili,Bilibili",
    "RULE-SET,adobe,Adobe",
    "RULE-SET,pornhub,Pornhub",
    "RULE-SET,speedtest,网速测试",
    "RULE-SET,steam,游戏服务",
    "RULE-SET,telegram,电报消息",
    "RULE-SET,telegramip,电报消息,no-resolve",
    "RULE-SET,whatsapp,WhatsApp",
    "RULE-SET,cn,全局直连",
    "RULE-SET,cnip,全局直连,no-resolve",
    "RULE-SET,proxy,节点选择",
    "RULE-SET,gfw,节点选择",
    "RULE-SET,tld-not-cn,节点选择",
    "MATCH,漏网之鱼",
  ];

  return config;
}
