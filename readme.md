<h1 align="center">Vue Formulate <b>Extended</b> (Plugin)</h1>
<p align="center"><b>Consider this repo as work in progress. Use it at your own risk.</b></p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-formulate-extended"><img alt="npm" src="https://img.shields.io/npm/v/vue-formulate-extended"></a>
<a href="https://github.com/gahabeen/vue-formulate-extended"><img alt="npm" src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
</p>

## Two possible ways to use it

1. Preferred: Using **extended vue-formulate components** (without overriding VueFormulate)

```bash
yarn add vue-formulate-extended @vue/composition-api @braid/vue-formulate
```

```html
<div>
  <FormulateForm :schema="[...]">
</div>
```

```js
// in any vue file
import { FormulateForm } from 'vue-formulate-extended'

export default {
  components: {
    FormulateForm,
  },
}
```

2. Easier: **As a plugin**, overriding some of VueFormulate (2.4.2) components.

- Easy drop in remplacement
- Careful you'll really need the exact 2.4.2 version.

```bash
yarn add vue-formulate-extended @vue/composition-api @braid/vue-formulate@2.4.2 # this specific version is required
```

```js
// main.js
import { plugin as VueFormulateExtended } from 'vue-formulate-extended'

Vue.use(VueFormulate, {
  plugins: [ExtendedFormPlugin],
})
```

## Features for FormulateForm (Generated Forms)

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
