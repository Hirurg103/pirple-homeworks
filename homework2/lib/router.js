const routes = require('./routes');
const url = require('url');
const logger = require('./logger');
const utils = require('./utils');
const ApplicationController = require('./../app/controllers/application_controller');

const findController = function(routePath) {
  return require(`../app/controllers/${routePath.controller}_controller`);
};

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

  if(routePath) {
    logger.info(`Processing ${routePath.controller}_controller#${routePath.controllerMethod}`);

    const controller = findController(routePath);
    new controller(params, req, res)[routePath.controllerMethod]();

  } else {
    logger.info(`Processing application_controller#notFound`);

    new ApplicationController(params, req, res).notFound();
  }
};

module.exports = router;
