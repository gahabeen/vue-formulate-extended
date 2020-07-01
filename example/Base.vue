<template>
  <div style="margin: 20px auto;">
    <div>
      <div style="margin-bottom:20px;">Basic</div>
      <FormulateForm :formulateValue="values" @input="v => values = v" :schema="schema" />
      {{values}}
    </div>
  </div>
</template>

<script>
import { reactive, watch, ref } from "@vue/composition-api";
// import { FormulateForm } from "../../lib";
import { FormulateForm } from "../src";
import { MaskValue } from "../src/MaskValue.js";
export default {
  components: {
    FormulateForm
  },
  data: () => ({
    values: null,
    schema: [
      {
        name: "phone",
        label: "Phone",
        type: "text",
        mask: "+7 (000) 000-00-00"
      },
      {
        name: "email",
        label: "Email or phone",
        type: "text",
        mask: [
          {
            mask: "+{7}(000)000-00-00"
          },
          {
            // mask: /^\S*@?\S*$/
            mask: /^[a-zA-Z0-9_\-\.]*@?[a-zA-Z0-9_\-\.]*\.?[a-zA-Z]{0,5}$/
          }
        ]
      }
    ]
  })
};
</script>