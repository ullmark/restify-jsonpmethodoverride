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
// query parser is needed, for the override and therefor must be configured as 
// a **pre**.
server.pre(restify.queryParser( mapParams: false ));
server.pre(jsonpMethodOverride());
server.use(restify.jsonp());

// this route is executed on
// **POST**: /foo
// **GET**: /foo?_method=POST&callback=something
server.post('/foo', function(req, res, next) {
});

```