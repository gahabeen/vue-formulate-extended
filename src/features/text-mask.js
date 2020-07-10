import IMask from 'imask'

export default {
  hooks: {
    model: [
      {
        handler(value, { context }) {
          const hasMask = 'vfe-mask' in context.attributes || 'vfeMask' in context.attributes
          if (context.classification === 'text' && hasMask) {
            const options = context.attributes['vfe-mask'] || context.attributes.vfeMask
            const maskOptions = typeof options === 'object' && options.mask ? options : { mask: options }
            const masked = IMask.createMask(maskOptions)
            const resolved = masked.resolve(value)
            return resolved
          } else {
            return value
          }
        },
      },
    ],
  },
}
