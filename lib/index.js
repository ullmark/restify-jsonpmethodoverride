
// restify-jsonpoverride
// ---------------------

module.exports = function(options) {

  'use strict';

  var config = {
    callbackParameterName: 'callback',
    methodParameterName: '_method',
    allowedOverrides: ['POST', 'PATCH', 'DELETE', 'PUT']
  };

  // ### isJsonpOverride
  // Checks if the profided request is a jsonp override 
  // by checking if it's a GET request with a *callback* and 
  // *_method* parameter (names can be configured).
  function isJsonpOverride(req) {

  }

  // ### rewriteRequest
  // Changes the requests properties to reflect the override.
  function rewriteRequest(req) {

  }

  // return the handler function
  return function(req, res, next) {

    if (isJsonpOverride(req)) {
      rewriteRequest(req);
    }

    next();

  };
};