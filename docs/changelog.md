## 2.0.0
- [Feature] 在tinper-bee.css 中增加 Datepicker、Calendar 组件的样式。
- [Fix] bee-cascader 2.0.0
- [Fix] 去掉组件中^的版本号，改成具体版本号
- [Fix] 修改component中大小写问题。
- [Feature] bee-button
  1. V2.0.0~V2.0.1 版本的边框按钮 primary 为默认主题色
  2. 默认按钮高度由34px变为32px
  3. 巨大按钮高度由47px变为48px
  4. 所有按钮的圆角由4px变为3px
  5. 不提倡使用button的默认颜色，默认颜色即为primary色。 
- [Feature] bee-select
  1. 下拉选项的hover背景色由蓝色变为灰色
  2. hover文字色由深灰色变为蓝色
- [Feature] bee-rate下拉选项的hover背景色由蓝色变为灰色
- [Feature] bee-timeline 下拉选项的hover背景色由蓝色变为灰色
- [Feature] bee-breadcrumb 面包屑默认的a标签文字颜色由浅蓝（#31c4dc）变为主题蓝色
- [Feature] bee-tree
  1. 选中的树节点的文字颜色由黑色变为主题蓝色
  2. 树节点的hover背景色由蓝色变为灰色
- [Feature] bee-calendar
  1. 日期hover背景色由浅蓝"#ebfaff"变为灰色，hover文字色由黑色变为主题蓝色
  2. 选中的日期背景色由浅蓝（#3fc7fa）变为主题蓝色
  3. 选中日期的文字色由黑色变为白色
- [Feature] bee-slider 锚点色和滑动条色由"info"浅蓝变为"primary"主题蓝色
- [Feature] bee-timepicker 选中的文字色由浅蓝（#2db7f5）变为主题蓝色
- [Feature] bee-button-group 边框按钮（设置shape="border"）的文字颜色由黑色变为主题蓝色
- [Feature] bee-tabs
  1. 基础Tab，hover状态标签文字颜色由浅蓝（#23c0fa）变为primary主题蓝色
  2. 竖向的Tab，标签文字色和右侧线条色由浅蓝（#23c0fa）变为primary主题蓝色
- [Feature] bee-table 表格行内链接文字色由默认的超链接色变为主题蓝色
- [Feature] bee-datepicker
  1. 日期hover背景色由浅蓝变为灰色，hover文字色由黑变为蓝色
  2. 日期select背景色由浅蓝变为深蓝，选中的文字色由黑色变为白色
  3. 底部按钮文字色由红色变为蓝色
  4. 所有面板默认增加输入框
- [Feature] bee-pagination
  1. 默认页码按钮由带边框变为无边框
  2. 选中的页码背景色由蓝色变为深灰色
  3. 默认分页去掉确认按钮，支持自定义
  4. 新增'confirmBtn'API，支持外部传参，自定义跳转按钮。(去掉默认按钮)
  5. 普通分页，默认去掉边框
- [Feature] bee-icon @1.0.9，增加图标
- tinper-bee 2.0 组件升级风险组件[primary 为默认主题色]
- [Feature] bee-cascader 2.0.0 在单独使用时，需要手动引入css样式。


## 1.6.10
- [Fix] bee-popconfirm @1.0.15 添加第二优先级渲染方向功能、添加onRootClose的API、添加自定义确定取消按钮
- [Fix] bee-tooltip @1.0.14 添加可配置container的API
- [Fix] bee-popover @1.0.6 添加可配置container的API
- [Fix] bee-grid @1.0.11 增加是否有分页的api(上个版本0.2.44)
- bee-table @1.6.35(上个版本1.6.35)
     1. [Feature] 支持多表头列的排序功能、增加是否开启快捷键功能、自定义列对齐方式、修改表格交换列逻辑修复city-select 组件内部select警告。
     2. [Feature]  增加获取拖拽列宽的colgroup的id、以及table 的id。
- [Fix] bee-select @1.1.8 下拉item高度改为30px
- [Fix] bee-slider @1.0.3 竖直方向的slider重叠问题 V1.0.3
- [Fix] bee-datepicker @1.3.12 新增外层输入框可输入功能
- [Fix] bee-input-number @1.2.2 新增显示千分符的功能
- [Feature] 官网新增历史版本入口
- [Feature] 官网新增全局搜索功能

## 1.6.9

- [Fix] bee-table @1.6.21 快捷键修复
- [Fix] bee-tabs @1.0.9 快捷键修复。
- [Fix] bee-menu @0.1.9 快捷键修复。
- [Fix] bee-tree 快捷键修复。
- [Fix] bee-dropdown @1.0.3 快捷键修复。
- [Feature] 增加全键盘快捷键文档描述、各个增加快捷键的api 都加了api的说明部分。

