import Immutable from 'immutable';
import { genAction, proxy } from '@mdf/cube/lib/helpers/util';

const serviceData={
   domainService:'dataPermission/getAllDomain',
   authListService:'dataPermission/getUserAuthReferListByUser'
}
const $$initialState = Immutable.fromJS({
  allDomain:[],  //领域列表
  authList:[],    //人员列表
});
export default (state = $$initialState, action) => {
  switch (action.type) {
    case 'DEMO_UI_GET_DOMAIN_LIST':
      return state.merge({ allDomain: action.payload });
    case 'DEMO_UI_GET_AUTH_LIST':
      return state.merge({authList:action.payload});
    case 'PLATFORM_UI_HOME_SALE_TREND_CHANGE_SHOP_DATA':
      return state.merge({ trend_showData: action.payload });
    default:
      return state;
  }
}



export function getAllDomainList(data) {
  return async function (dispatch, getState) {

    const config = {
      url: serviceData.domainService,
      method: 'GET',
    };
    const json = await proxy(config);
    console.log(json);
    if (json.code !== 200) {
      cb.utils.alert(json.message, 'error');
    } else {
      dispatch(genAction('DEMO_UI_GET_DOMAIN_LIST', json.data));

    }
  }
}

export function getAuthList(id) {
  return async function (dispatch, getState) {
    const config = {
      url: serviceData.authListService,
      method: 'GET',
      param:{
        userId:id
      }
    };
    const json = await proxy(config);
    console.log(json);
    if (json.code !== 200) {
      cb.utils.alert(json.message, 'error');
    } else {
      dispatch(genAction('DEMO_UI_GET_AUTH_LIST', json.data));

    }
  }
}



