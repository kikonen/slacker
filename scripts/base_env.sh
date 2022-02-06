#!/usr/bin/env bash

DIR=`realpath \`dirname $0\``
ROOT_DIR=`dirname $DIR`
if [[ -f $ROOT_DIR/.env ]]; then
   . $ROOT_DIR/.env
fi

if [[ $BASE_NAME == "" ]]; then
    echo "BASE_NAME missing from .env"
    exit
fi

echo "DOCKER_ENV=${DOCKER_ENV}"

if [[ $DOCKER_ENV == 'production' ]]; then
    DOCKER_COMPOSE="docker-compose --project-dir=$ROOT_DIR --project-name ${BASE_NAME}_production --env-file .production_env  -f docker-compose.yml -f docker-compose.production.yml"
    COMPOSE_PROFILES=production
elif [[ $DOCKER_ENV == 'build' ]]; then
    DOCKER_COMPOSE="docker-compose --project-dir=${ROOT_DIR} --project-name ${BASE_NAME}_build --env-file .build_env -f docker-compose.yml -f docker-compose.build.yml"
    COMPOSE_PROFILES=build
else
    echo "DEFAULT: DOCKER_ENV=development"
    DOCKER_COMPOSE="docker-compose --project-dir=${ROOT_DIR} --project-name ${BASE_NAME}_development --env-file .development_env"
    COMPOSE_PROFILES=development
fi
echo "CMD=$DOCKER_COMPOSE"

$DIR/setup_repositories.sh
