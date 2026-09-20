import {escapeHtml} from "./utils.js";


function policyItem(title, text) {

  if (!text) return "";

  return `
    <div class="about-policy-item">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(text)}</p>
    </div>
  `;
}


export function renderAbout(data) {

  const p = data.policy || {};

  return `

    <section class="page-head about-page-head">

      <div class="container">

        <div class="meta">
          ABOUT THIS SITE
        </div>

        <h1>
          このサイトについて
        </h1>

        <p>
          国内の犯罪予防・警察活動研究を、
          単発の論文だけでなく、
          研究者・研究系列・実務とのつながりから
          探せるように整理した研究知識基盤です。
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
              国内のEBPを「探す・つなぐ・使う」
            </h2>

            <p>
              日本国内では、警察と大学・研究者が連携した
              犯罪予防研究、社会実験、効果検証が各地で
              行われています。
            </p>

            <p>
              一方で、それらは学術論文、大学紀要、
              警察の公式資料、学会発表などに分散しています。
              この研究HUBでは、それらを横断的に整理し、
              個別研究だけでなく継続する研究系列まで
              たどれることを重視しています。
            </p>

          </div>


          <aside class="about-warning">

            <strong>
              重要な注意
            </strong>

            <p>
              このサイトに掲載されていることは、
              その施策に効果があることや、
              エビデンスの確実性が高いことを
              意味しません。
            </p>

            <p>
              結果だけでなく、
              研究デザイン、対象、比較方法、
              限界・注意点を確認してください。
            </p>

          </aside>

        </section>


        <section class="about-section">

          <div class="about-section-head">

            <div class="about-label">
              SCOPE
            </div>

            <h2>
              収録対象
            </h2>

          </div>

          <div class="about-policy-grid">

            ${policyItem(
              "対象期間",
              p["対象期間"]
            )}

            ${policyItem(
              "対象となる研究",
              p["対象"]
            )}

            ${policyItem(
              "追加対象",
              p["追加対象"]
            )}

            ${policyItem(
              "重複資料の扱い",
              p["重複の扱い"]
            )}

          </div>

        </section>


        <section class="about-section about-reading">

          <div class="about-section-head">

            <div class="about-label">
              HOW TO READ
            </div>

            <h2>
              資料の種類を分けて読む
            </h2>

            <p>
              研究HUBでは、資料が存在することと、
              そのエビデンスが強いことを分けて扱います。
            </p>

          </div>


          <div class="about-type-grid">

            <div class="about-type-card">

              <span>
                01
              </span>

              <h3>
                査読学術研究
              </h3>

              <p>
                査読を経た論文。
                ただし査読済みであることだけで、
                因果推論や効果の確実性が
                高いとは限りません。
              </p>

            </div>


            <div class="about-type-card">

              <span>
                02
              </span>

              <h3>
                大学紀要・学会報告
              </h3>

              <p>
                国内の警察実務との共同研究を
                発見するうえで重要な資料として、
                刊行形態を明示して収録します。
              </p>

            </div>


            <div class="about-type-card">

              <span>
                03
              </span>

              <h3>
                公的報告・実証
              </h3>

              <p>
                警察、大学、公的機関等が公開した
                研究報告、社会実験、実装事例を
                学術論文とは区別して掲載します。
              </p>

            </div>


            <div class="about-type-card">

              <span>
                04
              </span>

              <h3>
                進行中研究
              </h3>

              <p>
                研究会、連携協定、進行中の実証なども、
                今後の成果を追跡するために
                区別して保持します。
              </p>

            </div>

          </div>


          <div class="about-policy-note">

            ${escapeHtml(
              p["刊行形態の扱い"] || ""
            )}

          </div>

        </section>


        <section class="about-section">

          <div class="about-section-head">

            <div class="about-label">
              COLLECTION POLICY
            </div>

            <h2>
              収集・整理の方針
            </h2>

          </div>


          <div class="about-policy-grid">

            ${policyItem(
              "研究結果で選別しない",
              p["収集方針"]
            )}

            ${policyItem(
              "主な検索先",
              p["主要検索先"]
            )}

            ${policyItem(
              "社会安全研究財団資料",
              p["日工組社会安全研究財団"]
            )}

          </div>

        </section>


        <section class="about-section">

          <div class="about-section-head">

            <div class="about-label">
              LIMITATIONS
            </div>

            <h2>
              このデータベースの限界
            </h2>

          </div>


          <div class="about-limit-box">

            <p>
              ${escapeHtml(
                p["注意"] || ""
              )}
            </p>

            <p>
              公開情報を中心に整理しているため、
              警察内部資料や未公開研究、
              検索エンジン等で索引されていない資料は
              収録できていない場合があります。
            </p>

            <p>
              また、同一の研究プロジェクトから
              複数の論文・報告が公表される場合があるため、
              「研究件数」と「独立した介入の数」は
              同一ではありません。
            </p>

          </div>

        </section>


        <section class="about-section">

          <div class="about-section-head">

            <div class="about-label">
              USE THE HUB
            </div>

            <h2>
              研究を探す
            </h2>

          </div>


          <div class="about-links">

            <a href="#/studies">
              <strong>
                個別研究
              </strong>

              <span>
                研究テーマ・機関・研究デザインから探す →
              </span>
            </a>


            <a href="#/programs">
              <strong>
                研究系列
              </strong>

              <span>
                継続する警察×研究者の取り組みをたどる →
              </span>
            </a>


            <a href="#/researchers">
              <strong>
                研究者・機関
              </strong>

              <span>
                研究者から関連研究をたどる →
              </span>
            </a>


            <a href="#/reports">
              <strong>
                公的報告
              </strong>

              <span>
                未論文化資料・進行中研究を確認する →
              </span>
            </a>

          </div>

        </section>


        <section class="about-operation">

          <h2>
            運営について
          </h2>

          <p>
            本サイトは、
            国内の犯罪予防・Evidence-Based Policing
            に関する研究を整理・共有するための
            個人運営の研究知識基盤です。
          </p>

          <p>
            網羅性や内容の完全性を保証するものではなく、
            実務上の判断を行う場合は、
            必ず原著論文・公式資料を確認してください。
          </p>

        </section>


      </div>

    </section>

  `;
}
