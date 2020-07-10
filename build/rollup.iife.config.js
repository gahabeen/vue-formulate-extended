import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs' // Convert CommonJS modules to ES6
import buble from '@rollup/plugin-buble' // Transpile/polyfill with reasonable browser support
import vue from 'rollup-plugin-vue' // Handle .vue SFC files
import internal from 'rollup-plugin-internal'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js', // Path relative to package.json
  output: {
    name: 'VueFormulateExtended',
    format: 'iife',
    globals: {
      '@braid/vue-formulate': 'VueFormulate',
    },
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    internal([]),
    vue({
      compileTemplate: true, // Explicitly convert template to render function
    }),
    buble({
      objectAssign: 'Object.assign',
      transforms: {
        forOf: false,
      },
    }), // Transpile to ES5,
    terser(),
  ],
}
