import VueFormulateExtended from '@/index.js'
import VueFormulate from '@braid/vue-formulate'
import VueCompositionAPI, { ref } from '@vue/composition-api'
import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vue from 'vue'

Vue.use(VueCompositionAPI)

Vue.use(VueFormulate, {
  plugins: [
    VueFormulateExtended({
      features: {
        formEvents: true,
        textMask: false,
        enforceNumber: false,
      },
    }),
  ],
})

describe('Feature: Form Events', () => {
  it('should propagate the events set in a FormulateForm schema', async () => {
    const wrapper = mount({
      template: `<FormulateForm v-model="formData" :schema="schema" @events="onEvents" />`,
      data: () => ({
        schema: [
          {
            name: 'phone',
            label: 'Phone',
            type: 'text',
            events: ['input', 'blur'],
          },
        ],
        formData: {},
        events: [],
      }),
      methods: {
        onEvents(payload) {
          this.events.push(payload)
        },
      },
    })
    const phone = wrapper.find('input[type="text"]')
    phone.setValue('12')
    phone.trigger('blur')
    await flushPromises()
    expect(wrapper.vm.events.length).toEqual(2)
  })

  it('should set events set in "on" property in a FormulateForm schema', async () => {
    const wrapper = mount({
      template: `<FormulateForm v-model="formData" :schema="schema" />`,
      setup() {
        const schema = [
          {
            name: 'phone',
            label: 'Phone',
            type: 'text',
            on: {
              blur(payload) {
                events.value.push(payload)
              },
            },
          },
        ]
        const formData = ref({})
        const events = ref([])
        return { schema, formData, events }
      },
    })
    const phone = wrapper.find('input[type="text"]')
    phone.setValue('12')
    phone.trigger('blur')
    await flushPromises()
    expect(wrapper.vm.events.length).toEqual(1)
  })
})
