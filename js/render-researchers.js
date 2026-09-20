
import {escapeHtml, truncate, externalLink} from "./utils.js";
export function renderResearchers(data,id=null){
 if(id){
  const r=data.researchers.find(x=>x.id===id);
  if(!r) return `<section class="section"><div class="container"><div class="empty">研究者が見つかりません。</div></div></section>`;
  const studies=data.studies.filter(s=>(r.studyIds||[]).includes(s.id));
  return `<section class="page-head"><div class="container"><h1>${escapeHtml(r.name)}</h1><p>${escapeHtml(r.affiliation)}</p></div></section>
  <section class="detail"><div class="container">
  <div class="detail-section"><h2>主な研究テーマ</h2><p>${escapeHtml((r.themes||[]).join("、"))}</p></div>
  <div class="detail-section"><h2>警察・実務との接点</h2><p>${escapeHtml(r.practiceConnection)}</p></div>
  <div class="detail-section"><h2>主な研究系列</h2><p>${escapeHtml((r.series||[]).join("、"))}</p></div>
  <div class="source-links">${externalLink(r.profileUrl,"研究者情報")}</div>
  <h2 style="margin-top:34px">関連研究 ${studies.length}件</h2>
  <div class="list">${studies.length?studies.map(s=>`<article class="study-row"><div class="meta">${escapeHtml(s.year)}</div><h2><a href="#/study/${s.id}">${escapeHtml(s.title)}</a></h2><p>${escapeHtml(truncate(s.result,150))}</p></article>`).join(""):`<div class="empty">著者名の一致による関連研究はまだ登録されていません。</div>`}</div>
  </div></section>`;
 }
 return `<section class="page-head"><div class="container"><h1>研究者・機関</h1><p>研究者マスターの公開項目から構成しています。探索優先度など管理用情報は掲載していません。</p></div></section>
 <section class="section"><div class="container"><div class="grid">${data.researchers.map(r=>`<article class="card"><h3>${escapeHtml(r.name)}</h3><div class="meta">${escapeHtml(r.affiliation)}</div><p>${escapeHtml((r.themes||[]).slice(0,4).join("、"))}</p><a class="card-link" href="#/researcher/${r.id}">詳細を見る →</a></article>`).join("")}</div></div></section>`;
}
