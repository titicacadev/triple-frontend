# base
FROM node:10 AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# lint
FROM base AS lint
COPY . .
RUN npm run lint

# build
FROM base AS build
COPY babel.config.js lerna.json tsconfig.base.json ./
COPY packages ./packages
RUN npm run bootstrap
RUN npm run build

# release
FROM build AS release

ARG NPM_TOKEN
ARG VERSION="0.0.0-${SHORT_SHA} --dist-tag canary"

RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
RUN ["sh", "-c", "npm run publish -- --yes ${VERSION}"]
