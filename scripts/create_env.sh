DIR=`dirname $0`
DIR=`realpath $DIR`
ROOT_DIR=`dirname $DIR`

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
