# base
FROM node:10 AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# lint
FROM base AS lint
WORKDIR /app
COPY . .
RUN npm run lint

# build
FROM base AS build
WORKDIR /app
COPY . .
RUN npm run bootstrap
RUN npm run build

# release
FROM build AS release

ARG npm_token
ENV NPM_TOKEN=${npm_token}

RUN echo //registry.npmjs.org/:_authToken=$NPM_TOKEN > .npmrc
RUN npm run publish -- --yes
