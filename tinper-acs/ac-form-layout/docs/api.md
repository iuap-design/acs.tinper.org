# 表单布局 FormLayout

项目中需要引入`tinper-bee`的样式文件

 ## 何时使用


 ## 如何使用

 ```
import FormLayout from 'ac-form-layout';
import 'ac-form-layout/build/FormLayout.css';

const { FormItem, FormRow,FormItemSpan } = FormLayout;
```

 ## 代码演示

 ## API

### FormLayout

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|disabled|表单内容是否可编辑|bool|-|

### FormItem

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|lable|label标签内容|string|-|
|required|是否必填|bool|-|
|errorMsg|错误信息，没有不传|node|-|

### FormItemSpan

只显示文字

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|lable|label标签内容|string|-|




 ## 注意事项

 暂无

 ## 更新日志