# 树穿梭参照 ref-tree-transfer

## 何时使用

树穿梭参照


## 如何使用


```
$ ynpm install ref-tree-transfer --save

引入

import RefTreeTransferBaseUI from 'ref-tree-transfer';

样式

import 'ref-tree-transfer/dist/index.css';

```

## 代码演示

## 分类

RefTreeTransferBaseUI（默认）
    
    树穿梭参照通用ui
    
RefTreeTransferWithInput
    
    带文本框的参照弹出窗

## API

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
title |``string``|空 |打开上传的模态框显示的标题文字 | 否
className |`string`|空 | 参照class样式，作用于弹出层和 RefTreeTransferWithInput 输入框的样式，默认为空。| 否
backdrop |`bool`| true |弹出层是否有模态层，true 显示，false 不显示 | 否
buttons |`object`| `okText`: "确认", //确认按钮<br/>`cancelText`: "取消", //取消按钮<br/>`clearText`: "清空已选" //清空已选按钮|弹出层工具栏三个按钮的文字。| 否
textOption | `object` | -- | 左边树和右边处穿梭框的标题<br /> 如：<br />{<br />    leftTitle:'树',<br />    rightTitle:'穿梭框',<br />leftTransferText:'左侧穿梭框上标题',<br/>rightTransferText:'右侧穿梭框上标题'}| 否
onSave |`function( record:object )`|-- |保存回调函数，返回已选择的记录详细数据。 | 否
onCancel `|function(  )`|-- |关闭弹出层 | 否
theme| `String` | 'ref-red' | 参照主题，现在就两种选择'ref-red'或者'ref-blue' | 否
searchPlaceholder| `String` | '搜索' |搜索框的默认显示文字 | 否
notFoundContent| `String或者ReactNode` | '<div>无数据</div>' |当没有相关内容的显示内容	 | 否
~~refModelUrl~~ |`object`|~~{tableBodyUrl:'',treeUrl:''，tableBodyUrlSearch:''}~~|~~弹出层数据接口地址，为了兼容其他参照保留了多连接配置。<br/>如：<br/>{ <br/>treeUrl: '/api/user/blobRefTreeTransfer.json',<br/>tableBodyUrl:'blobRefTreeTransferGrid',//表体请求<br />tableBodyUrlSearch:'blobRefTreeTransferGrid',//搜索时表体请求}。~~ | ~~是~~
displayField |<code>string 或 function</code>|'{refname}' |记录中显示的内容的格式。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}，是input展示value| 否
valueField |``string``|'refcode' |待提交的 value 的键。 | 否
showModal| `Bool`| -- | 参照展开状态 | 否
handleTreeSelect| `function(selectNode)` | --| 左树选择节点触发 | 否
setTargetKeys| `function(targetKeys)` | --| 右穿梭选中数据触发，将穿梭右侧选中的数据传过去 | 否
targetKeys| `Array` | [] | 右穿梭右表中选中的数据的valuefield值| 否
treeData| `Array` | [] | 左树的数据| 否
transferData| `Array` | [] | 右穿梭的数据| 否



## RefTreeTransferWithInput 增量 API
除了使用上述<RefTreeTransferBaseUI/>的参数（showModal不可使用）还有以下参数。

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
wrapClassName|`string`|空 | 文本框的class样，默认为空。 | 否
placeholder|`string`| 空 |文本框的 placeholder | 否
style| `object`| {width:200}| 文本框的style，默认宽度200px | 否 
filterUrl| `string`|空|快捷录入接口。|否
filterUrlFunc| `function(value)` | ()=>{} | 必须配合filterUrl使用，当filterUrl为空或者不传入，才会回调filterUrlFunc | 否
filertData| `Array`| [] | 必须配合filterUrl使用，当filterUrl为空或者不传入，才会使用filterData| 否
value| ``string``|空|默认值，例如 `'{"refname":"初级-T1","refpk":"level1"}'`。初始化input框值，搭配上面的matchData初始化表格选中数据|否
disabled|`bool`| false |禁用整个参照 | 否
onChange|`function(values, record)`|--|value改变、快捷录入和保存时数据回调|否
canClickGoOn|`function()`| ()=>{return true}|当点击文本框右侧弹出按钮时是否打开modal<br>适用于级联情况下当选择不全时的处理| 否 
canInputGoOn|`function()`| ()=>{return true}|当点击文本框触发快捷录入时是否可以录入<br>适用于级联情况下当选择不全时的处理| 否 


## 更新日志

