import React, { Component } from 'react';
import { Modal, Radio, InputNumber, DatePicker } from 'antd';
import moment from 'moment';

const RadioGroup = Radio.Group;

export default class IntelligenceDemand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 7
    };
  }
  handleOk() {
    let startDate = null, endDate = null;
    switch (this.radio.state.value) {
      case 1:
        endDate = moment();
        startDate = moment().subtract(this.state.number, 'days');
        break;
      case 2:
        startDate = this.startDate;
        endDate = this.endDate;
        break;
    }
    if (startDate || endDate) {
      const saleDate = {};
      if (startDate)
        saleDate.startDate = startDate.format('YYYY-MM-DD') + ' 00:00:00';
      if (endDate)
        saleDate.endDate = endDate.format('YYYY-MM-DD') + ' 23:59:59';
      this.props.model.execute('afterOkClick', { key: 'IntelligenceDemand', value: { saleDate } });
    }
    this.handleCancel();
  }
  handleCancel() {
    this.props.close();
  }
  handleNumberChange = (value) => {
    this.setState({ number: value });
  }
  handleStartDateChange = (value) => {
    this.startDate = value;
  }
  handleEndDateChange = (value) => {
    this.endDate = value;
  }
  renderContentNode() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const numberStyle = { width: 40 };
    const dateStyle = { width: 100 };
    return (<div>
      <h3 style={radioStyle}>按历史销量补货</h3>
      <h4 style={radioStyle}>补货数量=指定时间段内的销量-在途数量</h4>
      <h3 style={radioStyle} className="h3-margin">销售时间</h3>
      <RadioGroup ref={radio => this.radio = radio} onChange={this.onChange} defaultValue={1}>
        <Radio style={radioStyle} value={1}>统计近{<InputNumber style={numberStyle} value={this.state.number} min={1} onChange={this.handleNumberChange} />}天（不含当天）的销售数量</Radio>
        <Radio style={radioStyle} value={2}>统计指定日期范围内的销量{<DatePicker style={dateStyle} onChange={this.handleStartDateChange} />}<span className="ant-time-color">-</span>{<DatePicker style={dateStyle} onChange={this.handleEndDateChange} />}</Radio>
      </RadioGroup>
    </div>);
  }
  render() {
    const contentNode = this.renderContentNode();
    return (
      <Modal className="modal-IntelligenceDemand" width={710} visible={true} maskClosable={false} title='智能补货规则' onOk={e => this.handleOk()} onCancel={() => this.handleCancel()}>
        {contentNode}
      </Modal>
    );
  }
}
