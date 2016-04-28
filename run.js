#!/usr/bin/env node
var path = require('path');
var commander = require('commander');
commander
  .version('0.0.1')
  .option('-w, --watch', 'starts the webpack dev server')
  .parse(process.argv);

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

function webpackServer(compiler) {
    new WebpackDevServer(compiler, {
        contentBase: path.resolve(__dirname, 'build'),
        publicPath: '/',
        hot: true,
    }).listen(3000, 'localhost', function(err) {
        if (err) {
            return console.warn(err);
        }
    });
}

const compiler = webpack(webpackConfig);
if(commander.watch) {
    webpackServer(compiler);
} else {
    console.log('run the build...');
    compiler.run((err, stats) => {
        if (err) {
            console.error('error: ', err);
        } else {
            console.log('done!!');
        }
    });
}
