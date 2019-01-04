const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        home: ['babel-polyfill', './src/js/home.js', './src/js/cart.js'],
        cart: ['babel-polyfill', './src/js/cart.js'],
        product: ['babel-polyfill', './src/js/product.js', './src/js/cart.js']
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
        }),

        new HtmlWebpackPlugin({
            filename: 'signin.html',
            template: './src/signin.html',
            chunks: ['cart']
        }),

        new HtmlWebpackPlugin({
            filename: 'signup.html',
            template: './src/signup.html',
            chunks: ['cart']
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