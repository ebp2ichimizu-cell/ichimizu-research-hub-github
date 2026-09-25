import {
  escapeHtml
} from "./utils.js";

import {
  getLanguage
} from "./i18n.js";


const CHATGPT_URL =
  "https://chatgpt.com/";


function labels() {

  return getLanguage() === "en"
    ? {
        button: "Ask ChatGPT",
        pageTitle: "Use AI to understand this study",
        lead: "After reading the Research Hub material, you can use your own ChatGPT to clarify or organise points you want to understand better.",
        howTo: "How to use",
        steps: [
          "Choose what you want to ask about.",
          "Check the question text shown below.",
          "Select “Copy the full text”.",
          "Select “Open ChatGPT in your browser”.",
          "Paste the copied text into ChatGPT and send it."
        ],
        launchNote: "Selecting “Open ChatGPT in your browser” opens the web version of ChatGPT. Paste the copied text there and send it.",
        siteNote: "This website does not generate the AI answer.",
        choose: "1. Choose what you want to ask",
        prompt: "2. Text to copy into ChatGPT",
        copy: "Copy the full text",
        copied: "The full question text has been copied.",
        open: "Open ChatGPT in your browser",
        browserNote: "The web version of ChatGPT will open. Paste the copied text and send it.",
        externalBrowserNote: "If the page does not display correctly, open it in an external browser such as Safari.",
        aiWarning: "AI answers are not the original research source. Check the original study for important decisions or quotations. If AI goes beyond the Research Hub material, treat that part separately.",
        back: "← Back to study details",
        promptLanguageNote: "The generated prompt follows the language of the current Research Hub page."
      }
    : {
        button: "ChatGPTに尋ねる",
        pageTitle: "AIでこの研究への理解を深める",
        lead: "研究HUBの解説を読んだあと、利用者自身のChatGPTで追加の確認や整理ができます。",
        howTo: "利用方法",
        steps: [
          "聞きたい項目を選ぶ",
          "下に表示される質問文を確認する",
          "「文章を全文コピー」を押す",
          "「ブラウザー版ChatGPTで確認する」を押す",
          "コピーした文章をChatGPTへ貼り付けて送信する"
        ],
        launchNote: "「ブラウザー版ChatGPTで確認する」を押すと、ブラウザー版ChatGPTを開きます。コピーした文章を貼り付けて送信してください。",
        siteNote: "このサイト内でAIが回答する仕組みではありません。",
        choose: "1. 聞きたい項目を選ぶ",
        prompt: "2. ChatGPTにコピーする文章",
        copy: "文章を全文コピー",
        copied: "質問文を全文コピーしました。",
        open: "ブラウザー版ChatGPTで確認する",
        browserNote: "ブラウザー版ChatGPTを開きます。コピーした文章を貼り付けて送信してください。",
        externalBrowserNote: "※表示が崩れる場合は、Safariなどの外部ブラウザーで開いてください。",
        aiWarning: "AIの回答は研究原著そのものではありません。重要な判断や引用では原著を確認してください。AIが研究HUBの記載を超えて推測した場合は、その部分を区別して扱ってください。",
        back: "← 研究整理ページに戻る",
        promptLanguageNote: "質問文は現在表示している研究HUBの言語に合わせて生成されます。"
      };
}


