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
  },
  TEST: {
    TEST2: {
      status: 'error',
      message: 'test3',
      statusCode: 999
    },
    SUCCESS: {
      status: 'success',
      message: 'success message',
      statusCode: 299
    },
    SUCCESS_WITHOUT_MESSAGE: {
      status: 'success',
      statusCode: 299
    },
    FAIL: {
      status: 'fail',
      message: 'fail message',
      statusCode: 499
    },
    ERROR: {
      status: 'error',
      message: 'error message',
      statusCode: 599
    }
  }
}

var model2 = {
  FAKE: {
    FAKE2: {
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
}

module.exports = {
  model: model,
  model2: model2,
}
