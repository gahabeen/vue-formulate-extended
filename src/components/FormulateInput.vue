
<script>
import { Hooks } from "../libs/hooks";
import Formulate from "@braid/vue-formulate";
export default {
  extends: Formulate.defaults.components.FormulateInput,
  props: {
    modelHook: {
      type: [Function, Object, Array],
      default: null
    }
  },
  watch: {
    "context.model": {
      handler(newModel, oldModel) {
        const _modelHook = new Hooks();
        if (Array.isArray(this.modelHook)) {
          this.modelHook.map(m => _modelHook.addHook(m));
        } else if (typeof this.modelHook === "function") {
          _modelHook.addHook({ handler: this.modelHook });
        } else {
          _modelHook.addHook(this.modelHook);
        }

        const defaultModelHooks =
          this.$formulate.options.hooks && this.$formulate.options.hooks.model
            ? this.$formulate.options.hooks.model
            : [];
        defaultModelHooks.map(h => _modelHook.addHook(h));

        if (newModel !== oldModel) {
          this.context.model = _modelHook.apply(newModel, {
            oldModel,
            context: this.context
          });
        }
      }
    }
  }
};
</script>