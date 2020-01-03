# 复杂表格 AcGrids

简单表格、编辑表格，项目中需要引入`tinper-bee`的样式文件

## 何时使用

## 如何使用

```js

import AcGrids from 'ac-grids';
import 'ac-grids/build/AcGrids.css';
const EditGrid = AcGrids.EditGrid;

```

## 代码演示

## API

### Grid

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|data|数据|array|[]|
|columns|列|array|[]|
|paginationObj|分页属性|同分页组件|-|
|showPagination|是否显示分页|bool|true|
|showTooltip|是否显示tooltip|bool|false|
|showIndex|是否显示序号列|bool|false|


### EditGrid

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|data|数据|array|[]|
|columns|列|array|[]|
|title|标题|string|-|
|onOpenChange|展开收起回调|function|-|
|onChange|数据改变、选中时的回调|function|-|
|disabled|是否可编辑|bool|-|
|onDel|删除的回调|function|-|
|defaultOpen|默认是否打开|bool|-|
|showIndex|是否显示序号列|bool|true|
|excludeKeys|粘贴时不需要粘贴的key值合集|array|[]|


### columns

参考 [table的columns API](http://bee.tinper.org/tinper-bee/bee-table#Column)

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|renderType|表单类型|目前支持 `input/inputNumber/select/datepicker/year`，正在继续完善，不写则不render成表单|-|
|customizeRender|自定义render表单元素，此组件封装要遵循的规则较多，目前已封装`ac-grids-refer-field` mdf-refer参照使用的render，[组件参考地址](https://github.com/tinper-acs/ac-grids-refer-field)，文档持续完善|node|-|
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
|disabled|字段是否禁止输入|bool|-|
|maxLength|最大长度，type=`input`时生效|string|-|
|placeholder|输入框的提示信息，type=`input`时生效|string|-|
|options|type=`select` 时的下拉内容|bool|-|
|precision|小数点后保留几位小数，type=`inputNumber`生效|number|-|
|max|最大值，type=`inputNumber`生效|number|-|
|min|最小值，type=`inputNumber`生效|number|-|
|step|步进值，type=`inputNumber`生效|number|-|



 ## 注意事项

 - `field`这里代表 render出来的表单元素。例如：`type:'input'`，则 `formcontrol` 即为`field`
 - `EditGrid` 在使用 `renderType` 时，不支持自定义行列合并

 ## 更新日志
