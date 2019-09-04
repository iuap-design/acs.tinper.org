import React,{Component} from 'react'
import {proxy,rebuildTreeData} from '@mdf/cube/lib/helpers/util'
import Menu from '@mdf/metaui-web/lib/components/basic/menu';
import mockData from './mock/treeData'
if(process.env.__CLIENT__){
  require('./index.less')
}
export default class MenuTree extends Component{
  constructor(props){
    super(props);
    this.state={
      treeData:[],
      keyField: 'code',
      titleField: 'name'
    }
  }
  componentWillMount(){
    //TODO 在这个位置请求，node端会报cb未定义错误
    //this.getMenuTree();
  }
  componentDidMount(){
    this.getMenuTree();
  }
  getMenuTree= async  ()=> {
    const config = {
      url: `getMenuTree`,
      method: 'POST',
      options: { uniform: false }
    };
    const json =await proxy(config);
    debugger;
    if (json.code !== 200) {
      cb.utils.alert(json.message, 'error');
      console.log(mockData);

      this.setState({
        treeData:mockData
      })
      return;
    }
    json.data = json.data || [];
    const orgMenus = [], storeMenus = [];
    rebuildTreeData(json.data, orgMenus, storeMenus);
    this.setState({
      treeData:json.data
    })
    //TODO 环境起不来，暂时不清楚以下代码的作用
    const showOptions = {
      showOrg: orgMenus.length ? true : false,
      showStore: storeMenus.length ? true : false
    };
    if (showOptions.showStore) {
      showOptions.canBilling = storeMenus.find(item => {
        return item.code.indexOf('RM0101') > -1;
      }) ? true : false;
    }

  }
  onClick = (selectedKeys) => {
    if (selectedKeys.length !== 1) return;
    const {treeData}=this.state;
    const menuCode=selectedKeys[0];
    const returnData=[];
    this.recursiveFind(treeData, menuCode, returnData);
    if (returnData.length !== 1) {
      cb.utils.alert(`没有找着编码为${menuCode}的菜单`, 'error');
      return;
    }
    const selectedNode=returnData[0];
    const menuId = selectedNode[this.state.keyField];
    if (!menuId) {
      cb.utils.alert('menuId为空', 'warning');
      return;
    }
    const viewType=selectedNode.viewType;
    let path='';//拼接跳转的路径
     if(viewType){
       if(viewType=='meta'){
         path=viewType+'/'+selectedNode.metaType+'/'+selectedNode.metaKey;
       }else if(viewType=='platform'){
         path=viewType+'/'+selectedNode.menuUrl;
       }else {
         cb.utils.alert('暂不支持其他类型','warning');
         returnl;
       }
       cb.route.pushPage(path);
     }else {
       return ;
     }


  }
  recursiveFind = (list, code, data) => {
    if (!list.length) return;
    list.forEach(item => {
      if (item.children) {
        this.recursiveFind(item.children, code, data);
      } else {
        if (item.code !== code) return;
        data.push(item);
      }
    })
  }


  render(){
    const {treeData}=this.state;
    return (

      <div className="menu-tree">
      <div className="menu-tree-container-title">
        业务功能菜单(可调试)
      </div>
        <div className="menu-tree-container">
          {treeData.length>0 && (<Menu trigger={'hover'} defaultSelectedKeys={['PORTAL']} titleField={this.state.titleField} keyField={this.state.keyField}
                                       dataSource={treeData} onSelect={this.onClick}
                                       id={'menu2'} />)}
        </div>


      </div>
    )
  }


}
