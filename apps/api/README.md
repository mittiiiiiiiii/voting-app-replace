# API (Laravel)

このディレクトリはLaravelによるAPIバックエンドです。

## 主な技術
- Laravel
- PHP 8.3
- PostgreSQL
- pnpm（Viteビルド用）

## 開発・起動方法
```
composer install
php artisan serve --host=0.0.0.0 --port=8000
```

## Dockerでの起動
```
docker compose up api
```

## マイグレーション
```
docker compose exec api php artisan migrate
```

## ポート
- http://localhost:8000
