import IMask from 'imask'
import { watch } from '@vue/composition-api'

export function maskProperty(maskOptions, value) {
  const masked = typeof maskOptions === 'string' ? { mask: maskOptions } : maskOptions
  watch(() => value, masked.resolve)
}
