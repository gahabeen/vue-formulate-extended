export default {
  hooks: {
    model: [
      {
        handler(value, { context }) {
          const hasEnforceNumber = (typeof context.attributes.vfeNumber === 'string' ? true : context.attributes.vfeNumber) || (typeof context.attributes['vfe-number'] === 'string' ? true : context.attributes['vfe-number'])

          if (context.type === 'number' && typeof value === 'string' && hasEnforceNumber) {
            return +value
          } else {
            return value
          }
        },
      },
    ],
  },
}
