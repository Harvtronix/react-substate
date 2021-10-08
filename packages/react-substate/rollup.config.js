import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default {
    input: pkg.source,
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named'
        },
        {
            file: pkg.module,
            format: 'es'
        }
    ],
    external: [
        ...Object.keys(pkg.peerDependencies),
        ...Object.keys(pkg.dependencies)
    ],
    plugins: [
        typescript({
            typescript: require('typescript')
        })
    ]
}
