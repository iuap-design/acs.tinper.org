# 关于 tinper-acs

`tinper-acs` 是在 `tinper-bee` 基础组件体系之上结合典型业务场景而提炼封装的一系列通用业务类组件，不仅是对体验交互的个性化、场景化的延伸和扩展，也包含与通用支撑服务配套的前端组件化落地，`tinper-acs`中提供的常用、复杂表格、流程化、单据类、国际化、参照类等不同类型的UI组件，在实际产品和项目开发中起到了关键作用，是对技术型组件的一个重要补充。

## 如何获得源码

tinper-acs 系列业务组件源码均开放到 Github中，请前往这里查看：https://github.com/tinper-acs

## 如何基于 bee-tools 开发应用组件

[bee-tools说明文档](https://github.com/tinper-bee/bee-tools)

[如何写一个标准的react组件](https://github.com/tinper-bee/react-components-docs/blob/master/%E5%A6%82%E4%BD%95%E5%86%99%E4%B8%80%E4%B8%AA%E6%A0%87%E5%87%86%E7%9A%84react%E7%BB%84%E4%BB%B6.md)

安装 bee-tools@1.0.x版本，执行 `bee-tools create xxx` 选择 `ac-component`


## 目的和概述

结合实际业务需求和功能场景的深入开发之后，经过提炼、抽象、总结出的应用组件具备跨项目跨团队的复用价值，能够帮助不同产品不同团队在同一业务场景下实现快速开发。

应用组件内的逻辑和产品业务相关，其中代码逻辑不能按开源的方式发布到外部平台或社区（严守公司保密的高压线），为了方便协作和资源共享，我们可以将开发好的组件发布到 ynpm （前端共享平台，支撑用友内部开源协作）。

开发应用组件不免要搭建起相应的项目工程和构建机制，实现资源构建、示例预览、发布、文档规范和目录规范等，为此我们提炼了一套通用项目模板并封装成 cli 命令行工具 bee-tools 提供给开发者使用。

