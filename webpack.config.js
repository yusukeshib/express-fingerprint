var nodeExternals = require('webpack-node-externals')
var path = require('path')

module.exports = {
  entry: {
    server:'./src/index'
  },
  watch: false,
  context: __dirname,
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    pathinfo: false,
    library: 'index',
    libraryTarget: 'umd'
  },
  module:{
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: 'src',
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.node.js', '.js'],
    modulesDirectories: ['node_modules']
  },
  target: 'node',
  externals: [nodeExternals()]
}
