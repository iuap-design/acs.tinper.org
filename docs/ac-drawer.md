## ac-drawer

[![npm version](https://img.shields.io/npm/v/ac-drawer.svg)](https://www.npmjs.com/package/ac-drawer)
[![NPM downloads](http://img.shields.io/npm/dt/ac-drawer.svg?style=flat)](https://npmjs.org/package/ac-drawer)

### 1. 简介

一个基于react的抽屉组件，可以从上下左右这些侧面弹出一个层，显示特定的内容

### 2. 安装

```javascript
npm install ac-drawer -S
```

### 3. 使用
```javascript
import Drawer from 'ac-drawer';
import 'ac-drawer/dist/ac-drawer.css';
```

```javascript
<Drawer title={'basic drawer'} show={true} placement={'right'} onClose={this.fCloseDrawer}>
    <div className="con">
        <p>这是第一行文字</p>
        <p>这是第二行文字</p>
        <p>这是第三行文字，啦啦啦~</p>                                                 
    </div>
</Drawer>
```
更多用法可以参考[demo](./demo/demolist)文件夹中的示例

### 4. 预览


### 5. 参数

Parameter | Type |Default| Description
--------- | ---- | ------|-----------
show | `string` | | 是否显示抽屉组件
placement | `string` | `right` | 抽屉的位置。有四个预置的选项: `left`,`right`,`top`,`bottom`
hasHeader | `boolean` | `true` | 是否显示抽屉的头部
title | `string` |  |  抽屉的头部的标题
className | `string` | | 抽屉容器的class, 用来自定义组件样式
showMask | `boolean` | `true` | 是否显示遮罩
maskClosable | `boolean` | `false` |  点击遮罩是否可以关闭抽屉
zIndex | `number` | `100000` | 抽屉容器的层级，可以修改层级
showClose | `boolean`  | `false` | 是否显示关闭按钮
width | `number` `string` |  | 抽屉的宽度
height | `number` `string` |  | 抽屉的高度
destroyOnClose | `boolean` |  | 关闭时候是否销毁抽屉的内容


