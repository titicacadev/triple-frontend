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

# test
FROM cypress/base:10 AS test
WORKDIR /app
COPY . .
# by setting CI environment variable we switch the Cypress install messages
# to small "started / finished" and avoid 1000s of lines of progress messages
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=true
RUN npm ci
RUN cd test && npm ci && cd ..
RUN npm install react-dom@16
RUN npm test

# build
FROM base AS build
WORKDIR /app
COPY . .
RUN npm run build
