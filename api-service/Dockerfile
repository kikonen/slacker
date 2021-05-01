FROM node:14-alpine
WORKDIR /app

RUN apk add build-base python

RUN mkdir -p /node_modules
#RUN ln -sf /node_modules node_modules
ENV PATH="${PATH}:./node_modules/.bin"

COPY .yarnrc package.json yarn.lock ./
RUN yarn install

#COPY . .

#RUN yarn run build
