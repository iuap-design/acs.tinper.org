# ref-tree 参照树形


## 何时使用
>单选多选树形参照通用ui


## 如何使用

```
$ ynpm install ref-tree@2.0.0-beta.0 --save

引入

import RefTreeBaseUI from 'ref-tree';

样式

import 'ref-tree/dist/index.css';

```

## 代码演示


## API

### RefTreeBaseUI

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
className |`string`|空 | 参照class样式，作用于弹出层的样式，默认为空。 | 否
title |``string``|空 |打开上传的模态框显示的标题文字 | 否
className |`string`|空 | 参照class样式，作用sh于弹出层的样式，默认为空。'ref-walsin-modal'参照使用另外一种风格 | 否
showLoading | `bool` | false | 是否展示loading，多用于请求中| 否
backdrop |`bool`| true |弹出层是否有模态层，true 显示，false 不显示 | 否
lang|`string`| `zh_TW` |多语配置，详情查看参数详解 | 否
buttons|`object`| - |{buttons:{cancelText:'',confirmText:'',okText:''}} 按钮文字展示| 否
emptyBut| `bool` | false| 清空按钮是否展示 |否
valueField |``string``|'refcode' |待提交的 value 的键。 | 否
nodeDisplay |<code>string 或 function</code>| `{refname}` |节点渲染时可匹配的内容，这里为了提供根据数据渲染节点图标使用 | 否
checkStrictly| `bool` | checkable状态下节点选择完全受控（父子节点选中状态不再关联）|否
multiple |`bool`| false |是否单选， true 多选，false 单选， 同时多选时不会有确认和取消按钮，多选时会出现复选框 | 否
searchable |`bool`|true |是否显示搜索框，弹出层是否带有搜索框，true 显示，false 不显示。 | 否
defaultExpandAll |`bool`|false |展开所有节点 true 展开，false 不展开 | 否
nodeDisplay |<code>string 或 function</code>|'{refname}' |指定树节点渲染内容。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}。是树节点展示的内容| 否
treeData | `Array` | []| 树参照数据 | 否
showModal | `bool` | false | 是否展示参照 ，true显示，false不显示(<span style="color: red; font-size: 15px;">refcorewithinput可以提供</span>)| 否
onSave | `function(value)` | -- | 参照确定的回调(<span style="color: red; font-size: 15px;">refcorewithinput可以提供</span>)| 否
onCancel | `function(value)` | -- | 参照取消的回调(<span style="color: red; font-size: 15px;">refcorewithinput可以提供</span>)| 否
value| ``string``|空|默认值，RefWithInput和参照组件都会使用，可以初始化树选中的节点。例如 `'{"refname":"初级-T1","refpk":"level1"}'`。|否
matchData | `Array` | [] | 传给树选中的节点(<span style="color: red; font-size: 15px;">macthData优先，其次是value</span>)| 否

### RefWithInput  API
<span style="color: red; font-size: 15px;">注意：RefWithInput（ref-core）可以和RefTreeBaseUI配套使用，下面是RefWithInput可以接收的参数，以及RefWithInput给RefTreBaseUI提供的参数</span>

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
checkedArray | `Array` | [] | 传给参照选中的节点，所以参照中选中节点通过value和matchData来控制| 否
onMatchInitValue| `function(value)` | onMatchInitValue = (checkedArray) => {this.setState({checkedArray})} | 更改checkedArray | 否

## 注意事项
 > RefCoreWithInput提供的参数可以保证参照组件showModal关闭打开，因此在使用RefCoreWithInput就不需要额外手动维护showModal
 
 > RefCoreWithInput使用value来展示input的值，参照组件使用matchData来初始化选中节点，若matchData为空，使用value来初始化参照中checkedArray（树组件可以，表不可以）

> 注意：modalShow在refcorewithinput中有提供。因此若是refcorewithinput和refmultipletablebaseui配合使用，注意showModal onSave onCancel

### RefTreeBaseUI
    
    树的通用ui，只有一个树组件

### RefTree

    参照弹出窗，没有输入框，使用时可根据自己需要定义具体的文本框。实质是RefCoreGlobal和RefTreeBaseUI的组合

### RefTreeWithInput
     带文本框的参照弹出窗。在 RefTree 基础上封装实现，RefWithInput和 RefTree组合。
  
### createRefTree
     非 ReactJS 调用方式，与 RefTree 相同没有输入框，使用时可根据自己需要定义具体的文本框。
  
### createRefTreeWithInput
    非 ReactJS 调用方式，与  RefTreeTableWithInput 相同带文本框的参照弹出窗。

## 更新日志