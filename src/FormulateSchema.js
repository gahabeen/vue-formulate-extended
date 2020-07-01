import { EventBus } from './EventBus'
import { createElement as h, defineComponent } from '@vue/composition-api'
import FormulateForm from '@braid/vue-formulate/src/FormulateForm'

/**
 * Given an object and an index, complete an object for schema-generation.
 * @param {object} item
 * @param {int} index
 */
function leaf(item, index, { nodeHook, eventBus, componentHook } = {}) {
  if (item && typeof item === 'object' && !Array.isArray(item)) {
    const { children = null, component = 'FormulateInput', depth = 1, events = [], on = {}, mask = null, ...attrs } = item
    const type = component === 'FormulateInput' ? attrs.type || 'text' : ''
    const name = attrs.name || type || 'el'
    const key = attrs.id || `${name}-${depth}-${index}`
    const els = Array.isArray(children) ? children.map((child) => Object.assign(child, { depth: depth + 1 })) : children
    const onExtended = {
      ...on,
      ...events.reduce((onEvents, eventName) => {
        onEvents[eventName] = function(element) {
          if (on[eventName]) on[eventName](payload)
          eventBus.emit('events', { name: eventName, node: { name, type, key }, element })
        }
        return onEvents
      }, {}),
    }
    const directives = {}
    if (mask) {
      Object.assign(directives, { vMask: mask })
    }
    return nodeHook(Object.assign({ type, key, depth, component, definition: { attrs, on: onExtended, directives }, children: tree(els, { nodeHook, eventBus, componentHook }) }))
  }
  return null
}

/**
 * Recursive function to create vNodes from a schema.
 * @param {Functon} h createElement
 * @param {Array|string} schema
 */
function tree(schema, { componentHook, nodeHook, eventBus } = {}) {
  if (Array.isArray(schema)) {
    return schema.map((el, idx) => {
      const item = leaf(el, idx, { nodeHook, eventBus, componentHook })
      return componentHook(item)
      // return <component v-is={item.component} v-bind={item.attrs} v-on={item.on} {...directives}></component>
    })
  }
  return schema
}

export const FormulateSchema = defineComponent({
  name: 'FormulateSchema',
  props: {
    schema: FormulateForm.props.schema,
    nodeHook: {
      type: Function,
      default: (node) => node,
    },
    componentHook: {
      type: Function,
      default: (node) => h(node.component, node.definition, node.children),
    },
  },
  setup(props, { emit }) {
    const eventBus = new EventBus()
    eventBus.on('events', (payload) => emit('events', payload))

    return () => h('div', {}, tree(props.schema, { nodeHook: props.nodeHook, componentHook: props.componentHook }))
  },
})
