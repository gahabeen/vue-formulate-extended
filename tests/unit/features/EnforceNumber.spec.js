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
        enforceNumber: true,
      },
    }),
  ],
})


describe('Feature: Enforce Number', () => {
    it('should enforce a number in a FormulateForm schema with vfe-number', async () => {
    const wrapper = mount({
      template: `<FormulateForm v-model="formData" :schema="schema" />`,
      data: () => ({
        schema: [
          {
            type: 'number',
            name: 'age',
            'vfe-number': true
          },
        ],
        formData: {},
      }),
    })
    const age = wrapper.find('input[type="number"]')
    age.setValue('30')
    await flushPromises()
    expect(wrapper.vm.formData).toEqual({ age: 30 })
  })

  it('should enforce a number in a FormulateForm schema with vfeNumber', async () => {
    const wrapper = mount({
      template: `<FormulateForm v-model="formData" :schema="schema" />`,
      data: () => ({
        schema: [
          {
            type: 'number',
            name: 'age',
            vfeNumber: true
          },
        ],
        formData: {},
      }),
    })
    const age = wrapper.find('input[type="number"]')
    age.setValue('30')
    await flushPromises()
    expect(wrapper.vm.formData).toEqual({ age: 30 })
  })

  it('should enforce a number in a FormulateInput with vfe-number attribute', async () => {
    const wrapper = mount({
      template: `<FormulateInput type="number" name="age" v-model="age" vfe-number />`,
      data: () => ({
        age: 17,
      }),
    })
    const age = wrapper.find('input[type="number"]')
    age.setValue('30')
    await flushPromises()
    expect(wrapper.vm.age).toEqual(30)
  })

  
  it('should enforce a number in a FormulateInput with vfeNumber attribute', async () => {
    const wrapper = mount({
      template: `<FormulateInput type="number" name="age" v-model="age" vfeNumber />`,
      data: () => ({
        age: 17,
      }),
    })
    const age = wrapper.find('input[type="number"]')
    age.setValue('30')
    await flushPromises()
    expect(wrapper.vm.age).toEqual(30)
  })
})
