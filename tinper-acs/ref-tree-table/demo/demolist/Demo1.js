/**
 *
 * @title 基础示例1
 * @description RefTreeTableBaseUI,`multiple`单选,`miniSearch`简单搜索。注意单选展示radio需要手动封装
 *
 */

import React, { Component } from 'react';
import RefTreeTableBaseUI from '../../src/index';
import '../../src/index.less';
import { Button } from 'tinper-bee';
import Radio from 'bee-radio';
import 'bee-radio/build/Radio.css';
import request from './request';
let options = {};
class Demo1 extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showLoading: false,
      searchValue: '',
      value: '',
      matchData: [],
    }
    this.page = {
      pageCount: 1,//总页数
      pageSize: '10',//每页数据数
      totalElements: 9,
      currPageIndex: 0,
    };

  }
  /**
   * @msg: 请求mock数据，包含三项：树 表头 表体的数据
   * @param {type} 
   * @return: 
   */
  loadData = () => {
    if (!this.state.showLoading) {
      this.setState({ showLoading: true })
    }
    let refModelUrl = {
      treeUrl: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTree',
      refInfo: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/refInfo',//表头请求
      tableBodyUrl: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTreeGrid',//表体请求
    };
    let requestList = [
      request(refModelUrl.treeUrl, {
        method: 'get',
      }),
      request(refModelUrl.refInfo, {
        method: 'get',
      }),
      request(refModelUrl.tableBodyUrl, {
        method: 'get',
        'refClientPageInfo.currPageIndex': this.page.currPageIndex - 1,
        'refClientPageInfo.pageSize': this.page.pageSize,
        content: this.state.searchValue,
      }),
    ];

    Promise.all(requestList).then(([treeData, columnsData, bodyData]) => {
      this.getTreeData(treeData)
      this.launchTableHeader(columnsData);
      if (bodyData) {
        this.launchTableData(bodyData);
      }
      this.setState({
        showLoading: false
      });
    }).catch((e) => {
      this.launchTableHeader({});
      this.launchTableData({});
      this.setState({
        showLoading: false
      });
      console.log(e)
    });;
  }
  /**
   * @msg: 根据treeUrl获取树数据
   * @param {type} 
   * @return: 
   */
  getTreeData = (res) => {
    let { data } = res;
    if (data && data.length > 0) {
      this.treeData = data;
    } else {
      this.treeData = [];
    }
  }

  /**
   * 根据 refinfo 返回结果拆解并渲染表格表头
   * @param {object} data 
   */
  launchTableHeader = (data) => {
    if (!data) return;
    let { multiple, valueField } = options;
    let keyList = data.strFieldCode || [];
    let titleList = data.strFieldName || [];
    let colunmsList = keyList.map((item, index) => {
      return {
        key: item,
        dataIndex: item,
        title: titleList[index]
      }
    });
    if (colunmsList.length === 0) {
      colunmsList = [{ title: "未传递表头数据", dataIndex: "nodata", key: "nodata" }];

    } else if (!multiple) {
      //单选时用对号符号标记当前行选中
      colunmsList.unshift({
        title: " ",
        dataIndex: "a",
        key: "a",
        width: 45,
        render(text, record, index) {
          return (
            <Radio.RadioGroup
              name={record[valueField]}
              selectedValue={record._checked ? record[valueField] : null}
            >
              <Radio value={record[valueField]}></Radio>
            </Radio.RadioGroup>
          )
        }
      })

    }
    this.columnsData = colunmsList;
  }

	/**
	 * 处理并渲染表格数据
	 */
  launchTableData = (response) => {
    if (!response) return;
    let { valueField } = options;
    let { data = [], page = {} } = response;
    data.map((record, k) => {
      record.key = record[valueField];
      return record;
    });
    this.tableData = data;
    this.originTableData = data;//这个没有用处，只是为了生成假数据
    this.page = {
      pageCount: page.pageCount || 0,
      currPageIndex: page.currPageIndex || 0,
      totalElements: page.totalElements || 0,
    }

  }
  /**
   * @msg: 左树点击,record是树的节点信息
   * @param {type} 
   * @return: 
   */
  onTreeChange = (record) => {
    this.tableData = this.originTableData.slice(Math.floor(Math.random() * 8), -1);
    this.setState({
      mustRender: Math.random()
    })
  }
  /**
   * @msg: 左树上的搜索回调
   * @param {type} 
   * @return: 
   */
  onTreeSearch = (value) => {
    alert(value);
  }
  /**
  * @msg: 右表上的搜索回调
  * @param {type} 
  * @return: 
  */
  onTableSearch = (value) => {
    console.log('onTableSearch', value)
  }
  loadTableData = (param) => {
    console.log('loadTableData', param)
  }
  /**
   * @msg: 参照确认按钮的回调
   * @param {type} 
   * @return: 
   */
  onSave = (result) => {
    console.log('save', result)
    this.setState({
      showModal: false,
      matchData: result,
    })
  }
  /**
   * @msg: 参照弹框右上角X和取消
   * @param {type} 
   * @return: 
   */
  onCancel = () => {
    this.setState({ showModal: false })
  }

  render() {
    options = {
      displayField: '{refname}',
      valueField: 'refpk',
      lang: 'zh_CN',
      miniSearch: true,
      multiple: false,
    }
    return (

      <div className="demo-label">
        <RefTreeTableBaseUI
          {...options}

          treeData={this.treeData}
          columnsData={this.columnsData}
          tableData={this.tableData}
          page={this.page}
          matchData={this.state.matchData}

          showModal={this.state.showModal}

          onTreeChange={this.onTreeChange}
          onTreeSearch={this.onTreeSearch}
          onTableSearch={this.onTableSearch}
          onSave={this.onSave}
          onCancel={this.onCancel}
          loadTableData={this.loadTableData}

        />
        <Button colors="primary" onClick={() => { this.setState({ showModal: true },()=>{this.loadData()}) }}>打开弹框</Button>
      </div>
    )
  }
};

export default Demo1;


