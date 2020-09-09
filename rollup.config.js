import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import dynamicImportVariables from 'rollup-plugin-dynamic-import-variables';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export default {
  input: './src/server.js',
  plugins: [
    resolve({
      module: true,
      preferBuiltins: false,
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
      plugins: [],
    }),
    copy({
      targets: [
        { src: 'src/api', dest: 'dist' },
        { src: 'src/certs', dest: 'dist' },
        { src: 'src/config', dest: 'dist' },
        { src: 'src/public/assets', dest: 'dist/public' }
      ],
      copyOnce: true,
    }),
    dynamicImportVariables(),
    commonjs({
      dynamicRequireTargets: [
        'src/config/routes.js'
      ]
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  ],
  external,
  output: [
    {
      file: './dist/server.js',
      format: 'cjs',
    },
  ],
};