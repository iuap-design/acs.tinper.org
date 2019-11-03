
# 参照组件 mdfRefer 

## 何时使用

使用mdf逻辑的参照

## 如何使用
安装
```shell
ynpm install @yonyou/smdf-refer --save
```
引入antd的样式

```html
<link href="http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/antd/antd.css" rel="stylesheet" type="text/css">

```

```javascript

import 'mdf-refer/lib/index.less'
import MdfRefer  from 'mdf-refer/lib/index.js'

//1.首先创建model对象

let model = new cb.models.MdfReferModel({
  cRefType:'ucf-org-center.org_assets_tree_ref',
  multiple:true,//指定多选
  displayname:'name',
  valueField:'id',
  text:'ybt01__智能公司',//设置初始值
});

//2. 可以添加方法

let config = {};
config.modelconfig ={
  afterOkClick:this.afterOkClick
}

//3.调用参照

<MdfRefer modelName={'refer'} model={model} config={config} >


```

## 代码演示


## API 

|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
| ReferModel | 初始化model方法，来自于cb.models。接收的参数如下| `function` | - 
| （ReferModel参数）cRefType | 指定参照的refCode | `string` | -
| （ReferModel参数）multiple | 指定参照单选多选 | `boolean` | false
| （ReferModel参数）displayname | 指定参照确定后展示的字段 | `string` | 'name'
| （ReferModel参数）valueField | 指定参照数据的主键  | `string` | 'id'
| （ReferModel参数）text | 指定参照的初始值，并且打开参照会按照此值搜索 | `string` | ''
|  config | 初始化model时，传入的config，一些绑定的方法可以在这里 。接收的参数如下| `object` | {}
| （config参数）modelconfig | 指定参照的其他属性 | `object` | 
| (modelconfig参数)afterOkClick  | 参照确定的回调函数,data是数组格式 | function(data) | -
| (modelconfig参数)afterValueChange  | 参照值改变的回调。data是对象，有value：参照选中的数据（多选是数组，单选是对象），oldValue：之前选中的值，obj={text:'',value:'',select:{}/[]}| function(data) | -

### model对象上的方法

mdf-refer参照不同于其他参照组件，组件本身上不提供过多api，主要的操作方式在第一步创建的model对象上
这里还有一堆可以使用的方法，是在model（如何使用-第一步定义的model）上挂载着很多的方法。mdf-refer参照不同于其他参照组件，组件本身上不提供过多api，主要的操作方式在第一步创建的model对象上。
注意：mdf-refer定义的model是来在于cb.models.MdfReferModel，不同于mdf框架中cb.models.ReferModel。但是MdfReferModel继承cb.models.ReferModel，又支持个性方法定义和修改getTitleData、setTitleData的url等。

方法具体参考：
ViewModel事件汇总：https://www.yuque.com/gpgy5k/ucf/wnageu
BaseModel 基类：https://www.yuque.com/gpgy5k/ucf/oi56rx
ContainerModel 基类https://www.yuque.com/gpgy5k/ucf/vgqofc

## 注意事项

暂无

## 更新日志

