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

describe('Feature: Text Mask', () => {
  it('should force a text mask in a FormulateForm schema with vfe-mask', async () => {
    const wrapper = mount({
      template: `<FormulateForm v-model="formData" :schema="schema" />`,
      data: () => ({
        schema: [
          {
            name: "phone",
            label: "Phone",
            type: "text",
            'vfe-mask': "+33 \\02 00 00 00 00 00" // simple french number mask
          },
        ],
        formData: {},
      }),
    })
    const phone = wrapper.find('input[type="text"]')
    phone.setValue('12')
    await flushPromises()
    expect(wrapper.vm.formData).toEqual({ phone: "+33 02 12" })
  })

  it('should force a text mask in a FormulateForm schema with vfeMask', async () => {
    const wrapper = mount({
      template: `<FormulateForm v-model="formData" :schema="schema" />`,
      data: () => ({
        schema: [
          {
            name: "phone",
            label: "Phone",
            type: "text",
            vfeMask: "+33 \\02 00 00 00 00 00" // simple french number mask
          },
        ],
        formData: {},
      }),
    })
    const phone = wrapper.find('input[type="text"]')
    phone.setValue('12')
    await flushPromises()
    expect(wrapper.vm.formData).toEqual({ phone: "+33 02 12" })
  })

  it('should enforce a text mask in a FormulateInput with vfe-mask attribute', async () => {
    const wrapper = mount({
      template: `<FormulateInput type="text" name="phone" v-model="phone" vfe-mask="+33 \\02 00 00 00 00 00" />`,
      data: () => ({
        phone: 17,
      }),
    })
    const phone = wrapper.find('input[type="text"]')
    phone.setValue('12')
    await flushPromises()
    expect(wrapper.vm.phone).toEqual("+33 02 12")
  })

  it('should enforce a text mask in a FormulateInput with vfeMask attribute', async () => {
    const wrapper = mount({
      template: `<FormulateInput type="text" name="phone" v-model="phone" vfeMask="+33 \\02 00 00 00 00 00" />`,
      data: () => ({
        phone: 17,
      }),
    })
    const phone = wrapper.find('input[type="text"]')
    phone.setValue('12')
    await flushPromises()
    expect(wrapper.vm.phone).toEqual("+33 02 12")
  })

})
