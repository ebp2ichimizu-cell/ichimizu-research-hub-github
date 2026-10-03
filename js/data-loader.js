import {
  getLanguage
} from "./i18n.js";

/*
 * 原著到達監査による書誌・リンク補正 (2026-10-03)
 *
 * GitHub連携による書込が許可されていない環境でも、既存の研究データを変更せず
 * 表示に必要な確認済み情報だけ補正する。研究結果、効果量、アウトカム等は変更しない。
 * いずれ正規データ studies-ja/en.json に統合したらこの補正表は削除する。
 */
const SOURCE_CORRECTIONS = {
  ja: {
    "study-0013": {
      notes: "研究者の業績ページで書誌情報を確認。原著本文への直接到達は未確認であり、リンク先は原著そのものではない。"
    },
    "study-0015": {
      notes: "福岡県警の一次資料。リンク先PDFは複数の研究成果をまとめた報告書であり、該当研究はその一部に掲載。"
    },
    "study-0027": {
      url: "https://www.jstage.jst.go.jp/article/jenvpsy/12/1/12_16/_pdf/-char/ja",
      doi: "10.20703/jenvpsy.12.1_16",
      citation: "環境心理学研究 12(1), 16（日本環境心理学会第17回大会発表要旨）",
      sampleSize: "事前調査13,760人、事後の電車利用者2,609人のうち有効回答2,198人を分析",
      notes: "学会発表要旨本文を原著として参照。13,760人は事前調査対象者数、2,198人は報告された分析対象者数。従来の科研費実績報告は関連資料。"
    },
    "study-0029": {
      year: 2026,
      notes: "介入実施：2024年8〜12月。論文のオンライン初出：2025年12月15日。正式な巻号掲載：2026年9月。表示年は巻号掲載年に統一。"
    },
    "study-0034": {
      notes: "福島県警の公式『万引き防止対策（令和7年度重点事業）』の説明ページに実験の概要・結果を掲載。学術論文の原著全文ではない。実験は2025年8〜11月、結果公表は2026年。"
    },
    "study-0036": {
      notes: "奈良県警の一般向け特殊詐欺解説ページ内に、2026年3月の『奈良防犯心理研究会』設立を確認。独立した研究成果や介入結果は未公表。"
    },
    "study-0046": {
      url: "https://tsukuba.repo.nii.ac.jp/records/2012950",
      doi: "10.15068/0002012950",
      notes: "筑波大学の博士論文全文公開記録を参照。従前のURLは内容・審査要旨。2017年経路提案、2020年集中パトロール研究を統合する研究系列。"
    }
  },
  en: {
    "study-0013": {
      notes: "Bibliographic details are confirmed from the researcher's publication list. The original full text was not located; the linked page is not the original publication."
    },
    "study-0015": {
      notes: "Original official police report. The linked PDF compiles several studies and includes this study as one of its sections."
    },
    "study-0027": {
      url: "https://www.jstage.jst.go.jp/article/jenvpsy/12/1/12_16/_pdf/-char/ja",
      doi: "10.20703/jenvpsy.12.1_16",
      citation: "Journal of Environmental Psychology Research 12(1), p.16 (17th Japanese Environmental Psychology Society conference abstract)",
      sampleSize: "13,760 in initial survey; 2,198 valid cases analysed among 2,609 subsequent train users",
      notes: "Linked directly to the primary conference abstract. The 13,760 figure refers to the initial survey; 2,198 to analysed respondents. The prior KAKEN report is a secondary project record."
    },
    "study-0029": {
      year: 2026,
      notes: "Intervention: August–December 2024. First published online: 15 December 2025. Issue publication: September 2026. Display year follows the journal issue."
    },
    "study-0034": {
      notes: "The official Fukushima Prefectural Police shoplifting-prevention page reports the intervention and findings. This is an official summary, not the full original academic article. Experiment: August–November 2025; results announced in 2026."
    },
    "study-0036": {
      url: "https://www.police.pref.nara.jp/0000007830.html",
      notes: "The Nara Prefectural Police public fraud-prevention article includes a section confirming that this research group was established in March 2026. No independent intervention findings have been published."
    },
    "study-0046": {
      url: "https://tsukuba.repo.nii.ac.jp/records/2012950",
      doi: "10.15068/0002012950",
      notes: "Links to the University of Tsukuba's full doctoral thesis. The previous URL pointed to the abstract and examination summary. The thesis integrates the 2017 patrol-route study and 2020 concentrated-patrol evaluation."
    }
  }
};

export async function loadAllData(){

  const lang = getLanguage();

  const suffix = lang === "en" ? "en" : "ja";

  const files = {
    studies: `./data/studies-${suffix}.json`,
    programs: `./data/programs-${suffix}.json`,
    researchers: `./data/researchers-${suffix}.json`,
    reports: `./data/reports-${suffix}.json`,
    policy: `./data/site-policy-${suffix}.json`
  };

  const entries = await Promise.all(
    Object.entries(files).map(async ([key,url])=>{
      const res = await fetch(url,{cache:"no-store"});
      if(!res.ok){
        throw new Error(`${url} could not be loaded (${res.status})`);
      }
      return [key,await res.json()];
    })
  );

  const data = Object.fromEntries(entries);

  /* 独自解説のインデックスは任意。未公開でも従来どおり機能する。 */
  try {
    const commentaryResponse = await fetch("./data/commentary-index.json",{
      cache:"no-store"
    });
    data.commentary = commentaryResponse.ok
      ? await commentaryResponse.json()
      : {};
  } catch {
    data.commentary = {};
  }

  const fixes = SOURCE_CORRECTIONS[suffix];
  data.studies = data.studies.map(study=>({
    ...study,
    ...(fixes[study.id] || {}),
    ...(data.commentary?.[study.id] || {})
  }));

  return data;
}
