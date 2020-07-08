<template>
  <div>
    <FormSyncComp v-model="value" />
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import FormSyncComp from "./FormSync/FormSyncComp";
export default {
  layout: "default",
  components: { FormSyncComp },
  setup() {
    const value = ref({ first: 1, second: null, otherProp: true });
    return { value };
  }
};
</script>
