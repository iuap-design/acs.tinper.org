# ac-notification

[![npm version](https://img.shields.io/npm/v/ac-notification.svg)](https://www.npmjs.com/package/ac-notification)
[![Build Status](https://img.shields.io/travis/tinper-bee/ac-notification/master.svg)](https://travis-ci.org/tinper-bee/ac-notification)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/ac-notification/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/ac-notification?branch=master)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/ac-notification.svg)](https://david-dm.org/tinper-bee/ac-notification#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/ac-notification.svg?style=flat)](https://npmjs.org/package/ac-notification)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/tinper-bee/ac-notification.svg)](http://isitmaintained.com/project/tinper-bee/ac-notification "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/tinper-bee/ac-notification.svg)](http://isitmaintained.com/project/tinper-bee/ac-notification "Percentage of issues still open")


react ac-notification component for tinper-bee

some description...

## 依赖

- react >= 15.3.0
- react-dom >= 15.3.0
- prop-types >= 15.6.0

## 使用方法

```js
$ ynpm install @yonyou/ac-notification --save

引入

import AcNotification from '@yonyou/ac-notification';

样式

import '@yonyou/ac-notification/dist/index.css';

```



## API

|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
|openmess|打开ac-notification|func|
|close|关闭ac-notification |func|
|title|ac-notification标题 |string|''|
|content|ac-notification内容 |string|''|
|type|ac-notification类型 |string|[error,warning,success,info]中任意值|

#### 开发调试

```sh
$ npm install -g bee-tools
$ git clone https://github.com/tinper-bee/ac-notification
$ cd ac-notification
$ npm install
$ npm run dev
```
