<template>
  <form :class="classes" @submit.prevent="formSubmitted">
    <FormulateSchema
      v-if="schema"
      :schema="schema"
      :hooks="cleanedHooks"
      :formClass="formClass"
      @events="$emit('events', $event)"
    />
    <FormulateErrors v-if="!hasFormErrorObservers" :context="formContext" />
    <slot />
  </form>
</template>

<script>
import { shallowEqualObjects } from "@braid/vue-formulate/src/libs/utils.js";
import Formulate from "@braid/vue-formulate";

import { Hooks } from "../libs/hooks.js";
import hooksProp from "../composables/hooksProp.js";
import FormulateSchema from "./FormulateSchema.js";

export default {
  extends: Formulate.defaults.components.FormulateForm,
  components: {
    FormulateSchema,
  },
  props: {
    hooks: hooksProp,
    formClass: {
      type: String,
      default: null,
    },
  },
  computed: {
    cleanedHooks() {
      const _hooks = hooksProp.default();

      Object.keys(_hooks).forEach((key) => {
        _hooks[key] = new Hooks().parse(this.hooks[key]).getHooks();
      });

      return Formulate.merge(this.$formulate.options.hooks || {}, _hooks);
    },
  },
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
          keys.forEach((field) => {
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
      deep: true,
    },
  },
};
</script>
