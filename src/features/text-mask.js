import IMask from 'imask'

export default {
  hooks: {
    model: [
      {
        handler(value, { context }) {
          const hasMask = 'mask' in context.attributes || 'vfe-mask' in context.attributes
          if (context.classification === 'text' && hasMask) {
            const options = context.attributes.mask || context.attributes['vfe-mask']
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
