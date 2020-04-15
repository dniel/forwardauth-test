var path = require('path');
var webpack = require('webpack');
module.exports = {
    mode: "production",
    entry: './src/whoami.test.js',
//    entry: [
//      loginTest:'./src/login.test.js',
//      signup: './src/signup.test.js',
//    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        libraryTarget: "commonjs",
        filename: 'app.bundle.js'
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