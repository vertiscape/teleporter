import path from 'path';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';

const root = process.platform === 'win32' ? path.resolve('/') : '/'
const external = (id) => !id.startsWith('.') && !id.startsWith(root)
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.json']

const getBabelOptions = ({ useESModules }) => ({
  babelrc: false,
  extensions,
  exclude: '**/node_modules/**',
  babelHelpers: 'runtime',
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        loose: true,
        modules: false,
        targets: '> 1%, not dead, not ie 11, not op_mini all',
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [['@babel/transform-runtime', { regenerator: false, useESModules }]],
})

export default [
  {
    input: './package/index.tsx',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    external,
    plugins: [dts()],
  },
  {
    input: './package/index.tsx',
    output: { file: 'dist/index.js', format: 'esm' },
    external,
    plugins: [babel(getBabelOptions({ useESModules: true })), resolve({ extensions })],
  },
  {
    input: './package/index.tsx',
    output: { file: 'dist/index.cjs.js', format: 'cjs' },
    external,
    plugins: [babel(getBabelOptions({ useESModules: false })), resolve({ extensions })],
  },
]
