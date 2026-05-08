const SUGGEST_URL = "https://suggestqueries.google.com/complete/search?client=firefox&hl=ja&q=";

const DEFAULT_SEED_PRESETS = {
  "本命セット": [
    "売れない",
    "伸びない",
    "集客できない",
    "管理できない",
    "続かない",
    "わからない",
    "めんどくさい",
    "誰かやって",
    "代行",
    "自動化したい",
    "テンプレ欲しい",
    "比較してほしい"
  ],

  "収益化寄りセット": [
    "売れない",
    "集客できない",
    "フォロワー増えない",
    "アクセス増えない",
    "クリックされない",
    "申し込みが来ない",
    "リピートされない",
    "レビュー増えない",
    "商品説明 書けない",
    "投稿 続かない",
    "ネタ切れ",
    "価格設定 わからない"
  ],

  "テンプレ販売向きセット": [
    "管理できない",
    "整理できない",
    "把握できない",
    "忘れる",
    "続かない",
    "見える化したい",
    "記録できない",
    "チェックリスト",
    "テンプレ欲しい",
    "一覧表",
    "比較表",
    "スケジュール管理"
  ],

  "高単価寄りセット": [
    "相続 わからない",
    "確定申告 わからない",
    "補助金 わからない",
    "開業届 わからない",
    "インボイス わからない",
    "必要書類",
    "相談先",
    "期限",
    "失敗した",
    "ペナルティ",
    "手放したい",
    "処分したい"
  ],

  "変化球セット": [
    "やめたいけどやめられない",
    "買ったけど使ってない",
    "登録したけど使ってない",
    "契約したけど忘れてた",
    "放置している",
    "後回しにしている",
    "損してる気がする",
    "何が正解かわからない",
    "どれを選べばいいかわからない"
  ],

  "不要資産・処分系": [
    "手放したい",
    "処分したい",
    "売れない",
    "捨てられない",
    "管理できない",
    "相続したくない",
    "固定資産税 払いたくない"
  ],

  "副業・販売者の不満系": [
    "売れない",
    "伸びない",
    "集客できない",
    "フォロワー増えない",
    "アクセス増えない",
    "クリックされない",
    "申し込みが来ない",
    "リピートされない"
  ],

  "管理できない系": [
    "管理できない",
    "忘れる",
    "続かない",
    "把握できない",
    "整理できない",
    "見える化したい",
    "記録できない",
    "放置してしまう"
  ],

  "手続き・制度が怖い系": [
    "わからない",
    "怖い",
    "不安",
    "何から始める",
    "必要書類",
    "やり方",
    "期限",
    "失敗した",
    "ペナルティ",
    "相談先"
  ],

  "誰かやって・代行系": [
    "誰かやって",
    "代行",
    "丸投げ",
    "外注したい",
    "自動化したい",
    "テンプレ欲しい",
    "作ってほしい",
    "添削してほしい",
    "比較してほしい",
    "選んでほしい"
  ],

  "媒体別・売れないセット": [
    "売れない note",
    "売れない Kindle",
    "売れない メルカリ",
    "売れない インスタ",
    "売れない YouTube",
    "売れない ブログ",
    "売れない BASE",
    "売れない ココナラ"
  ],

  "土地系": [
    "売れない土地",
    "山林",
    "空地",
    "農地"
  ],

  "基本不満": [
    "めんどくさい",
    "面倒",
    "わからない",
    "分からない",
    "続かない",
    "できない",
    "使いこなせない",
    "管理できない"
  ],

  "副業不満": [
    "副業 続かない",
    "売れない",
    "稼げない",
    "伸びない",
    "note 売れない",
    "Kindle 売れない",
    "メルカリ 売れない"
  ],

  "商品化直前": [
    "テンプレ欲しい",
    "比較してほしい",
    "誰かやって",
    "代行",
    "自動化したい",
    "チェックリスト 欲しい"
  ]
};

const DEFAULT_FILTER_PRESETS = {
  "汎用": {
    hardExcludeWords: ["死にたい", "うつ", "病気", "政治", "宗教", "芸能人"].join("\n"),
    penaltyWords: ["人生", "生きる", "恋愛", "人間関係", "家族", "社会", "会社"].join("\n"),
    priorityWords: ["テンプレ", "自動化", "比較", "返信", "投稿", "管理", "売れない", "集客", "作成", "チェックリスト", "店舗", "副業", "個人事業主"].join("\n")
  },
  "副業・販売": {
    hardExcludeWords: ["死にたい", "病気", "政治", "宗教", "芸能人", "スピリチュアル"].join("\n"),
    penaltyWords: ["末路", "辞めたい", "辛い", "年収", "給料", "クビ", "見た目", "恋愛", "人間関係"].join("\n"),
    priorityWords: ["売れない", "集客", "投稿", "出品", "改善", "テンプレ", "比較", "自動化", "チェックリスト", "note", "Kindle", "メルカリ", "インスタ"].join("\n")
  },
  "土地・不動産": {
    hardExcludeWords: ["芸能人", "名前", "読み方", "意味", "英語", "ゲーム", "漫画", "歌詞", "占い"].join("\n"),
    penaltyWords: ["公開空地", "空地とは", "少量危険物", "危険物", "条例", "東京都"].join("\n"),
    priorityWords: ["固定資産税", "相続", "相続放棄", "寄付", "国に返す", "処分", "売却", "買取", "管理", "境界", "地目", "農地転用", "農業委員会", "森林組合", "草刈り"].join("\n")
  }
};

const DEFAULT_SETTINGS = {
  rankWeightCoef: 40,
  crossWeightCoef: 25,
  productWeightCoef: 10,
  excludePenaltyCoef: 15,
  repeatBonus: 10,
  payerBonus: 10,
  priorityBonus: 12,
  depth1QueryWeight: 1.20,
  depth2QueryWeight: 1.00
};

const BUILTIN_STOP_CO_WORDS = new Set([
  "とは", "と は", "って何", "とは何", "意味", "読み方", "英語", "wiki", "wikipedia",
  "画像", "写真", "知恵袋", "chiebukuro", "なんj", "2ch", "5ch", "ブログ",
  "ログイン", "公式", "ホームページ", "一覧", "ランキング", "無料"
]);

const BUILTIN_REMOVE_FRAGMENTS = [
  "とは", "って何", "とは何", "知恵袋", "Yahoo", "ヤフー", "なんj", "2ch", "5ch",
  "wiki", "wikipedia", "画像", "写真", "公式", "ホームページ"
];


const DOMAIN_RULES = [
  ["税務/事務", ["確定申告", "税金", "経費", "請求書", "領収書", "年末調整", "インボイス", "固定資産税", "相続税"]],
  ["SNS/発信", ["インスタ", "Instagram", "X", "Twitter", "投稿", "YouTube", "動画", "ショート", "TikTok", "note"]],
  ["副業/販売", ["副業", "売れない", "Kindle", "ココナラ", "BASE", "メルカリ", "minne", "BOOTH", "Redbubble", "Etsy"]],
  ["AI/自動化", ["ChatGPT", "AI", "プロンプト", "Gemini", "Claude", "自動化", "Notion", "Python"]],
  ["仕事/業務", ["仕事", "メール", "返信", "会議", "議事録", "Excel", "資料", "営業", "タスク"]],
  ["生活/家事", ["家計簿", "掃除", "料理", "洗濯", "片付け", "家事", "献立", "買い物"]],
  ["不動産/土地", ["土地", "山林", "農地", "空地", "空き地", "相続", "売却", "処分", "固定資産税", "駐車場"]],
  ["その他", []]
];

const PRODUCT_RULES = [
  ["テンプレ", ["テンプレ", "メール", "返信", "投稿", "家計簿", "Notion", "管理", "チェックリスト", "整理シート"]],
  ["代行", ["誰かやって", "返信", "投稿", "口コミ", "レビュー", "資料", "作成", "代行"]],
  ["比較表", ["比較", "おすすめ", "選び方", "ランキング", "どれ", "業者", "買取"]],
  ["自動化", ["自動化", "AI", "Python", "Notion", "Excel", "GAS"]],
  ["記事/調査", ["わからない", "続かない", "売れない", "理由", "方法", "処分", "相続", "固定資産税"]]
];

const REDDIT_MAP = [
  ["口コミ", ["review response template", "google review management", "customer review automation"]],
  ["インスタ", ["instagram content calendar", "social media posting automation", "instagram content ideas"]],
  ["確定申告", ["tax preparation checklist", "bookkeeping template", "freelance tax organization"]],
  ["土地", ["unwanted land", "inherited land problems", "land disposal", "property tax burden"]],
  ["山林", ["forest land management", "inherited woodland", "unwanted forest land"]],
  ["農地", ["farmland inheritance", "farmland lease", "unwanted farmland"]],
  ["Notion", ["notion productivity template", "notion habit tracker", "notion task management"]],
  ["note", ["newsletter growth", "ebook marketing", "content monetization", "creator monetization"]],
  ["Kindle", ["self publishing marketing", "kindle book promotion", "ebook sales"]],
  ["メール", ["email response template", "email automation", "customer support templates"]],
  ["Excel", ["excel automation", "spreadsheet automation", "business spreadsheet template"]],
  ["AI", ["AI automation service", "AI workflow", "AI content editing"]]
];

let running = false;
let stopFlag = false;
let rawRows = [];
let marketRows = [];
let seedRows = [];
let crossRows = [];
let nextSeedRows = [];
let briefRows = [];
let redditRows = [];
let suggestCache = {};
let settings = { ...DEFAULT_SETTINGS };

const $ = (id) => document.getElementById(id);


// ===== Web app compatibility shim =====
// Chrome拡張の chrome.storage.local を、Webアプリでは localStorage で代替する。
(function setupWebStorageShim() {
  if (typeof window === "undefined") return;
  window.chrome = window.chrome || {};
  chrome.storage = chrome.storage || {};
  if (chrome.storage.local) return;

  const PREFIX = "marketRadar:";

  chrome.storage.local = {
    async get(keys) {
      const out = {};
      const read = (key) => {
        const raw = localStorage.getItem(PREFIX + key);
        if (raw == null) return undefined;
        try { return JSON.parse(raw); } catch { return raw; }
      };

      if (Array.isArray(keys)) {
        keys.forEach(key => {
          const value = read(key);
          if (value !== undefined) out[key] = value;
        });
        return out;
      }

      if (typeof keys === "string") {
        const value = read(keys);
        return value === undefined ? {} : { [keys]: value };
      }

      if (keys && typeof keys === "object") {
        Object.keys(keys).forEach(key => {
          const value = read(key);
          out[key] = value === undefined ? keys[key] : value;
        });
        return out;
      }

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith(PREFIX)) continue;
        const shortKey = key.slice(PREFIX.length);
        out[shortKey] = read(shortKey);
      }
      return out;
    },

    async set(obj) {
      Object.entries(obj || {}).forEach(([key, value]) => {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
      });
    }
  };
})();


