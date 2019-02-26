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

  const matches = function(path, routePath) {
    if(path.httpMethod != routePath.httpMethod)
      return false;

    if(path.fragments.length != routePath.fragments.length)
      return false;

    return path.fragments.every(function(fragment, idx) {
      const routePathFragment = routePath.fragments[idx];

      return fragment == routePathFragment || placehoders.indexOf(routePathFragment) >= -1;
    });
  };

  routes.resolve = function(httpMethod, path) {
    const fragments = path.split('/');

    const foundPath = routes.paths.find(function(path) {
      const currentPath = { httpMethod, fragments };

      return matches(currentPath, path);
    });
    return foundPath;
  };

  callback(routes);

  return routes;

};

module.exports = buildRoutes;
