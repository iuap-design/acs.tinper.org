<!--
 * @Date: 2019-08-15 20:19:50
 * @LastEditTime: 2019-08-15 20:39:04
 -->
# 参照树形 RefTree 


## 何时使用

单选多选树形参照


## 如何使用

```sh
$ ynpm install ref-tree --save

引入

import RefTreeBaseUI from 'ref-tree';
或者
import { RefTreeWithInput } from 'ref-tree';

样式

import 'ref-tree/lib/index.css';

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
title |``string``|'弹窗标题' |打开上传的模态框显示的标题文字 | 否
className |`string`|空 | 参照class名，作用于弹出层，默认为空。使用'ref-walsin-modal'参照使用另外一种风格 | 否
showLoading | `bool` | false | 是否展示loading，多用于请求中| 否
backdrop |`bool`| true |弹出层是否有模态层，true 显示，false 不显示 | 否
lang|`string`| `zh_CN` |多语配置。取值范围[en_US,zh_TW,fr_FR,de_DE,ja_JP,zh_CN] | 否
buttons|`object`| - |{buttons:{cancelText:'取消',clearText:'清空已选',okText:'确认'}} 按钮文字展示| 否
emptyBut| `bool` | false| 清空按钮是否展示 |否
checkStrictly| `bool` |true |checkable状态下节点选择完全受控（父子节点选中状态不再关联）。checkStrictly=true性能更高，若checkStrictly取值为false，请注意matchData必须包含选中节点的所有子节点。|否
multiple |`bool`| false |是否单选， true 多选，false 单选， 同时多选时不会有确认和取消按钮，多选时会出现复选框 | 否
showLine | `bool` | false | 是否显示连接线 | 否
searchable |`bool`|false |是否显示搜索框，弹出层是否带有搜索框，true 显示，false 不显示。 | 否
lazyModal | `bool`|false | 树参照是异步加载，回调onLoadData | 否
onLoadData|  `function(treeNode)` | --| 懒加载传个树的回调方法。与lazyModal配合使用，lazyModal=true才会回调该函数| 否
defaultExpandAll |`bool`|true | 展开所有节点，true 展开，false 不展开。前提lazyModal是false，懒加载下该属性不起效。| 否
nodeDisplay |<code>string 或 function</code>|'{refname}' |指定树节点渲染内容，这里为了提供根据数据渲染节点图标使用。<br/>当为字符串时则会根据`{}`包裹的正则匹配替换。<br/>如： nodeDisplay:'{refname}'<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}。是树节点展示的内容| 否
treeData | `Array` | []| 树参照数据 | 否
showModal | `bool` | false | 是否展示参照 ，true显示，false不显示| 否
onSave | `function(arr)` | ()=>{} | 参照确定按钮的回调。arr是所有选中节点，数组形式。| 否
onCancel | `function()` | ()=>{} | 参照取消按钮的回调| 否
matchData | `Array` | [] | 选中的节点，选中节点只从matchData中获取。matchData是全部选中的数据| 否
theme| `String` | -- | 让theme=''并且引入项目样式文件，实现参照样式与项目样式保持一致。否则，不需要操作theme| 否
getRefTreeData|`function(value)` | --| 搜索的回调方法，value是搜索值| 否
valueField |`string`|'refpk' |指定真实数据的键。树节点key也是取valueField指定值 | 否
modalProps | `object`| {} | modal上其他属性，具体接收的参数参照bee-modal| 否
treeProps | `object`| {} | tree上其他属性，具体接收的参数参照bee-tree| 否
onTreeSelecting|`function(selectedArray,selectedKeys)` | --| 树节点选中回调，selectedArray全部选中数据，selectedKeys选中选中数据的键| 否
isLocalSearch |`bool`| false |树的搜索是否是前端搜索，false是调用函数getRefTreeData(value),true是前端搜索 | 否
footerBtnDom | `dom` | <span></span> | 自定义footer的按钮dom | 否


### RefTreeWithInput

RefTreeWithInput可以使用RefTreeBaseUI的参数（除了showModal），还可以使用以下参数。

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
treeNodeDisabledKey | `String` | - | 控制部分节点不可选。假如你传的 treeNodeDisabledKey={'leaf'}，意味着，后台接口返回的数据中只要leaf属性存在且为true，这个节点就不可以点击，这个key是后台商量的 | 否
treeNodeDisabledFunc |`function(node)`| 返回当前节点信息，return false，表示可选；return true，表示该节点不可选| 否 

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
    