document.addEventListener("DOMContentLoaded", init);

async function init() {
  await loadState();
  renderSeedPresetSelect();
  renderFilterPresetSelect();
  renderWeightPanel();
  bindEvents();
  applySettingsToUI();
  renderAllEmpty();
  forceEnableMapButtons();
}

function on(id, eventName, handler) {
  const el = $(id);
  if (!el) {
    console.warn(`[Market Radar] missing element: #${id}`);
    return null;
  }
  el.addEventListener(eventName, handler);
  return el;
}

function forceEnableMapButtons() {
  [
    "renderStructureBtn",
    "renderTreemapBtn",
    "renderRelationBtn",
    "downloadStructureSvgBtn"
  ].forEach(id => {
    const el = $(id);
    if (el) el.disabled = false;
  });
}

function bindEvents() {
  on("startBtn", "click", () => run(false));
  on("testBtn", "click", () => run(true));
  on("stopBtn", "click", () => {
    stopFlag = true;
    log("停止要求を受け付けました。");
  });

  on("downloadMarket", "click", () => downloadCsv("market_friction_ranking.csv", marketRows));
  on("downloadSeed", "click", () => downloadCsv("seed_rankings.csv", seedRows));
  on("downloadRaw", "click", () => downloadCsv("raw_extracted_phrases.csv", rawRows));
  on("downloadBriefs", "click", () => downloadCsv("product_briefs.csv", briefRows));
  on("downloadReddit", "click", () => downloadCsv("reddit_search_terms.csv", redditRows));

  on("loadPreset", "click", loadSelectedSeedPreset);
  on("savePreset", "click", saveCurrentSeedPreset);
  on("deletePreset", "click", deleteSelectedSeedPreset);

  on("loadFilterPreset", "click", loadSelectedFilterPreset);
  on("saveFilterPreset", "click", saveCurrentFilterPreset);
  on("deleteFilterPreset", "click", deleteSelectedFilterPreset);

  on("saveSettings", "click", saveAllSettings);
  on("resetSettings", "click", resetSettings);
  on("clearCacheBtn", "click", clearSuggestCache);

  ["productFilter", "weightMode", "matchMode", "depthMode"].forEach(id => {
    $(id)?.addEventListener("change", async () => {
      await saveAllSettings();
      rerenderFromCurrent();
      forceEnableMapButtons();
    });
  });

  ["treemapSizeMetric", "treemapColorMetric", "treemapTopN"].forEach(id => {
    $(id)?.addEventListener("change", () => {
      renderTreemap(marketRows);
      forceEnableMapButtons();
    });
  });
  on("renderTreemapBtn", "click", () => {
    renderTreemap(marketRows);
    forceEnableMapButtons();
  });

  ["relationSeedFilter", "relationTopN", "relationMinWeight"].forEach(id => {
    $(id)?.addEventListener("change", () => {
      renderRelationMap();
      forceEnableMapButtons();
    });
  });
  on("renderRelationBtn", "click", () => {
    renderRelationMap();
    forceEnableMapButtons();
  });

  [
    "structureThemeName",
    "structureTopN",
    "structureColorMode",
    "structureEdgeMode",
    "structureLabelMode",
    "structureViewMode"
  ].forEach(id => {
    $(id)?.addEventListener("change", () => {
      renderStructureMap();
      forceEnableMapButtons();
    });
  });

  on("renderStructureBtn", "click", () => {
    renderStructureMap();
    forceEnableMapButtons();
  });

  on("downloadStructureSvgBtn", "click", () => {
    downloadStructureSvg();
    forceEnableMapButtons();
  });

  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      ["market", "treemap", "relation", "structure", "seed", "cross", "next", "briefs", "reddit", "raw"].forEach(t => {
        const view = $(t + "View");
        if (view) view.classList.toggle("hidden", t !== btn.dataset.tab);
      });

      if (btn.dataset.tab === "treemap") renderTreemap(marketRows);
      if (btn.dataset.tab === "relation") renderRelationMap();
      if (btn.dataset.tab === "structure") renderStructureMap();

      forceEnableMapButtons();
    });
  });

  forceEnableMapButtons();
}

async function loadState() {
  const stored = await chrome.storage.local.get([
    "seedPresets", "filterPresets", "settings", "hardExcludeWords", "penaltyWords", "priorityWords",
    "normalizationRules", "matchMode", "weightMode", "depthMode", "suggestCache", "useCache", "proxyUrl"
  ]);

  settings = { ...DEFAULT_SETTINGS, ...(stored.settings || {}) };
  window.seedPresets = stored.seedPresets || DEFAULT_SEED_PRESETS;
  window.filterPresets = stored.filterPresets || DEFAULT_FILTER_PRESETS;
  suggestCache = stored.suggestCache || {};

  if (stored.hardExcludeWords) $("hardExcludeWords").value = stored.hardExcludeWords;
  if (stored.penaltyWords) $("penaltyWords").value = stored.penaltyWords;
  if (stored.priorityWords) $("priorityWords").value = stored.priorityWords;
  if (stored.normalizationRules) $("normalizationRules").value = stored.normalizationRules;
  if (stored.matchMode) $("matchMode").value = stored.matchMode;
  if (stored.weightMode) $("weightMode").value = stored.weightMode;
  if (stored.depthMode) $("depthMode").value = stored.depthMode;
  if (stored.useCache !== undefined) $("useCache").checked = !!stored.useCache;
  if (stored.proxyUrl && $("proxyUrl")) $("proxyUrl").value = stored.proxyUrl;
}

async function saveAllSettings() {
  collectSettingsFromUI();
  await chrome.storage.local.set({
    settings,
    hardExcludeWords: $("hardExcludeWords").value,
    penaltyWords: $("penaltyWords").value,
    priorityWords: $("priorityWords").value,
    normalizationRules: $("normalizationRules").value,
    matchMode: $("matchMode").value,
    weightMode: $("weightMode").value,
    depthMode: $("depthMode").value,
    useCache: $("useCache").checked,
    proxyUrl: $("proxyUrl")?.value || ""
  });
  log("設定を保存しました。");
}

function collectSettingsFromUI() {
  Object.keys(DEFAULT_SETTINGS).forEach(key => {
    if ($(key)) settings[key] = Number($(key).value);
  });
}

function renderWeightPanel() {
  const defs = [
    ["rankWeightCoef", "順位重み", 0, 100],
    ["crossWeightCoef", "横断重み", 0, 100],
    ["productWeightCoef", "商品化重み", 0, 50],
    ["excludePenaltyCoef", "減点", 0, 50],
    ["repeatBonus", "反復B", 0, 50],
    ["payerBonus", "支払いB", 0, 50],
    ["priorityBonus", "優先加点", 0, 50],
    ["depth1QueryWeight", "一段目Q", 0, 3],
    ["depth2QueryWeight", "二段目Q", 0, 3]
  ];

  const panel = $("weightPanel");
  panel.innerHTML = "";
  defs.forEach(([key, label, min, max]) => {
    const step = max <= 3 ? "0.05" : "1";
    const row = document.createElement("div");
    row.className = "setting-row";
    row.innerHTML = `
      <label class="small">${label}</label>
      <input type="range" id="${key}" min="${min}" max="${max}" step="${step}" value="${settings[key]}">
      <span id="${key}_value" class="small">${settings[key]}</span>
    `;
    panel.appendChild(row);
  });

  defs.forEach(([key]) => {
    $(key).addEventListener("input", () => {
      settings[key] = Number($(key).value);
      $(`${key}_value`).textContent = settings[key];
      rerenderFromCurrent();
    });
  });
}

function applySettingsToUI() {
  Object.keys(settings).forEach(key => {
    if ($(key)) {
      $(key).value = settings[key];
      if ($(`${key}_value`)) $(`${key}_value`).textContent = settings[key];
    }
  });
}

async function resetSettings() {
  settings = { ...DEFAULT_SETTINGS };
  renderWeightPanel();
  applySettingsToUI();
  await saveAllSettings();
  rerenderFromCurrent();
}

function renderSeedPresetSelect() {
  const sel = $("presetSelect");
  sel.innerHTML = "";
  Object.keys(window.seedPresets || DEFAULT_SEED_PRESETS).forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    sel.appendChild(opt);
  });
}

function loadSelectedSeedPreset() {
  const name = $("presetSelect").value;
  const arr = (window.seedPresets || {})[name] || [];
  $("seedText").value = arr.join("\n");
  $("presetName").value = name;
}

async function saveCurrentSeedPreset() {
  const name = normalize($("presetName").value);
  if (!name) return alert("seedセット名を入力してください。");
  window.seedPresets = window.seedPresets || {};
  window.seedPresets[name] = getSeeds(false);
  await chrome.storage.local.set({ seedPresets: window.seedPresets });
  renderSeedPresetSelect();
  $("presetSelect").value = name;
  log(`seedセットを保存: ${name}`);
}

async function deleteSelectedSeedPreset() {
  const name = $("presetSelect").value;
  if (!name || !window.seedPresets?.[name]) return;
  if (!confirm(`削除しますか？ ${name}`)) return;
  delete window.seedPresets[name];
  await chrome.storage.local.set({ seedPresets: window.seedPresets });
  renderSeedPresetSelect();
  log(`seedセットを削除: ${name}`);
}

function renderFilterPresetSelect() {
  const sel = $("filterPresetSelect");
  sel.innerHTML = "";
  Object.keys(window.filterPresets || DEFAULT_FILTER_PRESETS).forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    sel.appendChild(opt);
  });
}

function loadSelectedFilterPreset() {
  const name = $("filterPresetSelect").value;
  const set = (window.filterPresets || {})[name];
  if (!set) return;
  $("hardExcludeWords").value = set.hardExcludeWords || "";
  $("penaltyWords").value = set.penaltyWords || "";
  $("priorityWords").value = set.priorityWords || "";
  $("filterPresetName").value = name;
  saveAllSettings();
  rerenderFromCurrent();
}

