//按日配送频次
import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;
process.env.__CLIENT__ && require('./producttpl.less');
export default class DistributionFrequency extends Component {
  constructor(props) {
    super(props);
    this.state={
      _json:{
        '1':'每天送',
        '2':'隔天送',
        '3':'工作日送',
        '4':'双休日送'
      },
      values:''
    }
    this._json={}
  }  
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
    this.handleFocus()
  }
  getCycleValues(_val){ // 获取周期的值
    let json={}
    switch (_val){
      case '2':
        json={
          '1':'周一',
          '2':'周二',
          '3':'周三',
          '4':'周四',
          '5':'周五',
          '6':'周六',
          '7':'周日'
        }
      break;
      case '3':
        Array.from(new Array(31)).forEach((val,index)=>{
          json[index+1]=(index+1)+'号'
        })
      break;
      default:
        json={
          '1':'每天送',
          '2':'隔天送',
          '3':'工作日送',
          '4':'双休日送'
        }
    }
    return json
  }
  handleFocus = ()=>{
    let _val = this.props.model.getCellValue(0,'values')
    let values = this.props.model.getCellValue(4,'values')
    this.setState({
      _json:this.getCycleValues(_val),values:values
    })
  }
  handleSelect=(value, option)=>{
    let _values = this.state.values;
    _values = (_values ? _values+'|'+ value : value)
    this.setState({
      values:_values
    })
  }
  handleDeselect=(value)=>{
    let _values = this.state.values.split('|');
    let _index = _values.indexOf(value);
    _values.splice(_index,1)
    this.setState({values:_values.join('|')})
  }
  render() {
    let  {mode} =this.props;
    let _values =  this.props.model.getCellValue(4,'values')
    let checkedList = !_values?[]:(this.state.values && this.state.values.split('|') || [])
    const children = Object.keys(this.state._json).map((val,index)=>{
      return <Option key={index} value={val}>{this.state._json[val]}</Option>
    })
    if(mode=='browse'){
      let browseValue = _values.split('|');
      let _val = this.props.model.getCellValue(0,'values')
      return <span>
        {browseValue.length && browseValue.map((v,index)=>{
          return this.getCycleValues(_val)[v]
        }).join('|')}
      </span>
    }
    return (
      <Select
        mode="multiple"
        placeholder="请选择配送频次"
        defaultValue={checkedList}
        value={checkedList}
        onFocus={this.handleFocus}
        onChange={this.props.handleChange}
        onSelect={this.handleSelect}
        onDeselect={this.handleDeselect}
        className='frequency'
      >
        {children}
      </Select>
    );
  }
}
