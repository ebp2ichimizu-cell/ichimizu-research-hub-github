
import {filterStudies} from "./search.js";
import {escapeHtml, unique, truncate} from "./utils.js";
function parseQuery(){
  const h=location.hash;
  const qpos=h.indexOf("?");
  return new URLSearchParams(qpos>=0?h.slice(qpos+1):"");
}
function row(s){
 return `<article class="study-row">
   <div class="row-top"><span class="badge">${escapeHtml(s.year)}</span><span class="meta">${escapeHtml(s.publicationType || "")}</span><span class="meta">${escapeHtml(s.reviewStatus || "")}</span></div>
   <h2><a href="#/study/${s.id}">${escapeHtml(s.title)}</a></h2>
   <div class="meta">${escapeHtml(s.authorsText)}</div>
   <p>${escapeHtml(truncate(s.result || s.intervention || "",180))}</p>
   <div class="badges">${(s.themes||[]).map(t=>`<span class="badge">${escapeHtml(t)}</span>`).join("")}</div>
 </article>`;
}
export function renderStudies(data){
  const params=parseQuery(), presetTheme=params.get("theme")||"", presetQ=params.get("q")||"";
  const themes=unique(data.studies.flatMap(s=>s.themes||[])).sort((a,b)=>a.localeCompare(b,"ja"));
  const types=unique(data.studies.map(s=>s.publicationType)).sort((a,b)=>a.localeCompare(b,"ja"));
  return `<section class="page-head"><div class="container"><h1>研究を探す</h1><p>研究名、著者、機関、テーマ、介入、結果等を横断検索できます。</p></div></section>
  <section class="section"><div class="container">
    <div class="toolbar">
      <input id="studyQuery" value="${escapeHtml(presetQ)}" placeholder="キーワード検索">
      <select id="themeFilter"><option value="">すべてのテーマ</option>${themes.map(t=>`<option ${t===presetTheme?"selected":""} value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("")}</select>
      <select id="typeFilter"><option value="">すべての刊行形態</option>${types.map(t=>`<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("")}</select>
    </div>
    <div id="resultCount" class="result-count"></div><div id="studyList" class="list"></div>
  </div></section>`;
}
export function activateStudies(data){
  const q=document.querySelector("#studyQuery"),theme=document.querySelector("#themeFilter"),type=document.querySelector("#typeFilter"),list=document.querySelector("#studyList"),count=document.querySelector("#resultCount");
  if(!q) return;
  function update(){
    const result=filterStudies(data.studies,{q:q.value,theme:theme.value,type:type.value}).sort((a,b)=>(Number(b.year)||0)-(Number(a.year)||0)||b.sourceOrder-a.sourceOrder);
    count.textContent=`${result.length}件`;
    list.innerHTML=result.length?result.map(row).join(""):`<div class="empty">該当する研究はありません。</div>`;
  }
  [q,theme,type].forEach(el=>el.addEventListener(el===q?"input":"change",update)); update();
}
