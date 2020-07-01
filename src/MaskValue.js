import IMask from 'imask'
import { watch } from '@vue/composition-api'

export function Mask(options, value) {
  const maskOptions = typeof options === 'object' && options.mask ? options : { mask: options }
  const masked = IMask.createMask(maskOptions)
  const resolved = masked.resolve(value)
  console.log('maskOptions', maskOptions, value, resolved)
  return resolved
}

// export function MaskValue(maskOptions, value, path) {
//   const masked = IMask.createMask(typeof maskOptions === 'string' ? { mask: maskOptions } : maskOptions)
//   watch(
//     () => value.value,
//     (newValue) => {
//       if (newValue[path]) {
//         const resolved = masked.resolve(newValue[path])
//         if (resolved && resolved !== value.value) {
//           value.value[path] = resolved
//         }
//       }
//     }
//   )
// }
