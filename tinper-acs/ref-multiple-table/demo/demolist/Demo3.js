/**
 *
 * @title 基础示例3
 * @description 清空功能：搭配form。同时注意两个特殊展示：1.matchData数据项不全在已选择下展示 2.保存操作之后，input展示与inputDisplay有关
 *
 */
import React, { Component } from 'react';
import { RefMultipleTableWithInput, SearchPanelItem } from '../../src/index';
import '../../src/index.less';
import { Button, Form, FormControl } from 'tinper-bee';
import request from './request';
let options = {}
class Demo3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      showModal: false,
      matchData: [
        {
          "mobile": "15011430235",
          "name": "人员5",
          "refpk": "5e3a85ec-5e14-4734-8b3a-1e6168426c89",
          "refname": "人员5",
          "email": "55@26.com"
        },
        {
          "code": "008",
          "name": "人员8",
          "refpk": "a9f4c869-ca0b-4d12-847e-00eca08bfef6",
          "id": "a9f4c869-ca0b-4d12-847e-00eca08bfef6",
          "refname": "人员8",
          "email": "55@556.com"
        }
      ],
      value: '{"refname":"人员5-自定义;人员8","refpk":"5e3a85ec-5e14-4734-8b3a-1e6168426c89;a9f4c869-ca0b-4d12-847e-00eca08bfef6"}',
      valueField: 'refpk',
      displayField: '哈哈-{refname}-{refcode}-displayField',
      inputDisplay:'哈哈-{refname}inputDisplay',
    };
    this.page = {
      pageCount: 0,
      pageSize: 10,
      currPageIndex: 1,
    };
    this.tableData = [];
    this.columnsData = [];
    this.fliterFormInputs = [];

  }
  componentDidMount() {
    this.loadData();
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
    let keyList = data.strFieldCode || [];
    let titleList = data.strFieldName || [];
    let colunmsList = keyList.map((item, index) => {
      this.fliterFormInputs.push(
        <SearchPanelItem key={item} name={item} text={titleList[index]}>
          <FormControl size={'sm'} />
        </SearchPanelItem>
      )
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
  searchFilterInfo = (value) => {
    alert('搜索' + JSON.stringify(value))
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
  /**
   * @msg: 清空操作，借助form。就是value和matchData置空。前者对应input框，matchData对应表中选中的节点
   * @param {type} 
   * @return: 
   */
  clearFunc = () =>{
    this.setState({
        matchData:[],
    },()=>{
        this.props.form.setFieldsValue({table3:''});
    })
  }

  render() {
    let { getFieldProps, getFieldError } = this.props.form;
    let { showLoading, showModal, matchData, value ,valueField,inputDisplay,displayField} = this.state;
    let { columnsData, tableData, page, fliterFormInputs } = this;
    options = {
      miniSearch: false,
      multiple: true,
      emptyBut: true
    }
    let childrenProps = Object.assign({}, options, {
      showModal: showModal,
      showLoading: showLoading,
      columnsData: columnsData,
      tableData: tableData,
      fliterFormInputs: fliterFormInputs,
      ...page,
      matchData,
      searchFilterInfo: this.searchFilterInfo,
      dataNumSelect: this.dataNumSelect,
      handlePagination: this.handlePagination,
      onSave: this.onSave,
      onCancel: this.onCancel,
    });
    return (
      <div className="demoPadding">
        <RefMultipleTableWithInput
          {...childrenProps}

          valueField={valueField}
          inputDisplay={inputDisplay}
          displayField={displayField}

          filterUrl={'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTreeGrid'}
          {
          ...getFieldProps('table3', {
            initialValue: value,
            rules: [{
              message: '请输入姓名',
              pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
            }]
          })
          }
        />
        <Button
          colors="primary"
          onClick={this.clearFunc}>清空</Button>
        <span className='error'>
          {getFieldError('table3')}
        </span>
      </div>
    )
  }
}

export default Form.createForm()(Demo3);

