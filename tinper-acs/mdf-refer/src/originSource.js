/**
* refer.jsx 文件是从filter 继承过来的
* 支持非react 框架渲染
*/
// import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import cb from '@mdf/cube/lib/cube'

import '@mdf/cube/lib/helpers/polyfill'
import { UretailAlert, UretailConfirm } from '@mdf/metaui-web/common/components/common/UretailNotice';

import Row from '@mdf/metaui-web/common/components/basic/row';
import Col from '@mdf/metaui-web/common/components/basic/col';
import ConvenientQuery from '@mdf/metaui-web/common/components/filter';
import Refer from '@mdf/metaui-web/common/components/basic/refer';
import ListRefer from '@mdf/metaui-web/common/components/basic/listrefer';
import TreeRefer from '@mdf/metaui-web/common/components/basic/treerefer';
import filterscheme from '@mdf/metaui-web/common/redux/filterscheme';

// import './styles/default/filtercontainer.jsx'
import './index.less';
const store = createStore(combineReducers({
  filterscheme,
}), {}, applyMiddleware(thunk));

cb.utils.confirm = UretailConfirm();
cb.utils.alert = UretailAlert();
cb.rest.mode = 'xhr';
cb.utils.initSupport = function (modelName,model, config) {
  if(!config){config={} }
  if(!config.cols){config.cols=3 }
  if(modelName!=='filter' && !config.modelconfig){config.modelconfig={} }
  var ThirdParty;
  switch (modelName){
    case 'filter':
      ThirdParty=(<Provider store={store}>
          <div className='container-browse-mode'>
            <Row className="listheadRow">
                <Col span={24}><ConvenientQuery model={model} cols={config.cols} /></Col>
            </Row>
          </div>
      </Provider>)
    break;
    case 'refer':
      ThirdParty=(<Provider store={store}>
          <Row>
              <Col span={'line'} className={'viewCell width-percent-'+(100/config.cols).toFixed(0)}>
                    <Refer model={model}  {...config.modelconfig} />
              </Col>
          </Row>
      </Provider>)
    break;
    case 'listrefer':
      ThirdParty=(<Provider store={store}>
        <Row className="listheadRow">
            <Col span={'line'} className={'viewCell width-percent-'+(100/config.cols).toFixed(0)}>
                <ListRefer model={model}  {...config.modelconfig} />
            </Col>
        </Row>
      </Provider>)
    break;
    case 'treerefer':
      ThirdParty=(<Provider store={store}>
        <Row className="listheadRow">
            <Col span={'line'} className={'viewCell width-percent-'+(100/config.cols).toFixed(0)}>
                <TreeRefer model={model} {...config.modelconfig} />
            </Col>
        </Row>
      </Provider>)
    break;
    default:
    ThirdParty=(<div className='no-support'></div>)

  }

  return ThirdParty;
//   ReactDOM.render(ThirdParty, dom);
}
export default cb;