const ALLOWED_STATUSES = ['success', 'fail', 'error'];
const DEFAULT_STATUS_CODE = {
  SUCCESS: 200,
  FAIL: 400,
  ERROR: 500
}

var Response = function (data) {
  this.status = getStatus(data);
  setStatusCode.call(this, data)
  this.payload = createPayload(data);
}

Response.prototype.jsend = function (res) {
  fillDataFieldWithNullForSuccessAndFail.call(this);
  return res.status(this.statusCode).json(this.payload);
}

Response.prototype.withData = function (data) {
  this.payload.data = data || null;
  return this;
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
  if (data.code) payload.code = data.code;
  return payload;
}

var fillDataFieldWithNullForSuccessAndFail = function () {
  let status = this.payload.status;
  let hasProperStatus = (status === 'success' || status === 'fail');
  let dataFieldNotExist = !this.payload.data; 
  if ( hasProperStatus && dataFieldNotExist ) this.payload.data = null;
}

module.exports = Response;