const chai = require('chai');
const expect = chai.expect;
const Response = require('../src/response');
const mock = require('./response.mock');

describe('Response class:\n', () => {

	it('should throw error when no data was suplied', () => {
		let createResponse = () => new Response(mock.EMPTY);
		expect(createResponse).to.throw();
	});

	it('should throw error when status not supplied', () => {
		let createResponse = () => new Response(mock.LACK_OF_STATUS);
		expect(createResponse).to.throw();
	});

	it('should throw error when status has invalid value', () => {
		let createResponse = () => new Response(mock.INVALID_STATUS);
		expect(createResponse).to.throw();
	});

	it('should create instance of Response', () => {
		let res = new Response({
			status: 'success',
		});
		expect(res).to.exist;
		expect(res).to.instanceOf(Response);
	});

	it('should fill data field with null when not supplied in success response', () => {
		let res = new Response(mock.SUCCESS);
		let output = res.jsend(mock.RES);
		expect(output.data).to.include.keys(['status', 'data']);
		expect(output.data.status).to.equal('success');
		expect(output.data.data).to.be.null;
	});

	it('should fill data field with null when not supplied in fail response', () => {
		let res = new Response(mock.FAIL);
		let output = res.jsend(mock.RES);
		expect(output.data).to.include.keys(['status', 'data']);
		expect(output.data.status).to.equal('fail');
		expect(output.data.data).to.be.null;
	});

	it('should  have no message field in fail response', () => {
		let res = new Response(mock.FAIL_WITHOUT_MESSAGE);
		let output = res.jsend(mock.RES);
		expect(output.data).to.not.include.keys(['message']);
	});

	it('should have specified by "withData" data field', () => {
		let res = new Response(mock.SUCCESS);
		let output = res.withData(mock.DATA).jsend(mock.RES);
		expect(output.data).to.include.keys(['status', 'data']);
		expect(output.data.data).to.equal(mock.DATA);
	});

	it('should have data field null if no data supplied in "withData"', () => {
		let res = new Response(mock.SUCCESS);
		let output = res.withData().jsend(mock.RES);
		expect(output.data).to.include.keys(['status', 'data']);
		expect(output.data.data).to.be.null;
	});

	it('should have proper message field', () => {
		let res = new Response(mock.SUCCESS);
		expect(res.payload.message).to.equal(mock.SUCCESS.message);
		let output = res.withData(mock.DATA).jsend(mock.RES);
		expect(output.data.message).to.equal(mock.SUCCESS.message);
	});

	it('should have proper statusCode field', () => {
		let res = new Response(mock.SUCCESS);
		let output = res.withData(mock.DATA).jsend(mock.RES);
		expect(res.statusCode).to.equal(mock.SUCCESS.statusCode);
		expect(output.statusCode).to.equal(mock.SUCCESS.statusCode);
	});

	it('should fill default statusCode when not specified in model', () => {
		let res = new Response(mock.SUCCESS_WITHOUT_STATUSCODE);
		let output = res.withData(mock.DATA).jsend(mock.RES);
		expect(res.statusCode).to.equal(200);
		expect(output.statusCode).to.equal(200);
	});

	it('should throw error when no message is specified for error response', () => {
		let createResponse = () => new Response(mock.ERROR_WITHOUT_MESSAGE);
		expect(createResponse).to.throw();
	});

	it('should has a message field', () => {
		let res = new Response(mock.ERROR);
		expect(res.payload).to.include.keys(['status', 'message']);
		expect(res.payload.message).to.equal(mock.ERROR.message);
	});

	it('should not append optional fields to response \n', () => {
		let res = new Response(mock.SUCCESS_WITH_OPTIONALS).jsend(mock.RES);
		expect(res.data).to.include.keys(['status']);
		expect(res.data).to.not.include.keys(['opt']);
	});

	describe('Optional filelds \n', () => {
		let resObj;
		
		beforeEach(() => {
			resObj = mock.RES;
			resObj = {
				...resObj,
				locals: {
					jsend: {
						allowOptional: true
					}
				}
			};
		});

		it('should append optional fields to response', () => {
			let res = new Response(mock.SUCCESS_WITH_OPTIONALS).jsend(resObj);
			expect(res.data).to.include.keys(['status', 'opt']);
		});
	
		it('should have specified by "withOptional" option field', () => {
			let res = new Response(mock.SUCCESS);
			let opts = { 'optionalField': true };
			let output = res.withOptional(opts).jsend(resObj);
			expect(output.data).to.include.keys(['optionalField']);
			expect(output.data.optionalField).to.exist;
			expect(output.data.optionalField).to.be.true;
		});

	});

	describe('HTTP status code fileld \n', () => {
		let resObj;
		
		beforeEach(() => {
			resObj = mock.RES;
			resObj = {
				...resObj,
				locals: {
					jsend: {
						addHttpCodeToResponse: true
					}
				}
			};
		});

		it('should append HTTP status code to response', () => {
			let res = new Response(mock.SUCCESS).jsend(resObj);
			expect(res.data).to.include.keys(['code']);
			expect(res.data.code).to.equal(resObj.statusCode);
		});

	});

});