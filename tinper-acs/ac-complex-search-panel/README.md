# ac-complex-search-panel

[![npm version](https://img.shields.io/npm/v/ac-complex-search-panel.svg)](https://www.npmjs.com/package/ac-complex-search-panel)
[![Build Status](https://img.shields.io/travis/tinper-bee/ac-complex-search-panel/master.svg)](https://travis-ci.org/tinper-bee/ac-complex-search-panel)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/ac-complex-search-panel/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/ac-complex-search-panel?branch=master)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/ac-complex-search-panel.svg)](https://david-dm.org/tinper-bee/ac-complex-search-panel#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/ac-complex-search-panel.svg?style=flat)](https://npmjs.org/package/ac-complex-search-panel)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/tinper-bee/ac-complex-search-panel.svg)](http://isitmaintained.com/project/tinper-bee/ac-complex-search-panel "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/tinper-bee/ac-complex-search-panel.svg)](http://isitmaintained.com/project/tinper-bee/ac-complex-search-panel "Percentage of issues still open")


react ac-complex-search-panel component for tinper-bee

some description...

## 依赖

- react >= 15.3.0
- react-dom >= 15.3.0
- prop-types >= 15.6.0

## 使用方法

```js
$ npm install ac-complex-search-panel --save-dev

引入

import AcComplexSearchPanel from 'ac-complex-search-panel';

样式引入

import 'ac-complex-search-panel/dist/ac-complex-search-panel.css';


```



## API

|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
| form | `bee-form`组件内的form，必须传入 | object | - |
| searchOpen | 是否默认展开更多查询条件 | string | false |
| open | 设置展开显示 | string | - |
| openHandle | 展开收起回调 | function | () => {} |
| search | 查询的回调 | function | () => {} |
| reset | 重置的回调,默认首先调用'this.props.form.resetFields()'清空所有值,无法清空的需要在回调中手动清空 | function | () => {} |
| resetName | 重置的文字 | string | 重置 |
| searchName | 查询的文字 | string | 查询 |
| searchHead | 查询标题文字 | string | 查询面板 |
| btnPosition | 按钮位置 | `left`/`right`/`center` | right |
| openName | 展开的文字或者dom | string/dom | 展开 |
| closeName | 收起的文字或者dom | string/dom | 收起 |
| showIcon | 是否显示展开收起的图标 | bool | true |
| renderHeader | 自定义头部信息 | function | - |
| renderFooter | 自定义底部信息 | function | - |
| searchBtnProps | 查询按钮属性，onClick无效 | object | - |
| resetBtnProps | 清空按钮属性，onClick无效 | object | - |
| searchBtnPosition | 查询按钮位置 | `left`/`right` | left |
| searchHead | 查询面板标题 | string | 查询面板 |

#### 开发调试

```sh
$ npm install -g bee-tools
$ git clone https://github.com/tinper-bee/ac-complex-search-panel
$ cd ac-complex-search-panel
$ npm install
$ npm run dev
```
