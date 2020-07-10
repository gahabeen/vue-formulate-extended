<template>
  <div class="hello">
    <FormulateForm v-model="values" :schema="schema" @events="onEvents"/>
    <div class="mt-3">{{JSON.stringify(values, null, 2)}}</div>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
export default {
  name: "Sandbox",
  setup() {
    const values = ref({});

    const schema = ref([
      {
        type: "number",
        name: "age",
        label: "Age",
        // "vfe-number": "",
        events: ["input"]
      },
      {
        name: "phone",
        label: "Phone",
        type: "text",
        "vfe-mask": "+33 \\02 00 00 00 00 00"
      }
    ]);

    const onEvents = v => console.log(v);

    return { values, schema, onEvents };
  }
};
</script>