<template>
  <form :class="classes" @submit.prevent="formSubmitted">
    <FormulateSchema
      v-if="schema"
      :schema="schema"
      :nodeHook="nodeHook"
      :componentHook="componentHook"
      @events="$emit('events', payload)"
    />
    <FormulateErrors v-if="!hasFormErrorObservers" :context="formContext" />
    <slot />
  </form>
</template>

<script>
import { shallowEqualObjects } from "@braid/vue-formulate/src/libs/utils";
import FormulateForm from "@braid/vue-formulate/src/FormulateForm";
import { FormulateSchema } from "./FormulateSchema";

export default {
  extends: FormulateForm,
  components: {
    FormulateSchema
  },
  props: {
    nodeHook: FormulateSchema.props.nodeHook,
    componentHook: {
      type: Function,
      default: null
    }
  },
  // methods: {
  //   onEvents(payload) {
  //     if (payload.name === "fieldChanged") {
  //       this.$emit("fieldChanged", payload);
  //     } else {
  //       this.$emit("events", payload);
  //     }
  //   }
  // },
  watch: {
    formulateValue: {
      handler(values) {
        /**
         * Overrides the default behavior to properly share v-model updates
         */
        if (this.isVmodeled && values && typeof values === "object") {
          const keys = Array.from(
            new Set(Object.keys(values).concat(Object.keys(this.proxy)))
          );
          keys.forEach(field => {
            if (!shallowEqualObjects(values[field], this.proxy[field])) {
              this.setFieldValue(field, values[field]);
              if (
                this.registry.has(field) &&
                !shallowEqualObjects(
                  values[field],
                  this.registry.get(field).proxy
                )
              ) {
                this.registry.get(field).context.model = values[field];
              }
            }
          });
        }
      },
      deep: true
    }
  }
};
</script>
