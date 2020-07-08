import { EventBus } from './EventBus'
import { createElement, defineComponent } from '@vue/composition-api'
import FormulateForm from '@braid/vue-formulate/src/FormulateForm'
import FormulateInput from './FormulateInput.vue'

function leaf(item, index, { nodeHook, eventBus, componentHook, h } = {}) {
  if (item && typeof item === 'object' && !Array.isArray(item)) {
    const { children = null, component = FormulateInput, depth = 1, events = [], on = {}, ...attrs } = item
    const type = component === FormulateInput ? attrs.type || 'text' : ''
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
    return nodeHook(Object.assign({ type, key, depth, component, definition: { attrs, on: onExtended }, children: tree(els, { nodeHook, eventBus, componentHook, h }) }))
  }
  return null
}

function tree(schema, { componentHook, nodeHook, eventBus, h } = {}) {
  if (Array.isArray(schema)) {
    return schema.map((el, idx) => {
      const item = leaf(el, idx, { nodeHook, eventBus, componentHook, h })
      return typeof componentHook === 'function' ? componentHook(item) : h(item.component, item.definition, item.children)
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

    return () => createElement('div', {}, tree(props.schema, { nodeHook: props.nodeHook, componentHook: props.componentHook, eventBus, h: createElement }))
  },
})
