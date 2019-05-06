const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const targetDir = 'dist';

module.exports = common.map(config => {
  return merge(config, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, targetDir),
      proxy: {
        '/json.worker.js': 'http://localhost:9005/dist/',
        '/editor.worker.js': 'http://localhost:9005/dist/',
        '/typescript.worker.js': 'http://localhost:9005/dist/',
      },
      port: process.env.PORT || 9000,
      hot: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'page-creator-ide',
        excludeChunks: ['index', 'index.js'],
        // Load a custom template (lodash by default)
        template: 'demo/index.html'
      }),
      new webpack.HotModuleReplacementPlugin(), // enable HMR globally
      new webpack.NamedModulesPlugin() // prints more readable module names in the browser console on HMR updates
    ]
  });
});
