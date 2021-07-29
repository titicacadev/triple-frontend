FROM node:16 AS docs-build
WORKDIR /app

COPY . .

ARG TAG_NAME
RUN node ./conf/package.json.js $TAG_NAME

ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
RUN npm ci
RUN rm ~/.npmrc

RUN npm run build

FROM nginx:latest as docs-release

COPY --from=docs-build /app/storybook-static /usr/share/nginx/html/
COPY ./conf/nginx.conf /etc/nginx/nginx.conf
