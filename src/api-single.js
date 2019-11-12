var Response = require('./response');

var ApiSingle = function (apiSingleResponse) {
  return new Response(apiSingleResponse);
};

module.exports = ApiSingle;