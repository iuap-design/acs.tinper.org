# FileList

附件管理组件

## 何时使用

单据中需要附件，可将附件作为单独列表展示的时候

## 如何使用

```js
import FileList from 'ac-file-list';
import 'ac-file-list/build/FileList.css';
```

## 代码演示

## API

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|id|必填，单据唯一标示|string|-|
|disabled|上传按钮是否禁用|bool|false|
|getListNow|组件渲染时，是否立即请求附件列表接口。例如：单据详情编辑时需要立即请求，新增时不需要|bool|false|
|url|列表、上传、删除、详情(查询下载地址)接口地址|object|默认值往下看url配置|
|uploadProps|上传参数，参考 [bee-upload API](http://bee.tinper.org/tinper-bee/bee-upload)|object|{}|


### url配置

```js
    {// {id} 替换为 props.id
        "list":  `https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/caep/{id}/files`,//文件列表
        "upload": `https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/caep/{id}/`,//上传
        "delete": `https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/{id}`,//下载 cooperation/rest/v1/file/5d639caaa957bd001936cec9  此处id为附件id
        "info":`https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/{id}/info/ `,//文件信息
    }
```


## 注意事项

项目中需要引入`tinper-bee`的样式文件

## 更新日志