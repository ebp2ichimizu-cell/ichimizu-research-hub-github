import {getLanguage} from "./i18n.js";


export async function loadAllData(){

  const lang =
    getLanguage();

  const suffix =
    lang === "en"
      ? "en"
      : "ja";


  const files = {
    studies:
      `./data/studies-${suffix}.json`,

    programs:
      `./data/programs-${suffix}.json`,

    researchers:
      `./data/researchers-${suffix}.json`,

    reports:
      `./data/reports-${suffix}.json`,

    policy:
      `./data/site-policy-${suffix}.json`
  };


  const entries =
    await Promise.all(

      Object.entries(files)
        .map(async ([key,url])=>{

          const res =
            await fetch(url);

          if(!res.ok){
            throw new Error(
              `${url} could not be loaded`
            );
          }

          return [
            key,
            await res.json()
          ];

        })

    );


  return Object.fromEntries(entries);
}
