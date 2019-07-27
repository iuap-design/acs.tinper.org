# nc-grid

[![npm version](https://img.shields.io/npm/v/nc-grid.svg)](https://www.npmjs.com/package/nc-grid)
[![Build Status](https://img.shields.io/travis/tinper-bee/nc-grid/master.svg)](https://travis-ci.org/tinper-bee/nc-grid)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/nc-grid/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/nc-grid?branch=master)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/nc-grid.svg)](https://david-dm.org/tinper-bee/nc-grid#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/nc-grid.svg?style=flat)](https://npmjs.org/package/nc-grid)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/tinper-bee/nc-grid.svg)](http://isitmaintained.com/project/tinper-bee/nc-grid "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/tinper-bee/nc-grid.svg)](http://isitmaintained.com/project/tinper-bee/nc-grid "Percentage of issues still open")


react nc-grid component for tinper-bee

some description...

## 依赖

- react >= 15.3.0
- react-dom >= 15.3.0
- prop-types >= 15.6.0

## 使用方法

```js

```



## API

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|data|传入的表格数据|array|-|
|columns|表格列数组|array|-|
|isMultipleHead|是否为多表头|bool|false|
|multiSelect|是否使用多选功能|bool|false|
|totalData|合计行数据|array|-|
|totalColums|合计行列配置|array|-|
|totalColums|合计行列配置|array|-|
|showPagination|是否显示分页|bool|false|
|pageIndexChange|分页切换页码时的回调|function|-|
|pageSizeChange|分页改变下拉选项时的回调|function|-|
|pageInfo|包含 {pageIndex, pageSize, total, totalPage} 的对象|object|-|
|config|表格配置项|object|-|

#### 开发调试

```sh
$ npm install -g bee-tools
$ git clone https://github.com/tinper-bee/nc-grid
$ cd nc-grid
$ npm install
$ npm run dev
```
