# 02_研究HUB_構築運用仕様

基準日：2026-09-24

## 1. サイト概要

目的：国内の警察EBP・犯罪予防研究を、個別研究、研究系列、研究者・機関、公的報告、独自解説まで関連付けて閲覧できる研究知識基盤とする。

公開URL：  
https://ebp2ichimizu-cell.github.io/ichimizu-research-hub-github/#/

GitHub：  
`ebp2ichimizu-cell/ichimizu-research-hub-github`

特徴：
- 静的SPA
- ES Modules
- Hash routing
- JSONデータ
- 日英切替
- 独自解説
- `.nojekyll`

## 2. システム構成

```text
/
├─ index.html
├─ .nojekyll
├─ README.md
├─ assets/
├─ content/
├─ css/
│  ├─ style.css
│  ├─ responsive.css
│  └─ commentary.css
├─ data/
│  ├─ commentary-index.json
│  ├─ programs-ja.json
│  ├─ programs-en.json
│  └─ その他の研究・研究者・報告JSON
└─ js/
   ├─ app.js
   ├─ data-loader.js
   ├─ i18n.js
   ├─ router.js
   ├─ search.js
   ├─ utils.js
   ├─ render-home.js
   ├─ render-studies.js
   ├─ render-study-detail.js
   ├─ render-programs.js
   ├─ render-researchers.js
   ├─ render-reports.js
   ├─ render-about.js
   └─ render-commentary.js
```

役割：
- `index.html`：サイトシェル
- `app.js`：初期化・画面制御
- `router.js`：Hash routing
- `data-loader.js`：JSON等の取得
- `i18n.js`：日英表示
- `render-*.js`：画面単位表示
- `style.css`：基本デザイン
- `responsive.css`：スマホ対応
- `commentary.css`：独自解説

## 3. コンテンツ・データ構造

概念関係：

```text
個別研究
  ↕
研究系列
  ↕
研究者・機関
  ↕
公的報告
  ↕
独自解説
```

### data/
検索・一覧・関連付け用の構造化データ。

現行で確認できる主要ファイル：
- `commentary-index.json`
- `programs-ja.json`
- `programs-en.json`
- その他研究・研究者・報告JSON

### content/
独自解説等の長文コンテンツ。

### assets/
画像等。

### 日英対応
日本語／英語データが分離されている場合は、可能な限り両方更新する。

## 4. 更新・運用方法

### 新規研究
1. 既存研究JSONの項目構成を確認。
2. 一意なIDを採番。
3. 日本語データ追加。
4. 必要に応じ英語追加。
5. 研究系列ID、研究者ID、機関ID等を設定。
6. 独自解説があれば `content/` へ追加。
7. 索引JSONを必要に応じ更新。
8. 一覧、詳細、検索、関連リンクを確認。

### 研究系列
`programs-ja.json`／`programs-en.json` を中心に更新。

### 独自解説
本文を `content/` に置き、`commentary-index.json` 等の索引と対応させる。

原則触らない：
- `index.html`
- `app.js`
- `router.js`
- `data-loader.js`
- `render-*.js`
- 基本CSS

## 5. 再構築・復旧手順

優先順位：
1. `index.html`
2. `js/app.js`
3. `js/router.js`
4. `js/data-loader.js`
5. 各 `render-*.js`
6. `css/style.css`
7. `css/responsive.css`
8. `data/`
9. `content/`
10. `assets/`
11. `.nojekyll`

特に `data/` と `content/` の参照関係を崩さない。

## 6. 再構築チェックリスト

- [ ] `#/`
- [ ] `#/studies`
- [ ] 研究詳細
- [ ] `#/programs`
- [ ] `#/researchers`
- [ ] `#/reports`
- [ ] `#/about`
- [ ] 日英切替
- [ ] 検索
- [ ] JSON読込
- [ ] 研究系列リンク
- [ ] 研究者・機関リンク
- [ ] 独自解説
- [ ] 外部原文リンク
- [ ] スマホメニュー
- [ ] 連絡先
- [ ] `.nojekyll`
