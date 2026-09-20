import {
  escapeHtml,
  truncate
} from "./utils.js";

import {
  t,
  getLanguage
} from "./i18n.js";


function topThemes(studies){

  const counts = new Map();

  studies
    .flatMap(s => s.themes || [])
    .forEach(theme =>
      counts.set(
        theme,
        (counts.get(theme) || 0) + 1
      )
    );

  return [...counts.entries()]
    .sort((a,b) => b[1] - a[1])
    .slice(0,12);
}


function studyCard(study){

  return `
    <article class="card">

      <div class="meta">
        ${escapeHtml(study.year)}
        ・
        ${escapeHtml(
          study.publicationType ||
          t("genericMaterial")
        )}
      </div>

      <h3>
        ${escapeHtml(study.title)}
      </h3>

      <p class="meta">
        ${escapeHtml(study.authorsText || "")}
      </p>

      <p>
        ${escapeHtml(
          truncate(
            study.result ||
            study.intervention ||
            "",
            130
          )
        )}
      </p>

      <div class="badges">

        ${(study.themes || [])
          .slice(0,3)
          .map(theme => `
            <span class="badge">
              ${escapeHtml(theme)}
            </span>
          `)
          .join("")}

      </div>

      <a
        class="card-link"
        href="#/study/${study.id}"
      >
        ${t("viewDetails")}
      </a>

    </article>
  `;
}


export function renderHome(data){

  const newest = [...data.studies]
    .sort((a,b) =>
      (Number(b.year) || 0) -
      (Number(a.year) || 0) ||
      b.sourceOrder - a.sourceOrder
    )
    .slice(0,6);


  const themes =
    topThemes(data.studies);


  const years =
    data.studies
      .map(s => Number(s.year))
      .filter(Number.isFinite);


  const minYear =
    Math.min(...years);

  const maxYear =
    Math.max(...years);


  const isEnglish =
    getLanguage() === "en";


  return `

    <section class="hero">

      <div class="hero-inner">

        <img
          class="hero-logo"
          src="./assets/logo/ichimizu-logo.png"
          alt="${isEnglish
            ? "Ichimizu EBP2 logo"
            : "EBP2 いちみず会 ロゴ"
          }"
        >


        <div>

          <p class="eyebrow">
            ${t("homeEyebrow")}
          </p>


          <h1>
            ${
              isEnglish
                ? t("homeTitle")
                : "国内の犯罪予防研究を、<br>探す・つなぐ・使う。"
            }
          </h1>


          <p class="hero-lead">
            ${t("homeLead")}
          </p>


          <div class="search-shell">

            <form
              id="homeSearch"
              class="search-row"
            >

              <input
                class="search-input"
                name="q"
                aria-label="${t("searchButton")}"
                placeholder="${t("searchPlaceholder")}"
              >

              <button
                class="primary-btn"
                type="submit"
              >
                ${t("searchButton")}
              </button>

            </form>


            <a
              class="search-link"
              href="#/studies"
            >
              ${t("advancedSearch")}
            </a>

          </div>


          <div class="stats">

            <div class="stat">
              <strong>${data.studies.length}</strong>
              <span>${t("individualStudies")}</span>
            </div>

            <div class="stat">
              <strong>${data.programs.length}</strong>
              <span>${t("researchProgrammes")}</span>
            </div>

            <div class="stat">
              <strong>${minYear}–${maxYear}</strong>
              <span>${t("coveragePeriod")}</span>
            </div>

          </div>

        </div>

      </div>

    </section>


    <section class="section">

      <div class="container">

        <div class="section-head">

          <div>

            <h2>
              ${t("browseByTheme")}
            </h2>

            <p class="section-note">
              ${t("themeAutoCount")}
            </p>

          </div>

        </div>


        <div class="topic-grid">

          ${themes.map(([theme,count]) => `

            <a
              class="topic-button"
              href="#/studies?theme=${encodeURIComponent(theme)}"
            >

              <span>
                ${escapeHtml(theme)}
              </span>

              <span class="topic-count">
                ${count}
              </span>

            </a>

          `).join("")}

        </div>

      </div>

    </section>


    <section class="section alt">

      <div class="container">

        <div class="section-head">

          <div>

            <h2>
              ${t("researchSeries")}
            </h2>

            <p class="section-note">
              ${t("researchSeriesLead")}
            </p>

          </div>


          <a
            class="card-link"
            href="#/programs"
          >
            ${t("viewAll")}
          </a>

        </div>


        <div class="grid">

          ${data.programs
            .slice(0,6)
            .map(program => `

              <article class="card">

                <div class="meta">
                  ${escapeHtml(program.startYear)}〜
                </div>

                <h3>
                  ${escapeHtml(program.name)}
                </h3>

                <p>
                  ${escapeHtml(
                    truncate(
                      program.summary,
                      135
                    )
                  )}
                </p>

                <a
                  class="card-link"
                  href="#/program/${program.id}"
                >
                  ${t("viewDetails")}
                </a>

              </article>

            `).join("")}

        </div>

      </div>

    </section>


    <section class="section">

      <div class="container">

        <div class="section-head">

          <div>

            <h2>
              ${t("recentStudies")}
            </h2>

            <p class="section-note">
              ${t("recentStudiesNote")}
            </p>

          </div>


          <a
            class="card-link"
            href="#/studies"
          >
            ${t("studyList")}
          </a>

        </div>


        <div class="grid">
          ${newest.map(studyCard).join("")}
        </div>

      </div>

    </section>

  `;
}
