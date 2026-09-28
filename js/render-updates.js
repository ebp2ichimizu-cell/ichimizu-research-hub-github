import {escapeHtml} from "./utils.js";
import {getLanguage} from "./i18n.js";
import {hubNumber} from "./hub-number.js";

function ensureStyles() {
  if (document.querySelector('link[data-hub-history-style]')) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "./css/hub-history.css";
  link.dataset.hubHistoryStyle = "true";
  document.head.appendChild(link);
}

function typeLabel(type, en) {
  const labels = {
    addition: en ? "New study" : "新規追加",
    information: en ? "Information update" : "情報更新",
    commentary: en ? "Commentary update" : "独自解説更新",
    metadata: en ? "Metadata correction" : "メタデータ修正",
    status: en ? "Status change" : "掲載状態変更"
  };

  return labels[type] || (en ? "Update" : "更新");
}

export function renderUpdates() {
  ensureStyles();

  const en = getLanguage() === "en";

  return `
    <section class="page-head">
      <div class="container">
        <h1>${en ? "Update history" : "更新履歴"}</h1>
        <p>
          ${en
            ? "Substantive additions and corrections to the Research Hub are recorded here."
            : "研究の追加、既存情報の更新、書誌情報の訂正、独自解説の実質的な改訂などを記録します。"}
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div id="updateHistoryContent" class="update-history-shell">
          <div class="loading">${en ? "Loading..." : "読み込み中..."}</div>
        </div>
      </div>
    </section>
  `;
}

export async function activateUpdates(data) {
  const host = document.querySelector("#updateHistoryContent");
  if (!host) return;

  const en = getLanguage() === "en";

  try {
    const res = await fetch("./data/update-history.json", {cache:"no-store"});
    if (!res.ok) throw new Error(String(res.status));

    const history = await res.json();
    const baseline = history.baseline || {};
    const updates = Array.isArray(history.updates) ? history.updates : [];

    const studyById =
      new Map((data.studies || []).map(study => [study.id, study]));

    host.innerHTML = `
      <section class="update-baseline">
        <div class="update-baseline-label">
          ${escapeHtml(en ? (baseline.label_en || "First edition") : (baseline.label || "初版"))}
        </div>

        <h2>
          ${en
            ? `${Number(baseline.studyCount || data.studies.length)} studies at baseline`
            : `収録研究 ${Number(baseline.studyCount || data.studies.length)}件を初版として確定`}
        </h2>

        <p>
          ${escapeHtml(
            en
              ? (baseline.description_en || "")
              : (baseline.description || "")
          )}
        </p>

        ${baseline.date
          ? `<p class="meta">${en ? "Baseline date" : "初版基準日"}：${escapeHtml(baseline.date)}</p>`
          : ""}
      </section>

      <div class="update-history-intro">
        ${en
          ? "Minor typographical or visual changes are normally omitted. Record numbers are permanent identifiers and are not reused."
          : "軽微な誤字脱字や表示上の修正は原則として掲載しません。HUB No.は固定識別子として扱い、並べ替えや掲載状態の変更があっても再利用しません。"}
      </div>

      <div class="update-history-list">
        ${updates.length
          ? [...updates]
              .sort((a,b) => String(b.date || "").localeCompare(String(a.date || "")))
              .map(entry => {
                const study = entry.studyId ? studyById.get(entry.studyId) : null;
                const title =
                  entry.title ||
                  study?.title ||
                  entry.target ||
                  "";
                const no = entry.studyId ? hubNumber(entry.studyId) : "";

                return `
                  <article class="update-entry">
                    <div class="update-entry-head">
                      <time datetime="${escapeHtml(entry.date || "")}">
                        ${escapeHtml(entry.date || "")}
                      </time>
                      <span class="update-type update-type-${escapeHtml(entry.type || "information")}">
                        ${escapeHtml(typeLabel(entry.type, en))}
                      </span>
                    </div>

                    ${title
                      ? `<h2>
                          ${entry.studyId
                            ? `<a href="#/study/${escapeHtml(entry.studyId)}">
                                ${no ? `<span class="hub-number-badge">${escapeHtml(no)}</span>` : ""}
                                ${escapeHtml(title)}
                               </a>`
                            : escapeHtml(title)}
                         </h2>`
                      : ""}

                    <p>
                      ${escapeHtml(
                        en
                          ? (entry.summary_en || entry.summary || "")
                          : (entry.summary || "")
                      )}
                    </p>
                  </article>
                `;
              })
              .join("")
          : `<div class="empty">
              ${en
                ? "No updates have been recorded after the first edition."
                : "初版公開後の更新はまだありません。"}
             </div>`
        }
      </div>
    `;
  } catch {
    host.innerHTML = `
      <div class="empty">
        ${en
          ? "The update-history data could not be loaded."
          : "更新履歴データを読み込めませんでした。"}
      </div>
    `;
  }
}
