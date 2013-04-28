var _ = require("underscore");

// restify-jsonmethodpoverride
// ---------------------

module.exports = function(options) {

  'use strict';

  var config = _.extend({
    callbackParameterName: 'callback',
    methodParameterName: '_method',
    allowedOverrides: ['POST', 'PATCH', 'DELETE', 'PUT']
  }, options);

  // ### isJsonpOverride
  // Checks if the profided request is a jsonp override 
  // by checking if it's a GET request with a *callback* and 
  // *_method* parameter (names can be configured).
  function isJsonpOverride(req) {
    var method        = req.method,
        callback      = req.query[config.callbackParameterName],
        targetMethod  = req.query[config.methodParameterName];

    var shouldBeOverridden = 
      method === 'GET' && 
      callback && 
      targetMethod && 
      _(config.allowedOverrides).contains(targetMethod);

    return shouldBeOverridden;
  }

  // ### rewriteRequest
  // Changes the requests properties to reflect the override.
  function rewriteRequest(req) {
    req.method = req.query[config.methodParameterName];
    req.headers['content-type'] = 'application/x-www-form-urlencoded';

  }

  // return the handler function
  return function(req, res, next) {
    // if the request should be rewritten.
    if (isJsonpOverride(req)) {
      rewriteRequest(req);
    }

    return next();

  };
};