import React from 'react'
import { Route } from 'react-router'

// 通用错误页面
import ErrorNotFoundPage from '@mdf/metaui-web/lib/components/errors/NotFound'
import DynamicView from '@mdf/metaui-web/lib/components/portal/DynamicView'
import BussinessMenu from './bussinessMenu';
import RoutesMap from './config.route'

const renderRoutes=(routes)=>{
  return routes.map((route,index)=>{
    if(Array.isArray(route.routes) && route.routes.length>0){
      return <Route key={index}  exact={route.exact} component={route.component} path={route.path}>
        {renderRoutes(route.routes)}
      </Route>
    }else {
      return  <Route key={index}  exact={route.exact} component={route.component} path={route.path}></Route>
    }
  })
}
export default (
  <Route>
    {renderRoutes(RoutesMap)}
    <Route path="/menu" component={BussinessMenu} />
    <Route path="/platform/:menuurl" component={DynamicView} />
    <Route path="meta">
      <Route path=":billtype/:billno" component={DynamicView} />
      <Route path=":billtype/:billno/:billid" component={DynamicView} />
    </Route>
    <Route path="*" component={ErrorNotFoundPage} />
  </Route>
)