## 1.6.8

- bee-table @1.6.21
     1. [Feature] 支持快捷键 ↑ ，↓ ，tab 快捷键操作，以及新增快捷键的api。
     2. [Feature]  增加懒加载功能 ，支持大数据量加载。
- [Feature] bee-tabs @1.0.9 增加tabIndex api。
- [Feature] bee-menu @0.1.9 支持快捷键操作。
- [Feature] bee-tree 支持快捷键操作， ↑ ，↓  选中功能。
- [Feature] bee-dropdown @1.0.3 新增快捷键。
- [Feature] bee-tooltip @1.0.14 增加鼠标滑过API。
- [Feature] bee-message @1.0.13 将icon改为默认不显示

-  应用组件部分 
   [Fix] ac-attachment 添加disabled按钮禁用选项

## 1.6.7
-  bee-pagination 添加dataNumSelect数组中有不是数字的容错处理，选中此项将items设置为1即只显示1页(上一个版本是1.0.2)
-  bee-overlay 添加window.resize触发更新窗口位置的功能 
-  bee-tooltip  添加window.resize触发更新窗口位置的功能 
-  bee-popover  添加window.resize触发更新窗口位置的功能  
-  bee-popconfirm  添加window.resize触发更新窗口位置的功能  
-  bee-table(上个版本1.5.18)
  1. 解决交换列咋ie上报错的问题
  2. 合计逻辑重构、合计浮点数，合计时，精确到2位小数
  3. 过滤行没有数据的时候不执行回调、清除值只清空存在的值，不多次回调
  4. 增加 Hover状态是否同步到左侧Checkbox属性syncHover
  5. 优化tableheader代码、注释、文档补全
  6. 实现过滤行新功能，增加可设置单独条件属性filterDropdownIncludeKeys
  7. 去掉过滤的一些限制
  8. 固定列滚动条不可拖拽
  9. 解决行过滤能拖拽问题、解决行过滤事件丢失问题
  10. 标题全选问题解决
  11. 拖拽横向滚动条兼容固定列
  12. Table组件增加了指定的下拉条件设置API:filterDropdownIncludeKeys
  13. 交换列和拖拽改变列宽共存问题。
  14. 拖拽激活区宽度超长导致滚动条显示bug
  15. 增加示例文档、调整APi
  - bee-complex-grid(上个版本是0.2.44)
   1. 增加导出excel功能。
   2. 增加模板示例功能
   3. 最后一个非固定列不可以fix
   4. 动态设置是否显示列过滤bug。
   5. 增加导出示例、导出单独设置数据源、是否要在导出中隐藏某列、修改demo 示例以及文档
   6. 增加示例文档、调整APi

## 1.6.5

- bee-input-number 去掉输入非数字错误提示， onChange改为数值类型
- bee-radio 全键盘问题修改
- bee-form-control type='search' 改造
- bee-datepicker 全键盘操作
- bee-panel uf 样式去掉
- bee-table 
  1. 表格过滤支持数值过滤下拉
  2. 过滤行添加InputNumber组件来支持数值操作，增加对应多语资源，Icon颜色修改
  3. 增加onFilterChange、onFilterClear
  4. 整合回调参数集合
- bee-complex-grid 
  1. 拖拽激活区宽度超长导致滚动条显示bug
  2. 增加是否可过滤API-columnFilterAble
  3. 固定列在过滤栏位上显示但不可以点击


## 1.6.4
- bee-notification 添加键盘esc关闭功能
- bee-message 添加键盘esc关闭功能
- bee-popconfirm 修复浏览器边界箭头指向的bug
- bee-tooltip 添加visible API 
- bee-overlay 添加visible API
- bee-form-group 文档修改
- bee-checkbox 新增group功能
- bee-modal  修改width适配 、number警告
- bee-checkbox 支持全键盘操作
- bee-radio 支持全键盘操作
- bee-datepicker 全键盘操作
- bee-table 增加过滤行数值型输入、数值型条件选择

## 1.6.3
- bee-select 计算宽度性能问题，新增键盘操作功能
- bee-step组件升级，修复1px抖动bug
- bee-menu srcollIntoView 报错
- bee-form-control 示例无法输入；新增focusSelect功能
- bee-city-select更新语言包
- bee-modal 关闭图标 &timer; 改为uf-close
- bee-input-number样式更改，无法输入小数
- bee-notification 添加键盘esc关闭功能
- bee-message 添加键盘esc关闭功能
- bee-popconfirm 修复浏览器边界箭头指向的bug
- bee-tooltip 添加visible API 
- bee-overlay 添加visible API
- ac-input-locale加了form表单校验
- bee-affix lodash.isequal bug修复
- bee-form-group 错字修改
- bee-table
  1. 合并 newMuitlSelect 和 muitlSelect
  2. 修复表头全选进入选中问题
  3. 拖拽列和交换列在同一个实例中使用