async function saveCurrentFilterPreset() {
  const name = normalize($("filterPresetName").value);
  if (!name) return alert("フィルターセット名を入力してください。");
  window.filterPresets = window.filterPresets || {};
  window.filterPresets[name] = {
    hardExcludeWords: $("hardExcludeWords").value,
    penaltyWords: $("penaltyWords").value,
    priorityWords: $("priorityWords").value
  };
  await chrome.storage.local.set({ filterPresets: window.filterPresets });
  renderFilterPresetSelect();
  $("filterPresetSelect").value = name;
  log(`フィルターセットを保存: ${name}`);
}

async function deleteSelectedFilterPreset() {
  const name = $("filterPresetSelect").value;
  if (!name || !window.filterPresets?.[name]) return;
  if (!confirm(`削除しますか？ ${name}`)) return;
  delete window.filterPresets[name];
  await chrome.storage.local.set({ filterPresets: window.filterPresets });
  renderFilterPresetSelect();
  log(`フィルターセットを削除: ${name}`);
}

async function clearSuggestCache() {
  suggestCache = {};
  await chrome.storage.local.set({ suggestCache });
  log("キャッシュを削除しました。");
}

function getSeeds(limit2 = false) {
  const seeds = $("seedText").value.split(/\r?\n/).map(normalize).filter(Boolean);
  return limit2 ? seeds.slice(0, 2) : seeds;
}

function getWordList(id) {
  return $(id).value.split(/\r?\n/).map(normalize).filter(Boolean);
}

async function run(limit2) {
  if (running) return;
  running = true;
  stopFlag = false;
  rawRows = [];
  marketRows = [];
  seedRows = [];
  crossRows = [];
  nextSeedRows = [];
  briefRows = [];
  redditRows = [];

  setButtonsRunning(true);
  clearStatus();
  collectSettingsFromUI();
  await saveAllSettings();

  const seeds = getSeeds(limit2);
  const waitMs = Math.max(0, Number($("waitSec").value || 1)) * 1000;
  const depthMode = $("depthMode").value;
  let fail = 0;
  let queryCount = 0;

  log(`開始：${seeds.length} seed / Google Suggest`);

  for (let i = 0; i < seeds.length; i++) {
    if (stopFlag) break;
    const seed = seeds[i];

    try {
      log(`[${i + 1}/${seeds.length}] 一段目: ${seed}`);
      const first = await fetchSuggest(seed);
      queryCount++;

      if (!first.length) {
        fail++;
        log(`  候補なし: ${seed}`);
        continue;
      }

      addSuggestRows({ seed, query: seed, suggestions: first, depth: 1, queryWeight: settings.depth1QueryWeight });
      log(`  一段目: ${first.length}件`);

      const secondQueries = chooseSecondQueries(first, depthMode);
      for (let j = 0; j < secondQueries.length; j++) {
        if (stopFlag) break;
        const q = secondQueries[j];
        await sleep(waitMs);
        log(`  二段目[${j + 1}/${secondQueries.length}]: ${q}`);
        const second = await fetchSuggest(q);
        queryCount++;
        addSuggestRows({ seed, query: q, suggestions: second, depth: 2, queryWeight: settings.depth2QueryWeight });
        log(`    ${second.length}件`);
      }

      if (i < seeds.length - 1) await sleep(waitMs);
    } catch (e) {
      fail++;
      log(`  エラー: ${seed} / ${e.message || e}`);
    }
  }

  await chrome.storage.local.set({ suggestCache });
  buildAnalysis(seeds, fail, queryCount);
  setButtonsRunning(false);
  running = false;
  log("完了");
}

function chooseSecondQueries(firstSuggestions, depthMode) {
  if (depthMode === "none") return [];
  if (depthMode === "top3") return firstSuggestions.slice(0, 3);
  if (depthMode === "top5") return firstSuggestions.slice(0, 5);
  return firstSuggestions;
}

async function fetchSuggest(query) {
  const q = normalize(query);
  if (!q) return [];

  const cacheKey = `google:${q}`;
  if ($("useCache")?.checked && suggestCache[cacheKey]) {
    return suggestCache[cacheKey];
  }

  const proxyUrl = normalize($("proxyUrl")?.value || "");
  const directUrl = SUGGEST_URL + encodeURIComponent(q);
  const url = proxyUrl
    ? `${proxyUrl.replace(/\/$/, "")}?q=${encodeURIComponent(q)}&hl=ja`
    : directUrl;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  const suggestions = Array.isArray(data?.[1]) ? data[1].map(normalize).filter(Boolean) : [];
  const uniqueSuggestions = unique(suggestions);

  suggestCache[cacheKey] = uniqueSuggestions;
  return uniqueSuggestions;
}

function addSuggestRows({ seed, query, suggestions, depth, queryWeight }) {
  const hardExcludeWords = getWordList("hardExcludeWords");

  suggestions.forEach((kw, index) => {
    const rank = index + 1;
    const coRawOriginal = extractCoWordFromSuggestion(kw, seed, query);
    const coRaw = cleanupCoWord(coRawOriginal);
    const co = normalizeCoWord(coRaw);
    const rowText = `${seed} ${query} ${kw} ${coRawOriginal} ${coRaw} ${co}`;

    if (!co) return;
    if (isLowValueCoWord(co)) return;
    if (hasWord(rowText, hardExcludeWords)) return;

    rawRows.push({
      seed_word: seed,
      query,
      depth,
      source: "google_suggest",
      rank,
      rank_weight: rankWeight(rank) * Number(queryWeight || 1),
      query_weight: Number(queryWeight || 1),
      keyword: kw,
      co_word_raw: coRaw,
      co_word: co
    });
  });
}


function cleanupCoWord(text) {
  let co = normalize(text);

  for (const frag of BUILTIN_REMOVE_FRAGMENTS) {
    co = co.replaceAll(frag, " ");
  }

  co = co
    .replace(/^[\s　\-ー・、。:：／/|]+/g, " ")
    .replace(/[\s　\-ー・、。:：／/|]+$/g, " ")
    .replace(/^(の|を|が|は|に|で|と|や|へ|から|まで|より)\s*/g, "")
    .replace(/\s*(の|を|が|は|に|で|と|や|へ|から|まで|より)$/g, "");

  co = normalize(co);

  // 先頭・末尾に残りやすい説明検索ノイズ
  co = co.replace(/^(とは|意味|読み方)\s*/g, "");
  co = co.replace(/\s*(とは|意味|読み方)$/g, "");

  return normalize(co);
}

function isLowValueCoWord(co) {
  co = normalize(co);
  if (!co) return true;
  if (BUILTIN_STOP_CO_WORDS.has(co)) return true;

  // 日本語1文字や英数字1〜2文字は広すぎるので除外。ただし税などの例外は後で必要なら追加。
  if (/^[\u3040-\u30ff\u3400-\u9fff]$/.test(co)) return true;
  if (/^[A-Za-z0-9]{1,2}$/.test(co)) return true;

  // 記号や助詞だけ
  if (/^[\s　\-ー・、。:：／/|]+$/.test(co)) return true;
  if (/^(とは|の|を|が|は|に|で|と|や|へ|から|まで|より)$/.test(co)) return true;

  return false;
}

function extractCoWordFromSuggestion(keyword, seed, query) {
  let co = normalize(keyword);

  const candidates = unique([query, seed]).sort((a, b) => b.length - a.length);
  for (const base of candidates) {
    if (base && seedMatchesPhrase(co, base)) {
      co = removeSeedFromPhrase(co, base);
      break;
    }
  }

  // query除去で空になりすぎる時はseedだけ除去
  if (!normalize(co)) {
    co = removeSeedFromPhrase(keyword, seed);
  }

  co = co.replace(/[｜|/／:：,，、。()\[\]【】「」『』]/g, " ");
  co = normalize(co);
  if (co.length > 42) co = co.slice(0, 42) + "…";
  return co;
}

function rerenderFromCurrent() {
  if (!rawRows.length) return;
  buildAnalysis(getSeeds(false), Number($("statFail").textContent || 0), Number($("statQueries").textContent || 0), true);
}

