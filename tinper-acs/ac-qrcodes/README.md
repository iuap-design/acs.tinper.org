# ac-qrcode

[![npm version](https://img.shields.io/npm/v/ac-qrcode.svg)](https://www.npmjs.com/package/ac-qrcode)
[![Build Status](https://img.shields.io/travis/tinper-bee/ac-qrcode/master.svg)](https://travis-ci.org/tinper-bee/ac-qrcode)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/ac-qrcode/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/ac-qrcode?branch=master)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/ac-qrcode.svg)](https://david-dm.org/tinper-bee/ac-qrcode#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/ac-qrcode.svg?style=flat)](https://npmjs.org/package/ac-qrcode)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/tinper-bee/ac-qrcode.svg)](http://isitmaintained.com/project/tinper-bee/ac-qrcode "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/tinper-bee/ac-qrcode.svg)](http://isitmaintained.com/project/tinper-bee/ac-qrcode "Percentage of issues still open")


react ac-qrcode component for tinper-bee

some description...

## 依赖

- react >= 15.3.0
- react-dom >= 15.3.0
- prop-types >= 15.6.0

## 使用方法

```js
npm install ac-qrcodes --save


import AcQrcode from "ac-qrcodes";

render(){
    return (<div>
                <AcQrcode
                    value={"http://tinper.org/"}
                    size={128}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={false}
                    renderAs={"svg"}
                />
    </div>)
}

```



## API

 参数      | 类型                 | 默认值
----------|----------------------|--------------
value   | string             |
renderAs| string ('canvas' 'svg') | 'canvas'
size    | number             | 128
bgColor | string (CSS color) | "#FFFFFF"
fgColor | string (CSS color) | "#000000"
level   | string ('L' 'M' 'Q' 'H')  | 'L'
includeMargin | boolean      | false

#### 开发调试

```sh
$ npm install -g bee-tools
$ git clone https://github.com/tinper-bee/ac-qrcode
$ cd ac-qrcode
$ npm install
$ npm run dev
```
