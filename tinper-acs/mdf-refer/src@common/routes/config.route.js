/*
* 前端路由配置
*
* @param component
* 必须
* 容器组件，
*
* @param module
* 非必须，
* 页面的reducer，可以不配置reducer
*
* @param moduleName
* 非必须
* 挂在到store中的reducer名称
*
* @param path
* 必须
* 路由路径
*
* @param title
* 非必须
* 窗口展示的标题，也可在页面逻辑中自由修改
*
* @param exact
* 非必须
* 是否路由精确匹配
*
* @param routes
* 非必须
* 子路由，内部数据结构与父路由相同
*
* */
//本处是以demo为例
export default [
  {
    component:require('./demoRouter/container').default,
    module:require('./demoRouter/reducer').default,
    moduleName:'demo',
    path:'/demo',
    title:'样例',
    exact:false,
    routes:[]
  }
]


