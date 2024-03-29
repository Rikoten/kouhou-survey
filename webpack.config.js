const path = require('path')

module.exports = {
    entry: {
        bundle: './src/app.tsx',
        worker: './src/worker.ts'
    },
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name].js'
    },
    resolve: {
        extensions: [ '.js', '.ts', '.tsx', '.json' ]
    },
    module: {
        rules: [{
            test: /\.(tsx|ts)$/,
            use: 'ts-loader'
        }, {
            test: /\.html$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].html'
                }
            }]
        }, {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    url: false
                }
            }, {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }]
        }, {
            test: /assets\//,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }]
        }]
    }
}
