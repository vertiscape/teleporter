`
Original file: https://github.com/pmndrs/tunnel-rat/blob/8f5fe4cf49ade6feba6f10a160303dad63c490a9/rollup.config.js
License:
MIT License

Copyright (c) 2022 Poimandres

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`

import path from 'path';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

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
