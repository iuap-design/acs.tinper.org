# ac-search-cn

[![npm version](https://img.shields.io/npm/v/ac-search-cn.svg)](https://www.npmjs.com/package/ac-search-cn)
[![Build Status](https://img.shields.io/travis/tinper-bee/ac-search-cn/master.svg)](https://travis-ci.org/tinper-bee/ac-search-cn)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/ac-search-cn/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/ac-search-cn?branch=master)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/ac-search-cn.svg)](https://david-dm.org/tinper-bee/ac-search-cn#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/ac-search-cn.svg?style=flat)](https://npmjs.org/package/ac-search-cn)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/tinper-bee/ac-search-cn.svg)](http://isitmaintained.com/project/tinper-bee/ac-search-cn "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/tinper-bee/ac-search-cn.svg)](http://isitmaintained.com/project/tinper-bee/ac-search-cn "Percentage of issues still open")


react ac-search-cn component for tinper-bee

some description...

## 依赖

- react >= 15.3.0
- react-dom >= 15.3.0
- prop-types >= 15.6.0

## 使用方法

```js
import AcSearchPanel from 'ac-search-cn';
import 'ac-search-cn/build/AcSearchPanel.css';

```



## API

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|title|标题|node|-|
|search|查询回调|func|-|
|reset|清空回调|func|-|
|Children|子元素：Complex/Sample 组件|node|-|
|hasChose|是否可以选择查询方案|node|-|

### FormItem

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|label|查询表单元素标签|string|-|
|required|查询表单元素是否必填|bool|-|
|tooltip|鼠标enter时显示内容|string|-|

#### 开发调试

```sh
$ npm install -g bee-tools
$ git clone https://github.com/tinper-bee/ac-search-cn
$ cd ac-search-cn
$ npm install
$ npm run dev
```
