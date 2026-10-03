import {filterStudies} from './search.js';
import {escapeHtml,unique,truncate} from './utils.js';
import {t,getLanguage} from './i18n.js';
import {DESIGN,TARGET,OUTCOME,classifyStudy} from './study-classifications.js';

// SPA内の絞り込み・ページ再描画をまたいで選択状態を保持する。
const selectedStudyIds=new Set();
let comparisonOpen=false;
const MAX_COMPARISON=4;
const lang=()=>getLanguage()==='en'?'en':'ja';
const L=(ja,en)=>lang()==='ja'?ja:en;
const text=v=>escapeHtml(v==null?'':String(v));
const studyFacets=s=>classifyStudy(s);

function parseQuery(){const s=location.hash;const pos=s.indexOf('?');return new URLSearchParams(pos<0?'':s.slice(pos+1));}
function options(dictionary,first){
  return `<option value="">${text(first)}</option>`+Object.entries(dictionary)
    .map(([key,n])=>`<option value="${text(key)}">${text(n[lang()])}</option>`).join('');
}
function optionList(items,first,selected=''){
  return `<option value="">${text(first)}</option>`+items.map(v=>
    `<option value="${text(v)}" ${selected===v?'selected':''}>${text(v)}</option>`).join('');
}
function categoryLabels(list,dictionary){
  return list.map(k=>dictionary[k]?.[lang()]||dictionary.other?.[lang()]||'—').join(L('、',', '));
}
function row(study){
  const c=studyFacets(study);
  const selected=selectedStudyIds.has(study.id);
  return `<article class="study-row study-compare-row">
    <div class="study-compare-inner">
      <label class="study-check-label" title="${text(L('比較する研究を選択','Select to compare'))}">
        <input class="study-compare-check" type="checkbox" value="${text(study.id)}"
          aria-label="${text(L('比較対象に追加','Compare')+'：'+study.title)}" ${selected?'checked':''}>
      </label>
      <div class="study-row-main">
        <div class="row-top"><span class="badge">${text(study.year)}</span>
        <span class="meta">${text(study.publicationType)}</span>
        <span class="meta">${text(study.reviewStatus)}</span></div>
        <h2><a href="#/study/${encodeURIComponent(study.id)}">${text(study.title)}</a></h2>
        <div class="meta">${text(study.authorsText)}</div>
        <div class="study-facet-pills"><span class="badge">${text(DESIGN[c.designCategory]?.[lang()]||'—')}</span></div>
        <dl class="study-snapshot">
          <div><dt>${text(L('対象','Population'))}</dt><dd>${text(study.population || L('未記載','Not reported'))}</dd></div>
          <div><dt>${text(L('比較条件','Comparison'))}</dt><dd>${text(study.comparison||L('未記載','Not reported'))}</dd></div>
          <div><dt>${text(L('評価指標','Outcomes'))}</dt><dd>${text(study.outcomesText||(study.outcomes||[]).join(L('、',', '))||L('未記載','Not reported'))}</dd></div>
        </dl>
        <p class="study-result"><strong>${text(L('主な結果','Main finding'))}：</strong>${text(truncate(study.result||study.intervention||'',230))}</p>
        <div class="badges">${(study.themes||[]).map(v=>`<span class="badge">${text(v)}</span>`).join('')}</div>
      </div>
    </div>
  </article>`;
}
function compareTable(studies){
  const sorted=[...selectedStudyIds].map(id=>studies.find(s=>s.id===id)).filter(Boolean);
  if(sorted.length<2)return `<div class="empty">${text(L('2件以上の研究を選択してください。','Select at least two studies.'))}</div>`;
  const criteria=[
    [L('発表年','Year'),s=>s.year],
    [L('研究デザイン（原記載）','Original study design'),s=>s.design],
    [L('デザイン分類','Design category'),s=>DESIGN[studyFacets(s).designCategory]?.[lang()]],
    [L('対象','Population'),s=>s.population],
    [L('対象数','Sample size'),s=>s.sampleSize],
    [L('介入・分析内容','Intervention / analysis'),s=>s.intervention],
    [L('比較条件','Comparison'),s=>s.comparison],
    [L('評価指標','Outcome measures'),s=>s.outcomesText],
    [L('主な結果','Findings'),s=>s.result],
    [L('研究の限界','Limitations'),s=>s.limitations]
  ];
  return `<div class="study-compare-scroll" tabindex="0" role="region"
    aria-label="${text(L('研究比較表（横方向にスクロール可能）','Study comparison (scroll horizontally)'))}">
    <table class="study-compare-table" style="min-width:${128+sorted.length*240}px"><thead><tr>
    <th scope="col">${text(L('比較項目','Item'))}</th>
    ${sorted.map(s=>`<th scope="col"><a href="#/study/${encodeURIComponent(s.id)}">${text(s.title)}</a></th>`).join('')}
    </tr></thead><tbody>${criteria.map(([label,get])=>`<tr><th scope="row">${text(label)}</th>
    ${sorted.map(s=>`<td>${text(get(s)||L('未記載・未確認','Not reported / unverified'))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function comparisonControls(data){
  for(const id of [...selectedStudyIds])if(!data.studies.some(s=>s.id===id))selectedStudyIds.delete(id);
  const n=selectedStudyIds.size;
  const el=document.querySelector('#studyComparisonControls');
  if(!el)return;
  el.innerHTML=`<div class="study-compare-toolbar" aria-live="polite">
    <span>${text(L('比較対象','Selected'))}: <strong>${n}</strong> / ${MAX_COMPARISON}</span>
    <button type="button" id="studyCompareButton" ${n<2?'disabled':''}>
      ${text(comparisonOpen?L('比較表を閉じる','Close comparison'):L('選択した研究を比較','Compare selected studies'))}</button>
    <button type="button" id="studyCompareClear" ${n===0?'disabled':''}>${text(L('選択解除','Clear'))}</button>
    ${n>=MAX_COMPARISON?`<small>${text(L('最大4件まで選択できます。','Maximum four studies.'))}</small>`:''}
    </div>${comparisonOpen?`<p class="study-compare-caution">${text(L('研究間で対象・比較条件・アウトカム・測定期間が異なる場合、結果や効果量を直接比較できません。この表は研究の特徴と結果を整理するためのものです。','Different populations, comparison conditions, outcomes and follow-up periods can prevent direct comparisons of results and effect sizes. This table summarises characteristics, not relative efficacy.'))}</p>${compareTable(data.studies)}`:''}`;
  el.querySelector('#studyCompareButton')?.addEventListener('click',()=>{comparisonOpen=!comparisonOpen;comparisonControls(data);});
  el.querySelector('#studyCompareClear')?.addEventListener('click',()=>{
    selectedStudyIds.clear();comparisonOpen=false;
    document.querySelectorAll('.study-compare-check').forEach(c=>c.checked=false);
    comparisonControls(data);
  });
}
function ensureCompareStyles(){
  if(document.getElementById('hub-compare-style'))return;
  const link=document.createElement('link');
  link.id='hub-compare-style';
  link.rel='stylesheet';
  link.href=new URL('../css/studies-extra.css',import.meta.url).href;
  document.head.appendChild(link);
}
export function renderStudies(data){
  ensureCompareStyles();
  const params=parseQuery();const presetTheme=params.get('theme')||'';const presetQ=params.get('q')||'';
  const locale=lang();
  const themes=unique(data.studies.flatMap(s=>s.themes||[])).sort((a,b)=>a.localeCompare(b,locale));
  const types=unique(data.studies.map(s=>s.publicationType).filter(Boolean)).sort((a,b)=>a.localeCompare(b,locale));
  return `<section class="page-head"><div class="container"><h1>${t('findStudies')}</h1><p>${t('findStudiesLead')}</p></div></section>
   <section class="section"><div class="container">
   <div class="toolbar study-filter-toolbar">
     <input id="studyQuery" type="search" value="${text(presetQ)}" aria-label="${text(t('keywordSearch'))}" placeholder="${text(t('keywordSearch'))}">
     <select id="themeFilter" aria-label="${text(t('allThemes'))}">${optionList(themes,t('allThemes'),presetTheme)}</select>
     <select id="typeFilter" aria-label="${text(t('allPublicationTypes'))}">${optionList(types,t('allPublicationTypes'))}</select>
     <select id="designFilter" aria-label="${text(L('研究デザイン','Study design'))}">${options(DESIGN,L('すべての研究デザイン','All study designs'))}</select>
     <select id="targetFilter" aria-label="${text(L('評価対象','Study population'))}">${options(TARGET,L('すべての評価対象','All populations'))}</select>
     <select id="outcomeFilter" aria-label="${text(L('アウトカム','Outcomes'))}">${options(OUTCOME,L('すべてのアウトカム','All outcomes'))}</select>
     <select id="sortStudies" aria-label="${text(L('並べ替え','Sort'))}">
       <option value="newest">${text(L('発表年：新しい順','Year: newest'))}</option>
       <option value="oldest">${text(L('発表年：古い順','Year: oldest'))}</option>
       <option value="title">${text(L('研究タイトル順','Title'))}</option>
       <option value="design">${text(L('研究デザイン名順（優劣ではない）','Study design name (not quality)'))}</option>
     </select>
   </div>
   <p class="study-filter-note">${text(L('研究デザイン等の分類は、収録済みの研究記述に基づきます。「割付要確認」は原著で無作為化の有無を確認していない区分です。','Search categories use existing study descriptions. Assignment labelled unverified has not been checked against the original article.'))}</p>
   <div id="resultCount" class="result-count" role="status"></div>
   <div id="studyComparisonControls" class="study-comparison-controls"></div>
   <div id="studyList" class="list"></div>
   </div></section>`;
}
export function activateStudies(data){
  const $=id=>document.getElementById(id);
  const query=$('studyQuery'),theme=$('themeFilter'),type=$('typeFilter');
  const design=$('designFilter'),target=$('targetFilter'),outcome=$('outcomeFilter'),sort=$('sortStudies');
  const list=$('studyList'),count=$('resultCount');if(!query)return;
  function update(){
    const matches=filterStudies(data.studies,{q:query.value,theme:theme.value,type:type.value})
      .filter(s=>{const c=studyFacets(s);return (!design.value||c.designCategory===design.value)&&
       (!target.value||c.targetCategories.includes(target.value))&&
       (!outcome.value||c.outcomeCategories.includes(outcome.value));});
    const selectedSort=sort.value;
    matches.sort((a,b)=>{
      if(selectedSort==='oldest')return (Number(a.year)||0)-(Number(b.year)||0)||a.sourceOrder-b.sourceOrder;
      if(selectedSort==='title')return a.title.localeCompare(b.title,lang());
      if(selectedSort==='design')return (DESIGN[studyFacets(a).designCategory]?.[lang()]||'')
        .localeCompare(DESIGN[studyFacets(b).designCategory]?.[lang()]||'',lang())||a.sourceOrder-b.sourceOrder;
      return (Number(b.year)||0)-(Number(a.year)||0)||b.sourceOrder-a.sourceOrder;
    });
    count.textContent=`${matches.length}${t('resultCountSuffix')}`;
    list.innerHTML=matches.length?matches.map(row).join(''):`<div class="empty">${t('noStudiesFound')}</div>`;
    comparisonControls(data);
  }
  list.addEventListener('change',e=>{
    const input=e.target.closest('.study-compare-check');if(!input)return;
    if(input.checked){
      if(selectedStudyIds.size>=MAX_COMPARISON){input.checked=false;return;}
      selectedStudyIds.add(input.value);
    }else selectedStudyIds.delete(input.value);
    comparisonControls(data);
  });
  [query,theme,type,design,target,outcome,sort].forEach(el=>
    el.addEventListener(el===query?'input':'change',update));
  update();
}
