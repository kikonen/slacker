FROM node:14
WORKDIR /app

# NOTE KI No volume; can't do much

COPY . /app
#COPY package.json package.json
#COPY yarn.lock yarn.lock

RUN yarn install
RUN yarn build

#CMD ["yarn", "start"]
