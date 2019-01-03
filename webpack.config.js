const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        home: ['babel-polyfill', './src/js/home.js'],
        product: ['babel-polyfill', './src/js/product.js']
    },//['babel-polyfill', './src/js/index.js', './src/js/product.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.[chunkhash].js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['home']
        }),

        new HtmlWebpackPlugin({
            filename: 'product.html',
            template: './src/product.html',
            chunks: ['product']
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}