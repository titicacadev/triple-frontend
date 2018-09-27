# base
FROM node:10 AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# lint
FROM base as build
WORKDIR /app
COPY . .
RUN npm run lint

# build
FROM node:10 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --only=production
RUN npm run build
