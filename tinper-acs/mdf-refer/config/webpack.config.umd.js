
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseConfig = require('./webpack.base')
module.exports = webpackMerge(baseConfig, {
  mode:'development',
  entry: {
      app: path.join(__dirname, '../src/index.js')
  },
  output: {
      filename: 'index.js',
      path: path.join(__dirname, '../umd'),
      library:'MdfRefer',
      libraryTarget: 'umd',
  },
  externals: {
    react: {
        root: 'React',
        var: 'React',
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
    },
    'react-dom': {
        root: 'ReactDOM',
        var: 'ReactDOM',
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
    },
    'prop-types': {
        root: 'PropTypes',
        var: 'PropTypes',
        commonjs: 'prop-types',
        commonjs2: 'prop-types',
        amd: 'prop-types',
    },
    'tinper-bee':{
        root: 'TinperBee',
        var: 'TinperBee',
        commonjs: 'tinper-bee',
        commonjs2: 'tinper-bee',
        amd: 'tinper-bee',
    },
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
           
          },
          "less-loader"
        ]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        // exclude: [
        //   /node_modules\/(?!(@mdf)\/)/,
        //   /node_modules\/@mdf\/[^/]+\/node_modules\//
        // ],
        // query: {
        //   plugins: [
        //     ["import", { "style": "css", "libraryName": "antd" }]
        //   ],
        //   cacheDirectory: true
        // }
      },
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
    ], 
    
  },
  plugins: [
      new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV':  JSON.stringify('development')
          }
      }),
     
      new MiniCssExtractPlugin({
        filename: 'index.css',
      })
  ]
})

