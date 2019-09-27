/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-07 11:14:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-08-16 14:18:22
 */
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const config = webpackMerge(baseConfig, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, '../demo/index.js'),
  ],
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
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
  devServer: {
    //主机域名
    host: '0.0.0.0',
    compress: true,
    port: '3002',
    //服务于webpack生成的静态文件，用dist
    // contentBase: path.join(__dirname, '../dist'),
    //热更新
    hot: true,
    //网页显示报错
    overlay: {
      //只显示错误的信息，warn不显示
      errors: true
    },
    //webpack-dev-server中加上/public路径进行访问 里面的js，css前方加上/public
    publicPath: '/',
    //所有404到这个页面
    historyApiFallback: {
      index: '/public/index.html'
    },
    //服务端压缩是否开启
    compress:true,
    proxy:{
      '/ucf-ref-app-service': {
        target: 'https://wbalone-dev.yyuap.com/#/',
        changeOrigin: true,
        headers: {
            "Referer": "https://wbalone-dev.yyuap.com/#/",
            "Cookie":"_ga=GA1.2.966590867.1561018927; locale=zh_CN; acw_tc=3ccdc16915617098340711654e2afabb0143a7cc463d1f1ed225ba266ba8f0; Hm_lvt_diwork=1561709833; PHPSESSID=b5jsjmbnea0ra77etr2nqkq8r3; at=e5a12bde-f70a-4fd7-bc71-18b163c2759c; yonyou_uid=57c6cc71-40bb-4962-bfce-898334924cc4; yonyou_uname=%E5%BC%A0%E5%B0%8F%E5%8C%97; JSESSIONID=node0ud3bz3xopgm71p1merzsas7dv260.node0; yht_username=ST-588-WOuYBh5RXOROTe13Malf-cas01.example.org__57c6cc71-40bb-4962-bfce-898334924cc4; yht_usertoken=TT4RWbm0Pbv8%2FT1oTVxWRs3lHf2AFRXONhDNb7TFjYhbG%2BdCGiES2t9PWARZ%2BCYeXK%2FZ7P37FOmaunfPAeGUtg%3D%3D; wb_at=LMjruujPHtR4grKQHKHMdnpFZkejbZrmnkdwZlokdknqf; yht_access_token=btt7c624035-a29b-4d1d-9742-d6bba9b09b76; ck_safe_chaoke_csrf_token=8261e20d303267fb9478385d78a08a9e; YKJ_IS_DIWORK=1; YKJ_DIWORK_DATA=%7B%22data%22%3A%7B%22is_diwork%22%3A1%2C%22cur_qzid%22%3A%2218172%22%7D%2C%22key%22%3A%2261f2c2f407f102860822289f6969aee4%22%7D; jwt_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaXdvcmsiLCJzZXNzaW9uIjoie1wiY2xpZW50SXBcIjpcIjEwLjMuNS41MlwiLFwiY3JlYXRlRGF0ZVwiOjE1NjIwNDgyODAsXCJleHRcIjp7XCJhZG1pblwiOmZhbHNlfSxcImp3dEV4cFNlY1wiOjYwLFwiand0VmFsaWREYXRlXCI6MTU2MjMxODg1MixcImxhc3REYXRlXCI6MTU2MjMxODk5MixcImxvY2FsZVwiOlwiemhfQ05cIixcInByb2R1Y3RMaW5lXCI6XCJkaXdvcmtcIixcInNlc3Npb25FeHBNaW5cIjoyMTYwLFwic2Vzc2lvbklkXCI6XCJMTWpydXVqUEh0UjRncktRSEtITWRucEZaa2VqYlpybW5rZHdabG9rZGtucWZcIixcInNvdXJjZUlkXCI6XCJkaXdvcmtcIixcInRlbmFudElkXCI6XCJhN284Mmtld1wiLFwidXNlcklkXCI6XCI1N2M2Y2M3MS00MGJiLTQ5NjItYmZjZS04OTgzMzQ5MjRjYzRcIn0iLCJleHAiOjE1NjIzMTkwNTJ9.7FRJykpRQAAKOeK6dnVDfUzwAq9e5-MLL_k4iLYXZpA; Hm_lpvt_diwork=1562319011"
        },
      },
      // '/uniform':{
      //   target: 'https://am-daily.yyuap.com/#/',
      //   changeOrigin: true,
      //   headers: {
      //       "Referer": "https://am-daily.yyuap.com/#/",
      //       "Cookie":"locale=zh_CN; gr_user_id=e6530e97-e229-480c-aade-19c10f757d55; grwng_uid=779825d2-11ea-484d-8f52-b7b03a68d946; acw_tc=276aedef15635147293386750e728067300f39edbc306a03be49c9f727c198; _yyy_user_id=yuc-kOfb1WIUpyx3XBtG; NTKF_T2D_CLIENTID=guestD6E21CA2-7F8C-4BD3-F559-32431F03136B; PHPSESSID=gs3t8r7ntmsj9417ivrlplmi42; _yyy_appid=THBkyfdlWy4499797622; at=892e5504-b022-4a1f-a3c5-92ff30678dc6; yonyou_uid=0c52ec8b-79a6-4710-821d-dc65cfcb71b6; yonyou_uname=%E5%B2%B3%E6%98%8E; yht_access_token=bttODBYTmdqK3doekpyZmZ3NTVsc0JLMlZNSDVYRU9ULzlIeU13WG0zR3VNYlRaMDhEb2Zxbi8vZldPQ0hsaWQwVGRraGpFVWdJdmd2U1dsYzVvaDI4RFhFckJlQ1ViRFZSTFJyNGFLMWpxbTA9__1565092014425; wb_at=LMjovrpjcCssyGqJc7MclvbatjPxjbZrmnkdwZlokdknqf; ck_safe_chaoke_csrf_token=7117f4d9d7db8104e7c72cb4e829a4e6; YKJ_IS_DIWORK=1; YKJ_DIWORK_DATA=%7B%22data%22%3A%7B%22is_diwork%22%3A1%2C%22cur_qzid%22%3A%2218104%22%7D%2C%22key%22%3A%22df15724c4c05a0ae21a5ab68627bd42a%22%7D; jwt_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NjUxNDU2MjAsInNlc3Npb24iOiJ7XCJjbGllbnRJcFwiOlwiMTAuMy41LjUyXCIsXCJjcmVhdGVEYXRlXCI6MTU2NTA5MjAxNCxcImV4dFwiOntcIm9yZ1N0YXR1c1wiOlwibXVsdGlcIixcImFkbWluXCI6ZmFsc2UsXCJsb2dvXCI6XCJodHRwczovL3U4Yy1hcHB0ZW5hbnQtZGFpbHkueXl1YXAuY29tL2FwcHRlbmFudC9maWxlL2ZkZnNpbWcvZG93bj9pZD1ncm91cDEvTTAwLzAwL0I3L3JCUVNFRjBaYW9tQUlfNllBQUJWMC10S2ZsMDcwODg1MDhcIixcInlodF9hY2Nlc3NfdG9rZW5cIjpcImJ0dE9EQllUbWRxSzNkb2VrcHlabVozTlRWc2MwSkxNbFpOU0RWWVJVOVVMemxJZVUxM1dHMHpSM1ZOWWxSYU1EaEViMlp4Ymk4dlpsZFBRMGhzYVdRd1ZHUnJhR3BGVldkSmRtZDJVMWRzWXpWdmFESTRSRmhGY2tKbFExVmlSRlpTVEZKeU5HRkxNV3B4YlRBOV9fMTU2NTA5MjAxNDQyNVwifSxcImp3dEV4cFNlY1wiOjYwLFwiand0VmFsaWREYXRlXCI6MTU2NTE0NTU1MCxcImxhc3REYXRlXCI6MTU2NTE0NTU2MCxcImxvY2FsZVwiOlwiemhfQ05cIixcInByb2R1Y3RMaW5lXCI6XCJ1OGMzLjBcIixcInNlc3Npb25FeHBNaW5cIjoyMTYwLFwic2Vzc2lvbklkXCI6XCJMTWpvdnJwamNDc3N5R3FKYzdNY2x2YmF0alB4amJacm1ua2R3Wmxva2RrbnFmXCIsXCJzb3VyY2VJZFwiOlwiZGl3b3JrXCIsXCJ0ZW5hbnRJZFwiOlwiZjhpOGswdXRcIixcInVzZXJJZFwiOlwiMGM1MmVjOGItNzlhNi00NzEwLTgyMWQtZGM2NWNmY2I3MWI2XCJ9Iiwic3ViIjoiZGl3b3JrIn0.6H2F5hf_cUQLu2xSkpuDK-i0kv-R-P5QKA2Lo90WvRo; _yyy_bs_d8877eba51bbda56f6fd043feba22bee=N4IgRglgJiBcICkDKB9AsgUwGICECSA7AFoByALAKwBsAjAAxVkDMIANOAIZwgYC2vKAA4BjAM6CMwlABsIogC5twi2DWoUalWg2bsIAczh12AOxU1TAeygYAgvPkAnOKABuHaQFcM3JQA9BDnkAC24AeigIVwBiYUszDggTDEcIqIA6ACZs9N4MeQ4AWigATxMOXghhQtcIDAB3NNd0jjNCgrBRFraO0ULhDkcobvl2jk7CjEiO6Qx+weHW0d7Ck0tC1oheIIh4kbGJ+UtBdOCMA2DR+jpc-KK4hKSUpv2Vh-kMM1fxvvfP0bWGxMWyCUxeSwOfQ6gWS30O4xhcw4wnkUQwL3eiWSjkKYEclnqojmvGsGHSmKeOP0jgwoJxZwu8nSrksnmEZxxsgULwZ+kuhWu4La+Pqpw4ogAErSbI50lyQtKAEoEoWjEUYyzSQoAM2kliCqsKIvS2o8RPSJmE1W1EGkHxxRJRuxM6U8JhsNuSUA1Wo80hNtvt-XiTk1oheNrtKWDZnx0l+Iaxz0izUjQfecb6EA+vAjgejwWg6JTYr62owUzAyIA1ob1SW4lrZMlDUTBuzCklBJ5RvVHBxBBJUuJWvsuz2NtqbX5Cn2B0OwiOXRDx6NRJ4pxA-E0whARlU9ksDyZ5iYAF7BDiWJTBGna3wAXwfQA; _yyy_usercode=0c52ec8b-79a6-4710-821d-dc65cfcb71b6; _yyy_busiid=JS_MeFBI7ZN45610643"
      //   },
      // },
      '/uniform':{
        target: 'https://wbalone-dev.yyuap.com',
        changeOrigin: true,
        //pathRewrite: {// 如果接口本身没有/api需要通过pathRewrite来重写了地址
        // '^\/uniform': ''
        //},
        headers: {
            "Referer": "https://wbalone-dev.yyuap.com",
            "Cookie":"gr_user_id=e6530e97-e229-480c-aade-19c10f757d55; grwng_uid=779825d2-11ea-484d-8f52-b7b03a68d946; NTKF_T2D_CLIENTID=guestD6E21CA2-7F8C-4BD3-F559-32431F03136B; acw_tc=276aedea15654186922026228e16ac20f456018c3f51da4e773945d89af0aa; nTalk_CACHE_DATA={uid:yu_1000_ISME9754_guestD6E21CA2-7F8C-4B,tid:1565779515620794}; _yyy_localip=-1; locale=zh_CN; _yyy_appid=vTVzdcbJMD6525710007; Hm_lvt_diwork=1565612176; PHPSESSID=jal1u3oeocn6l1nbqrm0qgle50; at=888f616d-23df-4af7-a0a7-b550a6a83a68; yonyou_uid=cc5aaab0-31a1-4f15-ad00-fb696ce325f5; yonyou_uname=%E5%BC%A0%E5%B0%8F%E5%8C%97; JSESSIONID=node01a1wv0tq05x0y1q4mx6d9usfjs358.node0; yht_username=ST-113-GwXCtoQq0ofGkdDPpCwG-cas01.example.org__cc5aaab0-31a1-4f15-ad00-fb696ce325f5; yht_usertoken=bmvZkbZ6pxvlnM24XYR4FZAukwMY7cIB9HN%2BJ5A%2FDUuCdvZTtTqVEgi97we6EAu1Zb1aYihu82NrlZehBwTmdQ%3D%3D; yht_access_token=bttVTBRRm9OaHZHVnU3c2ppSkgyUUFhRlJZUUdOb01uNzJEOXFwMmNtYjFzVHVjTkdXREIzelRPdlMxNWswTkVKVnlSdzVpclpQbVludVp6ZjJLR0k5dUpxNmxPZGN5RTBqMW4za2toM1Q1RGs9__1567685422457; wb_at=LMjnnpj9vQ5snJpmne9jc6Io5v9jbZrmnkdwZlokdknqf; Hm_lpvt_diwork=1567751194; ck_safe_chaoke_csrf_token=a0767b36defc2b5841ccd37b718a8f47; YKJ_IS_DIWORK=1; YKJ_DIWORK_DATA=%7B%22data%22%3A%7B%22is_diwork%22%3A1%2C%22cur_qzid%22%3A%2218254%22%7D%2C%22key%22%3A%22b7454f4004f2ebdc08a1494b013536a7%22%7D; jwt_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Njc3NTEyNDMsInNlc3Npb24iOiJ7XCJjbGllbnRJcFwiOlwiMTAuMy41LjUxXCIsXCJjcmVhdGVEYXRlXCI6MTU2NzY4NTQyMixcImV4dFwiOntcIm9yZ1N0YXR1c1wiOlwibXVsdGlcIixcImFkbWluXCI6ZmFsc2UsXCJ5aHRfYWNjZXNzX3Rva2VuXCI6XCJidHRWVEJSUm05T2FIWkhWblUzYzJwcFNrZ3lVVUZoUmxKWlVVZE9iMDF1TnpKRU9YRndNbU50WWpGelZIVmpUa2RYUkVJemVsUlBkbE14Tldzd1RrVktWbmxTZHpWcGNscFFiVmx1ZFZwNlpqSkxSMGs1ZFVweE5teFBaR041UlRCcU1XNHphMnRvTTFRMVJHczlfXzE1Njc2ODU0MjI0NTdcIn0sXCJqd3RFeHBTZWNcIjo2MCxcImp3dFZhbGlkRGF0ZVwiOjE1Njc3NDk3MjgsXCJsYXN0RGF0ZVwiOjE1Njc3NTExODMsXCJsb2NhbGVcIjpcInpoX0NOXCIsXCJwcm9kdWN0TGluZVwiOlwidThjMy4wXCIsXCJzZXNzaW9uRXhwTWluXCI6MjE2MCxcInNlc3Npb25JZFwiOlwiTE1qbm5wajl2UTVzbkpwbW5lOWpjNklvNXY5amJacm1ua2R3Wmxva2RrbnFmXCIsXCJzb3VyY2VJZFwiOlwiZGl3b3JrXCIsXCJ0ZW5hbnRJZFwiOlwidzcxanFvMmFcIixcInVzZXJJZFwiOlwiY2M1YWFhYjAtMzFhMS00ZjE1LWFkMDAtZmI2OTZjZTMyNWY1XCJ9Iiwic3ViIjoiZGl3b3JrIn0.sVV2haEDUb0EaZIr4c-nDDhsnaKj9Pog2MNOlsGr-ig"
            // "Cookie":"gr_user_id=e6530e97-e229-480c-aade-19c10f757d55; grwng_uid=779825d2-11ea-484d-8f52-b7b03a68d946; NTKF_T2D_CLIENTID=guestD6E21CA2-7F8C-4BD3-F559-32431F03136B; acw_tc=276aedea15654186922026228e16ac20f456018c3f51da4e773945d89af0aa; nTalk_CACHE_DATA={uid:yu_1000_ISME9754_guestD6E21CA2-7F8C-4B,tid:1565779515620794}; _yyy_localip=-1; locale=zh_CN; _yyy_appid=vTVzdcbJMD6525710007; at=2db3b544-5b48-47c2-991f-2a35b9b7cff8; yonyou_uid=cc5aaab0-31a1-4f15-ad00-fb696ce325f5; yonyou_uname=%E5%BC%A0%E5%B0%8F%E5%8C%97; JSESSIONID=node016q5j989f1e831ic4gh9u9pfb9562.node0; yht_username=ST-456-W0l4hgcq2HGQwfbhuxQR-cas01.example.org__cc5aaab0-31a1-4f15-ad00-fb696ce325f5; yht_usertoken=53FHg7HW%2F%2FyBazmAm7Tmi7XXfbvEMivnpZrYcLCZTe1eBxk1S74baCoyMNw6QpiUYQaUtr0m%2B93SlGJQXwX0Bg%3D%3D; yht_access_token=bttOEFVeXhVQUpUWnE2SXplem41TUlTMEZsekp4ZVhJRCtKS011dW5oNEtXOVFOY3NwODIzM3JqYXpIRmhkSTBhRFpYTnBJNDJ2ZDRieFF0K3I0OEZtakhFckJlQ1ViRFZSTFJyNGFLMWpxbTA9__1567045815382; wb_at=LMjqrsjPmkqgfbpoA9JveagtwJKjbZrmnkdwZlokdknqf; Hm_lvt_diwork=1565612176; PHPSESSID=jal1u3oeocn6l1nbqrm0qgle50; Hm_lpvt_diwork=1567404879; jwt_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Njc0MDc1MzQsInNlc3Npb24iOiJ7XCJjbGllbnRJcFwiOlwiMTAuMy41LjUyXCIsXCJjcmVhdGVEYXRlXCI6MTU2NzA0NTgxNCxcImV4dFwiOntcIm9yZ1N0YXR1c1wiOlwibXVsdGlcIixcImFkbWluXCI6ZmFsc2UsXCJ5aHRfYWNjZXNzX3Rva2VuXCI6XCJidHRPRUZWZVhoVlFVcFVXbkUyU1hwbGVtNDFUVWxUTUVac2VrcDRaVmhKUkN0S1MwMTFkVzVvTkV0WE9WRk9ZM053T0RJek0zSnFZWHBJUm1oa1NUQmhSRnBZVG5CSk5ESjJaRFJpZUZGMEszSTBPRVp0YWtoRmNrSmxRMVZpUkZaU1RGSnlOR0ZMTVdweGJUQTlfXzE1NjcwNDU4MTUzODJcIn0sXCJqd3RFeHBTZWNcIjo2MCxcImp3dFZhbGlkRGF0ZVwiOjE1Njc0MDcyNzUsXCJsYXN0RGF0ZVwiOjE1Njc0MDc0NzQsXCJsb2NhbGVcIjpcInpoX0NOXCIsXCJwcm9kdWN0TGluZVwiOlwidThjMy4wXCIsXCJzZXNzaW9uRXhwTWluXCI6MjE2MCxcInNlc3Npb25JZFwiOlwiTE1qcXJzalBta3FnZmJwb0E5SnZlYWd0d0pLamJacm1ua2R3Wmxva2RrbnFmXCIsXCJzb3VyY2VJZFwiOlwiZGl3b3JrXCIsXCJ0ZW5hbnRJZFwiOlwidzcxanFvMmFcIixcInVzZXJJZFwiOlwiY2M1YWFhYjAtMzFhMS00ZjE1LWFkMDAtZmI2OTZjZTMyNWY1XCJ9Iiwic3ViIjoiZGl3b3JrIn0.2aIPV7acqHfOgZG8rVyGezCH9dtETg_hM6v3YPX9pmc"
        },
      },
    }

  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, '../index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      GROBAL_HTTP_CTX_LOCAL:JSON.stringify("/ucf-ref-app-service"),
    }),
    ...(process.env.IN_WSL ? [] : [
      new OpenBrowserPlugin({
        url: `http://127.0.0.1:3002`
      })
    ]),
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = config

