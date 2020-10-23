const EventBus = require('kappa-core-event-bus')

module.exports = class EventBusPersistentNode {
  constructor (name, storage = 'event-bus-persistent') {
    this.bus = new EventBus(name, { storage })
  }
}
