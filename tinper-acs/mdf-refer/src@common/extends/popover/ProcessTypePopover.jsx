import React, { Component } from 'react';
import { Popover, Button } from 'antd'; 
import SvgIcon from 'SvgIcon'
process.env.__CLIENT__ && require('./ProcessTypePopover.less');
export default class ProcessTypePopover extends Component {
  constructor(props){
    super(props);
    this.state={
      icontype:'wenhaomoren'
    }
  }
  handleEnter(){
    this.setState({"icontype":'wenhaolveguo'})
  }
  handleLeave(){
    // this.setState({"icontype":'wenhaomoren'})
  }
  handelChange(visible){
    if(!visible){
      this.setState({"icontype":'wenhaomoren'})
    }
  }
  render() {
    const title = (
      <strong>加工方式说明</strong>
    )
    const content = (
      <div className='after-popover-content'>
        <div className='after-popover-arrow'></div>
        <p><strong>预制</strong>：指预先加工入库在销售的加工商品，如面包、饼干等；预制商品受业务参数“允许负出库”控制。</p>
        <p><strong>现制</strong>：指需要现场销售制作的加工商品，如：咖啡、饮品等；现制商品不受业务参数“允许负出库”控制。</p>
        <p><strong>定制</strong>：指先预定再根据订单加工、入库、销售的商品，如：蛋糕、珠宝、其它订制品；定制商品受业务参数‘允许负出库’控制，但允许负可用。</p>
      </div>
    );
    return (
      <Popover placement="leftTop" content={content} title={title} onVisibleChange={this.handelChange.bind(this)} autoAdjustOverflow={false} onMouseEnter ={this.handleEnter.bind(this)} onMouseLeave ={this.handleLeave.bind(this)} overlayClassName="after-popover">
        <span className={'hoverhands'}><SvgIcon type={this.state.icontype} /></span>
      </Popover>
    );
  }
}