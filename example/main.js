import Vue from 'vue'

import VueFormulate from '@braid/vue-formulate'
// import VueFormulateExtended from '../lib/vue-formulate-extended.umd'
import VueFormulateExtended from '../src'
Vue.config.productionTip = false

Vue.use(VueFormulate, {
  plugins: [
    VueFormulateExtended({
      features: {
        formEvents: true,
        textMask: true,
        enforceNumber: true,
      },
    }),
  ],
})

import '@braid/vue-formulate/themes/snow/snow.scss'

import App from './App.vue'

new Vue({
  render: (h) => h(App),
}).$mount('#app')
