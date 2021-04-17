# Dev env

```bash
docker build -t slacker-app .

docker volume create slacker_postgres
docker volume create slacker_postgres_config

docker network create slacker_postgres

psql -h localhost -U postgres
docker exec -it db psql -h localhost -U postgres

# NOTE KI updated modules
docker-compose exec ui sh
yarn outdated
yarn upgrade nodemon
```

## Database
### Migrate
```bash
docker-compose run schema rake db:migrate
```

### Create migration
```bash
docker-compose run schema bin/rails generate migration CreateUsers name:string email:string
```

## References
### NodeJS
- https://www.docker.com/blog/how-to-setup-your-local-node-js-development-environment-using-docker/
- https://stackoverflow.com/questions/46744180/building-docker-image-for-node-application-using-yarn-dependency/46744735
- https://github.com/nodejs/docker-node/blob/main/README.md#how-to-use-this-image
- https://www.pullrequest.com/blog/intro-to-using-typescript-in-a-nodejs-express-project/
- https://shemleong.medium.com/using-docker-and-yarn-for-development-2546e567ad2
- https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1

### React
- https://create-react-app.dev/docs/adding-typescript/
- https://github.com/facebook/create-react-app/issues/9792
- https://gist.github.com/przbadu/4a62a5fc5f117cda1ed5dc5409bd4ac1
- https://stackoverflow.com/questions/64654145/can-i-use-a-custom-node-modules-path-with-create-react-app
- https://stackoverflow.com/questions/43274925/development-server-of-create-react-app-does-not-auto-refresh
- https://stackoverflow.com/questions/49429906/how-should-i-configure-create-react-app-to-serve-app-from-subdirectory
- https://skryvets.com/blog/2018/09/20/an-elegant-solution-of-deploying-react-app-into-a-subdirectory/

### Docker
- https://hub.docker.com/_/postgres
- https://stackoverflow.com/questions/46440909/how-to-configure-different-dockerfile-for-development-and-production/46441127
- https://medium.com/@etiennerouzeaud/play-databases-with-adminer-and-docker-53dc7789f35f
- https://uilicious.com/blog/5-fatal-docker-gotchas-for-new-users/
- https://www.tripwire.com/state-of-security/devops/psa-beware-exposing-ports-docker/
- https://stackoverflow.com/questions/64081992/docker-opened-up-ports-to-public-how-do-i-close-thme
- https://medium.com/@sujaypillai/docker-daemon-configuration-file-f577000da655
- https://community.home-assistant.io/t/how-do-you-manage-firewall-rules-on-docker-hosts/105982

### nginx
- https://phoenixnap.com/kb/nginx-reverse-proxy
- https://github.com/nginx-proxy/nginx-proxy
- https://stackoverflow.com/questions/53580128/isolate-containers-on-the-jwilder-nginx-proxy-network
- https://dzone.com/articles/how-to-nginx-reverse-proxy-with-docker-compose
- https://stackoverflow.com/questions/51009692/docker-nginx-proxy-nginx-connect-failed-111-connection-refused-while-connec
- https://hub.docker.com/_/nginx
- https://www.liaohuqiu.net/posts/nginx-proxy-pass/

### Kafka
- https://github.com/bitnami/bitnami-docker-kafka

### Schema
- https://betterprogramming.pub/setting-up-rails-with-postgres-using-docker-426c853e8590
- https://guides.rubyonrails.org/active_record_migrations.html
- https://pawelurbanek.com/uuid-order-rails

### OAuth
- https://github.com/googleapis/google-api-nodejs-client
