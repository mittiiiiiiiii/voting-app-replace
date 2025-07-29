install:
	@make build
	@make up

build:
	docker compose build web --no-cache

up:
	docker compose up -d

restart:
	docker compose restart

down:
	docker compose down

logs:
	docker compose logs -f

log-web:
	docker compose logs -f web

log-db:
	docker compose logs -f db