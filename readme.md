# Circle CI & Docker
> Testing Docker container dependencies with Circle CI.


## Overview

This is a sample repo that tests out Circle CI builds when Docker container 
dependencies are requried. This project contains a basic node application that
will attempt to access a RethinkDB server hosted within a Docker container.

### Technology used

The following tech is used in this sample:

- Docker
- RethinkDB
- io.js (node)
- mocha (for testing node)
- co-mocha (async for mocha using generators)


## Circle CI

### Node / Mocha

In order for mocha to output results into a format that Circle CI can understand
you will need to use `mocha-junit-reporter`, on a new project the following will
get you going:

```sh
npm install mocha mocha-junit-reporter --save-dev
```

In addition to using the correct reporter, you will also need to ensure that the
test results are sent to the correct folder (`$CIRCLE_TEST_REPORTS`). See the 
`script/ci-test` for the command that handles this:

```sh
MOCHA_FILE=$CIRCLE_TEST_REPORTS/test-results.xml node --harmony ./node_modules/.bin/mocha --reporter mocha-junit-reporter test/**/*.js
```


## Scripts

The key files used in the build are as follows:

- `circle.yml` - this defines the 
- `script/ci-bootstrap` - this sets up dependencies, including pulling docker containers and starting them
- `script/ci-test` - this kicks off the mocha test suite
