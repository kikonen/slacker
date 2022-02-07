FROM node:14-alpine
WORKDIR /app

ENV NODE_PATH=/node_modules \
    PATH=$PATH:/app/bin:/node_modules/.bin

RUN ln -sf /node_modules node_modules

RUN npm config set scripts-prepend-node-path true

ENTRYPOINT ["docker/docker-entrypoint.sh"]
