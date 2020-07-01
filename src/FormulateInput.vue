
<script>
import FormulateInput from "@braid/vue-formulate/src/FormulateInput";
import { Mask } from "./MaskValue";
export default {
  extends: FormulateInput,
  watch: {
    "context.model": {
      handler(model, oldModel) {
        if ((model !== oldModel &&  this.context.attributes.mask)) {
          this.context.model = Mask(
            this.context.attributes.mask,
            this.context.model
          );
        }
      }
    }
  }
};
</script>