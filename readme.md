<h1 align="center">Vue Formulate <b>Extended</b> (Plugin)</h1>
<h3 align="center">Consider this repo as experimental. Use it at your own risk.</h3>
<p align="center">Breaking changes will happen, make sure to come back here for how-to use it.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-formulate-extended"><img alt="npm" src="https://img.shields.io/npm/v/vue-formulate-extended"></a>
<a href="https://github.com/gahabeen/vue-formulate-extended"><img alt="npm" src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
</p>

## How-to

```bash
yarn add vue-formulate-extended

# don't forget to have the peer dependencies installed
yarn add @vue/composition-api @braid/vue-formulate@2.4.2

# install only if you want to use text-mask feature
yarnd add imask
```

```js
// main.js
import VueFormulateExtended from 'vue-formulate-extended'

Vue.use(VueFormulate, {
  plugins: [
    VueFormulateExtended({
      features: {
        formEvents: true, // by-default
        textMask: false, // by-default
        numberField: false, // by-default
      },
    }),
  ],
})
```

## Things added on top of Vue-Formulate
1. Fix for FormulateForm v-model (see [https://github.com/wearebraid/vue-formulate/pull/164](https://github.com/wearebraid/vue-formulate/pull/164))
2. Hooks strategy to easily add features (see /features folder for examples)

(Feel free to check out how I extend the Form, Input and Schema components in /components)

## Features
1. Events propagation from inputs in **FormulateForm** up to the top via @events ([check live example]())
2. Text mask on an **FormulateInput** (with `vfe-mask` attribute) or set within a schema for **FormulateForm** ([check live example]())
3. Force number value on number inputs (with `vfe-number` attribute) ([check live example]())

## Q&A / Issues
Feel free to open an issue for any question, request or bug.

## Tests
They'll come if this lib materializes into a stable plugin I wanna maintain.

<div id="feature-1"></div>
1. Events declaration within the `schema` using `on` listeners object

```js
// schema
;[
  {
    component: 'div',
    children: 'Click me',
    on: {
      click(el) {
        console.log("You've clicked on the following element", el)
      },
    },
  },
]
```

<div id="feature-2"></div>
2. Events propagation with `@events`

```js
// schema
;[
  {
    component: 'div',
    class: 'form-buttons',
    children: 'Click me',
    events: ['click'],
  },
]
```

```js
// vue - js
const eventsHandler = (event) => {
  if (event.name === 'click' && event.element.classList.includes('form-buttons')) {
    console.log("You've clicked on the following element", event.element)
  }
}
```

```html
<FormulateForm :schema="schema" @events="eventsHandler"> </FormulateForm>

<script>
  import { FormulateForm } from 'vue-formulate-extended'
  export default {
    components: { FormulateForm },
  }
</script>
```

<div id="feature-3"></div>
1. Hooks on Node (`nodeHook`) and Component (`componentHook`) creation

```js
const nodeHook = (el) => {
  if (el.component === 'FormulateInput') {
    // This example replaces the outer-class definition
    el.definition.attrs = { ...el.definition.attrs, 'outer-class': 'px-6 py-3' }
  }
  return el
}
```

```js
// Dumb example which let's you dynamically wrap any div node
const componentHook = (node) => {
  if (node.component === 'div') {
    return h('div', { attrs: { class: 'wrapper' } }, [h('div', 'Before'), h(node.component, node.definition, node.children), h('div', 'After')])
  } else {
    return h(node.component, node.definition, node.children)
  }
}
```

```html
<FormulateForm :formulateValue="value" @input="payload => $emit('input',  payload)" :nodeHook="nodeHook" :componentHook="componentHook" :schema="schema" />

<script>
  import { FormulateForm } from 'vue-formulate-extended'
  export default {
    components: { FormulateForm },
  }
</script>
```

<div id="feature-4"></div>
1. Use a Mask on inputs generated in a form (thanks to `imask`)

```html
<FormulateForm :formulateValue="value" @input="payload => $emit('input',  payload)" :schema="schema" />

<script>
  import { FormulateForm } from 'vue-formulate-extended'
  const frenchPhoneMask = '+33 \\02 00 00 00 00 00'
  const emailMask = /^[a-zA-Z0-9_\-\.]*@?[a-zA-Z0-9_\-\.]*\.?[a-zA-Z]{0,5}$/

  export default {
    components: { FormulateForm },

    data: () => ({
      values: null,
      schema: [
        {
          name: 'phone',
          label: 'Phone',
          type: 'text',
          mask: frenchPhoneMask,
        },
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          mask: emailMask,
        },
        {
          name: 'emailOrPhone',
          label: 'Email or phone',
          type: 'text',
          mask: [
            {
              mask: frenchPhoneMask,
            },
            {
              mask: emailMask,
            },
          ],
        },
      ],
    }),
  }
</script>
```
