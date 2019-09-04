
# 参照组件 mdfRefer 

## 何时使用

使用mdf逻辑的参照

## 如何使用

```
import MdfRefer,{cb} from 'mdf-refer'

1.首先创建model对象

let model = new cb.models.ReferModel({
    cRefType:'ucf-org-center.org_assets_tree_ref',
    multiple:true,
    displayname:'name',
    valueField:'id',
    text:'ybt01__智能公司',
});

2. 可以添加方法

let config = {};
config.modelconfig ={
    afterOkClick:this.afterOkClick
}

3.调用参照

cb.utils.initSupport('refer',this.model,config)

或者

<MdfRefer modelName={'refer'} model={this.model} config={config} ></MdfRefer>


如果配合bee-form组件使用时候建议使用第二种

```

## 代码演示


## API 

|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
| ReferModel | 初始化model方法，来自于cb.models。接收的参数如下| `function` | - 
| （ReferModel参数）cRefType | 指定参照的refCode | `string` | -
| （ReferModel参数）multiple | 指定参照单选多选 | `boolean` | false
| （ReferModel参数）displayname | 指定参照确定后展示的字段 | `string` | 'name'
| （ReferModel参数）valueField | 指定参照数据的主键  | `string` | 'id'
| （ReferModel参数）text | 指定参照的初始值，并且打开参照会按照此值搜索 | `string` | ''
|  config | 初始化model时，传入的config，一些绑定的方法可以在这里 。接收的参数如下| `object` | {}
| （config参数）modelconfig | 指定参照的其他属性 | `object` | 
| (modelconfig参数)afterOkClick  | 参照确定的回调函数,data是数组格式 | function(data) | -
| (modelconfig参数)afterValueChange  | 参照值改变的回调。data是对象，有value：参照选中的数据（多选是数组，单选是对象），oldValue：之前选中的值，obj={text:'',value:'',select:{}/[]}| function(data) | -

### model对象上的方法

mdf-refer参照不同于其他参照组件，组件本身上不提供过多api，主要的操作方式在第一步创建的model对象上

|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
browse| 打开参照 | `function` | - 
clear | 清空参照选中数据，model.clear(false);//清空 model.clear(true);//参照恢复到默认值
getCondition |  获取 condition 字段值| `function` | - 
getFilter |  获取 filter 字段值| `function` | - 
getReturnFields | 获取bill2ReferKeyFieldMap 字段值 |  `function` | - 
getSelectedNodes | 获取select 字段值 |   `function` | - 
getTreeFilter | 获取 treeFilter 字段值| `function` | - 
getValue | 获取 value 字段值 | `function` | - 
modelType | 获取当前model类型  |`string` | - 
setCondition | 设置 condition 字段| `function(data)` | - 
setData | 设置 value 和 text 字段| `function(data)` | - 
setFilter | 设置 filter 字段| `function(filter)` | - 
setRefCode | 设置参照的refCode，删除缓存中的参照实体 | `function(newRefCode)` | - 
setRefReturn| 设置 textField 字段  |`function(ret)` | - 
setReturnFields | 设置bill2ReferKeyFieldMap 字段 |  `function(fields)` | - 
setTreeFilter | 设置 treeFilter 字段| `function(filter)` | - 
setValue| 设置参照的值，接收两个参数data,boolean。boolean为true表示会回调 events中的afterValueChange，false表示不调用回调函数直接setData。data可以是array或者string| `function([],true)` | - 
_get_data| 获取new cb.models.ReferModel传入的所有参数和上面提到的字段 | `function` | - 
_set_data |  改变_get_data中所有可获取的字段的值 | `function` | - 
_del_data | 删除_get_data中所有可获取的字段的某个字段 | `function` | - 

## 注意事项

暂无

## 更新日志

