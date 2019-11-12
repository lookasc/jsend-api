var Response = require('./response');

var ApiModel = function (apiModel) {
  this.inputModel = apiModel;

  this.compile = function () {
    this.RESPONSE = prepareApiObject(this.inputModel);
    return this;
  }
};

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

module.exports = ApiModel;