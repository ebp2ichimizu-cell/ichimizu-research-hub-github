import {
  escapeHtml,
  externalLink,
  truncate
} from "./utils.js";

import {
  t,
  getLanguage
} from "./i18n.js";


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


function separator() {
  return getLanguage() === "en" ? ", " : "、";
}


function yearLabel(year) {
  return getLanguage() === "en"
    ? escapeHtml(year)
    : `${escapeHtml(year)}年`;
}


function organizationMatch(program, study) {

  const programOrgs = [
    ...(program.policeOrganizations || []),
    ...(program.researchOrganizations || [])
  ];

  const studyOrgs = [
    ...(study.practiceOrganizations || []),
    ...(study.researchOrganizations || [])
  ];

  return programOrgs.some(programOrg =>
    studyOrgs.some(studyOrg =>
      studyOrg.includes(programOrg) ||
      programOrg.includes(studyOrg)
    )
  );
}


function themeMatch(program, study) {

  const programThemes = program.themes || [];
  const studyThemes = study.themes || [];

  return programThemes.some(programTheme =>
    studyThemes.some(studyTheme =>
      programTheme.includes(studyTheme) ||
      studyTheme.includes(programTheme)
    )
  );
}


function findRelatedCandidates(data, program) {

  return data.studies
    .map(study => {

      const org = organizationMatch(program, study);
      const theme = themeMatch(program, study);

      let score = 0;

      if (org) score += 2;
      if (theme) score += 1;

      return {study, score};

    })
    .filter(item => item.score >= 2)
    .sort((a,b) => {

      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return Number(b.study.year || 0) -
             Number(a.study.year || 0);

    })
    .slice(0,6);
}


function renderCandidateStudies(data, program) {

  const candidates =
    findRelatedCandidates(data, program);


  if (!candidates.length) {

    return `
      <section class="program-related-section">

        <div class="program-section-head">

          <h2>
            ${t("relatedIndividualStudies")}
          </h2>

          <p>
            ${t("noRelatedStudies")}
          </p>

        </div>

      </section>
    `;
  }


  return `
    <section class="program-related-section">

      <div class="program-section-head">

        <h2>
          ${t("relatedIndividualStudies")}
        </h2>

        <p>
          ${t("candidateStudiesNote")}
        </p>

      </div>


      <div class="program-study-list">

        ${candidates.map(item => {

          const study = item.study;

          return `
            <article class="program-study-card">

              <div class="meta">
                ${escapeHtml(study.year)}
                ${
                  study.publicationType
                    ? ` ・ ${escapeHtml(study.publicationType)}`
                    : ""
                }
              </div>

              <h3>
                <a href="#/study/${escapeHtml(study.id)}">
                  ${escapeHtml(study.title)}
                </a>
              </h3>

              ${
                study.authorsText
                  ? `
                    <p class="program-study-authors">
                      ${escapeHtml(study.authorsText)}
                    </p>
                  `
                  : ""
              }

              ${
                study.result
                  ? `
                    <p class="program-study-summary">
                      ${escapeHtml(
                        truncate(study.result,125)
                      )}
                    </p>
                  `
                  : ""
              }

              ${renderTags(study.themes || [])}

              <a
                class="card-link"
                href="#/study/${escapeHtml(study.id)}"
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


function renderProgramDetail(data, program) {

  return `

    <section class="page-head program-page-head">

      <div class="container">

        <a
          class="back-link"
          href="#/programs"
        >
          ${t("backToProgrammes")}
        </a>

        <div class="meta">
          ${escapeHtml(program.startYear)}〜
        </div>

        <h1 class="program-title">
          ${escapeHtml(program.name)}
        </h1>

        ${renderTags(program.themes)}

      </div>

    </section>


    <section class="detail">

      <div class="container">

        <section class="program-summary-box">

          <div class="program-summary-label">
            SERIES
          </div>

          <h2>
            ${t("aboutProgramme")}
          </h2>

          <p>
            ${escapeHtml(program.summary)}
          </p>

        </section>


        <section class="program-info-section">

          <h2>
            ${t("organisations")}
          </h2>

          <dl class="detail-info-grid">

            <div class="detail-info-item">
              <dt>${t("practiceOrganisation")}</dt>
              <dd>
                ${escapeHtml(
                  (program.policeOrganizations || [])
                    .join(separator())
                )}
              </dd>
            </div>

            <div class="detail-info-item">
              <dt>${t("researchOrganisation")}</dt>
              <dd>
                ${escapeHtml(
                  (program.researchOrganizations || [])
                    .join(separator())
                )}
              </dd>
            </div>

            <div class="detail-info-item">
              <dt>${t("startYear")}</dt>
              <dd>${yearLabel(program.startYear)}</dd>
            </div>

            <div class="detail-info-item">
              <dt>${t("mainThemes")}</dt>
              <dd>
                ${escapeHtml(
                  (program.themes || [])
                    .join(separator())
                )}
              </dd>
            </div>

          </dl>

        </section>


        ${
          program.url
            ? `
              <section class="source-area">

                <h2>
                  ${t("officialInformation")}
                </h2>

                <div class="source-links">
                  ${externalLink(
                    program.url,
                    t("officialInformationLink")
                  )}
                </div>

              </section>
            `
            : ""
        }

        ${renderCandidateStudies(data,program)}

      </div>

    </section>
  `;
}


function renderProgramList(data) {

  const programs = [...data.programs]
    .sort((a,b) =>
      Number(a.startYear || 0) -
      Number(b.startYear || 0)
    );


  return `

    <section class="page-head">

      <div class="container">

        <h1>
          ${t("programmesTitle")}
        </h1>

        <p>
          ${t("programmesLead")}
        </p>

      </div>

    </section>


    <section class="section">

      <div class="container">

        <div class="program-list">

          ${programs.map(program => `

            <article class="program-list-card">

              <div class="program-year">
                ${escapeHtml(program.startYear)}〜
              </div>

              <div class="program-list-main">

                <h2>
                  <a href="#/program/${escapeHtml(program.id)}">
                    ${escapeHtml(program.name)}
                  </a>
                </h2>

                <p>
                  ${escapeHtml(program.summary)}
                </p>

                ${renderTags(program.themes)}

                <a
                  class="card-link"
                  href="#/program/${escapeHtml(program.id)}"
                >
                  ${t("viewProgramme")}
                </a>

              </div>

            </article>

          `).join("")}

        </div>

      </div>

    </section>
  `;
}


export function renderPrograms(data,id=null) {

  if (id) {

    const program =
      data.programs.find(
        item => item.id === id
      );

    if (!program) {

      return `
        <section class="section">
          <div class="container">
            <div class="empty">
              ${t("programmeNotFound")}
            </div>
          </div>
        </section>
      `;
    }

    return renderProgramDetail(data,program);
  }

  return renderProgramList(data);
}
