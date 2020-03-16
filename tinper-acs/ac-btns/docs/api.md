# 编程模型所有按钮 Btns

项目中需要引入`tinper-bee`的样式文件

## 何时使用


## 如何使用

```js
    import Btns from 'ac-btns';
    import 'ac-btns/build/Btns.css';

```

## 代码演示

## API

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|onClick|点击事件回调|func|-|
|btns|按钮对象数组，详见demo3，支持按钮及code已全部列出|Object|-|
|powerBtns|按钮权限数组，包含所有可用按钮的code，不使用按钮权限可不传|array|-|
|forcePowerBtns|不受按钮权限控制的code数组|array|-|
|type|渲染组件是 `Button` 还是 `span`, `button`/`line`二选一，`line` 多用于table的操作列 |string|button|
|maxSize|渲染组件是 `span` 时, 超出几个按钮变为下拉|number|2|
|localeCookie|获取多语cookie的key值|string|locale|
|addToBtns|扩展的按钮,例如 `{'example':{ 'colors':'write','name_zh_CN':'测试按钮','name_zh_TW':'測試按鈕','name_en_US':'Test Button','className':'ac-btns-example'}}`
|object|-|
|iconTypes|`type='icon'`时，默认code对应的iconType集合|Object|下边有介绍 `type = 'icon'` 时，已支持的按钮及code|




### 自定义扩展属性

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|colors|按钮样式，参考[bee-button不同颜色的按钮](http://bee.tinper.org/tinper-bee/bee-button#%E4%B8%8D%E5%90%8C%E9%A2%9C%E8%89%B2%E7%9A%84%E6%8C%89%E9%92%AE)|string|-|
|name_zh_CN|中文简体内容|string|-|
|name_zh_TW|中文繁体内容|string|-|
|name_en_US|英文内容|string|-|
|className|类名|string|-|
|iconType|`type='icon'`时，自定义图标|string|-|

### btns下的属性 

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|className|类名|string|-|
|name|自定义渲染name，不传，则使用默认|node|-|
|node|自定义渲染dom，不传，则使用默认|node|-|




### 已支持的按钮及code如下

#### type = 'button' 或者 type = 'line' 时

```js
export default {
    "add": {
        "colors": "primary",
        "hotkey": "alt+n",
        "className": "ac-btns-add",
        "name": "新增"
    },
    "confirm": {
        "colors": "primary",
        "className": "ac-btns-confirm",
        "name": "确认"
    },
    "detail": {
        "colors": "write",
        "className": "ac-btns-detail",
        "name": "详情"
    },
    "search": {
        "colors": "primary",
        "hotkey": "ctrl+enter",
        "className": "ac-btns-search",
        "name": "查询"
    },
    "clear": {
        "colors": "write",
        "hotkey": "ctrl+r",
        "className": "ac-btns-clear",
        "name": "清空"
    },
    "empty": {
        "colors": "write",
        "hotkey": "ctrl+r",
        "className": "ac-btns-empty",
        "name": "清空"
    },
    "export": {
        "colors": "write",
        "hotkey": "",
        "className": "ac-btns-export",
        "name": "导出"
    },
    "import": {
        "colors": "write",
        "hotkey": "",
        "className": "ac-btns-import",
        "name": "导入"
    },
    "template": {
        "colors": "write",
        "hotkey": "",
        "className": "ac-btns-template",
        "name": "导入模板下载"
    },
    "save": {
        "colors": "primary",
        "hotkey": "",
        "className": "ac-btns-save",
        "name": "保存"
    },
    "cancel": {
        "colors": "write",
        "hotkey": "",
        "className": "ac-btns-cancel",
        "name": "取消"
    },
    "update": {
        "colors": "write",
        "hotkey": "",
        "className": "ac-btns-update",
        "name": "修改"
    },
    "delete": {
        "colors": "write",
        "hotkey": "",
        "className": "ac-btns-delete",
        "name": "删除"
    },
    "pbmsubmit": {
        "colors": "write",
        "hotkey": "",
        "className": "ac-btns-pbmsubmit",
        "name": "提交"
    },
    "pbmcancle": {
        "colors": "write",
        "hotkey": "",
        "className": "ac-btns-pbmcancle",
        "name": "撤回"
    },
    "pbmapprove": {
        "colors": "write",
        "hotkey": "",
        "className": "ac-btns-pbmapprove",
        "name": "审批"
    },
    "appoint": {
        "colors": "write",
        "hotkey": "",
        "className": "ac-btns-appoint",
        "name": "指派"
    },
    "send": {
        "colors": "write",
        "hotkey": "",
        "className": "ac-btns-send",
        "name": "发送"
    },
    "printpreview": {
        "colors": "write",
        "className": "ac-btns-printpreview",
        "name": "打印预览"
    },
    "printdesign": {
        "colors": "write",
        "className": "ac-btns-printdesign",
        "name": "打印设计"
    },
    "upload": {
        "colors": "primary",
        "className": "ac-btns-upload",
        "name": "上传"
    },
    "reupload": {
        "colors": "primary",
        "className": "ac-btns-reupload",
        "name": "重新上传"
    },
    "download": {
        "colors": "write",
        "className": "ac-btns-download",
        "name": "下载"
    },
    "addRow": {
        "colors": "write",
        "className": "ac-btns-addRow",
        "name": "增行"
    },
    "delRow": {
        "colors": "write",
        "className": "ac-btns-delRow",
        "name": "删行"
    },
    "copyRow": {
        "colors": "write",
        "className": "ac-btns-copyRow",
        "name": "复制行"
    },
    "max": {
        "colors": "write",
        "className": "ac-btns-max",
        "name": "最大化"
    },
    "min": {
        "colors": "write",
        "className": "ac-btns-min",
        "name": "min"
    },
    "copyToEnd": {
        "colors": "write",
        "className": "ac-btns-copyToEnd",
        "name": "粘贴至末行"
    },
    "copyToHere": {
        "colors": "write",
        "className": "ac-btns-copyToHere",
        "name": "粘贴至此处"
    },
    "organizationChat": {
        "colors": "write",
        "className": "ac-btns-organizationChat",
        "name": "机构图"
    },
    "enable": {
        "colors": "write",
        "className": "ac-btns-enable",
        "name": "启用"
    },
    "disabled": {
        "colors": "write",
        "className": "ac-btns-disabled",
        "name": "停用"
    },
    "next": {
        "colors": "write",
        "className": "ac-btns-next",
        "name": "下一条"
    },
    "previous": {
        "colors": "write",
        "className": "ac-btns-previous",
        "name": "上一条"
    },
    "first": {
        "colors": "write",
        "className": "ac-btns-first",
        "name": "第一条"
    },
    "last": {
        "colors": "write",
        "className": "ac-btns-last",
        "name": "最后一条"
    }
}

```

#### type = 'icon' 时

```js

{
    'add':'uf-add-c-o',
    'update':'uf-pencil',
    'delete':'uf-del'
}

```

 ## 注意事项

 暂无

 ## 更新日志