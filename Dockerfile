# base
FROM node:10 AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
RUN npm run bootstrap

# lint
FROM base AS lint
WORKDIR /app
COPY . .
RUN npm run lint

# build
FROM base AS build
WORKDIR /app
COPY . .
RUN npm run build
