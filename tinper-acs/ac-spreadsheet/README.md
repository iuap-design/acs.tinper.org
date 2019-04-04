# ac-spreadsheet

[![npm version](https://img.shields.io/npm/v/ac-spreadsheet.svg)](https://www.npmjs.com/package/ac-spreadsheet)
[![Build Status](https://img.shields.io/travis/tinper-bee/ac-spreadsheet/master.svg)](https://travis-ci.org/tinper-bee/ac-spreadsheet)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/ac-spreadsheet/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/ac-spreadsheet?branch=master)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/ac-spreadsheet.svg)](https://david-dm.org/tinper-bee/ac-spreadsheet#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/ac-spreadsheet.svg?style=flat)](https://npmjs.org/package/ac-spreadsheet)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/tinper-bee/ac-spreadsheet.svg)](http://isitmaintained.com/project/tinper-bee/ac-spreadsheet "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/tinper-bee/ac-spreadsheet.svg)](http://isitmaintained.com/project/tinper-bee/ac-spreadsheet "Percentage of issues still open")


react ac-spreadsheet component for tinper-bee

some description...

## 依赖

- react >= 15.3.0
- react-dom >= 15.3.0
- prop-types >= 15.6.0

## 使用方法

```js

npm install ac-spreadsheet --save

import React, { Component } from 'react';
import HotTable from 'ac-spreadsheet';
class Demo1 extends Component {
    constructor(props) {
        super(props);
        this.data = [
          ['张其', '2019',11 ,'男',90 ],
          ['王收', '2020', 11, '男', 100],
          ['孙武', '2018', 11, '男', 93],
          ['宋佳','2021', 13, '女', 92],
          ['李琦','2021', 15, '女', 99]
        ];
      }
    
      render() {
        return (<HotTable data={this.data}  width="600" height="300" />);
      }
}

```



## API

 参数      | 类型                 | 默认值 | 说明
----------|----------------------|--------------|------
settings   | object             |    |handsontable组件中的所需[参数](https://handsontable.com/docs/7.0.0/Core.html)都在这个对象中

#### 开发调试

```sh
$ npm install -g bee-tools
$ git clone https://github.com/tinper-bee/ac-spreadsheet
$ cd ac-spreadsheet
$ npm install
$ npm run dev
```
