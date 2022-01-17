#
#
#

cd auth-service
if [[ ! -f .env ]]; then
    cp _env .env
fi
cd ..

cd api-service
if [[ ! -f .env ]]; then
    cp _env .env
fi
cd ..

ls -l auth-service/.env
ls -l api-service/.env
