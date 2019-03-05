## ac-button

```
$ ynpm install @yonyou/ac-button --save

引入

import AcButton from '@yonyou/ac-button';

样式

import '@yonyou/ac-button/dist/index.css';

示例代码
 

<AcButton bcolors="brand">品牌色</AcButton>
<AcButton bcolors="danger">危险</AcButton>
<AcButton bcolors="warning">警告</AcButton>
<AcButton bcolors="default">信息</AcButton>

```

## 效果

![](media/15355446781426/15355454605269.jpg)

## API

|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
|bcolors|颜色类型|string|default|
|onClick|点击事件|fun|(e,this)|
|disabled|true/false| bool| --|

* 当前按钮集成Button所有的属性

#### 开发调试

```sh
$ cd ac-button
$ npm install
$ npm run dev
```

