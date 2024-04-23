set dotenv-load

default: dev

dev:
    just watch & find src/ | entr -s 'just fmt && npm run tailwind:compile'

build:
    npm run tailwind:compile && just content && just sitemap && cargo leptos build --release -vv

watch:
    cargo leptos watch

content:
    cargo run --bin content --features content

prepare:
    cargo sqlx prepare -- --all-targets --all-features

fmt:
    cargo fmt && leptosfmt src/*.rs src/**/*.rs

import:
    fly secrets import < .env.production

deploy:
    fly deploy \
    --build-arg SPOTIFY_REFRESH_TOKEN=${SPOTIFY_REFRESH_TOKEN} \
    --build-arg SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID} \
    --build-arg SPOTIFY_CLIENT_SECRET=${SPOTIFY_CLIENT_SECRET} \
    --build-arg APP_URL=${APP_URL} \
    --build-arg DATABASE_URL=${DATABASE_URL}

docker-build:
    docker build \
    --build-arg SPOTIFY_REFRESH_TOKEN=${SPOTIFY_REFRESH_TOKEN} \
    --build-arg SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID} \
    --build-arg SPOTIFY_CLIENT_SECRET=${SPOTIFY_CLIENT_SECRET} \
    --build-arg APP_URL=${APP_URL} \
    --build-arg DATABASE_URL=${DATABASE_URL} \
    -t blog:latest .

docker-run:
    docker run -d --name blog -p 8080:8080 --env-file ./.env blog:latest

docker-stop:
    docker stop blog

docker-rm:
    docker rm blog

docker-restart: docker-stop docker-rm docker-build docker-run