function questions() {

  if (getLanguage() === "en") {

    return [
      {
        id: "findings",
        label: "What this study found",
        text:
`Explain what this study examined and what it found in language that can be understood by someone without a background in statistics or research methods.

In particular, organise:
- the research question
- what kind of study and data were used
- the most important findings
- what can reasonably be concluded from those findings
- what cannot yet be concluded`
      },
      {
        id: "statistics",
        label: "Read the statistics",
        text:
`Explain the statistical results so that someone learning statistics for the first time can understand them.

Do not simply list the numbers. Explain:
- what each statistical measure represents
- what a larger or smaller value means
- whether statistical significance and practical importance are the same thing
- whether an effect size can be converted directly into a statement such as “a X% reduction”
- how to interpret confidence intervals, variation and uncertainty

If you use a technical term, immediately add a short plain-language explanation.`
      },
      {
        id: "limitations",
        label: "Examine the limitations",
        text:
`Explain the limitations of this study in language that can be understood by someone without specialist research-methods training.

In particular, explain:
- conditions under which the effect may be weaker or not demonstrated
- differences between relevant studies
- measurement constraints
- limitations of the research design
- cautions when generalising the findings
- what cannot be decided from this study alone

Do not reduce the conclusion to “it did not work”. Distinguish what is known from what remains uncertain.`
      },
      {
        id: "practice",
        label: "Implications for practice",
        text:
`Organise what Japanese police and local-government crime-prevention practitioners could learn from this study, for readers without specialist training in statistics or research methods.

In particular, explain:
- the conditions under which the findings are more readily applicable
- aspects that may not transfer directly to Japanese practice
- what should be measured if the intervention is implemented
- what comparisons or evaluation designs would be useful
- what should be reviewed if results do not develop as expected

Do not assume that findings from an overseas study would automatically be reproduced in Japan.`
      }
    ];

  }


  return [
    {
      id: "findings",
      label: "この研究で分かったこと",
      text:
`この研究で何を調べ、何が分かったのかを、統計や研究方法に詳しくない人にも分かる言葉で説明してください。

特に、
・研究上の問い
・どのような研究・データを使ったのか
・最も重要な結果
・その結果から「言えること」
・まだ「言えないこと」
を整理してください。`
    },
    {
      id: "statistics",
      label: "統計を読む",
      text:
`この研究の統計結果を、統計を初めて学ぶ人にも理解できるように説明してください。

数値を示すだけでなく、
・その統計指標は何を表しているのか
・数値が大きい／小さいとはどういう意味か
・統計的有意性と実務的な重要性は同じなのか
・効果量がある場合、それを「○％減った」などと単純に読み替えてよいのか
・信頼区間、ばらつき、不確実性をどう読めばよいか
を平易に説明してください。

専門用語を使う場合は、直後に短い日本語説明を付けてください。`
    },
    {
      id: "limitations",
      label: "限界を見る",
      text:
`この研究の限界を、研究方法に詳しくない人にも分かるように整理してください。

特に、
・どのような条件では効果が弱い、または確認できないのか
・研究間の違い
・測定上の制約
・研究デザイン上の制約
・結果を一般化するときの注意
・この研究だけでは判断できないこと
を説明してください。

単純に「効果がない」とまとめず、
どこまで分かっていて、どこから先が不確実なのかを区別してください。`
    },
    {
      id: "practice",
      label: "実務への示唆",
      text:
`この研究から、日本の警察・自治体の犯罪予防実務に参考にできる点を、統計や研究方法に詳しくない実務家向けに整理してください。

特に、
・どの条件なら参考にしやすいか
・そのまま日本へ適用しにくい点
・実施するなら何を測るべきか
・どのような比較や効果検証を行えばよいか
・結果が期待どおりでなかった場合、何を見直すべきか
を示してください。

海外研究の結果を、そのまま日本でも再現すると仮定しないでください。`
    }
  ];
}


function buildHubUrl(study) {

  const url =
    new URL(location.href);

  url.search = "";
  url.hash =
    `#/study/${study.id}`;

  return url.href;
}


function sourceUrl(study) {

  if (study.url) {
    return study.url;
  }

  if (study.doi) {
    return `https://doi.org/${study.doi}`;
  }

  return "";
}


function summaryText(study) {

  return (
    study.result ||
    study.intervention ||
    study.notes ||
    ""
  );
}


