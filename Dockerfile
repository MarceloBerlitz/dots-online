FROM node:alpine AS build
WORKDIR /usr/app

COPY ./package.json .
COPY ./yarn.lock .
COPY ./packages ./packages

RUN yarn

WORKDIR /usr/app/packages/lib
RUN yarn build

WORKDIR /usr/app/packages/web
RUN yarn build

FROM build AS buildserver

WORKDIR /usr/app/packages/server
RUN yarn build
COPY --from=build /usr/app/packages/web/build /usr/app/packages/server/public

FROM node:alpine as deploy

WORKDIR /usr/app
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/packages/lib ./node_modules/dots-online-lib
COPY --from=buildserver /usr/app/packages/server ./packages/server

WORKDIR /usr/app/packages/server
CMD ["node", "./dist/index.js"]