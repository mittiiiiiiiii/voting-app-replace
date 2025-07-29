FROM node:22-slim

RUN apt-get update -y && apt-get install -y openssl
# 作業ディレクトリ設定
WORKDIR /app

# package.json, yarn.lock（またはpackage-lock.json）をコピー
COPY package.json package-lock.json* ./

# 依存インストール
RUN npm install

# アプリ全体をコピー
COPY . .

# ポート公開
EXPOSE 3000

# 本番起動（0.0.0.0でバインド）
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]