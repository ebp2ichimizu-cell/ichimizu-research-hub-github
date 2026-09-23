import {
  escapeHtml,
  externalLink,
  truncate
} from "./utils.js";

import {
  t,
  getLanguage
} from "./i18n.js";


const item = (label, value) => {

  if (!value) return "";

  return `
    <div class="detail-info-item">

      <dt>
        ${escapeHtml(label)}
      </dt>

      <dd>
        ${escapeHtml(value)}
      </dd>

    </div>
  `;
};


function commentaryLabels() {

  return getLanguage() === "en"
    ? {
        heading: "Continue reading",
        commentary: "Read the Research Hub commentary",
        original: "Read the original study"
      }
    : {
        heading: "さらに詳しく読む",
        commentary: "サイトの独自解説で詳しく見る",
        original: "原著を読む"
      };
}


function renderThemeTags(study) {

  if (!study.themes?.length) return "";

  return `
    <div class="detail-theme-list">

      ${study.themes.map(theme => `

        <a
          class="detail-theme"
          href="#/studies?theme=${encodeURIComponent(theme)}"
        >
          ${escapeHtml(theme)}
        </a>

      `).join("")}

    </div>
  `;
}


function findRelatedStudies(data, study) {

  const currentThemes =
    new Set(study.themes || []);


  return data.studies
    .filter(candidate =>
      candidate.id !== study.id
    )
    .map(candidate => {

      const sharedThemes =
        (candidate.themes || [])
          .filter(theme =>
            currentThemes.has(theme)
          );

      return {
        study: candidate,
        sharedThemes,
        score: sharedThemes.length
      };

    })
    .filter(item =>
      item.score > 0
    )
    .sort((a,b) => {

      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return (
        Number(b.study.year || 0) -
        Number(a.study.year || 0)
      );

    })
    .slice(0,4);
}


function renderRelatedStudies(data, study) {

  const related =
    findRelatedStudies(data, study);


  if (!related.length) return "";


  return `

    <section class="related-section">

      <div class="related-heading">

        <h2>
          ${t("relatedStudies")}
        </h2>

        <p>
          ${t("relatedStudiesNote")}
        </p>

      </div>


      <div class="related-grid">

        ${related.map(item => {

          const relatedStudy =
            item.study;

          return `

            <article class="related-card">

              <div class="meta">

                ${escapeHtml(
                  relatedStudy.year
                )}

                ${
                  relatedStudy.publicationType
                    ? ` ・ ${escapeHtml(
                        relatedStudy.publicationType
                      )}`
                    : ""
                }

              </div>


              <h3>

                <a
                  href="#/study/${escapeHtml(
                    relatedStudy.id
                  )}"
                >
                  ${escapeHtml(
                    relatedStudy.title
                  )}
                </a>

              </h3>


              <p class="related-summary">

                ${escapeHtml(
                  truncate(
                    relatedStudy.result ||
                    relatedStudy.notes ||
                    "",
                    115
                  )
                )}

              </p>


              <div class="badges">

                ${item.sharedThemes.map(theme => `

                  <span class="badge">
                    ${escapeHtml(theme)}
                  </span>

                `).join("")}

              </div>


              <a
                class="card-link"
                href="#/study/${escapeHtml(
                  relatedStudy.id
                )}"
              >
                ${t("viewDetails")}
              </a>

            </article>

          `;

        }).join("")}

      </div>

    </section>
  `;
}


