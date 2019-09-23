/**
 *
 * @title 基础示例5
 * @description 自定义footer
 *
 */
import React, { Component } from 'react';
import { RefMultipleTableWithInput, SearchPanelItem } from '../../src/index';
import '../../src/index.less';
import { Button, Form, FormControl,Checkbox } from 'tinper-bee';
import request from './request';
let options = {}
class Demo2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      showModal: false,
      matchData: [
        {
          "code":"005",
          "mobile": "15011430235",
          "name": "人员5",
          "refpk": "5e3a85ec-5e14-4734-8b3a-1e6168426c89",
          "refname": "人员5",
          "email": "55@26.com"
        }
      ],
      value: '{"refname":"人员5-自定义","refpk":"5e3a85ec-5e14-4734-8b3a-1e6168426c89"}',
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
    this.props.form.setFieldsValue({
      ['table2']:this.state.value
    });
    setTimeout(() => {
      this.setState({
        matchData: [
          {
            "code":"005",
            "mobile": "15011430235",
            "name": "人员7",
            "refpk": "394bba90-ed0f-4794-a44e-fd9ce6e9257d",
            "refname": "人员5",
            "email": "55@26.com"
          }
        ]
      })
      this.props.form.setFieldsValue({
        ['table2']: '{"refname":"人员7-自定义","refpk":"394bba90-ed0f-4794-a44e-fd9ce6e9257d"}',
      });
    }, 14000);
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

  render() {
    let { getFieldProps, getFieldError } = this.props.form;
    let { showLoading, showModal, matchData, value } = this.state;
    let { columnsData, tableData, page, fliterFormInputs } = this;
    options = {
      miniSearch: false,
      multiple: true,
      valueField: "refpk",
      displayField: "{code}-大前端{name}",
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
          filterUrl={'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTreeGrid'}
          {
          ...getFieldProps('table2', {
            // initialValue: value,
            rules: [{
              message: '请输入姓名',
              pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
            }]
          })
          }
          // disabled  //新增属性
          // menuIcon={<span className={`uf uf-search`}> </span>} //新增属性
          // paginationProps={{showJump:false}} //新增属性
          footerBtnDom={
            <div className="customed-footer">
                <Checkbox colors="primary" onChange={this.checkboxChange}>停用</Checkbox>
                <Checkbox colors="primary" onChange={this.checkboxChange}>包含下级</Checkbox>
            </div>}
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
        <span className='error'>
          {getFieldError('table2')}
        </span>
      </div>
    )
  }
}

export default Form.createForm()(Demo2);

