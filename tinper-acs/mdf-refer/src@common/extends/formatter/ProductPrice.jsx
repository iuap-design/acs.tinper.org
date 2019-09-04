import React, { Component } from 'react';
process.env.__CLIENT__ && require('./producprice.less');
export default class ProductPrice extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const rowData= this.props.rowData;
    const batchPrice = rowData['detail!batchPrice'];
    const fMarkPrice = rowData['detail!fMarkPrice'];
    const fSalePrice = rowData['detail!fSalePrice'];
    const fPrimeCosts = rowData['detail!fPrimeCosts'];
    const Price = []
    let num = 2 //cb.rest.AppContext.option.monovalentdecimal
    let _num = 0
    if(typeof batchPrice=='number'){
      Price.push(<li key={_num}>
            <span title='批发价'>批发价 : </span>
            <em title={batchPrice.toFixed(num)}> {batchPrice.toFixed(num)}</em>
        </li>)
      _num++
    }
    if(typeof fMarkPrice=='number' ){
      Price.push(
        <li key={_num}>
            <span title='建议零售价'>建议零售价 : </span>
            <em title={fMarkPrice.toFixed(num)}> {fMarkPrice.toFixed(num)}</em>
        </li>)
      _num++
    }
    if(typeof fSalePrice=='number'){
      Price.push(
        <li key={_num}>
            <span title='线上零售价'>线上零售价 : </span>
            <em title={fSalePrice.toFixed(num)}> {fSalePrice.toFixed(num)}</em>
        </li>)
      _num++
    }
    if(typeof fPrimeCosts=='number'){
      Price.push(
        <li key={_num}>
            <span title='进货价'>进货价 : </span>
            <em title={fPrimeCosts.toFixed(num)}> {fPrimeCosts.toFixed(num)}</em>
        </li>)
    }

    return (
      <ul title='价格' className='product-price clearfix' style={{width:'320px'}}>
        {Price}
      </ul>
    );
  }
}
