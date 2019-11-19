# 二维码组件 Qrcode

React二维码组件，使用底层核心算法[qr.js](https://github.com/defunctzombie/qr.js)进行组件封装，提供标准的功能展示，具有Level、前景、背景颜色设置、大小设置、边框间距设置、SVG和Canvas格式等

## 何时使用

条形码

## 如何使用

```
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

## 代码演示


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


## 注意事项

暂无

## 更新日志

