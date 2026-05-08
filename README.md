<<<<<<< main
# Market Radar Web App

Chrome拡張版の `dashboard.js` を、iPhone/Safari/Chromeから開けるWebアプリ用に切り出した版です。

## ファイル

- `index.html` — 画面本体
- `styles.css` — スタイル
- `app.js` — 既存ロジック + Web用localStorage互換 + 構造マップ修正
- `worker/google-suggest-worker.js` — Google Suggest取得用Cloudflare Workerプロキシ

## 使い方

### PCで確認

```bash
cd market-radar-web
python -m http.server 8000
```

ブラウザである開く：

```txt
http://localhost:8000
```

### iPhoneで使う

一番簡単なのは、このフォルダを GitHub Pages / Vercel / Cloudflare Pages に置く方法です。

## CORSについて

通常のWebページから Google Suggest に直接 `fetch()` すると、環境によってCORSで止まる可能性があります。
その場合は `worker/google-suggest-worker.js` を Cloudflare Workers にデプロイし、画面上部の「WebプロキシURL」にWorkerのURLを入れてください。

例：

```txt
https://your-worker.yourname.workers.dev
```

## 変更点

- `chrome.storage.local` を `localStorage` で代替
- 構造マップの `node is not defined` 問題を修正
- マップ系ボタンを取得開始/停止と分離
- 構造マップの散らし配置・ラベル制御を反映
=======
a
>>>>>>> origin/main
