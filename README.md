<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This app has been created to demonstate memory leaks in jest using node 16.11+ as discussed here: https://github.com/jestjs/jest/issues/11956. The thread states that memory leaks were not an issue running jest with node 16.10.

This project will be augmented as new tests are devised to exercise jest memory management.


## Installation

```bash
$ npm install
```

## Testing

Testing is the main focus of this repo. Test have been compiled in sets of increasing complexity to track and demonstrate the introduction and management of memory leaks.

Currently there are two sets of duplicated tests, listed here with expected results:

## Memory leak tests

A variety of memory and performance checks for creating and freeing a contrived memory leak.

test results: tests prove that memoery accumulates and can be freed by exposing and calling the garbage collector.

## Test Container leak tests

A variety of memory and timing checks for creating and freeing a contrived memory leak alongside setting up and tearing down docker testcontainers.

test results: tests prove that memory leaks accumulate and are not freed up by exposing and calling the garbage collector.


```bash
# single memory leak test
npm run test leak1

```

To run all tests:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Running the app.

Default Nest readme content though not required here. To see this is an actual working app, run it and hit localhost:3000.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
