DIR=`dirname $0`
DIR=`realpath $DIR`
ROOT_DIR=`dirname $DIR`

time docker-compose --project-name slacker -f docker-compose.yml -f docker-compose.build.yml build "$@"
