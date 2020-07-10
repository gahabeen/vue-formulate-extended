import { EventBus } from '../libs/event-bus'

export default {
  hooks: {
    schemaOptions: [
      {
        handler(options, { emit } = {}) {
          options.state = options.state || {}
          options.state.eventBus = new EventBus()
          options.state.eventBus.on('events', (payload) => emit('events', payload))
          return options
        },
      },
    ],
    schemaNode: [
      {
        handler(node, { state } = {}) {
          const { events = [], on = {}, ...attrs } = node.definition.attrs
          node.definition.attrs = attrs
          node.definition.on = {
            ...on,
            ...events.reduce((onEvents, eventName) => {
              onEvents[eventName] = function(payload) {
                if (on[eventName]) on[eventName](payload)
                state.eventBus.emit('events', { eventName, name: node.name, type: node.type, key: node.key, payload })
              }
              return onEvents
            }, {}),
          }

          return node
        },
      },
    ],
  },
}
