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
              onEvents[eventName] = function(element) {
                if (on[eventName]) on[eventName](element)
                state.eventBus.emit('events', { name: eventName, node: { name: node.name, type: node.type, key: node.key }, element })
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
