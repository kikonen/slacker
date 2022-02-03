#!/usr/bin/env bash

export DIR=`realpath \`dirname $0\``
export DOCKER_ENV=production
. $DIR/base_env.sh

$DOCKER_COMPOSE stop "$@"
