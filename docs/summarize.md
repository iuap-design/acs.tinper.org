## 关于 tinper-acs

`tinper-acs` 是在 `tinper-bee` 基础组件体系之上结合典型业务场景而提炼封装的一系列通用业务类组件，不仅是对体验交互的个性化、场景化的延伸和扩展，也包含与通用支撑服务配套的前端组件化落地，`tinper-acs`中提供的常用、复杂表格、流程化、单据类、国际化、参照类等不同类型的UI组件，在实际产品和项目开发中起到了关键作用，是对技术型组件的一个重要补充。

## 如何获得源码

tinper-acs 系列业务组件源码均开放到 Github中，请前往这里查看：https://github.com/tinper-acs。

## 如何基于 ac-tools 开发应用组件

> 特殊说明：ynpm 是用友云Node镜像服务，用友云相关业务组件可以使用 YNPM 发布到企业内部镜像仓库中，[更多文档请参考这里](https://package.yonyoucloud.com/#/guide?link=start)。

### 目的和概述

结合实际业务需求和功能场景的深入开发之后，经过提炼、抽象、总结出的应用组件具备跨项目跨团队的复用价值，能够帮助不同产品不同团队在同一业务场景下实现快速开发。

应用组件内的逻辑和产品业务相关，其中代码逻辑不能按开源的方式发布到外部平台或社区（严守公司保密的高压线），为了方便协作和资源共享，我们可以将开发好的组件发布到 ynpm （前端共享平台，支撑用友内部开源协作）。

开发应用组件不免要搭建起相应的项目工程和构建机制，实现资源构建、示例预览、发布、文档规范和目录规范等，为此我们提炼了一套通用项目模板并封装成 cli 命令行工具 ac-tools 提供给开发者使用。

### ac-tools 工具介绍
ac-tools 是一款编写应用组件的开发工具 应用组件 执行远程代码访问、基本组件开发构建、demo示例的生成等自动化工具，接下来为大家讲解其具体使用方法。

安装和命令行介绍
使用 ynpm 安装：
```
$ npm install ynpm-tool -g
$ ynpm install ac-tools -g 
```
使用 npm 安装；
```
$ npm install ac-tools -g
```
### 命令行使用说明

```
#	Scripts 脚本命令	Description 功能描述
1	ac-tools -h	api 查询
2	ac-tools -v	版本查询
3	ac-tools init	下载模板项目
4	ac-tools sample	编写demo时，需要生成示例代码
5	ac-tools md	README.md文档转化成html发布到git io上
```

### 创建应用组件
快速创建一个应用组件：
```
$ mkdir app && cd app
$ ac-tools init
```
启动开发：
```
$ npm run dev
```
应用组件模板工程说明
```
.
├── config
│   ├── webpack.base.js
│   ├── webpack.config.dev.js       # 开发环境配置
│   ├── webpack.config.ghpages.js   # 打包放到github.io环境配置
│   ├── webpack.config.prod.js      # 发布组件环境配置
├── demo
│   ├── demolist
│   │   └── Demo1.js                # 实例1，调用src中的组件，进行展示
│   ├── demo.scss                   # demo中需要的基础样式
│   ├── index-demo-base.js          # demo模版文件
│   └── index.js                    # ac-tools sample生成的文件
├── package.json
├── docs
│   ├── demolist
│   │   └── Demo1.js                # 实例1，调用src中的组件，进行展示
│   ├── demo.scss                   # demo中需要的基础样式
│   ├── index-demo-base.js          # demo模版文件
│   └── index.js                    # ac-tools sample生成的文件
├── ghpages                         # 实例打包文件
├── mock                            # mock数据 
├── src
│   ├── assets                      # ac-tools md需要的静态文件
│   ├── temp                        
│   │   └── index.js                # 组件js逻辑 
│   │   └── style.scss        # 组件样式
│   └── index.js                    # 组件出口
├── static                          
```

### 应用组件发布
生成组件包：
```
$ npm run build
```
发布ynpm：
```
$ ynpm publish
```
生成github.io静态资源：
```
$ npm run deploy
```
发布github.io：
```
$ ac-tools md
```