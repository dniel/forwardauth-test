var path = require('path');
var webpack = require('webpack');
module.exports = {
    mode: "production",
    entry: {
        whoami: './src/whoami.test.js',
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "commonjs",
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            }
        ]
    },
    stats: {
        colors: true
    },
    target: "web",
    externals: /k6(\/.*)?/,
    devtool: 'source-map'
};