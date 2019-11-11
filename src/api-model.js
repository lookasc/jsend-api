var Response = require('./response');

var API = function (apiModel) {
  this.RESPONSE = prepareApiObject(apiModel);
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

module.exports = API;