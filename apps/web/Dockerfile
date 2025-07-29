FROM node:22-slim

RUN apt-get update -y && apt-get install -y openssl
# 作業ディレクトリ設定
WORKDIR /app

RUN npm install -g pnpm

# package.json, pnpm-lock.yaml をコピー
COPY package.json pnpm-lock.yaml ./

# pnpmインストール
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

# 依存インストール
RUN pnpm install

# アプリ全体をコピー
COPY . .

# ポート公開
EXPOSE 3000

# 本番起動（0.0.0.0でバインド）
CMD ["pnpm", "dev"]