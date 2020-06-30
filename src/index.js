export * as FormulateSchema from './FormulateSchema'
export * as FormulateForm from './FormulateForm.vue'

export function plugin(instance) {
  instance.extend({
    components: {
      FormulateForm,
      FormulateSchema,
    },
  })
}
