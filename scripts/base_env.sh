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

if [[ $DOCKER_ENV == "" ]]; then
    echo "DEFAULT: DOCKER_ENV=development"
    DOCKER_ENV=development
fi

DOCKER_COMPOSE_BASE="docker-compose --project-dir=${ROOT_DIR} --project-name ${BASE_NAME}_${DOCKER_ENV} --env-file .${DOCKER_ENV}_env"

if [[ $DOCKER_ENV == 'production' ]]; then
    DOCKER_COMPOSE="${DOCKER_COMPOSE_BASE} -f docker-compose.yml -f docker-compose.${DOCKER_ENV}.yml"
elif [[ $DOCKER_ENV == 'base' ]]; then
    DOCKER_COMPOSE="${DOCKER_COMPOSE_BASE} -f docker-compose.yml -f docker-compose.${DOCKER_ENV}.yml"
elif [[ $DOCKER_ENV == 'build' ]]; then
    DOCKER_COMPOSE="${DOCKER_COMPOSE_BASE} -f docker-compose.yml -f docker-compose.${DOCKER_ENV}.yml"
else
    DOCKER_COMPOSE="${DOCKER_COMPOSE_BASE}"
fi

COMPOSE_PROFILES=${DOCKER_ENV}

echo "CMD=$DOCKER_COMPOSE"

export BASE_NAME
export COMPOSE_PROFILES
export DOCKER_ENV

$DIR/setup_repositories.sh
