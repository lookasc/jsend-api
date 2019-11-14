const chai = require('chai');
const expect = chai.expect;
const API = require('../index');
const mock = require('./jsend-api.mock');
const mockRes = require('./response.mock');
const Response = require('../src/response');

describe('JSendApi \n', () => {

  describe('Compiled version \n', () => {
    var APIc;
    
    beforeEach(() => {
      APIc = new API().compile(mock.model);
    });
    
    it('should create compiled model', () => {
      expect(APIc).to.exist;
      expect(APIc).to.be.instanceOf(API);
    });

    it('should throw when model not supplied', () => {
      let create = () => new API().compile();
      expect(create).to.throw();
    });
    
    it('should have the same keys as source model', () => {
      let originalKeys = Object.keys(mock.model);
      let newModelKeys = Object.keys(APIc.RESPONSE);
      expect(newModelKeys).to.include.members(originalKeys);
    });
    
    it('should have Response members', () => {
      expect(APIc.RESPONSE.TEST.TEST2).to.be.instanceOf(Response);
    });
    
    it('should have statusCode in return JSON object', () => {
      let jsonObj = APIc.RESPONSE.TEST.SUCCESS.jsend(mockRes.RES);
      expect(jsonObj.statusCode).to.exist;
      expect(jsonObj.statusCode).to.be.equal(mock.model.TEST.SUCCESS.statusCode);
    });
    
    it('should return JSON object for success response', () => {
      let mockData = mock.model.TEST.SUCCESS;
      let dataField = 'data';
      let data = APIc.RESPONSE.TEST.SUCCESS.withData(dataField).jsend(mockRes.RES).data;
      expect(data).to.include.keys(['status', 'message', 'data']);
      expect(data.status).to.be.equal(mockData.status);
      expect(data.message).to.be.equal(mockData.message);
      expect(data.data).to.be.equal(dataField);
    });
    
    it('should return JSON object for success response with data=null', () => {
      let data = APIc.RESPONSE.TEST.SUCCESS.jsend(mockRes.RES).data;
      expect(data).to.include.keys(['status', 'message', 'data']);
      expect(data.data).to.be.null;
    });
    
    it('should return JSON object for success response without message', () => {
      let data = APIc.RESPONSE.TEST.SUCCESS_WITHOUT_MESSAGE.jsend(mockRes.RES).data;
      expect(data).to.not.include.keys(['message']);
    });
    
    it('should return JSON object for fail response', () => {
      let mockData = mock.model.TEST.FAIL;
      let dataField = 'data';
      let data = APIc.RESPONSE.TEST.FAIL.withData(dataField).jsend(mockRes.RES).data;
      expect(data).to.include.keys(['status', 'message', 'data']);
      expect(data.status).to.be.equal(mockData.status);
      expect(data.message).to.be.equal(mockData.message);
      expect(data.data).to.be.equal(dataField);
    });
    
    it('should return JSON object for error response\n', () => {
      let mockData = mock.model.TEST.ERROR;
      let dataField = 'data';
      let data = APIc.RESPONSE.TEST.ERROR.withData(dataField).jsend(mockRes.RES).data;
      expect(data).to.include.keys(['status', 'message', 'data']);
      expect(data.status).to.be.equal(mockData.status);
      expect(data.message).to.be.equal(mockData.message);
      expect(data.data).to.be.equal(dataField);
    });

  });

  describe('As a function \n', () => {

    var singleResponseModel;
    var modelObject = mock.model.TEST.TEST2;
    
    beforeEach(() => {
      singleResponseModel = API(modelObject);
    });

    it('should be a Response instance\n', () => {
      expect(singleResponseModel).to.be.instanceOf(Response);
    });

  });

  describe('Configuration middleware \n', () => {
    
    var config = { someConfig: true };
    var middlewareFunction;

    beforeEach(() => {
      middlewareFunction = API.config(config);
    });

    it('should return middleware function', () => {
      expect(typeof(middlewareFunction)).to.equal('function');
    });

    it('should save config object in res.locals.jsend', () => {
      let res = mockRes.RES;
      expect(res.locals).to.be.empty;
      middlewareFunction(null, res, null);
      expect(res.locals).to.include.keys(['jsend']);
      expect(res.locals.jsend).to.include.keys(['someConfig']);
      expect(res.locals.jsend.someConfig).to.be.true;
    });
    
  });
    
});