import React, { Component } from 'react';
import { Popover, Button,Input} from 'antd';

const InputGroup = Input.Group;
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default class Copyurl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      visible: false,
      data: props.data || {}
    };
  }
  componentWillReceiveProps(nextProps){
    this.setState({data:nextProps.data,visible:false})
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }
  onCopy = ()=>{
    cb.utils.alert('复制成功', 'success');
  }
  geturl(){
    let url;
    let mall_url = localStorage.getItem('mall_url');
    let wid = localStorage.getItem('wid');
    // let org_id = this.state.data.orgId;
    // let shop_id = this.state.data.shopId;
    // let customer_id = this.state.data.customerId;
    let goods_id = this.state.data.id;
    let shopId = this.state.data.shopId
    // let params=null;
    // if(org_id){
    //   // params=params?params+'&org_id='+org_id:'&org_id='+org_id
    // }else if(shop_id){
    //   params=params?params+'&shop_id='+shop_id:'&shop_id='+shop_id
    // }else if(customer_id){
    //   params=params?params+'&customer_id='+customer_id:'&customer_id='+customer_id
    // }
    url ='/detail?goods_id='+goods_id+'&wid='+wid
    if(shopId)
      url+='&iShopId='+shopId
    return url
  }
  render() {
    let erpCode = this.geturl() || '没有商品地址'
    const content = (<div style={{padding:'0 10px'}}>
        <Input defaultValue={erpCode} value={erpCode} disabled={true} style={{ width: '215px' }} />
        <CopyToClipboard text={erpCode} onCopy={this.onCopy}>
          <a style={{paddingLeft:'10px',color:'#3b5af4'}}>复制链接</a>
        </CopyToClipboard>
    </div>
    );
    return (
      <Popover content={content}  trigger="click"  mouseLeaveDelay={0.5}  placement="bottomRight" onVisibleChange={this.handleVisibleChange}>
        {this.props.children}
      </Popover>
    );
  }
}
