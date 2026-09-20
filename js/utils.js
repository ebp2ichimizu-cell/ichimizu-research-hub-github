
export function normalizeText(value=""){
  return String(value).normalize("NFKC").toLowerCase().replace(/\s+/g," ").trim();
}
export function escapeHtml(value=""){
  return String(value)
    .replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
    .replaceAll('"',"&quot;").replaceAll("'","&#039;");
}
export function studySearchText(study){
  return normalizeText([
    study.title,study.authorsText,study.practiceOrganizationsText,
    study.researchOrganizationsText,study.themesText,study.intervention,
    study.population,study.comparison,study.outcomesText,study.design,
    study.result,study.limitations,study.publicationType,study.reviewStatus,
    study.citation,study.notes
  ].join(" "));
}
export function truncate(text="", n=150){
  const t=String(text); return t.length>n ? t.slice(0,n)+"…" : t;
}
export function unique(values){
  return [...new Set(values.filter(Boolean))];
}
export function externalLink(url,label){
  if(!url) return "";
  return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} ↗</a>`;
}
