restify-jsonpmethodoverride
===========================

What is?
---------------------
Creating an APi and enabling it for javascript browser clients can be a bit of a pain if you want 
to keep your APi clean by working with the HTTP Verbs for CRUD since anything other than **GET** is 
impossible in JSONP.

Usage
---------------------

```javascript
var restify = require('restify'),
    jsonpOverride = require('restify-jsonpoverride');

var server = restify.createServer();
// query parser is needed, and must be loaded before the override
server.use(restify.queryParser());
server.use(jsonpMethodOverride());
server.use(restify.jsonp());

// this route is executed on
// **POST**: /foo
// **GET**: /foo?_method=POST&callback=something
server.post('/foo', function(req, res, next) {
});

```