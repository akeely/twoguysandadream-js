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
                test: /\.js$/
            }
        ],

        loaders: [
            {
                include: [
                    path.resolve(__dirname, 'js')
                ],
                loader: 'babel',
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
            'window.jQuery': 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: true,
            children: true,
            minChunks: 3
        })
    ]
};
