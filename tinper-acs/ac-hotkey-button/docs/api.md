# 快捷键按钮 HotkeyButton


 ## 何时使用


 ## 如何使用

```
import HotkeyButton from 'ac-hotkey-button';
import 'ac-hotkey-button/build/HotkeyButton.css';
```

 ## 代码演示

 ## API

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|keyName|键盘快捷键组合|string|-|
|onClick|点击回调|func|-|
|onKeyDown|onKeyDown回调|func|-|
|onKeyUp|onKeyUp回调|func|-|
|tooltip|鼠标hover时的提示信息，如不需要不传|node|-|

### keyName 说明：

支持 `⇧`, `shift`, `option`, `⌥`, `alt`, `ctrl`, `control`, `command`, `⌘` .

`⌘` Command()  
`⌃` Control  
`⌥` Option(alt)  
`⇧` Shift  
`⇪` Caps Lock   
`↩︎` return/enter
`space` space keys

 ## 注意事项



 ## 更新日志