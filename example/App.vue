<template>
  <div style="display: flex; justify-items: center; align-items: center; min-height: 100vh;">
    <Base style="width:300px;" />
    <MaskPage style="width:300px;" />
  </div>
</template>

<script>
import Base from "./Base";
import Mask from "./Mask";
export default {
  components: {
    Base,
    MaskPage: Mask
  }
};
</script>