#!/usr/bin/env bash

export DIR=`realpath \`dirname $0\``
export DOCKER_ENV=base
. $DIR/base_env.sh

time $DOCKER_COMPOSE build "$@"