## 1.6.2
- 组件库官网 react 升级到 16.6.0 版本
- bee-select  多选的下拉框闪、配合form在onBlur校验时报错
- bee-overlay 加判断去掉 clearTimeout
- bee-affix affix容器动态宽高时，减少affix位置的计算次数
- bee-input-number 在form下传string改number警告
- bee-viewer  新增组件图片查看器
- bee-locale  新增繁体语言
- bee-table 
  1. 过滤行为空条件删除.
  2. 过滤行失去焦点事件还原。
  3. 支持表头出现滚动条。
  4. grid封装了推拽、交换列、过滤列、合计、多选、排序、等复杂table功能，提供过去列属性和table属性API
- ac-mobile-locle 手机号国际化
- 参照组件2.0
  1. 树形参照
  2. 多选参照
  3. 表格参照
  4. 树表参照
  5. 树穿梭参照
  6. 复杂查询表格参照

## 1.6.1
- bee-message 修复在生命周期函数中调用报错的问题
- bee-notification react16的兼容
- bee-dnd：升级依赖组件；新增横向排序、多列排序示例；增加多个api 
- bee-affix修改container传值为null的容错处理
- bee-select：解决输入框失焦后仍保持聚焦状态的问题；增加 open 参数控制下拉框的展开收起
- bee-table：锁定加个边界线；按条件和值进行过滤；拖拽改变列宽；修改表头th添加className问题；safair下checkbox无法选中问题；动态设置固定列交互修改；内容超出当前dom宽度时，自动出现滚动条

## 1.6.0
- bee-table
  1. 动态设置固定列，固定列关联的列自动固定，增加回调函数
  2. bee-table排序功能，去掉列筛选功能后，排序上下箭头类名改变，样式丢失
  3. bee-table 过滤组件通过tinper-bee引入路径问题
- bee-select dropdownMatchSelectWidth属性，为false时，下拉框的内容不取决于输入框

## 1.5.9
- bee-input-number disabled后仍然可以点击bug
- bee-locale文件名规范化修改
- bee-form-control 去掉 showClose showPop 警告
- bee-select 增加示例。
- bee-modal 里面加了三个demo
- bee-table 
   1. 优化上千条数据渲染性能
   2. 数表结构中使用固定列时，固定列的高度取值问题
   3. table有纵向滚动条，列过多时，滚动下不对齐
   4. bee-table重新验证示例，修改4个示例的Bug
- bee-transfer 
   1. 显示的数据总数根据选中的数据动态变化
   2. 穿梭框 在左侧搜索过滤的情况下 右传左的报错
- bee-menus 增加选中获取自定义data对象的示例
- bee-panel增加代码复制功能，增加代码示例展示板Demo
- bee-tooltip加判断，无overlay不渲染tooltip-arrow,tooltip-inner
- bee-locale文件名规范化
- bee-datepicker 示例代码去掉相对路径
- bee-timepickker 示例代码去掉相对路径
 
## 1.5.8
- bee-input-number 增加了disabled属性，新增2个demo示例

## 1.5.7

- bee-affix horizontal的无效果问题、以及demo 修改。
- bee-input-number 增加了disabled属性，新增2个demo示例

## 1.5.6

- 去掉components/Con/index.js 

## 1.5.5

- bee-table 
  1. newMuleteSelct 设置 disable 属性。
  2. 多列进行排序，某一列点击，会影响到其他列的排的默认箭头的颜色
  3. 排序默认选中箭头。
  4. 表格中tree结构，点+-号时也会触发onRowClick事件，希望不触发。
  5. 增加demo，文档。

- bee-inputnumber 组件，当disabled设成true时，仍可点击左右的+-号改变数据

- bee-tooltip组件，希望能根据内容来自动往上浮动或者往下浮动（上方没有空间时往下浮动，下方没有空间时往上浮动

- bee-affix组件，改浏览器视口宽度以后，Affix的宽度没有重算

- bee-select、bee-menus 当组件width 小于正常width的时候，文字和下拉框需要做省略处理。

- bee-form-control   新增清空功能

- bee-form 新增demo和文档

- bee-tooltip、bee-overlay 内容查出边界时，内容会自动切换弹出方位。

## 1.5.4

- bee-table 列过滤bug修复。
- 表格列宽的功能下架。

