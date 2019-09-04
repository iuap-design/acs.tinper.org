import React, { Component } from 'react';
import { Modal, Checkbox } from 'antd';
import { Table } from 'antd';

export default class RcreateSKU extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      selectedRows:[]
    };
  }
  handleOk() {
    if(!this.state.selectedRows.length){
      cb.utils.alert('请选择SKU的值', 'warning');
      return false
    }
    this.props.model.execute('afterHandleOK', { key: 'RcreateSKU', value:this.state.selectedRows});
    this.props.close();
  }
  handleCancel() {
    this.props.close();
  }
  render() {
    let {data,columns} = this.props;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({selectedRows:selectedRows})
      }
    };
    return (
      <Modal width={710} visible={true} maskClosable={false} title='重新生成SKU' onOk={e => this.handleOk()} onCancel={() => this.handleCancel()}>
         <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </Modal>
    );
  }
}
