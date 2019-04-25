# 表格参照RefMultipleTable 


## 何时使用

单选多选表格参照


## 如何使用

``` sh
$ ynpm install ref-multiple-table --save

引入

import RefMultipleTableBaseUI,{ SearchPanelItem }  from 'ref-multiple-table'

或者
import { RefMultipleTableWithInput } from 'ref-multiple-table'

样式

import 'ref-multiple-table/lib/index.css';

```


## 代码演示


## 分类


RefMultipleTableBaseUI（默认）

      表格参照的纯ui，需要正确的参数传入。


RefMultipleTableWithInput

    带文本框的参照弹出窗。

SearchPanelItem

    表格参照搜索面板处的搜索条件。（带有复杂搜索的表格参照需要使用此组件）

RefMultipleTableWalsinBaseUI

     行内搜索表格参照的纯ui，需要正确的参数传入。
## API

### RefMultipleTableBaseUI

以下参数为 `<RefTreeTableBaseUI/>`需要使用的，为了保证功能的正常使用请传入。

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
className |`string`|空 | 参照class样式，作用于弹出层的样式，默认为空。 | 否
title |``string``|空 |打开上传的模态框显示的标题文字 | 否
backdrop |`bool`| true |弹出层是否有模态层，true 显示，false 不显示 | 否
lang|`string`| `zh_CN` |多语配置。取值范围[en_US,zh_TW,fr_FR,de_DE,ja_JP,zh_CN] | 否
buttons|`object`| - |{buttons:{cancelText:'取消',clearText:'清空已选',okText:'确认'}} 按钮文字展示| 否
emptyBut| `bool` | false| 清空按钮是否展示 |否
miniSearch| `Boolean`|true|默认是简单搜索|否
size|`String`|'lg'|modal的size|否
valueField |``string``|'refcode' |待提交的 value 的键。 | 否
searchFilterInfo | `function(value)`| 复杂搜索的查询回调，将搜索条件带回| 否
showLoading | `bool` | false | 是否展示loading，多用于请求中| 否
<span style="color:red;">*</span>fliterFormInputs| `Array`| -- | 查询条件| 否
<span style="color:red;">*</span>tableData | `Array` | — | 表体数据 | 否
<span style="color:red;">*</span>columsData | `Array`| — | 表头数据 | 否
pageCount |`number`| — |总页数 | 否
currPageIndex| `number`| — |当前页数 | 否
totalElements | `number`| — |一共多少条 | 否
dataNumSelect | `function()`| — |选择每页多少条的回调函数 | 否
handlePagination| `functitabon()`| — |切换页的方法 | 否
showModal | `bool` | false | 是否展示参照 ，true显示，false不显示| 否
onSave | `function(value)` | -- | 参照确定的回调| 否
onCancel | `function(value)` | -- | 参照取消的回调| 否
value| ``string``|空|默认值，初始化input框值|否
matchData | `Array` | [] | 选中的节点，macthData和value配合使用，当value中refpk不为空且matchData有值，选中节点从matchData中获取| 否
theme| `String` | 'ref-red' | 参照主题，现在就两种选择'ref-red'或者'ref-blue' | 否
searchPanelLocale | `Object` | {'title': '条件筛选EN','resetName': '重置En','searchName': '查询EN','down':'打开EN','up':'关闭EN',} | 复杂搜索标题，按钮的文字等信息 | 否

### RefMultipleTableWalsinBaseUI

以下参数为 `<RefMultipleTableWalsinBaseUI/>`需要使用的，为了保证功能的正常使用请传入。

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
className |`string`|空 | 参照class样式，作用于弹出层的样式，默认为空。 | 否
title |``string``|空 |打开上传的模态框显示的标题文字 | 否
backdrop |`bool`| true |弹出层是否有模态层，true 显示，false 不显示 | 否
lang|`string`| `zh_CN` |多语配置。取值范围[en_US,zh_TW,fr_FR,de_DE,ja_JP,zh_CN] | 否
buttons|`object`| - |{buttons:{cancelText:'取消',clearText:'清空已选',okText:'确认'}} 按钮文字展示| 否
emptyBut| `bool` | false| 清空按钮是否展示 |否
miniSearch| `Boolean`|true|默认是简单搜索|否
size|`String`|'lg'|modal的size|否
valueField |``string``|'refcode' |待提交的 value 的键。 | 否
showLoading | `bool` | false | 是否展示loading，多用于请求中| 否
<span style="color:red;">*</span>tableData | `Array` | — | 表体数据 | 否
<span style="color:red;">*</span>columsData | `Array`| — | 表头数据 | 否
pageCount |`number`| — |总页数 | 否
currPageIndex| `number`| — |当前页数 | 否
totalElements | `number`| — |一共多少条 | 否
dataNumSelect | `function()`| — |选择每页多少条的回调函数 | 否
handlePagination| `functitabon()`| — |切换页的方法 | 否
showModal | `bool` | false | 是否展示参照 ，true显示，false不显示| 否
onSave | `function(value)` | -- | 参照确定的回调| 否
onCancel | `function(value)` | -- | 参照取消的回调| 否
value| ``string``|空|默认值，初始化input框值|否
matchData | `Array` | [] | 选中的节点，macthData和value配合使用，当value中refpk不为空且matchData有值，选中节点从matchData中获取| 否
theme| `String` | 'ref-red' | 参照主题，现在就两种选择'ref-red'或者'ref-blue' | 否
onFilterChange| `function(field,value,condition)`| ()=>{} | 行内搜索回调函数 | 否
fliterColumn | `Array` | [] | 过滤条件，为空则没有行内搜索 | 否


### RefMultipleTableWithInput

除了使用上述<RefMultipleTableBaseUI/>的参数（showModal不可使用）还可以使用以下参数。

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
className |`string`|空 | 参照class样式，作用于弹出层的样式，默认为空。className若是ref-walsin-modal，那么弹出的参照是行内过滤表格参照，否则是默认表格参照 | 否 
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


### SearchPanelItem  
> 注意:以下参数为 `<SearchPanelItem/>`需要使用的，为了保证功能的正常使用请传入。

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
key | `String` | --- | key值 | 否
name | `String` | --- | getFieldProps(name, option)的name字段，设置表单元素name，不可以重复| 否
text| `String`| ---|搜索框的标题| 否


## 注意事项

## 更新日志