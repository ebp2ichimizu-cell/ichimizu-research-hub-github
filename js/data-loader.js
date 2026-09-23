import {
  getLanguage
} from "./i18n.js";


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
            await fetch(
              url,
              {
                cache: "no-store"
              }
            );


          if(!res.ok){

            throw new Error(
              `${url} could not be loaded (${res.status})`
            );

          }


          return [
            key,
            await res.json()
          ];

        })

    );


  const data =
    Object.fromEntries(entries);


  /*
   * Commentary metadata is intentionally kept in a separate public index.
   * This keeps the commentary feature independent from the research master
   * while still attaching has_commentary / commentary_slug to study objects
   * at runtime.
   *
   * The index is optional so a staged GitHub upload cannot break the
   * existing Research Hub if this file has not yet been uploaded.
   */
  try {

    const commentaryResponse =
      await fetch(
        "./data/commentary-index.json",
        {
          cache: "no-store"
        }
      );


    data.commentary =
      commentaryResponse.ok
        ? await commentaryResponse.json()
        : {};

  } catch {

    data.commentary = {};

  }


  data.studies =
    data.studies.map(study => ({

      ...study,

      ...(
        data.commentary?.[study.id] ||
        {}
      )

    }));


  return data;
}
