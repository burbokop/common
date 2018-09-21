'use strict';

const util = require('util');
const { EventEmitter } = require('events');

// Forward an event from one EventEmitter to another
//   from - EventEmitter, to listen for event
//   to - EventEmitter, to emit event on
//   event - string, event name
//   newEvent - string (optional), default: `event`, forwarded event name
const forwardEvent = (from, to, event, newEvent = event) => {
  if (event === '*') {
    from.on(event, (eventName, ...args) => {
      to.emit(eventName, ...args);
    });
  } else {
    from.on(event, (...args) => {
      to.emit(newEvent, ...args);
    });
  }
};

// Forward events from one EventEmitter to another
//   from - EventEmitter, to listen for event
//   to - EventEmitter, to emit event on
//   events - array of strings, events names
// Example: common.forwardEvent(from, to);
// Example: common.forwardEvent(from, to, 'eventName');
// Example: common.forwardEvent(from, to, { eventName: 'newEventName' });
// Example: common.forwardEvent(from, to, ['eventName1', 'eventName2']);
const forwardEvents = (from, to, events) => {
  if (!events) {
    forwardEvent(from, to, '*');
    return;
  }
  if (typeof events === 'string') {
    forwardEvent(from, to, events);
    return;
  }
  if (Array.isArray(events)) {
    for (const event of events) {
      forwardEvent(from, to, event);
    }
    return;
  }
  for (const event in events) {
    forwardEvent(from, to, event, events[event]);
  }
};

function EnhancedEmitter() {
  EventEmitter.call(this);
}

util.inherits(EnhancedEmitter, EventEmitter);

const emit = EventEmitter.prototype.emit;

EnhancedEmitter.prototype.emit = function(...args) {
  emit.call(this, '*', ...args);
  emit.call(this, ...args);
};

EnhancedEmitter.prototype.forward = function(to, events) {
  forwardEvents(this, to, events);
};

// Get enhanced EventEmitter with wildcard and forward method
// Returns: EventEmitter, instance
const emitter = () => (new EnhancedEmitter());

module.exports = {
  forwardEvents,
  emitter,
};
