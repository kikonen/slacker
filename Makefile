build: build_api build_auth build_ui build_schema
tag: tag_api tag_auth tag_ui tag_schema
push: push_api push_auth push_ui push_schema

build_api:
	docker-compose --project-name slacker -f docker-compose.yml -f docker-compose.build.yml build --no-cache api

build_auth:
	docker-compose --project-name slacker -f docker-compose.yml -f docker-compose.build.yml build --no-cache auth

build_ui:
	docker-compose --project-name slacker -f docker-compose.yml -f docker-compose.build.yml build --no-cache ui

build_schema:
	docker-compose --project-name slacker -f docker-compose.yml -f docker-compose.build.yml build --no-cache schema

tag_api:
	docker image tag slacker_api docker.ikari.fi/slacker_api:${BUILD_TAG}

tag_auth:
	docker image tag slacker_api docker.ikari.fi/slacker_auth:${BUILD_TAG}

tag_ui:
	docker image tag slacker_api docker.ikari.fi/slacker_ui:${BUILD_TAG}

tag_schema:
	docker image tag slacker_api docker.ikari.fi/slacker_schema:${BUILD_TAG}

push_api:
	docker image push docker.ikari.fi/slacker_api:${BUILD_TAG}

push_auth:
	docker image push docker.ikari.fi/slacker_auth:${BUILD_TAG}

push_ui:
	docker image push docker.ikari.fi/slacker_ui:${BUILD_TAG}

push_schema:
	docker image push docker.ikari.fi/slacker_schema:${BUILD_TAG}

up:
	docker-compose -f docker-compose.yml -f production_build.yml up

up_api:
	docker-compose -f docker-compose.yml -f production_build.yml up api
