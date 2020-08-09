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
export default {
  extends: Formulate.defaults.components.FormulateInput,
  props: {
    modelHook: {
      type: [Function, Object, Array],
      default: null,
    },
  },
  watch: {
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

        if (newModel !== oldModel) {
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