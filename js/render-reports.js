
import {escapeHtml, truncate, externalLink} from "./utils.js";
export function renderReports(data,id=null){
 if(id){
   const r=data.reports.find(x=>x.id===id);
   if(!r) return `<section class="section"><div class="container"><div class="empty">資料が見つかりません。</div></div></section>`;
   return `<section class="page-head"><div class="container"><div class="meta">${escapeHtml(r.year)} ・ ${escapeHtml(r.type)}</div><h1>${escapeHtml(r.title)}</h1></div></section>
   <section class="detail"><div class="container"><dl class="detail-grid"><dt>機関</dt><dd>${escapeHtml(r.organization)}</dd><dt>研究者・協働先</dt><dd>${escapeHtml(r.collaborators)}</dd></dl><div class="detail-section"><h2>内容・位置づけ</h2><p>${escapeHtml(r.summary)}</p></div><div class="source-links">${externalLink(r.url,"公式資料")}</div></div></section>`;
 }
 return `<section class="page-head"><div class="container"><h1>公的報告・未論文化</h1><p>査読論文等とは区別して、公的研究報告や進行中の研究情報を収録します。</p></div></section>
 <section class="section"><div class="container"><div class="list">${data.reports.map(r=>`<article class="study-row"><div class="meta">${escapeHtml(r.year)} ・ ${escapeHtml(r.type)}</div><h2><a href="#/report/${r.id}">${escapeHtml(r.title)}</a></h2><p>${escapeHtml(truncate(r.summary,180))}</p></article>`).join("")}</div></div></section>`;
}