function buildAnalysis(seeds, fail, queryCount = 0, silent = false) {
  collectSettingsFromUI();

  const penaltyWords = getWordList("penaltyWords");
  const priorityWords = getWordList("priorityWords");

  const byCo = new Map();
  const bySeed = [];

  for (const r of rawRows) {
    const key = r.co_word;
    if (!key) continue;

    if (!byCo.has(key)) {
      byCo.set(key, {
        co_word: key,
        raw_variants: new Set(),
        total_rank_weight: 0,
        best_rank: 9999,
        seed_set: new Set(),
        query_set: new Set(),
        phrases: [],
        raw_count: 0,
        depth1_count: 0,
        depth2_count: 0
      });
    }

    const obj = byCo.get(key);
    obj.raw_variants.add(r.co_word_raw || r.co_word);
    obj.total_rank_weight += Number(r.rank_weight);
    obj.best_rank = Math.min(obj.best_rank, r.rank);
    obj.seed_set.add(r.seed_word);
    obj.query_set.add(r.query);
    obj.phrases.push(r.keyword);
    obj.raw_count += 1;
    if (Number(r.depth) === 1) obj.depth1_count += 1;
    if (Number(r.depth) === 2) obj.depth2_count += 1;

    const productAngle = classify(r.keyword, PRODUCT_RULES, "記事/調査");
    bySeed.push({
      seed_word: r.seed_word,
      query: r.query,
      depth: r.depth,
      rank: r.rank,
      rank_weight: round(r.rank_weight),
      co_word: r.co_word,
      co_word_raw: r.co_word_raw,
      phrase: r.keyword,
      source: r.source,
      domain: classify(r.keyword, DOMAIN_RULES, "その他"),
      product_angle: productAngle,
      product_score: productabilityScore(r.keyword, priorityWords)
    });
  }

  seedRows = bySeed.sort((a, b) => {
    if (a.seed_word !== b.seed_word) return a.seed_word.localeCompare(b.seed_word, "ja");
    if (a.depth !== b.depth) return a.depth - b.depth;
    return a.rank - b.rank;
  });

  crossRows = Array.from(byCo.values()).map(obj => {
    const text = `${obj.co_word} ${obj.phrases.join(" ")}`;
    const cross_seed_count = obj.seed_set.size;
    const product_score = productabilityScore(text, priorityWords);
    const exclude_risk = countWords(text, penaltyWords);
    const repeat_bonus = repeatBonus(text);
    const payer_bonus = payerBonus(text);
    const priority_bonus = countWords(text, priorityWords) > 0 ? 1 : 0;
    const product_angle = classify(text, PRODUCT_RULES, "記事/調査");
    const market_friction_score = calcMarketScore({
      totalWeight: obj.total_rank_weight,
      crossSeedCount: cross_seed_count,
      productScore: product_score,
      excludeRiskValue: exclude_risk,
      repeatBonusValue: repeat_bonus,
      payerBonusValue: payer_bonus,
      priorityBonusValue: priority_bonus
    });

    return {
      co_word: obj.co_word,
      raw_variants: Array.from(obj.raw_variants).join(" / "),
      cross_seed_count,
      query_count: obj.query_set.size,
      total_rank_weight: round(obj.total_rank_weight),
      best_rank: obj.best_rank,
      raw_count: obj.raw_count,
      depth1_count: obj.depth1_count,
      depth2_count: obj.depth2_count,
      market_friction_score,
      domain: classify(text, DOMAIN_RULES, "その他"),
      product_angle,
      product_score,
      repeat_bonus,
      payer_bonus,
      priority_bonus,
      exclude_risk,
      sample_phrases: unique(obj.phrases).slice(0, 5).join(" / "),
      seeds: Array.from(obj.seed_set).join(" / "),
      queries: Array.from(obj.query_set).slice(0, 5).join(" / ")
    };
  }).sort((a, b) => b.market_friction_score - a.market_friction_score);

  const filter = $("productFilter").value;
  marketRows = filter === "all" ? crossRows : crossRows.filter(r => r.product_angle === filter);

  nextSeedRows = generateNextSeeds(marketRows.slice(0, 80), seeds);
  briefRows = generateBriefs(marketRows.slice(0, 80));
  redditRows = generateRedditTerms(marketRows.slice(0, 100));

  const maxCross = crossRows.length ? Math.max(...crossRows.map(r => r.cross_seed_count)) : 0;

  $("statSeeds").textContent = seeds.length;
  $("statQueries").textContent = queryCount;
  $("statRows").textContent = rawRows.length;
  $("statCo").textContent = crossRows.length;
  $("statCross").textContent = maxCross;
  $("statFail").textContent = fail;

  $("downloadMarket").disabled = marketRows.length === 0;
  $("downloadSeed").disabled = seedRows.length === 0;
  $("downloadRaw").disabled = rawRows.length === 0;
  $("downloadBriefs").disabled = briefRows.length === 0;
  $("downloadReddit").disabled = redditRows.length === 0;

  renderMarket(marketRows.slice(0, Number($("topN")?.value || 120)));
  renderTreemap(marketRows);
  renderRelationMap();
  renderStructureMap();
  renderSeed(seedRows.slice(0, 800));
  renderCross(crossRows.slice(0, 400));
  renderNext(nextSeedRows.slice(0, 300));
  renderBriefs(briefRows.slice(0, 200));
  renderReddit(redditRows.slice(0, 300));
  renderRaw(rawRows.slice(0, 1000));

  if (!silent) log(`ランキング生成: ${marketRows.length}件`);
}

function renderAllEmpty() {
  renderTreemap([]);
  renderRelationMap();
  renderStructureMap();
}

/* ===== Analysis helpers ===== */
function rankWeight(rank) {
  rank = Math.max(1, Number(rank || 9999));
  const mode = $("weightMode").value;
  if (mode === "inverse") return 1 / rank;
  if (mode === "linear") {
    if (rank === 1) return 1.00;
    if (rank <= 3) return 0.90;
    if (rank <= 5) return 0.75;
    if (rank <= 10) return 0.55;
    if (rank <= 20) return 0.35;
    if (rank <= 50) return 0.18;
    return 0.08;
  }
  return 1 / Math.sqrt(rank);
}

function productabilityScore(text, priorityWords) {
  let s = 1;
  if (/テンプレ|自動化|比較|おすすめ|返信|投稿|管理|売れない|チェックリスト|作成|処分|相談|業者/.test(text)) s += 2;
  if (/確定申告|口コミ|インスタ|メール|家計簿|副業|Kindle|note|Notion|Excel|商品説明|動画編集|固定資産税|相続|土地|農地|山林/.test(text)) s += 1;
  if (/店舗|個人事業主|副業|販売|集客|レビュー|相続|税金|不動産|業者/.test(text)) s += 1;
  if (priorityWords.some(w => text.includes(w))) s += 1;
  return Math.max(1, Math.min(5, s));
}

function repeatBonus(text) {
  return /毎日|毎週|投稿|返信|管理|記録|習慣|継続|定期|月次|日報|家計簿|確定申告|固定資産税|草刈り/.test(text) ? 1 : 0;
}

function payerBonus(text) {
  return /店舗|個人事業主|副業|販売|集客|レビュー|口コミ|確定申告|経費|請求書|法人|会社|営業|相続|固定資産税|不動産|業者|税理士|司法書士/.test(text) ? 1 : 0;
}

function calcMarketScore({ totalWeight, crossSeedCount, productScore, excludeRiskValue, repeatBonusValue, payerBonusValue, priorityBonusValue }) {
  const score =
    totalWeight * settings.rankWeightCoef +
    Math.log2(crossSeedCount + 1) * settings.crossWeightCoef +
    productScore * settings.productWeightCoef +
    repeatBonusValue * settings.repeatBonus +
    payerBonusValue * settings.payerBonus +
    priorityBonusValue * settings.priorityBonus -
    excludeRiskValue * settings.excludePenaltyCoef;
  return round(Math.max(0, score));
}

function generateNextSeeds(rows, currentSeeds) {
  const current = new Set(currentSeeds);
  const suffixes = ["めんどくさい", "わからない", "続かない", "売れない", "自動化したい", "テンプレ", "比較", "代行", "方法", "費用"];
  const out = [];
  const seen = new Set();

  for (const row of rows) {
    for (const suf of suffixes) {
      const seed = `${row.co_word} ${suf}`;
      if (current.has(seed) || seen.has(seed)) continue;
      seen.add(seed);
      out.push({
        suggested_seed: seed,
        source_co_word: row.co_word,
        source_score: row.market_friction_score,
        reason: `${row.co_word}が上位。${suf}軸で深掘り候補`,
        product_angle: row.product_angle,
        domain: row.domain
      });
    }
  }
  return out.sort((a, b) => b.source_score - a.source_score);
}

function generateBriefs(rows) {
  return rows.map(row => ({
    target_word: row.co_word,
    market_friction_score: row.market_friction_score,
    observed_complaints: row.seeds,
    searcher_pain: `${row.co_word}について、${row.seeds} 系の検索から関連が見える`,
    product_angle: row.product_angle,
    target_customer: inferCustomer(row),
    minimum_product: inferMinProduct(row),
    sales_channel: inferChannel(row),
    next_keywords: generateNextSeeds([row], []).slice(0, 5).map(x => x.suggested_seed).join(" / "),
    reddit_terms: redditTermsFor(row.co_word).join(" / "),
    sample_phrases: row.sample_phrases
  }));
}

function generateRedditTerms(rows) {
  const out = [];
  for (const row of rows) {
    redditTermsFor(row.co_word).forEach(term => {
      out.push({
        co_word: row.co_word,
        reddit_query: term,
        suggested_search: `site:reddit.com ${term}`,
        product_angle: row.product_angle,
        market_friction_score: row.market_friction_score
      });
    });
  }
  return out;
}

function redditTermsFor(coWord) {
  for (const [jp, terms] of REDDIT_MAP) {
    if (coWord.includes(jp)) return terms;
  }
  if (/^[A-Za-z0-9\s]+$/.test(coWord)) {
    return [`${coWord} template`, `${coWord} automation`, `${coWord} problem`, `${coWord} workflow`];
  }
  return [`"${coWord}" problem`, `"${coWord}" template`, `"${coWord}" automation`];
}

function inferCustomer(row) {
  const t = `${row.co_word} ${row.sample_phrases}`;
  if (/土地|山林|農地|固定資産税|相続/.test(t)) return "相続・不要不動産に困っている個人";
  if (/店舗|口コミ|インスタ|集客|レビュー/.test(t)) return "小規模店舗・個人事業主";
  if (/副業|note|Kindle|ココナラ|売れない/.test(t)) return "副業者・個人クリエイター";
  if (/メール|Excel|仕事|資料|タスク/.test(t)) return "会社員・小規模事業者";
  return "検索者本人・小規模事業者";
}

function inferMinProduct(row) {
  if (/土地|山林|農地|相続|固定資産税/.test(`${row.co_word} ${row.sample_phrases}`)) return `${row.co_word}の情報整理シート / 相談準備チェックリスト`;
  if (row.product_angle === "テンプレ") return `${row.co_word}用テンプレ / チェックリスト`;
  if (row.product_angle === "代行") return `${row.co_word}代行パック`;
  if (row.product_angle === "比較表") return `${row.co_word}比較表 / 選び方ガイド`;
  if (row.product_angle === "自動化") return `${row.co_word}自動化ミニツール`;
  return `${row.co_word}の解決ガイド記事 / PDF`;
}

function inferChannel(row) {
  if (/土地|山林|農地|相続/.test(`${row.co_word} ${row.sample_phrases}`)) return "note / Kindle / PDF / 相談準備テンプレ";
  if (/テンプレ|チェックリスト|Notion|家計簿|Excel/.test(row.sample_phrases)) return "BOOTH / note / Gumroad / ココナラ";
  if (/代行|返信|投稿|口コミ/.test(row.sample_phrases)) return "ココナラ / ランサーズ";
  return "note / Kindle / テンプレ販売";
}

function classify(text, rules, fallback) {
  const lower = text.toLowerCase();
  for (const [label, keys] of rules) {
    for (const k of keys) if (lower.includes(k.toLowerCase())) return label;
  }
  return fallback;
}

/* ===== Matching / normalization ===== */
function hasWord(text, words) {
  return words.some(w => w && String(text || "").includes(w));
}

function countWords(text, words) {
  return words.reduce((n, w) => n + (w && String(text || "").includes(w) ? 1 : 0), 0);
}

function getNormalizationRules() {
  return getWordList("normalizationRules").map(line => {
    const [canonicalRaw, aliasesRaw] = line.split("=");
    const canonical = normalize(canonicalRaw);
    if (!canonical || !aliasesRaw) return null;
    const aliases = aliasesRaw.split(",").map(normalize).filter(Boolean);
    return { canonical, aliases: [canonical, ...aliases] };
  }).filter(Boolean);
}

