var Response = require('./response');

var JSendApi = function (singleResponseModel) {

  this.compile = function (apiModel) {
    if (!apiModel) throw new Error('There was not model provided. Compilation not possible');
    this.RESPONSE = prepareApiObject(this.inputModel);
    return this;
  }

  if (singleResponseModel) return new Response(singleResponseModel);
};

Object.defineProperty(JSendApi, 'config', {
  value: function (config) {
    return function (req, res, next) {
      if (config) res.locals.jsend = config;
    }
  }
});

// Rewrite all members from model to API object and populate with Response objects
var prepareApiObject = function (inputModel) {
  let apiObject = {};
  let categories = Object.keys(inputModel);

  categories.forEach(category => {
    apiObject[category] = {};
    let apiMessages = Object.keys(inputModel[category]);
    
    apiMessages.forEach(apiMessage => {
      apiObject[category][apiMessage] = new Response(inputModel[category][apiMessage])
    });
    
  });

  return apiObject;
}

module.exports = JSendApi;