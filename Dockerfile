ARG RUST_VERSION=1.72.0
ARG DEBIAN_VERSION=11.6

# all credit goes to https://fasterthanli.me/articles/remote-development-with-rust-on-fly-io#what-the-heck-is-fly-io-for-even
# for an an awesome walkthrough of docker files for rust, this is more or less a direct copy pasta with a few minor tweaks

# after containerization, this manages to come in at a whopping ~163mb, still a bit to we could optimize but this should do for now

# stage one - copy over our build files for compilation, including workspace and .env files
FROM rust:${RUST_VERSION}-slim-bullseye AS build

WORKDIR /app

COPY ./rust-toolchain.toml ./
COPY ./Cargo.toml ./
# note: all the sample crates are required as we're in the context of a workspace
# though only for the build step as we'll only use the crate that gets deployed
# to fly as the crate that runs in the runtime container
COPY ./examples ./examples
COPY ./sqlx-data.json ./sqlx-data.json
COPY ./migrations ./migrations
COPY ./src/main.rs ./src/main.rs
COPY ./src/server ./src/server

# on rebuilds, we explicitly cache our rust build dependencies to speed things up
RUN --mount=type=cache,target=/app/target \
    --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/usr/local/cargo/git \
    --mount=type=cache,target=/usr/local/rustup \
    set -eux; \
    export DEBIAN_FRONTEND=noninteractive; \
    apt update; \
    apt install --yes pkg-config libssl-dev; \
    apt clean autoclean; \
    apt autoremove --yes; \
    rustup install nightly; \
    cargo build --workspace --release; \
    objcopy --compress-debug-sections target/release/joey-mckenzie-tech ./server

# we'll set these environment variables during the build step, both locally and in our Fly instance
ARG SPOTIFY_REFRESH_TOKEN=""
ARG SPOTIFY_CLIENT_ID=""
ARG SPOTIFY_CLIENT_SECRET=""
ARG DATABASE_URL=""
ARG RUST_ENV=""

# create a .env file for loading variables
RUN echo "\n\
    SPOTIFY_REFRESH_TOKEN=${SPOTIFY_REFRESH_TOKEN}\n\
    SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID}\n\
    SPOTIFY_CLIENT_SECRET=${SPOTIFY_CLIENT_SECRET}\n\
    RUST_ENV=${RUST_ENV}\n\
    DATABASE_URL=${DATABASE_URL}" > ./.env

# stage two - we'll utilize a second container to run our built binary from our first container - slim containers!
FROM debian:${DEBIAN_VERSION}-slim as deploy

RUN set -eux; \
    export DEBIAN_FRONTEND=noninteractive; \
    apt update; \
    apt install --yes --no-install-recommends openssl ca-certificates; \
    apt clean autoclean; \
    apt autoremove --yes; \
    rm -rf /var/lib/{apt,dpkg,cache,log}/

WORKDIR /deploy

# copy over build artifacts from the build stage
COPY ./config ./config
COPY --from=build /app/server ./
COPY --from=build /app/.env ./

EXPOSE 80
EXPOSE 443

CMD ["./server"]
