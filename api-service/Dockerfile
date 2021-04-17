FROM node:14-alpine
WORKDIR /app

RUN apk add build-base python
COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn run build
