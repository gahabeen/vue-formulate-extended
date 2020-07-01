<template>
  <div style="margin: 20px auto;">
    <div>
      <div style="margin-bottom:20px;">Mask</div>
      <FormulateForm :formulateValue="values" @input="v => values = v" :schema="schema" />
      <div style="margin-top: 20px;">{{values}}</div>
    </div>
  </div>
</template>

<script>
import { FormulateForm } from "../src";
const frenchPhoneMask = "+33 \\02 00 00 00 00 00";
const emailMask = /^[a-zA-Z0-9_\-\.]*@?[a-zA-Z0-9_\-\.]*\.?[a-zA-Z]{0,5}$/;
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
        mask: frenchPhoneMask
      },
      {
        name: "email",
        label: "Email",
        type: "text",
        mask: emailMask
      },
      {
        name: "emailOrPhone",
        label: "Email or phone",
        type: "text",
        mask: [
          {
            mask: frenchPhoneMask
          },
          {
            mask: emailMask
          }
        ]
      }
    ]
  })
};
</script>