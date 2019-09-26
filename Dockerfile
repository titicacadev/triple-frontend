# base
FROM node:10 AS base
WORKDIR /app

ARG npm_token
ENV NPM_TOKEN=${npm_token}
COPY npmrc.template ./.npmrc

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

ARG npm_token
ENV NPM_TOKEN=${npm_token}
COPY npmrc.template ./.npmrc

RUN npm run publish -- --yes --dist-tag next
