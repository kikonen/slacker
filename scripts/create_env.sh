#!/usr/bin/env bash

export DIR=`realpath \`dirname $0\``
. $DIR/base_env.sh

#
#
#

cd $ROOT_DIR/auth-service
if [[ ! -f .env ]]; then
    cp _env .env
fi
cd ..

cd $ROOT_DIR/api-service
if [[ ! -f .env ]]; then
    cp _env .env
fi
cd ..

ls -l $ROOT_DIR/auth-service/.env
ls -l $ROOT_DIR/api-service/.env
