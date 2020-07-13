const users = require('./users/users.service.js');
const link = require('./link/link.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
	app.configure(users);
	app.configure(link);
};
