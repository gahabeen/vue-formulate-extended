import VueFormulateExtended from '@/index.js'
import VueFormulate from '@braid/vue-formulate'
import Vue from 'vue'


Vue.use(VueFormulate, {
  plugins: [
    VueFormulateExtended({
      features: {
        formEvents: false,
        textMask: false,
        enforceNumber: false,
      },
    }),
  ],
})

describe('Component: FormulateForm', () => {
  it('should have a proper test', async () => {
    expect(true).toEqual(true)
  })
})
