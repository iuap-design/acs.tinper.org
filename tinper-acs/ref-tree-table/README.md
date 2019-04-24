# 树表参照 RefTreeTable


## 何时使用

单选多选的树表参照



## 如何使用

```sh

$ npm install ref-tree-table@2.0.0  --save

引入

import RefTreeTableBaseUI from 'ref-tree-table/lib/index.js';
或者
import { RefTreeTableWithInput } from 'ref-tree-table/lib/index.js'


样式
import 'ref-tree-table/lib/index.css';


```

## 代码演示


## 分类


RefTreeTableBaseUI (默认)

    树表的通用ui
    

RefTreeTableWithInput
    
    带文本框的参照弹出窗。


## API

### RefTreeTableBaseUI 

RefTreeTableBaseUI接收的参数部分用于左树，部分用于右表

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
title |``string``|空 |打开上传的模态框显示的标题文字 | 否
className |`string`|空 | 参照class样式，作用于弹出层和 RefTreeTableWithInput 输入框的样式以及左树右表外层类名，默认为空。 | 否
backdrop |`bool`| true |弹出层是否有模态层，true 显示，false 不显示 | 否
value| ``string``|空|默认值，初始化input框值，例如 `'{"refname":"初级-T1","refpk":"level1"}'`。|否
lang|`string`| `zh_CN` |多语配置。取值范围[en_US,zh_TW,fr_FR,de_DE,ja_JP,zh_CN] | 否
buttons |`object`| `okText`: "确认", //确认按钮<br/>`cancelText`: "取消", //取消按钮<br/>`clearText`: "清空已选" //清空已选按钮|弹出层工具栏三个按钮的文字，若 
onSave |`function( record:object )`|-- |保存回调函数，返回已选择的记录详细数据。 | 否
onCancel | `function(  )`|-- |关闭弹出层 | 否
menuTitle | `String` | ''| 左树的标题| 否
tableTitle | `String` | '' | 右表的标题 | 否
showModal | `Boolean` | false | 参照是否展示。 | 否

左树

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
searchable |`bool`|true |是否显示搜索框，弹出层是否带有搜索框，true 显示，false 不显示。 | 否
checkStrictly |`bool`|false|heckable状态下节点选择完全受控（父子节点选中状态不再关联）, false 关联选择，true 不关联| 否
nodeDisplay |<code>string 或 function</code>| `{refname}` |节点渲染时可匹配的内容，这里为了提供根据数据渲染节点图标使用 | 否
defaultExpandAll |`bool`|false |展开所有节点 true 展开，false 不展开。前提lazyModal是true| 否
showLine|`bool`|false |树组件是否有连线| 否
valueField |``string``|'refcode' |待提交的 value 的键。左树右表一致 | 否
showLoading | `bool` | false | 是否展示loading，多用于请求中| 否
onChange| `function(checkedArray)`| -- | 右表选中回调函数| 否
nodeDisplay|<code>string 或 function</code>|'{refname}' |记录中显示的键。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}| 否
treeData | `Array` | [] | 左树数据 | 否
onTreeChange | `function(checkedArray)` |()=>{} |选择树节点的回调，返回选中的树节点| 否 
onTreeSearch`function(searchVal)` |()=>{} |左树上的搜索| 否 

右表

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
multiple |`bool`| false |右表是否单选， true 单选，false 多选。左树总是单选 | 否
matchData | `Array` | [] | 选中的节点，macthData和value配合使用，当value中refpk不为空且matchData有值，选中节点从matchData中获取| 否
~~condition~~| `Object` | -- | ~~右表查询条件，带上左树信息。根据condition值不同来刷新页面~~| 否
columnsData | `Array` | [] | 右表列数据。具体参照tinper-bee的table组件 | 否
tableData|Array | [] | 右表表体数据。具体参照tinper-bee的table组件 | 否
page | `Object` | {pageCount:0,currPageIndex:0,totalElements:0}| 分页数据信息。 | 否
loadTableData | `function(param)`|()=>{}| 分页下拉或者跳转的回调，返回参数。参数包含{refClientPageInfo.currPageIndex:分页当前页码,refClientPageInfo.pageSize:每页展示的数据量,content:搜索条件} | 否
onTableSearch| `function(value)`|()=>{}| 表格搜索的回调，参数是搜索条件|否


### RefTreeTableWithInput

除了使用上述<RefTreeTableBaseUI/>的参数（showModal不可使用）还可以使用以下参数。

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


暂无

## 更新日志