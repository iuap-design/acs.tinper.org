/**
 *
 * @title 基本示例3
 * @description 清空功能
 *
 */
import React, { Component } from 'react';
import { RefTreeTransferWithInput } from '../../src/index';
import { Button } from 'tinper-bee';
import '../../src/index.less';
import request from './request';
let options;
let refModelUrl = {
  treeUrl: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTree',
  tableBodyUrl: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTreeGrid',
};
class Demo3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
      confirmTargetKeys: [],
      transferData: [],
      targetKeys: ['005'],
      value: [{"refname":"人员5-自定义","refcode":"005","refpk":"5e3a85ec-5e14-4734-8b3a-1e6168426c89"}],
      valueField: 'refpk',
      displayField: '哈哈-{refname}-{refcode}-displayField',
      inputDisplay:'哈哈-{refname}inputDisplay',
    }
  }
  canClickGoOn = () => {
    this.initComponent();
    return true
  }
	/**
	 * @msg: 获取mock数据，只获取tree的data
	 * @param {type} 
	 * @return: 
	 */
  async initComponent() {

    let dataMap = await request(refModelUrl.treeUrl, {
      method: 'get',
    });
    this.setState({
      treeData: !!dataMap && !!dataMap.data ? dataMap.data : [],
    });
    this.handleTreeSelect({}, refModelUrl);
  }
	/**
	 * @msg: 由树节点获取穿梭框数据
	 * @param {type} 
	 * @return: 
	 */

  handleTreeSelect = async (selectNode = {}) => {
    let { valueField } = options;
    let dataMap = await request(refModelUrl.tableBodyUrl, {
      method: 'get',
      params: '自定义'
    });
    let { data } = dataMap;
    let { transferData, targetKeys } = this.state;
    let selectedData = transferData.filter(v => {
      return targetKeys.some(key => key == v[valueField])
    });
    if (!data) data = [];
    let temp = data.filter((v, k) => {
      return selectedData.every(v1 => v1[valueField] != v[valueField])
    })
    let tempTransferData = temp.concat(selectedData);
    this.setState({
      transferData: tempTransferData,
    });
  }
 /**
   * @msg: 保存，下拉选择词条保存，和参照弹框保存按钮
   * @param {type} 
   * @return: 
   */
  transferSave = (selectedArray) => {
    var { transferData, targetKeys } = this.state;
    const {valueField} = options;
    let targetKeysVal = [];
    selectedArray.forEach((v, i) => {
      targetKeysVal.push(v[valueField])
    });
   
    this.setState({
      targetKeys:targetKeysVal,
      confirmTargetKeys: selectedArray,
    })

  }
  /**
   * @msg: 弹框取消按钮
   * @param {type} 
   * @return: 
   */
  transferCancel = () => {
    let { confirmTargetKeys } = this.state;
    let {valueField} = options;
    let cancelTargetKeys = [];
    confirmTargetKeys.forEach((v, i) => {
      cancelTargetKeys.push(v[valueField])
    });
    console.log('取消',cancelTargetKeys)
    this.setState({
      targetKeys: cancelTargetKeys,
    })
  }
  /**
	 * @msg: 右穿梭选中数据触发，将穿梭右侧选中的数据传过去
	 * @param {type} 
	 * @return: 
	 */
  setTargetKeys = (targetKeys) => {
    this.setState({
      targetKeys,
    })
  }
  /**
   * @msg: 清空功能
   * @param {type} 
   * @return: 
   */
  clearFunc = () => {
    this.setState({
      value: `{"refname":"","refpk":"${Math.random()}"}`,
      targetKeys: [],
    })
  }

  render() {
   
    let { treeData, transferData = [], targetKeys, value,valueField,displayField,inputDisplay } = this.state
    //20190226穿梭框没有清空按钮并且目前存在问题

     options = {
      valueField : valueField,
      inputDisplay : inputDisplay,
      displayField : displayField,

    }
    let baseProps = {
       ...options,

      handleTreeSelect: this.handleTreeSelect,
      treeData,
      transferData,
      targetKeys,
      value: value,

      setTargetKeys: this.setTargetKeys,
      onSave: this.transferSave,
      onCancel: this.transferCancel,

      canClickGoOn: this.canClickGoOn,

      filterUrl:'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTreeGrid',
      multiple:true,
    }
    return (
      <div>
        <RefTreeTransferWithInput {...baseProps} />
        <Button colors="primary" onClick={this.clearFunc}> 清空</Button>
      </div>
    );
  }
}

export default Demo3;
