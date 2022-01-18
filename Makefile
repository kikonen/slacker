build:
	docker-compose -f docker-compose.yml -f production_build.yml build --no-cache

up:
	docker-compose -f docker-compose.yml -f production_build.yml up

up_api:
	docker-compose -f docker-compose.yml -f production_build.yml up api