function buildPrompt(
  study,
  question
) {

  const source =
    sourceUrl(study);

  const hub =
    buildHubUrl(study);


  if (getLanguage() === "en") {

    return `Please explain the following study for readers who are new to research methods and statistics.

[Study title]
${study.title || ""}

[Research Hub summary]
${summaryText(study)}

[What I want to check]
${question.text}

[Explanation policy]
- The intended readers are police and local-government practitioners who are not specialists in statistics, research methods or criminology.
- Do not merely list technical terms or statistical values; explain in plain language what the result means.
- Avoid formula-centred explanations. If a formula or technical term is necessary, add an intuitive explanation or concrete example.
- Clearly distinguish study findings, the authors' interpretation, and your own supplementary explanation or inference.
- Do not make causal claims stronger than the original study supports.
- Do not stop at “effective / ineffective”; explain under what conditions, what changed, and by how much.
- Discuss not only statistical significance but also effect size, uncertainty and practical meaning.
- Identify conditions that limit generalisation, contrary evidence and research limitations.
- If the available information is insufficient, say that it cannot be determined from the information provided rather than guessing.
- When discussing practical application, do not assume that findings will automatically reproduce in Japan. Explain applicable conditions and the need for additional evaluation.
- Where possible, tell a beginner what part of the original source to inspect.

[Original source]
${source || "Not provided in the Research Hub record"}

[Research Hub page]
${hub}`;
  }


  return `以下の研究について、研究・統計の初学者向けに解説してください。

【研究タイトル】
${study.title || ""}

【研究HUBでの要約】
${summaryText(study)}

【今回確認したいこと】
${question.text}

【このサイトの解説方針】
・対象は、統計・研究方法・犯罪学に詳しくない警察・自治体等の実務家です。
・専門用語や統計値を並べるだけでなく、「その結果が何を意味するのか」を平易な日本語で説明してください。
・数式中心の説明は避け、必要な場合は直感的な例を添えてください。
・研究結果、著者の解釈、あなた自身の補足・推論を明確に区別してください。
・因果関係を原著以上に強く表現しないでください。
・「効果あり／なし」だけで終わらず、どの条件で、何が、どの程度確認されたのかを整理してください。
・統計的有意性だけでなく、効果の大きさ、不確実性、実務上の意味も説明してください。
・結果を一般化できない条件、反証材料、研究上の限界も必ず示してください。
・根拠が不足する点は推測で補わず、「この情報だけでは判断できない」としてください。
・実務への応用を述べる場合は、日本でそのまま再現するとは仮定せず、適用条件と追加検証の必要性を示してください。
・初学者が原著を確認するとき、「どこを見ればよいか」も可能であれば示してください。

【原著】
${source || "研究HUBの登録情報には原著URLがありません"}

【研究HUBページ】
${hub}`;
}


function ensureStyles() {

  if (
    document.querySelector(
      'link[data-chatgpt-helper-style]'
    )
  ) {
    return;
  }

  const link =
    document.createElement("link");

  link.rel = "stylesheet";
  link.href = "./css/chatgpt-helper.css";
  link.dataset.chatgptHelperStyle = "true";

  document.head.appendChild(link);
}


export function renderAskChatGptLink(
  study
) {

  const l =
    labels();

  return `
    <a
      href="#/ask/${escapeHtml(study.id)}"
    >
      ${escapeHtml(l.button)}
    </a>
  `;
}


