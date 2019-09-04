import React, { Component } from 'react';
import { Popover, Button } from 'antd';

export default class ProductBrand extends Component {
  constructor(props) {
    super(props);
  }
  handleClick = ()=>{
    const {model, rowData}=this.props;
    model.execute('dblClick', rowData);
  }
  handleOtherClick=()=>{
    // cb.utils.alert('被分配未被编辑的商品,不能查看', 'error');
  }
  render() {
    const {rowData} = this.props;
    // const isApplied = typeof rowData.isApplied==='boolean'?rowData.isApplied:true;
    // const Applied = isApplied ? <a title={rowData.name} onClick={this.handleClick}>{rowData.name}</a>:
      // <a title={rowData.name} onClick={this.handleOtherClick}>{rowData.name}</a>
    return (
      <div className="clearfix product-list-item" title={rowData.name}>
        <div className='product-list-item-img'>
          {rowData['url']?<img src={rowData['url']+'!PS'}/>:(rowData['productId_url']?<img src={rowData['productId_url']+'!PS'}/>:'')}
        </div> 
        <div>
          <p title={rowData.code||rowData.barCode}>{rowData.code || rowData.barCode}</p>
          <a title={rowData.name} onClick={this.handleClick}>{rowData.name}</a>
        </div>
      </div>
    )
  }
}
