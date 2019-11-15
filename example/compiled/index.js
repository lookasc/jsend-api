const app = require('express')();
const API = require('./model');

var data = {
	a: 123,
	b: 987
};

app.use(API.config({
	allowOptional: true
}));


app.get('/', (req, res) => {
	return API.RESPONSE.SOME_SERVICE.SERVICE_SUCCESS_ADD.withData(data).jsend(res);
});

app.listen(3000, () => {
	console.log('Application started listening');
});