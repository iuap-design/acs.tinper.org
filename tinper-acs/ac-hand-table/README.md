## 电子表格 HandTable
ac-hand-table 是基于 `handsontable` 的适用于 React 框架的电子表格，它提供了数据绑定、数据验证、行过滤、列排序、表格多选、表格样式、表头交互、表头拖拽、行高拖拽、行交换等操作

## 如何使用
使用 npm 安装最新版本

```
$ npm install ac-hand-table  --save

引入
import AcHandTable from 'ac-hand-table';
样式
import 'ac-hand-table/dist/index.css';

```

## 代码演示

## API
### AcHandTable
|参数|说明|类型|默认值|
|:--|:---|:--|:--|
|id|组件唯一id|string|-|
|data|表格数据数据|array|[]|
|columns|列的配置表，具体配置见下表|array|[]|
|language|表格语言|'zh-CN'或 'en-US'或 'zh-TW'|'zh-CN'|
|rowHeaders|表头信息|`boolean`或 `array`或 `function` (index)=>{}|true|
|colWidths|列宽|`number` 100或 `string` '100px'或 `array` [100,200]或 `func` (index)=>{}|-|
|rowHeights|列宽|`number` 100或 `string` '100px'或 `array` [100,200]或 `func` (index)=>{}|-|
|width|表格总宽度|'%' 或 'px'|-|
|height|表格总高度|'%' 或 'px' 或 'auto'|-|
|multiSelect|是否含有多选框|boolean|true|
|manualColumnResize|是否列宽可以拖动|boolean|true|
|manualColumnMove|是否列可以交换|boolean|false|
|manualRowResize|是否行高可以拖动|boolean|false|
|manualRowMove|是否行可以交换|boolean|false|
|fixedColumnsLeft|列左固定|number|-|
|fixedColumnsRight|列右固定|number|-|
|fixedRowsBottom|行头固定|number|-|
|fixedRowsTop|行头固定|number|-|
|manualColumnFreeze|是否开启固定列|boolean|true|
|copyPaste|是否可以复制粘贴|boolean|true|
|customBorders|是否开启边框设置|boolean|true|
|copyable|是否开启键盘复制|boolean|true|
|allowInsertColumn|是否开启插入列|boolean|true|
|allowInsertRow|是否开启插入行|boolean|true|
|multiColumnSorting|是否列可以排序|boolean|true|
|dropdownMenu|表上下文下拉菜单|`boolean` 或 `array` [见下表 dropdownMenu contextMenu]() |false|
|contextMenu|行上下文下拉菜单|`boolean` 或 `array` [ 见下表 dropdownMenu contextMenu]() |false|
|filters|表头下拉菜单中是否启动过滤器|boolean|false|
|stretchH|表宽度不等于所有列宽的计算总和时，列宽设置|'none'或 'all' 或'last'|'none'|
|rowStyle|行设置样式|func|-|
|activeHeaderClassName|选中列标题样式|strig|-|
|columnHeaderHeight|列表头高|number|25|
|fixedShadow|是否固定表格阴影|boolean|false|
|fixedColumnsLeft|固定表格列|number|-|
|fixedRowsTop|是否固定表格顶部|number|-|
|fixedRowsBottom|是否固定表格底部|number|-|
|nestedHeaders|多表头|array `[['a','b']]`或者`[['a',{label:'b',colspan:2}]]` |-|
|fillHandle|自动填充设置|`boolean` 或 `string`('vertical' or 'horizontal') 或者 `object`[见下表 fillHandle]()|'vertical'|


