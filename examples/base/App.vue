<template>
  <div style="display: grid; justify-items: center; align-items: center; min-height: 100vh;">
    <FormulateForm :schema="schema" />
  </div>
</template>

<script>
// import { FormulateForm } from "../../lib";
import { FormulateForm } from "../../src";
export default {
  components: {
    FormulateForm
  },
  data: () => ({
    schema: [
      {
        label: "Test",
        type: "text",
        mask: "'####-##'"
      }
    ]
  })
};
</script>