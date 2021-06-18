const utils = require('./utils');

// html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 打包前清除目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 友好提示
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',

  entry: {
    app: utils.resolve('./src/index.js'),
  },

  output: {
    path: utils.resolve('./dist'),
    filename: 'js/[name].[chunkhash:12].js',
  },

  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      // {
      //   test: /\.tsx?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: './img/[name].[ext]',
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: './media/[name].[ext]',
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: './fonts/[name].[ext]',
          },
        },
      },
      {
        test: /\.css?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.styl(us)?$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader',
          // 'postcss-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          // 'postcss-loader'
        ]
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          // 'postcss-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Project',
      template: utils.resolve('./public/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new friendlyErrorsWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:12].css',
    }),
  ],

  devtool: 'inline-source-map',
}