### dropdownMenu contextMenu
|键|说明|额外条件|
|:--|:---|:--|
|row_above|在选中行上方插入行|-|
|row_below|在选中行下方插入行|-|
|col_left|插入列左侧操作|-|
|col_right|插入列右侧操作|-|
|---------|	分隔器	|-|
|remove_row|删除行动作	|-|
|remove_col|删除列操作|-|
|clear_column|清除列值操作	|-|
|undo|撤消操作|undoRedo已开启|-|
|redo|重做动作|undoRedo已开启|
|make_read_only|进行只读操作|-|
|alignment|	对齐操作|-|
|cut|剪切操作|copyPaste打开|
|copy|复制操作|copyPaste打开|
|merge_cells|合并单元格|-|
|freeze_column|锁定列操作|	manualColumnFreeze已开启|
|unfreeze_column|解锁列操作|	manualColumnFreeze已开启|
|borders|自定义边框操作|	customBorders已开启|
|allowEmpty|是否日期可以值为空|boolean|true|

### Column
|参数|说明|类型|默认值|
|:--|:---|:--|:--|
|data|列的键,支持'date.xx'|string|-|
|type|数据类型 `text` `numeric` `date` `time` `checkbox`  `select` `dropdown` `autocomplete` `password` `refMultipleTable` `refTreeWithInput` `refTreeTableWithInput` `refTreeTransferWithInput`|string|true|
|className|样式名|string|-|
|readOnly|是否数据仅可读|boolean|false|
|readOnlyCellClassName|自定义只读表格样式|string|-|
|textTooltip|表格内容超出表格的宽出现 ...|boolean|true|
|editor|是否数据可以编辑|boolean|true|
|strict|是否输入到单元格的值区分大小写|boolean|false|
|placeholder|单元格占位文字|string|-|
|tableClassName|表格样式类名|string|-|
|dateFormat|日期格式|string|-|
|correctFormat|当前日期是否格式化|boolean|true|
|defaultDate|默认日期|string|-|
|source|数据类型 'autocomplete' 或 'dropdown' 数据源|`array` `func` (query,callback)=>{}|''|
|numericFormat|数字类型格式化|object|-|
|multiColumnSorting|打开多列排序|boolean 或 object|false|
|allowInvalid|数据校验失败是否可以操作其他表格|boolean|true|
|allowEmpty|是否日期可以值为空|boolean|true|
|validator|自定义验证方法|`func` (value,callback)=>{}|-|
|onClick|表格点击事件|`func` (rowData, rowNum, value)=>{}|-|
|dblClick|表格双击事件|`func` (rowData, rowNum, value)=>{}|-|
|onChangeCell|表格值变化事件|`func` (rowData, rowNum)=>{}|-|
|refSource|参照数据回调|`func` (value, type, callback)=>{} 'type'值为`auto` `tree` `table`|-|
|refOnChange|参照选中回调|`func` (refData, rowData, rowNum)=>{}|-|
|refConfig|参照配置|[见下表 refConfig]()|-|
|customValue|自定义表格内容渲染,通常用于表格联动|(rowData)=>{}|-|
|renderer|自定义表格渲染，支持dom|(instance, td, row, col, prop, value, cellProperties)=>{}|-|

### refConfig [更多参考](http://bee.tinpfer.org/tinper-acs/)
|参数|说明|类型|默认值|
|:--|:---|:--|:--|
|columnsKey|获取参照选中对象的值，约定数组第一个为表格回写值|array|['refname','refcode']|
|rowKey|拖拽修改值关联key|array|-|
|isThreeBar|表格中是否出现三道杠icon|boolean|false|
|columnsData|表头数据|array|-|
|tableData|表体数据|array|-|
|columnsData|表头数据|array|-|
|treeData|树参照数据|array|-|


### multiColumnSorting
|参数|说明|类型|默认值|
|:--|:---|:--|:--|
|initialConfig|某些列初始排序状态|object|-|
|indicator|是否显示排序顺序指示符(小箭头)|boolean|true|
|sortEmptyCells|是否空单元格应该参与排序|boolean|true|
|headerAction|是否单击标题应该对表进行排序|boolean|true|
|compareFunctionFactory|自定义比较函数|(sortOrder, columnMeta)=>{}|-|


