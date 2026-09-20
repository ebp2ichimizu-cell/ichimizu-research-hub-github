const messages = {

  ja: {

    siteNameSmall: "いちみず会",
    siteName: "研究ハブ",

    navStudies: "研究を探す",
    navPrograms: "研究系列",
    navResearchers: "研究者・機関",
    navReports: "公的報告",
    navAbout: "このサイトについて",

    footerLead: "国内の犯罪予防研究を、探す・つなぐ・使う。",
    footerNote:
      "個人運営の研究知識基盤です。掲載は有効性の保証を意味しません。",

    loading: "読み込み中...",
    notFound: "ページが見つかりません。",
    loadError: "データの読み込みに失敗しました。",

    /* Home */
    homeEyebrow: "いちみず会の研究知識基盤",
    homeTitle: "国内の犯罪予防研究を、探す・つなぐ・使う。",
    homeLead:
      "国内の警察と研究者による介入研究、効果検証、共同研究を、テーマ・研究系列・実務課題からたどれます。インターネットで検索可能な国内のEBP事例をまとめた個人サイトです。",

    searchPlaceholder: "研究名、著者、警察機関、テーマ",
    searchButton: "検索",
    advancedSearch: "詳細検索",

    individualStudies: "個別研究",
    researchProgrammes: "共同研究プログラム",
    coveragePeriod: "収録期間",

    browseByTheme: "テーマから探す",
    themeAutoCount:
      "研究データから件数を自動集計しています。",

    researchSeries: "研究系列",
    researchSeriesLead:
      "単発の論文だけでなく、継続する警察×研究者の取り組みをたどります。",
    viewAll: "すべて見る →",

    recentStudies: "新しい年代の研究",
    recentStudiesNote:
      "初期版では公開年の新しい研究を表示します。追加日の管理は月次運用で導入予定です。",
    studyList: "研究一覧 →",

    viewDetails: "詳細を見る →",

    /* Study list */
    findStudies: "研究を探す",
    findStudiesLead:
      "研究名、著者、機関、テーマ、介入、結果等を横断検索できます。",
    keywordSearch: "キーワード検索",
    allThemes: "すべてのテーマ",
    allPublicationTypes: "すべての刊行形態",
    noStudiesFound: "該当する研究はありません。",
    resultCountSuffix: "件",

    /* Study detail */
    studyNotFound: "研究が見つかりません。",
    backToStudies: "← 研究一覧に戻る",
    studyOverview: "研究の基本情報",

    practiceOrganisation: "警察・実務機関",
    researchOrganisation: "研究機関",
    researchDesign: "研究デザイン",
    population: "対象",
    sampleSize: "N / 対象数",
    publication: "掲載誌・資料",

    intervention: "介入・施策",
    comparison: "比較",
    outcomes: "アウトカム",
    mainFindings: "主な結果",
    limitations: "限界・注意",
    hubNote: "研究HUBでの収録上の備考",

    sourceHeading: "原資料を確認する",
    sourceMaterial: "原文・資料",

    relatedStudies: "関連する研究",
    relatedStudiesNote:
      "同じ研究テーマを含む収録研究です。内容や効果が同一であることを意味するものではありません.",

    genericMaterial: "資料"
  },


  en: {

    siteNameSmall: "Ichimizu",
    siteName: "Research Hub",

    navStudies: "Studies",
    navPrograms: "Research Programmes",
    navResearchers: "Researchers & Institutions",
    navReports: "Official & Other Reports",
    navAbout: "About",

    footerLead:
      "Discover, connect and use crime prevention research from Japan.",

    footerNote:
      "An independently maintained research knowledge hub. Inclusion does not imply evidence of effectiveness.",

    loading: "Loading...",
    notFound: "Page not found.",
    loadError: "Failed to load data.",

    /* Home */
    homeEyebrow: "The Ichimizu research knowledge base",
    homeTitle:
      "Discover, connect and use crime prevention research from Japan.",
    homeLead:
      "Explore intervention studies, evaluations and police–researcher collaborations in Japan by topic, research programme and practical problem. This independently maintained site brings together publicly accessible examples relevant to Evidence-Based Policing.",

    searchPlaceholder:
      "Study title, author, police organisation or topic",
    searchButton: "Search",
    advancedSearch: "Advanced search",

    individualStudies: "Studies",
    researchProgrammes: "Research programmes",
    coveragePeriod: "Coverage",

    browseByTheme: "Browse by topic",
    themeAutoCount:
      "Counts are generated automatically from the study database.",

    researchSeries: "Research programmes",
    researchSeriesLead:
      "Trace sustained police–researcher collaborations rather than viewing studies only as isolated publications.",
    viewAll: "View all →",

    recentStudies: "Recent studies",
    recentStudiesNote:
      "The current version displays studies by publication year. Tracking by date added will be introduced in the monthly update workflow.",
    studyList: "View all studies →",

    viewDetails: "View details →",

    /* Study list */
    findStudies: "Find studies",
    findStudiesLead:
      "Search across titles, authors, organisations, topics, interventions and findings.",
    keywordSearch: "Keyword search",
    allThemes: "All topics",
    allPublicationTypes: "All publication types",
    noStudiesFound: "No matching studies found.",
    resultCountSuffix: " studies",

    /* Study detail */
    studyNotFound: "Study not found.",
    backToStudies: "← Back to studies",
    studyOverview: "Study overview",

    practiceOrganisation: "Police / practice organisation",
    researchOrganisation: "Research organisation",
    researchDesign: "Research design",
    population: "Population / setting",
    sampleSize: "N / sample size",
    publication: "Publication / source",

    intervention: "Intervention",
    comparison: "Comparison",
    outcomes: "Outcomes",
    mainFindings: "Main findings",
    limitations: "Limitations and cautions",
    hubNote: "Research Hub note",

    sourceHeading: "View the original source",
    sourceMaterial: "Original source",

    relatedStudies: "Related studies",
    relatedStudiesNote:
      "These studies share one or more research topics with this record. This does not imply that their interventions, findings or effects are equivalent.",

    genericMaterial: "Material"
  }

};


let currentLanguage =
  localStorage.getItem("researchHubLanguage") || "ja";


export function getLanguage() {
  return currentLanguage;
}


export function setLanguage(language) {

  currentLanguage =
    language === "en"
      ? "en"
      : "ja";

  localStorage.setItem(
    "researchHubLanguage",
    currentLanguage
  );

  document.documentElement.lang =
    currentLanguage;
}


export function t(key) {

  return (
    messages[currentLanguage]?.[key] ??
    messages.ja[key] ??
    key
  );
}


export function applyStaticTranslations() {

  const elements =
    document.querySelectorAll("[data-i18n]");

  elements.forEach(element => {

    const key =
      element.dataset.i18n;

    element.textContent =
      t(key);

  });


  document
    .querySelector("#japaneseButton")
    ?.classList.toggle(
      "active",
      currentLanguage === "ja"
    );


  document
    .querySelector("#englishButton")
    ?.classList.toggle(
      "active",
      currentLanguage === "en"
    );

}
