<!--
 * @Date: 2019-04-24 16:38:36
 * @LastEditTime: 2019-08-15 20:40:09
 -->
# 树穿梭参照 RefTreeTransfer

## 何时使用

树穿梭参照


## 如何使用

```
$ ynpm install ref-tree-transfer --save

引入

import RefTreeTransferBaseUI from 'ref-tree-transfer';
或者
import { RefTreeTransferWithInput } from 'ref-tree-transfe

样式

import 'ref-tree-transfer/lib/index.css';

```

## 代码演示

## 分类

RefTreeTransferBaseUI（默认）
    
    树穿梭参照通用ui
    
RefTreeTransferWithInput
    
    带文本框的参照弹出窗

## API

RefTreeTransferBaseUI接收的参数部分用于左树，部分用于右穿梭框。

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
title |``string``|空 |打开上传的模态框显示的标题文字 | 否
className |`string`|空 | 参照class样式，作用于弹出层和 RefTreeTransferWithInput 输入框的样式，默认为空。| 否
backdrop |`bool`| true |弹出层是否有模态层，true 显示，false 不显示 | 否
buttons|`object`| - |{buttons:{cancelText:'取消',clearText:'清空已选',okText:'确认'}} 按钮文字展示| 否
textOption | `object` | -- | 左边树和右边处穿梭框的标题<br /> 如：<br />{<br />    leftTitle:'树',<br />    rightTitle:'穿梭框',<br />leftTransferText:'左侧穿梭框上标题',<br/>rightTransferText:'右侧穿梭框上标题'}| 否
theme| `String` | 'ref-red' | 启用参照内部默认样式。theme=''，不使用参照默认样式。| 否
lang|`string`| `zh_CN` |多语配置。取值范围[en_US,zh_TW,fr_FR,de_DE,ja_JP,zh_CN] | 否
displayField |<code>string 或 function</code>|'{refname}' |右穿梭框显示的内容的格式。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}，是input展示value| 否
valueField |``string``|'refpk' |待提交的value的键。或者说指定真实数据的键。要求具有唯一性| 否
showModal| `Bool`| -- | 参照展开状态 | 否
onSave |`function( record:object )`|-- |保存回调函数，返回已选择的记录详细数据。 | 否
onCancel | `function(  )` |-- |关闭弹出层 | 否
modalProps | `object`| {} | modal上其他属性，具体接收的参数参照bee-modal| 否
transferProps| `object`| {} | modal上其他属性，具体接收的参数参照bee-transfer| 否


tree专用
参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
handleTreeSelect| `function(selectNode)` | --| 左树选择节点回调 | 否
treeData| `Array` | [] | 左树的数据| 否
nodeDisplay |<code>string 或 function</code>|'{refname}' |指定树节点渲染内容，这里为了提供根据数据渲染节点图标使用。<br/>当为字符串时则会根据`{}`包裹的正则匹配替换。<br/>如： nodeDisplay:'{refname}'<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}。是树节点展示的内容| 否
defaultExpandAll |`bool`| false| 展开所有节点，true 展开，false 不展开| 否


**左树tree默认checkStrictly={true}、multiple={false}**


transfer专用
参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
searchPlaceholder| `String` | '搜索' |穿梭框中搜索框的默认显示文字，bee-transfer使用字段 | 否
notFoundContent| `String或者ReactNode` | '<div>无数据</div>' |穿梭框中当没有相关内容的显示内容，bee-transfer使用字段	 | 否
refModelUrl |`object`|{tableBodyUrlSearch:''}| 右穿梭框最上方的搜索框，不是穿梭内部的搜索 | 是
onChangerightSearch`|function(value)`|-- | 右穿梭框最上方的搜索框的回调函数  | 否
transferData| `Array` | [] | 右穿梭的数据| 否
targetKeys| `Array` | [] | 右穿梭右表中选中的数据对应valuefield字段的值| 否
setTargetKeys| `function(targetKeys)` | --| 右穿梭选中数据触发，将穿梭右侧选中的数据传过去 | 否


## RefTreeTransferWithInput 增量 API
RefTreeTransferWithInput可以使用RefTreeTransferBaseUI的参数（除了showModal），还可以使用以下参数。

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
dropdownDisabled | `boolean` | false |下拉展示是否可以弹出，false为有，true为没有|否

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
    
