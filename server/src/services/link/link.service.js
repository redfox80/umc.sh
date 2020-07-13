// Initializes the `link` service on path `/link`
const { Link } = require('./link.class');
const createModel = require('../../models/link.model');
const hooks = require('./link.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/link', new Link(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('link');

  service.hooks(hooks);
};
