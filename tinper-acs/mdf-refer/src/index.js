/*
 * @Descripttion: 
 * @version: 
 * @Date: 2019-08-12 17:53:16
 * @LastEditTime: 2019-08-16 19:38:32
 */

/**
* refer.jsx 文件是从filter 继承过来的
* 支持非react 框架渲染
*/
// import 'babel-polyfill'
import React,{Component} from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import cb from '@mdf/cube/lib/cube';
import '@mdf/cube/lib/helpers/polyfill'
import { UretailAlert, UretailConfirm } from '@mdf/metaui-web/lib/components/common/UretailNotice';

import ConvenientQuery from '@mdf/metaui-web/lib/components/filter';
// import Refer from '@mdf/metaui-web/lib/components/basic/refer';
import Refer from '@mdf/metaui-web-ncc/lib/components/basic/refer';

import ListRefer from '@mdf/metaui-web/lib/components/basic/listrefer';
import TreeRefer from '@mdf/metaui-web/lib/components/basic/treerefer';
import filterscheme from '@mdf/metaui-web/lib/redux/filterscheme';

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
              <div className="listheadRow">
                {/* <Col span={24}> */}
                  <ConvenientQuery model={model} cols={config.cols} />
              {/* </Col> */}
            </div>
          </div>
      </Provider>)
    break;
    case 'refer':
      ThirdParty=(
      <Provider store={store}>
          <div>
              {/* <Col span={'line'} className={'viewCell width-percent-'+(100/config.cols).toFixed(0)}> */}
                    <Refer model={model}  {...config.modelconfig} />
              {/* </Col> */}
          </div>
      </Provider>)
    break;
    case 'listrefer':
      ThirdParty=(<Provider store={store}>
        <div className="listheadRow">
            {/* <Col span={'line'} className={'viewCell width-percent-'+(100/config.cols).toFixed(0)}> */}
                <ListRefer model={model}  {...config.modelconfig} />
            {/* </Col> */}
        </div>
      </Provider>)
    break;
    case 'treerefer':
      ThirdParty=(<Provider store={store}>
        <div className="listheadRow">
            {/* <Col span={'line'} className={'viewCell width-percent-'+(100/config.cols).toFixed(0)}> */}
                <TreeRefer model={model} {...config.modelconfig} />
            {/* </Col> */}
        </div>
      </Provider>)
    break;
    default:
    ThirdParty=(<div className='no-support'></div>)

  }

  return ThirdParty;
//   ReactDOM.render(ThirdParty, dom);
}
class MdfRefer extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.afterOkClickMdfRefer = this.afterOkClickMdfRefer.bind(this)
        this.afterValueChange = this.afterValueChange.bind(this);
        if(props.model)  props.model._set_data('events',{afterValueChange:[{callback:this.afterValueChange}]})

    }

    componentWillMount(){
      //初始化value，为了适配form
      let {model,value}  = this.props;
      if(!!value)model.setValue(value, true);
    }
    
    
    afterOkClickMdfRefer = (data) =>{
      let {config={}} = this.props;
      if(config.modelconfig){
        let {afterOkClick}  = config.modelconfig
        afterOkClick && afterOkClick(data)
      }
      
    }
    afterValueChange = (data) =>{
      //选中值之后更新value，为了适配form
      let {onChange,config={},model}  = this.props;
      onChange && onChange(data.value);
      if(config.modelconfig){
        let {afterValueChange}  = config.modelconfig
        afterValueChange && afterValueChange(data)
      }
    }
    render () {
       let {modelName,model,config,wrapClassName} = this.props;
       if(!config){config={} }
       if(modelName!=='filter' && !config.modelconfig){config.modelconfig={} }
       return (
        <Provider store={store}>
          <div className={`container-refer ${wrapClassName?wrapClassName:''}`}>
            <Refer model={model}  {...config.modelconfig} 
            afterOkClick={this.afterOkClickMdfRefer} 
            />
          </div>
        </Provider>
       )
    }
}

export default MdfRefer;
export {cb};
