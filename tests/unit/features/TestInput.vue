<template>
  <div>{{custom}}</div>
</template>

<script>
export default {
  name: "TestInput",
  props: {
    custom: {
      type: String,
      default: "custom",
    },
  },
};
</script>