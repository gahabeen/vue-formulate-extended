import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import VueFormulate from '@braid/vue-formulate'
Vue.config.productionTip = false

Vue.use(VueFormulate)
Vue.use(VueCompositionAPI)

import '@braid/vue-formulate/themes/snow/snow.scss'

import App from './App.vue'

new Vue({
  render: (h) => h(App),
}).$mount('#app')
