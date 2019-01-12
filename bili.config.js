'use strict';

module.exports = {
  input: 'src/index.js',
  outDir: 'dist',
  // config: '',
  format: ['cjs', 'umd', 'umd-min', 'es'],
  moduleName: 'VueCountUp',
  global: {
    'vue': 'Vue',
    'countup.js': 'CountUp'
  },
  filename: '[name][suffix].js',
  name: 'VueCountUp',
  // inline: false,
  // cwd: '',
  // external: [
  //   'vue',
  //   'countup.js'
  // ],
  banner: false,
  postcss: {
    modules: true
  },
  js: 'babel',
  plugin: ['vue'],
  target: 'browser',
  // jsx: 'react',
  // objectAssign: undefined,
  // exports: 'auto',
  // replace: {},
  // alias: {},
  pretty: true
  // env: {},
  // virtualModules: {},
  // sizeLimit: {},
  // extendOptions: {},
};
