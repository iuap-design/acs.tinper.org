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
|powerBtns|可用按钮集合，有以下可选 upload(上传)、reupload(重新上传)、download(下载)、delete(删除)|['upload','reupload','download','delete','confirm','cancel']|
|localeCookie|获取多语cookie的key值|string|locale|
|canUnfold|是否支持展开收起|bool|true|
|callback|成功和失败回调函数回调，参数如下|func|-|

```
/** callback
 * 成功和失败回调函数
 * @param {string} result 成功/失败  success 成功；error 失败
 * @param {string} type 接口类型：list 获得文件列表；delete 删除；upload 上传；download 下载
 * @param {object} res 接口返回信息
 */
function callback(result,type,res){

}

```


### url配置

```js
    {// {id} 替换为 props.id
        "list":  `https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/caep/{id}/files`,//文件列表
        "delete": `https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/{id}`,//删除
        "upload": `https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/caep/{id}/`,//上传
        "info":`https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/{id}/info/ `,//文件信息
    }
```


## 注意事项

项目中需要引入`tinper-bee`的样式文件

## 更新日志