import React, { Component } from 'react';
import { Popover, Button,Input} from 'antd';

const InputGroup = Input.Group;
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default class CopyBrandClassurl extends Component {
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
    return '/list?categoryid='+this.state.data.id
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
