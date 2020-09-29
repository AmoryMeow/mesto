const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
  entry: {
    main: './src/pages/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        loader: 'file-loader?name=./images/[name].[ext]'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: [MiniCssExtractPlugin.loader, { 
          loader: 'css-loader',
          options: { importLoaders: 1 }
          },
           'postcss-loader']
      },
    ]
  },
plugins: [
  new HtmlWebpackPlugin({
    template: 'src/index.html' 
  }),
  new MiniCssExtractPlugin()
  ]
};