function normalizeCoWord(co) {
  co = normalize(co);
  const lower = co.toLowerCase();
  for (const rule of getNormalizationRules()) {
    for (const alias of rule.aliases) {
      if (!alias) continue;
      if (lower === alias.toLowerCase() || lower.includes(alias.toLowerCase())) return rule.canonical;
    }
  }
  return co;
}

function seedMatchesPhrase(phrase, seed) {
  phrase = normalize(phrase);
  seed = normalize(seed);
  if (!phrase || !seed) return false;
  const mode = $("matchMode")?.value || "smart";
  if (mode === "substring") return phrase.includes(seed);
  if (mode === "strict") return tokenBoundaryMatch(phrase, seed);
  if (containsJapaneseOrCjk(seed)) return phrase.includes(seed);
  if (seed.length <= 3 || /^[A-Za-z0-9_]+$/.test(seed)) return tokenBoundaryMatch(phrase, seed);
  return phrase.toLowerCase().includes(seed.toLowerCase());
}

function tokenBoundaryMatch(phrase, seed) {
  const p = String(phrase || "");
  const s = String(seed || "");
  const lowerP = p.toLowerCase();
  const lowerS = s.toLowerCase();
  let idx = lowerP.indexOf(lowerS);
  while (idx !== -1) {
    const before = idx === 0 ? "" : p[idx - 1];
    const after = idx + s.length >= p.length ? "" : p[idx + s.length];
    if (!isAsciiWordChar(before) && !isAsciiWordChar(after)) return true;
    idx = lowerP.indexOf(lowerS, idx + 1);
  }
  return false;
}

function removeSeedFromPhrase(phrase, seed) {
  phrase = normalize(phrase);
  seed = normalize(seed);
  if (!phrase || !seed) return phrase;
  const mode = $("matchMode")?.value || "smart";
  if (mode === "substring" || containsJapaneseOrCjk(seed)) return phrase.replaceAll(seed, " ");
  const re = new RegExp(`(^|[^A-Za-z0-9_])(${escapeRegExp(seed)})(?=$|[^A-Za-z0-9_])`, "gi");
  return phrase.replace(re, "$1 ");
}

