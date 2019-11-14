module.exports = {
	RES: {
		status: function (status) {
			this.statusCode = status;
			return this;
		},
		json: function (json) {
			this.data = json;
			return this;
		},
		locals: {}
	},
	DATA: 'mock data',
	EMPTY: undefined,
	LACK_OF_STATUS: {},
	INVALID_STATUS: {
		status: 'qwerty'
	},
	SUCCESS: {
		status: 'success',
		message: 'success message',
		statusCode: 123
	},
	SUCCESS_WITHOUT_STATUSCODE: {
		status: 'success',
		message: 'success message',
	},
	FAIL: {
		status: 'fail',
		message: 'fail message'
	},
	ERROR: {
		status: 'error',
		message: 'error message',
		statusCode: 543
	},
	ERROR_WITHOUT_MESSAGE: {
		status: 'error'
	},
	SUCCESS_WITH_OPTIONALS: {
		status: 'success',
		optional: {
			opt: true
		}
	}
};