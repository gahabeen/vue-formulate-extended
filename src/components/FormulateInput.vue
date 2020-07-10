
<script>
import textMask from "../features/text-mask";
import numberField from "../features/number-field";

import { Hooks } from "../libs/hooks";
import FormulateInput from "@braid/vue-formulate/src/FormulateInput";
export default {
  extends: FormulateInput,
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

        if ("vfe-number" in this.context.attributes) {
          numberField.hooks.model.map(m => _modelHook.addHook(m));
        }

        if ("vfe-mask" in this.context.attributes) {
          textMask.hooks.model.map(m => _modelHook.addHook(m));
        }

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