function escapeRegExp(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function isAsciiWordChar(ch) { return /[A-Za-z0-9_]/.test(ch || ""); }
function containsJapaneseOrCjk(s) { return /[\u3040-\u30ff\u3400-\u9fff]/.test(s || ""); }

/* ===== Rendering: tables ===== */
function renderMarket(rows) {
  renderTable("marketView", rows, [
    ["score", "market_friction_score", "市場摩擦"],
    ["text", "co_word", "対象語"],
    ["text", "raw_variants", "表記ゆれ"],
    ["text", "product_angle", "商品化"],
    ["num", "cross_seed_count", "横断seed"],
    ["num", "query_count", "出現query"],
    ["num", "total_rank_weight", "順位重み"],
    ["num", "best_rank", "最高順位"],
    ["num", "depth1_count", "一段目"],
    ["num", "depth2_count", "二段目"],
    ["text", "domain", "領域"],
    ["num", "product_score", "商品化S"],
    ["num", "exclude_risk", "減点"],
    ["text", "seeds", "出現seed"],
    ["text", "queries", "出現query例"],
    ["text", "sample_phrases", "例"]
  ]);
}

function renderSeed(rows) {
  renderTable("seedView", rows, [
    ["text", "seed_word", "seed"],
    ["text", "query", "取得query"],
    ["num", "depth", "深さ"],
    ["num", "rank", "順位"],
    ["num", "rank_weight", "順位重み"],
    ["text", "co_word", "対象語"],
    ["text", "phrase", "suggest phrase"],
    ["text", "domain", "領域"],
    ["text", "product_angle", "商品化"],
    ["num", "product_score", "商品化S"]
  ]);
}

function renderCross(rows) {
  renderTable("crossView", rows, [
    ["text", "co_word", "対象語"],
    ["text", "raw_variants", "表記ゆれ"],
    ["num", "cross_seed_count", "横断seed数"],
    ["num", "query_count", "出現query数"],
    ["num", "total_rank_weight", "順位重み合計"],
    ["num", "best_rank", "最高順位"],
    ["text", "seeds", "出現seed"],
    ["text", "sample_phrases", "例"]
  ]);
}

function renderNext(rows) {
  renderTable("nextView", rows, [
    ["text", "suggested_seed", "次seed"],
    ["text", "source_co_word", "元対象"],
    ["num", "source_score", "元スコア"],
    ["text", "product_angle", "商品化"],
    ["text", "domain", "領域"],
    ["text", "reason", "理由"]
  ]);
}

function renderBriefs(rows) {
  renderTable("briefsView", rows, [
    ["text", "target_word", "対象語"],
    ["num", "market_friction_score", "スコア"],
    ["text", "searcher_pain", "困り方"],
    ["text", "product_angle", "商品化"],
    ["text", "target_customer", "想定顧客"],
    ["text", "minimum_product", "最小商品"],
    ["text", "sales_channel", "販売先"],
    ["text", "next_keywords", "次キーワード"],
    ["text", "reddit_terms", "Reddit語"]
  ]);
}

function renderReddit(rows) {
  renderTable("redditView", rows, [
    ["text", "co_word", "対象語"],
    ["text", "reddit_query", "Reddit検索語"],
    ["text", "suggested_search", "検索式"],
    ["text", "product_angle", "商品化"],
    ["num", "market_friction_score", "スコア"]
  ]);
}

function renderRaw(rows) {
  renderTable("rawView", rows, [
    ["text", "seed_word", "seed"],
    ["text", "query", "query"],
    ["num", "depth", "深さ"],
    ["num", "rank", "順位"],
    ["num", "rank_weight", "順位重み"],
    ["text", "keyword", "suggest phrase"],
    ["text", "co_word_raw", "元対象語"],
    ["text", "co_word", "正規化対象語"],
    ["text", "source", "source"]
  ]);
}

function renderTable(targetId, rows, cols) {
  if (!rows || !rows.length) {
    $(targetId).innerHTML = '<div class="small" style="padding:14px;">なし</div>';
    return;
  }
  let html = "<table><thead><tr>";
  for (const [type, key, label] of cols) html += `<th class="${type === "num" || type === "score" ? "num" : ""}">${escapeHtml(label)}</th>`;
  html += "</tr></thead><tbody>";
  for (const r of rows) {
    html += "<tr>";
    for (const [type, key] of cols) {
      const cls = type === "num" || type === "score" ? "num" : "";
      const extra = type === "score" ? " score" : "";
      html += `<td class="${cls}${extra}">${escapeHtml(r[key])}</td>`;
    }
    html += "</tr>";
  }
  html += "</tbody></table>";
  $(targetId).innerHTML = html;
}

/* ===== Treemap ===== */
function renderTreemap(rows) {
  const container = $("treemap");
  if (!container) return;
  const tooltip = $("treemapTooltip");
  const topN = Number($("treemapTopN")?.value || 160);
  const sizeMetric = $("treemapSizeMetric")?.value || "score";
  const colorMetric = $("treemapColorMetric")?.value || "score";

  container.innerHTML = "";
  if (!rows || !rows.length) {
    container.innerHTML = '<div class="small" style="padding:14px;color:white;">まだデータがありません。</div>';
    return;
  }

  const data = rows.slice(0, topN).map(r => {
    let sizeValue = Number(r.market_friction_score || 0);
    if (sizeMetric === "rank_weight") sizeValue = Number(r.total_rank_weight || 0) * 100;
    if (sizeMetric === "cross") sizeValue = Number(r.cross_seed_count || 0) * 50;
    return { ...r, _sizeValue: Math.max(1, sizeValue) };
  });

  const rect = container.getBoundingClientRect();
  const width = Math.max(400, rect.width || container.clientWidth || 1000);
  const height = Math.max(360, container.clientHeight || 620);
  const layout = binaryTreemapLayout(data, 0, 0, width, height);
  const maxScore = Math.max(1, ...data.map(d => Number(d.market_friction_score || 0)));
  const maxProduct = Math.max(1, ...data.map(d => Number(d.product_score || 0)));
  const maxRisk = Math.max(1, ...data.map(d => Number(d.exclude_risk || 0)));

  for (const item of layout) {
    const r = item.data;
    const area = item.w * item.h;
    const tile = document.createElement("div");
    tile.className = "tile";
    if (area < 2600) tile.classList.add("tiny");
    if (area < 900) tile.classList.add("micro");
    tile.style.left = `${item.x}px`;
    tile.style.top = `${item.y}px`;
    tile.style.width = `${Math.max(1, item.w)}px`;
    tile.style.height = `${Math.max(1, item.h)}px`;
    tile.style.background = treemapColor(r, colorMetric, { maxScore, maxProduct, maxRisk });
    const fontSize = Math.max(9, Math.min(30, Math.sqrt(area) / 4.6));
    tile.innerHTML = `<div class="tile-inner"><div class="tile-word" style="font-size:${fontSize}px">${escapeHtml(r.co_word)}</div><div class="tile-score">${escapeHtml(r.market_friction_score)}</div><div class="tile-meta">${escapeHtml(r.product_angle)} / 横断${escapeHtml(r.cross_seed_count)}</div></div>`;
    tile.addEventListener("mouseenter", ev => {
      tooltip.style.display = "block";
      tooltip.innerHTML = `<b>${escapeHtml(r.co_word)}</b><br>市場摩擦: ${escapeHtml(r.market_friction_score)}<br>商品化: ${escapeHtml(r.product_angle)} / ${escapeHtml(r.domain)}<br>横断seed: ${escapeHtml(r.cross_seed_count)} / 最高順位: ${escapeHtml(r.best_rank)}<br>例: ${escapeHtml(r.sample_phrases)}`;
      positionTooltip(ev, tooltip);
    });
    tile.addEventListener("mousemove", ev => positionTooltip(ev, tooltip));
    tile.addEventListener("mouseleave", () => { tooltip.style.display = "none"; });
    tile.addEventListener("click", () => log(`HEATMAP: ${r.co_word} | score=${r.market_friction_score} | ${r.sample_phrases}`));
    container.appendChild(tile);
  }
}

function binaryTreemapLayout(data, x, y, w, h) {
  const items = data.filter(d => Number(d._sizeValue) > 0).sort((a, b) => b._sizeValue - a._sizeValue);
  const total = items.reduce((sum, d) => sum + d._sizeValue, 0) || 1;
  return splitTreemap(items, total, x, y, w, h);
}

function splitTreemap(items, total, x, y, w, h) {
  if (!items.length) return [];
  if (items.length === 1) return [{ data: items[0], x, y, w, h }];
  let acc = 0, splitIndex = 0;
  const half = total / 2;
  for (let i = 0; i < items.length; i++) {
    if (acc + items[i]._sizeValue <= half || i === 0) {
      acc += items[i]._sizeValue;
      splitIndex = i + 1;
    } else break;
  }
  const left = items.slice(0, splitIndex);
  const right = items.slice(splitIndex);
  const leftSum = left.reduce((s, d) => s + d._sizeValue, 0);
  const rightSum = Math.max(0, total - leftSum);
  if (!right.length) return [{ data: left[0], x, y, w, h }];
  if (w >= h) {
    const w1 = w * (leftSum / total);
    return [...splitTreemap(left, leftSum, x, y, w1, h), ...splitTreemap(right, rightSum, x + w1, y, w - w1, h)];
  } else {
    const h1 = h * (leftSum / total);
    return [...splitTreemap(left, leftSum, x, y, w, h1), ...splitTreemap(right, rightSum, x, y + h1, w, h - h1)];
  }
}

function treemapColor(r, metric, ctx) {
  if (metric === "domain") {
    const colors = { "税務/事務": "#2563eb", "SNS/発信": "#16a34a", "副業/販売": "#9333ea", "AI/自動化": "#0891b2", "仕事/業務": "#ea580c", "生活/家事": "#65a30d", "不動産/土地": "#be123c", "その他": "#64748b" };
    return colors[r.domain] || "#64748b";
  }
  if (metric === "risk") return gradientColor(Math.min(1, Number(r.exclude_risk || 0) / ctx.maxRisk), [22, 163, 74], [220, 38, 38]);
  if (metric === "product") return gradientColor(Math.min(1, Number(r.product_score || 0) / ctx.maxProduct), [71, 85, 105], [37, 99, 235]);
  return gradientColor(Math.min(1, Number(r.market_friction_score || 0) / ctx.maxScore), [20, 83, 45], [22, 163, 74]);
}

function gradientColor(t, a, b) {
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

/* ===== Relation map ===== */
function renderRelationMap() {
  const container = $("relationMap");
  if (!container) return;
  const tooltip = $("relationTooltip");
  container.innerHTML = "";

  const rows = rawRows.filter(r => r.co_word && r.seed_word);
  if (!rows.length) {
    container.innerHTML = '<div class="small" style="padding:14px;color:white;">まだデータがありません。一括取得後に表示されます。</div>';
    updateRelationSeedFilter([]);
    return;
  }

  const allSeeds = unique(rows.map(r => r.seed_word));
  updateRelationSeedFilter(allSeeds);

  const selectedSeed = $("relationSeedFilter")?.value || "all";
  const topN = Number($("relationTopN")?.value || 120);
  const minWeight = Number($("relationMinWeight")?.value || 0);

  const edgeMap = new Map();
  const coAgg = new Map();

  for (const r of rows) {
    if (selectedSeed !== "all" && r.seed_word !== selectedSeed) continue;
    const weight = Number(r.rank_weight || 0);
    if (weight < minWeight) continue;
    const edgeKey = `${r.seed_word}|||${r.co_word}`;
    if (!edgeMap.has(edgeKey)) edgeMap.set(edgeKey, { seed_word: r.seed_word, co_word: r.co_word, weight: 0, best_rank: 9999, phrases: [] });
    const edge = edgeMap.get(edgeKey);
    edge.weight += weight;
    edge.best_rank = Math.min(edge.best_rank, Number(r.rank || 9999));
    edge.phrases.push(r.keyword);
    if (!coAgg.has(r.co_word)) coAgg.set(r.co_word, { co_word: r.co_word, total_weight: 0, seed_set: new Set(), phrases: [], best_rank: 9999 });
    const co = coAgg.get(r.co_word);
    co.total_weight += weight;
    co.seed_set.add(r.seed_word);
    co.phrases.push(r.keyword);
    co.best_rank = Math.min(co.best_rank, Number(r.rank || 9999));
  }

  const topCos = Array.from(coAgg.values()).sort((a, b) => b.total_weight - a.total_weight).slice(0, topN);
  const coSet = new Set(topCos.map(c => c.co_word));
  const edges = Array.from(edgeMap.values()).filter(e => coSet.has(e.co_word));
  const seeds = selectedSeed === "all" ? unique(edges.map(e => e.seed_word)) : [selectedSeed];

  if (!edges.length) {
    container.innerHTML = '<div class="small" style="padding:14px;color:white;">該当する関係がありません。</div>';
    return;
  }

  const rect = container.getBoundingClientRect();
  const width = Math.max(800, rect.width || container.clientWidth || 1100);
  const height = Math.max(500, container.clientHeight || 680);
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  const seedNodes = seeds.map((seed, i) => ({
    type: "seed", label: seed, x: 120, y: distributeY(i, seeds.length, height),
    r: 18 + Math.min(14, edges.filter(e => e.seed_word === seed).length * 0.7)
  }));

  const coNodes = topCos.map((co, i) => {
    const cols = Math.max(1, Math.ceil(topCos.length / 28));
    const col = Math.floor(i / 28);
    const row = i % 28;
    const xStart = width * 0.38;
    const xEnd = width - 120;
    const x = cols === 1 ? width * 0.72 : xStart + (xEnd - xStart) * (col / Math.max(1, cols - 1));
    const y = distributeY(row, Math.min(28, topCos.length - col * 28), height);
    return {
      type: "co", label: co.co_word, x, y,
      r: 8 + Math.min(22, Math.sqrt(co.total_weight) * 7),
      total_weight: co.total_weight,
      seed_count: co.seed_set.size,
      best_rank: co.best_rank,
      phrases: unique(co.phrases).slice(0, 5).join(" / ")
    };
  });

  const nodeByKey = new Map();
  [...seedNodes, ...coNodes].forEach(n => nodeByKey.set(n.label, n));
  const maxEdge = Math.max(0.01, ...edges.map(e => e.weight));

  for (const edge of edges) {
    const a = nodeByKey.get(edge.seed_word);
    const b = nodeByKey.get(edge.co_word);
    if (!a || !b) continue;
    const path = document.createElementNS(svgNS, "path");
    const midX = (a.x + b.x) / 2;
    path.setAttribute("d", `M ${a.x + a.r} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x - b.r} ${b.y}`);
    path.setAttribute("class", edge.weight / maxEdge > 0.55 ? "relation-edge strong" : "relation-edge");
    path.setAttribute("stroke-width", String(0.8 + (edge.weight / maxEdge) * 5));
    path.addEventListener("mouseenter", ev => {
      tooltip.style.display = "block";
      tooltip.innerHTML = `<b>${escapeHtml(edge.seed_word)} → ${escapeHtml(edge.co_word)}</b><br>edge重み: ${round(edge.weight)}<br>最高順位: ${escapeHtml(edge.best_rank)}<br>例: ${escapeHtml(unique(edge.phrases).slice(0, 4).join(" / "))}`;
      positionTooltip(ev, tooltip);
    });
    path.addEventListener("mousemove", ev => positionTooltip(ev, tooltip));
    path.addEventListener("mouseleave", () => { tooltip.style.display = "none"; });
    svg.appendChild(path);
  }

  for (const node of [...seedNodes, ...coNodes]) {
    const g = document.createElementNS(svgNS, "g");
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", node.x);
    circle.setAttribute("cy", node.y);
    circle.setAttribute("r", node.r);
    circle.setAttribute("class", node.type === "seed" ? "relation-node-seed" : "relation-node-co");
    g.appendChild(circle);

    const label = document.createElementNS(svgNS, "text");
    label.setAttribute("x", node.type === "seed" ? node.x - node.r - 8 : node.x + node.r + 7);
    label.setAttribute("y", node.y + 4);
    label.setAttribute("text-anchor", node.type === "seed" ? "end" : "start");
    label.setAttribute("class", node.type === "seed" ? "relation-label seed" : "relation-label");
    label.textContent = truncateLabel(node.label, node.type === "seed" ? 18 : 24);
    g.appendChild(label);

    g.addEventListener("mouseenter", ev => {
      tooltip.style.display = "block";
      if (node.type === "seed") {
        const related = edges.filter(e => e.seed_word === node.label).sort((a, b) => b.weight - a.weight).slice(0, 8);
        tooltip.innerHTML = `<b>検索元seed: ${escapeHtml(node.label)}</b><br>関連対象語: ${related.length}<br>${escapeHtml(related.map(e => `${e.co_word}(${round(e.weight)})`).join(" / "))}`;
      } else {
        tooltip.innerHTML = `<b>対象語: ${escapeHtml(node.label)}</b><br>合計重み: ${round(node.total_weight)}<br>横断seed数: ${escapeHtml(node.seed_count)}<br>最高順位: ${escapeHtml(node.best_rank)}<br>例: ${escapeHtml(node.phrases)}`;
      }
      positionTooltip(ev, tooltip);
    });
    g.addEventListener("mousemove", ev => positionTooltip(ev, tooltip));
    g.addEventListener("mouseleave", () => { tooltip.style.display = "none"; });
    g.addEventListener("click", () => log(`RELATION: ${node.type === "seed" ? "seed" : "target"} | ${node.label}`));
    svg.appendChild(g);
  }

  container.appendChild(svg);
}

function updateRelationSeedFilter(seeds) {
  const select = $("relationSeedFilter");
  if (!select) return;
  const current = select.value || "all";
  const desired = ["all", ...seeds];
  const existing = Array.from(select.options).map(o => o.value);
  if (existing.join("|||") === desired.join("|||")) return;
  select.innerHTML = "";
  for (const seed of desired) {
    const option = document.createElement("option");
    option.value = seed;
    option.textContent = seed === "all" ? "すべて" : seed;
    select.appendChild(option);
  }
  if (desired.includes(current)) select.value = current;
}

/* ===== Structure map ===== */
const seedColors = ["#0ea5e9", "#22c55e", "#f59e0b", "#ec4899", "#8b5cf6", "#14b8a6", "#ef4444", "#84cc16", "#06b6d4", "#f97316", "#6366f1", "#a855f7"];

function renderStructureMap() {
  const container = $("structureMap");
  if (!container) return;
  const tooltip = $("structureTooltip");
  container.innerHTML = "";

  const raw = rawRows.filter(r => r.co_word && r.seed_word);
  if (!raw.length) {
    container.innerHTML = '<div class="small" style="padding:14px;color:#0f172a;">まだデータがありません。一括取得後に表示されます。</div>';
    return;
  }

  const theme = ($("structureThemeName")?.value || "検索セット").trim();
  const topN = Number($("structureTopN")?.value || 120);
  const colorMode = $("structureColorMode")?.value || "seed";
  const edgeMode = $("structureEdgeMode")?.value || "all";
  const labelMode = $("structureLabelMode")?.value || "important";
  const viewMode = $("structureViewMode")?.value || "overview";

  const marketByCo = new Map();
  for (const m of marketRows) if (m.co_word) marketByCo.set(m.co_word, m);

  const coAgg = new Map();
  const edgeMap = new Map();

  for (const r of raw) {
    const weight = Number(r.rank_weight || 0);
    const edgeKey = `${r.seed_word}|||${r.co_word}`;
    if (!edgeMap.has(edgeKey)) edgeMap.set(edgeKey, { seed_word: r.seed_word, co_word: r.co_word, weight: 0, best_rank: 9999, phrases: [] });
    const e = edgeMap.get(edgeKey);
    e.weight += weight;
    e.best_rank = Math.min(e.best_rank, Number(r.rank || 9999));
    e.phrases.push(r.keyword);

    if (!coAgg.has(r.co_word)) coAgg.set(r.co_word, { co_word: r.co_word, total_weight: 0, seed_set: new Set(), phrases: [], best_rank: 9999 });
    const c = coAgg.get(r.co_word);
    c.total_weight += weight;
    c.seed_set.add(r.seed_word);
    c.phrases.push(r.keyword);
    c.best_rank = Math.min(c.best_rank, Number(r.rank || 9999));
  }

  const coItems = Array.from(coAgg.values()).map(c => {
    const m = marketByCo.get(c.co_word) || {};
    return {
      ...c,
      market_score: Number(m.market_friction_score || c.total_weight * 40 || 0),
      product_angle: m.product_angle || "",
      domain: m.domain || "",
      seed_count: c.seed_set.size
    };
  }).sort((a, b) => (b.market_score - a.market_score) || (b.total_weight - a.total_weight)).slice(0, topN);

  const coSet = new Set(coItems.map(c => c.co_word));
  const edges = Array.from(edgeMap.values()).filter(e => coSet.has(e.co_word));
  if (!edges.length) {
    container.innerHTML = '<div class="small" style="padding:14px;color:#0f172a;">該当する関係がありません。</div>';
    return;
  }

  const seeds = unique(edges.map(e => e.seed_word));
  const seedIndex = new Map(seeds.map((s, i) => [s, i]));
  const rect = container.getBoundingClientRect();
  const width = Math.max(960, rect.width || container.clientWidth || 1200);
  const height = Math.max(620, container.clientHeight || 720);
  const cx = width / 2;
  const cy = height / 2;
  const centerR = 48;

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  const title = document.createElementNS(svgNS, "text");
  title.setAttribute("x", 20);
  title.setAttribute("y", 30);
  title.setAttribute("class", "structure-bg-title");
  title.textContent = `${theme} 構造マップ`;
  svg.appendChild(title);

  const seedRadius = Math.min(width, height) * 0.39;

  const seedScore = new Map();
  for (const e of edges) {
    seedScore.set(e.seed_word, (seedScore.get(e.seed_word) || 0) + Number(e.weight || 0));
  }
  const maxSeedScore = Math.max(1, ...Array.from(seedScore.values()));

  const seedNodes = seeds.map((seed, i) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * i / Math.max(1, seeds.length));
    const scoreRatio = Math.sqrt((seedScore.get(seed) || 0) / maxSeedScore);
    return {
      type: "seed",
      label: seed,
      x: cx + Math.cos(angle) * seedRadius,
      y: cy + Math.sin(angle) * seedRadius,
      r: 22 + Math.pow(scoreRatio, 1.8) * 44,
      color: seedColors[i % seedColors.length],
      angle,
      score: round(seedScore.get(seed) || 0)
    };
  });

  const seedByLabel = new Map(seedNodes.map(n => [n.label, n]));
  const maxScore = Math.max(1, ...coItems.map(c => Number(c.market_score || 0)));
  const maxEdge = Math.max(0.01, ...edges.map(e => e.weight));

  const groupedSingle = new Map();
  const crossItems = [];

  for (const co of coItems) {
    const relatedSeeds = Array.from(co.seed_set).filter(s => seedByLabel.has(s));
    if (relatedSeeds.length === 1) {
      const s = relatedSeeds[0];
      if (!groupedSingle.has(s)) groupedSingle.set(s, []);
      groupedSingle.get(s).push(co);
    } else {
      crossItems.push(co);
    }
  }

  const coNodes = [];

  function makeCoNode(co, x, y, relatedSeeds, rankIndex) {
    const m = marketByCo.get(co.co_word) || {};
    const score = Number(m.market_friction_score || co.total_weight * 40 || 0);
    const scoreRatio = Math.sqrt(Math.max(0, score) / maxScore);
    const crossBonus = relatedSeeds.length >= 2 ? 2.5 : 0;

    return {
      type: "co",
      label: co.co_word,
      x,
      y,

      // ここを変更
      r: 3.5 + Math.pow(scoreRatio, 2.0) * 30 + crossBonus,

      // ここも変更
      collisionR: 10 + Math.pow(scoreRatio, 1.6) * 36 + Math.min(18, String(co.co_word || "").length * 0.75),

      seed_count: relatedSeeds.length,
      total_weight: co.total_weight,
      market_score: score,
      best_rank: co.best_rank,
      phrases: unique(co.phrases).slice(0, 5).join(" / "),
      product_angle: m.product_angle || "",
      domain: m.domain || "",
      relatedSeeds,
      rankIndex,
      showLabel: false
    };
  }

  // 単一seedだけに出る語は、中央へ吸わせず、seed方向の扇形エリアへ散らす。
  for (const seed of seedNodes) {
    const items = groupedSingle.get(seed.label) || [];
    const perRing = 8;

    // seed同士の角度間隔に応じて、各seedの担当セクターを作る
    const sectorUnit = (Math.PI * 2) / Math.max(8, seedNodes.length);
    const angleSpread = Math.min(0.92, sectorUnit * 0.72);

    items.forEach((co, k) => {
      const ring = Math.floor(k / perRing);
      const pos = k % perRing;

      const t = perRing === 1 ? 0 : (pos / (perRing - 1)) - 0.5;
      const jitter = (ring % 2 === 0 ? 0.035 : -0.035);

      // seed方向を中心に、左右へ散らす
      const angle = seed.angle + t * angleSpread + jitter;

      // 中央から外側へ複数リング配置。中心に寄せすぎない。
      const radial = centerR + 135 + ring * 68;

      let x = cx + Math.cos(angle) * radial;
      let y = cy + Math.sin(angle) * radial;

      x = clamp(x, 95, width - 175);
      y = clamp(y, 64, height - 64);

      coNodes.push(makeCoNode(co, x, y, [seed.label], coNodes.length));
    });
  }

  // 複数seedにまたがる語だけ中央寄りに置く。ただし密集しないよう広めに散らす。
  crossItems.forEach((co, k) => {
    const relatedSeeds = Array.from(co.seed_set).filter(s => seedByLabel.has(s));

    // 黄金角でばらけさせる
    const angle = -Math.PI / 2 + k * 2.399963;

    // 中央付近に固めすぎない
    const radius = centerR + 125 + Math.floor(k / 9) * 62;

    let x = cx + Math.cos(angle) * radius;
    let y = cy + Math.sin(angle) * radius;

    x = clamp(x, 95, width - 175);
    y = clamp(y, 64, height - 64);

    coNodes.push(makeCoNode(co, x, y, relatedSeeds, coNodes.length));
  });

  markStructureLabels(coNodes, labelMode, viewMode);
  relaxCoNodes(coNodes, seedNodes, { x: cx, y: cy, r: centerR + 34 }, width, height, 170);

  const coByLabel = new Map(coNodes.map(n => [n.label, n]));

  const center = document.createElementNS(svgNS, "circle");
  center.setAttribute("cx", cx);
  center.setAttribute("cy", cy);
  center.setAttribute("r", centerR);
  center.setAttribute("class", "structure-node-center");
  svg.appendChild(center);

  const centerLabel = document.createElementNS(svgNS, "text");
  centerLabel.setAttribute("x", cx);
  centerLabel.setAttribute("y", cy + 4);
  centerLabel.setAttribute("text-anchor", "middle");
  centerLabel.setAttribute("class", "structure-label center");
  centerLabel.textContent = truncateLabel(theme, 12);
  svg.appendChild(centerLabel);

  for (const seed of seedNodes) {
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", cx);
    line.setAttribute("y1", cy);
    line.setAttribute("x2", seed.x);
    line.setAttribute("y2", seed.y);
    line.setAttribute("stroke", "rgba(100,116,139,.28)");
    line.setAttribute("stroke-width", "1.4");
    svg.appendChild(line);
  }

  for (const edge of edges) {
    const a = seedByLabel.get(edge.seed_word);
    const b = coByLabel.get(edge.co_word);
    if (!a || !b) continue;
    if (edgeMode === "strong" && edge.weight / maxEdge < 0.38) continue;

    const path = document.createElementNS(svgNS, "path");
    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2;
    const curveX = cx + (midX - cx) * 0.18;
    const curveY = cy + (midY - cy) * 0.18;
    path.setAttribute("d", `M ${a.x} ${a.y} Q ${curveX} ${curveY} ${b.x} ${b.y}`);
    path.setAttribute("class", edge.weight / maxEdge > 0.5 ? "structure-edge strong" : "structure-edge");
    path.setAttribute("stroke-width", String(0.6 + (edge.weight / maxEdge) * 4.2));
    path.addEventListener("mouseenter", ev => {
      tooltip.style.display = "block";
      tooltip.innerHTML = `<b>${escapeHtml(edge.seed_word)} → ${escapeHtml(edge.co_word)}</b><br>edge重み: ${round(edge.weight)}<br>最高順位: ${escapeHtml(edge.best_rank)}<br>例: ${escapeHtml(unique(edge.phrases).slice(0, 4).join(" / "))}`;
      positionTooltip(ev, tooltip);
    });
    path.addEventListener("mousemove", ev => positionTooltip(ev, tooltip));
    path.addEventListener("mouseleave", () => { tooltip.style.display = "none"; });
    svg.appendChild(path);
  }

  for (const seed of seedNodes) {
    const g = document.createElementNS(svgNS, "g");
    const c = document.createElementNS(svgNS, "circle");
    c.setAttribute("cx", seed.x);
    c.setAttribute("cy", seed.y);
    c.setAttribute("r", seed.r);
    c.setAttribute("class", "structure-node-seed");
    c.setAttribute("fill", seed.color);
    g.appendChild(c);

    const label = document.createElementNS(svgNS, "text");
    label.setAttribute("x", seed.x);
    label.setAttribute("y", seed.y + 5);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("class", "structure-label seed");
    label.textContent = truncateLabel(seed.label, 12);
    g.appendChild(label);

    g.addEventListener("mouseenter", ev => {
      const related = edges.filter(e => e.seed_word === seed.label).sort((a, b) => b.weight - a.weight).slice(0, 10);
      tooltip.style.display = "block";
      tooltip.innerHTML = `<b>検索元seed: ${escapeHtml(seed.label)}</b><br>seed評価値: ${escapeHtml(seed.score)}<br>関連対象語: ${related.length}<br>${escapeHtml(related.map(e => `${e.co_word}(${round(e.weight)})`).join(" / "))}`;
      positionTooltip(ev, tooltip);
    });
    g.addEventListener("mousemove", ev => positionTooltip(ev, tooltip));
    g.addEventListener("mouseleave", () => { tooltip.style.display = "none"; });
    svg.appendChild(g);
  }

  for (const node of coNodes) {
    const g = document.createElementNS(svgNS, "g");
    const c = document.createElementNS(svgNS, "circle");
    c.setAttribute("cx", node.x);
    c.setAttribute("cy", node.y);
    c.setAttribute("r", node.r);
    c.setAttribute("class", coClass(node));
    c.setAttribute("fill", coFill(node, colorMode, seedIndex));
    g.appendChild(c);

    if (node.showLabel) {
      const label = document.createElementNS(svgNS, "text");
      label.setAttribute("x", node.x + node.r + 5);
      label.setAttribute("y", node.y + 4);
      label.setAttribute("class", "structure-label");
      label.textContent = truncateLabel(node.label, 20);
      g.appendChild(label);
    }

    g.addEventListener("mouseenter", ev => {
      tooltip.style.display = "block";
      tooltip.innerHTML = `<b>対象語: ${escapeHtml(node.label)}</b><br>市場摩擦: ${round(node.market_score)}<br>横断seed: ${escapeHtml(node.seed_count)}<br>関連seed: ${escapeHtml(node.relatedSeeds.join(" / "))}<br>最高順位: ${escapeHtml(node.best_rank)}<br>例: ${escapeHtml(node.phrases)}`;
      positionTooltip(ev, tooltip);
    });
    g.addEventListener("mousemove", ev => positionTooltip(ev, tooltip));
    g.addEventListener("mouseleave", () => { tooltip.style.display = "none"; });
    g.addEventListener("click", () => log(`STRUCTURE: ${node.label} | seed=${node.relatedSeeds.join("/")}`));
    svg.appendChild(g);
  }

  container.appendChild(svg);
}


