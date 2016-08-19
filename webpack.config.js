'use strict';

const path = require('path');
const webpack = require('webpack');

const PORT = 8888;
const CURRENT_TIME = Date.now();

module.exports = {

    devServer: {
        contentBase: './dist',
        inline: true,
        port: PORT,
        stats: {
            assets: false,
            chunks: true,
            chunkModules: false,
            colors: true,
            hash: false,
            timings: true,
            version: false
        }
    },

    devtool: '#cheap-module-eval-source-map',

    entry: './js/app.js',

    eslint: {
        configFile: './.eslintrc',
        emitError: true,
        failOnError: true,
        failOnWarning: false,
        formatter: require('eslint-friendly-formatter')
    },

    module: {
        preLoaders: [
            {
                include: [
                    path.resolve(__dirname, 'js')
                ],
                loader: 'eslint',

                // Exclude tests from eslint
                exclude: /__tests__/,

                test: /\.js$/
            }
        ],

        loaders: [
            {
                loader: 'json',
                test: /\.json$/
            }, {
                include: [
                    path.resolve(__dirname, 'js')
                ],
                loader: 'babel',

                // Exclude tests from babel
                exclude: /__tests__/,
                test: /\.(js|jsx)$/
            }, {
                loader: 'handlebars',
                query: {
                    'extensions': '.template',
                    'helperDirs': [
                        __dirname + '/helpers'
                    ]
                },
                test: /\.template$/
            }, {
                exclude: [
                    path.resolve(__dirname, 'node_modules', 'rapid7-shuflr', 'lib', 'styles')
                ],
                include: [
                    /node_modules/
                ],
                loaders: [
                    'style',
                    'css?sourceMap',
                    'sass?sourceMap'
                ],
                test: /\.scss$/
            }, {
                exclude: [
                    /node_modules/,
                    path.resolve(__dirname, 'scss')
                ],
                loaders: [
                    'style',
                    'css?sourceMap',
                    'postcss',
                    'sass?sourceMap'
                ],
                test: /\.scss$/
            }, {
                include: [
                    path.resolve(__dirname, 'scss'),
                    path.resolve(__dirname, 'node_modules', 'rapid7-shuflr', 'lib', 'styles')
                ],
                loaders: [
                    'style',
                    'css?modules&sourceMap&importLoaders=1',
                    'postcss',
                    'sass?sourceMap'
                ],
                test: /\.scss$/
            }, {
                loaders: [
                    'style',
                    'css?sourceMap'
                ],
                test: /\.css$/
            }, {
                loader: 'url?limit=10000&mimetype=application/font-woff',
                test: /.woff(2)?(?:\?.*|)$/
            }, {
                loader: "url?limit=10000&mimetype=application/octet-stream",
                test: /\.ttf(?:\?.*|)?$/
            }, {
                loader: "file",
                test: /\.eot(?:\?.*|)?$/
            }, {
                loader: "file?name=img/[name].[ext]",
                test: /\.ico(?:\?.*|)?$/
            }, {
                loader: "url?limit=10000&mimetype=image/svg+xml",
                test: /\.svg(?:\?.*|)?$/
            }, {
                loaders: [
                    'file?hash=sha512&digest=hex',
                    'image-webpack'
                ],
                test: /\.(jpe?g|png|gif)(?:\?.*|)$/i
            }
        ]
    },

    output: {
        path: './dist',
        filename: 'tgaad.bundle.js'
    },

    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV'
        ]),
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery',
            jQuery: 'jquery',
            Marionette: 'marionette',
            'window.jQuery': 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: true,
            children: true,
            minChunks: 3
        })
    ]
};