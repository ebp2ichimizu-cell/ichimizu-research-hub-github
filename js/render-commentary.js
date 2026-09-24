import {
  escapeHtml,
  externalLink
} from "./utils.js";

import {
  getLanguage
} from "./i18n.js";


function labels() {

  return getLanguage() === "en"
    ? {
        commentary: "Research Hub commentary",
        pageTitle: "Research Hub commentary",
        back: "← Back to study details",
        loading: "Loading commentary...",
        notFound: "Commentary is not available for this study.",
        loadError: "The commentary could not be loaded.",
        statsClosed: "Check the statistics",
        originalHeading: "Read the original study",
        original: "Original study"
      }
    : {
        commentary: "研究HUB 独自解説",
        pageTitle: "サイトの独自解説",
        back: "← 研究整理ページに戻る",
        loading: "独自解説を読み込み中...",
        notFound: "この研究の独自解説はありません。",
        loadError: "独自解説を読み込めませんでした。",
        statsClosed: "統計で確認する",
        originalHeading: "原著を読む",
        original: "原著を読む"
      };
}


function ensureCommentaryStyles() {

  if (
    document.querySelector(
      'link[data-commentary-style]'
    )
  ) {
    return;
  }


  const link =
    document.createElement("link");

  link.rel = "stylesheet";
  link.href = "./css/commentary.css";
  link.dataset.commentaryStyle = "true";

  document.head.appendChild(link);
}


function safeUrl(value) {

  try {

    const url =
      new URL(
        value,
        location.href
      );

    if (
      url.protocol !== "http:" &&
      url.protocol !== "https:"
    ) {
      return "";
    }

    return url.href;

  } catch {

    return "";

  }
}


function inlineMarkdown(value = "") {

  let text =
    String(value);

  const tokens = [];


  function token(html) {

    const key =
      `\uE000${tokens.length}\uE001`;

    tokens.push(html);

    return key;
  }


  text =
    text.replace(
      /`([^`]+)`/g,
      (_,code) =>
        token(
          `<code>${escapeHtml(code)}</code>`
        )
    );


  text =
    text.replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+|#\/[^)\s]+)\)/g,
      (_,label,url) => {

        if (url.startsWith("#/")) {

          return token(
            `<a href="${escapeHtml(url)}">${escapeHtml(label)}</a>`
          );

        }


        const safe =
          safeUrl(url);

        if (!safe) {
          return label;
        }

        return token(
          `<a href="${escapeHtml(safe)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} ↗</a>`
        );
      }
    );


  text =
    escapeHtml(text);


  text =
    text.replace(
      /\*\*([^*]+)\*\*/g,
      "<strong>$1</strong>"
    );


  text =
    text.replace(
      /(^|[^*])\*([^*\n]+)\*(?!\*)/g,
      "$1<em>$2</em>"
    );


  tokens.forEach((html,index) => {

    const key =
      escapeHtml(
        `\uE000${index}\uE001`
      );

    text =
      text.replaceAll(
        key,
        html
      );

  });


  return text;
}


function splitTableRow(line) {

  return line
    .trim()
    .replace(/^\|/,"")
    .replace(/\|$/,"")
    .split("|")
    .map(cell =>
      cell.trim()
    );
}


function isTableSeparator(line) {

  const cells =
    splitTableRow(line);

  return (
    cells.length > 0 &&
    cells.every(cell =>
      /^:?-{3,}:?$/.test(cell)
    )
  );
}


function headingClass(text) {

  const plain =
    String(text)
      .replace(/\*\*/g,"")
      .trim();


  if (
    /研究HUB.*独自解説/i.test(plain) ||
    /Research Hub.*commentary/i.test(plain)
  ) {
    return "hub-commentary-heading";
  }


  if (
    /原著を読む/i.test(plain) ||
    /^Read the original/i.test(plain)
  ) {
    return "original-source-heading";
  }


  return "";
}