function markStructureLabels(nodes, mode, viewMode = "overview") {
  nodes.forEach(n => n.showLabel = false);
  if (mode === "off") return;
  if (mode === "all") {
    nodes.forEach(n => n.showLabel = true);
    return;
  }

  const sorted = [...nodes].sort((a, b) =>
    (b.seed_count - a.seed_count) ||
    (b.market_score - a.market_score) ||
    (a.best_rank - b.best_rank)
  );

  const baseLimit = viewMode === "detail" ? 44 : 26;
  sorted.slice(0, baseLimit).forEach(n => n.showLabel = true);
  nodes.forEach(n => {
    if (n.seed_count >= 3) n.showLabel = true;
    if (viewMode !== "overview" && n.seed_count >= 2) n.showLabel = true;
  });
}

function relaxCoNodes(nodes, seedNodes, centerNode, width, height, iterations = 80) {
  const obstacles = [
    ...seedNodes.map(s => ({ x: s.x, y: s.y, r: s.r + 38 })),
    centerNode
  ];

  for (let iter = 0; iter < iterations; iter++) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];

        const labelA = a.showLabel ? Math.min(110, String(a.label || "").length * 6.6) : 0;
        const labelB = b.showLabel ? Math.min(110, String(b.label || "").length * 6.6) : 0;
        const minDist = a.r + b.r + 18 + Math.min(58, (labelA + labelB) * 0.16);

        pushApart(a, b, minDist, width, height);
      }
    }

    for (const n of nodes) {
      for (const o of obstacles) {
        const minDist = n.r + o.r + (n.showLabel ? 24 : 13);
        pushApart(n, o, minDist, width, height, true);
      }
    }
  }
}

