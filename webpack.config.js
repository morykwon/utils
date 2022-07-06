const path = require('path');

module.exports = {
  target: ['node'],
  mode: 'production',
  devtool: 'source-map',
  entry: path.resolve(__dirname, './src/index.ts'),
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.js'],
        },
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    library: {
      name: '_',
      type: 'umd'
    },
    path: path.resolve(__dirname, './dist'),
    filename: 'utils.min.js',
    clean: true
  },
};
