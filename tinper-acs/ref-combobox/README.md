# 下拉参照 RefCombobox

## 何时使用

下拉参照

## 如何使用

```sh
$ ynpm install ref-combobox --save

引入

import RefComboBoxBaseUI, {ComboStore,ComboItem} from 'ref-combobox';

样式

import 'ref-combobox/lib/index.css';

```

## 代码演示



## 分类

RefComboBoxBaseUI
    
    带有输入框，下拉选择参照。默认，需要配合使用下面两个

ComboStore
    
    可走缓存数据的下拉。

ComboItem
    
    下拉的单条数据

## API

### RefComboBoxBaseUI 

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
className |`string`|空 | 参照class样式，作用于整个参照的样式，默认为空。 'ref-walsin-modal'特殊样式| 否
style| `object`|{} | 参照style样式，作用域整个参照最外层|否
displayField |<code>string 或 function</code>|'{refname}' |记录中显示的值。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}| 否
valueField |`string`|'refcode' |待提交的 value 的键。 | 否
value| `string` | ''|输入框展示的值| 否
onClickItemInner | `function(record)`| -- | 下拉选中，返回缓存的数据对应的完整| 否
sliderWidth|`number`或者`String`| 'auto'| 下拉菜单的宽度|否
comboboxStoreData| `array` | [] | 下拉参照要展示dom集合，搭配<ComboItem>使用 | 否
storeData| `array` | [] | 下拉参照数据集合，不传入storeData会导致onClickItemInner不能返回对应的完整数据 | 否
onChangeFormControl| `function(value)` | - | 输入框输入值回调，value是输入内容 | 否
onPopupVisibleChange| `function(popupVisible,sliderSearchVal)` | -| 下拉面板状态改变时回调函数| 否
onSelect| `function(currentIndex)` | - | 翻页回调，返回当前页面| 否
pageCount | `number` | 1 | 总页数 | 否
currPageIndex| `number` | 0 | 当前页码 | 否
loading | `boolean` | false | 是否展示加载 | 否
totalElements | `number` | 0 | 总条数 | 否
theme| `String` | 'ref-red' | 参照主题，现在就两种选择'ref-red'或者'ref-blue' | 否

## ComboStore 增量 API

><span style="color: red; font-size: 15px;">注意:以下参数为 `<ComboStore/>`独有。对其他两个类型的引用无效。</span>

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
topPagination| `bool`| false
lang| `String`| 'zh_CN'| 分页多语 | 否



## ComboItem 增量 API

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
active| `bool`| false | 该条数据是否是选中 | 否
text| `String`| ''| 该条展示数据 | 否
value | `String`| ''| data-value,自定义属性 | 否


## 注意事项

## 更新日志