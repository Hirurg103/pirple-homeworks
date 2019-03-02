const utils = {};

utils.merge = function(obj1, obj2) {
  return Object.assign({}, obj1, obj2);
};

module.exports = utils;
