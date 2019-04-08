# ac-barcode

[![npm version](https://img.shields.io/npm/v/ac-barcode.svg)](https://www.npmjs.com/package/ac-barcode)
[![Build Status](https://img.shields.io/travis/tinper-bee/ac-barcode/master.svg)](https://travis-ci.org/tinper-bee/ac-barcode)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/ac-barcode/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/ac-barcode?branch=master)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/ac-barcode.svg)](https://david-dm.org/tinper-bee/ac-barcode#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/ac-barcode.svg?style=flat)](https://npmjs.org/package/ac-barcode)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/tinper-bee/ac-barcode.svg)](http://isitmaintained.com/project/tinper-bee/ac-barcode "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/tinper-bee/ac-barcode.svg)](http://isitmaintained.com/project/tinper-bee/ac-barcode "Percentage of issues still open")


react ac-barcode component for tinper-bee

some description...

## 依赖

- react >= 15.3.0
- react-dom >= 15.3.0
- prop-types >= 15.6.0

## 使用方法

```js
npm install ac-barcode --save


import AcBarcode from "ac-barcode";

render(){
    return (<AcBarcode value="9787123" />)
}

```



## API


| 参数 | 默认值 | 类型 |
|--------|---------------|------|
| [`value`](https://github.com/lindell/JsBarcode/wiki/Options#format) | `"` | `String` |
| [`renderer`](https://github.com/lindell/JsBarcode/wiki/Options#format) | `svg (svg,canvas,img)` | `String` |
| [`format`](https://github.com/lindell/JsBarcode/wiki/Options#format) | `"auto" (CODE128)` | `String` |
| [`width`](https://github.com/lindell/JsBarcode/wiki/Options#width) | `2` | `Number` |
| [`height`](https://github.com/lindell/JsBarcode/wiki/Options#height) | `100` | `Number` |
| [`displayValue`](https://github.com/lindell/JsBarcode/wiki/Options#display-value) | `true` | `Boolean` |
| [`fontOptions`](https://github.com/lindell/JsBarcode/wiki/Options#font-options) | `""` | `String` |
| [`font`](https://github.com/lindell/JsBarcode/wiki/Options#font) | `"monospace"` | `String` |
| [`textAlign`](https://github.com/lindell/JsBarcode/wiki/Options#text-align) | `"center"` | `String` |
| [`textPosition`](https://github.com/lindell/JsBarcode/wiki/Options#text-position) | `"bottom"` | `String` |
| [`textMargin`](https://github.com/lindell/JsBarcode/wiki/Options#text-margin) | `2` | `Number` |
| [`fontSize`](https://github.com/lindell/JsBarcode/wiki/Options#font-size) | `20` | `Number` |
| [`background`](https://github.com/lindell/JsBarcode/wiki/Options#background)  | `"#ffffff"` | `String (CSS color)` |
| [`lineColor`](https://github.com/lindell/JsBarcode/wiki/Options#line-color) | `"#000000"` | `String (CSS color)` |
| [`margin`](https://github.com/lindell/JsBarcode/wiki/Options#margins) | `10` | `Number` |
| [`marginTop`](https://github.com/lindell/JsBarcode/wiki/Options#margins) | `undefined` | `Number` |
| [`marginBottom`](https://github.com/lindell/JsBarcode/wiki/Options#margins) | `undefined` | `Number` |
| [`marginLeft`](https://github.com/lindell/JsBarcode/wiki/Options#margins) | `undefined` | `Number` |
| [`marginRight`](https://github.com/lindell/JsBarcode/wiki/Options#margins) | `undefined` | `Number` |


#### 开发调试

```sh
$ npm install -g bee-tools
$ git clone https://github.com/tinper-bee/ac-barcode
$ cd ac-barcode
$ npm install
$ npm run dev
```
