import VueFormulateExtended from '@/index.js'
import VueFormulate from '@braid/vue-formulate'
import VueCompositionAPI from '@vue/composition-api'
import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vue from 'vue'

Vue.use(VueCompositionAPI)

Vue.use(VueFormulate, {
  plugins: [
    VueFormulateExtended({
      features: {
        formEvents: false,
        textMask: true,
        enforceNumber: false,
      },
    }),
  ],
})

describe('Core: Hooks', () => {
  it('should be true', async () => {
    expect(true).toEqual(true)
  })
})
