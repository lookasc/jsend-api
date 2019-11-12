const chai = require('chai');
const expect = chai.expect;
const API = require('../src/api-single');
const mock = require('./api-model.mock');
const mockRes = require('./response.mock');
const Response = require('../src/response');

describe('API (single) class:\n', () => {

  var singleResponseObject = mock.model.AUTHORIZATION.USER_NOT_FOUND;
  var response;

  beforeEach(() => {
    response = API(singleResponseObject);
  })

  it('should create Response instance based on supplied singe response object', () => {
    expect(response).to.exist;
    expect(response).to.be.instanceOf(Response);
  });

  it('should contain all keys from supplied object', () => {
    let responsePayload = response.payload;

    expect(responsePayload.status).to.exist;
    expect(responsePayload.status).to.be.equal(singleResponseObject.status);
    expect(responsePayload.message).to.exist;
    expect(responsePayload.message).to.be.equal(singleResponseObject.message);
    expect(response.statusCode).to.exist;
    expect(response.statusCode).to.be.equal(singleResponseObject.statusCode);
  });

});