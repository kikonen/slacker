#!/usr/bin/env bash

DIR=`realpath \`dirname $0\``
. $DIR/base_env.sh

CONTAINER=$1
SERVER_MODE=debug $DOCKER_COMPOSE up -d $CONTAINER

shift
#$DOCKER_COMPOSE exec $CONTAINER bash -c "bundle check || bundle install"
$DOCKER_COMPOSE exec $CONTAINER bash -c "yarn install"
$DOCKER_COMPOSE exec $CONTAINER bundle exec rails s -b 0.0.0.0 -p 3000
#$DOCKER_COMPOSE stop $CONTAINER
