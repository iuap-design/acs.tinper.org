## ac-spreadsheet

### 简介
**ac-spreadsheet** 是一个在线电子表格组件,依赖于[handsontable](https://github.com/handsontable/handsontable).该组件提供了列宽拖拽、列交换、排序、在线编辑、增减行、动态获取焦点行数据等操作。
### 安装

1. 通过`npm`安装
 ```bash
    npm install ac-spreadsheet --save
```
2. 国内镜像通过`cnpm`安装
```bash
    cnpm install ac-spreadsheet --save
```
3. 用友内网通过`ynpm`安装
```bash
ynpm installac-spreadsheet --save
```
### 使用
```
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
### API


 参数      | 类型                 | 默认值 | 说明
----------|----------------------|--------------|------
settings   | object             |    |handsontable组件中的所需[参数](https://handsontable.com/docs/7.0.0/Core.html)都在这个对象中

### 开发调试
```
$ npm install

$ npm run dev
```

