'use strict';

const webpack = require('webpack');
const path = require('path');
const packageData = require('./package.json');

const plugins = [
  new webpack.DefinePlugin({
    __VERSION__: JSON.stringify(packageData.version),
    __NAME__: JSON.stringify(packageData.name)
  })
];

module.exports = {
  context: __dirname + '/src',
  entry: {
    'playkit-flash': 'index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: ['playkit', 'engines', 'flash'],
    libraryTarget: 'umd',
    umdNamedDefine: true,
    devtoolModuleFilenameTemplate: './playkit/engines/flash/[resource-path]'
  },
  devtool: 'source-map',
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /bin/],
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/src'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  externals: {
    '@playkit-js/playkit-js': {
      commonjs: '@playkit-js/playkit-js',
      commonjs2: '@playkit-js/playkit-js',
      amd: 'playkit-js',
      root: ['playkit', 'core']
    }
  }
};
