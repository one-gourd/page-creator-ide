const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');
const { getExternal } = require('./webpack-helper');

const targetDir = 'public';

module.exports = common.map(config => {
  /* 这份配置是用于引入到浏览器中时候用的
     比如 https://unpkg.com/page-creator-ide@0.1.0/dist/index.umd.js
  */
  return merge(config, {
    entry: './demo/demo.tsx',
    externals: getExternal(['ide-code-editor', 'ss-tree'], true),
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      minimizer: [new TerserPlugin()]
    },
    plugins: [
      new CleanWebpackPlugin(targetDir),
      new HtmlWebpackPlugin({
        title: 'demo 页面',
        excludeChunks: ['index', 'index.js'],
        // Load a custom template (lodash by default)
        template: 'demo/index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new CopyPlugin([{ from: './.cache/works', to: './' }, { from: './.cache/pi', to: 'pi' }])
    ],
    output: {
      filename: 'demo.js',
      path: path.resolve(__dirname, targetDir),
      libraryTarget: 'umd',
      library: 'pageCreatorIDEDemo',
      umdNamedDefine: true
    }
  });
});
