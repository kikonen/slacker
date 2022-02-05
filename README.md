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

### Setup
```bash
sh scripts/create_env.sh
sh scripts/create_jwt_secrets.sh

docker-compose up -d schema
docker-compose exec schema rake db:create db:migrate
docker-compose down
```

### Setup Google Auth

See [Google Cloud console](https://console.cloud.google.com/apis/credentials)

```bash
vim auth-service/.env
# --------------
OAUTH_CLIENT_ID=....
OAUTH_CLIENT_SECRET=....
```

### Run app
```bash
scripts/development_up.sh
```
Server runs at http://localhost:8080

Server links
- [Slacker - Main app](http://localhost:8080)
- [Adminer - DB schemaa](http://localhost:8080/adminer)

## Testing

### Kafka
```bash
docker-compose exec kafka bash

kafka-topics.sh --create --topic channel_1 --bootstrap-server kafka:9092
kafka-topics.sh --describe --topic channel_1 --bootstrap-server kafka:9092

kafka-console-consumer.sh --topic channel_1 --group test1 --from-beginning --bootstrap-server kafka:9092
kafka-console-producer.sh --topic channel_1 --bootstrap-server kafka:9092

docker-compose exec ksqldb-cli ksql http://ksqldb-server:8088
```

### Debug channel content
```bash
docker-compose exec api sh
kafkacat -C -b kafka:9092 -t channel_b9335aed-5ecb-43b8-b026-014925752084 -p 0 -c 10 -f '%T offset %o: key %k: %s\n'
```

## Database

### Start schem
```bash
docker-compose up -d schema
```

### Migrate
```bash
docker-compose exec schema rake db:migrate
```

### Create migration
```bash
docker-compose exec schema bin/rails generate migration CreateUsers name:string email:string
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
- https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/
- https://khalilstemmler.com/articles/enterprise-typescript-nodejs/clean-consistent-expressjs-controllers/
- https://medium.com/@michael.svr/node-js-rest-api-with-rbac-jwt-repository-and-mvc-pattern-part-1-f5717c0b7103
- https://www.digitalocean.com/community/tutorials/use-expressjs-to-get-url-and-post-parameters
- https://gabrieleromanato.name/nodejs-the-mvc-design-pattern-and-the-crud-model-in-expressjs
- https://stackoverflow.com/questions/11625519/how-to-access-the-request-body-when-posting-using-node-js-and-express
- https://minaluke.medium.com/trigger-node-inspector-by-code-25c8a07177f4
- https://expressjs.com/en/guide/routing.html

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
- https://fettblog.eu/typescript-react/components/
- https://www.freecodecamp.org/news/get-pro-with-react-setstate-in-10-minutes-d38251d1c781/
- https://www.digitalocean.com/community/conceptual_articles/understanding-how-to-render-arrays-in-react
- https://reactjs.org/docs/handling-events.html
- https://reactjs.org/docs/lifting-state-up.html
- https://medium.com/@krzakmarek88/eventemitter-instead-of-lifting-state-up-f5f105054a5
- https://medium.com/komenco/react-autobinding-2261a1092849
- https://survivejs.com/webpack/styling/separating-css/
- https://www.w3schools.com/react/react_sass.asp
- https://tech.amikelive.com/node-830/reactjs-changing-default-port-3000-in-create-react-app/

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
- https://docs.docker.com/compose/install/
- https://stackoverflow.com/questions/48851190/docker-compose-override-a-ports-property-instead-of-merging-it
- https://stackoverflow.com/questions/42510002/how-to-clear-the-logs-properly-for-a-docker-container
- https://docs.docker.com/engine/reference/commandline/system_prune/
- https://typeofnan.dev/how-to-serve-a-react-app-with-nginx-in-docker/
- https://stackoverflow.com/questions/42179146/docker-compose-how-to-extend-service-with-build-to-use-an-image-instead
- https://stackoverflow.com/questions/45109398/how-can-i-make-docker-compose-bind-the-containers-only-on-defined-network-instea
- https://docs.docker.com/network/iptables/
- https://forums.docker.com/t/override-docker-firewall-rules-without-disabling-iptables-modification-by-docker/49206
- https://medium.com/swlh/manage-iptables-firewall-for-docker-kubernetes-daa5870aca4d
- https://unrouted.io/2017/08/15/docker-firewall/
- https://www.thegeekstuff.com/2011/01/iptables-fundamentals/
- https://www.digitalocean.com/community/tutorials/iptables-essentials-common-firewall-rules-and-commands
- https://stackoverflow.com/questions/27937185/assign-static-ip-to-docker-container
- https://stackoverflow.com/questions/64081992/docker-opened-up-ports-to-public-how-do-i-close-them
- https://stackoverflow.com/questions/42139605/how-do-you-manage-secret-values-with-docker-compose-v3-1

### nginx
- https://phoenixnap.com/kb/nginx-reverse-proxy
- https://github.com/nginx-proxy/nginx-proxy
- https://stackoverflow.com/questions/53580128/isolate-containers-on-the-jwilder-nginx-proxy-network
- https://dzone.com/articles/how-to-nginx-reverse-proxy-with-docker-compose
- https://stackoverflow.com/questions/51009692/docker-nginx-proxy-nginx-connect-failed-111-connection-refused-while-connec
- https://hub.docker.com/_/nginx
- https://www.liaohuqiu.net/posts/nginx-proxy-pass/
- https://stackoverflow.com/questions/32845674/setup-nginx-not-to-crash-if-host-in-upstream-is-not-found
- https://serverfault.com/questions/801628/for-server-sent-events-sse-what-nginx-proxy-configuration-is-appropriate
- https://linuxize.com/post/nginx-reverse-proxy/
- https://tarunlalwani.com/post/nginx-proxypass-server-paths/
- https://stackoverflow.com/questions/18740635/nginx-upstream-timed-out-110-connection-timed-out-while-reading-response-hea
- https://serverfault.com/questions/804298/nginx-reverse-proxy-without-base-url
- https://www.journaldev.com/26342/nginx-location-directive
- https://www.journaldev.com/26618/nginx-configuration-file

### Kafka
- https://github.com/bitnami/bitnami-docker-kafka
- https://kafka.apache.org/quickstart
- https://hmh.engineering/experimenting-with-apache-kafka-and-nodejs-5c0604211196
- https://www.npmjs.com/package/kafka-nodehttps://www.npmjs.com/package/kafka-node
- https://www.confluent.io/blog/bottled-water-real-time-integration-of-postgresql-and-kafka/
- https://florimond.dev/blog/articles/2018/09/breaking-news-everything-is-an-event/
- https://www.oreilly.com/library/view/kafka-the-definitive/9781491936153/ch04.html
- https://www.youtube.com/watch?v=-GBk0en6dc
- https://www.confluent.io/blog/bottled-water-real-time-integration-of-postgresql-and-kafka/
- https://www.confluent.io/blog/kafka-streams-tables-part-1-event-streaming/
- https://ksqldb.io
- https://www.confluent.io/blog/building-a-microservices-ecosystem-with-kafka-streams-and-ksql/
- https://stackoverflow.com/questions/14755030/apache-kafka-consumer-state
- https://stackoverflow.com/questions/39735036/make-kafka-topic-log-retention-permanent
- https://www.confluent.io/blog/kafka-elasticsearch-connector-tutorial/
- https://stackoverflow.com/questions/43435424/comparing-kafka-node-and-node-rdkafka/44331609
- https://rclayton.silvrback.com/thoughts-on-node-rdkafka-development
- https://www.confluent.io/blog/kafka-elasticsearch-connector-tutorial/

### Server events
- https://www.telerik.com/blogs/websockets-vs-server-sent-events
- https://stackoverflow.com/questions/5195452/websockets-vs-server-sent-events-eventsource
- https://www.html5rocks.com/en/tutorials/eventsource/basics/
- https://stackoverflow.com/questions/34657222/how-to-use-server-sent-events-in-express-js
- https://stackoverflow.com/questions/28176933/http-authorization-header-in-eventsource-server-sent-events
- https://stackoverflow.com/questions/6534572/how-to-close-a-server-sent-events-connection-on-the-server
'
### DB
- https://hub.docker.com/_/postgres
- https://node-postgres.com
- https://www.smashingmagazine.com/2020/04/express-api-backend-project-postgresql/
- https://stackoverflow.com/questions/11393438/what-is-activerecord-equivalence-in-the-node-js-world
- https://sequelize.org/v3/docs/associations/
- https://sequelize.org/master/manual/advanced-many-to-many.html
- https://stackoverflow.com/questions/27929488/sequelize-includes-reference-table-row-in-result-when-using-include/47097675
- https://stackoverflow.com/questions/31679838/sequelizejs-findall-exclude-field
- https://stackoverflow.com/questions/63634748/sequelize-v5-v6-upgrade-typescript-error-property-x-does-not-exist-on-tyep

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
- https://github.com/franleplant/sso-with-openid/blob/master/src/auth/middleware.ts
- https://developers.google.com/identity/protocols/oauth2/openid-connect
- https://github.com/panva/node-openid-client

### Session auth
- https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage
- https://stackoverflow.com/questions/35291573/csrf-protection-with-json-web-tokens
- https://caniuse.com/same-site-cookie-attribute
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
- https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9
- https://www.nearform.com/blog/improve-json-web-tokens-performance-in-node-js/

### CSS
- https://getbootstrap.com/docs/4.0/getting-started/introduction/

### JS frameworks
- https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component

### Editor
- https://emacs.stackexchange.com/questions/33536/how-to-edit-jsx-react-files-in-emacs
- https://dev.to/viglioni/how-i-set-up-my-emacs-for-typescript-3eeh
- https://github.com/facebook/create-react-app/issues/9056
- https://stackoverflow.com/questions/8246483/emacs-how-to-disable-files-creation

### GIT
- https://stackoverflow.com/questions/17683458/how-do-i-commit-case-sensitive-only-filename-changes-in-git
