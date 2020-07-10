export default {
  hooks: {
    model: [
      {
        handler(value, { context }) {
          if (context.type === 'number' && typeof value === 'string') {
            return +value
          } else {
            return value
          }
        },
      },
    ],
  },
}
