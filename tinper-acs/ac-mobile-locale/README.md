# ac-mobile-locale

[![npm version](https://img.shields.io/npm/v/ac-mobile-locale.svg)](https://www.npmjs.com/package/ac-mobile-locale)
[![Build Status](https://img.shields.io/travis/tinper-bee/ac-mobile-locale/master.svg)](https://travis-ci.org/tinper-bee/ac-mobile-locale)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/ac-mobile-locale/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/ac-mobile-locale?branch=master)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/ac-mobile-locale.svg)](https://david-dm.org/tinper-bee/ac-mobile-locale#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/ac-mobile-locale.svg?style=flat)](https://npmjs.org/package/ac-mobile-locale)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/tinper-bee/ac-mobile-locale.svg)](http://isitmaintained.com/project/tinper-bee/ac-mobile-locale "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/tinper-bee/ac-mobile-locale.svg)](http://isitmaintained.com/project/tinper-bee/ac-mobile-locale "Percentage of issues still open")


react ac-mobile-locale component for tinper-bee

some description...

## 依赖

- react >= 15.3.0
- react-dom >= 15.3.0
- prop-types >= 15.6.0

## 使用方法

```js
$ npm install ac-mobile-locale --save-dev

引入

import AcMobileLocale from 'ac-mobile-locale';

样式引入

import 'ac-mobile-locale/dist/index.css';

```



## API

|参数|说明|类型|返回值|是否必填|
|:--|:---:|:--:|---:|---:|
|className|容器样式|string| --- | 否 |
|disabled|是否可用|bool| --- | --- |
|accountInfo| 语种列表 |array| --- | 否 |
|selectContryPhoneCode| 默认显示语种|object| --- | 否 |
|mobile| 默认显示手机号 |string | --- | 否 |
|mobileChangeHandle|改变语种和输入手机号改变| function | arg1:输入的手机号，arg2: 选中的语种 | 否 |
|placeholder|输入框的placeholder| string | -- | 否 |
|errorMessage|form表单提交错误时的报错提示| string | -- | 否 |
|inputId|输入框的key 默认是mobile| string | -- | 否 |
|form|传入form需要表单校验，否则不需要校验| string | -- | 否 |

#### 开发调试

```sh
$ npm install -g bee-tools
$ git clone https://github.com/tinper-bee/ac-mobile-locale
$ cd ac-mobile-locale
$ npm install
$ npm run dev
```
