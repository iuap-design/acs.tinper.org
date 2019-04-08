# 手机国际化 MobileLocale

## 何时使用

手机号国际化

## 如何使用

```
$ npm install ac-mobile-locale --save-dev

引入

import AcMobileLocale from 'ac-mobile-locale';

样式引入

import 'ac-mobile-locale/dist/index.css';

```

## 代码演示


## API 

|参数|说明|类型|返回值|是否必填|
|:--|:---:|:--:|---:|---:|
|className|容器样式|string| --- | 否 |
|disabled|是否可用|bool| --- | --- |
|accountInfo| 语种列表 |array| --- | 否 |
|selectContryPhoneCode| 默认显示语种|object| --- | 否 |
|mobile| 默认显示手机号 |string | --- | 否 |
|mobileChangeHandle|改变语种和输入手机号改变| function | arg1:输入的手机号，arg2: 选中的语种 | 否 |
|placeholder|输入框的placeholder| string | -- | 否 |
|errorMessage|form表单提交错误时的报错提示| string | -- | 否 |
|inputId|输入框的key 默认是mobile| string | -- | 否 |
|form|传入form需要表单校验，否则不需要校验| string | -- | 否 |

## 注意事项

暂无

## 更新日志

