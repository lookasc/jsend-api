# jsend-api
Model based JSON API module, implementing JSend specification for Express.js

[![NPM][npm-icon]][npm-url]

[![Build Status](https://travis-ci.org/lookasc/jsend-api.svg?branch=master)](https://travis-ci.org/lookasc/jsend-api)
[![Coverage Status](https://coveralls.io/repos/github/lookasc/jsend-api/badge.svg?branch=release2)](https://coveralls.io/github/lookasc/jsend-api?branch=release2)

[npm-icon]: https://nodei.co/npm/jsend-api.svg?downloads=true
[npm-url]: https://www.npmjs.com/package/jsend-api

# Install
```sh 
npm install jsend-api --save 
```

# About

This package provides convenient way to shape, use and maintain JSON API responses from a single file. It's created for Express.js and implements JSend specification.

# Usage

There're two possible ways of how the package may be used:
1. Modeling API responses as an object without compiling it. The package is used as a function.
2. Modeling API responses as an object and compiling it for use with Express.js.

First approach is more IntelliSense friendly.

Both approaches requirement is to have API modeled as a single object:

```js
// Example API model
var model = {
  AUTHORIZATION: {
    UNAUTHORIZED_USER: {
      status: 'error',
      message: 'User not authorized. Access denied.',
      statusCode: 401
    },
    USER_NOT_FOUND: {
      status: 'error',
      message: 'User not found. Access denied.',
      statusCode: 401
    }
  },
  SOME_SERVICE: {
    SERVICE_SUCCESS_ADD: {
      status: 'success',
      message: 'Data added.',
      statusCode: 201
    },
    SERVICE_NOT_FOUND_ERROR: {
      status: 'error',
      message: 'Something went wrong.',
      statusCode: 500
    }
  }
}
```
Each API response in the model should consist of at least required keys (according to [JSend](https://github.com/omniti-labs/jsend) specification)

1. `status` is always required and may be: `success`, `fail`, `error`.
2. `message` is required only for `error` response, but may be supplied for all statuses.
3. `statusCode` is a HTTP status code which will be send by Express.js in response.

## Approach 1 - model based API without compilation

### api-model.js
```js
var model = {
    // the same model as above
}

// exporting raw object
module.exports = model;
```
### app.js
```js
const app = require('express')();
const API = require('jsend-api'); // require package as API and use as a function
const RESPONSE = require('./api-model'); // import model as a RESPONSE

app.get('/', (req, res) => {
  //        API - function
  //   RESPONSE - just your model object
  // jsend(res) - you must pass Express's res object as param
  return API(RESPONSE.SOME_SERVICE.SERVICE_SUCCESS_ADD).jsend(res);
  // above line will be behind the scenes called this way:
  // return res.status(yourModelStatus).json(yourModelPayload);
});

app.listen(3000, () => {
  console.log(`Application started`);
});
```
## Approach 2 - compile based API model

### api-model.js
```js
var API = require('jsend-api'); // import package and use as a class

var model = {
    // the same model as above
}

// this will compile your model and save it in RESPONSE 
// field of object created by 'new APiModel()'
module.exports = new API().compile(model);
```
### app.js
```js
const app = require('express')();
const API = require('./api-model'); // import compiled model as 'API'

app.get('/', (req, res) => {
  //        API - instance of ApiModel class
  //   RESPONSE - field of API class where your model is stored
  // jsend(res) - you must pass Express's res object as param
  return API.RESPONSE.SOME_SERVICE.SERVICE_SUCCESS_ADD.jsend(res);
  // above line will be behind the scenes called this way:
  // return res.status(yourModelStatus).json(yourModelPayload);
});

app.listen(3000, () => {
  console.log(`Application started`);
});
```

## Output

Both aproaches will produce below output and Express.js send HTTP status `201` (as written in the model):
```json
{
  "status": "success",
  "message": "Data added.",
  "data": null
}
```

## Sending `data` with JSON payload

Because of `data` field is always maintained by application and cannot be placed as `const` inside model, package provide additional method `withData()` which you can use for both described approaches.

```js
var data = {
  dummyData: 'qwerty',
  moreDummyData: 'ytrewq'
}
// approach 1
return API(RESPONSE.SOME_SERVICE.SERVICE_SUCCESS_ADD)
	.withData(data)
	.jsend(res);
// approach 2
return API.RESPONSE.SOME_SERVICE.SERVICE_SUCCESS_ADD
	.withData(data)
	.jsend(res);
```

The output will be as follow:
```json
{
  "status": "success",
  "message": "Data added.",
  "data": {
    "dummyData":"qwerty",
    "moreDummyData":"ytrewq"
  }
}
```

## Adding optional fields to JSON payload

It is possible to send more data fields than it's specified by JSend. This option may be set in middleware `API.config()`:

```js
// Approach 1 import:
const API = require('jsend-api');   // <-- just package
// Approach 2 import:
const API = require('./api-model'); // <-- compiled model

app.use(API.config({
  allowOptional: true
}));
```

When `allowOptional` option is set more data may be appended to your model in `optional` object:

```js
var model = {
  AUTHORIZATION: {
    UNAUTHORIZED_USER: {
      status: 'error',
      message: 'User not authorized. Access denied.',
      statusCode: 401,
      optional: {       // <-- must be an object
        optionalData1: 123,
        optionalData2: 'qwerty'
      }
    }
  }
}
```

Output will be:

```json
{
  "status": "success",
  "message": "Data added.",
  "data": {
    "dummyData":"qwerty",
    "moreDummyData":"ytrewq"
  },
  "optionalData1": 123,
  "optionalData2": "qwerty"
}
```

For dynamically created data `withOptional()` function may be used:

```js
var opts = {
  optionalData3: 'option from withOptional() method',
  optionalData4: 'option from withOptional() method'
}
// approach 1
return API(RESPONSE.SOME_SERVICE.SERVICE_SUCCESS_ADD)
  .withData(data)
  .withOptional(opts)
  .jsend(res);
// approach 2
return API.RESPONSE.SOME_SERVICE.SERVICE_SUCCESS_ADD
  .withData(data)
  .withOptional(opts)
  .jsend(res);
```

Output will be:

```json
{
  "status": "success",
  "message": "Data added.",
  "data": {
    "dummyData":"qwerty",
    "moreDummyData":"ytrewq"
  },
  "optionalData1": 123,
	"optionalData2": "qwerty",
  "optionalData3": "option from withOptional() method",
  "optionalData4": "option from withOptional() method"
}
```

# MIT License

Copyright (c) 2019 lookasc

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