function renderReadingActions(study) {

  if (!study.url && !study.doi && !study.has_commentary) {
    return "";
  }


  if (!study.has_commentary) {

    return `
      <section class="source-area">

        <h2>
          ${t("sourceHeading")}
        </h2>

        <div class="source-links">

          ${externalLink(
            study.url,
            t("sourceMaterial")
          )}

          ${
            study.doi
              ? externalLink(
                  `https://doi.org/${study.doi}`,
                  "DOI"
                )
              : ""
          }

        </div>

      </section>
    `;
  }


  const labels =
    commentaryLabels();

  const slug =
    study.commentary_slug ||
    study.id;


  return `
    <section class="source-area">

      <h2>
        ${labels.heading}
      </h2>

      <div class="source-links">

        <a
          href="#/commentary/${escapeHtml(slug)}"
        >
          ${labels.commentary}
        </a>

        ${externalLink(
          study.url,
          labels.original
        )}

        ${
          study.doi
            ? externalLink(
                `https://doi.org/${study.doi}`,
                "DOI"
              )
            : ""
        }

      </div>

    </section>
  `;
}


export function renderStudyDetail(data, id) {

  const study =
    data.studies.find(
      item => item.id === id
    );


  if (!study) {

    return `
      <section class="section">

        <div class="container">

          <div class="empty">
            ${t("studyNotFound")}
          </div>

        </div>

      </section>
    `;
  }


  return `

    <section class="page-head study-page-head">

      <div class="container">

        <a
          class="back-link"
          href="#/studies"
        >
          ${t("backToStudies")}
        </a>


        <div class="meta study-type">

          ${escapeHtml(study.year)}

          ${
            study.publicationType
              ? ` ・ ${escapeHtml(
                  study.publicationType
                )}`
              : ""
          }

          ${
            study.reviewStatus
              ? ` ・ ${escapeHtml(
                  study.reviewStatus
                )}`
              : ""
          }

        </div>


        <h1 class="detail-title">
          ${escapeHtml(study.title)}
        </h1>


        ${
          study.authorsText
            ? `
              <p class="detail-authors">
                ${escapeHtml(
                  study.authorsText
                )}
              </p>
            `
            : ""
        }


        ${renderThemeTags(study)}

      </div>

    </section>


    <section class="detail">

      <div class="container">


        <section class="study-overview">

          <h2>
            ${t("studyOverview")}
          </h2>


          <dl class="detail-info-grid">

            ${item(
              t("practiceOrganisation"),
              study.practiceOrganizationsText
            )}

            ${item(
              t("researchOrganisation"),
              study.researchOrganizationsText
            )}

            ${item(
              t("researchDesign"),
              study.design
            )}

            ${item(
              t("population"),
              study.population
            )}

            ${item(
              t("sampleSize"),
              study.sampleSize
            )}

            ${item(
              t("publication"),
              study.citation
            )}

          </dl>

        </section>


        ${
          study.intervention
            ? `
              <section class="detail-section">

                <div class="detail-label">
                  01
                </div>

                <h2>
                  ${t("intervention")}
                </h2>

                <p>
                  ${escapeHtml(
                    study.intervention
                  )}
                </p>

              </section>
            `
            : ""
        }


        ${
          study.comparison
            ? `
              <section class="detail-section">

                <div class="detail-label">
                  02
                </div>

                <h2>
                  ${t("comparison")}
                </h2>

                <p>
                  ${escapeHtml(
                    study.comparison
                  )}
                </p>

              </section>
            `
            : ""
        }


        ${
          study.outcomesText
            ? `
              <section class="detail-section">

                <div class="detail-label">
                  03
                </div>

                <h2>
                  ${t("outcomes")}
                </h2>

                <p>
                  ${escapeHtml(
                    study.outcomesText
                  )}
                </p>

              </section>
            `
            : ""
        }


        ${
          study.result
            ? `
              <section class="detail-section result-box">

                <div class="detail-label">
                  04
                </div>

                <h2>
                  ${t("mainFindings")}
                </h2>

                <p>
                  ${escapeHtml(
                    study.result
                  )}
                </p>

              </section>
            `
            : ""
        }


        ${
          study.limitations
            ? `
              <section class="detail-section warning">

                <div class="detail-label">
                  05
                </div>

                <h2>
                  ${t("limitations")}
                </h2>

                <p>
                  ${escapeHtml(
                    study.limitations
                  )}
                </p>

              </section>
            `
            : ""
        }


        ${
          study.notes
            ? `
              <section class="detail-section note-box">

                <h2>
                  ${t("hubNote")}
                </h2>

                <p>
                  ${escapeHtml(
                    study.notes
                  )}
                </p>

              </section>
            `
            : ""
        }


        ${renderReadingActions(study)}


        ${renderRelatedStudies(
          data,
          study
        )}


      </div>

    </section>

  `;
}
