<template>
  <div class="flex flex-col items-center space-y-6">
    <div style="margin-bottom: 4rem;">
      <formulate-form
        ref="form0"
        style="margin-bottom: 2rem;"
        v-model="model"
        :schema="[{ type: 'select', name: 'first', events: ['input'], options}]"
        @events="onEvents"
      />
      <div style="margin-bottom: 2rem;" v-if="$refs['form0']">
        <p>Proxy:</p>
        {{JSON.stringify($refs['form0'].proxy, null, 2)}}
      </div>
    </div>

    <div style="margin-bottom: 4rem;">
      <formulate-form
        ref="form1"
        style="margin-bottom: 2rem;"
        v-model="model"
        :formulateValue="model"
        :schema="[{ type: 'select', name: 'second', options}]"
      />
      <div style="margin-bottom: 2rem;" v-if="$refs['form1']">
        <p>Proxy:</p>
        {{JSON.stringify($refs['form1'].proxy, null, 2)}}
      </div>
    </div>

    <div style="margin-bottom: 4rem;">
      <formulate-form
        ref="form2"
        style="margin-bottom: 2rem;"
        v-model="model"
        :schema="[{ type: 'select', name: 'second', options}]"
      />
      <div style="margin-bottom: 2rem;" v-if="$refs['form2']">
        <p>Proxy:</p>
        {{JSON.stringify($refs['form2'].proxy, null, 2)}}
      </div>
    </div>

    <div style="margin-bottom: 2rem;">
      <p>Model:</p>
      {{JSON.stringify(model, null, 2)}}
    </div>
    <p>Value: {{value}}</p>
  </div>
</template>

<script>
import { reactive, ref, watch } from "@vue/composition-api";
export default {
  layout: "default",
  name: "Test",
  props: ["value"],
  setup(props, { emit, set }) {
    const options = reactive({ 1: "AAAA", 2: "BBBB" });
    const model = ref(Object.assign({}, props.value));
    watch(() => model.value, (newModel, oldModel) => {
      emit("input", newModel)
    })

    const onEvents = (payload) => console.log(payload);

    return { model, options, onEvents };
  }
};
</script>
