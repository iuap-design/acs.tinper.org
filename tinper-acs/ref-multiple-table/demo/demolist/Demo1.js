/**
 *
 * @title 基础示例1
 * @description RefMultipleTableBaseUI, `multiple=false`单选、`miniSearch`简单搜索。注意单选展示radio需要手动封装
 *
 */
import React, { Component } from 'react';
import RefMultipleTableBaseUI from '../../src/index';
import '../../src/index.less';
import { Button } from 'tinper-bee';
import Radio from 'bee-radio';
import 'bee-radio/build/Radio.css';
import request from './request';
let options = {}
class Demo1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      showModal: false,
      matchData:[
        {
          "mobile":"15011430235",
          "name":"人员5",
          "refpk":"5e3a85ec-5e14-4734-8b3a-1e6168426c89",
          "refname":"人员5",
          // "email":"55@26.com"
        }
      ],
    };
    this.page = {
      pageCount: 0,
      pageSize: 10,
      currPageIndex: 1,
    };
    this.tableData = [];
    this.columnsData = [];

  }
  
  /**
   * @msg: 请求mock数据，包含表头数据和表体数据
   * @param {type} 
   * @return: 
   */
  loadData = async () => {
    let refModelUrl = {
      tableBodyUrl: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTreeGrid',//表体请求
      refInfo: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/refInfo',//表头请求
    }
    let requestList = [
      request(refModelUrl.refInfo, { method: 'get' }),//表头数据
      request(refModelUrl.tableBodyUrl, { method: 'get' }), //表体数据
    ];
    Promise.all(requestList).then(([columnsData, bodyData]) => {
      this.launchTableHeader(columnsData);
      this.launchTableData(bodyData);
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
 * 根据 refinfo 返回结果拆解并渲染表格表头
 * @param {object} data 
   * 注意：单选时候自己添加radio
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
    this.columnsData = colunmsList

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
    this.page = {
      pageCount: page.pageCount || 0,
      currPageIndex: page.currPageIndex + 1 || 0,
      totalElements: page.totalElements || 0
    }
  }
  /**
   * @msg: 简单搜索的回调，与复杂搜索的回调不是同一个
   * @param {type} 
   * @return: 
   */
  miniSearchFunc = (value) =>{
    alert('搜索'+value)
  }

  /**
   * 跳转到制定页数的操作
   * @param {number} index 跳转页数
   */
  handlePagination = (index) => {
    this.page.currPageIndex = index;
    this.setState({ number: Math.random() })
  }
	/**
	 * 选择每页数据个数
	 */
  dataNumSelect = (index, pageSize) => {
    console.log(index, pageSize)
  }
  /**
   * @msg: modal框确认按钮
   * @param {type} 
   * @return: 
   */
  onSave = (item) => {
    this.checkedArray = item;
    this.setState({
      showModal: false,
      matchData: item,
    })
  }
  /**
   * @msg: modal框右上X和右下角取消
   * @param {type} 
   * @return: 
   */
  onCancel = () => {
    this.setState({ showModal: false })
  }

  render() {
    let { showLoading, showModal ,matchData} = this.state;
    let { columnsData, tableData, page } = this;
    options = {
      miniSearch: true,
      multiple: false,
      valueField: "refpk",
      displayField: "{refname}",
    }
    let childrenProps = Object.assign({}, options, {
      showModal: showModal,
      showLoading: showLoading,
      columnsData: columnsData,
      tableData: tableData,
      ...page,
      matchData,
      miniSearchFunc:this.miniSearchFunc,
      dataNumSelect: this.dataNumSelect,
      handlePagination: this.handlePagination,
      onSave: this.onSave,
      onCancel: this.onCancel,
    });
    return (
      <div className="demoPadding">
        <RefMultipleTableBaseUI
          {...childrenProps}
        
        />
        <Button
          colors="primary"
          onClick={() => {
            this.setState({ showModal: true },()=>{this.loadData()})
          }}>打开参照</Button>
      </div>
    )
  }
}

export default Demo1;

