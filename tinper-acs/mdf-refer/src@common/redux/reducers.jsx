import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
/*框架内置功能*/
import portal from '@mdf/metaui-web/lib/redux/portal'
import user from '@mdf/metaui-web/lib/redux/user'
import { tree } from '@mdf/metaui-web/lib/redux/tree'
import { tabs } from '@mdf/metaui-web/lib/redux/tabs'
import userDefineArchives from '@mdf/metaui-web/lib/redux/userDefineArchives'
import dynamicModal from '@mdf/metaui-web/lib/redux/dynamicModal'
import print from '@mdf/metaui-web/lib/redux/print'
import billDesign from '@mdf/metaui-web/lib/redux/billDesign'
import loading from '@mdf/metaui-web/lib/redux/loading'
import groupCondition from '@mdf/metaui-web/lib/redux/groupCondition'
import formula from '@mdf/metaui-web/lib/redux/formula';
import filterscheme from '@mdf/metaui-web/lib/redux/filterscheme';

import reducersMap from '../routes/config.route'
const mapReducer=(reducers)=>{
  const reducersMap={};
  reducers.forEach(reducer=>{
    if(reducer.moduleName && reducer.module){
      const name=reducer.moduleName.toLowerCase();
      reducersMap[name]=reducer.module;
    }
  })
  return reducersMap;
}

export default combineReducers(Object.assign({
  portal, //meta渲染需要 暂时保留
  user, //  src/client 有引用
  tree,//meta渲染需要 暂时保留
  tabs,//meta渲染需要 暂时保留
  userDefineArchives, //自定义档案， 内置通用
  dynamicModal,//meta渲染需要
  print, // 内置通用
  billDesign,// 内置通用
  routing,
  loading,// 内置通用
  groupCondition,// meta渲染
  formula,// bill-design 模块
  filterscheme,//filter 组件
},mapReducer(reducersMap)))
