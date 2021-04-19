# Dev env

```bash
docker build -t slacker-app .

#docker volume create slacker_postgres
#docker volume create slacker_postgres_config
#docker network create slacker_postgres

psql -h localhost -U postgres
docker exec -it db psql -h localhost -U postgres

# NOTE KI updated modules
docker-compose exec ui sh
yarn outdated
yarn upgrade nodemon
```

## Dev

```bash
COMPOSE_PROFILES=dev,schema docker-compose up
```

## Testing

### Kafka
```bash
docker-compose exec kafka bash

kafka-topics.sh --create --topic quickstart-events --bootstrap-server kafka:9092
kafka-topics.sh --describe --topic quickstart-events --bootstrap-server kafka:9092

kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server kafka:9092
kafka-console-producer.sh --topic quickstart-events --bootstrap-server kafka:9092

docker-compose exec ksqldb-cli ksql http://ksqldb-server:8088
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
- https://stackoverflow.com/questions/48855130/why-chrome-cant-inspect-nodejs-code-in-docker-container
- https://blog.risingstack.com/how-to-debug-a-node-js-app-in-a-docker-container/
- https://stackoverflow.com/questions/56966322/unknown-compiler-options-include-exclude/56966602

### Express
- https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1
- https://developer.okta.com/blog/2018/11/15/node-express-typescript
- https://codeforgeek.com/render-html-file-expressjs/
- https://ejs.co

### React
- https://create-react-app.dev/docs/adding-typescript/
- https://github.com/facebook/create-react-app/issues/9792
- https://gist.github.com/przbadu/4a62a5fc5f117cda1ed5dc5409bd4ac1
- https://stackoverflow.com/questions/64654145/can-i-use-a-custom-node-modules-path-with-create-react-app
- https://stackoverflow.com/questions/43274925/development-server-of-create-react-app-does-not-auto-refresh
- https://stackoverflow.com/questions/49429906/how-should-i-configure-create-react-app-to-serve-app-from-subdirectory
- https://skryvets.com/blog/2018/09/20/an-elegant-solution-of-deploying-react-app-into-a-subdirectory/
- https://create-react-app.dev/docs/advanced-configuration/
- https://stackoverflow.com/questions/40516288/webpack-dev-server-with-nginx-proxy-pass

### Docker
- https://hub.docker.com/_/postgres
- https://stackoverflow.com/questions/46440909/how-to-configure-different-dockerfile-for-development-and-production/46441127
- https://medium.com/@etiennerouzeaud/play-databases-with-adminer-and-docker-53dc7789f35f
- https://uilicious.com/blog/5-fatal-docker-gotchas-for-new-users/
- https://www.tripwire.com/state-of-security/devops/psa-beware-exposing-ports-docker/
- https://stackoverflow.com/questions/64081992/docker-opened-up-ports-to-public-how-do-i-close-thme
- https://medium.com/@sujaypillai/docker-daemon-configuration-file-f577000da655
- https://community.home-assistant.io/t/how-do-you-manage-firewall-rules-on-docker-hosts/105982
- https://stackoverflow.com/questions/50848797/docker-compose-exclude-service-by-default
- https://stackoverflow.com/questions/26331651/how-can-i-backup-a-docker-container-with-its-data-volumes
- https://stackoverflow.com/questions/50848797/docker-compose-exclude-service-by-default

### nginx
- https://phoenixnap.com/kb/nginx-reverse-proxy
- https://github.com/nginx-proxy/nginx-proxy
- https://stackoverflow.com/questions/53580128/isolate-containers-on-the-jwilder-nginx-proxy-network
- https://dzone.com/articles/how-to-nginx-reverse-proxy-with-docker-compose
- https://stackoverflow.com/questions/51009692/docker-nginx-proxy-nginx-connect-failed-111-connection-refused-while-connec
- https://hub.docker.com/_/nginx
- https://www.liaohuqiu.net/posts/nginx-proxy-pass/
- https://stackoverflow.com/questions/32845674/setup-nginx-not-to-crash-if-host-in-upstream-is-not-found

### Kafka
- https://github.com/bitnami/bitnami-docker-kafka
- https://kafka.apache.org/quickstart
- https://hmh.engineering/experimenting-with-apache-kafka-and-nodejs-5c0604211196
- https://www.npmjs.com/package/kafka-nodehttps://www.npmjs.com/package/kafka-node
- https://www.confluent.io/blog/bottled-water-real-time-integration-of-postgresql-and-kafka/
- https://florimond.dev/blog/articles/2018/09/breaking-news-everything-is-an-event/
- https://www.oreilly.com/library/view/kafka-the-definitive/9781491936153/ch04.html
- https://www.youtube.com/watch?v=-GBk0en6dck

### Events
- https://www.telerik.com/blogs/websockets-vs-server-sent-events
- https://stackoverflow.com/questions/5195452/websockets-vs-server-sent-events-eventsource
- https://www.html5rocks.com/en/tutorials/eventsource/basics/
- https://stackoverflow.com/questions/34657222/how-to-use-server-sent-events-in-express-js
- https://www.confluent.io/blog/building-a-microservices-ecosystem-with-kafka-streams-and-ksql/
- https://stackoverflow.com/questions/28176933/http-authorization-header-in-eventsource-server-sent-events
- https://www.confluent.io/blog/bottled-water-real-time-integration-of-postgresql-and-kafka/
- https://www.confluent.io/blog/kafka-streams-tables-part-1-event-streaming/
- https://ksqldb.io

### DB
- https://hub.docker.com/_/postgres
- https://node-postgres.com
- https://www.smashingmagazine.com/2020/04/express-api-backend-project-postgresql/

### DB schema
- https://betterprogramming.pub/setting-up-rails-with-postgres-using-docker-426c853e8590
- https://guides.rubyonrails.org/active_record_migrations.html
- https://pawelurbanek.com/uuid-order-rails

### OAuth
- https://jwt.io/introduction
- https://console.cloud.google.com/apis/dashboard?pli=1&project=starlit-factor-137723&folder=&organizationId=
- https://github.com/googleapis/google-api-nodejs-client
- https://openid.net/connect/
- https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth
- https://nosleepjavascript.com/openid-oauth-authentication-for-nodejs/
- https://developers.google.com/identity/protocols/oauth2/openid-connect

### CSS
- https://getbootstrap.com/docs/4.0/getting-started/introduction/

### JS frameworks
- https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component

### Editor
- https://emacs.stackexchange.com/questions/33536/how-to-edit-jsx-react-files-in-emacs
