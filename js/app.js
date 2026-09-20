
import {loadAllData} from "./data-loader.js";
import {parseRoute,startRouter} from "./router.js";
import {renderHome} from "./render-home.js";
import {renderStudies,activateStudies} from "./render-studies.js";
import {renderStudyDetail} from "./render-study-detail.js";
import {renderPrograms} from "./render-programs.js";
import {
  renderResearchers,
  activateResearchers
} from "./render-researchers.js";
import {
  renderReports,
  activateReports
} from "./render-reports.js";
import {escapeHtml} from "./utils.js";
import {renderAbout} from "./render-about.js";

const app=document.querySelector("#app");
let data=null;


function page(){
 const route=parseRoute();
 if(!data) return;
 switch(route.page){
  case "home": case "": app.innerHTML=renderHome(data); activateHome(); break;
  case "studies": app.innerHTML=renderStudies(data); activateStudies(data); break;
  case "study": app.innerHTML=renderStudyDetail(data,route.id); break;
  case "programs": app.innerHTML=renderPrograms(data); break;
  case "program": app.innerHTML=renderPrograms(data,route.id); break;
  case "researchers":
  app.innerHTML = renderResearchers(data);
  activateResearchers();
  break;
  case "researcher": app.innerHTML=renderResearchers(data,route.id); break;
　case "reports":
  app.innerHTML = renderReports(data);
  activateReports();
  break;
  case "report": app.innerHTML=renderReports(data,route.id); break;
  case "about": app.innerHTML=renderAbout(data); break;
  default: app.innerHTML=`<section class="section"><div class="container"><div class="empty">ページが見つかりません。</div></div></section>`;
 }
 window.scrollTo({top:0,behavior:"instant"});
 app.focus({preventScroll:true});
}
function activateHome(){
  const form=document.querySelector("#homeSearch");
  if(form) form.addEventListener("submit",e=>{
    e.preventDefault();
    const q=new FormData(form).get("q")||"";
    location.hash=`#/studies?q=${encodeURIComponent(q)}`;
  });
}
document.querySelector("#menuButton").addEventListener("click",()=>{
  const nav=document.querySelector("#globalNav"),btn=document.querySelector("#menuButton");
  nav.classList.toggle("open");btn.setAttribute("aria-expanded",String(nav.classList.contains("open")));
});
document.querySelector("#globalNav").addEventListener("click",()=>document.querySelector("#globalNav").classList.remove("open"));
document.querySelector("#englishButton").addEventListener("click",()=>{
  alert("英語版は次段階で実装します。日本語版と同一IDで対応させます。");
});
try{
 data=await loadAllData();
 startRouter(page);
}catch(err){
 app.innerHTML=`<section class="section"><div class="container"><div class="empty">データの読み込みに失敗しました。GitHub Pages等のWebサーバー上で開いてください。<br>${escapeHtml(err.message)}</div></div></section>`;
}
