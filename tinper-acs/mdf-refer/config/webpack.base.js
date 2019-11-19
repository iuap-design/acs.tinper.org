const path = require('path')
const pkg = require('../package.json');
const webpack = require('webpack')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      assets: path.resolve(__dirname, "src/assets/"),
      containers: path.resolve(__dirname, "src/containers/")
    }
  },
  // externals: [
  //   /^src\//
  // ],
  module: {
    rules: [

      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      },
      // {
      //   test: /\.(js|jsx)$/,
      //   loader: 'babel-loader',
      //   include: [
      //     path.resolve('src/'),
      //     path.resolve('demolist'),
      //     path.resolve('node_modules/@mdf'),
      //   ],
      //   query: {
      //     plugins: [
      //       ["import", { "style": "css", "libraryName": "antd" }]
      //     ],
      //     cacheDirectory: true
      //   }
      // },
      {
        test: /\.(map)$/,
        loader: 'ignore-map-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "[name].[hash:8].[ext]"
          }
        }]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[hash:8].[ext]"
          }
        }]
      }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      COMPONENT:JSON.stringify(pkg.name)
    })
  ]
}
