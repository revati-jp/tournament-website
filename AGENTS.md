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

## import エイリアス

TypeScript でのインポート用ショートカットとして、以下のエイリアスを使用可能:

- `@assets/*` → `./src/assets/*`
- `@components/*` → `./src/components/*`
- `@constants/*` → `./src/constants/*`
- `@layouts/*` → `./src/layouts/*`
- `@app-types` → `./src/types`
- `@app-types/*` → `./src/types/*`
- `@utils` → `./src/utils`
- `@utils/*` → `./src/utils/*`

使い方例:

```ts
import revatiIcon from "@assets/revati/icon_white.svg";
```

## コーディングスタイル

- TypeScript は strict モードで使用
  - 厳格な等価演算子（`===` や `!==`）を使用
  - 条件式における暗黙的なブール型の使用を禁止（例: `if (0 < count)` や `if (user !== null)`）
- バニラ CSS ではなく SCSS を使用
  - `src/styles/` 配下は「全体共通」と「大会専用」で分ける。
    - 全体共通は `_color.scss` と `_mixin.scss`。（`as *` で自動でインポート済）
      - `sp` mixin や `pc` mixin などを含む
    - 各大会専用は `src/styles/<tournament-type>/<tournament>/` 配下（例: `src/styles/community/gateway/`）に `_color.scss` / `_mixin.scss` / `_dimension.scss` などを配置する。（自動インポート済。例: `as commGateway`）
    - どちらにせよ、複数のコンポーネントやファイルで共有されるもの**のみ**をこれらのファイルに追加する。
- コメントやドキュメンテーションは日本語で記述
- Astro ファイルの HTML 部分でのコメントアウトには原則 JSX スタイル（`{/* コメント */}`）を使用すること。ビルド後に残したい場合はその限りではない。
  Svelte ファイルの場合は HTML スタイル（`<!-- コメント -->`）を使用すること。

## その他の指示

- フォントやその太さを指定する際は専用の mixin を使用すること。
- `z-index` プロパティを使用する際は、`docs/SPECIFICATION.md` 内の z-index リストを更新すること。
- コミットメッセージはタイトルと本文を日本語として、Conventional Commits 1.0.0 に準拠すること。
  - 必要に応じてスコープも記述

## その他ドキュメント

- 仕様書: `docs/SPECIFICATION.md`
  - ウェブサイト概要
  - サイトマップ
  - ディレクトリ構造
  - カラーパレットやフォント
  - ブランチ運用
  - z-index リスト
  - その他要件
  - など
