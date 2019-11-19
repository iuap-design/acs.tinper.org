# 消息 AcToast

## 何时使用

代替原生按钮

## 如何使用

```
import Toast from 'ac-toast';
import 'ac-toast/dist/ac-toast.css';

Toast.info({
    msg: '提交成功',
    duration: 3000,
    transition: 'fade',
    icon: 'success',
    className: 'submit-success'
});

```

## 代码演示


## API 

### 参数

|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
| id |  随机字符串 |`string` | toast组件的id
|msg | 组件中显示的文字 | `string` | - 
|className | 组件顶层的class，用来自定义样式 | `string` | - 
|horizontal | 组件的水平位置。有3个预置选项: `center`,`left`,`right`| `string` | `center` | 
|vertical |  组件的竖直位置。有3个预置选项: `middle`,`top`,`bottom` | `string` | `middle` |
|duration |  组件显示时间，单位毫秒 | `number` | 2000 |
|mode | 多个组件连续弹出显示模式。内置的模式有: `override`,`queue`,`layout`。`override`模式, 最后显示的|toast会强制覆盖前面的。`queue`模式, toast排队显示，一个消失，才显示下一个。`layout`模式，toast会在竖直方向上排列，不覆盖 |`string` | `override` | 
|transition| toast组件显示和消失的过渡效果，预置的过渡有: `fade` | `string` | `fade` | 
|zIndex | 组件的层级| `number`  |  9999  |  
|onClose | 组件关闭后的回调 | `function` | - | 

### 方法

|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|
|info | 默认的黑色背景弹出消息 | above |  | 
|success | 绿色背景弹出成功消息 | above |  | 
|warning | 黄色背景弹出警告消息 | above | | 
|error | 红色背景弹出错误消息 | above |  | 
|close | 关闭指定id的toast | id：toast's id | | 
|closeAll |关闭所有的toast|   |  | 


## 注意事项

暂无

## 更新日志