export function renderAskChatGptPage(
  data,
  id
) {

  ensureStyles();

  const l =
    labels();

  const study =
    data.studies.find(
      item => item.id === id
    );


  if (!study) {

    return `
      <section class="section">
        <div class="container">
          <div class="empty">
            Study not found.
          </div>
        </div>
      </section>
    `;
  }


  const items =
    questions();


  const initial =
    items[0];


  const prompt =
    buildPrompt(
      study,
      initial
    );


  return `
    <section class="page-head chatgpt-page-head">

      <div class="container">

        <a
          class="back-link"
          href="#/study/${escapeHtml(study.id)}"
        >
          ${escapeHtml(l.back)}
        </a>

        <h1>
          ${escapeHtml(l.pageTitle)}
        </h1>

        <p>
          ${escapeHtml(l.lead)}
        </p>

        <p class="chatgpt-site-note">
          ${escapeHtml(l.siteNote)}
        </p>

      </div>

    </section>


    <section class="detail">

      <div class="container chatgpt-helper">

        <section class="chatgpt-howto">

          <h2>
            ${escapeHtml(l.howTo)}
          </h2>

          <ol>
            ${l.steps
              .map(step =>
                `<li>${escapeHtml(step)}</li>`
              )
              .join("")}
          </ol>

          <p class="chatgpt-launch-note">
            ${escapeHtml(l.launchNote)}
          </p>

        </section>


        <section class="chatgpt-step">

          <h2>
            ${escapeHtml(l.choose)}
          </h2>

          <div
            class="chatgpt-options"
            role="radiogroup"
            aria-label="${escapeHtml(l.choose)}"
          >

            ${items.map(
              (item,index) => `
                <label class="chatgpt-option">

                  <input
                    type="radio"
                    name="chatgptQuestion"
                    value="${escapeHtml(item.id)}"
                    ${index === 0 ? "checked" : ""}
                  >

                  <span>
                    ${escapeHtml(item.label)}
                  </span>

                </label>
              `
            ).join("")}

          </div>

        </section>


        <section class="chatgpt-step">

          <h2>
            ${escapeHtml(l.prompt)}
          </h2>

          <textarea
            id="chatgptPrompt"
            class="chatgpt-prompt"
            rows="22"
          >${escapeHtml(prompt)}</textarea>

        </section>


        <div class="chatgpt-actions">

          <button
            id="copyChatgptPrompt"
            class="primary-btn"
            type="button"
          >
            ${escapeHtml(l.copy)}
          </button>

          <button
            id="openChatgpt"
            class="chatgpt-open-link"
            type="button"
          >
            ${escapeHtml(l.open)}
          </button>

        </div>


        <p class="chatgpt-browser-note">
          ${escapeHtml(l.browserNote)}
        </p>

        <p class="chatgpt-external-browser-note">
          ${escapeHtml(l.externalBrowserNote)}
        </p>


        <p
          id="chatgptCopyStatus"
          class="chatgpt-copy-status"
          role="status"
          aria-live="polite"
        ></p>


        <div class="notice chatgpt-warning">
          ${escapeHtml(l.aiWarning)}
        </div>

      </div>

    </section>
  `;
}


async function copyText(
  value
) {

  if (
    navigator.clipboard &&
    window.isSecureContext
  ) {

    await navigator.clipboard.writeText(
      value
    );

    return;
  }


  const textarea =
    document.createElement("textarea");

  textarea.value = value;
  textarea.setAttribute(
    "readonly",
    ""
  );

  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  document.body.appendChild(
    textarea
  );

  textarea.select();

  const ok =
    document.execCommand("copy");

  textarea.remove();

  if (!ok) {
    throw new Error("copy failed");
  }
}


export function activateAskChatGpt(
  data,
  id
) {

  const study =
    data.studies.find(
      item => item.id === id
    );

  const promptBox =
    document.querySelector(
      "#chatgptPrompt"
    );

  if (
    !study ||
    !promptBox
  ) {
    return;
  }


  const items =
    questions();


  const byId =
    new Map(
      items.map(
        item => [
          item.id,
          item
        ]
      )
    );


  document
    .querySelectorAll(
      'input[name="chatgptQuestion"]'
    )
    .forEach(input => {

      input.addEventListener(
        "change",
        () => {

          const question =
            byId.get(
              input.value
            );

          if (!question) {
            return;
          }

          promptBox.value =
            buildPrompt(
              study,
              question
            );

          const status =
            document.querySelector(
              "#chatgptCopyStatus"
            );

          if (status) {
            status.textContent = "";
          }

        }
      );

    });


  const copyButton =
    document.querySelector(
      "#copyChatgptPrompt"
    );


  copyButton?.addEventListener(
    "click",
    async () => {

      const status =
        document.querySelector(
          "#chatgptCopyStatus"
        );

      try {

        await copyText(
          promptBox.value
        );

        if (status) {
          status.textContent =
            labels().copied;
        }

      } catch {

        promptBox.focus();
        promptBox.select();

        if (status) {

          status.textContent =
            getLanguage() === "en"
              ? "Automatic copying was not available. The full text has been selected; copy it using your device controls."
              : "自動コピーできませんでした。全文を選択したので、端末のコピー操作を使用してください。";
        }

      }

    }
  );


  const openButton =
    document.querySelector(
      "#openChatgpt"
    );


  openButton?.addEventListener(
    "click",
    () => {

      window.open(
        CHATGPT_URL,
        "_blank",
        "noopener,noreferrer"
      );

    }
  );
}
