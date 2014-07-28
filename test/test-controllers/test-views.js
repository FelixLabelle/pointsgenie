/**
 * Dependencies
 */
var should = require("should");
var app = require("../../server");
var request = require("supertest").agent(app.listen());
var databaseHelper = require("../middlewares/database");
var authHelper = require("../middlewares/authenticator");
var userHelper = require("../middlewares/user");

// support for es6 generators
var co = require("co");

describe("Index", function () {
  before(function (done) {
    co(function *() {
      yield userHelper.createBaseUser();
    })(done);
  });
  describe("Anonymous calls", function () {
    it("should return 302 to /login", function (done) {
      request.get("/")
      .expect(302)
      .end(function (err, res) {
        if(err) return done(err);
        res.headers.location.should.equal("/login");
        done();
      });
    });
  });
  describe("Auth calls", function () {
    before(function (done) {
      authHelper.signAgent(request, done);
    });
    it("should render the page", function (done) {
      request.get("/")
      .expect(200)
      .end(done);
    });
  });
  after(databaseHelper.dropDatabase);
});
