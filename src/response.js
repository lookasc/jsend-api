const ALLOWED_STATUSES = ['success', 'fail', 'error'];

var Response = function (data) {
  checkInputData(data);
  this.payload = createPayload(data);
  this.statusCode = data.statusCode || getDefaultStatusCode.call(this);
}

Response.prototype.jsend = function (res) {
  fillDataFieldWithNullForSuccessAndFail.call(this);

  return res.status(this.statusCode).json(this.payload);
}

Response.prototype.withData = function (data) {
  this.payload.data = data || null;
  return this;
}

var checkInputData = function (data) {
  if (!data) throw new Error('Input data not found. Fill in your API model.');
  if (!data.status) throw new Error('Status field is required in model.');
  if (!ALLOWED_STATUSES.includes(data.status)) throw new Error('Invalid status.');
  if ((data.status === 'error') && !data.message) throw new Error('Message field is required for error response');
}

var createPayload = function (data) {
  let payload = {};
  payload.status = data.status;
  if (data.message) payload.message = data.message;
  return payload;
}

var fillDataFieldWithNullForSuccessAndFail = function () {
  let status = this.payload.status;
  let hasProperStatus = (status === 'success' || status === 'fail');
  let dataFieldNotExist = !this.payload.data; 
  if ( hasProperStatus && dataFieldNotExist ) this.payload.data = null;
}

var getDefaultStatusCode = function () {
  let status = this.payload.status;
  if (status === 'success') return 200;
  if (status === 'fail') return 400;
  return 500;
}

module.exports = Response;