const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        host: '127.0.0.1',
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: './',
        port: 3000
    },
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://127.0.0.1:3000',
        path.resolve(__dirname, 'components/app.jsx')
    ],

    output: {
        path: __dirname + '/client/build',
        publicPath: '/build/',
        filename: 'bundle.js',
        pathinfo: true
    },

    postcss: {},

    module: {
        loaders: [
            {
                test: /\.sass$/,
                include: path.resolve(__dirname, './css'),
                loader:
                'style-loader!' +
                'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]--[hash:base64:3]!' +
                'postcss-loader!' +
                'sass-loader?precision=10&indentedSyntax=sass'
            },
            { test: /\.js[x]?$/, include: path.resolve(__dirname, './components'), exclude: /node_modules/, loader: 'babel-loader' ,query:
                {
                    presets: ['es2015','react']
                }}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: './index.html'
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify('dev')
        }),
    new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://127.0.0.1:3000' })
    ]
};