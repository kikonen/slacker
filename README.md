# Dev env

```bash
docker build -t slacker-app .

docker volume create slacker_postgres
docker volume create slacker_postgres_config

docker network create slacker_postgres

psql -h localhost -U postgres
docker exec -it db psql -h localhost -U postgres

```

## References

- https://github.com/nodejs/docker-node/blob/main/README.md#how-to-use-this-image
- https://stackoverflow.com/questions/46744180/building-docker-image-for-node-application-using-yarn-dependency/46744735
- https://shemleong.medium.com/using-docker-and-yarn-for-development-2546e567ad2
- https://www.docker.com/blog/how-to-setup-your-local-node-js-development-environment-using-docker/
- https://hub.docker.com/_/postgres
- https://www.pullrequest.com/blog/intro-to-using-typescript-in-a-nodejs-express-project/
