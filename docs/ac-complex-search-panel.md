## ac-complex-search-panel 条件搜索组件

>  查询面板React组件 [进入示例](https://tinper-acs.github.io/ac-complex-search-panel/)


## 代码演示


```
$ ynpm install ac-complex-search-panel --save-dev

引入

import AcComplexSearchPanel from 'ac-complex-search-panel';

样式引入

import 'ac-complex-search-panel/dist/ac-complex-search-panel.css';

```

##效果  [进入示例](https://tinper-acs.github.io/ac-complex-search-panel/)
 

## API

|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
| form | `bee-form`组件内的form，必须传入 | object | - |
| searchOpen | 是否默认展开更多查询条件 | string | false |
| search | 查询的回调 | function | () => {} |
| reset | 重置的回调,默认首先调用'this.props.form.resetFields()'清空所有值,无法清空的需要在回调中手动清空 | function | () => {} |
| resetName | 重置的文字 | string | 重置 |
| searchName | 查询的文字 | string | 查询 |
| searchHead | 查询标题文字 | string | 查询面板 |
| btnPosition | 按钮位置 | `left`/`right`/`center` | right |
| openName | 展开的文字或者dom | string/dom | 展开 |
| closeName | 收起的文字或者dom | string/dom | 收起 |
| showIcon | 是否显示展开收起的图标 | bool | true |
| renderHeader | 自定义头部信息 | function | - |
| renderFooter | 自定义底部信息 | function | - |
| searchBtnProps | 查询按钮属性，onClick无效 | object | - |
| resetBtnProps | 清空按钮属性，onClick无效 | object | - |
| searchBtnPosition | 查询按钮位置 | `left`/`right` | left |
| searchHead | 查询面板标题 | string | 查询面板 |

       

#### 开发调试

```sh
$ cd ac-complex-search-panel
$ npm install
$ npm run dev
```

