const buildRoutes = require('./routes/builder');

const routes = buildRoutes(function(routes) {

  routes.collection('users');

});

module.exports = routes;
