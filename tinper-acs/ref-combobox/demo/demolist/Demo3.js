/**
 *
 * @title 基础示例3
 * @description 清空功能，纯ref-combobox
 *
 */

import React, { Component } from 'react';

import Form from "bee-form";
import RefComboBoxBaseUI, { ComboStore, ComboItem } from '../../src';
import '../../src/index.less';
import Icon from 'bee-icon';
import 'bee-icon/build/Icon.css';
import Button from 'bee-button';
import 'bee-button/build/Button.css';
import request from '../../src/utils/request';

let op = {
  valueField: 'refcode',
  displayField: (record) => {
    return <div > <Icon type="uf-personin-o" style={{ color: 'red' }} /> {record.refname}-{record.refcode}-{record.type}</div>
  },
}
class Demo3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currPageIndex: 1,
      value: '{"refpk":"be400fd7-afeb-47de-978d-1c47be4a72c3","refname":"能有33"}',  //M0000000000002
      storeData: [],
      searchValue: '',
    };
  }
  /**
   * @msg: 请求mock数据
   */
  loadData = async () => {
    this.setState({
      loading: true,
    })
    let ajax = {
      url: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefCombobox',

    };
    let { currPageIndex, searchValue } = this.state;
    if (!ajax.params) ajax.params = {};
    ajax.params.page = currPageIndex;
    ajax.params['refClientPageInfo.currPageIndex'] = currPageIndex
    ajax.params['refClientPageInfo.pageSize'] = 10;
    ajax.params['content'] = searchValue;
    let results = await request(ajax);
    let storeData = [];
    if (!results || !results.data.length) {
      this.setState({
        loading: false,
        pageCount: -1,//不展示分页
        totalElements: 0,
        storeData,
      });
      return false;
    }
    storeData = results.data;
    let page = results.page;
    this.setState({
      storeData,
      ...page,
      loading: false
    });

  }
  /**
   * @msg: 下拉状态改变，用来初始化数据
   * @param {type}  bool
   * @return: 
   */
  onPopupVisibleChange = (open) => {
    if (open && !this.state.storeData.length) {
      this.loadData();
    }
  }
  /**
   * @msg: selector数值发生改变
   * @param {type}
   * @return: 
   */
  onSelectorChange = (id, item, status, selectedArray) => {
    console.log('selector数值发生改变', id, item, status, selectedArray);
    this.setState({
      value:selectedArray,//可以改成数组，或者继续拼接成字符串
    })
  }
  /**
   * @msg: 搜索
   * @param {type} 
   * @return: 
   */
  onSearch = (value) => {
    console.log('搜索', value)
    this.setState({
      searchValue: value
    }, () => {
      this.loadData()
    })
  }
  /**
    * @msg: 分页跳转
    * @param {type} 
    * @return: 
    */
  onPaginationSelect = (currPageIndex) => {
    console.log('分页跳转', currPageIndex);
    this.setState({
      currPageIndex: currPageIndex
    }, () => {
      this.loadData()
    })
  }
  /**
   * @msg: 清空功能
   * @param {type} 
   * @return: 
   */
  clearFunc = () =>{
    this.setState({
      value:null
    })
  }
  render() {
    let { searchValue, currPageIndex, storeData, loading } = this.state;
    return (
      <div className="demoPadding">
        <RefComboBoxBaseUI
          displayField={(record) => { return `${record.refname}-haha` }}
          inputDisplay={item => { return `我们的:${item.refname}` }}
          valueField={'refpk'}
          lang={'zh_CN'}
          loading={loading}
          storeData={storeData}
          onSelectorChange={this.onSelectorChange}
          onPaginationSelect={this.onPaginationSelect}
          onSearch={this.onSearch}
          pageCount={5}
          currPageIndex={currPageIndex}
          searchValue={searchValue}
          onPopupVisibleChange={this.onPopupVisibleChange}
          value={this.state.value}
        >
        </RefComboBoxBaseUI>
        <Button
          colors="primary"
          onClick={this.clearFunc}>
          清空
         </Button>
      </div>
    )
  }
}


export default Demo3;
