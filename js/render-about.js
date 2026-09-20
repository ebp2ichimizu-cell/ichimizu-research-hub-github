import {
  escapeHtml
} from "./utils.js";

import {
  t,
  getLanguage
} from "./i18n.js";


function policyItem(title,text) {

  if (!text) return "";

  return `
    <div class="about-policy-item">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(text)}</p>
    </div>
  `;
}


function policyValue(
  policy,
  japaneseKey,
  englishKey
) {

  return getLanguage() === "en"
    ? policy[englishKey]
    : policy[japaneseKey];
}


export function renderAbout(data) {

  const policy =
    data.policy || {};


  return `

    <section class="page-head about-page-head">

      <div class="container">

        <div class="meta">
          ABOUT THIS SITE
        </div>

        <h1>
          ${t("aboutTitle")}
        </h1>

        <p>
          ${t("aboutLead")}
        </p>

      </div>

    </section>


    <section class="section">

      <div class="container">


        <section class="about-intro">

          <div class="about-intro-main">

            <div class="about-label">
              PURPOSE
            </div>

            <h2>
              ${t("aboutPurposeTitle")}
            </h2>

            <p>
              ${t("aboutPurpose1")}
            </p>

            <p>
              ${t("aboutPurpose2")}
            </p>

          </div>


          <aside class="about-warning">

            <strong>
              ${t("importantNotice")}
            </strong>

            <p>
              ${t("importantNotice1")}
            </p>

            <p>
              ${t("importantNotice2")}
            </p>

          </aside>

        </section>


        <section class="about-section">

          <div class="about-section-head">

            <div class="about-label">
              SCOPE
            </div>

            <h2>
              ${t("scopeTitle")}
            </h2>

          </div>


          <div class="about-policy-grid">

            ${policyItem(
              getLanguage() === "en"
                ? "Coverage period"
                : "対象期間",
              policyValue(
                policy,
                "対象期間",
                "Coverage period"
              )
            )}

            ${policyItem(
              getLanguage() === "en"
                ? "Scope"
                : "対象となる研究",
              policyValue(
                policy,
                "対象",
                "Scope"
              )
            )}

            ${policyItem(
              getLanguage() === "en"
                ? "Additional sources"
                : "追加対象",
              policyValue(
                policy,
                "追加対象",
                "Additional sources"
              )
            )}

            ${policyItem(
              getLanguage() === "en"
                ? "Duplicate records"
                : "重複資料の扱い",
              policyValue(
                policy,
                "重複の扱い",
                "Duplicate records"
              )
            )}

          </div>

        </section>


        <section class="about-section about-reading">

          <div class="about-section-head">

            <div class="about-label">
              HOW TO READ
            </div>

            <h2>
              ${t("howToReadTitle")}
            </h2>

            <p>
              ${t("howToReadLead")}
            </p>

          </div>


          <div class="about-type-grid">

            <div class="about-type-card">

              <span>01</span>

              <h3>
                ${t("peerReviewedResearch")}
              </h3>

              <p>
                ${t("peerReviewedResearchText")}
              </p>

            </div>


            <div class="about-type-card">

              <span>02</span>

              <h3>
                ${t("bulletinsAndConferences")}
              </h3>

              <p>
                ${t("bulletinsAndConferencesText")}
              </p>

            </div>


            <div class="about-type-card">

              <span>03</span>

              <h3>
                ${t("officialReportsAndTrials")}
              </h3>

              <p>
                ${t("officialReportsAndTrialsText")}
              </p>

            </div>


            <div class="about-type-card">

              <span>04</span>

              <h3>
                ${t("ongoingResearch")}
              </h3>

              <p>
                ${t("ongoingResearchText")}
              </p>

            </div>

          </div>


          <div class="about-policy-note">

            ${escapeHtml(
              policyValue(
                policy,
                "刊行形態の扱い",
                "Publication types"
              ) || ""
            )}

          </div>

        </section>


        <section class="about-section">

          <div class="about-section-head">

            <div class="about-label">
              COLLECTION POLICY
            </div>

            <h2>
              ${t("collectionPolicyTitle")}
            </h2>

          </div>


          <div class="about-policy-grid">

            ${policyItem(
              getLanguage() === "en"
                ? "Inclusion policy"
                : "研究結果で選別しない",
              policyValue(
                policy,
                "収集方針",
                "Inclusion policy"
              )
            )}

            ${policyItem(
              getLanguage() === "en"
                ? "Main search sources"
                : "主な検索先",
              policyValue(
                policy,
                "主要検索先",
                "Main search sources"
              )
            )}

            ${policyItem(
              getLanguage() === "en"
                ? "Nikkoso Research Foundation for Safe Society"
                : "社会安全研究財団資料",
              policyValue(
                policy,
                "日工組社会安全研究財団",
                "Nikkoso Research Foundation for Safe Society"
              )
            )}

          </div>

        </section>


        <section class="about-section">

          <div class="about-section-head">

            <div class="about-label">
              LIMITATIONS
            </div>

            <h2>
              ${t("limitationsTitle")}
            </h2>

          </div>


          <div class="about-limit-box">

            <p>
              ${escapeHtml(
                policyValue(
                  policy,
                  "注意",
                  "Limitations"
                ) || ""
              )}
            </p>

            <p>
              ${t("limitationsExtra1")}
            </p>

            <p>
              ${t("limitationsExtra2")}
            </p>

          </div>

        </section>


        <section class="about-section">

          <div class="about-section-head">

            <div class="about-label">
              USE THE HUB
            </div>

            <h2>
              ${t("useHubTitle")}
            </h2>

          </div>


          <div class="about-links">

            <a href="#/studies">
              <strong>
                ${t("aboutIndividualStudies")}
              </strong>
              <span>
                ${t("aboutIndividualStudiesText")}
              </span>
            </a>

            <a href="#/programs">
              <strong>
                ${t("aboutProgrammes")}
              </strong>
              <span>
                ${t("aboutProgrammesText")}
              </span>
            </a>

            <a href="#/researchers">
              <strong>
                ${t("aboutResearchers")}
              </strong>
              <span>
                ${t("aboutResearchersText")}
              </span>
            </a>

            <a href="#/reports">
              <strong>
                ${t("aboutReports")}
              </strong>
              <span>
                ${t("aboutReportsText")}
              </span>
            </a>

          </div>

        </section>


        <section class="about-operation">

          <h2>
            ${t("operationTitle")}
          </h2>

          <p>
            ${t("operationText1")}
          </p>

          <p>
            ${t("operationText2")}
          </p>

        </section>


      </div>

    </section>
  `;
}
