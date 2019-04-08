# 条形码组件 AcBarcode

React条形码组件，使用业界知名 [jsbarcode](https://github.com/lindell/JsBarcode) 进行封装，简单、友好的使用体验，支持大小设置、颜色设置、边框设置、多种格式支持如svg、canvas、img等

## 何时使用

条形码

## 如何使用

```
npm install ac-barcode --save


import AcBarcode from "ac-barcode";


```

## 代码演示


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

## 注意事项

支持标准
* [CODE128](https://github.com/lindell/JsBarcode/wiki/CODE128)
  * CODE128 (automatic mode switching)
  * CODE128 A/B/C (force mode)
* [EAN](https://github.com/lindell/JsBarcode/wiki/EAN)
  * EAN-13
  * EAN-8
  * EAN-5
  * EAN-2
  * UPC (A)
  * UPC (E)
* [CODE39](https://github.com/lindell/JsBarcode/wiki/CODE39)
* [ITF](https://github.com/lindell/JsBarcode/wiki/ITF-14)
  * ITF
  * ITF-14
* [MSI](https://github.com/lindell/JsBarcode/wiki/MSI)
  * MSI10
  * MSI11
  * MSI1010
  * MSI1110
* [Pharmacode](https://github.com/lindell/JsBarcode/wiki/pharmacode)
* [Codabar](https://github.com/lindell/JsBarcode/wiki/codabar)

## 更新日志

