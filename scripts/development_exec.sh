#!/usr/bin/env bash

export DIR=`realpath \`dirname $0\``
export DOCKER_ENV=development
. $DIR/base_env.sh || exit

$DOCKER_COMPOSE exec "$@"
