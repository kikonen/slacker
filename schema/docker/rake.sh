DIR=`dirname $0`
DIR=`realpath $DIR`
ROOT_DIR=`dirname $DIR`
DOCKER_DIR=`realpath "$ROOT_DIR/.."`
CONTAINER=schema

$DOCKER_DIR/scripts/rails_rake.sh $CONTAINER "$@"
