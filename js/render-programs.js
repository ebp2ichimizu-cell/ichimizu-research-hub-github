
import {escapeHtml, externalLink} from "./utils.js";
export function renderPrograms(data,id=null){
 if(id){
  const p=data.programs.find(x=>x.id===id);
  if(!p) return `<section class="section"><div class="container"><div class="empty">研究系列が見つかりません。</div></div></section>`;
  return `<section class="page-head"><div class="container"><div class="meta">${escapeHtml(p.startYear)}〜</div><h1>${escapeHtml(p.name)}</h1></div></section>
  <section class="detail"><div class="container"><div class="detail-section"><h2>概要</h2><p>${escapeHtml(p.summary)}</p></div>
  <dl class="detail-grid"><dt>警察機関</dt><dd>${escapeHtml(p.policeOrganizations.join("、"))}</dd><dt>研究機関</dt><dd>${escapeHtml(p.researchOrganizations.join("、"))}</dd><dt>主要テーマ</dt><dd>${escapeHtml(p.themes.join("、"))}</dd></dl>
  <div class="source-links">${externalLink(p.url,"公式情報")}</div></div></section>`;
 }
 return `<section class="page-head"><div class="container"><h1>研究系列</h1><p>継続的な警察×研究者の共同研究プログラムを一覧できます。</p></div></section>
 <section class="section"><div class="container"><div class="grid">${data.programs.map(p=>`<article class="card"><div class="meta">${escapeHtml(p.startYear)}〜</div><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.summary)}</p><a class="card-link" href="#/program/${p.id}">詳細を見る →</a></article>`).join("")}</div></div></section>`;
}
