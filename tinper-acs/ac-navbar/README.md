# 导航栏组件 Navbar

## 何时使用

导航栏组件(基于应用平台)

## 如何使用

```
import AcNavbar from 'ac-navbar';
import 'ac-navbar/dist/ac-navbar.css';

```

## 代码演示


## API 

|参数|说明|类型|默认值|
|:---|:----:|:---:|------:|
|showHeader|是否显示导航栏|bool|true|
|logo|设置导航栏中间的Logo|Function|`()=>{return <img src='//design.yonyoucloud.com/static/tinper-acs/ac-navbar/logo.svg'/>}`|
onSidebarClick | 导航栏左侧图标的点击事件，用于呼出菜单栏 | Function | ()=>{} |
onInputSearch | 导航栏左侧输入框的搜索回调事件 |Function | ()=>{} | 
searchInputProps | 传递给左侧输入框的属性集合，如 placeholder 等 |Object | {} | 

## 注意事项

暂无

## 更新日志
