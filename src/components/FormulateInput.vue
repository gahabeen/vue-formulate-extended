<template>
  <div
    :class="context.classes.outer"
    :data-classification="classification"
    :data-has-errors="hasErrors"
    :data-is-showing-errors="hasVisibleErrors"
    :data-has-value="hasValue"
    :data-type="type"
    @click="$emit('outer-click')"
  >
    <div :class="context.classes.wrapper" @click="$emit('wrapper-click')">
      <slot
        v-if="context.labelPosition === 'before'"
        name="label"
        v-bind="context"
        @click.prevent="$emit('label-click')"
      >
        <component
          :is="context.slotComponents.label"
          v-if="context.hasLabel"
          v-bind="context.slotProps.label"
          :context="context"
        />
      </slot>
      <slot
        v-if="context.helpPosition === 'before'"
        name="help"
        v-bind="context"
        @click="$emit('help-click')"
      >
        <component
          :is="context.slotComponents.help"
          v-if="context.help"
          v-bind="context.slotProps.help"
          :context="context"
        />
      </slot>
      <slot name="element" v-bind="context" @click="$emit('element-click')">
        <component
          :is="context.component"
          :context="context"
          v-bind="context.slotProps.component"
          v-on="listeners"
        >
          <slot v-bind="context" />
        </component>
      </slot>
      <slot
        v-if="context.labelPosition === 'after'"
        name="label"
        v-bind="context"
        @click.prevent="$emit('label-click')"
      >
        <component
          :is="context.slotComponents.label"
          v-if="context.hasLabel"
          :context="context"
          v-bind="context.slotProps.label"
        />
      </slot>
    </div>
    <slot
      v-if="context.helpPosition === 'after'"
      name="help"
      v-bind="context"
      @click="$emit('help-click')"
    >
      <component
        :is="context.slotComponents.help"
        v-if="context.help"
        :context="context"
        v-bind="context.slotProps.help"
      />
    </slot>
    <slot name="errors" v-bind="context" @click="$emit('errors-click')">
      <component
        :is="context.slotComponents.errors"
        v-if="!context.disableErrors"
        :type="context.slotComponents.errors === 'FormulateErrors' ? 'input' : false"
        :context="context"
        v-bind="context.slotProps.errors"
      />
    </slot>
  </div>
</template>

<script>
import { Hooks } from "../libs/hooks";
import Formulate from "@braid/vue-formulate";
const {
  props,
  created, // replace
  watch,
  computed,
  ...others
} = Formulate.defaults.components.FormulateInput;

export default {
  ...others,
  props: {
    ...props,
    modelHook: {
      type: [Function, Object, Array],
      default: null,
    },
    standalone: {
      type: Boolean,
      default: () => false,
    },
  },

  created() {
    this.applyInitialValue();
    if (
      !this.standalone &&
      this.formulateRegister &&
      typeof this.formulateRegister === "function"
    ) {
      this.formulateRegister(this.nameOrFallback, this);
    }
    this.applyDefaultValue();
    if (!this.disableErrors && typeof this.observeErrors === "function") {
      this.observeErrors({
        callback: this.setErrors,
        type: "input",
        field: this.nameOrFallback,
      });
    }
    this.updateLocalAttributes(this.$attrs);
    this.performValidation();
  },
  computed: {
    ...computed,
    slotProps() {
      const fn = this.$formulate.slotProps.bind(this.$formulate);
      return {
        label: fn(this.type, "label", this.typeProps),
        help: fn(this.type, "help", this.typeProps),
        errors: fn(this.type, "errors", this.typeProps),
        repeatable: fn(this.type, "repeatable", this.typeProps),
        addMore: fn(this.type, "addMore", this.typeProps),
        remove: fn(this.type, "remove", this.typeProps),
        component: fn(this.type, "component", this.typeProps),
      };
    },
  },
  watch: {
    ...watch,
    "context.model": {
      handler(newModel, oldModel) {
        const _modelHook = new Hooks();
        if (Array.isArray(this.modelHook)) {
          this.modelHook.map((m) => _modelHook.addHook(m));
        } else if (typeof this.modelHook === "function") {
          _modelHook.addHook({ handler: this.modelHook });
        } else {
          _modelHook.addHook(this.modelHook);
        }

        const defaultModelHooks =
          this.$formulate.options.hooks && this.$formulate.options.hooks.model
            ? this.$formulate.options.hooks.model
            : [];

        defaultModelHooks.map((h) => _modelHook.addHook(h));

        let updatedModel = newModel;

        if (this.context.classification === "box") {
          if (typeof newModel === "string" && newModel.length === 0) {
            updatedModel = false;
          }
        }

        if (newModel !== oldModel && _modelHook.hooks.length > 0) {
          this.context.model = _modelHook.apply(updatedModel, {
            oldModel: oldModel,
            context: this.context,
          });
        }
      },
    },
  },
};
</script>