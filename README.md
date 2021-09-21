# Payment Service Task

## Challenge

We would like you to build an API which will do the following:
- Create, view, edit and delete a payment.
- Apply sorting / filtering on the GET endpoint
- Payments are stored in a DB (SQL / No-SQL).


## Prerequisite
- Docker and Docker Compose
## Installation


After cloning the repo, execute following commands
```bash
$ cd <project-directory>
$ npm install
```

## Running the app

```bash
$ docker-compose up <environment>

# For Example
# development
$ docker-compose up dev

# production
$ docker-compose up prod
```

## Calling APIs with SwaggerUI

- Swagger UI can be access on this route: http://localhost:3000/api. 
- Swagger documentation includes all the required details to call the exposed APIs including examples and sample responses. 

## Stopping the app

```bash
$ docker-compose down <environment>

# For Example
# development
$ docker-compose down dev

# production
$ docker-compose down prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
