const ALLOWED_STATUSES = ['success', 'fail', 'error'];

const DEFAULT_STATUS_CODE = {
  SUCCESS: 200,
  FAIL: 400,
  ERROR: 500
}

const OPTIONS = {
  ALLOW_OPTIONAL: 'allowOptional',
  ADD_HTTP_CODE_TO_ERROR_RESPONSE: 'addHttpCodeToErrorResponse'
}

var Response = function (data) {
  this.status = getStatus(data);
  setStatusCode.call(this, data);
  this.optional = data.optional || null;
  this.payload = createPayload(data);
}

Response.prototype.withData = function (data) {
  this.payload.data = data || null;
  return this;
}

Response.prototype.jsend = function (res) {
  appendOptionalResponse.call(this, res);
  fillDataFieldWithNullForSuccessAndFail.call(this);
  return res.status(this.statusCode).json(this.payload);
}

var getStatus = function (data) {
  if (!data) throw new Error('Input data not found. Fill in your API model.');
  if (!data.status) throw new Error('Status field is required in model.');
  if (!ALLOWED_STATUSES.includes(data.status)) throw new Error('Invalid status.');
  return data.status;
}

var setStatusCode = function (data) {
  this.statusCode = data.statusCode || getDefaultStatusCode.call(this);
}

var getDefaultStatusCode = function () {
  let status = this.status.toUpperCase();
  return DEFAULT_STATUS_CODE[status];
}

var createPayload = function (data) {
  switch (data.status) {
    case 'success':
      return getSuccessPayload(data);
    case 'fail':
      return getFailPayload(data);
    case 'error':
      return getErrorPayload(data);
  }
}

var getSuccessPayload = function (data) {
  let payload = {};
  payload.status = data.status;
  if (data.message) payload.message = data.message;
  return payload;
}

var getFailPayload = function (data) {
  let payload = {};
  payload.status = data.status;
  if (data.message) payload.message = data.message;
  return payload;
}

var getErrorPayload = function (data) {
  let payload = {};
  payload.status = data.status;
  if (!data.message) throw new Error('Message field is required for error response');
  payload.message = data.message;
  return payload;
}

var fillDataFieldWithNullForSuccessAndFail = function () {
  let status = this.payload.status;
  let hasProperStatus = (status === 'success' || status === 'fail');
  let dataFieldNotExist = !this.payload.data; 
  if ( hasProperStatus && dataFieldNotExist ) this.payload.data = null;
}

var appendOptionalResponse = function (res) {
  let shouldAppendOptional = getOption(res, OPTIONS.ALLOW_OPTIONAL);
  if (shouldAppendOptional) {
    this.payload = {
      ...this.payload,
      ...this.optional
    }
  }
}

var getOption = function (res, optionName) {
  let optionExist = res.locals && res.locals.jsend && res.locals.jsend[optionName];
  if (optionExist) return res.locals.jsend[optionName];
}

module.exports = Response;