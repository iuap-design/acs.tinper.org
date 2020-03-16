# 复杂表格全编辑 AcGrids

简单表格、编辑表格，项目中需要引入`tinper-bee`的样式文件

## 何时使用

## 如何使用

```js

import { Grid, EditGrid } from 'ac-gridcn';
import 'ac-gridcn/build/Gridcn.css';

```

## 代码演示

## API

### Grid

等于 [bee-complex-grid](http://bee.tinper.org/tinper-acs/bee-complex-grid) 

### EditGrid

在 [bee-complex-grid](http://bee.tinper.org/tinper-acs/bee-complex-grid) 基础上新增如下api

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|delRow|删除回调|function|-|
|getSelectedDataFunc|选中回调|function|-|
|save|保存回调|function|-|
|title|标题，如果title值为string则使用此组件的title，如果title的值为function，则使用bee-table的title|string|-|
|defaultOpen|默认是否展开，需配合title为string使用|bool|true|
|hideSave|是否隐藏保存按钮，用于全部保存时|bool|false|
|powerBtns|有权限的按钮，也可作为控制哪些按钮显示使用|array|`['addRow','update','delRow','copyRow','export','min','max','cancel','save','copyToEnd']`|
|forcePowerBtns|不受权限控制按钮|array|`['cancel']`|



### columns

在 [table的columns API](http://bee.tinper.org/tinper-bee/bee-table#Column) 基础上新增如下api

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|renderType|表单类型|目前支持 `input/inputNumber/select/datepicker/year/refer`，正在继续完善，不写则不render成表单，注意如使用 `refer` 类型，需要写component属性，component属性如下|-|
|component|参照类型使用，`mdf-refer`参照需要引入 [`ac-gridcn-refer-field`](https://www.npmjs.com/package/ac-gridcn-refer-field)，并作为此属性传入||
|validate|是否校验|bool|-|
|required|是否必填|bool|-|
|message|必填校验失败错误信息|string|-|
|pattern|校验正则|RegExp|-|
|patternMessage|正则校验错误信息|string|-|
|filedProps|传给`field`的属性|string|-|


#### filedProps

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|defaultValue|新增时默认值|string|-|
|maxLength|最大长度，type=`input`时生效|string|-|
|options|type=`select` 时的下拉内容|bool|-|
|precision|小数点后保留几位小数，type=`inputNumber`生效|number|-|
|max|最大值，type=`inputNumber`生效|number|-|
|min|最小值，type=`inputNumber`生效|number|-|
|step|步进值，type=`inputNumber`生效|number|-|



 ## 注意事项

 - `field`这里代表 render出来的表单元素。例如：`type:'input'`，则 `formcontrol` 即为`field`

 ## 更新日志
