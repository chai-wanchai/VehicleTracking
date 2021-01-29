<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
  <a href="http://typeorm.io/">
    <img src="https://github.com/typeorm/typeorm/raw/master/resources/logo_big.png" width="320">
  </a>
  <img src="https://raw.githubusercontent.com/swagger-api/swagger.io/wordpress/images/assets/SWU-logo-clr.png" width="300">
</p>
  

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
Fork for using simple authentication api with database by using <b>TypeORM</b> 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev

# watch mode
$ npm run start:dev

# production mode
$ npm run start
```

## Running on Docker
```bash
# development
$ docker-compose -f docker-compose.yml up --build
```

## Test

```bash
# unit tests
$ npm run test
```

##  Application 

API : http://localhost:5000
API Document : http://localhost:5000/api-doc
Frontend : http://localhost:3000

##  Step To Run Application With Docker
1. run ``` docker-compose -f docker-compose.yml up --build ```
2. Wait for docker build complete
3. After API run complete, Use Postman to load collection in folder ``` ./postman/vehicle.postman_collection.json ```
4. After Load Postman Collection
  4.1 Run [Register Vehicle] Request
  4.2 Run [Get Access And Add Tracking] Request
5. Open http://localhost:3000 for check result of back-office web app
 *** Note ***
  - You can see API Specification at http://localhost:5000/api-doc

