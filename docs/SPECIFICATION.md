# 仕様書

## 概要

- 名前: REVATI Community CUP "Gateway"（旧~~REVATI Challengers CUP Vol.2~~）
- URL: https://gateway.revati.jp （旧 ~~https://challengers.revati.jp~~）
- リポジトリ: https://github.com/revati-jp/gateway-website
- 対応言語: 日本語のみ

## サイトマップ

- `licenses` - **ライセンス情報ページ**
- `/`: 最新の大会のウェブページのホームにリダイレクト
  （ディレクトリ構造を再現してのリダイレクトは特に行わず、無効なページは404に）
- `/volX-20XX`（`vol1-2025`、`vol2-2026` のように各大会のページ）
  - `./` **ホーム**: 大会の基本的な情報（名前、日程、ルール、開催地、お問い合わせ、チケット URL への誘導など）
  - **チーム紹介ページ**: 予選を突破したチームの紹介（チーム名・選手の情報など）
  - **スポンサーページ**: スポンサー企業の紹介
  - **REVATIについて**: REVATI の紹介
- 404ページ
- エラーページ

## 使用技術

- pnpm
- Astro v6
  - Svelte（インテグレーション）
  - SCSS
  - TypeScript

## デザイン

Figma 参照。

- カラーパレット
  - 青: `#1b44ad`
  - 黄: `#e4ff00`
- フォント
  - Noto Sans JP (日本語メインフォント)
    <!-- 太さ未確定 -->
  - Zalando Sans Expanded (ヘッダー・フッターのナビゲーション用)
    <!-- 太さ未確定 -->
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
