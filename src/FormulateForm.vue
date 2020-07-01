<template>
  <form :class="classes" @submit.prevent="formSubmitted">
    <FormulateSchema
      v-if="schema"
      :schema="schema"
      :nodeHook="nodeHook"
      :componentHook="componentHook"
      @events="payload => $emit('events', payload)"
    />
    <FormulateErrors v-if="!hasFormErrorObservers" :context="formContext" />
    <slot />
  </form>
</template>

<script>
import FormulateForm from "@braid/vue-formulate/src/FormulateForm";
import { FormulateSchema } from "./FormulateSchema";

export default {
  ...FormulateForm,
  components: {
    ...FormulateForm.components,
    FormulateSchema
  },
  props: {
    ...FormulateForm.props,
    nodeHook: FormulateSchema.props.nodeHook,
    componentHook: FormulateSchema.props.componentHook
  }
};
</script>
