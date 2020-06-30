<h2 align="center">Vue Formulate <b>Extended</b> (Plugin)</h2>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-formulate-extended"><img alt="npm" src="https://img.shields.io/npm/v/vue-formulate-extended"></a>
<a href="https://github.com/gahabeen/vue-formulate-extended"><img alt="npm" src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
</p>

<p align="center">
  <span>Compatible with <b>@braid/vue-formulate v2.4.1</b></span>
</p>

```bash
yarn add vue-formulate-extended   @vue/composition-api @braid/vue-formulate@2.4.1
```

```bash
npm i vue-formulate-extended   @vue/composition-api @braid/vue-formulate@2.4.1
```
`@vue/composition-api @braid/vue-formulate@2.4.1` are peer depenencies, dont forget them.

```js
// main.js
import { plugin as VueFormulateExtended } from 'vue-formulate-extended'

Vue.use(VueFormulate, {
  plugins: [ExtendedFormPlugin],
})
```

### Features for FormulateForm (Generated Forms)

1. Events declaration within the `schema` using `on` listeners object

```js
// schema
[{
  component: 'div',
  children: 'Click me',
  on: {
    click(el) {
      console.log(You clicked the following element, el)
    },
  },
}]
```

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
  if(event.name === "click" &&  event.element.classList.includes('form-buttons')){
    console.log(You clicked the following element, event.element)
  }
}
```

```html
<!-- vue - template -->
<FormulateForm :schema="schema" @events="eventsHandler"></FormulateForm>
```

3. Hooks on Node (`nodeHook`) and Component (`componentHook`) creation

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
```
