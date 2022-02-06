#!/usr/bin/env bash

DIR=`realpath \`dirname $0\``
ROOT_DIR=`dirname $DIR`
if [[ -f $ROOT_DIR/.env ]]; then
   . $ROOT_DIR/.env
fi
DOCKER_PRODUCTION_NAME="${BASE_NAME}_production"
DOCKER_BUILD_NAME="${BASE_NAME}_build"

echo "DOCKER_ENV=${DOCKER_ENV}"

if [[ $DOCKER_ENV == 'production' ]]; then
    DOCKER_COMPOSE="docker-compose --project-dir=$ROOT_DIR --project-name ${DOCKER_PRODUCTION_NAME} --env-file .production_env  -f docker-compose.yml -f docker-compose.production.yml"
    COMPOSE_PROFILES=production
elif [[ $DOCKER_ENV == 'build' ]]; then
    DOCKER_COMPOSE="docker-compose --project-dir=${ROOT_DIR} --project-name ${DOCKER_BUILD_NAME} --env-file .build_env -f docker-compose.yml -f docker-compose.build.yml"
    COMPOSE_PROFILES=build
else
    echo "DEFAULT: DOCKER_ENV=development"
    DOCKER_COMPOSE="docker-compose --project-dir=${ROOT_DIR} --env-file .development_env"
    COMPOSE_PROFILES=development
fi
echo "CMD=$DOCKER_COMPOSE"

$DIR/setup_repositories.sh
