const routes = require('./routes');

const resolveController = function(httpMethod, path) {
  return routes.resolve(httpMethod, path);
};

const router = function(req, res) {
  const controller = resolveController(httpMethod, path);
  controller(params, req, res);
};

module.exports = router;
