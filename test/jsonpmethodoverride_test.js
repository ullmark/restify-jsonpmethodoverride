var mocha                 = require("mocha"),
    restify               = require("restify"),
    expect                = require("chai").expect,
    jsonpMethodOverride   = require("../lib");

describe("jsonpMethodOverride", function() {

  before(function() {
    var _this = this;
    var proxy = function(req, res, next) {
      _this.recievedReq = req;
      res.send("ok");
      next();
    };

    // create a test server
    this.api = restify.createServer();

    this.api.pre(restify.bodyParser());
    this.api.pre(restify.queryParser({ mapParams: false }));
    this.api.pre(jsonpMethodOverride());

    this.api.use(restify.jsonp());
    this.api.post("/test", proxy);
    this.api.put("/test", proxy);
    this.api.del("/test", proxy);
    this.api.patch("/test", proxy);
    this.api.listen(8000);
    this.client = restify.createStringClient({ url: 'http://localhost:8000' });
  });

  beforeEach(function() {
    this.recievedReq = {};
  });

  it("handles POST overrides", function(done) {
    var _this = this;
    this.client.get("/test?_method=POST&callback=fn&something[posted]=55", function(err, req, res, data) {
      if (err) { throw err; }
      var req = _this.recievedReq;
      expect(req.method).to.equal("POST");
      expect(req.params).to.deep.equal({
        something: {
          posted: "55"
        }
      });
      done();
    });
  });

});
