#!/usr/bin/env bash

DIR=`realpath \`dirname $0\``
ROOT_DIR=`dirname $DIR`
DOCKER_PRODUCTION_NAME=slacker_production
DOCKER_BUILD_NAME=slacker_build

echo "DOCKER_ENV=${DOCKER_ENV}"

if [[ $DOCKER_ENV == 'production' ]]; then
    DOCKER_COMPOSE="docker-compose --project-dir=$ROOT_DIR --project-name ${DOCKER_PRODUCTION_NAME} --env-file .production_env  -f docker-compose.yml -f docker-compose.production.yml"
elif [[ $DOCKER_ENV == 'build' ]]; then
    DOCKER_COMPOSE="docker-compose --project-dir=${ROOT_DIR} --project-name ${DOCKER_BUILD_NAME} --env-file .build_env -f docker-compose.yml -f docker-compose.build.yml"
else
    echo "DEFAULT: DOCKER_ENV=development"
    DOCKER_COMPOSE="docker-compose --project-dir=${ROOT_DIR} --env-file .development_env"
fi
echo "CMD=$DOCKER_COMPOSE"
