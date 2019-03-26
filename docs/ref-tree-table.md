# ref-tree-table树表参照


## 何时使用

具有单选多选的树表形参照



## 如何使用

```sh

$ npm install ref-tree-table@2.0.0-beta.0 --save
 --save

引入

import RefTreeTableBaseUI,{RefTreeTableWithInput,RefTreeTable, createRefTreeTable,createRefTreeTableModal} from 'ref-tree-table';

import 'ref-tree-table/dist/index.css"


```

## 代码演示


## API

### RefTreeTableBaseUI Api

> RefTreeTableBaseUI Api可以分成三部分，一部分是整体使用，一部分左树，一部分是右表，但是统一传入<RefTreeTableBaseUI/>

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
title |``string``|空 |打开上传的模态框显示的标题文字 | 否
className |`string`|空 | 参照class样式，作用于弹出层和 RefTreeTableWithInput 输入框的样式以及左树右表外层类名，默认为空。 | 否
backdrop |`bool`| true |弹出层是否有模态层，true 显示，false 不显示 | 否
lang|`string`| `zh_TW` |多语配置，详情查看参数详解 | 否
buttons |`object`| `okText`: "确认", //确认按钮<br/>`cancelText`: "取消", //取消按钮<br/>`clearText`: "清空已选" //清空已选按钮|弹出层工具栏三个按钮的文字，若 
onSave |`function( record:object )`|-- |保存回调函数，返回已选择的记录详细数据。 | 否
onCancel | `function(  )`|-- |关闭弹出层 | 否
menuTitle | `String` | ''| 左树的标题| 否
tableTitle | `String` | '' | 右表的标题 | 否
showModal | `Boolean` | false | 参照是否展示。注意，当使用RefTreeTableWithInput 或者 搭配refcorewithinput使用时，showModal不需要配置  | 否

### RefTreeTableBaseUI 左树api
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

### RefTreeTableBaseUI 右表api
参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
multiple |`bool`| false |右表是否单选， true 单选，false 多选。左树总是单选 | 否
checkedArray| `array`|[]|已选择数据。注意，当使用RefTreeTableWithInput 或者 搭配refcorewithinput使用时，checkedArray这个参数不起效且初始值默认[] | 否
value| ``string``|空|默认值，RefWithInput和参照组件都会使用。配合matchData来初始化选中节点。例如 `'{"refname":"初级-T1","refpk":"level1"}'`。|否
matchData | `Array` | [] | 初始化选中的节点(<span style="color: red; font-size: 15px;">macthData优先，其次是value</span>)| 否
condition| `Object` | -- | 右表查询条件，带上左树信息。根据condition值不同来刷新页面| 否
columnsData | `Array` | [] | 右表列数据。具体参照tinper-bee的table组件 | 否
tableData|Array | [] | 右表表体数据。具体参照tinper-bee的table组件 | 否
page | `Object` | {pageCount:0,currPageIndex:0,totalElements:0}| 分页数据信息。 | 否
loadTableData | `function(param)`|()=>{}| 分页下拉或者跳转的回调，返回参数 | 否
onTableSearch| `function(valye)`|()=>{}| 表格搜索的回调|否


### RefWithInput  API
<span style="color: red; font-size: 15px;">注意：RefWithInput（ref-core）可以和RefTreeTableBaseUI配套使用，下面是RefWithInput可以接收的参数，以及RefWithInput给RefTreeTableBaseUI提供的参数</span>

#### RefWithInput接收的参数

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
wrapClassName|`string`|空 | 文本框的class样，默认为空。 | 否
placeholder|`string`| 空 |文本框的 placeholder | 否
style| `object`| {width:200}| 文本框的style，默认宽度200px | 否 
filterUrl| `string`|空|快捷录入接口。|否
displayField |<code>string 或 function</code>|'{refname}' |记录中显示的键。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}，是input展示value| 否
valueField |``string``|'refcode' |待提交的 value 的键。 | 否
value| ``string``|空|默认值，例如 `'{"refname":"初级-T1","refpk":"level1"}'`。|否
disabled|`bool`| false |禁用整个参照 | 否
onChange|`function(values, record)`|--|value改变、快捷录入和保存时数据回调|否
canClickGoOn|`function()`| ()=>{return true}|当点击文本框右侧弹出按钮时是否打开modal<br>适用于级联情况下当选择不全时的处理| 否 
canInputGoOn|`function()`| ()=>{return true}|当点击文本框触发快捷录入时是否可以录入<br>适用于级联情况下当选择不全时的处理| 否 

#### RefWithInput提供的参数

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
showModal | `bool` | false | 是否展示参照 ，true显示，false不显示| 否
onSave | `function(value)` | -- | 参照确定的回调，会更新checkedArray，showname（input的value），showModal关闭,最后回调RefWithInput接收的参数onSave| 否
onCancel | `function()` | -- | 参照取消的回调，会更新showModal关闭,最后回调RefWithInput接收的参数onCancel| 否
checkedArray | `Array` | [] | 选中的节点| 否
onMatchInitValue| `function(value)` | onMatchInitValue = (checkedArray) => {this.setState({checkedArray})} | 更改checkedArray | 否


## 注意事项
 
 > RefCoreWithInput提供的参数可以保证参照组件showModal关闭打开，因此在使用RefCoreWithInput就不需要额外手动维护showModal
 
 > RefCoreWithInput使用value来展示input的值，参照组件使用matchData来初始化选中节点，若matchData为空，使用value来初始化参照中checkedArray（树组件可以，表不可以）

> 注意：modalShow在refcorewithinput中有提供。因此若是refcorewithinput和refmultipletablebaseui配合使用，注意showModal onSave onCancel

### RefTreeTableBaseUI (默认)
    树表的通用ui
    
### RefTreeTable
    
    参照弹出窗，没有输入框，使用时可根据自己需要定义具体的文本框。实质是RefCoreGlobal和RefTreeTableBaseUI的组合

### RefTreeTableWithInput
    
    带文本框的参照弹出窗。在 RefTreeTable 基础上封装实现，RefWithInput和 RefTreeTable组合。

### createRefTreeTable
    
    非 ReactJS 调用方式，与 RefTreeTable 相同没有输入框，使用时可根据自己需要定义具体的文本框。

### createRefTreeTableModal

    非 ReactJS 调用方式，与  RefTreeTableWithInput 相同带文本框的参照弹出窗。


## 更新日志