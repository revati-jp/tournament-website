# Website for REVATI Tournaments

- プロダクト: https://tournament.revati.jp
- 開発: `https://{ブランチ|デプロイ}-tournament.revati.workers.dev`
  - main ブランチ: https://main-tournament.revati.workers.dev

## 本番ウェブサイトでの URL の選び方

- 常に最新の大会にリンクさせたい  
  → `https://tournament.revati.jp`
- 特定の大会種類における、最新の大会にリンクさせたい  
  → `https://tournament.revati.jp/<大会種類>`
  - 例: https://tournament.revati.jp/community
- 特定の大会にリンクさせたい  
  → `https://tournament.revati.jp/<大会種類>/<大会>`
  - 例: https://tournament.revati.jp/community/gateway
- その他任意の URL
  - 例: https://tournament.revati.jp/community/gateway/regulations

## 大会一覧

- REVATI Community CUP: `/community`
  - REVATI Community CUP "Gateway": `/community/gateway`

## ドキュメント

- 仕様書: [docs/SPECIFICATION.md](./docs/SPECIFICATION.md)

## 環境構築

1. リポジトリをクローン
   ```bash
   git clone git@github.com:revati-jp/tournament-website.git
   ```
1. 必要に応じて、デフォルトブランチ `main` からトピックブランチを作成
   ```bash
   git switch -c feat/my-feature
   ```
1. 依存関係をインストール
   ```bash
   pnpm install --frozen-lockfile
   ```
1. 開発サーバーを起動

   ```bash
   # 開発サーバーを起動する前に、`licenses.json` を生成（`pnpm run build` では自動で実行される）
   pnpm run licenses

   # 起動する
   pnpm run dev
   ```

## 使用技術

- pnpm
- Astro v6
  - Svelte（インテグレーション）
  - SCSS
  - TypeScript
- Prettier
- ESLint
- Cloudflare Workers

## pnpm コマンド

環境構築や開発には以下の pnpm コマンドを使用する。(`pnpm dev`のように省略することも可能)

| コマンド             | 説明                                                                                          |
| :------------------- | :-------------------------------------------------------------------------------------------- |
| `pnpm run dev`       | 開発サーバーを起動 (`localhost:4321`)                                                         |
| `pnpm run build`     | プロダクション用にプロジェクトを `./dist/` にビルド                                           |
| `pnpm run preview`   | ビルドされたサイトをローカルでプレビュー                                                      |
| `pnpm run licenses`  | `licenses.json` を生成                                                                        |
| `pnpm run format`    | Prettier を使用してコードをフォーマット                                                       |
| `pnpm run check`     | エラーをチェック                                                                              |
| `pnpm run lint`      | ESLint を使用してコードを検査                                                                 |
| `pnpm run lint:fix`  | ESLint を使用してコードを自動修正                                                             |
| `pnpm run astro ...` | `astro add` などの [CLI コマンド](https://docs.astro.build/ja/reference/cli-reference/)を実行 |

## License

The source code in this repository is licensed under the **BSD 3-Clause "New" or "Revised" License**.
The full license text is available in the [`LICENSE`](./LICENSE) file.

### Scope of the License

The BSD 3-Clause License applies to the software source code (e.g., `*.astro`, `*.svelte`, `*.scss`, `*.ts` files) created by REVATI.

It **does not apply** to the following:

#### 1. REVATI Proprietary Assets

- All trademarks, service marks, and logos associated with REVATI.
- All original content created by REVATI, including text, images, video, audio, and other media.

All rights to these materials are reserved by REVATI and are not granted under the BSD license.

#### 2. Third-Party Assets

- Fonts (e.g., Noto Sans JP, Zalando Sans Expanded, Sofia Sans Extra Condensed).
- Icons (e.g., Bootstrap Icons).
- Other third-party libraries and assets.

These assets are subject to their respective licenses.
Please refer to the [Licenses page](https://tournament.revati.jp/licenses) for details.
