# AGENTS.md Instructions

本プロジェクトは、日本を拠点とするeスポーツチーム REVATI (revati.jp) が開催する、
REVATI Community CUP という Overwatch の大会の公式ウェブサイト (tournament.revati.jp) です。

大会コンセプトは「まだ見ぬ才能に、輝きの場を」です。

本ウェブサイトは日本語のみに対応します。

## 技術スタック

- フロントエンド: Astro v6, Svelte（インテグレーション）, SCSS
- 言語: TypeScript（strict モード）
- ホスティング: Cloudflare Workers
- リポジトリ: https://github.com/revati-jp/tournament-website

## コマンド

- 開発サーバー起動: `pnpm run dev`
  - `pnpm run licenses` を先に実行して、`licenses.json` を生成する
- ビルド: `pnpm run build`（ビルドでは `licenses.json` が自動で生成される）
- チェック・整形・Lint: `pnpm run check && pnpm run format && pnpm run lint`

## コーディングスタイル

- TypeScript は strict モードで使用
  - 厳格な等価演算子（`===` や `!==`）を使用
  - 条件式における暗黙的なブール型の使用を禁止（例: `if (0 < count)` や `if (user !== null)`）
- バニラ CSS ではなく SCSS を使用
  - `src/styles/` ディレクトリに、汎用 SCSS ファイルとして `_color.scss` と `_mixin.scss` が含まれている。
    - `_color.scss` には文字色や、プライマリ/セカンダリ/アクセントカラーなど、プロジェクト全体で使用される色が Sass 変数として定義されている。
    - `_mixin.scss` には、特定の画面幅に絞るための mixin、特別なフォントを使用するための mixin、その他幾つかの汎用 mixin 、そしてブレイクポイントが定義されている。
    - 複数のコンポーネントやファイルで共有されるもの**のみ**を、これらのファイルに追加すること。
- コメントやドキュメンテーションは日本語で記述

## その他の指示

- `z-index` プロパティを使用する際は、`docs/SPECIFICATION.md` 内の z-index リストを更新すること。
- コミットメッセージはタイトルと本文を日本語として、Conventional Commits 1.0.0 に準拠
  - 必要に応じてスコープも記述

## その他ドキュメント

- 仕様書: `docs/SPECIFICATION.md`
  - ウェブサイト概要
  - サイトマップ
  - カラーパレットやフォント
  - ブランチ運用
  - z-index リスト
  - その他要件
  - など
