import {hubNumber} from "./hub-number.js";
import {getLanguage} from "./i18n.js";

function ensureStyles() {
  if (document.querySelector('link[data-hub-history-style]')) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "./css/hub-history.css";
  link.dataset.hubHistoryStyle = "true";
  document.head.appendChild(link);
}

function addBadge(container, id, target, position = "afterbegin") {
  if (!container || container.querySelector(":scope > .hub-number-badge")) return;

  const label = hubNumber(id);
  if (!label) return;

  const badge = document.createElement("span");
  badge.className = "hub-number-badge";
  badge.textContent = label;

  if (target) {
    target.insertAdjacentElement(position, badge);
  }
}

function addNumbersToListAndCards() {
  document
    .querySelectorAll('a[href^="#/study/study-"]')
    .forEach(link => {
      const match = link.getAttribute("href")?.match(/#\/study\/(study-\d+)/);
      if (!match) return;

      const id = match[1];

      const row = link.closest(".study-row");
      if (row) {
        const top = row.querySelector(".row-top");
        if (top && !top.querySelector(".hub-number-badge")) {
          const badge = document.createElement("span");
          badge.className = "hub-number-badge";
          badge.textContent = hubNumber(id);
          top.prepend(badge);
        }
        return;
      }

      const card =
        link.closest(".card, .related-card, .program-study-card, .researcher-study-card");

      if (card && !card.querySelector(".hub-number-badge")) {
        const firstMeta = card.querySelector(".meta");
        const badge = document.createElement("span");
        badge.className = "hub-number-badge";
        badge.textContent = hubNumber(id);

        if (firstMeta) {
          firstMeta.prepend(badge);
        } else {
          card.prepend(badge);
        }
      }
    });
}

function addNumberToDetailPage() {
  const match = location.hash.match(/^#\/study\/(study-\d+)/);
  if (!match) return;

  const meta = document.querySelector(".study-page-head .study-type");
  if (!meta || meta.querySelector(".hub-number-badge")) return;

  const badge = document.createElement("span");
  badge.className = "hub-number-badge hub-number-detail";
  badge.textContent = hubNumber(match[1]);
  meta.prepend(badge);
}

async function addHomeBaselineStatus(data) {
  const isHome =
    location.hash === "" ||
    location.hash === "#/" ||
    location.hash === "#";

  if (!isHome) return;

  const stats = document.querySelector(".hero .stats");
  if (!stats || document.querySelector(".hub-baseline-status")) return;

  try {
    const res = await fetch("./data/update-history.json", {cache:"no-store"});
    if (!res.ok) return;

    const history = await res.json();
    const baseline = history.baseline || {};
    const updates = Array.isArray(history.updates) ? history.updates : [];
    const latest =
      updates.length
        ? updates.map(x => x.date).filter(Boolean).sort().at(-1)
        : baseline.date || "";

    const box = document.createElement("div");
    box.className = "hub-baseline-status";

    if (getLanguage() === "en") {
      box.innerHTML = `
        <strong>${baseline.label_en || "First edition"}</strong>
        <span>${Number(baseline.studyCount || data.studies.length)} studies</span>
        ${latest ? `<span>Last substantive update: ${latest}</span>` : ""}
        <a href="#/updates">Update history →</a>
      `;
    } else {
      box.innerHTML = `
        <strong>${baseline.label || "初版"}</strong>
        <span>収録研究 ${Number(baseline.studyCount || data.studies.length)}件</span>
        ${latest ? `<span>最終実質更新 ${latest}</span>` : ""}
        <a href="#/updates">更新履歴 →</a>
      `;
    }

    stats.insertAdjacentElement("afterend", box);
  } catch {
    // 更新履歴が未配置でも既存ページを壊さない
  }
}

export function activateHubNumberUi(data) {
  ensureStyles();
  addNumbersToListAndCards();
  addNumberToDetailPage();
  addHomeBaselineStatus(data);
}
