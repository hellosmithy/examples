var path       = require('path');
var webpack    = require('webpack');

var argv = require('yargs').argv;
var app  = argv.app || 'react';
var isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: [
        './apps/' + app + '/main.js'
    ],
    output: {
        path: 'build/',
        filename: argv.w ? 'app.js' : 'router5-' + app + '-example.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin()
    ].concat(!isProd ? [] : [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]),
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'apps')
        }]
    }
};
