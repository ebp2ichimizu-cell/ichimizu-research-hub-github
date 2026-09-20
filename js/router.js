
export function parseRoute(){
  const raw=(location.hash || "#/").replace(/^#\/?/,"");
  const parts=raw.split("/").filter(Boolean);
  return {page:parts[0]||"home", id:parts[1]||null};
}
export function startRouter(handler){
  window.addEventListener("hashchange",handler);
  handler();
}
