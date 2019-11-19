# 上传列表 AcAttachment

## 何时使用



## 如何使用

```
npm install ac-attachment -S

import AcAttachment from 'ac-attachment';

import 'ac-attachment/dist/ac-attachment.css';

```

## 代码演示


## API 

### 参数

名称 | 类型 | 默认值 | 是否必填 | 描述
--------- | ---- | ------|----------- | -----------------
recordId | `string` | | 是 | 单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则 
groupname | `string` |  | 是 | 分组名
permission | `string` |  | 否 | Oss权限(read，private，full),read是可读=公有，private=私有，当这个参数不传的时候会默认private
tenant | `string` |  | 否 | 附件查询使用，租户id，不写会自动从系统获取
url | `string` |  | 否 | 里传true或false。为true，则返回附件的连接地址存到数据库中；如果isencrypt设置为true，url不能设置为true否则不能上传，提示：对于加密文件不能返回url，返回了也无法访问
isencrypt | `boolean` | `false` | 否 | 是否加密，默认false不加密
baseUrl | `string` | | 否 | 应用平台的地址(IP地址或域名)
uploadUrl | `string` | `/iuap-saas-filesystem-service/file/upload` | 否 | 应用平台上传附件的地址
queryUrl | `string` | `/iuap-saas-filesystem-service/file/query` | 否 | 应用平台查询附件的地址
deleteUrl | `string` | `/iuap-saas-filesystem-service/file/delete` | 否 | 应用平台删除单个附件的地址
downloadUrl | `string` | `/iuap-saas-filesystem-service/file/download` | 否 | 应用平台下载附件的地址
batchDeleteUrl | `string` | `/iuap-saas-filesystem-service/file/batchDeleteByIds` | 否 | 应用平台批量删除附件地址
fileType | `string`  |  | 否 |允许上传的文件类型, 使用MIME类型限制文件类型。例如：txt文档类型为text/plain, png图片类型为image/png。可以使用\*通配符，image/\*代表所有图片类型。多个文件类型使用逗号隔开，例如：'image/\*, text/plain'。详见 [File Type](https://developer.mozilla.org/zh-CN/docs/Web/API/File/type), [MIME类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
fileMaxSize | `number` | `10` | 否 | 单个上传文件的大小上限，默认是10M，单位是M
fileNum | `number` | `999` | 否 | 上传文件的总数量限制
multiple  | `boolean` | `true` | 否 | 是否支持一次多个文件上传，在文件选择框中，按shift或ctrl键，同时选择多个文件，点击确定即可
disabled  | `boolean` | `false` | 否 | 上传，下载，删除按钮是否禁用
className | `string` |  | 否 | 附件容器的自定义class
checkDuplicate | `boolean` | `true` | 否 | 文件上传是否检测文件名重复 
locale | `string` | `zh` | 否 | 组件语言类型，默认是简体中文，目前支持英文(en或en_US)，简体中文(zh_CN)，繁体中文(zh_TW)

### 事件

名称 | 类型 | 描述
--------- | ---- | -----------------
onFileTypeOver | `file`，当前上传的文件对象 | 文件类型超出限制回调
onFileSizeOver | `file`，当前上传的文件对象 | 文件大小超出限制回调
onFileNumOver | `file`，当前上传的文件对象 | 文件数量超出限制回调
onDelete | `attach` | 参数attach为附件组件实例，调用attach.fDelete()，可以调起接口删除附件
onUploadSuccess | `data`，上传成功返回值 | 上传成功回调
onUploadError | `data`，上传出错返回值 | 上传出错回调 
onUploadDelete | `data`，上传删除返回值 | 上传删除回调 
onDeleteFile | `data`，删除文件返回值 | 删除文件回调 

## 注意事项

## 文件列表刷新

组件在recordId发生变化，会自动刷新文件列表，也可以手动刷新文件列表，用法如下：

```javascript
<AcAttachment ref={(c) => {this.attach = c.attach}} recordId='' groupname='' />

//手动刷新文件列表
this.attach.fLoadFileList();
```

### 自定义弹框删除文件

```javascript
<AcAttachment ref={(c) => {this.attach = c.attach}} recordId='' groupname='' />

//手动删除文件
this.attach.fDelete();
```

```javascript
//自定义弹出框删除文件
<AcAttachment recordId='' groupname='' 
    onDelete={(attach) => {
        if(confirm('确定删除记录吗？')){
            attach.fDelete();
        }
    }}
/>
```

## 更新日志
