# acs.tinper.org

应用组件官网


## 更新组件步骤

1、在 `app/utils/getRelease.js` 配置 github token和user

2、执行 `npm run writeFile` 更新组件相关文件

3、执行 `npm start ` 本地运行




## 新增组件步骤

1、在 `sidebar.json` 文件中新增组件

2、在 `componentsSource.json` 文件中新增组件

3、在 `componentsType.json` 文件中配置组件类型。
   - `standard` 为标准组件，使用`bee-tools` 开发的组件。
   - `others` 为非标准组件，使用`ac-tools` 或者其它脚手架开发
