## ac-notification

## 效果

![b](http://upload-images.jianshu.io/upload_images/8194969-2ebaac72791f95e8?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![c](http://upload-images.jianshu.io/upload_images/8194969-28f3ed1a76d70d2e?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![d](http://upload-images.jianshu.io/upload_images/8194969-eb0aa77805b2b44a?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![e](http://upload-images.jianshu.io/upload_images/8194969-27e5189e95bf3fdb?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 代码演示

## API

|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
|openmess|打开ac-notification|func|
|close|关闭ac-notification |func|
|title|ac-notification标题 |string|''|
|content|ac-notification内容 |string|''|
|type|ac-notification类型 |string|[error,warning,success,info]中任意值|

#### 开发调试

```sh
$ npm install -g ac-tools
$ git clone git@github.com:tinper-acs/ac-notification.git
$ cd ac-notification
$ npm install
$ npm run dev
```