### numericFormat
|参数|说明|类型|默认值|
|:--|:---|:--|:--|
|pattern|数字模式 [具体参考](http://numbrojs.com/old-format.html)|string|-|
|culture|货币处理 [具体参考](http://numbrojs.com/languages.html#supported-languages)|string|-|

### fillHandle
|参数|说明|类型|默认值|
|:--|:---|:--|:--|
|autoInsertRow|填充到最后一行是否自动添加行|boolean|true|
|direction|自动填充方向|string 值为`vertical` `horizontal` |'vertical'|

### csvConfig
|参数|说明|类型|默认值|
|:--|:---|:--|:--|
|filename|将导出文件名|string|`CSV_[YYYY]-[MM]-[DD]`|
|exportHiddenRows|在导出的文件中包含隐藏的行|boolean|true|
|exportHiddenColumns|在导出的文件中包含隐藏列|boolean|true|
|columnHeaders|在导出的文件中包含列标题|boolean|true|
|rowHeaders|在导出的文件中包含行标题|boolean|true|
|columnDelimiter|列分隔符|string|','|
|rowDelimiter|行分隔符|string|`\r\n`|
|range|将导出到文件的单元格范围|[]|-|
|mimeType|将导出文件类型|string|"text/csv"|


### 获取表格里的数据
```js
 getData = () => {
    // 获取数据
    this.child.getData((data) => {
      console.log('data', data);
    });
  };
```
### 表格添加行
```js
  onInsertRowData = () => {
    // onInsertRowData(number,source)
    // number 插入行的位置，0 为行首，-1 为行尾
    // source 插入的行对象，
    this.child.onInsertRowData(); // 默认行首，空对象
  };
```

### 删除多选选中的行
```js

 onDelRowCheck = () => {
     this.child.onDelRowCheck();
  };

```
### 获取验证通过后数据
```js

  getData = (callback) => {
    this.child.getData((data) => {
      console.log('data', data);
    });
  };

```

###  获取多选选中的数据
```js

 getCheckData = () => {
     const checkboxData = this.child.getCheckbox();
     console.log('checkboxData', checkboxData);
 };

```

### 获取被修改后的数据
```js
  getUpdateData = () => {
    const updateData = this.child.getUpdateData();
    console.log('updateData', updateData);
  };
```

### 获取被格式化的数据
```js
  getFormatData = () => {
    const formatData = this.child.getFormatData();
    console.log('formatData', formatData);
  };
```

### 获取新增加的数据
```js
  getAddRowData = () => {
    const addRowDate = this.child.getAddRowData();
    console.log('addRowDate', addRowDate);
  };
```

### 获取删除的数据
```js
  getDelRowData = () => {
    const delRowData = this.child.getDelRowData();
    console.log('delRowData', delRowData);
  };
```

### 获取通过鼠标选中的行
```js
  getSelectData = () => {
   // rowList 鼠标选中的行数据
   // indexList 鼠标选中行数据的下标
    const {rowList,indexList} = this.child.getSelectData();
    console.log('selectData',rowList,indexList);
  };
```

### 删除通过鼠标选中的行
```js
  onDelRowSelect = () => {
     // rowList 删除的行数据
     //  indexList 删除行数据的下标
    const {rowList,indexList} = this.child.onDelRowSelect();
    console.log('rowList,indexList', rowList,indexList);
  };
```

### 导出csv
```js

  onDownCsv = () => {
    this.child.onExportCSV();
  };

```
### 导出模板
```js
onExportHeader = () => {
  this.child.onExportHeader();
};

```
### 动态更新设置
```js
 this.child.updateSettings({
      readOnly: false,
});
```
#### 日期国际化
```js
i18n: {
      previousMonth: 'Previous Month',
      nextMonth: 'Next Month',
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      weekdaysShort: ['日', '一', '二', '三', '四', '五', '六']
      },
```

#### 开发调试

```sh
$ npm install -g bee-tools
$ git clone https://github.com/tinper-acs/ac-hand-table
$ cd ac-hand-table
$ npm install
$ npm run dev
```

