import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import VueFormulate from '@braid/vue-formulate'
import App from './App.vue'
Vue.config.productionTip = false

Vue.use(VueFormulate)
Vue.use(VueCompositionAPI)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
