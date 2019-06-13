# Pagelayout，该组件将于一周后下线，并迁移至基础组件维护，使用请前往[bee-page-layout](http://bee.tinper.org/tinper-bee/bee-page-layout)

布局组件

## 何时使用

整个页面布局时使用

## 如何使用

```
import Pagelayout from 'ac-pagelayout';
import 'ac-pagelayout/build/Pagelayout.css';

const Header = Pagelayout.Header;
const SearchArea = Pagelayout.SearchArea;
const Content = Pagelayout.Content;
const TableContent = Pagelayout.TableContent;
const LeftContent = Pagelayout.LeftContent;
const RightContent = Pagelayout.RightContent;

```

## 代码演示

## API

### Pagelayout

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
| className | 类名 | string | ac-pagelayout |

### Header

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
| className | 类名 | string | header |

### SearchArea

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
| className | 类名 | string | search-area |

### Content

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
| className | 类名 | string | content |

### TableContent

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
| className | 类名 | string | table-container |

### LeftContent

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
| className | 类名 | string | left-content |
|xs|移动设备显示列数(<768px)|number|-|
|sm|小屏幕桌面设备显示列数(≥768px)|number|-|
|md|中等屏幕设备显示列数(≥992px)|number|-|
|lg|大屏幕设备显示列数(≥1200px)|number|-|
|xsPull|移动屏幕设备到右边距列数|number|-|
|smPull|小屏幕设备到右边距列数|number|-|
|mdPull|中等屏幕设备到右边距列数|number|-|
|lgPull|大屏幕设备到右边距列数|number|-|
|xsPush|移动屏幕设备到左边距列数|number|-|
|smPush|小屏幕设备到左边距列数|number|-|
|mdPush|中等屏幕设备到左边距列数|number|-|
|lgPush|大屏幕设备到左边距列数|number|-|
|xsOffset|移动设备偏移列数|number|-|
|smOffset|小屏幕设备偏移列数|number|-|
|mdOffset|中等屏幕设备偏移列数|number|-|
|lgOffset|大屏幕设备偏移列数|number|-|

### RightContent

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
| className | 类名 | string | right-content |
|xs|移动设备显示列数(<768px)|number|-|
|sm|小屏幕桌面设备显示列数(≥768px)|number|-|
|md|中等屏幕设备显示列数(≥992px)|number|-|
|lg|大屏幕设备显示列数(≥1200px)|number|-|
|xsPull|移动屏幕设备到右边距列数|number|-|
|smPull|小屏幕设备到右边距列数|number|-|
|mdPull|中等屏幕设备到右边距列数|number|-|
|lgPull|大屏幕设备到右边距列数|number|-|
|xsPush|移动屏幕设备到左边距列数|number|-|
|smPush|小屏幕设备到左边距列数|number|-|
|mdPush|中等屏幕设备到左边距列数|number|-|
|lgPush|大屏幕设备到左边距列数|number|-|
|xsOffset|移动设备偏移列数|number|-|
|smOffset|小屏幕设备偏移列数|number|-|
|mdOffset|中等屏幕设备偏移列数|number|-|
|lgOffset|大屏幕设备偏移列数|number|-|



## 注意事项

Content 为 `bee-layout` 中 `Row` 的封装

LeftContent 和 RightContent 为 `bee-layout` 中 `Col` 的封装，所以继承了 `Col` 的所有属性


## 更新日志