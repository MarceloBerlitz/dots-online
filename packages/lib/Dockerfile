FROM node:alpine

WORKDIR /user/app

COPY package*.json ./
RUN yarn

COPY . .

RUN yarn build
