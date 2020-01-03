import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var Demo3 = require("./demolist/Demo3");var DemoArray = [{"example":<Demo1 />,"title":" 基础示例","code":"/**\n * @title 基础示例\n * @description 全选、分页、过滤功能、交换\n *\n */\nimport React, { Component } from \"react\";\nimport AcGrids from 'ac-grids'\n\nconst column = [\n  {\n    title: \"订单编号\",\n    dataIndex: \"orderCode\",\n    key: \"orderCode\",\n    width: 150,\n  },\n  {\n    title: \"金额\",\n    dataIndex: \"money\",\n    key: \"money\",\n    width: 160,\n    textAlign:'right'\n  },\n  {\n    title: \"类型\",\n    dataIndex: \"type_name\",\n    key: \"type_name\",\n    width: 100\n  },\n  {\n    title: \"采购组织\",\n    dataIndex: \"purchasing\",\n    key: \"purchasing\",\n    width: 150\n  },\n  {\n    title: \"采购组\",\n    dataIndex: \"purchasingGroup\",\n    key: \"purchasingGroup\",\n    width: 300\n  },\n  {\n    title: \"凭证日期\",\n    dataIndex: \"voucherDate\",\n    key: \"voucherDate\",\n    width: 150\n  },\n  {\n    title: \"审批状态\",\n    dataIndex: \"approvalState_name\",\n    key: \"approvalState_name\",\n    width: 150\n  },\n  {\n    title: \"确认状态\",\n    dataIndex: \"confirmState_name\",\n    key: \"confirmState_name\",\n    width: 500\n  },\n  {\n    title: \"关闭状态\",\n    dataIndex: \"closeState_name\",\n    key: \"closeState_name\",\n    width: 150\n  }\n];\nconst dataList = [\n  {\n    orderCode: \"2343\",\n    supplierName: \"xxx\",\n    type_name: \"123\",\n    purchasing: \"内行\",\n    purchasingGroup: \"323\",\n    voucherDate: \"kkkk\",\n    approvalState_name: \"vvvv\",\n    confirmState_name: \"aaaa\",\n    closeState_name: \"vnnnnn\",\n    money:'1232.56',\n    d: \"操作\",\n    key: \"1\"\n  },\n  {\n    _checked: true,\n    orderCode: \"222\",\n    supplierName: \"22xxx\",\n    type_name: \"1223\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    money:'2341232.56',\n    d: \"2操作\",\n    key: \"2\"\n  },\n  {\n    orderCode: \"222\",\n    supplierName: \"22xxx\",\n    _disabled: true,\n    type_name: \"1223\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    money:'122368732.56',\n    d: \"3操作\",\n    key: \"3\"\n  },\n  {\n    orderCode: \"222\",\n    supplierName: \"22xxx\",\n    type_name: \"1223\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    money:'18765232.56',\n    d: \"4操作\",\n    key: \"4\"\n  }\n];\n\nclass Demo1 extends Component {\n  constructor(props) {\n    super(props);\n  }\n\n  render() {\n    let paginationObj = {\n      maxButtons:999,\n      items:15,//一页显示多少条\n      activePage:2,\n      onSelect:(value)=>{console.log('切换到第几页：'+value)},\n      onDataNumSelect:(value)=>{console.log(\"每页多少条：\"+value)},//改变页码回调\n    }\n    return (\n        <AcGrids\n          columns={column}\n          data={dataList}\n          getSelectedDataFunc={this.getSelectedDataFunc}\n          paginationObj={paginationObj}\n          multiSelect={false}\n          ref='grid'\n        /> \n    );\n  }\n}\n\n\nexport default Demo1;","desc":" 全选、分页、过滤功能、交换"},{"example":<Demo2 />,"title":" CardTable","code":"/**\n * @title CardTable\n * @description 全选、分页、过滤功能、交换\n *\n */\nimport React, { Component } from \"react\";\nimport AcGrids from 'ac-grids';\n\nconst EditGrid = AcGrids.EditGrid;\n\nconst column = [\n  {\n    title: \"订单编号\",\n    dataIndex: \"orderCode\",\n    key: \"orderCode\",\n    width: 150,\n    renderType:'input',\n    required:true,\n    validate:true,\n    disabled:true,\n    pattern:/^2$/,\n    patternMessage:'格式错误',\n    textAlign:'left'\n  },\n  {\n    title: \"金额\",\n    dataIndex: \"money\",\n    key: \"money\",\n    width: 160,\n    textAlign:'right',\n    renderType:'inputNumber',\n    required:true,\n    validate:true,\n    filedProps:{\n      defaultValue:'123',\n      precision:2\n    }\n  },\n  {\n    title: \"类型\",\n    dataIndex: \"type_name\",\n    key: \"type_name\",\n    width: 100,\n    renderType:'select',\n    required:true,\n    validate:true,\n    filedProps:{\n      defaultValue:'1',\n      options:[\n        {\n          key:'类型1',value:'1'\n        },\n        {\n          key:'类型2',value:'2'\n        },\n        {\n          key:'类型3',value:'3'\n        },\n      ]\n    }\n  },\n  {\n    title: \"采购组织\",\n    dataIndex: \"purchasing\",\n    key: \"purchasing\",\n    width: 150,\n    renderType:'input',\n  },\n  {\n    title: \"采购组\",\n    dataIndex: \"purchasingGroup\",\n    key: \"purchasingGroup\",\n    width: 300\n  },\n  {\n    title: \"凭证日期\",\n    dataIndex: \"voucherDate\",\n    key: \"voucherDate\",\n    width: 150\n  },\n  {\n    title: \"审批状态\",\n    dataIndex: \"approvalState_name\",\n    key: \"approvalState_name\",\n    width: 150\n  },\n  {\n    title: \"确认状态\",\n    dataIndex: \"confirmState_name\",\n    key: \"confirmState_name\",\n    width: 500\n  },\n  {\n    title: \"关闭状态\",\n    dataIndex: \"closeState_name\",\n    key: \"closeState_name\",\n    width: 150\n  }\n];\nconst dataList = [\n  {\n    orderCode: \"11\",\n    supplierName: \"xxx\",\n    type_name: \"1\",\n    purchasing: \"内行\",\n    purchasingGroup: \"采购组\",\n    voucherDate: \"kkkk\",\n    approvalState_name: \"vvvv\",\n    confirmState_name: \"aaaa\",\n    closeState_name: \"vnnnnn\",\n    money:'1232.56',\n    d: \"操作\",\n    key: \"1\"\n  },\n  {\n    orderCode: \"22\",\n    supplierName: \"22xxx\",\n    type_name: \"2\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    money:'2341232.56',\n    d: \"2操作\",\n    key: \"2\"\n  },\n  {\n    orderCode: \"33\",\n    supplierName: \"22xxx\",\n    type_name: \"3\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    money:'122368732.56',\n    d: \"3操作\",\n    key: \"3\"\n  },\n  {\n    orderCode: \"44\",\n    supplierName: \"22xxx\",\n    type_name: \"3\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    money:'18765232.56',\n    d: \"4操作\",\n    key: \"4\"\n  }\n];\n\nclass Demo1 extends Component {\n  constructor(props) {\n    super(props);\n    this.state={\n      disabled:false\n    }\n  }\n\n  onChange=(data)=>{\n    console.log('table的数据如下')\n    console.log(data)\n  }\n  onDel=(data)=>{\n    console.log('删除的数据如下')\n    console.log(data)\n  }\n  setdisabled=()=>{\n    this.setState({\n      disabled:true\n    })\n  }\n\n  render() {\n    let paginationObj = {\n      items:10,\n      // total:20,//总共多少条、\n      freshData:this.freshData,//点击下一页刷新的数据\n      onDataNumSelect:this.onDataNumSelect, //每页大小改变触发的事件\n      showJump:false,\n      noBorder:true\n    }\n    return (\n      <div className='ac-grid-demo'>\n          <EditGrid\n          defaultOpen={true}\n          columns={column}\n          data={dataList}\n          paginationObj={paginationObj}\n          multiSelect={true}\n          onChange={this.onChange}\n          showPagination={false}\n          onDel={this.onDel}\n        />\n      </div>\n      \n    );\n  }\n}\n\n\nexport default Demo1;","desc":" 全选、分页、过滤功能、交换"},{"example":<Demo3 />,"title":" EditGrid 不可用状态","code":"/**\n * @title EditGrid 不可用状态\n * @description disabled\n *\n */\nimport React, { Component } from \"react\";\nimport { Button } from 'tinper-bee';\nimport AcGrids from 'ac-grids';\n\nconst EditGrid = AcGrids.EditGrid;\n\nconst column = [\n  {\n    title: \"订单编号\",\n    dataIndex: \"orderCode\",\n    key: \"orderCode\",\n    width: 150,\n    renderType:'input',\n    required:true,\n    validate:true,\n    pattern:/^2$/,\n    patternMessage:'格式错误',\n    filedProps:{\n      maxLength:'9'\n    }\n  },\n  {\n    title: \"金额\",\n    dataIndex: \"money\",\n    key: \"money\",\n    width: 160,\n    textAlign:'right',\n    renderType:'inputNumber',\n    required:true,\n    validate:true,\n    filedProps:{\n      precision:0\n    }\n  },\n  {\n    title: \"类型\",\n    dataIndex: \"type_name\",\n    key: \"type_name\",\n    width: 100,\n    renderType:'select',\n    required:true,\n    validate:true,\n    filedProps:{\n      options:[\n        {\n          key:'类型1',value:'1'\n        },\n        {\n          key:'类型2',value:'2'\n        },\n        {\n          key:'类型3',value:'3'\n        },\n      ]\n    }\n  },\n  {\n    title: \"采购组织\",\n    dataIndex: \"purchasing\",\n    key: \"purchasing\",\n    width: 150\n  },\n  {\n    title: \"采购组\",\n    dataIndex: \"purchasingGroup\",\n    key: \"purchasingGroup\",\n    width: 300\n  },\n  {\n    title: \"凭证日期\",\n    dataIndex: \"voucherDate\",\n    key: \"voucherDate\",\n    width: 150\n  },\n  {\n    title: \"审批状态\",\n    dataIndex: \"approvalState_name\",\n    key: \"approvalState_name\",\n    width: 150\n  },\n  {\n    title: \"确认状态\",\n    dataIndex: \"confirmState_name\",\n    key: \"confirmState_name\",\n    width: 500\n  },\n  {\n    title: \"关闭状态\",\n    dataIndex: \"closeState_name\",\n    key: \"closeState_name\",\n    width: 150\n  }\n];\nconst dataList = [\n  {\n    orderCode: \"11\",\n    supplierName: \"xxx\",\n    type_name: \"1\",\n    purchasing: \"内行\",\n    purchasingGroup: \"323\",\n    voucherDate: \"kkkk\",\n    approvalState_name: \"vvvv\",\n    confirmState_name: \"aaaa\",\n    closeState_name: \"vnnnnn\",\n    money:'1232.56',\n    d: \"操作\",\n    key: \"1\"\n  },\n  {\n    orderCode: \"22\",\n    supplierName: \"22xxx\",\n    type_name: \"2\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    money:'2341232.56',\n    d: \"2操作\",\n    key: \"2\"\n  },\n  {\n    orderCode: \"33\",\n    supplierName: \"22xxx\",\n    type_name: \"3\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    money:'122368732.56',\n    d: \"3操作\",\n    key: \"3\"\n  },\n  {\n    orderCode: \"44\",\n    supplierName: \"22xxx\",\n    type_name: \"3\",\n    purchasing: \"内行2\",\n    purchasingGroup: \"3223\",\n    voucherDate: \"222kk\",\n    approvalState_name: \"22vvvv\",\n    confirmState_name: \"2aaaa\",\n    closeState_name: \"2vnnnnn\",\n    money:'18765232.56',\n    d: \"4操作\",\n    key: \"4\"\n  }\n];\n\nclass Demo1 extends Component {\n  constructor(props) {\n    super(props);\n    this.state={\n      disabled:false\n    }\n  }\n\n  onChange=(data)=>{\n    console.log('table的数据如下')\n    console.log(data)\n  }\n  onDel=(data)=>{\n    console.log('删除的数据如下')\n    console.log(data)\n  }\n  click=()=>{\n    this.setState({\n      disabled:!this.state.disabled\n    })\n  }\n  // {\n  //   0:{\n  //     key1:'errorMessage1',\n  //     key2:'errorMessage',\n  //   },\n  //   1:{\n  //     key1:'errorMessage'\n  //   },\n  // }\n  onValidate=()=>{\n    let errors = this.editGrid.validate();\n\n    if(errors){\n      console.log('有错误，错误信息如下');\n      let errorMessage = '';\n      Object.keys(errors).forEach(item=>{\n        let current = errors[item];\n        Object.keys(current).forEach(it=>{\n          errorMessage+=`第${Number(item)+1}行的${it}校验失败，错误原因是：${current[it]};`\n        })\n      })\n      console.log(errorMessage)\n    }else{\n      console.log('没有错误')\n    }\n  }\n  render() {\n    let paginationObj = {\n      items:10,\n      // total:20,//总共多少条、\n      freshData:this.freshData,//点击下一页刷新的数据\n      onDataNumSelect:this.onDataNumSelect, //每页大小改变触发的事件\n      showJump:false,\n      noBorder:true\n    }\n    return (\n      <div className='ac-grid-demo'>\n          <Button onClick={this.click} style={{'marginBottom':'20px'}} colors='primary'>\n            {this.state.disabled?'设置可编辑':'设置不可编辑'}\n          </Button>\n          <Button onClick={this.onValidate} style={{'marginBottom':'20px','marginLeft':'20px'}} colors='primary'>点我校验</Button>\n          <EditGrid\n          showIndex={false}\n          disabled={this.state.disabled}\n          defaultOpen={true}\n          columns={column}\n          data={dataList}\n          paginationObj={paginationObj}\n          multiSelect={true}\n          onChange={this.onChange}\n          showPagination={false}\n          onDel={this.onDel}\n          ref ={editGrid => this.editGrid = editGrid } \n        />\n      </div>\n      \n    );\n  }\n}\n\n\nexport default Demo1;","desc":" disabled"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    handleClick=()=> {
        this.setState({ open: !this.state.open })
    }
    fCloseDrawer=()=>{
        this.setState({
            open: false
        })
    }

    render () {
        const { title, example, code, desc, scss_code  } = this.props;

        const header = (
            <div>
                <p className='component-title'>{ title }</p>
                <p>{ desc }</p>
                <span className='component-code' onClick={this.handleClick}> 查看源码 <i className='uf uf-arrow-right'/> </span>
            </div>
        );
        return (
            <Col md={12} id={title.trim()} className='component-demo'>
            <Panel header={header}>
                {example}
            </Panel>
           
            <Drawer className='component-drawerc' title={title} show={this.state.open} placement='right' onClose={this.fCloseDrawer}>
            <div className='component-code-copy'> JS代码 
                <Clipboard action="copy" text={code}/>
            </div>
            <pre className="pre-js">
                <code className="hljs javascript">{ code }</code>
            </pre >
            {!!scss_code ?<div className='component-code-copy copy-css'> SCSS代码 
                <Clipboard action="copy" text={scss_code}/>
            </div>:null }
                { !!scss_code ? <pre className="pre-css">
                 <code className="hljs css">{ scss_code }</code>
                 </pre> : null }
            </Drawer>
        </Col>
    )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <Row>
            {DemoArray.map((child,index) => {

                return (
            <Demo example= {child.example} title= {child.title} code= {child.code} scss_code= {child.scss_code} desc= {child.desc} key= {index}/>
    )

    })}
    </Row>
    )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
