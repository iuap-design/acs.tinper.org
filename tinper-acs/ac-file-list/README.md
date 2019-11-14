# ac-file-list

[![npm version](https://img.shields.io/npm/v/ac-file-list.svg)](https://www.npmjs.com/package/ac-file-list)
[![Build Status](https://img.shields.io/travis/tinper-bee/ac-file-list/master.svg)](https://travis-ci.org/tinper-bee/ac-file-list)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/ac-file-list/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/ac-file-list?branch=master)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/ac-file-list.svg)](https://david-dm.org/tinper-bee/ac-file-list#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/ac-file-list.svg?style=flat)](https://npmjs.org/package/ac-file-list)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/tinper-bee/ac-file-list.svg)](http://isitmaintained.com/project/tinper-bee/ac-file-list "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/tinper-bee/ac-file-list.svg)](http://isitmaintained.com/project/tinper-bee/ac-file-list "Percentage of issues still open")


react ac-file-list component for tinper-bee

附件管理组件
项目中需要引入`tinper-bee`的样式文件

## 依赖

- react >= 15.3.0
- react-dom >= 15.3.0
- prop-types >= 15.6.0

## 使用方法

```js
    import Btns from 'ac-file-list';
    import 'ac-file-list/build/FileList.css';
```



## API

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|id|必填，单据唯一标示|string|-|
|disabled|上传按钮是否禁用|bool|false|
|getListNow|组件渲染时，是否立即请求附件列表接口。例如：单据详情编辑时需要立即请求，新增时不需要|bool|false|
|url|列表、上传、删除、详情(查询下载地址)接口地址|object|默认值往下看url配置|
|uploadProps|上传参数，参考 [bee-upload API](http://bee.tinper.org/tinper-bee/bee-upload)|object|{}|

### url配置

```js
    {// {id} 替换为 props.id
        "list":  `https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/caep/{id}/files`,//文件列表
        "upload": `https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/caep/{id}/`,//上传
        "delete": `https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/{id}`,//下载 cooperation/rest/v1/file/5d639caaa957bd001936cec9  此处id为附件id
        "info":`https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/{id}/info/ `,//文件信息
    }
```

#### 开发调试

```sh
$ npm install -g bee-tools
$ git clone https://github.com/tinper-bee/ac-file-list
$ cd ac-file-list
$ npm install
$ npm run dev
```
