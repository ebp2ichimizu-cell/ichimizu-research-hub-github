import {
  escapeHtml,
  externalLink,
  truncate
} from "./utils.js";


const item = (label, value) => {
  if (!value) return "";

  return `
    <div class="detail-info-item">
      <dt>${escapeHtml(label)}</dt>
      <dd>${escapeHtml(value)}</dd>
    </div>
  `;
};


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

  const currentThemes = new Set(study.themes || []);

  return data.studies
    .filter(candidate => candidate.id !== study.id)
    .map(candidate => {

      const sharedThemes = (candidate.themes || [])
        .filter(theme => currentThemes.has(theme));

      return {
        study: candidate,
        sharedThemes,
        score: sharedThemes.length
      };

    })
    .filter(item => item.score > 0)
    .sort((a, b) => {

      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return Number(b.study.year || 0) - Number(a.study.year || 0);

    })
    .slice(0, 4);
}


function renderRelatedStudies(data, study) {

  const related = findRelatedStudies(data, study);

  if (!related.length) return "";

  return `
    <section class="related-section">

      <div class="related-heading">
        <h2>関連する研究</h2>
        <p>
          同じ研究テーマを含む収録研究です。
          内容や効果が同一であることを意味するものではありません。
        </p>
      </div>

      <div class="related-grid">

        ${related.map(item => {

          const r = item.study;

          return `
            <article class="related-card">

              <div class="meta">
                ${escapeHtml(r.year)}
                ${r.publicationType
                  ? ` ・ ${escapeHtml(r.publicationType)}`
                  : ""
                }
              </div>

              <h3>
                <a href="#/study/${escapeHtml(r.id)}">
                  ${escapeHtml(r.title)}
                </a>
              </h3>

              <p class="related-summary">
                ${escapeHtml(
                  truncate(r.result || r.notes || "", 115)
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
                href="#/study/${escapeHtml(r.id)}"
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


export function renderStudyDetail(data, id) {

  const s = data.studies.find(study => study.id === id);

  if (!s) {

    return `
      <section class="section">
        <div class="container">
          <div class="empty">
            研究が見つかりません。
          </div>
        </div>
      </section>
    `;

  }


  return `

    <section class="page-head study-page-head">

      <div class="container">

        <a class="back-link" href="#/studies">
          ← 研究一覧に戻る
        </a>

        <div class="meta study-type">
          ${escapeHtml(s.year)}
          ${s.publicationType
            ? ` ・ ${escapeHtml(s.publicationType)}`
            : ""
          }
          ${s.reviewStatus
            ? ` ・ ${escapeHtml(s.reviewStatus)}`
            : ""
          }
        </div>

        <h1 class="detail-title">
          ${escapeHtml(s.title)}
        </h1>

        ${
          s.authorsText
            ? `
              <p class="detail-authors">
                ${escapeHtml(s.authorsText)}
              </p>
            `
            : ""
        }

        ${renderThemeTags(s)}

      </div>

    </section>


    <section class="detail">

      <div class="container">


        <section class="study-overview">

          <h2>研究の基本情報</h2>

          <dl class="detail-info-grid">

            ${item(
              "警察・実務機関",
              s.practiceOrganizationsText
            )}

            ${item(
              "研究機関",
              s.researchOrganizationsText
            )}

            ${item(
              "研究デザイン",
              s.design
            )}

            ${item(
              "対象",
              s.population
            )}

            ${item(
              "N / 対象数",
              s.sampleSize
            )}

            ${item(
              "掲載誌・資料",
              s.citation
            )}

          </dl>

        </section>


        ${
          s.intervention
            ? `
              <section class="detail-section">

                <div class="detail-label">
                  01
                </div>

                <h2>
                  介入・施策
                </h2>

                <p>
                  ${escapeHtml(s.intervention)}
                </p>

              </section>
            `
            : ""
        }


        ${
          s.comparison
            ? `
              <section class="detail-section">

                <div class="detail-label">
                  02
                </div>

                <h2>
                  比較
                </h2>

                <p>
                  ${escapeHtml(s.comparison)}
                </p>

              </section>
            `
            : ""
        }


        ${
          s.outcomesText
            ? `
              <section class="detail-section">

                <div class="detail-label">
                  03
                </div>

                <h2>
                  アウトカム
                </h2>

                <p>
                  ${escapeHtml(s.outcomesText)}
                </p>

              </section>
            `
            : ""
        }


        ${
          s.result
            ? `
              <section class="detail-section result-box">

                <div class="detail-label">
                  04
                </div>

                <h2>
                  主な結果
                </h2>

                <p>
                  ${escapeHtml(s.result)}
                </p>

              </section>
            `
            : ""
        }


        ${
          s.limitations
            ? `
              <section class="detail-section warning">

                <div class="detail-label">
                  05
                </div>

                <h2>
                  限界・注意
                </h2>

                <p>
                  ${escapeHtml(s.limitations)}
                </p>

              </section>
            `
            : ""
        }


        ${
          s.notes
            ? `
              <section class="detail-section note-box">

                <h2>
                  研究HUBでの収録上の備考
                </h2>

                <p>
                  ${escapeHtml(s.notes)}
                </p>

              </section>
            `
            : ""
        }


        ${
          s.url || s.doi
            ? `
              <section class="source-area">

                <h2>
                  原資料を確認する
                </h2>

                <div class="source-links">

                  ${externalLink(
                    s.url,
                    "原文・資料"
                  )}

                  ${
                    s.doi
                      ? externalLink(
                          `https://doi.org/${s.doi}`,
                          "DOI"
                        )
                      : ""
                  }

                </div>

              </section>
            `
            : ""
        }


        ${renderRelatedStudies(data, s)}


      </div>

    </section>

  `;

}
