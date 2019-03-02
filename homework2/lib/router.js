const routes = require('./routes');
const url = require('url');
const logger = require('./logger');

const resolveController = function(httpMethod, path) {
  return routes.resolve(httpMethod, path);
};

const router = function(req, res) {
  const httpMethod = req.method.toUpperCase();
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  logger.info(`Started ${httpMethod} ${path}`);

  const controller = resolveController(httpMethod, path);
  //controller(params, req, res);
  res.end('done');
};

module.exports = router;
