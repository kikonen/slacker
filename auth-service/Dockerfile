FROM node:14-alpine
WORKDIR /app

RUN mkdir -p /node_modules
ENV PATH="${PATH}:/node_modules/.bin"

COPY .yarnrc package.json yarn.lock ./
RUN yarn install
