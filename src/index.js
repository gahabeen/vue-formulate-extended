import { FormulateSchema } from './FormulateSchema'
import FormulateForm from './FormulateForm.vue'
import FormulateInput from './FormulateInput.vue'
import { Mask } from './Mask.js'

export { Mask, FormulateForm, FormulateSchema, FormulateInput }
export function plugin(instance) {
  instance.extend({
    components: {
      FormulateForm,
      FormulateSchema,
      FormulateInput,
    },
  })
}
