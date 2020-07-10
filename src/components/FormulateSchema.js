import { createElement, defineComponent } from '@vue/composition-api'
import FormulateForm from '@braid/vue-formulate/src/FormulateForm'

import { Hooks } from '../libs/hooks'
import hooksProp from '../composables/hooksProp'
import FormulateInput from './FormulateInput.vue'

function leaf(item, index, { hooks, h, state } = {}) {
  if (item && typeof item === 'object' && !Array.isArray(item)) {
    const { children = null, component = FormulateInput, depth = 1, modelHook, ...attrs } = item
    const type = component === FormulateInput ? attrs.type || 'text' : ''
    const name = attrs.name || type || 'el'
    const key = attrs.id || `${name}-${depth}-${index}`
    const els = Array.isArray(children) ? children.map((child) => Object.assign(child, { depth: depth + 1 })) : children
    const _modelHook = new Hooks()
      .setHooks(hooks.model)
      .addHook(modelHook)
      .asSingleHook()

    const node = Object.assign({ type, key, depth, component, definition: { attrs: { ...attrs, modelHook: _modelHook } }, children: tree(els, { hooks, h, state }) })

    return new Hooks()
      .setHooks(hooks.schemaNode)
      .setDefault(() => node)
      .apply(node, { state })
  }
  return null
}

function tree(schema, { hooks, h, state } = {}) {
  if (Array.isArray(schema)) {
    return schema.map((el, idx) => {
      const item = leaf(el, idx, { hooks, h, state })
      return new Hooks()
        .setHooks(hooks.schemaComponent)
        .setDefault(() => h(item.component, item.definition, item.children))
        .apply(item)
    })
  }
  return schema
}

export default defineComponent({
  name: 'FormulateSchema',
  props: {
    schema: FormulateForm.props.schema,
    hooks: hooksProp,
  },
  setup(props, { emit }) {
    const schemaHooks = new Hooks().setHooks(props.hooks.schema)
    const schemaOptionsHooks = new Hooks().setHooks(props.hooks.schemaOptions).setDefault((x) => x)
    return () => {
      return schemaHooks.apply(createElement('div', {}, tree(props.schema, schemaOptionsHooks.apply({ hooks: props.hooks, h: createElement, state: {} }, { emit, props }))), { emit, props })
    }
  },
})
