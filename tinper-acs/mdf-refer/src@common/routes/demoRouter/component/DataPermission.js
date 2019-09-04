import React, { Component } from 'react'
import { Table, Button, Modal, Popconfirm, Row, Col, Pagination, Select } from 'antd';

let Icon = require('antd').Icon


const Option = Select.Option;
if (process.env.__CLIENT__ === true) {
  require('./dataPermission.less');
}

export default class DataPermission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scopeShow: false,
      roleModelShow: false,
      clickedRecord: {},//记录选中项
      dataList: [],//维度列表
      creatData: {},//新增或者编辑维度获取的数据
      editType: '',//add 新建  edit 添加
      limitScopList: [],//权限范围弹窗数据
      selectedRecord: {},//编辑行 维度 范围 对象 要及时清空
      managerReferId: '',//管理维度筛选
      authManagerRefers: [],//权限维度
      referList: [],//点击列表权限范围，弹窗合并后的值
    }

    this.columns = (function (that) {
      return [{
        title: '权限管理维度',
        dataIndex: 'managerReferDisplayName',
        key: 'managerReferDisplayName',
        width: 300,
        className: 'weidu-select-box',
        render: (text, record, index) => {
          const isEmpty = record.id && String(record.id).indexOf('emptyId') == 0;
          const referSortList = that.props.referSortList;
          const managerRefer = record.managerRefer;
          if (referSortList.length > 0 && isEmpty) {
            return (<div className=''>
              <Select defaultValue={managerRefer} onChange={(value) => that.handleSelectChange(record, index, value)}>
                {referSortList.map((item) => <Option value={item.id} key={item.id}>{item.name}</Option>)}
              </Select>
            </div>)
          }
          return (
            <div className="weidu-name">{record.managerReferDisplayName}</div>
          )
        }
      }, {
        title: '权限范围',
        dataIndex: 'authReferRules',
        key: 'authReferRules',
        render: (text, record, index) => {
          let roleAuthReferRules = record.authReferRules;
          let weiStr = '';
          if (roleAuthReferRules) {
            roleAuthReferRules.forEach(item => {
              const itemValues = item.values;
              weiStr += item.name
              if (itemValues && itemValues.length > 0) {
                weiStr += '=[';
                itemValues.forEach((childItem, index) => {
                  if (index == itemValues.length - 1) {
                    weiStr += childItem.name + '];'
                  } else if (index == 0) {
                    weiStr += childItem.name;
                  } else {
                    weiStr += ',' + childItem.name;
                  }
                })
              } else {
                weiStr += ';';
              }

            })

          }
          return <div className="limite-scope">
            <span>{weiStr}</span>
            <div className="icon-box">
              <Icon font="classificationfenleieee" onClick={() => that.showModal(record)} />

            </div>
          </div>

        }
      }, {
        title: '受控对象',
        dataIndex: 'authControlEntitys',
        key: 'authControlEntitys',
        className: 'table-entity-row',
        width: 500,
        render: (text, record, index) => {
          const controlEntityType = record.controlEntityType;//1 全部应用 2部分应用 3 高级设置
          const authControlEntitys = record.authControlEntitys;
          if (authControlEntitys && authControlEntitys.length > 0) {
            return (
              <div className="table-entity-box clearfix">
                <div className="entity-name-container">
                  {authControlEntitys.map((item, index) => {
                    if (index == authControlEntitys.length - 1) {
                      return <span key={item.id}>{item.fullnameDisplayName}</span>
                    } else {
                      return <span key={item.id}>{`${item.fullnameDisplayName} ;`}</span>
                    }
                  })}
                </div>
                <div className="icon-box">
                  <Icon font="classificationfenleieee" onClick={(e) => {
                    e.stopPropagation();
                    that.changeRoleModle(record)
                  }} />
                </div>

              </div>
            )
          }


        }
      }, {
        title: '',
        width: 200,
        dataIndex: 'action',
        key: 'action',
        render: function (text, record, index) {
          const id = record.id
          return <div className="action-btns-container clearfix">
            <Button className="action-btn" onClick={(e) => {
              e.stopPropagation();
              that.askDelete(index)
            }}>删除</Button>
          </div>


        }
      }]
    })(this);



  }
  componentWillMount() {
    //this.getManagerRefer();
  }
  /*========列表=========*/
  //切换行 权限维度
  handleSelectChange = (record, index, value) => {
    const { tableList, referSortList, changeAuthList } = this.props;
    const newTableList = JSON.parse(JSON.stringify(tableList));
    const selectedRefer = referSortList.find(item => item.id == value);
    const newRecord = Object.assign({}, record, {
      managerRefer: value,
      controlEntityType: 1,
      "authControlEntitys": [
        {
          "fullnameDisplayName": "全部应用",
          "fullname": "all",
        },
      ],
      "managerReferDisplayName": selectedRefer.name,
      authReferRules: [],
      managerReferInfo: {
        fullname: selectedRefer.fullname
      }
    })
    newTableList[index] = newRecord;
    changeAuthList(newTableList);
  }
  changeRoleModle = (record) => {
    this.setState({
      entityShow: true,
      selectedRecord: record
    })
  }
  hideRoleModle = () => {
    this.setState({
      entityShow: false,
      selectedRecord: {}
    })
  }
  //处理受控实体
  handleEntityPage = (flag) => {
    if (flag) {
      const { selectedRecord } = this.state;
      const { tableList, changeAuthList } = this.props;
      const selectedIndex = tableList.findIndex(item => item.id == selectedRecord.id);
      tableList.splice(selectedIndex, 1, selectedRecord);
      changeAuthList(tableList);
    }
    this.setState({
      entityShow: false,
      selectedRecord: {}
    });

  }


  render() {
    const { tableList } = this.props;
    return (
      <div className="data-permission-container ">
        <div className="main-page-table" ref={node => this.mainPageTable = node}>
          <Table columns={this.columns}
            bordered
            dataSource={tableList}
            pagination={false}
            rowKey={(record, index) => {
              return index
            }}
          >
          </Table>
        </div>
      </div>
    )
  }
}
