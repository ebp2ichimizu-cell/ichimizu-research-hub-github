
import {escapeHtml, externalLink} from "./utils.js";
const item=(label,value)=>value?`<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd>`:"";
export function renderStudyDetail(data,id){
 const s=data.studies.find(x=>x.id===id);
 if(!s) return `<section class="section"><div class="container"><div class="empty">研究が見つかりません。</div></div></section>`;
 return `<section class="page-head"><div class="container"><div class="meta">${escapeHtml(s.year)} ・ ${escapeHtml(s.publicationType)}</div><h1 class="detail-title">${escapeHtml(s.title)}</h1><p>${escapeHtml(s.authorsText)}</p></div></section>
 <section class="detail"><div class="container">
   <dl class="detail-grid">
    ${item("警察・実務機関",s.practiceOrganizationsText)}
    ${item("研究機関",s.researchOrganizationsText)}
    ${item("テーマ",s.themesText)}
    ${item("研究デザイン",s.design)}
    ${item("対象",s.population)}
    ${item("N / 対象数",s.sampleSize)}
    ${item("査読等",s.reviewStatus)}
    ${item("掲載誌・資料",s.citation)}
   </dl>
   ${s.intervention?`<div class="detail-section"><h2>介入・施策</h2><p>${escapeHtml(s.intervention)}</p></div>`:""}
   ${s.comparison?`<div class="detail-section"><h2>比較対象</h2><p>${escapeHtml(s.comparison)}</p></div>`:""}
   ${s.outcomesText?`<div class="detail-section"><h2>アウトカム</h2><p>${escapeHtml(s.outcomesText)}</p></div>`:""}
   ${s.result?`<div class="detail-section"><h2>主な結果</h2><p>${escapeHtml(s.result)}</p></div>`:""}
   ${s.limitations?`<div class="detail-section warning"><h2>限界・注意</h2><p>${escapeHtml(s.limitations)}</p></div>`:""}
   ${s.notes?`<div class="detail-section"><h2>収録上の備考</h2><p>${escapeHtml(s.notes)}</p></div>`:""}
   <div class="source-links">${externalLink(s.url,"原文・資料")}${s.doi?externalLink(`https://doi.org/${s.doi}`,"DOI"):""}</div>
 </div></section>`;
}
