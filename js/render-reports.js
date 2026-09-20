import {
  escapeHtml,
  truncate,
  externalLink
} from "./utils.js";


function renderReportDetail(report) {

  return `

    <section class="page-head report-page-head">

      <div class="container">

        <a
          class="back-link"
          href="#/reports"
        >
          ← 公的報告一覧に戻る
        </a>

        <div class="meta">
          ${escapeHtml(report.year)}
          ${report.type
            ? ` ・ ${escapeHtml(report.type)}`
            : ""
          }
        </div>

        <h1 class="detail-title">
          ${escapeHtml(report.title)}
        </h1>

      </div>

    </section>


    <section class="detail">

      <div class="container">


        <div class="report-status-note">

          <strong>
            資料の位置づけ
          </strong>

          <p>
            このページは、査読論文とは区別して、
            公的報告、共同研究・実証、
            進行中研究などを整理しています。
            掲載自体は効果やエビデンスの確実性を
            保証するものではありません。
          </p>

        </div>


        <section class="report-info-section">

          <h2>
            基本情報
          </h2>

          <dl class="detail-info-grid">

            <div class="detail-info-item">

              <dt>
                年
              </dt>

              <dd>
                ${escapeHtml(report.year)}
              </dd>

            </div>


            <div class="detail-info-item">

              <dt>
                資料種別
              </dt>

              <dd>
                ${escapeHtml(report.type || "")}
              </dd>

            </div>


            <div class="detail-info-item">

              <dt>
                機関
              </dt>

              <dd>
                ${escapeHtml(report.organization || "")}
              </dd>

            </div>


            <div class="detail-info-item">

              <dt>
                研究者・協働先
              </dt>

              <dd>
                ${escapeHtml(report.collaborators || "")}
              </dd>

            </div>

          </dl>

        </section>


        ${
          report.summary
            ? `
              <section class="detail-section report-summary-box">

                <h2>
                  内容・位置づけ
                </h2>

                <p>
                  ${escapeHtml(report.summary)}
                </p>

              </section>
            `
            : ""
        }


        ${
          report.url
            ? `
              <section class="source-area">

                <h2>
                  原資料を確認する
                </h2>

                <div class="source-links">

                  ${externalLink(
                    report.url,
                    "公式資料・原資料"
                  )}

                </div>

              </section>
            `
            : ""
        }


      </div>

    </section>

  `;
}


function renderReportList(data) {

  const reports = [...data.reports]
    .sort((a, b) => {

      if (Number(b.year) !== Number(a.year)) {
        return Number(b.year) - Number(a.year);
      }

      return a.title.localeCompare(
        b.title,
        "ja"
      );

    });


  const types = [
    ...new Set(
      reports
        .map(report => report.type)
        .filter(Boolean)
    )
  ].sort((a, b) =>
    a.localeCompare(b, "ja")
  );


  return `

    <section class="page-head">

      <div class="container">

        <h1>
          公的報告・未論文化資料
        </h1>

        <p>
          査読論文とは区別して、
          警察・大学等の公的報告、
          共同研究・実証、
          進行中研究などを収録しています。
        </p>

      </div>

    </section>


    <section class="section">

      <div class="container">


        <div class="report-guide">

          <strong>
            このページの読み方
          </strong>

          <p>
            ここに掲載される資料は、
            研究の存在や実務上の取り組みを
            把握するための資料です。
            掲載されていること自体は、
            介入効果が確認されていることや、
            査読済みであることを意味しません。
          </p>

        </div>


        <div class="report-toolbar">

          <input
            id="reportSearch"
            type="search"
            placeholder="資料名、機関、研究者・協働先"
            aria-label="公的報告検索"
          >

          <select
            id="reportTypeFilter"
            aria-label="資料種別"
          >

            <option value="">
              すべての資料種別
            </option>

            ${types.map(type => `
              <option value="${escapeHtml(type)}">
                ${escapeHtml(type)}
              </option>
            `).join("")}

          </select>

        </div>


        <div
          id="reportResultCount"
          class="result-count"
        ></div>


        <div
          id="reportList"
          class="report-list"
        >

          ${reports.map(report => `

            <article
              class="report-card"
              data-type="${escapeHtml(report.type || "")}"
              data-search="${escapeHtml([
                report.title,
                report.organization,
                report.collaborators,
                report.type,
                report.summary
              ].filter(Boolean).join(" ").toLowerCase())}"
            >

              <div class="report-card-head">

                <div>

                  <div class="meta">
                    ${escapeHtml(report.year)}
                  </div>

                  <div class="report-type">
                    ${escapeHtml(report.type || "資料")}
                  </div>

                </div>

              </div>


              <h2>

                <a
                  href="#/report/${escapeHtml(report.id)}"
                >
                  ${escapeHtml(report.title)}
                </a>

              </h2>


              ${
                report.organization
                  ? `
                    <div class="report-organization">
                      ${escapeHtml(report.organization)}
                    </div>
                  `
                  : ""
              }


              ${
                report.summary
                  ? `
                    <p>
                      ${escapeHtml(
                        truncate(report.summary, 160)
                      )}
                    </p>
                  `
                  : ""
              }


              <a
                class="card-link"
                href="#/report/${escapeHtml(report.id)}"
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


export function activateReports() {

  const search =
    document.querySelector("#reportSearch");

  const typeFilter =
    document.querySelector("#reportTypeFilter");

  const list =
    document.querySelector("#reportList");

  const count =
    document.querySelector("#reportResultCount");


  if (
    !search ||
    !typeFilter ||
    !list ||
    !count
  ) {
    return;
  }


  const cards = [
    ...list.querySelectorAll(".report-card")
  ];


  function normalize(value) {

    return String(value || "")
      .normalize("NFKC")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }


  function update() {

    const query =
      normalize(search.value);

    const selectedType =
      typeFilter.value;

    let visible = 0;


    cards.forEach(card => {

      const text =
        normalize(card.dataset.search);

      const type =
        card.dataset.type || "";


      const matchesSearch =
        !query ||
        text.includes(query);


      const matchesType =
        !selectedType ||
        type === selectedType;


      const show =
        matchesSearch &&
        matchesType;


      card.hidden = !show;


      if (show) {
        visible++;
      }

    });


    count.textContent =
      `${visible}件を表示`;

  }


  search.addEventListener(
    "input",
    update
  );


  typeFilter.addEventListener(
    "change",
    update
  );


  update();
}


export function renderReports(
  data,
  id = null
) {

  if (id) {

    const report =
      data.reports.find(
        item => item.id === id
      );


    if (!report) {

      return `
        <section class="section">
          <div class="container">

            <div class="empty">
              資料が見つかりません。
            </div>

          </div>
        </section>
      `;

    }


    return renderReportDetail(report);
  }


  return renderReportList(data);
}
