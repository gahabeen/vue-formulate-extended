import Vue from "vue"
import { ref, reactive, watch } from '@vue/composition-api'

function diff(newObj, oldObj) {
  return Object.keys(newObj).reduce((diffObj, key) => {
    if (newObj[key] !== oldObj[key]) diffObj[key] = newObj[key]
    return diffObj
  }, {})
}

function newKeyValue(newObj, oldObj) {
  return Object.entries(diff(newObj, oldObj))[0] || []
}

function differenceHandler(models, event, { emit } = {}) {
  return (index, key, value) => {
    const difference = { [key]: value }
    const otherModels = Array.from([...models.map(m => m.value)]).splice(index, 1)
    const otherModelsMerged = Object.assign(...otherModels)

    if (Object.keys(difference).length > 0) {
      const pushed = {
        ...otherModelsMerged,
        ...difference,
      }

      models.forEach((_, idx) => {
        if (idx !== index) {
          Vue.set(models[idx].value, key, value)
        }
      })

      emit(event, pushed)
    }
  }
}

export function useModelSync(key, { iterations = 2, emit, event = 'input', props = {} } = {}) {
  const models = Array.from(new Array(iterations)).map(() => ref(Object.assign({}, props[key])))

  // for(let modelIdx in models){
  //   watch(() => models[modelIdx], (newVal, oldVal) => {
  //     const keyVal = newKeyValue(newVal, oldVal)
  //     if(keyVal.length > 0){
  //       console.log("keyVal", keyVal);
  //       differenceHandler(models, event, { emit })(modelIdx, keyVal[0], keyVal[1])
  //     }
  //   })
  // }

  return { models, onDifference: differenceHandler(models, event, { emit }) }
}
