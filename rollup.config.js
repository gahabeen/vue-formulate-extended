import vue from 'rollup-plugin-vue'

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
  },
  plugins: [vue({})],
  external: ['@braid/vue-formulate', '@vue/composition-api'],
}
