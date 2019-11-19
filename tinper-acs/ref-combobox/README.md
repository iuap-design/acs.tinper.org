# 下拉参照 RefCombobox

## 何时使用

下拉参照

## 如何使用

```sh
$ ynpm install ref-combobox --save

引入

import RefComboBoxBaseUI from 'ref-combobox';

样式

import 'ref-combobox/lib/index.css';
或者
import 'ref-combobox/lib/index.less';

```

## 代码演示



## 分类

RefComboBoxBaseUI
    
    带有输入框，下拉选择参照。默认，需要配合使用下面两个

[Deprecated]ComboStore
    
    可走缓存数据的下拉。

[Deprecated]ComboItem
    
    下拉的单条数据

## API

### RefComboBoxBaseUI 

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
 className |`string`|空 | 参照class样式，作用于整个参照的样式，默认为空。 'ref-walsin-modal'特殊样式| 否
 theme| `String` | 'ref-red' | 启用参照默认样式 | 否
 style| `object`|{} | 参照style样式|否
 dropdownStyle|object| - | 下拉菜单的样式|否
 disabled |  boolean | false |是否禁用 |否 |
 defaultOpen | boolean | -| 默认是否打开 | 否 |
 dropdownClassName | string | - |下拉菜单的 className 属性 | 否 |
dropdownMatchSelectWidth |boolean | true | 下拉菜单和选择器同宽 | 否 |
dropdownStyle | object | - |下拉菜单的样式 | 否 |
notFoundContent |  String | '无匹配结果' |设定搜索不到数据显示的内容 |否 |
multiple |  boolean | false | 支持多选|否 |
placeholder |  string | - | 选择框默认文字 |否 |
searchPlaceholder | string | - |  搜索框默认文字 | 否 |
maxTagCount | number | - |否 最多显示的tag数 |  |
maxTagPlaceholder | ReactNode/function(omittedValues) | - | 隐藏 tag 时显示的内容 | 否 |
searchValue | string | - |搜索框值 | 否 |
pageCount | `number` | 10 | 总页数 | 否
currPageIndex| `number` | 0 | 当前页码 | 否
loading | `boolean` | -- | 是否展示加载 | 否
totalElements | `number` | 0 | 总条数 | 否
displayField |<code>string 或 function</code> | '{refname}' |下拉显示的内容的格式；<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`{refname}`<br/>当为函数时则需自定义返回内容，参数为storeData中的数据项。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}| 否 | 
inputDisplay |<code>string 或 function</code>|'{refname}' |input中显示的内容的格式<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`{refname}`<br/>当为函数时则需自定义返回内容，参数有两种：1：来源于value或者defaultValue；2：下拉选中storeData的数据项 <br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}。注意inputDisplay有字段限制| 否 |
valueField |``string``|'refpk' |待提交的value的键。指定storeData数据项的键。要求具有唯一性| 否
| defaultValue | string/string\[] | - | 指定默认选中的条目。格式同value |否 |
value| `string/array`|-|指定当前选中的条目。可以是字符串格式或者数组格式。（一）字符串格式：其格式必须满足'{"refname":"","refpk":""}',refname是展示input框上的内容，格式自定义，多选以逗号隔开；refpk对应的是refname每项的键值，这个值要与valueField指定的值一样，此时使用inputDisplay注意，有字段限制。（二）数组格式：[{value:'',label:'',refname:''...}]，必须含有valueField指定的字段，展示按照inputField | string或者[] | - |
onPaginationSelect| `function(currentIndex)` | - | 翻页回调，返回当前页面。替换之前的onChangeFormControlt| 否
onSeach| `function(value)` | - | 搜索框输入值回调，value是输入内容 。替换之前的onForm| 否
onSelectorChange | `function(selectedArray,item,status)`| -- |当input框值发生改变会回调此函数。status：选中还是删除该节点，id：valueField指定的字段值，item：该条完整数据，selectedArray：当前选中的全部数据。触发的情形：1.清空操作，返回参数（false,null,null,[]）;2.单选或者多选下拉选中数据；3.多选下删除单个数据；4.多选下delete删除数据| 否
disabled| `Boolean` | false | 是否禁用下拉参照 | 否
placeholder| `String` | '' | placeholder | 否
[Deprecated]sliderWidth|`number`或者`String`|  下拉菜单的宽度|否
[Deprecated]comboboxStoreData| `array` | [] | 下拉参照要展示dom集合，搭配<ComboItem>使用 | 否
[Deprecated]onClickItemInner | `function(selectedArray,item, status)`| -- | 下拉选中，返回缓存的数据对应的数据。在没有传storeData情形下，不能返回完整数据，只能返回数据键值，展示值和event。id是键，item完整数据，status是选中还是删除，selectedArray是当前选中全部数据| 否
[Deprecated]onChangeFormControl| `function(value)` | - | 输入框输入值回调，value是输入内容或者清空回调 | 否
[Deprecated]onSelect| `function(currentIndex)` | - | 翻页回调，返回跳转页面| 否
[Deprecated]onPopupVisibleChange| `function(popupVisible,sliderSearchVal)` | -| 下拉面板状态改变时回调函数| 否

## 注意事项

#### 参数解析
1.value vs displayField vs inputDisplay

- 1.1 displayField指定下拉列表menu的每条数据如何展示，可以带有icon
```js
displayField : (record) => {
    return 
    <div > 
       <Icon type="uf-personin-o" style={{ color: 'red' }} />     {record.refname}-{record.refcode}-{record.type}
    </div>
}
```

- 1.2 inputDisplay 指定input框上的值如何展示，inputDisplay与value的格式有很大关系。
   -  1.2.1 字符串格式：value='{"refname":"用友集团1,用友集团2","refpk":"org1,org2"}'
     inputDisplay指定的字段只能包含refname和refpk。
   - 1.2.2 数组格式： value=[{label1:'label1',label2:'',label3:'',....,[valueField]:'键值'}]
      inputDisplay指定的字段可以是label1~[valueField]

```js
value:[{refname:'用友',refpk:'org1',id:'no.1'}]
inputDisplay:(record) =>{
  return `${record.refname}-${record.id}`
}

```

2.多选功能下拉参照以及函数改名是在2.1.0稳定版本开始


## 更新日志