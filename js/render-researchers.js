import {
  escapeHtml,
  truncate,
  externalLink,
  normalizeText
} from "./utils.js";

import {
  t,
  getLanguage
} from "./i18n.js";


function researcherName(researcher) {

  if (getLanguage() === "en") {

    const en =
      researcher.nameEn || "";

    const ja =
      researcher.nameJa ||
      researcher.name ||
      "";

    if (en && ja) {
      return `${en}｜${ja}`;
    }

    return en || ja;
  }

  return (
    researcher.nameJa ||
    researcher.name ||
    researcher.nameEn ||
    ""
  );
}


function researcherSortName(researcher) {

  if (getLanguage() === "en") {

    return (
      researcher.nameEn ||
      researcher.nameJa ||
      researcher.name ||
      ""
    );

  }

  return (
    researcher.nameJa ||
    researcher.name ||
    researcher.nameEn ||
    ""
  );
}


function renderTags(values = []) {

  if (!values.length) return "";

  return `
    <div class="badges">
      ${values.map(value => `
        <span class="badge">
          ${escapeHtml(value)}
        </span>
      `).join("")}
    </div>
  `;
}


function getResearcherStudies(data, researcher) {

  const ids =
    new Set(
      researcher.studyIds || []
    );

  return data.studies
    .filter(study =>
      ids.has(study.id)
    )
    .sort((a, b) =>
      Number(b.year || 0) -
      Number(a.year || 0)
    );
}


function renderStudies(data, researcher) {

  const studies =
    getResearcherStudies(
      data,
      researcher
    );


  if (!studies.length) {

    return `
      <section class="researcher-related-section">

        <div class="researcher-section-head">

          <h2>
            ${t("relatedRecordedStudies")}
          </h2>

          <p>
            ${t("noResearcherStudies")}
          </p>

        </div>

      </section>
    `;
  }


  return `
    <section class="researcher-related-section">

      <div class="researcher-section-head">

        <h2>
          ${t("relatedRecordedStudies")}

          <span class="researcher-count">
            ${studies.length}
          </span>
        </h2>

        <p>
          ${t("researcherStudiesNote")}
        </p>

      </div>


      <div class="researcher-study-list">

        ${studies.map(study => `

          <article class="researcher-study-card">

            <div class="meta">
              ${escapeHtml(study.year)}

              ${
                study.publicationType
                  ? ` ・ ${escapeHtml(
                      study.publicationType
                    )}`
                  : ""
              }
            </div>


            <h3>
              <a href="#/study/${escapeHtml(study.id)}">
                ${escapeHtml(study.title)}
              </a>
            </h3>


            ${
              study.result
                ? `
                  <p class="researcher-study-summary">
                    ${escapeHtml(
                      truncate(
                        study.result,
                        130
                      )
                    )}
                  </p>
                `
                : ""
            }


            ${renderTags(
              study.themes || []
            )}


            <a
              class="card-link"
              href="#/study/${escapeHtml(study.id)}"
            >
              ${t("viewDetails")}
            </a>

          </article>

        `).join("")}

      </div>

    </section>
  `;
}


function renderConfirmedPrograms(
  data,
  researcher
) {

  const ids =
    researcher.programIds || [];

  if (!ids.length) return "";


  const programs =
    data.programs.filter(
      program =>
        ids.includes(program.id)
    );


  if (!programs.length) return "";


  return `
    <section class="researcher-program-section">

      <div class="researcher-section-head">

        <h2>
          ${t("confirmedProgrammes")}
        </h2>

        <p>
          ${t("confirmedProgrammesNote")}
        </p>

      </div>


      <div class="researcher-program-list">

        ${programs.map(program => `

          <article class="researcher-program-card">

            <div class="meta">
              ${escapeHtml(program.startYear)}〜
            </div>


            <h3>
              <a href="#/program/${escapeHtml(program.id)}">
                ${escapeHtml(program.name)}
              </a>
            </h3>


            <p>
              ${escapeHtml(
                program.summary || ""
              )}
            </p>


            <a
              class="card-link"
              href="#/program/${escapeHtml(program.id)}"
            >
              ${t("viewProgramme")}
            </a>

          </article>

        `).join("")}

      </div>

    </section>
  `;
}


