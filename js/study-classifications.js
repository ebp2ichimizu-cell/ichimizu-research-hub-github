/*
 * いちみず会研究HUB：検索用の共通分類 v1
 * 2026-10-03時点の既存63件の design / population / outcomes を基に整理。
 * これは研究品質や因果効果の判定ではない。RCTと明示された記述以外は無作為化を推定しない。
 * 原著再照合前の分類は、収録済みの記述の範囲を超えない。
 */

export const DESIGN = Object.freeze({
  randomized: {ja:'無作為割付の記載あり',en:'Random assignment reported'},
  quasi: {ja:'準実験・自然実験',en:'Quasi- / natural experiment'},
  prepost: {ja:'前後・反復評価',en:'Pre/post or repeated assessment'},
  observational: {ja:'観察・調査研究',en:'Observational / survey research'},
  process: {ja:'実装・プロセス評価',en:'Implementation / process evaluation'},
  field: {ja:'実験・実践評価（割付要確認）',en:'Experimental / field assessment (assignment unverified)'},
  ongoing: {ja:'進行中・研究計画',en:'Ongoing / planned research'},
  unclassified: {ja:'未分類',en:'Not classified'}
});

export const TARGET = Object.freeze({
  persons: {ja:'住民・一般利用者',en:'Residents / users'},
  students: {ja:'児童・生徒・学生',en:'Students / youth'},
  businesses: {ja:'店舗・事業所',en:'Shops / businesses'},
  police: {ja:'警察職員・防犯従事者',en:'Police / practitioners'},
  locations: {ja:'地区・地域・公共空間',en:'Places / neighbourhoods'},
  facilities: {ja:'施設・駐輪場・駅',en:'Facilities / parking / stations'},
  other: {ja:'その他・要確認',en:'Other / unclear'}
});

export const OUTCOME = Object.freeze({
  crime: {ja:'犯罪・被害',en:'Crime / victimisation'},
  behavior: {ja:'行動',en:'Behaviour'},
  perceptions: {ja:'認知・意識・評価',en:'Perceptions / attitudes'},
  implementation: {ja:'実装・活動状況',en:'Implementation / delivery'},
  environment: {ja:'環境・空間特性',en:'Environment / spatial context'},
  other: {ja:'その他・要確認',en:'Other / unclear'}
});

// 各群は個別研究の元の「研究デザイン」記載に基づく分類。重複は禁止。
const designGroups = {
  randomized: [21,31,37],
  quasi: [11,18,19,27,29,48],
  prepost: [3,6,9,16,17,20,24,30,32,40,41,42,43,44,53,54],
  observational: [1,5,10,12,15,23,28,50,56,58,61,62,63],
  process: [4,7,13,14,22,39,52],
  field: [2,8,25,26,33,34,38,45,46,47,49,51,55,57,59,60],
  ongoing: [35,36]
};

// 対象区分は複数付与可。人口・場所の原記述に対応させる。
const targetGroups = {
  persons: [1,2,6,9,14,19,21,22,23,25,26,27,28,31,32,33,37,38,42,43,44,45,51,52,54,59,60,61],
  students: [3,15,16,31,33,38,40,42,44,47],
  businesses: [4,5,7,8,10,13,14,17,20,24,30,34,40,41,51,52,55,57],
  police: [7,14,39,46,56,58],
  locations: [1,2,9,11,12,15,18,19,23,27,28,29,32,35,36,39,45,46,48,50,51,53,54,58,60,61,62,63],
  facilities: [2,12,25,26,29,31,32,33,34,37,45,47,48,49,50,51,52,53,54,55,57,59,60,62,63],
  other: [35,36]
};

// 原データ outcomes[] に基づくテーマ別の測定対象。効果が生じたことは意味しない。
const outcomeGroups = {
  crime: [11,12,15,18,20,24,30,34,35,36,46,50,57,62,63],
  behavior: [2,4,7,16,19,20,22,23,24,25,26,28,29,31,32,33,34,35,36,37,41,45,47,48,49,51,53,54,56,58,59,60,61],
  perceptions: [1,3,5,6,8,9,13,14,15,16,17,21,23,27,28,30,33,35,36,38,40,41,42,43,44,47,52,55,56,61],
  implementation: [4,7,13,14,17,22,24,39,40,41,42,43,44,46,47,52,56,58],
  environment: [5,10,11,12,15,39,50,62,63],
  other: []
};

function expand(groups) {
  const result=new Map();
  for (const [category, numbers] of Object.entries(groups)) {
    for (const n of numbers) {
      const key=`study-${String(n).padStart(4,'0')}`;
      if (!result.has(key)) result.set(key,[]);
      result.get(key).push(category);
    }
  }
  return result;
}
const designs=expand(designGroups);
const targets=expand(targetGroups);
const outcomes=expand(outcomeGroups);

export function classifyStudy(study) {
  const id=study.id;
  return {
    designCategory:designs.get(id)?.[0] || 'unclassified',
    targetCategories:targets.get(id) || ['other'],
    outcomeCategories:outcomes.get(id) || ['other']
  };
}

export function auditClassification(studies) {
  const expected=new Set(studies.map(s=>s.id));
  const groups=Object.values(designGroups).flat();
  const duplicates=groups.filter((x,i)=>groups.indexOf(x)!==i);
  const missing=studies.filter(x=>!designs.has(x.id) || !targets.has(x.id) || !outcomes.has(x.id)).map(x=>x.id);
  const extra=[...designs.keys()].filter(x=>!expected.has(x));
  return {total:studies.length,classified:studies.length-missing.length,missing,duplicates,extra};
}
