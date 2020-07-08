import Vue from 'vue'
import { ref, watch } from '@vue/composition-api'

function diff(newObj, oldObj) {
  return Object.keys(newObj).reduce((diffObj, key) => {
    if (newObj[key] !== oldObj[key]) diffObj[key] = newObj[key]
    return diffObj
  }, {})
}

function differenceHandler(models, event, { emit } = {}) {
  return (index, key, value) => {
    const difference = { [key]: value }
    const otherModels = Array.from([...models.value]).splice(index, 1)
    const otherModelsMerged = Object.assign(...otherModels)

    // console.log("otherModels", JSON.parse(JSON.stringify(otherModels)));

    if (Object.keys(difference).length > 0) {
      const pushed = {
        ...otherModelsMerged,
        ...difference,
      }

      // console.log('pushed', pushed, difference)

      models.value.forEach((_, idx) => {
        if (idx !== index) {
          const updated = {
            ...models.value[idx],
            ...difference,
          }
          // console.log('updated', 'from', index, 'to', idx, difference, updated)
          // Vue.set(models.value, idx, updated);
          models.value.splice(idx, 1, updated)
        }
      })

      emit(event, pushed)
    }
  }
}

// function modelHandler(models, index, event, { emit } = {}) {
//   return (newModel, oldModel) => {
//     const difference = diff(newModel, oldModel)
//     const otherModels = Array.from([...models.value]).splice(index, 1)
//     const otherModelsMerged = Object.assign(...otherModels)

//     if (Object.keys(difference).length > 0) {
//       const pushed = {
//         ...otherModelsMerged,
//         ...difference,
//       }

//       models.value.forEach((_, idx) => {
//         if (idx !== index) {
//           const updated = {
//             ...models.value[idx],
//             ...difference,
//           }
//           console.log('updated', updated, difference)
//           // Vue.set(models.value, idx, updated);
//           models.value.splice(idx, 1, updated)
//         }
//       })

//       emit(event, pushed)
//     }
//   }
// }

export function useModelSync(key, { iterations = 2, emit, event = 'input', props = {} } = {}) {
  const models = ref(Array.from(new Array(iterations)).map(() => Object.assign({}, props[key])))

  /*

  watch(
    () => props[key],
    (newModel) => {
      for (let modelIdx in models.value) {
        for (let prop of Object.keys(newModel)) {
          // console.log(models.value[modelIdx][prop], newModel[prop]);
          if (models.value[modelIdx][prop] !== newModel[prop]) {
            Vue.set(models.value[modelIdx], prop, newModel[prop]);
          }
        }
      }
    },
    {
      deep: true
    }
  );

  */

  // for (let modelIdx in models.value) {
  //   watch(() => models.value[modelIdx], modelHandler(models, modelIdx, event, { emit }), {
  //     deep: true,
  //   })
  // }

  return { models: models.value, onDifference: differenceHandler(models, event, { emit }) }
}
