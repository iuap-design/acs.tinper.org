# 参照树形 RefTree 


## 何时使用

单选多选树形参照


## 如何使用

```
$ ynpm install ref-tree@2.0.0-beta.0 --save

引入

import RefTreeBaseUI from 'ref-tree';

样式

import 'ref-tree/dist/index.css';

```

## 代码演示


## 分类


RefTreeBaseUI（默认）
    
    树参照通用ui

RefTreeWithInput

     带文本框的树参照弹出窗。
  
    
## API

### RefTreeBaseUI

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
title |``string``|空 |打开上传的模态框显示的标题文字 | 否
className |`string`|空 | 参照class样式，作用于弹出层的样式，默认为空。使用'ref-walsin-modal'参照使用另外一种风格 | 否
showLoading | `bool` | false | 是否展示loading，多用于请求中| 否
backdrop |`bool`| true |弹出层是否有模态层，true 显示，false 不显示 | 否
lang|`string`| `zh_CN` |多语配置。取值范围[en_US,zh_TW,fr_FR,de_DE,ja_JP,zh_CN] | 否
buttons|`object`| - |{buttons:{cancelText:'取消',clearText:'清空已选',okText:'确认'}} 按钮文字展示| 否
emptyBut| `bool` | false| 清空按钮是否展示 |否
valueField |``string``|'refcode' |待提交的 value 的键。 | 否
checkStrictly| `bool` | checkable状态下节点选择完全受控（父子节点选中状态不再关联）|否
multiple |`bool`| false |是否单选， true 多选，false 单选， 同时多选时不会有确认和取消按钮，多选时会出现复选框 | 否
searchable |`bool`|true |是否显示搜索框，弹出层是否带有搜索框，true 显示，false 不显示。 | 否
defaultExpandAll |`bool`|false |展开所有节点 true 展开，false 不展开 | 否
nodeDisplay |<code>string 或 function</code>|'{refname}' |指定树节点渲染内容，这里为了提供根据数据渲染节点图标使用。<br/>当为字符串时则会根据`{}`包裹的正则匹配替换。<br/>如： nodeDisplay:'{refname}'<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}。是树节点展示的内容| 否
treeData | `Array` | []| 树参照数据 | 否
showModal | `bool` | false | 是否展示参照 ，true显示，false不显示| 否
onSave | `function(value)` | -- | 参照确定的回调| 否
onCancel | `function(value)` | -- | 参照取消的回调| 否
value| ``string``|空|默认值，当matchData为空时，可以初始化选中的节点。例如 `'{"refname":"初级-T1","refpk":"level1"}'`。|否
matchData | `Array` | [] | 选中的节点，macthData和value配合使用，当value中refpk不为空且matchData有值，在选中节点从matchData中获取| 否
theme| `String` | 'ref-red' | 参照主题，现在就两种选择'ref-red'或者'ref-blue' | 否
onLoadData|  `function(treeNode)` | --| 懒加载传个树的回调方法| 否
getRefTreeData|`function(value)` | --| 搜索的回到方法，value是搜索值| 否

### RefTreeWithInput

除了使用上述<RefTreeBaseUI/>的参数（showModal不可使用）还有以下参数。

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
wrapClassName|`string`|空 | 文本框的class样，默认为空。 | 否
placeholder|`string`| 空 |文本框的 placeholder | 否
style| `object`| {width:200}| 文本框的style，默认宽度200px | 否 
filterUrl| `string`|空|快捷录入接口。|否
filterUrlFunc| `function(value)` | ()=>{} | 必须配合filterUrl使用，当filterUrl为空或者不传入，才会回调filterUrlFunc | 否
filertData| `Array`| [] | 必须配合filterUrl使用，当filterUrl为空或者不传入，才会使用filterData| 否
displayField |<code>string 或 function</code>|'{refname}' |记录中显示的内容的格式。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`{refname}`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}，是input展示value| 否
valueField |``string``|'refcode' |待提交的 value 的键。 | 否
value| ``string``|空|默认值，例如 `'{"refname":"初级-T1","refpk":"level1"}'`。初始化input框值，搭配上面的matchData初始化表格选中数据|否
disabled|`bool`| false |禁用整个参照 | 否
onChange|`function(values, record)`|--|value改变、快捷录入和保存时数据回调|否
canClickGoOn|`function()`| ()=>{return true}|当点击文本框右侧弹出按钮时是否打开modal<br>适用于级联情况下当选择不全时的处理| 否 
canInputGoOn|`function()`| ()=>{return true}|当点击文本框触发快捷录入时是否可以录入<br>适用于级联情况下当选择不全时的处理| 否 

## 注意事项

## 更新日志