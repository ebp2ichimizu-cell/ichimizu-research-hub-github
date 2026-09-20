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
    loadError: "データの読み込みに失敗しました。"
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
    loadError: "Failed to load data."
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
