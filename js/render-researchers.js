import {
  escapeHtml,
  truncate,
  externalLink,
  normalizeText
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


function getResearcherStudies(data, researcher) {

  const ids = new Set(researcher.studyIds || []);

  return data.studies
    .filter(study => ids.has(study.id))
    .sort((a, b) =>
      Number(b.year || 0) - Number(a.year || 0)
    );
}


function programText(program) {

  return normalizeText([
    program.name,
    program.summary,
    ...(program.themes || []),
    ...(program.policeOrganizations || []),
    ...(program.researchOrganizations || [])
  ].join(" "));
}


function findRelatedPrograms(data, researcher) {

  const keys = [
    ...(researcher.series || []),
    ...(researcher.themes || [])
  ]
    .map(normalizeText)
    .filter(Boolean);


  return data.programs
    .map(program => {

      const text = programText(program);

      const matches = keys.filter(key =>
        text.includes(key) ||
        key.includes(text)
      );

      return {
        program,
        score: matches.length,
        matches
      };

    })
    .filter(item => item.score > 0)
    .sort((a, b) => {

      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return Number(b.program.startYear || 0) -
             Number(a.program.startYear || 0);

    })
    .slice(0, 4);
}


function renderStudies(data, researcher) {

  const studies =
    getResearcherStudies(data, researcher);

  if (!studies.length) {

    return `
      <section class="researcher-related-section">

        <div class="researcher-section-head">

          <h2>
            関連する収録研究
          </h2>

          <p>
            現在の研究マスターでは、
            この研究者に紐づく個別研究は
            登録されていません。
          </p>

        </div>

      </section>
    `;

  }


  return `
    <section class="researcher-related-section">

      <div class="researcher-section-head">

        <h2>
          関連する収録研究
          <span class="researcher-count">
            ${studies.length}
          </span>
        </h2>

        <p>
          研究マスターでこの研究者に
          明示的に紐づけられている研究です。
        </p>

      </div>


      <div class="researcher-study-list">

        ${studies.map(study => `

          <article class="researcher-study-card">

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
              study.result
                ? `
                  <p class="researcher-study-summary">
                    ${escapeHtml(
                      truncate(study.result, 130)
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
              詳細を見る →
            </a>

          </article>

        `).join("")}

      </div>

    </section>
  `;
}


function renderPrograms(data, researcher) {

  const programs =
    findRelatedPrograms(data, researcher);

  if (!programs.length) return "";


  return `
    <section class="researcher-program-section">

      <div class="researcher-section-head">

        <h2>
          関連する研究系列候補
        </h2>

        <p>
          研究者マスターの「主な研究系列」や
          研究テーマと、研究系列データの記述が
          重なるものを表示しています。
          正式な所属関係を意味するものではありません。
        </p>

      </div>


      <div class="researcher-program-list">

        ${programs.map(item => {

          const p = item.program;

          return `
            <article class="researcher-program-card">

              <div class="meta">
                ${escapeHtml(p.startYear)}〜
              </div>

              <h3>
                <a href="#/program/${escapeHtml(p.id)}">
                  ${escapeHtml(p.name)}
                </a>
              </h3>

              <p>
                ${escapeHtml(
                  truncate(p.summary || "", 110)
                )}
              </p>

              <a
                class="card-link"
                href="#/program/${escapeHtml(p.id)}"
              >
                系列を見る →
              </a>

            </article>
          `;

        }).join("")}

      </div>

    </section>
  `;
}


function renderResearcherDetail(data, researcher) {

  return `

    <section class="page-head researcher-page-head">

      <div class="container">

        <a
          class="back-link"
          href="#/researchers"
        >
          ← 研究者一覧に戻る
        </a>

        <div class="meta">
          研究者
        </div>

        <h1 class="researcher-name">
          ${escapeHtml(researcher.name)}
        </h1>

        ${
          researcher.affiliation
            ? `
              <p class="researcher-affiliation">
                ${escapeHtml(researcher.affiliation)}
              </p>
            `
            : ""
        }

        ${renderTags(researcher.themes || [])}

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
                    警察・実務との接点
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
                    主な研究系列
                  </h2>

                  <div class="researcher-series-tags">

                    ${researcher.series.map(item => `
                      <span>
                        ${escapeHtml(item)}
                      </span>
                    `).join("")}

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
                  研究者情報を確認する
                </h2>

                <div class="source-links">

                  ${externalLink(
                    researcher.profileUrl,
                    "研究者プロフィール"
                  )}

                </div>

              </section>
            `
            : ""
        }


        ${renderStudies(data, researcher)}

        ${renderPrograms(data, researcher)}


      </div>

    </section>
  `;
}


function renderResearcherList(data) {

  const researchers = [...data.researchers]
    .sort((a, b) =>
      a.name.localeCompare(
        b.name,
        "ja"
      )
    );


  return `

    <section class="page-head">

      <div class="container">

        <h1>
          研究者・機関
        </h1>

        <p>
          国内の犯罪予防・警察活動研究に関わる研究者を、
          所属・研究テーマ・実務との接点からたどります。
        </p>

      </div>

    </section>


    <section class="section">

      <div class="container">

        <div class="researcher-toolbar">

          <input
            id="researcherSearch"
            type="search"
            placeholder="研究者名、所属、研究テーマ"
            aria-label="研究者検索"
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
                  researcher.affiliation,
                  ...(researcher.themes || []),
                  researcher.practiceConnection,
                  ...(researcher.series || [])
                ].join(" "))
              )}"
            >

              <div class="researcher-card-top">

                <div>

                  <h2>
                    <a
                      href="#/researcher/${escapeHtml(researcher.id)}"
                    >
                      ${escapeHtml(researcher.name)}
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
                  <span>研究</span>
                </div>

              </div>


              ${renderTags(
                (researcher.themes || []).slice(0, 5)
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
                詳細を見る →
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
    document.querySelector("#researcherSearch");

  const list =
    document.querySelector("#researcherList");

  const count =
    document.querySelector("#researcherResultCount");


  if (!input || !list || !count) return;


  const cards = [
    ...list.querySelectorAll(".researcher-card")
  ];


  function update() {

    const q =
      normalizeText(input.value);

    let visible = 0;


    cards.forEach(card => {

      const text =
        card.dataset.search || "";

      const show =
        !q || text.includes(q);

      card.hidden = !show;

      if (show) visible++;

    });


    count.textContent =
      `${visible}名を表示`;

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
        item => item.id === id
      );


    if (!researcher) {

      return `
        <section class="section">
          <div class="container">
            <div class="empty">
              研究者が見つかりません。
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
