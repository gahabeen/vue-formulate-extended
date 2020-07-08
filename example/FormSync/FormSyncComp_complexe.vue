<template>
  <div class="flex flex-col items-center space-y-6">
    <div style="margin-bottom: 4rem;">
      <formulate-form
        ref="form0"
        reference="form0"
        style="margin-bottom: 2rem;"
        v-model="models[0].value"
        :formulateValue="models[0].value"
        :schema="[{ type: 'select', name: 'first', options}]"
        @fieldChanged="p => onFieldChanged(0)(p)"
      />

      <div style="margin-bottom: 2rem;">
        <p>Model:</p>
        {{JSON.stringify(models[0], null, 2)}}
      </div>
      <div style="margin-bottom: 2rem;" v-if="$refs['form0']">
        <p>Proxy:</p>
        {{JSON.stringify($refs['form0'].proxy, null, 2)}}
      </div>
    </div>

    <div style="margin-bottom: 4rem;">
      <formulate-form
        ref="form1"
        reference="form1"
        style="margin-bottom: 2rem;"
        v-model="models[1].value"
        :formulateValue="models[1].value"
        :schema="[{ type: 'select', name: 'second', options}]"
        @fieldChanged="p => onFieldChanged(1)(p)"
      />

      <div style="margin-bottom: 2rem;">
        <p>Model:</p>
        {{JSON.stringify(models[1], null, 2)}}
      </div>
      <div style="margin-bottom: 2rem;" v-if="$refs['form1']">
        <p>Proxy:</p>
        {{JSON.stringify($refs['form1'].proxy, null, 2)}}
      </div>
    </div>

    <div style="margin-bottom: 4rem;">
      <formulate-form
        ref="form2"
        reference="form2"
        style="margin-bottom: 2rem;"
        v-model="models[2].value"
        :formulateValue="models[2].value"
        :schema="[{ type: 'select', name: 'second', options}]"
        @fieldChanged="p => onFieldChanged(2)(p)"
      />

      <div style="margin-bottom: 2rem;">
        <p>Model:</p>
        {{JSON.stringify(models[2], null, 2)}}
      </div>
      <div style="margin-bottom: 2rem;" v-if="$refs['form2']">
        <p>Proxy:</p>
        {{JSON.stringify($refs['form2'].proxy, null, 2)}}
      </div>
    </div>

    <p>Value: {{value}}</p>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import { useModelSync } from "./../../src/composables/modelSync.js";
export default {
  layout: "default",
  name: "Test",
  props: ["value"],
  setup(props, { emit, set }) {
    const { models, onDifference } = useModelSync("value", {
      iterations: 3,
      props,
      emit
    });
    const options = reactive({ 1: "AAAA", 2: "BBBB" });
    const onFieldChanged = index => change => {
      console.log("change", index, change.node.name, change.value);
      onDifference(index, change.node.name, change.value);
    };

    return { models, options, onFieldChanged };
  }
};
</script>
