FROM node:14
WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

#COPY . /app
CMD ["yarn", "start"]