function renderMarkdown(markdown = "") {

  const lines =
    String(markdown)
      .replace(/\r\n?/g,"\n")
      .split("\n");

  const output = [];

  let i = 0;


  const isSpecialStart = (index) => {

    const line =
      lines[index] ?? "";

    const next =
      lines[index + 1] ?? "";

    return (
      /^\s*$/.test(line) ||
      /^```/.test(line) ||
      /^#{1,6}\s+/.test(line) ||
      /^>\s?/.test(line) ||
      /^[-*]\s+/.test(line) ||
      /^\d+\.\s+/.test(line) ||
      /^---+\s*$/.test(line) ||
      /^<!--/.test(line) ||
      (
        /^\|.*\|\s*$/.test(line) &&
        isTableSeparator(next)
      )
    );
  };


  while (i < lines.length) {

    const line =
      lines[i];


    if (/^\s*$/.test(line)) {
      i++;
      continue;
    }


    if (/^<!--/.test(line)) {

      while (
        i < lines.length &&
        !/-->/.test(lines[i])
      ) {
        i++;
      }

      i++;
      continue;
    }


    if (/^```/.test(line)) {

      const code = [];

      i++;

      while (
        i < lines.length &&
        !/^```/.test(lines[i])
      ) {
        code.push(lines[i]);
        i++;
      }

      if (i < lines.length) {
        i++;
      }

      output.push(
        `<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`
      );

      continue;
    }


    const heading =
      line.match(
        /^(#{1,6})\s+(.+)$/
      );

    if (heading) {

      const level =
        heading[1].length;

      const text =
        heading[2];

      const cssClass =
        headingClass(text);

      output.push(
        `<h${level}${cssClass ? ` class="${cssClass}"` : ""}>${inlineMarkdown(text)}</h${level}>`
      );

      i++;
      continue;
    }


    if (/^---+\s*$/.test(line)) {

      output.push("<hr>");

      i++;
      continue;
    }


    if (/^>\s?/.test(line)) {

      const quoteLines = [];

      while (
        i < lines.length &&
        /^>\s?/.test(lines[i])
      ) {

        quoteLines.push(
          lines[i]
            .replace(/^>\s?/,"")
        );

        i++;
      }


      const quoteText =
        quoteLines.join("\n");


      const aboutClass =
        (
          quoteText.includes("このページについて") ||
          quoteText.includes("About this commentary")
        )
          ? " commentary-about-box"
          : "";


      output.push(
        `<blockquote class="commentary-quote${aboutClass}">${renderMarkdown(quoteText)}</blockquote>`
      );

      continue;
    }


    if (
      /^\|.*\|\s*$/.test(line) &&
      isTableSeparator(
        lines[i + 1] ?? ""
      )
    ) {

      const header =
        splitTableRow(line);

      i += 2;

      const body = [];


      while (
        i < lines.length &&
        /^\|.*\|\s*$/.test(lines[i])
      ) {

        body.push(
          splitTableRow(lines[i])
        );

        i++;
      }


      output.push(`
        <div class="commentary-table-wrap">
          <table>
            <thead>
              <tr>
                ${header.map(cell =>
                  `<th>${inlineMarkdown(cell)}</th>`
                ).join("")}
              </tr>
            </thead>
            <tbody>
              ${body.map(row => `
                <tr>
                  ${row.map(cell =>
                    `<td>${inlineMarkdown(cell)}</td>`
                  ).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `);

      continue;
    }


    if (/^[-*]\s+/.test(line)) {

      const items = [];


      while (
        i < lines.length &&
        /^[-*]\s+/.test(lines[i])
      ) {

        items.push(
          lines[i]
            .replace(/^[-*]\s+/,"")
        );

        i++;
      }


      output.push(
        `<ul>${items.map(item =>
          `<li>${inlineMarkdown(item)}</li>`
        ).join("")}</ul>`
      );

      continue;
    }


    if (/^\d+\.\s+/.test(line)) {

      const items = [];


      while (
        i < lines.length &&
        /^\d+\.\s+/.test(lines[i])
      ) {

        items.push(
          lines[i]
            .replace(/^\d+\.\s+/,"")
        );

        i++;
      }


      output.push(
        `<ol>${items.map(item =>
          `<li>${inlineMarkdown(item)}</li>`
        ).join("")}</ol>`
      );

      continue;
    }


    const paragraph = [
      line.trim()
    ];

    i++;


    while (
      i < lines.length &&
      !isSpecialStart(i)
    ) {

      paragraph.push(
        lines[i].trim()
      );

      i++;
    }


    output.push(
      `<p>${inlineMarkdown(paragraph.join(" "))}</p>`
    );

  }


  return output.join("\n");
}


function removeFrontMatter(markdown) {

  const text =
    String(markdown)
      .replace(/\r\n?/g,"\n");


  if (!text.startsWith("---\n")) {
    return text;
  }


  const end =
    text.indexOf(
      "\n---\n",
      4
    );


  if (end < 0) {
    return text;
  }


  return text.slice(
    end + 5
  );
}


function renderWithStats(markdown) {

  const startMarker =
    "<!-- STATS_DETAIL_START -->";

  const endMarker =
    "<!-- STATS_DETAIL_END -->";


  const start =
    markdown.indexOf(startMarker);

  const end =
    markdown.indexOf(endMarker);


  if (
    start < 0 ||
    end < 0 ||
    end < start
  ) {

    return renderMarkdown(markdown);
  }


  const before =
    markdown.slice(
      0,
      start
    );


  let stats =
    markdown.slice(
      start + startMarker.length,
      end
    );


  const after =
    markdown.slice(
      end + endMarker.length
    );


  /*
   * The Markdown title is represented by the details summary in the UI.
   * The source Markdown remains unchanged.
   */
  stats =
    stats.replace(
      /^\s*##\s+(統計で確認する|Check the statistics)\s*\n/i,
      ""
    );


  const l =
    labels();


  return `
    ${renderMarkdown(before)}

    <details class="commentary-stats">

      <summary>
        ${escapeHtml(l.statsClosed)}
      </summary>

      <div class="commentary-stats-content">
        ${renderMarkdown(stats)}
      </div>

    </details>

    ${renderMarkdown(after)}
  `;
}


function renderOriginalActions(study) {

  if (!study?.url && !study?.doi) {
    return "";
  }


  const l =
    labels();


  return `
    <section class="commentary-original-source">

      <h2>
        ${escapeHtml(
          l.originalHeading
        )}
      </h2>

      <div class="source-links">

        ${externalLink(
          study.url,
          l.original
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


function findCommentaryStudy(data, id) {

  /*
   * Shared commentary slugs are used for research series.
   * Always prefer an exact study ID match before falling back to a shared slug.
   * This prevents an earlier related study from taking over the representative
   * study page when several records point to the same commentary file.
   */
  return (
    data.studies.find(
      item => item.id === id
    ) ||
    data.studies.find(
      item => item.commentary_slug === id
    )
  );
}


export function renderCommentary(
  data,
  id
) {

  ensureCommentaryStyles();


  const l =
    labels();


  const study =
    findCommentaryStudy(
      data,
      id
    );


  const commentary =
    study
      ? data.commentary?.[study.id]
      : null;


  if (
    !study ||
    !commentary?.has_commentary
  ) {

    return `
      <section class="section">
        <div class="container">

          <a
            class="back-link"
            href="#/studies"
          >
            ${escapeHtml(l.back)}
          </a>

          <div class="empty">
            ${escapeHtml(l.notFound)}
          </div>

        </div>
      </section>
    `;
  }


  return `

    <section class="page-head commentary-page-head">

      <div class="container">

        <a
          class="back-link"
          href="#/study/${escapeHtml(study.id)}"
        >
          ${escapeHtml(l.back)}
        </a>


        <div class="meta">
          ${escapeHtml(l.commentary)}
        </div>


        <h1>
          ${escapeHtml(l.pageTitle)}
        </h1>


        <p class="commentary-study-reference">
          ${escapeHtml(study.title)}
        </p>

      </div>

    </section>


    <section class="detail">

      <div class="container">

        <article class="commentary-article">

          <div
            id="commentaryContent"
            class="commentary-body"
            aria-live="polite"
          >
            <div class="loading">
              ${escapeHtml(l.loading)}
            </div>
          </div>

        </article>

      </div>

    </section>

  `;
}


export async function activateCommentary(
  data,
  id
) {

  const target =
    document.querySelector(
      "#commentaryContent"
    );


  if (!target) {
    return;
  }


  const study =
    findCommentaryStudy(
      data,
      id
    );


  const commentary =
    study
      ? data.commentary?.[study.id]
      : null;


  if (
    !study ||
    !commentary?.has_commentary
  ) {
    return;
  }


  const lang =
    getLanguage();


  const slug =
    commentary.commentary_slug ||
    study.id;


  const version =
    commentary.commentary_updated
      ? `?v=${encodeURIComponent(
          commentary.commentary_updated
        )}`
      : "";


  const url =
    `./content/commentary/${lang}/${slug}.md${version}`;


  try {

    const response =
      await fetch(
        url,
        {
          cache: "no-store"
        }
      );


    if (!response.ok) {

      throw new Error(
        `${url} (${response.status})`
      );

    }


    const markdown =
      await response.text();


    /*
     * Do not let a slower fetch from a previous language or route overwrite
     * the page after the user has navigated elsewhere.
     */
    const routeNow =
      (location.hash || "")
        .split("?")[0];


    if (
      getLanguage() !== lang ||
      routeNow !== `#/commentary/${id}`
    ) {
      return;
    }


    const body =
      removeFrontMatter(markdown);


    const hasOriginalSection =
      /^##\s+(原著を読む|Read the original study)\s*$/mi
        .test(body);


    target.innerHTML = `
      ${renderWithStats(body)}
      ${
        hasOriginalSection
          ? ""
          : renderOriginalActions(study)
      }
    `;


  } catch (error) {

    const l =
      labels();


    target.innerHTML = `
      <div class="empty">
        ${escapeHtml(l.loadError)}
        <br>
        ${escapeHtml(error.message)}
      </div>
    `;

  }
}
