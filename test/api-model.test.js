const chai = require('chai');
const expect = chai.expect;
const ApiModel = require('../src/api-model');
const mock = require('./api-model.mock');
const mockRes = require('./response.mock');
const Response = require('../src/response');

describe('API model class:\n', () => {

  var API;

  beforeEach(() => {
    API = new ApiModel(mock.model).compile();
  })

  it('should create model', () => {
    expect(API).to.exist;
    expect(API).to.be.instanceOf(ApiModel);
  });

  it('should have the same keys', () => {
    let originalKeys = Object.keys(mock.model);
    let newModelKeys = Object.keys(API.RESPONSE);
    expect(newModelKeys).to.include.members(originalKeys);
  });

  it('should have Response members', () => {
    expect(API.RESPONSE.TEST.TEST2).to.be.instanceOf(Response);
  });

  it('should have statusCode in return JSON object', () => {
    let jsonObj = API.RESPONSE.TEST.SUCCESS.jsend(mockRes.RES);
    expect(jsonObj.statusCode).to.exist;
    expect(jsonObj.statusCode).to.be.equal(mock.model.TEST.SUCCESS.statusCode);
  });

  it('should return JSON object for success response', () => {
    let mockData = mock.model.TEST.SUCCESS;
    let dataField = 'data';
    let data = API.RESPONSE.TEST.SUCCESS.withData(dataField).jsend(mockRes.RES).data;
    expect(data).to.include.keys(['status', 'message', 'data']);
    expect(data.status).to.be.equal(mockData.status);
    expect(data.message).to.be.equal(mockData.message);
    expect(data.data).to.be.equal(dataField);
  });

  it('should return JSON object for success response with data=null', () => {
    let data = API.RESPONSE.TEST.SUCCESS.jsend(mockRes.RES).data;
    expect(data).to.include.keys(['status', 'message', 'data']);
    expect(data.data).to.be.null;
  });

  it('should return JSON object for success response without message', () => {
    let data = API.RESPONSE.TEST.SUCCESS_WITHOUT_MESSAGE.jsend(mockRes.RES).data;
    expect(data).to.not.include.keys(['message']);
  });

  it('should return JSON object for fail response', () => {
    let mockData = mock.model.TEST.FAIL;
    let dataField = 'data';
    let data = API.RESPONSE.TEST.FAIL.withData(dataField).jsend(mockRes.RES).data;
    expect(data).to.include.keys(['status', 'message', 'data']);
    expect(data.status).to.be.equal(mockData.status);
    expect(data.message).to.be.equal(mockData.message);
    expect(data.data).to.be.equal(dataField);
  });

  it('should return JSON object for error response', () => {
    let mockData = mock.model.TEST.ERROR;
    let dataField = 'data';
    let data = API.RESPONSE.TEST.ERROR.withData(dataField).jsend(mockRes.RES).data;
    expect(data).to.include.keys(['status', 'message', 'data']);
    expect(data.status).to.be.equal(mockData.status);
    expect(data.message).to.be.equal(mockData.message);
    expect(data.data).to.be.equal(dataField);
  });

});