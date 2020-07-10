<template>
  <div style="display: flex; justify-items: center; align-items: center; min-height: 100vh;">
    <Test style="width:300px;" />
    <FormSync style="width:300px;" />
    <Base style="width:300px;" />
    <MaskPage style="width:300px;" />
  </div>
</template>

<script>
import Test from "./Test";
import FormSync from "./FormSync";
import Base from "./Base";
import Mask from "./Mask";
export default {
  components: {
    Test,
    FormSync,
    Base,
    MaskPage: Mask
  }
};
</script>