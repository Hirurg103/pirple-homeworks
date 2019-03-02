const routes = require('./routes');
const url = require('url');
const logger = require('./logger');
const utils = require('./utils');

const router = function(req, res) {
  const httpMethod = req.method.toUpperCase();
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  logger.info(`Started ${httpMethod} ${path}`);

  const routePath = routes.resolve(httpMethod, path);
  let params = parsedUrl.query;
  if(routePath) {
    params = utils.merge(params, routePath.params);
  }

  logger.info(`  Params ${JSON.stringify(params)}`);

  //controller(params, req, res);
  res.end('done');
};

module.exports = router;
