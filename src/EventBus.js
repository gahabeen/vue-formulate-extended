export class EventBus {
  constructor() {
    this.store = new Map()
  }

  on(type, handler) {
    const handlers = this.store.get(type)
    const added = handlers && handlers.push(handler)
    if (!added) {
      this.store.set(type, [handler])
    }
  }

  off(type, handler) {
    const handlers = this.store.get(type)
    const index = handlers.indexOf(handler)
    if (handlers && index > -1) {
      handlers.splice(index, 1)
    }
  }

  emit(type, payload) {
    this.store
      .get(type)
      .slice()
      .map((handler) => handler(payload))
  }
}