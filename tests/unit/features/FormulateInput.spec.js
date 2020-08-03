import VueFormulateExtended from '@/index.js'
import VueFormulate from '@braid/vue-formulate'
import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
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

describe('Component: FormulateInput', () => {
  it('should work as normal with v-model', async () => {
    const wrapper = mount({
      template: `<FormulateInput type="text" v-model="formData.name"/>`,
      data: () => ({
        formData: {},
      }),
    })
    const name = wrapper.find('input[type="text"]')
    name.setValue('Gabin')
    await flushPromises()
    expect(wrapper.vm.formData).toEqual({ name: 'Gabin' })
  })
})
