import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import VueFormulate from '@braid/vue-formulate'
import VueFormulateExtended from '../src'
Vue.config.productionTip = false

Vue.use(VueCompositionAPI)

Vue.use(VueFormulate, {
  plugins: [
    VueFormulateExtended({
      features: {
        formEvents: true,
        textMask: true,
      },
    }),
  ],
})

import '@braid/vue-formulate/themes/snow/snow.scss'

import App from './App.vue'

new Vue({
  render: (h) => h(App),
}).$mount('#app')
