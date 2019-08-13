# Human Token gateway service
## Installation
### Prerequisites
- Docker v18.06.1+
- Docker Compose v1.22.0+

If you have docker and docker compose installed, please make sure that their versions match the requirement.
### Local environment
1. Clone the engine service repository
```bash
git clone git@bitbucket.org:DECENTGroup/ht-engine-service.git
```
2. Copy `.env.example` then rename to `.env` and fill all necessary environment variables

3. Create and run containers:
```bash
# Flag --build is for automatically building images when there's changes in Dockerfile.
docker-compose up --build -d
```
By default, data stored in postgres and redis will be persisted to host. You can use this command for clearing data.
```bash
bash scripts/clear-data.sh
```
### Common commands
#### Build images
```bash
docker-compose build [--no-cache]
```
Images should be rebuilt when there is an update on Dockerfile or there is any issue with the existing images.
#### List all running containers
```bash
docker ps [-a]
```
#### Check logs
```bash
docker logs [-f] {container_name}

#example
docker logs -f engine
```
#### Stop and remove all containers
```bash
docker-compose down
```
#### SSH into containers
```bash
docker exec -it {container_id} bash
```
### Other environments
 
1. Build
    1. Build production: `docker-compose -f docker-compose.production.yml build`
    2. Build staging: `docker-compose -f docker-compose.staging.yml build`
    3. Build development: `docker-compose -f docker-compose.dev.yml build`
    4. Build test: `docker-compose -f docker-compose.test.yml build`
    5. Build development: N/A (use local npm instead)

2. Running

    1. Up production: `docker-compose -f docker-compose.production.yml up -d`
    2. Up staging: `docker-compose -f docker-compose.staging.yml up -d`
    3. Up test: `docker-compose -f docker-compose.test.yml up -d`
    4. Up development: N/A (use local npm instead)

## Dependencies

Server framework:
https://hapijs.com/

Coding guidlines:
https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines
