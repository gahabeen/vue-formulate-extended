import FormulateSchema from './FormulateSchema'
import FormulateForm from './FormulateForm.vue'

export { FormulateForm, FormulateSchema }
export function plugin(instance) {
  instance.extend({
    components: {
      FormulateForm,
      FormulateSchema,
    },
  })
}
