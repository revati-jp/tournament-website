# 仕様書

## 概要

- 名前:
  - `/community`: REVATI Community CUP
- URL: https://tournament.revati.jp
- リポジトリ: https://github.com/revati-jp/tournament-website
- 対応言語: 日本語のみ

## サイトマップ

- `licenses` - **ライセンス情報ページ**
- `/`: 最新の大会のホームにリダイレクト
  （ディレクトリ構造を再現してのリダイレクトは特に行わず、無効なページは404に）
- `/<tournament-type>` - **大会種類ディレクトリ**: "community" のように大会種類を分ける
  （ルートのような感じで、その大会種類の最新の大会のホームにリダイレクト）
  - `/<tournament>` - **各大会ウェブサイト**: "gateway" や "vol2" のような各大会のウェブサイト
    - `./` - **ホーム**: 大会の基本的な情報（名前、日程、ルール、開催地、お問い合わせ、チケット URL への誘導など）
    - `about-revati` - **REVATIについて**: REVATI の紹介
    - `regulations` - **大会ルールページ**: 大会ルールの詳細の紹介
    - `teams` - **チーム紹介ページ**: 予選を突破したチームの紹介（チーム名・選手の情報など）
    - `sponsors` - **スポンサーページ**: スポンサー企業の紹介
- 404ページ
- エラーページ

※古い大会のウェブページからの自動リダイレクトは行わない。[後述](#その他要件)の通り軽い誘導は行う。

## ディレクトリ構造

```
├── astro.config.mjs
├── docs
│   └── SPECIFICATION.md
├── eslint.config.js
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── public — 静的ファイル
├── scripts — ビルドやデプロイ用のスクリプト
├── src
│   ├── components
│   ├── constants
│   │   └── tournaments.ts — 大会の情報を定義
│   ├── layouts
│   │   └── BaseLayout.astro
│   ├── pages
│   │   ├── community ― 大会種類 "Community CUP" のディレクトリ
│   │   │   └── gateway ― Community CUP の大会 "Gateway" のディレクトリ
│   │   └── index.astro — 最新の大会ホームへリダイレクト
│   ├── styles
│   ├── types
│   └── utils
├── svelte.config.js
├── tsconfig.json
└── wrangler.jsonc
```

## 使用技術

- pnpm
- Astro v6
  - Svelte（インテグレーション）
  - SCSS
  - TypeScript

## デザイン

Discord 上の資料を参照。

- カラーパレット
  - 青: `#1b44ad`
  - 黄: `#e4ff00`
- フォント
  - Noto Sans JP (日本語メインフォント)
    <!-- 太さ未確定 -->
  - Zalando Sans Expanded (ヘッダー・フッターのナビゲーション用)
    - 太さ: 500
  - Sofia Sans Extra Condensed (その他見出し等で使用)
    <!-- 太さ未確定 -->
- ブレイクポイント: 788px（従来通り）

## 運用

- ブランチ
  - `main`: 開発
  - `feat/*`, `fix/*`: トピック
  - `production`: プロダクション
- 整形等: Prettier + ESLint
- デプロイ: Cloudflare Workers
- バージョニング: 無し

## その他要件

- 古い大会のページを開いている時は、ページ上部あたりに「最新の大会の特設サイトはこちら」的なことが出るように

## z-index

| z-index | エンティティ     | パス                                                                                                                            |
| ------: | ---------------- | ------------------------------------------------------------------------------------------------------------------------------- |
|     256 | ドロワーメニュー | [`src/components/layout/header/MobileDrawer.svelte>style>.drawer-overlay`](../src/components/layout/header/MobileDrawer.svelte) |
|     255 | ヘッダー         | [`src/components/layout/header/Header.astro>style>header`](../src/components/layout/header/Header.astro)                        |