function renderResearcherDetail(
  data,
  researcher
) {

  return `

    <section class="page-head researcher-page-head">

      <div class="container">

        <a
          class="back-link"
          href="#/researchers"
        >
          ${t("backToResearchers")}
        </a>


        <div class="meta">
          ${t("researcherLabel")}
        </div>


        <h1 class="researcher-name">
          ${escapeHtml(
            researcherName(researcher)
          )}
        </h1>


        ${
          researcher.affiliation
            ? `
              <p class="researcher-affiliation">
                ${escapeHtml(
                  researcher.affiliation
                )}
              </p>
            `
            : ""
        }


        ${renderTags(
          researcher.themes || []
        )}

      </div>

    </section>


    <section class="detail">

      <div class="container">


        <section class="researcher-profile-grid">

          ${
            researcher.practiceConnection
              ? `
                <div class="researcher-profile-card">

                  <div class="researcher-profile-label">
                    PRACTICE
                  </div>

                  <h2>
                    ${t("practiceConnection")}
                  </h2>

                  <p>
                    ${escapeHtml(
                      researcher.practiceConnection
                    )}
                  </p>

                </div>
              `
              : ""
          }


          ${
            researcher.series?.length
              ? `
                <div class="researcher-profile-card">

                  <div class="researcher-profile-label">
                    SERIES
                  </div>

                  <h2>
                    ${t("mainResearchSeries")}
                  </h2>


                  <div class="researcher-series-tags">

                    ${researcher.series
                      .map(item => `
                        <span>
                          ${escapeHtml(item)}
                        </span>
                      `)
                      .join("")}

                  </div>

                </div>
              `
              : ""
          }

        </section>


        ${
          researcher.profileUrl
            ? `
              <section class="source-area">

                <h2>
                  ${t("researcherProfileHeading")}
                </h2>

                <div class="source-links">

                  ${externalLink(
                    researcher.profileUrl,
                    t("researcherProfileLink")
                  )}

                </div>

              </section>
            `
            : ""
        }


        ${renderStudies(
          data,
          researcher
        )}


        ${renderConfirmedPrograms(
          data,
          researcher
        )}

      </div>

    </section>
  `;
}


function renderResearcherList(data) {

  const locale =
    getLanguage() === "en"
      ? "en"
      : "ja";


  const researchers =
    [...data.researchers]
      .sort((a, b) =>
        researcherSortName(a)
          .localeCompare(
            researcherSortName(b),
            locale
          )
      );


  return `

    <section class="page-head">

      <div class="container">

        <h1>
          ${t("researchersTitle")}
        </h1>

        <p>
          ${t("researchersLead")}
        </p>

      </div>

    </section>


    <section class="section">

      <div class="container">


        <div class="researcher-toolbar">

          <input
            id="researcherSearch"
            type="search"
            placeholder="${t("researcherSearchPlaceholder")}"
          >

          <div
            id="researcherResultCount"
            class="result-count"
          ></div>

        </div>


        <div
          id="researcherList"
          class="researcher-list"
        >

          ${researchers.map(researcher => `

            <article
              class="researcher-card"

              data-search="${escapeHtml(
                normalizeText([
                  researcher.name,
                  researcher.nameEn,
                  researcher.nameJa,
                  researcher.affiliation,
                  ...(researcher.themes || []),
                  researcher.practiceConnection,
                  ...(researcher.series || [])
                ]
                .filter(Boolean)
                .join(" "))
              )}"
            >


              <div class="researcher-card-top">

                <div>

                  <h2>
                    <a href="#/researcher/${escapeHtml(researcher.id)}">
                      ${escapeHtml(
                        researcherName(
                          researcher
                        )
                      )}
                    </a>
                  </h2>


                  <div class="meta">
                    ${escapeHtml(
                      researcher.affiliation || ""
                    )}
                  </div>

                </div>


                <div class="research-count-badge">

                  ${(researcher.studyIds || []).length}

                  <span>
                    ${t("researchCountLabel")}
                  </span>

                </div>

              </div>


              ${renderTags(
                (researcher.themes || [])
                  .slice(0, 5)
              )}


              ${
                researcher.practiceConnection
                  ? `
                    <p class="researcher-card-practice">
                      ${escapeHtml(
                        truncate(
                          researcher.practiceConnection,
                          100
                        )
                      )}
                    </p>
                  `
                  : ""
              }


              <a
                class="card-link"
                href="#/researcher/${escapeHtml(researcher.id)}"
              >
                ${t("viewDetails")}
              </a>

            </article>

          `).join("")}

        </div>

      </div>

    </section>
  `;
}


export function activateResearchers() {

  const input =
    document.querySelector(
      "#researcherSearch"
    );

  const list =
    document.querySelector(
      "#researcherList"
    );

  const count =
    document.querySelector(
      "#researcherResultCount"
    );


  if (
    !input ||
    !list ||
    !count
  ) {
    return;
  }


  const cards = [
    ...list.querySelectorAll(
      ".researcher-card"
    )
  ];


  function update() {

    const q =
      normalizeText(
        input.value
      );


    let visible = 0;


    cards.forEach(card => {

      const text =
        card.dataset.search || "";


      const show =
        !q ||
        text.includes(q);


      card.hidden =
        !show;


      if (show) {
        visible++;
      }

    });


    count.textContent =
      `${visible}${t(
        "researcherCountSuffix"
      )}`;

  }


  input.addEventListener(
    "input",
    update
  );


  update();
}


export function renderResearchers(
  data,
  id = null
) {

  if (id) {

    const researcher =
      data.researchers.find(
        item =>
          item.id === id
      );


    if (!researcher) {

      return `
        <section class="section">

          <div class="container">

            <div class="empty">
              ${t("researcherNotFound")}
            </div>

          </div>

        </section>
      `;
    }


    return renderResearcherDetail(
      data,
      researcher
    );
  }


  return renderResearcherList(data);
}
