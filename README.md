# orbita-challenge

## Project setup

### Install Docker

#### Automatic (Ubuntu Only!)
```
./install_docker.sh
```
*This script will install Docker and Docker Compose. If you wish to remove them after use, run `./uninstall_docker.sh`

#### Manual

Install Docker and Docker Compose:

https://docs.docker.com/install/

https://docs.docker.com/compose/install/

### Run Docker containers and setup commands

After install docker and docker-compose porperly, you must be ready to execute the following commands

```
docker-compose build
docker-compose run --rm --no-deps --entrypoint "" back npm install
docker-compose run --rm --entrypoint "" back npm run sequelize -- db:create
docker-compose run --rm --entrypoint "" back npm run sequelize -- db:migrate
docker-compose run --rm --entrypoint "" back npm run sequelize -- db:seed:all

```
(Some warns are expected)

## Run App
```
docker-compose up
```
And in another terminal window:
```
docker-compose exec back npm run start
```
App will be running on http://localhost:8080

## Run Tests
```
docker-compose up
```
And in another terminal window:
```
docker-compose run --rm --entrypoint "" back npm run test
```
# API Doc

Solar Panels API Documentation can be read here: https://github.com/giovanecosta/orbita-challenge/blob/master/back/docs/api.md
