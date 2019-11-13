var API = require('../../src/api-single');
var RESPONSE = require('./model');

// This simulate 'res' object from express.js
var res = {
  status: function (status) {
    this.statusCode = status;
    return this;
  },
  json: function (json) {
    this.data = json;
    return JSON.stringify(this, undefined, 2);
  }
};

var data = 'Some data to send.';

var x = API(RESPONSE.AUTHORIZATION.UNAUTHORIZED_USER).withData(data).jsend(res);
console.log(x);

//  How to use with Express.js:
//
//  app.get('/', (req, res) => {
//    return API(RESPONSE.AUTHORIZATION.UNAUTHORIZED_USER).withData(data).jsend(res);
//  });
//
//  Behind the scenes it will be called this way:
//
//  app.get('/', (req, res) => {
//    return res.status(yourStatusFromModel).json(yourPayloadFromModel);
//  });