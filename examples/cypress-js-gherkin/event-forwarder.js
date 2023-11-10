const EventEmitter = require('events').EventEmitter;

class EventForwarder {
   emitter;
   task;
   on;
  
   constructor() {
    this.emitter = new EventEmitter();
    this.task = {};
    
    this.on = (action, arg) => {
      if (action === 'task') {
        Object.assign(this.task, arg);
      } else {
        this.emitter.on(action, arg);
      }
    };
  }
  
   forward(on) {
    for (const event of this.emitter.eventNames()) {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      on(event, async (...args) => {
        for (const listener of this.emitter.listeners(event)) {
          // eslint-disable-next-line no-await-in-loop
          await listener(...args);
        }
      });
    }
    on('task', this.task);
  }
}

module.exports = EventForwarder;