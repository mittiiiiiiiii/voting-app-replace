install:
	@make build
	@make up
	@echo "5秒待機中..."
	@sleep 5
	@make migrate
	@echo "✅ 環境構築完了"
	@echo "API🚀 http://localhost:8000"
	@echo "Web💿 http://localhost:3000"

build:
	docker compose build web --no-cache
	docker compose build api --no-cache
	@echo "✅ ビルド完了"

up:
	docker compose up -d
	@echo "✅ コンテナ起動完了"

restart:
	docker compose restart
	@echo "✅ コンテナ再起動完了"

down:
	docker compose down
	@echo "✅ コンテナ停止"

logs:
	docker compose logs -f

log-web:
	docker compose logs -f web

log-db:
	docker compose logs -f db

log-api:
	docker compose logs -f api

migrate:
	docker compose exec api php artisan migrate
	@echo "✅ マイグレーション完了"