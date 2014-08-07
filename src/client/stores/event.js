var request = require("../middlewares/request");

var _events = {};
var _changeListeners  = [];
var _initCalled = false;

var URL = "/events";

var EventStore = {
  init: function () {
    if(_initCalled)
      return;
    _initCalled = true;
    request.get(URL, function (err, res) {
      // @TODO: add error handling
      if(res.body && res.body.event) {
        res.events.forEach(function (event) {
          _events[event.id] = event;
        });

        EventStore.notifyChange();
      }
    });
  },
  addEvent: function (event, done) {
    request.post(URL, event, function (err, res) {
      // @TODO: add error handling
      if(res.body && res.body.event) {
        var event = parseEvent(res.body.event);
        _events[event.id] = event;
        EventStore.notifyChange();
      }
      if (cb){
        cb(res.body);
      }
    });
  },
  updateEvent: function (event, done) {
    request.put(URL + "/" + event.id, event, function (err, res) {
      // @TODO: add error handling
      if(res.body && res.body.event) {
        var event = parseEvent(res.body.event);
        _events[event.id] = event;
        EventStore.notifyChange();
      }
      if (cb){
        cb(res.body);
      }
    });
  },
  removeEvent: function (id, done) {
    throw new Error("Not Implemented");
  },
  getEvents: function () {
    var events = [];
    Object.keys(_events).forEach(function (key) {
      events.push(_events(key));
    });
    return events;
  },
  getEvent: function (id) {
    return _events[id];
  },
  notifyChange: function() {
    _changeListeners.forEach(function (listener) {
      listener();
    });
  },
  addChangeListener: function (listener) {
    _changeListeners.push(listener);
  },
  removeChangeListener: function (listenerr) {
    _changeListeners = _changeListeners.filter(function (l) {
      return listener !== l;
    });
  },
};

function parseEvent (bodyEvent) {
  return {
    id: event.id,
    name: event.name,
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
    tasks: event.tasks,
    wildcardTask: event.wildcardTask,
  };
}

module.exports = EventStore;
