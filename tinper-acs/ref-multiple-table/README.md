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


## API

### RefMultipleTableBaseUI

以下参数为 `<RefMultipleTableBaseUI/>`需要使用的，为了保证功能的正常使用请传入。

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
className |`string`|-- | 参照class样式，作用于弹出层的样式，默认为空。 | 否
title |``string``|'' |打开上传的模态框显示的标题文字 | 否
backdrop |`bool`| true |弹出层是否有模态层，true 显示，false 不显示 | 否
lang|`string`| `zh_CN` |多语配置。取值范围[en_US,zh_TW,fr_FR,de_DE,ja_JP,zh_CN] | 否
buttons|`object`| - |{buttons:{cancelText:'取消',clearText:'清空已选',okText:'确认'}} 按钮文字展示| 否
emptyBut| `bool` | false| 清空按钮是否展示 |否
miniSearch| `bool`|true|默认是简单搜索。miniSearch=true则只展示简单搜索|否
size|`String`|'lg'|modal的size|否
valueField |``string``|'refpk' |待提交的value的键。或者说指定真实数据的键。要求具有唯一性| 否
searchFilterInfo | `function(value)`| - | 复杂搜索的查询回调，将搜索条件带回。| 否
miniSearchFunc| `function(value)`|- |  简单搜索的实时查询回调，将搜索条件带回| 否
onSearchClick| `function(value)`|- | 简单搜索的点击搜索按钮查询回调，将搜索条件带回| 否
showLoading | `bool` | -- | 是否展示loading| 否
<span style="color:red;">*</span>fliterFormInputs| `Array`| -- | 查询条件的dom，配合SearchPanelItem一起使用。| 否
<span style="color:red;">*</span>tableData | `Array` | — | 表体数据 | 否
<span style="color:red;">*</span>columsData | `Array`| — | 表头数据 | 否
pageCount |`number`| 1 |分页组件总页数 | 否
currPageIndex| `number`| 1 |当前页数 | 否
totalElements | `number`| — |一共多少条 | 否
dataNumSelect | `function(index,pagesize)`| — |选择每页多少条的回调函数 | 否
handlePagination| `function(currenIndex)`| — |切换页的方法 | 否
showModal | `bool` | false | 是否展示参照 ，true显示，false不显示| 否
onSave | `function(value)` | -- | 参照确定的回调| 否
onCancel | `function()` | -- | 参照取消的回调| 否
matchData | `Array` | [] | 选中的节点，选中节点只从matchData中获取。matchData是全部选中的数据| 否
theme| `String` | 'ref-red' | 启用参照内部默认样式。theme=''，不使用参照默认样式。| 否
searchPanelLocale | `Object` | {'title': '条件筛选','resetName': '重置','searchName': '查询','down':'打开','up':'关闭',} | 复杂搜索标题，按钮的文字等信息。与组件bee-search-panel保持一致 | 否
mustPaginationShow | `bool` | false | true必须展示分页、false，当pageCount>1才展示分页| 否
tableProps | `object`| {} | table上其他属性，具体接收的参数参照bee-table| 否
modalProps | `object`| {} | modal上其他属性，具体接收的参数参照bee-modal| 否
paginationProps | `object`| {} | 具体接收的参数参照bee-pagination| 否
searchPlaceholder| `String` | '搜索' | 打开弹框上简单搜索的placeholder | 否


### RefMultipleTableWithInput
RefMultipleTableWithInput可以使用RefMultipleTableBaseUI的参数（除了showModal），还可以使用以下参数。

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
wrapClassName|`string`|空 | 文本框的class样，默认为空。 | 否
placeholder|`string`| 空 |文本框的 placeholder | 否
style| `object`| {width:200}| 文本框的style，默认宽度200px | 否 
filterUrl| `string`|空|快捷录入接口。|否
filterUrlFunc| `function(value)` | ()=>{} | 必须配合filterUrl使用，当filterUrl为空或者不传入，才会回调filterUrlFunc | 否
filterData| `Array`| [] | 必须配合filterUrlFunc使用，filterData是过滤列表全部数据| 否
displayField |<code>string 或 function</code>|'{refname}' |~~input中显示的内容的格式和~~过滤列表显示的内容格式。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`{refname}`<br/>当为函数时则需自定义返回内容，参数为迭代已的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}，是input展示value| 否
inputDisplay | <code>string 或 function</code>|'{refname}' |input中显示的内容的格式。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`{refname}`<br/>当为函数时则需自定义返回内容，参数为迭代已的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}，是input展示value| 否
value| `string|array[object]`| 空 |带有input框参照的input默认值，展示形式配合displayField。格式符合`'{"refname":"初级-T1","refpk":"level1"}'`。refname和refpk必须有，refpk表示该条数据的键，应取valueFiled指定值。或者数组格式(适合多选)，[object1,object2...]|否
disabled|`bool`| false |禁用整个input框 | 否
onChange|`function(values, record)`|--| value改变、选中过滤数据和保存时数据回调。values是obj，格式{'refname':'','refpk':''},record是该条完整数据|否
canClickGoOn|`function()`| ()=>{return true}|当点击文本框右侧弹出按钮时是否打开modal<br>适用于级联情况下当选择不全时的处理| 否 
canInputGoOn|`function()`| ()=>{return true}|当点击文本框触发快捷录入时是否可以录入<br>适用于级联情况下当选择不全时的处理| 否 
menuIcon| `dom` | <span><i className="uf uf-navmenu"></i></span> | input框参照打开按钮，默认汉堡按钮 | 否
footerBtnDom | `dom` | <span></span> | 自定义footer的按钮dom | 否

## 注意事项

#### 参数解析

- 1.input框的展示值

    - 1.1 input框的初始值，只从value的refname中获取
    - 1.2 参照进行保存操作之后（点击参照确认按钮），input框展示由inputDisplay来决定

- 2.value、inputDisplay、 displayField
  
    2.1 value和inputDisplay是针对input框来说。

    2.2 value格式可以是`'{"refname":"初级-T1","refpk":"level1"}'`或者数组[object1,object2...]。refname字段不可变，refpk是该数据键，要求具有唯一性；object中应包含数据项具体信息。
   
    2.3 inputDisplay确定input中显示内容的格式，displayField过滤列表显示内容的格式。inputDisplay和displayField中使用到的字段必须是filterData,matchData和treeData数据项中都含有的字段。
    
    **inputDisplay和displayField具体使用参考demo3**
   
    > 注意：value格式是`'{"refname":"初级-T1","refpk":"level1"}'`，inputDisplay只包含refname或者refpk

- 3.value、valueFiled
  
    value初始化input框值，是input需要使用的数据，要求如上。
    valueFiled指定数据源的键，要求具有唯一性。
    因此value中refpk指定值应与valueFiled取值一致。
   
    > 注意，在多选情况下，value是字符串`'{"refname":"初级-T1","refpk":"level1"}'`格式，那么valueFiled只能指定是`refpk`；value是数组，valueField可以是其他字段 **具体使用参考demo3**

- 4.value、matchData
  
    value初始化input框值，matchData是指定参照中选中的节点。**具体参照demo3，value与matchData并不完全相同**

    - 4.1 如果value有值matchData为空，那么input有值但是参照无选中数据；
    - 4.2 反之value空值matchData有值，那么input为空但是参照有选中数据；
    - 4.3 如果value与matchData都有值，但是不匹配，树中选中数据按照matchData。

## 更新日志
    
