DIR=`dirname $0`
DIR=`realpath $DIR`
ROOT_DIR=`dirname $DIR`

docker-compose --project-dir=$ROOT_DIR -f docker-compose.yml -f docker-compose.production.yml down "$@"
