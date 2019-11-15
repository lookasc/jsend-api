var model = {
	AUTHORIZATION: {
		UNAUTHORIZED_USER: {
			status: 'error',
			message: 'User not authorized. Access denied.',
			statusCode: 500
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
			message: 'Data added.',
			statusCode: 201
		},
		SERVICE_NOT_FOUND_ERROR: {
			status: 'error',
			message: 'Something went wrong.',
			statusCode: 500
		}
	}
};

module.exports = model;