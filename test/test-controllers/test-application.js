/**
 * Dependencies
 */
var async = require("async");
var _ = require("lodash");
var should = require("should");
var app = require("../../server");
var request = require("supertest").agent(app.listen());
var databaseHelper = require("../middlewares/database");
var authHelper = require("../middlewares/authenticator");
var userHelper = require("../middlewares/user");
var eventHelper = require("../middlewares/event");

// support for es6 generators
var co = require("co");

const URLS = {
  APPLY: "/apply",
  EVENTS: "/events/",
  EVENTS_APPLICATIONS: "/applications",
};

describe("Application", function () {
  before(function (done) {
    co(function *() {
      var a = userHelper.createBaseUser();
      var b = userHelper.createAdminUser();
      yield [a, b];
    })(done);
  });
  describe("Anonymous Calls", function () {
    it("POST /apply/:eventId should return 401", function (done) {
      request.post(URLS.APPLY + "/anyId")
      .expect(401)
      .end(done);
    });
    it("GET /events/:id/applications should return 401");
  });
  describe("User Auth calls", function () {
    before(function (done) {
      async.parallel([
        function (cb) { authHelper.signAgent(request, cb); },
        function (cb) { eventHelper.createEvents(cb); }
      ], done);
    });
    it("POST /apply/:badId should return 500 server error", function (done) {
      var upcoming = eventHelper.getUpcomingEvents();
      var event = upcoming[0];
      var data = {
        availabilities: [
          event.startDate
        ],
      };
      request.post(URLS.APPLY + "/badId")
      .send(data)
      .expect(500)
      .end(done);
    });
    describe("POST /apply/:goodId", function () {
      it("Empty availabilities should return 400 bad request", function (done) {
        var upcoming = eventHelper.getUpcomingEvents();
        var event = upcoming[0];
        var data = {
          preferredTask: event.tasks[0],
          availabilities: [
            // empty
          ],
        };
        request.post(URLS.APPLY + "/" + event._id)
        .send(data)
        .expect(400)
        .end(done);
      });
      it("Past or closed event should return 500");
      it("Invalid availabilities should return 500", function (done) {
        var upcoming = eventHelper.getUpcomingEvents();
        var event = upcoming[0];
        var data = {
          preferredTask: event.tasks[1],
          availabilities: [
            new Date(0) // 1970 timestamp
          ],
        };
        request.post(URLS.APPLY + "/" + event._id)
        .send(data)
        .expect(500)
        .end(done);
      });
      it("Well formed application should return 200", function (done) {
        var upcoming = eventHelper.getUpcomingEvents();
        var event = upcoming[0];
        var data = {
          preferredTask: event.tasks[0],
          availabilities: [
            event.startDate
          ],
        };
        request.post(URLS.APPLY + "/" + event._id)
        .send(data)
        .expect(200)
        .end(done);
      });
    });
    it("GET /events/:id/application should return 403");
  });
  describe("Admin Auth calls", function () {
    it("GET /events/:id/application should return applications and users"/*, function () {

    }*/);
  });
  after(databaseHelper.dropDatabase);
});
