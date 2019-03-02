const utils = require('./../utils');

const buildRoutes = function(callback) {

  const routes = {
    namespace: [],
    paths: []
  };

  routes.collection = function(name) {
    const idPlaceholder = ':id';
    [
      {
        controllerMethod: 'index',
        httpMethod: 'GET',
        fragments: [ name ]
      },
      {
        controllerMethod: 'show',
        httpMethod: 'GET',
        fragments: [ name, idPlaceholder ]
      },
      {
        controllerMethod: 'create',
        httpMethod: 'POST',
        fragments: [ name]
      },
      {
        controllerMethod: 'update',
        httpMethod: 'PUT',
        fragments: [ name, idPlaceholder ]
      },
      {
        controllerMethod: 'delete',
        httpMethod: 'DELETE',
        fragments: [ name, idPlaceholder]
      }
    ].forEach(function(route) {
      routes.paths.push({
        fragments: route.fragments,
        controller: name,
        httpMethod: route.httpMethod,
        controllerMethod: route.controllerMethod
      });
    });
  };

  const placehoders = [':id'];

  const isPlaceholder = function(routePathFragment) {
    return placehoders.indexOf(routePathFragment) > -1;
  };

  const matches = function(path, routePath) {
    if(path.httpMethod != routePath.httpMethod)
      return false;

    if(path.fragments.length != routePath.fragments.length)
      return false;

    return path.fragments.every(function(fragment, idx) {
      const routePathFragment = routePath.fragments[idx];

      return fragment == routePathFragment || isPlaceholder(routePathFragment);
    });
  };

  const getFragments = function(path) {
    return path.replace(/^\/+|\/+$/g, '').split('/');
  };

  const extractParams = function(fragments, routePathFragments) {
    let params = {};

    fragments.forEach(function(fragment, idx) {
      const routePathFragment = routePathFragments[idx];

      if(isPlaceholder(routePathFragment)) {
        const paramName = routePathFragment.replace(/^\:/, '');

        params = utils.merge(params, { [paramName]: fragment });
      }
    });

    return params;
  };

  routes.resolve = function(httpMethod, path) {
    const fragments = getFragments(path);

    let foundRoutePath = routes.paths.find(function(routePath) {
      const currentPath = { httpMethod, fragments };

      return matches(currentPath, routePath);
    });

    if(foundRoutePath) {
      const pathParams = extractParams(fragments, foundRoutePath.fragments);

      foundRoutePath = utils.merge(foundRoutePath, { params: pathParams });
    }

    return foundRoutePath;
  };

  callback(routes);

  return routes;
};

module.exports = buildRoutes;
