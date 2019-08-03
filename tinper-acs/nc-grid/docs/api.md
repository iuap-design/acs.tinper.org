# 复杂表格 NCGrid


 ## 何时使用


 ## 如何使用

```
import NCGrid from 'nc-grid';
import 'nc-grid/build/NCGrid.css';

const SimpleTable = NCGrid.SimpleTable;
```

## 代码演示

## API

### SimpleTable

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|data|传入的表格数据|array|-|
|columns|表格列数组|array|-|
|isMultipleHead|是否为多表头|bool|false|
|multiSelect|是否使用多选功能|bool|false|
|totalData|合计行数据|array|-|
|totalColums|合计行列配置|array|-|
|totalColums|合计行列配置|array|-|
|showPagination|是否显示分页|bool|false|
|pageIndexChange|分页切换页码时的回调|function|-|
|pageSizeChange|分页改变下拉选项时的回调|function|-|
|pageInfo|包含 {pageIndex, pageSize, total, totalPage} 的对象|object|-|
|config|表格配置项|object|-|

### CardTable
|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|data|传入的表格数据|array|-|
|columns|表格列数组|array|-|
|tabLists|卡表的 tabs 页签|array|-|
|moduleId|表格id标识|string|-|
|showMore|是否展开详细信息|bool|true|
|showMax|是否使用最大化/最小化|bool|false|
|showListView|是否以列表形式展示|bool|false|
|onTabChange|切换 Tab 时触发的回调|func|-|

### EditTable
|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|showCheck|是否开启多选功能|bool|-|
|showIndex|是否显示序号列|bool|-|
|isAddRow|编辑后增行|bool|-|
|isEdit|true为编辑态；false为浏览态|bool|false|
|onSelected|勾选行时的回调|func|-|
|onSelectedAll|全选时的回调|func|-|
|showPagination|是否显示分页|bool|false|
|getTableRows|获取表格数据时返回的回调|func|-|

 ## 注意事项

 暂无

 ## 更新日志