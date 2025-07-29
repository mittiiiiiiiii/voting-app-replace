# Vote Replace

このリポジトリはモノレポ構成で、Web（Next.js）とAPI（Laravel）で管理しています

## ディレクトリ構成
- `apps/web` : Next.jsによるフロントエンド
- `apps/api` : LaravelによるAPIバックエンド

## 開発環境
- Docker + docker-compose によるコンテナ管理
- DB: PostgreSQL
- パッケージ管理: pnpm

## 起動方法
```
pnpm install
make install
```

## サービスURL
- Web: http://localhost:3000
- API: http://localhost:8000

---
詳細は各ディレクトリのREADMEも参照してください。
