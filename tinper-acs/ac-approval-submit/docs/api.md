# 流程提交 ApprovalSubmit

组件iuap 5.0 后端接口。 否则无法使用

## 何时使用

iuap 5.0 开发，单据提交到流程时

## 如何使用


## 代码演示

## API

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|processkey|业务标识|string|1357000026525952|
|record|必填，单据对象|object|-|
|callback|回调|function|-|
|type|提交按钮类型 `button/line`|string|line|
|context|接口上下文|string|/demo-contract-server|
|submitProcessInstJudgeGo|是否需要接口判断|bool|false|
|locale|多语资源|object|`{activityName:'环节名称',userName:'被指派人',options:'操作',code:'编码',name:'名称',subSucess:'提交成功',assign:'指派',selectionOfficer:'选择人员'}`|


 ## 注意事项

 暂无

 ## 更新日志