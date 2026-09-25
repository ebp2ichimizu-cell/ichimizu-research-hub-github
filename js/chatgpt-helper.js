import {
  escapeHtml
} from "./utils.js";

import {
  getLanguage
} from "./i18n.js";



function labels() {

  return getLanguage() === "en"
    ? {
        button: "Ask AI",
        pageTitle: "Ask AI about this study",
        lead: "This page creates a question prompt for generative AI. Choose what you want to ask, copy the prompt, and paste it into the generative AI service you normally use.",
        howTo: "How to use",
        steps: [
          "Choose what you want to ask about.",
          "Check the generated question prompt.",
          "Select “Copy question prompt”.",
          "Paste it into the generative AI service you normally use."
        ],
        launchNote: "This Research Hub does not open or recommend a specific AI service.",
        siteNote: "This website does not generate the AI answer.",
        choose: "1. Choose what you want to ask",
        commonQuestions: "Common questions",
        specificQuestions: "Questions specific to this study",
        prompt: "2. Question prompt for AI",
        copy: "Copy question prompt",
        copied: "Question prompt copied. Paste it into the generative AI service you normally use.",
        aiWarning: "AI answers are not the original research source. Check the original study for important decisions or quotations. If AI goes beyond the Research Hub material, treat that part separately.",
        back: "← Back to study details",
        promptLanguageNote: "The generated prompt follows the language of the current Research Hub page."
      }
    : {
        button: "AIに聞いてみる",
        pageTitle: "AIに聞いてみる",
        lead: "この研究について、生成AIに聞くための質問文を作成します。聞きたい内容を選び、作成された質問文をコピーしてください。普段お使いの生成AIに貼り付けて利用できます。",
        howTo: "利用方法",
        steps: [
          "聞きたい項目を選ぶ",
          "下に表示される質問文を確認する",
          "「質問文をコピー」を押す",
          "普段お使いの生成AIに貼り付けて質問する"
        ],
        launchNote: "研究HUBから特定の生成AIサービスを直接開くことはありません。",
        siteNote: "このサイト内でAIが回答する仕組みではありません。",
        choose: "1. 聞きたい項目を選ぶ",
        commonQuestions: "共通質問",
        specificQuestions: "この研究についてさらに聞く",
        prompt: "2. AIに送る質問文",
        copy: "質問文をコピー",
        copied: "質問文をコピーしました。普段お使いの生成AIに貼り付けてください。",
        aiWarning: "AIの回答は研究原著そのものではありません。重要な判断や引用では原著を確認してください。AIが研究HUBの記載を超えて推測した場合は、その部分を区別して扱ってください。",
        back: "← 研究整理ページに戻る",
        promptLanguageNote: "質問文は現在表示している研究HUBの言語に合わせて生成されます。"
      };
}


function commonQuestions() {

  if (getLanguage() === "en") {

    return [
      {
        id: "findings",
        label: "What this study found",
        text:
`Explain this study briefly, focusing on these three points:

1. What the study examined
2. The most important finding
3. The main caution when interpreting the result

Do not list detailed statistics unless they are essential. Prioritise a short explanation of the overall meaning of the study.`
      },
      {
        id: "statistics",
        label: "Read the statistics",
        text:
`Explain the main statistical result briefly for someone learning statistics for the first time.

Focus on these three points:

1. What the most important number or indicator is
2. What that number means
3. What could easily be misread

If you use a statistical term, immediately add a short plain-language explanation.
Do not use formulas.
If the result cannot be read simply as “X% lower”, explain why briefly.`
      },
      {
        id: "limitations",
        label: "Examine the limitations",
        text:
`Explain the main limitations of this study briefly for someone without specialist research-methods training.

Focus on these three points:

1. The most important limitation
2. How far the result can be generalised
3. What this study still cannot tell us

Do not list too many limitations. Prioritise those that matter most for judgement.
Do not reduce the conclusion to “it did not work”; distinguish what is known from what remains uncertain.`
      },
      {
        id: "practice",
        label: "Implications for practice",
        text:
`Briefly organise what Japanese police and local-government crime-prevention practitioners could learn from this study.

Focus on these three points:

1. What is useful for practice
2. What would be risky to apply directly
3. What should be checked or measured if it is implemented

For overseas studies, do not assume the same result would occur in Japan.
Prioritise points that support concrete practical decisions.`
      }
    ];

  }


  return [
    {
      id: "findings",
      label: "この研究で分かったこと",
      text:
`この研究について、次の3点を中心に簡潔に説明してください。

1. 何を調べた研究か
2. 最も重要な結果は何か
3. 結果を読むうえでの注意点は何か

細かな統計値を列挙せず、まず研究全体の意味が分かる説明を優先してください。`
    },
    {
      id: "statistics",
      label: "統計を読む",
      text:
`この研究の主要な統計結果を、統計を初めて学ぶ人向けに簡潔に説明してください。

次の3点を中心にしてください。

1. 最も重要な数字・指標は何か
2. その数字は何を意味するのか
3. 読み違えやすい点は何か

統計用語を使う場合は、直後に短い説明を付けてください。
数式は使わないでください。
「○％減った」と単純に読み替えられない場合は、その理由を短く説明してください。`
    },
    {
      id: "limitations",
      label: "限界を見る",
      text:
`この研究の主な限界を、研究方法に詳しくない人向けに簡潔に説明してください。

次の3点を中心にしてください。

1. 最も重要な限界
2. どこまで結果を一般化できるか
3. この研究だけではまだ分からないこと

限界を列挙しすぎず、判断に重要なものを優先してください。
単純に「効果がない」とまとめず、「どこまで分かっていて、どこから先が不確実か」を示してください。`
    },
    {
      id: "practice",
      label: "実務への示唆",
      text:
`この研究から、日本の警察・自治体の犯罪予防実務で参考にできる点を簡潔に整理してください。

次の3点を中心にしてください。

1. 実務で参考になる点
2. そのまま適用すると危険な点
3. 実施するなら何を確認・測定すべきか

海外研究の場合、日本でも同じ結果になるとは仮定しないでください。
具体的な実務判断につながる内容を優先してください。`
    }
  ];
}


