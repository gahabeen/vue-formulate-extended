<h1 align="center">Vue Formulate - <b>Extended</b> Plugin </h1>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-formulate-extended"><img alt="npm" src="https://img.shields.io/npm/v/vue-formulate-extended"></a>
  <a href="https://github.com/gahabeen/vue-formulate-extended"><img alt="npm" src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
</p>

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
        enforceNumber: false, // by-default
      },
    }),
  ],
})
```

## Added functionalities
1. Fix for FormulateForm v-model (see [https://github.com/wearebraid/vue-formulate/pull/164](https://github.com/wearebraid/vue-formulate/pull/164))
2. Hooks strategy to easily add features (see /features folder for examples)

(Feel free to check out how I extend the Form, Input and Schema components in /components)

## Activable features
1. Events propagation from schema inputs with `events: []` in **FormulateForm** up to the top via `@events`       
  [Check a live example](https://codesandbox.io/s/events-propagation-b2vsf?file=/src/components/Sandbox.vue)  
  [Check the tests](https://github.com/gahabeen/vue-formulate-extended/tree/master/test/unit/features/FormEvents.spec.js)

2. Text mask on a **FormulateInput** with `vfe-mask` attribute (works in a **FormulateForm** schema too)  
  [Check a live example](https://codesandbox.io/s/text-mask-04dh5?file=/src/components/Sandbox.vue)  
  [Check the tests](https://github.com/gahabeen/vue-formulate-extended/tree/master/test/unit/features/TextMask.spec.js)

1. Force number value on a **FormulateInput** number type with `vfe-number` attribute (works in a **FormulateForm** schema too)  
  [Check a live example](https://codesandbox.io/s/enforce-number-0ctzj?file=/src/components/Sandbox.vue)  
  [Check tests](https://github.com/gahabeen/vue-formulate-extended/tree/master/test/unit/features/EnforceNumber.spec.js)

## Q&A / Issues
Feel free to open an issue for any question, request or bug.

## Tests
`yarn test:unit`

## Build
`yarn build`

Note: IIFE bundle is way too big. Need some work.
