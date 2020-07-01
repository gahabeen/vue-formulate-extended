import IMask from 'imask'

export function Mask(options, value) {
  const maskOptions = typeof options === 'object' && options.mask ? options : { mask: options }
  const masked = IMask.createMask(maskOptions)
  const resolved = masked.resolve(value)
  return resolved
}
