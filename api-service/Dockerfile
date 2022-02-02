FROM node:14-alpine
WORKDIR /app

ENV NODE_PATH=/node_modules \
    PATH=$PATH:/app/bin:/node_modules/.bin

#RUN apk add build-base python2
RUN npm config set scripts-prepend-node-path true

ENTRYPOINT ["docker/docker-entrypoint.sh"]
