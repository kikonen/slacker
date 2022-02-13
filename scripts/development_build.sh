#!/usr/bin/env bash

export DIR=`realpath \`dirname $0\``
export DOCKER_ENV=development
. $DIR/base_env.sh

time $DOCKER_COMPOSE build \
     --build-arg DOCKER_UID=`id -u` \
     --build-arg DOCKER_GID=`id -g`  "$@"
