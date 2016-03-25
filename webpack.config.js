var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    all: './source/javascripts/all.jsx'
  },

  resolve: {
    root : path.join(__dirname, 'source/javascripts'),
    extensions: ['', '.js', '.jsx', '.json']
  },

  output: {
    path: path.join(__dirname, '.tmp/dist'),
    filename: 'javascripts/[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.json?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'json-loader'
      }
    ]
  },

  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};