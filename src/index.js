import FormulateSchema from './components/FormulateSchema'
import FormulateForm from './components/FormulateForm.vue'
import FormulateInput from './components/FormulateInput.vue'

import formEvents from './features/form-events'
// import textMask from './features/text-mask'
import enforceNumber from './features/enforce-number'

import Formulate from '@braid/vue-formulate/src/Formulate'

export const components = { FormulateForm, FormulateSchema, FormulateInput }
export const features = { formEvents, enforceNumber } // textMask - need to be removed to avoid required dependency

export default function(options = {}) {
  let extended = {
    options: Formulate.merge(
      {
        features: {
          formEvents: true,
          textMask: false,
          enforceNumber: false,
        },
        override: {
          FormulateForm: true,
          FormulateInput: true,
          FormulateSchema: true,
        },
      },
      options
    ),
  }

  return function plugin(instance) {
    if (extended.options.override.FormulateForm) {
      instance.extend({ components: { FormulateForm } })
    }

    if (extended.options.override.FormulateInput) {
      instance.extend({ components: { FormulateInput } })
    }

    if (extended.options.override.FormulateSchema) {
      instance.extend({ components: { FormulateSchema } })
    }

    if (extended.options.features.formEvents) {
      instance.extend(formEvents)
    }

    if (extended.options.features.textMask) {
      // lazy loaded
      import('./features/text-mask').then((textMask) => {
        instance.extend(textMask.default)
      })
    }

    if (extended.options.features.enforceNumber) {
      instance.extend(enforceNumber)
    }
  }
}
