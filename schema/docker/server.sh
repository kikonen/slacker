DIR=`dirname $0`
DIR=`realpath $DIR`
ROOT_DIR=`dirname $DIR`
DOCKER_DIR=`realpath "$ROOT_DIR/.."`
CONTAINER=schema

$DOCKER_DIR/scripts/run_server.sh $CONTAINER "$@"
