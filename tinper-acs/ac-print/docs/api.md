# 打印 Print
iuap5.0 协同打印组件。 依赖打印服务，以及iuap5.0后台接口，否则无法运行

## 何时使用

单据打印或设计打印模板时

## 如何使用

```js

import Print from 'ac-print';

```

## 代码演示

## API

```js
/**
 * 实例化打印类
 * context 接口上下文  string  默认值：/demo-contract-server
 * printOrigin 打印地址上下文  string  默认值：https://u8cprint-daily.yyuap.com 
 * locale 多语资源  object  默认值： {getCodeError:'获取打印code失败',getTenantError:'获取租户id失败',checkDataFirst:'请先选择一条数据'}
 */
let print = new Print(context,printOrigin,locale);

/**
 * 调用打印预览
 * dataId 打印数据唯一标示(必填)  string  默认值：无
 * callback 打印预览回调  function  默认值：无
 */ 
print.printView(dataId,callback);

/**
 * 调用打印设计
 * callback 打印设计回调  function  默认值：无
 */ 
print.printDesign(callback)

```



## 注意事项

暂无

## 更新日志