function pushApart(a, b, minDist, width, height, obstacleOnly = false) {
  let dx = b.x - a.x;
  let dy = b.y - a.y;
  let d = Math.sqrt(dx * dx + dy * dy) || 0.01;

  if (d >= minDist) return;

  let push = (minDist - d) / (obstacleOnly ? 1.18 : 2);
  dx /= d;
  dy /= d;

  if (obstacleOnly) {
    a.x -= dx * push;
    a.y -= dy * push;
  } else {
    a.x -= dx * push;
    a.y -= dy * push;
    b.x += dx * push;
    b.y += dy * push;
    b.x = clamp(b.x, 98, width - 185);
    b.y = clamp(b.y, 70, height - 70);
  }

  a.x = clamp(a.x, 98, width - 185);
  a.y = clamp(a.y, 70, height - 70);
}

function highlightStructure(svg, seed, co) {
  svg.querySelectorAll(".structure-edge").forEach(el => {
    const matchSeed = seed && el.getAttribute("data-seed") === seed;
    const matchCo = co && el.getAttribute("data-co") === co;
    const match = matchSeed || matchCo;
    el.style.opacity = match ? "1" : "0.08";
    if (match) el.style.strokeWidth = String(Number(el.getAttribute("stroke-width") || 1) + 1.8);
  });

  svg.querySelectorAll("[data-node-type]").forEach(el => {
    const type = el.getAttribute("data-node-type");
    let match = false;
    if (type === "seed") {
      match = seed ? el.getAttribute("data-seed") === seed : false;
      if (co) {
        const relatedEdges = Array.from(svg.querySelectorAll(`.structure-edge[data-co="${CSS.escape(co)}"]`)).map(e => e.getAttribute("data-seed"));
        match = relatedEdges.includes(el.getAttribute("data-seed"));
      }
    }
    if (type === "co") {
      match = co ? el.getAttribute("data-co") === co : false;
      if (seed) match = (el.getAttribute("data-seeds") || "").split("|||").includes(seed);
    }
    el.style.opacity = match ? "1" : "0.28";
  });
}

function clearStructureHighlight(svg) {
  svg.querySelectorAll(".structure-edge").forEach(el => {
    el.style.opacity = "";
    el.style.strokeWidth = "";
  });
  svg.querySelectorAll("[data-node-type]").forEach(el => {
    el.style.opacity = "";
  });
}

function coClass(node) {
  if (node.seed_count >= 3) return "structure-node-co cross";
  if (Number(node.market_score || 0) > 80) return "structure-node-co strong";
  return "structure-node-co";
}

function coFill(node, mode, seedIndex) {
  if (mode === "cross") {
    if (node.seed_count >= 4) return "#fef08a";
    if (node.seed_count >= 3) return "#fde68a";
    if (node.seed_count >= 2) return "#dcfce7";
    return "#ffffff";
  }
  if (mode === "score") {
    const v = Math.min(1, Number(node.market_score || 0) / 160);
    const r = Math.round(255 - 120 * v);
    const g = Math.round(255 - 40 * v);
    const b = Math.round(255 - 160 * v);
    return `rgb(${r},${g},${b})`;
  }
  if (node.relatedSeeds.length) {
    const idx = seedIndex.get(node.relatedSeeds[0]) || 0;
    return lighten(seedColors[idx % seedColors.length], 0.78);
  }
  return "#ffffff";
}

function lighten(hex, amount) {
  const raw = hex.replace("#", "");
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  const nr = Math.round(r + (255 - r) * amount);
  const ng = Math.round(g + (255 - g) * amount);
  const nb = Math.round(b + (255 - b) * amount);
  return `rgb(${nr},${ng},${nb})`;
}

function downloadStructureSvg() {
  const svg = $("structureMap")?.querySelector("svg");
  if (!svg) return alert("保存する構造マップがありません。");
  const text = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([text], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "structure_map.svg";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ===== Utilities ===== */
function distributeY(i, count, height) {
  if (count <= 1) return height / 2;
  const pad = 48;
  return pad + (height - pad * 2) * (i / Math.max(1, count - 1));
}
function truncateLabel(s, max) {
  s = String(s || "");
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function positionTooltip(ev, tooltip) {
  const pad = 14;
  let left = ev.clientX + pad;
  let top = ev.clientY + pad;
  const rect = tooltip.getBoundingClientRect();
  if (left + rect.width > window.innerWidth) left = ev.clientX - rect.width - pad;
  if (top + rect.height > window.innerHeight) top = ev.clientY - rect.height - pad;
  tooltip.style.left = `${Math.max(8, left)}px`;
  tooltip.style.top = `${Math.max(8, top)}px`;
}

function setButtonsRunning(isRunning) {
  const startBtn = $("startBtn");
  const testBtn = $("testBtn");
  const stopBtn = $("stopBtn");

  if (startBtn) startBtn.disabled = isRunning;
  if (testBtn) testBtn.disabled = isRunning;
  if (stopBtn) stopBtn.disabled = !isRunning;

  // マップ系は取得開始/停止とは別扱い。常に押せる状態に戻す。
  forceEnableMapButtons();
}

function log(msg) {
  const box = $("status");
  const now = new Date().toLocaleTimeString();
  box.textContent += `\n[${now}] ${msg}`;
  box.scrollTop = box.scrollHeight;
}
function clearStatus() { $("status").textContent = ""; }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function normalize(s) { return String(s ?? "").replace(/\u3000/g, " ").replace(/\s+/g, " ").trim(); }
function escapeHtml(s) { return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function unique(arr) { return Array.from(new Set(arr)); }
function round(n) { return Math.round(Number(n) * 1000) / 1000; }

function downloadCsv(filename, rows) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];
  for (const row of rows) lines.push(headers.map(h => csvEscape(row[h])).join(","));
  const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({ url, filename, saveAs: true }, () => setTimeout(() => URL.revokeObjectURL(url), 1000));
}
function csvEscape(v) {
  const s = String(v ?? "");
  return /[",\n\r]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}
