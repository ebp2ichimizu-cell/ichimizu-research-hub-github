import {
  escapeHtml,
  externalLink,
  truncate
} from "./utils.js";


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

      return {
        study,
        score,
        org,
        theme
      };

    })
    .filter(item => item.score >= 2)
    .sort((a, b) => {

      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return Number(b.study.year || 0) -
             Number(a.study.year || 0);

    })
    .slice(0, 6);
}


function renderCandidateStudies(data, program) {

  const candidates =
    findRelatedCandidates(data, program);

  if (!candidates.length) {

    return `
      <section class="program-related-section">

        <div class="program-section-head">
          <h2>関連する個別研究</h2>

          <p>
            現在の公開データから明確に対応する
            個別研究を抽出できませんでした。
          </p>
        </div>

      </section>
    `;

  }


  return `
    <section class="program-related-section">

      <div class="program-section-head">

        <h2>
          関連する個別研究
        </h2>

        <p>
          機関または研究テーマが重なる収録研究です。
          現段階では研究系列への正式な所属を
          意味するものではありません。
        </p>

      </div>


      <div class="program-study-list">

        ${candidates.map(item => {

          const s = item.study;

          return `
            <article class="program-study-card">

              <div class="meta">
                ${escapeHtml(s.year)}
                ${
                  s.publicationType
                    ? ` ・ ${escapeHtml(s.publicationType)}`
                    : ""
                }
              </div>

              <h3>
                <a href="#/study/${escapeHtml(s.id)}">
                  ${escapeHtml(s.title)}
                </a>
              </h3>

              ${
                s.authorsText
                  ? `
                    <p class="program-study-authors">
                      ${escapeHtml(s.authorsText)}
                    </p>
                  `
                  : ""
              }

              ${
                s.result
                  ? `
                    <p class="program-study-summary">
                      ${escapeHtml(
                        truncate(s.result, 125)
                      )}
                    </p>
                  `
                  : ""
              }

              ${renderTags(s.themes || [])}

              <a
                class="card-link"
                href="#/study/${escapeHtml(s.id)}"
              >
                詳細を見る →
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
          ← 研究系列一覧に戻る
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
            この研究系列について
          </h2>

          <p>
            ${escapeHtml(program.summary)}
          </p>

        </section>


        <section class="program-info-section">

          <h2>
            関係機関
          </h2>

          <dl class="detail-info-grid">

            <div class="detail-info-item">

              <dt>
                警察・実務機関
              </dt>

              <dd>
                ${escapeHtml(
                  (program.policeOrganizations || [])
                    .join("、")
                )}
              </dd>

            </div>


            <div class="detail-info-item">

              <dt>
                研究機関
              </dt>

              <dd>
                ${escapeHtml(
                  (program.researchOrganizations || [])
                    .join("、")
                )}
              </dd>

            </div>


            <div class="detail-info-item">

              <dt>
                開始年
              </dt>

              <dd>
                ${escapeHtml(program.startYear)}年
              </dd>

            </div>


            <div class="detail-info-item">

              <dt>
                主なテーマ
              </dt>

              <dd>
                ${escapeHtml(
                  (program.themes || [])
                    .join("、")
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
                  公式情報を確認する
                </h2>

                <div class="source-links">

                  ${externalLink(
                    program.url,
                    "公式情報"
                  )}

                </div>

              </section>
            `
            : ""
        }


        ${renderCandidateStudies(data, program)}


      </div>

    </section>

  `;
}


function renderProgramList(data) {

  const programs = [...data.programs]
    .sort((a, b) =>
      Number(a.startYear || 0) -
      Number(b.startYear || 0)
    );


  return `

    <section class="page-head">

      <div class="container">

        <h1>
          研究系列
        </h1>

        <p>
          単発の研究だけでなく、
          警察と研究者による継続的な共同研究や
          社会実装の流れをたどります。
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
                  <a
                    href="#/program/${escapeHtml(program.id)}"
                  >
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
                  系列を見る →
                </a>

              </div>

            </article>

          `).join("")}

        </div>

      </div>

    </section>

  `;
}


export function renderPrograms(data, id = null) {

  if (id) {

    const program =
      data.programs.find(item => item.id === id);

    if (!program) {

      return `
        <section class="section">
          <div class="container">
            <div class="empty">
              研究系列が見つかりません。
            </div>
          </div>
        </section>
      `;

    }

    return renderProgramDetail(
      data,
      program
    );
  }


  return renderProgramList(data);
}
