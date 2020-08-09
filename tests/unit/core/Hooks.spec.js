import VueFormulateExtended from '@/index.js'
import VueFormulate from '@braid/vue-formulate'
import Vue from 'vue'

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