## 1.5.3
 
- bee-table 新增综合示例。

## 1.5.2

- Modal组件在React16中更新报错。

## 1.5.1

- InputNumber组件在Table中样式受影响
- FromControl组件search状态disabled时，clear icon 仍可用
- FromControl组件增加onBlur事件

## 1.5.0

- Table组件重构mixin和render增强功能，修改用法。
- Table修复固定列滚动错行问题
- FromControl的ie9兼容问题
- Transfer的Modal渲染不加载问题
- Checkbox组件优化非双击不延迟
- Tree组件优化非双击事件不延迟

## 1.4.2

- 修复Table组件显示错误bug

## 1.4.1

- 修复Table组件1.1.5显示bug

## 1.4.0

- Datepicker组件的日期范围添加className
- Dnd组件内部没有根据新的state重新渲染bug
- Table组件可动态设置固定列
- Table组件表头可动态设置
- Table组件表头支持拖拽
- Table组件表头可拖拽修改列宽度

## 1.3.7

- Table固定列和展开行同时使用时，固定列展开高度不一致问题

## 1.3.6 

- Checkbox单击事件增加默认props
- Table组件全选功能组件透传给table

## 1.3.5

- Checkbox组件增加单击事件

## 1.3.4

- Tree组件增加双击事件
- Checkbox组件增加双击事件

## 1.3.3

- Transfer组件搜索的返回值由e修改为value

## 1.3.2

- FormControl组件修复搜索功能报错问题

## 1.3.1

- Tree组件新增treeNode的title（叶子的名称）支持修改Class，style;switcher(树前边的空span)支持修改Class，style。

## 1.3.0

- Popover组件解决受控制时，显示bug
- Message组件增加style参数，让用户修改样式
- ForItem组件，className传递位置错误
- Table组件，新增haveExpandIcon,控制是都显示展开行Icon，这个参数只在使用了expandedRowRender时才有效
- Datepicker组件修复onChange事件重复触发问题，增加getCalendarContainer支持自定义渲染容器节点

## 1.2.10

- 修复Tab组件，多页签展示时，箭头不垂直居中问题

## 1.2.9

- 修复Tree组件，异步加载时显示loading的图片
- 修复ProgressBar顶部导航样式问题

## 1.2.8

- 修复Button, FormControl, ProgressBar按需加载样式问题。

## 1.2.7

- Radio: 修复disabled时无法设置默认值问题

## 1.2.6

- Menus: 修改dark主题下选中样式变蓝bug
- ProgressBar: 增加顶部进度条(feat)
- Checkbox: 与Radio组件统一样式
- FormControl: 修复onChange控制value显示时，显示滞后bug
- Table: 修复全选功能中使用rowKey参数bug

## 1.2.5

- Rate: 修复样式不正确问题

## 1.2.4

- Carousel: 从tinper-bee打包文件中拿出，因为依赖的第三方组件不兼容ie。

## 1.2.2

- 增加按需加载功能

## 1.2.1

- 修复分页组件上一页属性bug

## 1.2.0

- 新增Carousel轮播图组件
- 修复Select下拉框宽度不一致问题
- 日期选择增加了图标及自定义图标
- Form组件增加valuePropsName设置如何获取子元素props

## 1.1.1

- 修复Dropdown选中，父组件销毁时，下拉菜单未消失。
- 修复Table增加行列合并。
- 修复Select下拉宽度，向上渲染弹出两次，增加data Props。
- 修复Form，自定义组件更新value;校验逻辑修改，增加多个校验正则。
- 修复Datepicker组件rangepicker为一个输入框显示。

## 1.1.0

- 增加Locale多语组件
- 增加Popover气泡卡片组件

## 1.0.0

- 支持React v16版本
- 增加Timeline组件
- 增加Dnd拖拽组件
- 增加表单校验

## 0.3.0

#### Bug Fixes

- popconfirm组件依赖问题
- modal组件firefox显示问题

#### new feature

- 新增table组件
- 新增tree组件

## 0.2.8

#### perf

- scss打包优化([f1fdf69](https://github.com/iuap-design/tinper-bee/commit/4c34bf048791ae8eb3a7e5b156c91b7aafc0a03c))

#### Bug Fixes

- tabs组件样式修正([3b82bb0](https://github.com/iuap-design/tinper-bee/commit/3b82bb014392c2d36dc87768f423885eaba22013))


## 0.2.6
#### Bug Fixes

- tooltip组件样式出错 ([f1fdf69](https://github.com/iuap-design/tinper-bee/commit/f1fdf69cb59cd05e3ea0b5ae10859833b23b5393))
