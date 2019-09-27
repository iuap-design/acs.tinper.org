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



### copyToEnd

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|colors|按钮样式，参考(bee-button不同颜色的按钮)[http://bee.tinper.org/tinper-bee/bee-button#%E4%B8%8D%E5%90%8C%E9%A2%9C%E8%89%B2%E7%9A%84%E6%8C%89%E9%92%AE]|string|-|
|name_zh_CN|中文简体内容|string|-|
|name_zh_TW|中文繁体内容|string|-|
|name_en_US|英文内容|string|-|
|className|类名|string|-|

### btns下的属性 

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|className|类名|string|-|
|name|自定义渲染name，不传，则使用默认|node|-|
|node|自定义渲染dom，不传，则使用默认|node|-|




### 已支持的按钮及code如下

```js
{
    'add':{ //新增
        'colors':'primary',
        'name_zh_CN':'新增',
        'name_zh_TW':'新增',
        'name_en_US':'New',
        'className':'ac-btns-add'
    },
    'detail':{ //详情
        'colors':'write',
        'name_zh_CN':'详情',
        'name_zh_TW':'詳情',
        'name_en_US':'Details',
        'className':'ac-btns-detail'
    },
    'search':{//查询
        'colors':'primary',
        'name_zh_CN':'查询',
        'name_zh_TW':'查詢',
        'name_en_US':'Search',
        'className':'ac-btns-search'
    },
    'clear':{//清空
        'colors':'write',
        'name_zh_CN':'清空',
        'name_zh_TW':'清空',
        'name_en_US':'Clear',
        'className':'ac-btns-clear'
    },
    'export':{//导出
        'colors':'write',
        'name_zh_CN':'导出',
        'name_zh_TW':'導出',
        'name_en_US':'Export',
        'className':'ac-btns-export'
    },
    'save':{//保存
        'colors':'primary',
        'name_zh_CN':'保存',
        'name_zh_TW':'保存',
        'name_en_US':'Save',
        'className':'ac-btns-save'
    },
    'cancel':{//取消
        'colors':'write',
        'name_zh_CN':'取消',
        'name_zh_TW':'取消',
        'name_en_US':'Cancel',
        'className':'ac-btns-cancel'
    },
    'update':{//修改
        'colors':'write',
        'name_zh_CN':'修改',
        'name_zh_TW':'修改',
        'name_en_US':'Modify',
        'className':'ac-btns-update'
    },
    'delete':{//删除
        'colors':'write',
        'name_zh_CN':'删除',
        'name_zh_TW':'刪除',
        'name_en_US':'Delete',
        'className':'ac-btns-delete'
    },
    'pbmsubmit':{//提交
        'colors':'write',
        'name_zh_CN':'提交',
        'name_zh_TW':'提交',
        'name_en_US':'Submit',
        'className':'ac-btns-pbmsubmit'
    },
    'pbmcancle':{//撤回
        'colors':'write',
        'name_zh_CN':'撤回',
        'name_zh_TW':'撤回',
        'name_en_US':'Recall',
        'className':'ac-btns-pbmcancle'
    },
    'pbmapprove':{//审批
        'colors':'write',
        'name_zh_CN':'审批',
        'name_zh_TW':'審批',
        'name_en_US':'Approval',
        'className':'ac-btns-pbmapprove'
    },
    'printpreview':{//打印预览
        'colors':'write',
        'name_zh_CN':'打印预览',
        'name_zh_TW':'打印預覽',
        'name_en_US':'Print Preview',
        'className':'ac-btns-printpreview'
    },
    'printdesign':{//打印设计
        'colors':'write',
        'name_zh_CN':'打印设计',
        'name_zh_TW':'打印設計',
        'name_en_US':'Print Design',
        'className':'ac-btns-printdesign'
    },
    'upload':{//上传
        'colors':'primary',
        'name_zh_CN':'上传',
        'name_zh_TW':'上傳',
        'name_en_US':'Upload',
        'className':'ac-btns-upload'
    },
    'download':{//下载
        'colors':'write',
        'name_zh_CN':'下载',
        'name_zh_TW':'下載',
        'name_en_US':'Download',
        'className':'ac-btns-download'
    },
    'addRow':{//增行
        'colors':'write',
        'name_zh_CN':'增行',
        'name_zh_TW':'增行',
        'name_en_US':'New',
        'className':'ac-btns-addRow'
    },
    'delRow':{//删行
        'colors':'write',
        'name_zh_CN':'删行',
        'name_zh_TW':'刪行',
        'name_en_US':'Delete',
        'className':'ac-btns-delRow'
    },
    'copyRow':{//复制行
        'colors':'write',
        'name_zh_CN':'复制行',
        'name_zh_TW':'複製行',
        'name_en_US':'Duplicate rows',
        'className':'ac-btns-copyRow'
    },
    'max':{//最大化
        'colors':'write',
        'name_zh_CN':'最大化',
        'name_zh_TW':'最大化',
        'name_en_US':'Maximize',
        'className':'ac-btns-max'
    },
    'min':{//最小化
        'colors':'write',
        'name_zh_CN':'min',
        'name_zh_TW':'最小化',
        'name_en_US':'Minimize',
        'className':'ac-btns-min'
    },
    'copyToEnd':{//粘贴至末行
        'colors':'write',
        'name_zh_CN':'粘贴至末行',
        'name_zh_TW':'粘貼至末行',
        'name_en_US':'Paste to end line',
        'className':'ac-btns-copyToEnd'
    },
    'organizationChat':{//机构图
        'colors':'write',
        'name_zh_CN':'机构图',
        'name_zh_TW':'機構圖',
        'name_en_US':'Organization Chat',
        'className':'ac-btns-organizationChat'
    },
    'enable':{//启用
        'colors':'write',
        'name_zh_CN':'启用',
        'name_zh_TW':'啟用',
        'name_en_US':'Enable',
        'className':'ac-btns-enable'
    },
    'disabled':{//停用
        'colors':'write',
        'name_zh_CN':'停用',
        'name_zh_TW':'停用',
        'name_en_US':'Disabled',
        'className':'ac-btns-disabled'
    },
    'next':{//下一条
        'colors':'write',
        'name_zh_CN':'下一条',
        'name_zh_TW':'下一條',
        'name_en_US':'Next',
        'className':'ac-btns-next'
    },
    'previous':{//上一条
        'colors':'write',
        'name_zh_CN':'上一条',
        'name_zh_TW':'上一條',
        'name_en_US':'Previous',
        'className':'ac-btns-previous'
    },
    'first':{//第一条
        'colors':'write',
        'name_zh_CN':'第一条',
        'name_zh_TW':'第一條',
        'name_en_US':'First',
        'className':'ac-btns-first'
    },
    'last':{//最后一条
        'colors':'write',
        'name_zh_CN':'最后一条',
        'name_zh_TW':'最後一條',
        'name_en_US':'Last',
        'className':'ac-btns-last'
    },
}


```

 ## 注意事项

 暂无

 ## 更新日志