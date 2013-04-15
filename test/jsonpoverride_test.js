var mocha = require('mocha'),
    sinon = require('sinon'),
    jsonpOverride = require('../lib');

describe("restify-jsonpoverride", function() {

  beforeEach(function() {
    this.req = {};
    this.reqMock = sinon.mock();
    this.res = sinon.stub();
    this.next = sinon.spy();
  });

  describe("valid override", function() {

    beforeEach(function() {
      this.req = {};
    });

  });

});