
import {escapeHtml, truncate} from "./utils.js";
function topThemes(studies){
  const counts=new Map();
  studies.flatMap(s=>s.themes||[]).forEach(t=>counts.set(t,(counts.get(t)||0)+1));
  return [...counts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,12);
}
function studyCard(s){
  return `<article class="card">
    <div class="meta">${escapeHtml(s.year)} ・ ${escapeHtml(s.publicationType || "資料")}</div>
    <h3>${escapeHtml(s.title)}</h3>
    <p class="meta">${escapeHtml(s.authorsText)}</p>
    <p>${escapeHtml(truncate(s.result || s.intervention || "",130))}</p>
    <div class="badges">${(s.themes||[]).slice(0,3).map(t=>`<span class="badge">${escapeHtml(t)}</span>`).join("")}</div>
    <a class="card-link" href="#/study/${s.id}">詳細を見る →</a>
  </article>`;
}
export function renderHome(data){
  const newest=[...data.studies].sort((a,b)=>(Number(b.year)||0)-(Number(a.year)||0) || b.sourceOrder-a.sourceOrder).slice(0,6);
  const themes=topThemes(data.studies);
  const years=data.studies.map(s=>Number(s.year)).filter(Number.isFinite);
  const minYear=Math.min(...years), maxYear=Math.max(...years);
  return `
    <section class="hero">
      <div class="hero-inner">
        <img class="hero-logo" src="./assets/logo/ichimizu-logo.png" alt="EBP2 いちみず会 ロゴ">
        <div>
          <p class="eyebrow">いちみず会の研究知識基盤</p>
          <h1>国内の犯罪予防研究を、<br>探す・つなぐ・使う。</h1>
          <p class="hero-lead">国内の警察と研究者による介入研究、効果検証、共同研究を、テーマ・研究系列・実務課題からたどれます。インターネットで検索可能な国内のEBP事例をまとめた個人サイトです。</p>
          <div class="search-shell">
            <form id="homeSearch" class="search-row">
              <input class="search-input" name="q" aria-label="研究を検索" placeholder="研究名、著者、警察機関、テーマ">
              <button class="primary-btn" type="submit">検索</button>
            </form>
            <a class="search-link" href="#/studies">詳細検索</a>
          </div>
          <div class="stats">
            <div class="stat"><strong>${data.studies.length}</strong><span>個別研究</span></div>
            <div class="stat"><strong>${data.programs.length}</strong><span>共同研究プログラム</span></div>
            <div class="stat"><strong>${minYear}–${maxYear}</strong><span>収録期間</span></div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-head"><div><h2>テーマから探す</h2><p class="section-note">研究データから件数を自動集計しています。</p></div></div>
        <div class="topic-grid">${themes.map(([t,c])=>`<a class="topic-button" href="#/studies?theme=${encodeURIComponent(t)}"><span>${escapeHtml(t)}</span><span class="topic-count">${c}</span></a>`).join("")}</div>
      </div>
    </section>
    <section class="section alt">
      <div class="container">
        <div class="section-head"><div><h2>研究系列</h2><p class="section-note">単発の論文だけでなく、継続する警察×研究者の取り組みをたどります。</p></div><a class="card-link" href="#/programs">すべて見る →</a></div>
        <div class="grid">${data.programs.slice(0,6).map(p=>`<article class="card"><div class="meta">${escapeHtml(p.startYear)}〜</div><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(truncate(p.summary,135))}</p><a class="card-link" href="#/program/${p.id}">詳細を見る →</a></article>`).join("")}</div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-head"><div><h2>新しい年代の研究</h2><p class="section-note">初期版では公開年の新しい研究を表示します。追加日の管理は月次運用で導入予定です。</p></div><a class="card-link" href="#/studies">研究一覧 →</a></div>
        <div class="grid">${newest.map(studyCard).join("")}</div>
      </div>
    </section>`;
}
