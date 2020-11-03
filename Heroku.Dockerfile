FROM node:alpine AS buildweb
WORKDIR /usr/app

COPY ./packages/web .

RUN yarn
RUN yarn build

FROM node:alpine AS prepareserver
WORKDIR /usr/app

COPY ./packages/server .
COPY --from=buildweb /usr/app/build ./public

RUN yarn

CMD ["yarn", "start"]