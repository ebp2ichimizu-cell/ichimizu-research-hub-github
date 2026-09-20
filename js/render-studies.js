import {
  filterStudies
} from "./search.js";

import {
  escapeHtml,
  unique,
  truncate
} from "./utils.js";

import {
  t,
  getLanguage
} from "./i18n.js";


function parseQuery(){

  const hash =
    location.hash;

  const qpos =
    hash.indexOf("?");

  return new URLSearchParams(
    qpos >= 0
      ? hash.slice(qpos + 1)
      : ""
  );
}


function row(study){

  return `
    <article class="study-row">

      <div class="row-top">

        <span class="badge">
          ${escapeHtml(study.year)}
        </span>

        <span class="meta">
          ${escapeHtml(
            study.publicationType || ""
          )}
        </span>

        <span class="meta">
          ${escapeHtml(
            study.reviewStatus || ""
          )}
        </span>

      </div>


      <h2>

        <a
          href="#/study/${study.id}"
        >
          ${escapeHtml(study.title)}
        </a>

      </h2>


      <div class="meta">
        ${escapeHtml(study.authorsText || "")}
      </div>


      <p>
        ${escapeHtml(
          truncate(
            study.result ||
            study.intervention ||
            "",
            180
          )
        )}
      </p>


      <div class="badges">

        ${(study.themes || [])
          .map(theme => `
            <span class="badge">
              ${escapeHtml(theme)}
            </span>
          `)
          .join("")}

      </div>

    </article>
  `;
}


export function renderStudies(data){

  const params =
    parseQuery();

  const presetTheme =
    params.get("theme") || "";

  const presetQ =
    params.get("q") || "";


  const locale =
    getLanguage() === "en"
      ? "en"
      : "ja";


  const themes =
    unique(
      data.studies.flatMap(
        study => study.themes || []
      )
    )
    .sort((a,b) =>
      a.localeCompare(b, locale)
    );


  const types =
    unique(
      data.studies.map(
        study => study.publicationType
      )
    )
    .filter(Boolean)
    .sort((a,b) =>
      a.localeCompare(b, locale)
    );


  return `

    <section class="page-head">

      <div class="container">

        <h1>
          ${t("findStudies")}
        </h1>

        <p>
          ${t("findStudiesLead")}
        </p>

      </div>

    </section>


    <section class="section">

      <div class="container">


        <div class="toolbar">

          <input
            id="studyQuery"
            value="${escapeHtml(presetQ)}"
            placeholder="${t("keywordSearch")}"
          >


          <select id="themeFilter">

            <option value="">
              ${t("allThemes")}
            </option>

            ${themes.map(theme => `

              <option
                ${theme === presetTheme
                  ? "selected"
                  : ""
                }
                value="${escapeHtml(theme)}"
              >
                ${escapeHtml(theme)}
              </option>

            `).join("")}

          </select>


          <select id="typeFilter">

            <option value="">
              ${t("allPublicationTypes")}
            </option>

            ${types.map(type => `

              <option
                value="${escapeHtml(type)}"
              >
                ${escapeHtml(type)}
              </option>

            `).join("")}

          </select>

        </div>


        <div
          id="resultCount"
          class="result-count"
        ></div>


        <div
          id="studyList"
          class="list"
        ></div>


      </div>

    </section>

  `;
}


export function activateStudies(data){

  const q =
    document.querySelector("#studyQuery");

  const theme =
    document.querySelector("#themeFilter");

  const type =
    document.querySelector("#typeFilter");

  const list =
    document.querySelector("#studyList");

  const count =
    document.querySelector("#resultCount");


  if (!q) return;


  function update(){

    const result =
      filterStudies(
        data.studies,
        {
          q: q.value,
          theme: theme.value,
          type: type.value
        }
      )
      .sort((a,b) =>
        (Number(b.year) || 0) -
        (Number(a.year) || 0) ||
        b.sourceOrder - a.sourceOrder
      );


    count.textContent =
      getLanguage() === "en"
        ? `${result.length}${t("resultCountSuffix")}`
        : `${result.length}${t("resultCountSuffix")}`;


    list.innerHTML =
      result.length
        ? result.map(row).join("")
        : `
            <div class="empty">
              ${t("noStudiesFound")}
            </div>
          `;

  }


  [q,theme,type]
    .forEach(element =>
      element.addEventListener(
        element === q
          ? "input"
          : "change",
        update
      )
    );


  update();
}
