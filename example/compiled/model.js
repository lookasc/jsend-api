var API = require('jsend-api');

var model = {
	AUTHORIZATION: {
		UNAUTHORIZED_USER: {
			status: 'error',
			message: 'User not authorized. Access denied.',
			statusCode: 511
		},
		USER_NOT_FOUND: {
			status: 'error',
			message: 'User not found. Access denied.',
			statusCode: 501
		}
	},
	SOME_SERVICE: {
		SERVICE_SUCCESS_ADD: {
			status: 'success',
			statusCode: 201,
			message: 'message',
			optional: {
				optionalField: 'option'
			}
		},
		SERVICE_NOT_FOUND_ERROR: {
			status: 'error',
			message: 'Something went wrong.',
			statusCode: 500
		}
	}
};

module.exports = new API().compile(model);