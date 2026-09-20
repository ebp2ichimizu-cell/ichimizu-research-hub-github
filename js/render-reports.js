import {
  escapeHtml,
  truncate,
  externalLink
} from "./utils.js";

import {
  t,
  getLanguage
} from "./i18n.js";


function renderReportDetail(report) {

  return `

    <section class="page-head report-page-head">

      <div class="container">

        <a
          class="back-link"
          href="#/reports"
        >
          ${t("backToReports")}
        </a>

        <div class="meta">
          ${escapeHtml(report.year)}
          ${
            report.type
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
            ${t("reportPosition")}
          </strong>

          <p>
            ${t("reportPositionText")}
          </p>

        </div>


        <section class="report-info-section">

          <h2>
            ${t("basicInformation")}
          </h2>

          <dl class="detail-info-grid">

            <div class="detail-info-item">
              <dt>${t("year")}</dt>
              <dd>${escapeHtml(report.year)}</dd>
            </div>

            <div class="detail-info-item">
              <dt>${t("materialType")}</dt>
              <dd>${escapeHtml(report.type || "")}</dd>
            </div>

            <div class="detail-info-item">
              <dt>${t("organisation")}</dt>
              <dd>${escapeHtml(report.organization || "")}</dd>
            </div>

            <div class="detail-info-item">
              <dt>${t("collaborators")}</dt>
              <dd>${escapeHtml(report.collaborators || "")}</dd>
            </div>

          </dl>

        </section>


        ${
          report.summary
            ? `
              <section class="detail-section report-summary-box">

                <h2>
                  ${t("contentAndPosition")}
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
                  ${t("sourceHeading")}
                </h2>

                <div class="source-links">

                  ${externalLink(
                    report.url,
                    t("officialSource")
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

  const locale =
    getLanguage() === "en"
      ? "en"
      : "ja";


  const reports =
    [...data.reports]
      .sort((a,b) => {

        if (
          Number(b.year) !==
          Number(a.year)
        ) {
          return Number(b.year) -
                 Number(a.year);
        }

        return a.title.localeCompare(
          b.title,
          locale
        );
      });


  const types =
    [...new Set(
      reports
        .map(report => report.type)
        .filter(Boolean)
    )]
    .sort((a,b) =>
      a.localeCompare(b,locale)
    );


  return `

    <section class="page-head">

      <div class="container">

        <h1>
          ${t("reportsTitle")}
        </h1>

        <p>
          ${t("reportsLead")}
        </p>

      </div>

    </section>


    <section class="section">

      <div class="container">


        <div class="report-guide">

          <strong>
            ${t("reportGuideTitle")}
          </strong>

          <p>
            ${t("reportGuideText")}
          </p>

        </div>


        <div class="report-toolbar">

          <input
            id="reportSearch"
            type="search"
            placeholder="${t("reportSearchPlaceholder")}"
          >

          <select id="reportTypeFilter">

            <option value="">
              ${t("allReportTypes")}
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
              ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase())}"
            >

              <div class="report-card-head">

                <div>

                  <div class="meta">
                    ${escapeHtml(report.year)}
                  </div>

                  <div class="report-type">
                    ${escapeHtml(
                      report.type ||
                      t("genericMaterial")
                    )}
                  </div>

                </div>

              </div>


              <h2>
                <a href="#/report/${escapeHtml(report.id)}">
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
                        truncate(
                          report.summary,
                          160
                        )
                      )}
                    </p>
                  `
                  : ""
              }


              <a
                class="card-link"
                href="#/report/${escapeHtml(report.id)}"
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


export function activateReports() {

  const search =
    document.querySelector("#reportSearch");

  const typeFilter =
    document.querySelector("#reportTypeFilter");

  const list =
    document.querySelector("#reportList");

  const count =
    document.querySelector("#reportResultCount");


  if (!search || !typeFilter || !list || !count) {
    return;
  }


  const cards =
    [...list.querySelectorAll(".report-card")];


  function normalize(value) {

    return String(value || "")
      .normalize("NFKC")
      .toLowerCase()
      .replace(/\s+/g," ")
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

      const show =
        (!query || text.includes(query)) &&
        (!selectedType || type === selectedType);

      card.hidden = !show;

      if (show) visible++;
    });


    count.textContent =
      `${visible}${t("reportCountSuffix")}`;
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


export function renderReports(data,id=null) {

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
              ${t("reportNotFound")}
            </div>
          </div>
        </section>
      `;
    }

    return renderReportDetail(report);
  }

  return renderReportList(data);
}
