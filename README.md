<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
<a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

# REST Application

This is a simple REST application built with NestJS framework. It communicates with the ReqRes API, stores user data in MongoDB, sends emails, and emits RabbitMQ events.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MongoDB
- RabbitMQ

## Installation

1. UnZip the repository:

## Installation

```bash
$ npm install
```

## Running the app

## Configure the application:

Modify the values inside the file to match your environment. This file contains configuration for MongoDB and RabbitMQ connection.

## Running the Application

1. Start RabbitMQ service on your machine, Meanwhile there is no connection changes needed for MongoDB since an online repo is already connected.

2. Build and start the application:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The application should now be running on `http://localhost:4000`.

## API Endpoints

- `POST /api/users`: Create a user entry in the database. This will trigger sending a dummy email and RabbitMQ event.

- `GET /api/user/{userId}`: Retrieve user data from ReqRes API and return it in JSON representation.

- `GET /api/user/{userId}/avatar`: Retrieve the user's avatar image. On the first request, the image will be saved as a plain file in the file system and stored in the MongoDB. On subsequent requests, the previously saved image will be returned in base64-encoded representation.

- `DELETE /api/user/{userId}/avatar`: Removes the user's avatar image from the file system and delete the corresponding entry from the MongoDB.

## Testing

To run the tests, use the following command:

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Ketan Totlani](https://ketan.vercel.app/)

## License

Nest is [MIT licensed](LICENSE).
# payever
# payever
