<template>
  <div style="margin: 20px auto;">
    <div>
      <div style="margin-bottom:20px;">Basic</div>
      <FormulateForm v-model="values" :schema="schema" @events="eventsHandler" />
      <FormulateInput type="number" v-model="values.age" vfe-number />
      <FormulateInput type="text" v-model="values.phone" vfe-mask="+7 (000) 000-00-00" />
      {{values}}
    </div>
  </div>
</template>

<script>
import { reactive, watch, ref } from "@vue/composition-api";
// import { FormulateForm } from "../../lib";
// import { FormulateForm } from "../src";
export default {
  components: {
    // FormulateForm
  },
  methods: {
    eventsHandler(...args) {
      console.log(...args);
    },
  },
  data: () => ({
    values: {
      age: 7,
    },
    schema: [
      {
        name: "age",
        label: "Age",
        type: "number",
        events: ["outer-click", "label-click"],
      },
      {
        name: "phone",
        label: "Phone",
        type: "text",
        mask: "+7 (000) 000-00-00",
      },
      {
        name: "email",
        label: "Email or phone",
        type: "text",
        mask: [
          {
            mask: "+{7}(000)000-00-00",
          },
          {
            // mask: /^\S*@?\S*$/
            mask: /^[a-zA-Z0-9_\-\.]*@?[a-zA-Z0-9_\-\.]*\.?[a-zA-Z]{0,5}$/,
          },
        ],
      },
    ],
  }),
};
</script>