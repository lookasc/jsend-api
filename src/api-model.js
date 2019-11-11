var Response = require('./response');

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

var API = function (apiModel) {
  this.RESPONSE = prepareApiObject(apiModel);
};

module.exports = API;