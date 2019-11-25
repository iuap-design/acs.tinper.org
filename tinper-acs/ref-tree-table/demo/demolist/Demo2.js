/**
 *
 * @title 基础示例2
 * @description RefTreeTableWithInput,`multiple`多选
 *
 */

import React, { Component } from 'react';
import { RefTreeTableWithInput } from '../../src/index';
import '../../src/index.less';
import { Form, Button } from 'tinper-bee';
import Radio from 'bee-radio';
import 'bee-radio/build/Radio.css';
import request from './request';
let options = {};
class Demo2 extends Component {
  constructor() {
    super();
    this.state = {
      showLoading: false,
      searchValue: '',
      matchData: [
        {
        "rownum_":3,
        "code":"003",
        "mobile":"15011430232",
        "name":"人员3",
        "refcode":"003",
        "refpk":"004989bb-a705-45ce-88f3-662f87ee6e52",
        "id":"004989bb-a705-45ce-88f3-662f87ee6e52",
        "refname":"人员3",
        "email":"33@33.com"
        }
      ],
      value: '{"refname":"人员3-初始value","refpk":"004989bb-a705-45ce-88f3-662f87ee6e52"}',
      displayField:'{refname}-{refcode}-displayField',
      valueField:'refpk',
    }
    this.page = {
      pageCount: 1,//总页数
      pageSize: '10',//每页数据数
      totalElements: 9,
      currPageIndex: 0,
    };

  }
  /**
   * @msg: 点击input右侧menu icon才触发的操作。return true是必须的
   * @param {type} 
   * @return: 
   */
  canClickGoOn = () =>{
    this.loadData();
    return true;
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
      matchData: result,
    })
  }
 
  render() {
    options = {
      lang: 'zh_CN',
      miniSearch: true,
      multiple: true,
      isLocalSearch:true,
    }
    const {value , matchData,displayField,valueField} = this.state;
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className="demo-label">
        <RefTreeTableWithInput
          {...options}
          displayField={displayField}
          valueField={valueField}
          treeData={this.treeData}
          columnsData={this.columnsData}
          tableData={this.tableData}
          page={this.page}
          matchData={this.state.matchData}


          canClickGoOn={this.canClickGoOn}

          onTreeChange={this.onTreeChange}
          onTreeSearch={this.onTreeSearch}
          onTableSearch={this.onTableSearch}
          onSave={this.onSave}
          onCancel={this.onCancel}
          loadTableData={this.loadTableData}

          filterUrl={'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTreeGrid'}
          checkedTreeArray={[{
            code: "wlgs",
          id: "44228a37-e97c-4347-8667-3aead5d1261b",
          name: "网络公司",
          nodeDisabled: true,
          pid: "45a6400c-f80a-47be-9cfc-91d9581f32f4",
          refcode: "wlgs",
          refname: "网络公司",
          refpk: "44228a37-e97c-4347-8667-3aead5d1261b"
          }]}
          {...getFieldProps('treeTable2', {
            initialValue: value,
            rules: [{
              message: '提示：请选择',
              pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
            }]
          })}

        />
        <Button colors="primary" onClick={
          ()=>{
            this.props.form.validateFields((err, values) => {
              if(err){
                alert(""+JSON.stringify(err));
                return false;
              }
              alert(""+JSON.stringify(values))
            });
          }
        }>提交</Button>
        <span  className="error"style={{
          color: 'red'
        }}>
          {
            getFieldError('treeTable2')
          }
        </span>
      </div>
    )
  }
};

export default Form.createForm()(Demo2);


