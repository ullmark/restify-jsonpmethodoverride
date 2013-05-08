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
    // change the method and set the correct content type.
    req.method = req.query[config.methodParameterName];
    req.headers['content-type'] = 'application/x-www-form-urlencoded';

    // move over the query parameters to the params instead.
    var prevQuery = req.query;
    req.query = req._query = _(prevQuery).pick('callback');
    req.body = req.params = _(prevQuery).omit(config.callbackParameterName, config.methodParameterName);
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
