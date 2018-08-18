// the 'path' module is part of node.js;
// when we run webpack, it runs in the node.js environment,
// so we can make use of any piece of node.js technology we like
// inside of our tooling pipeline
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  entry: './src/index.js',
  output: {
    // webpack-dev requires that output.path is an absolute path
    // so that's why we are using the resolve function of the path module.
    // Here, the resolve function saves the bundle.js file into a newly created
    // 'dist' directory that's inserted into current directory (specified by '__dirname')
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/
      },
      {
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader'
        }),
        test: /\.css$/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 }
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
}

module.exports = config
