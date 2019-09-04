import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import QRCode from 'qrcode.react';
export default class Qrcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  geturl(){
    let url;
    let mall_url = localStorage.getItem('mall_url');
    let wid = localStorage.getItem('wid');
    // let org_id = this.state.data.orgId;
    // let shop_id = this.state.data.shopId;
    // let customer_id = this.state.data.customerId;
    let goods_id = this.state.data.id;
    // let params=null;
    // if(org_id){
    //   // params=params?params+'&org_id='+org_id:'&org_id='+org_id
    // }else if(shop_id){
    //   params=params?params+'&shop_id='+shop_id:'&shop_id='+shop_id
    // }else if(customer_id){
    //   params=params?params+'&customer_id='+customer_id:'&customer_id='+customer_id
    // }
    let shopId = this.state.data.shopId
    url = mall_url+'/detail?goods_id='+goods_id+'&wid='+wid
    if(shopId)
      url+='&iShopId='+shopId
    return url
  }
  render() {
    const content = (
      <div style={{width:'119px',height:'110px',padding:'5px',marginTop:'-8px'}}>
        <QRCode value={this.geturl() || '没有商品地址'} size={109} />
      </div>
    );
    return (
      <Popover content={content}  trigger="click" mouseLeaveDelay={0.1}  placement="bottomRight" onVisibleChange={this.handleVisibleChange}>
        {this.props.children}
      </Popover>
    );
  }
}
