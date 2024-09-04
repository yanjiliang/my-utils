import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';

import pkgJson from './package.json' assert { type: 'json' };

// 入口文件
const input = 'src/index.js';

export default [
    {
        // umd
        input,
        plugin: [
            nodeResolve(),
            babel({
                babelHelpers: 'bundled',
                presets: [
                    ['@babel/preset-env', { modules: false }]
                ]
            }),
            terser()

        ],
        output: {
            file: `dist/${pkgJson.name}.min.js`,
            format: 'umd',
            name: 'myUtils',
            sourcemap: true,
            esModule: false,
            exports: 'named',

        }

    },
    {
        // esm & cjs
        input,
        plugin: [
            nodeResolve(),
        ],
        output: [
            {
                dir: 'dist/esm',
                format: 'esm',
                exports: 'named',
            },
            {
                dir: 'dist/cjs',
                format: 'cjs',
                exports: 'named',
            }
        ]

    }
]