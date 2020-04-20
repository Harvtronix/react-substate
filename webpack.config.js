const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    devtool: 'cheap-module-source-map',
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'react-substate.js',
        library: 'reactSubstate',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    externals: {
        immer: {
            commonjs: 'immer',
            commonjs2: 'immer',
            amd: 'immer',
            root: 'immer' // ?
        },
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'react' // ?
        }
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}
