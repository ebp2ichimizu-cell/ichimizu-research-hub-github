
import {normalizeText, studySearchText} from "./utils.js";
export function filterStudies(studies,{q="",theme="",type=""}={}){
  const query=normalizeText(q);
  return studies.filter(study=>{
    if(query && !studySearchText(study).includes(query)) return false;
    if(theme && !(study.themes||[]).includes(theme)) return false;
    if(type && study.publicationType!==type) return false;
    return true;
  });
}
