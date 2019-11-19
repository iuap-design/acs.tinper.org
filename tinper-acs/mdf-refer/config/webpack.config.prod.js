/*
 * @Descripttion: 
 * @version: 
 * @Date: 2019-08-14 12:29:24
 * @LastEditTime: 2019-08-14 19:59:46
 */



const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseConfig = require('./webpack.base')
module.exports = webpackMerge(baseConfig, {
  mode:'production',
  // entry: {
  //     app: path.join(__dirname, '../src/index.js')
  // },
  entry: [
    path.join(__dirname, '../src/index.js'),
    path.join(__dirname, '../src/index.less')
  ],
  externals:['react','react-dom','prop-types','tinper-bee'],
  output: {
      filename: 'index.js',
      path: path.join(__dirname, '../dist'),
      publicPath: '/',
      libraryTarget: 'commonjs2',
      // library:'MdfRefer',
      // libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            // options: {
            //   modules: true,
            //   sourceMap: true,
            //   importLoader: 2
            // }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            // options: {
            //   modules: true,
            //   sourceMap: true,
            //   importLoader: 2
            // }
          },
          "less-loader"
        ]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules\/(?!(@mdf)\/)/,
          /node_modules\/@mdf\/[^/]+\/node_modules\//
        ],
        query: {
          plugins: [
            ["import", { "style": "css", "libraryName": "antd" }]
          ],
          cacheDirectory: true
        }
      },
    ]
  },
  optimization: {
    // runtimeChunk: {
    //   name: 'manifest'
    // },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
    ], // [new UglifyJsPlugin({...})]
    // splitChunks:{
    //   // chunks: 'async',
    //   // minSize: 30000,
    //   // minChunks: 1,
    //   // maxAsyncRequests: 5,
    //   // maxInitialRequests: 3,
    //   // name: false,
    //   cacheGroups: {
    //     // vendor: {
    //     //   name: 'vendor',
    //     //   chunks: 'initial',
    //     //   priority: -10,
    //     //   reuseExistingChunk: false,
    //     //   test: /node_modules\/(.*)\.js/
    //     // },
    //     styles: {
    //       name: 'styles',
    //       test: /\.(sa|sc|c)ss$/,
    //       chunks: 'all',
    //       enforce: true
    //     }
    //   }
    // }
  },
  plugins: [
      new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV':  JSON.stringify('production')
          }
      }),
      // new HtmlWebPackPlugin({
      //   template: "./src/index.html",
      //   filename: "./index.html"
      // }),
      new MiniCssExtractPlugin({
        filename: 'index.css',
      })
  ]
})