function specificQuestions(study) {

  if (
    getLanguage() === "en" ||
    !Array.isArray(study?.aiQuestions)
  ) {
    return [];
  }


  return study.aiQuestions
    .filter(item =>
      item &&
      typeof item.question === "string" &&
      item.question.trim()
    )
    .map((item,index) => ({

      id:
        `specific-${index}`,

      label:
        item.question.trim(),

      text:
`次の資料固有の問いについて、簡潔に説明してください。

【問い】
${item.question || ""}

【この問いの狙い】
${item.purpose || ""}

【確認するポイント】
${item.checkPoints || ""}

【解釈上の注意】
${item.caution || ""}

【参考キーワード】
${item.keywords || ""}

問いそのものに直接答えることを優先し、周辺論点へ広げすぎないでください。`,

      kind:
        "specific"

    }));
}


function allQuestions(study) {

  return [
    ...commonQuestions().map(item => ({
      ...item,
      kind: "common"
    })),
    ...specificQuestions(study)
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

    return `Please explain the following study for police and local-government practitioners who are not familiar with statistics or research methods.

[Study title]
${study.title || ""}

[Research Hub summary]
${summaryText(study)}

[What I want to check]
${question.text}

[Answer rules]
- Keep the answer concise: about 180–300 words as a guide.
- Use no more than 3–5 points.
- State the most important conclusion first.
- Use plain language.
- If you use a technical term, explain it briefly.
- Do not centre the answer on formulas.
- Do not mix study findings, the authors' interpretation and AI-generated supplementary explanation.
- Do not make causal claims stronger than the original study supports.
- Where needed, briefly mention effect size, uncertainty and conditions of application.
- Briefly note the main limitation or contrary evidence if relevant.
- If the information is insufficient, do not guess.
- Do not expand into background knowledge that is not directly needed for the question.

[Original source]
${source || "Not provided in the Research Hub record"}

[Research Hub page]
${hub}`;
  }


  return `以下の研究について、統計・研究方法に詳しくない実務家向けに説明してください。

【研究タイトル】
${study.title || ""}

【研究HUBでの要約】
${summaryText(study)}

【今回確認したいこと】
${question.text}

【回答のルール】
・原則300〜500字程度
・3〜5項目以内
・最初に最も重要な結論を示す
・平易な日本語を使う
・専門用語を使う場合は短く意味を説明する
・数式中心の説明はしない

【回答の根拠】
・回答は、指定された研究資料およびこの研究HUBから提供された解説内容だけを根拠としてください。
・あなた自身の一般知識や、他の研究・Web情報で回答を補完しないでください。
・研究資料または研究HUBの解説に記載されていない理由・メカニズム・因果関係・実務上の意味を推測して追加しないでください。
・「研究で確認された結果」「著者による解釈」「研究HUBによる独自解説」を区別してください。
・質問の一部について根拠を確認できない場合は、その部分について「この資料からは確認できません」としてください。
・研究資料そのものを確認できない場合は、一般知識から研究内容を推測しないでください。

【解釈上のルール】
・因果関係を原著以上に強く表現しない
・必要に応じて効果の大きさ、不確実性、適用条件を示す
・主な限界や反証材料は、指定された研究資料または研究HUBの解説に記載されている場合に限って簡潔に示す
・質問に直接関係しない周辺知識へ広げない
・資料に記載されている内容と、そこから合理的に読み取れる範囲を超えて説明しない

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
    allQuestions(study);


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
            class="chatgpt-question-groups"
            role="radiogroup"
            aria-label="${escapeHtml(l.choose)}"
          >

            <div class="chatgpt-question-group">

              <h3>
                ${escapeHtml(l.commonQuestions)}
              </h3>

              <div class="chatgpt-options">

                ${items
                  .filter(item =>
                    item.kind === "common"
                  )
                  .map(
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

            </div>


            ${
              items.some(item =>
                item.kind === "specific"
              )
                ? `
                  <div class="chatgpt-question-group chatgpt-specific-group">

                    <h3>
                      ${escapeHtml(l.specificQuestions)}
                    </h3>

                    <div class="chatgpt-options">

                      ${items
                        .filter(item =>
                          item.kind === "specific"
                        )
                        .map(item => `
                          <label class="chatgpt-option">

                            <input
                              type="radio"
                              name="chatgptQuestion"
                              value="${escapeHtml(item.id)}"
                            >

                            <span>
                              ${escapeHtml(item.label)}
                            </span>

                          </label>
                        `).join("")}

                    </div>

                  </div>
                `
                : ""
            }

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


        </div>




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
    allQuestions(study);


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


}
