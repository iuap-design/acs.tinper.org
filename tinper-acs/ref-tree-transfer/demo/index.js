import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import './demo.scss';


import Demo1 from "./demolist/Demo1";import Demo2 from "./demolist/Demo2";import Demo3 from "./demolist/Demo3";
var DemoArray = [{"example":<Demo1 />,"title":" 基本示例1","code":"/**\n *\n * @title 基本示例1\n * @description RefTreeTransferBaseUI\n *\n */\nimport React, { Component } from 'react';\nimport RefTreeTransferBaseUI from '../../src/index';\nimport '../../src/index.less';\nimport {Button} from 'tinper-bee';\nlet options;\nlet refModelUrl = {\n  treeUrl: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTree',\n  tableBodyUrl: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTreeGrid',\n};\nclass Demo1 extends Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {\n\t\t\ttreeData: [],\n\t\t\ttransferData:[],\n      targetKeys: [],\n      confirmTargetKeys:[],\n      showModal:false,\n\t\t}\n\t}\n\t/**\n\t * @msg: 获取mock数据，只获取tree的data\n\t * @param {type} \n\t * @return: \n\t */\n  async initComponent() {\n\n    let dataMap = await request(refModelUrl.treeUrl, {\n      method: 'get',\n    });\n    this.setState({\n      treeData: !!dataMap && !!dataMap.data ? dataMap.data : [],\n    });\n    this.handleTreeSelect({}, refModelUrl);\n  }\n\t/**\n\t * @msg: 由树节点获取穿梭框数据\n\t * @param {type} \n\t * @return: \n\t */\n\n  handleTreeSelect = async (selectNode = {}) => {\n    let { valueField } = options;\n    let dataMap = await request(refModelUrl.tableBodyUrl, {\n      method: 'get',\n      params: '自定义'\n    });\n    let { data } = dataMap;\n    let { transferData, targetKeys } = this.state;\n    let selectedData = transferData.filter(v => {\n      return targetKeys.some(key => key == v[valueField])\n    });\n    if (!data) data = [];\n    let temp = data.filter((v, k) => {\n      return selectedData.every(v1 => v1[valueField] != v[valueField])\n    })\n    let tempTransferData = temp.concat(selectedData);\n    this.setState({\n      transferData: tempTransferData,\n    });\n  }\n  /**\n   * @msg: 保存\n   * @param {type} \n   * @return: \n   */\n  transferSave = () => {\n    var { transferData, targetKeys } = this.state;\n    let needTransferData = [];\n    targetKeys.forEach((v, i) => {\n      transferData.forEach((v2, i2) => {\n        if (v == v2['refcode']) {\n          needTransferData.push(v2)\n        }\n      })\n    });\n    this.setState({\n      confirmTargetKeys: needTransferData,\n    })\n\n  }\n  /**\n   * @msg: 弹框取消按钮\n   * @param {type} \n   * @return: \n   */\n  transferCancel = () => {\n    let { confirmTargetKeys } = this.state;\n    let cancelTargetKeys = [];\n    confirmTargetKeys.forEach((v, i) => {\n      cancelTargetKeys.push(v['refcode'])\n    });\n    this.setState({\n      targetKeys: cancelTargetKeys,\n    })\n  }\n  /**\n\t * @msg: 右穿梭选中数据触发，将穿梭右侧选中的数据传过去\n\t * @param {type} \n\t * @return: \n\t */\n  setTargetKeys = (targetKeys) => {\n    this.setState({\n      targetKeys,\n    })\n  }\n\n\n\trender() {\n    options  =  {\n\t\t\tdisplayField:'{refname}-{refcode}-jaja',\n\t\t\tvalueField:'refcode',\n\t\t};\n\t\tlet { treeData, transferData=[], targetKeys, showModal } = this.state\n\t\t//20190226穿梭框没有清空按钮并且目前存在问题\n\t\tlet baseProps = {\n\t\t\t...options,\n\t\t\tonChangerightSearch : this.onChangerightSearch,\n\t\t\t//方法\n\t\t\thandleTreeSelect : this.handleTreeSelect,\n\t\t\t//transfer\n\t\t\ttreeData,\n\t\t\ttransferData,\n            targetKeys,\n\t\t\tsetTargetKeys:this.setTargetKeys,\n\t\t\tonSave:this.transferSave,\n\t\t\tonCancel:this.transferCancel,\n\t\t\tonChangeleftSearch:()=>{},\n\t\t\tshowModal,\n\t\t}\n\t\treturn (\n\t\t\t<div>\n\t\t\t\t<RefTreeTransferBaseUI {...baseProps} />\n\t\t\t\t<Button colors=\"primary\" onClick={()=>{this.setState({showModal:true},()=>{this.initComponent()})}}>打开</Button>\n\t\t\t</div>\n\t\t);\n\t}\n}\n\n\n","desc":" RefTreeTransferBaseUI"},{"example":<Demo2 />,"title":" 基本示例2","code":"/**\n *\n * @title 基本示例2\n * @description RefTreeTransferWithInput\n *\n */\nimport React, { Component } from 'react';\nimport { RefTreeTransferWithInput } from '../../src/index';\nimport { Button } from 'tinper-bee';\nimport '../../src/index.less';\nimport request from './request';\nlet options;\nlet refModelUrl = {\n  treeUrl: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTree',\n  tableBodyUrl: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTreeGrid',\n};\nclass Demo2 extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      treeData: [],\n      confirmTargetKeys: [],\n      transferData : [],\n      targetKeys: ['5e3a85ec-5e14-4734-8b3a-1e6168426c89'],\n      value : '{\"refname\":\"人员5-自定义\",\"refcode\":\"005\",\"refpk\":\"5e3a85ec-5e14-4734-8b3a-1e6168426c89\"}'\n    }\n  }\n  canClickGoOn=()=> {\n    this.initComponent();\n    return true\n  }\n\n\t/**\n\t * @msg: 获取mock数据，只获取tree的data\n\t * @param {type} \n\t * @return: \n\t */\n  async initComponent() {\n\n    let dataMap = await request(refModelUrl.treeUrl, {\n      method: 'get',\n    });\n    this.setState({\n      treeData: !!dataMap && !!dataMap.data ? dataMap.data : [],\n    });\n    this.handleTreeSelect({}, refModelUrl);\n  }\n\n\t/**\n\t * @msg: 选中左侧树节点，更新穿梭框数据\n\t * @param {type} \n\t * @return: \n\t */\n\n  handleTreeSelect = async (selectNode = {}) => {\n    console.log('树节点信息',selectNode)\n    let { valueField } = options;\n    let dataMap = await request(refModelUrl.tableBodyUrl, {\n      method: 'get',\n      params: '自定义'\n    });\n    let { data } = dataMap;\n    let { transferData, targetKeys } = this.state;\n    let selectedData = transferData.filter(v => {\n      return targetKeys.some(key => key == v[valueField])\n    });\n    if (!data) data = [];\n    let temp = data.filter((v, k) => {\n      return selectedData.every(v1 => v1[valueField] != v[valueField])\n    })\n    let tempTransferData = temp.concat(selectedData);\n    this.setState({\n      transferData: tempTransferData,\n    });\n  }\n\n  /**\n   * @msg: 保存，下拉选择词条保存，和参照弹框保存按钮\n   * @param {type} \n   * @return: \n   */\n  transferSave = (selectedArray) => {\n    var { transferData, targetKeys } = this.state;\n    const {valueField} = options;\n    let targetKeysVal = [];\n    selectedArray.forEach((v, i) => {\n      targetKeysVal.push(v[valueField])\n    });\n   \n    this.setState({\n      targetKeys:targetKeysVal,\n      confirmTargetKeys: selectedArray,\n    })\n\n  }\n  /**\n   * @msg: 弹框取消按钮\n   * @param {type} \n   * @return: \n   */\n  transferCancel = () => {\n    let { confirmTargetKeys } = this.state;\n    let {valueField} = options;\n    let cancelTargetKeys = [];\n    confirmTargetKeys.forEach((v, i) => {\n      cancelTargetKeys.push(v[valueField])\n    });\n    console.log('取消',cancelTargetKeys)\n    this.setState({\n      targetKeys: cancelTargetKeys,\n    })\n  }\n  /**\n\t * @msg: 右穿梭选中数据触发，将穿梭右侧选中的数据传过去\n\t * @param {type} \n\t * @return: \n\t */\n  setTargetKeys = (targetKeys) => {\n    this.setState({\n      targetKeys,\n    })\n  }\n\n  render() {\n    options  =  {\n      displayField:'{refname}--jaja',//下拉展示以及transfer每项展示\n      inputDisplay:'{refname}-自定义',//input框上的展示\n\t\t\tvalueField:'refpk',\n\t\t};\n    let { treeData, transferData = [], targetKeys,value } = this.state\n    //20190226穿梭框没有清空按钮并且目前存在问题\n    let baseProps = {\n      ...options,\n      \n      handleTreeSelect: this.handleTreeSelect,\n      treeData,\n      transferData,\n      targetKeys,\n      value:value,\n      \n      setTargetKeys: this.setTargetKeys,\n      onSave: this.transferSave,\n      onCancel: this.transferCancel,\n      \n      canClickGoOn:this.canClickGoOn,\n\n      filterUrl:'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTreeGrid',\n      multiple:true,\n      \n    }\n    return (\n      <div>\n        <RefTreeTransferWithInput {...baseProps}  />\n        <Button colors=\"primary\" onClick={() => { alert(JSON.stringify(this.state.targetKeys)) }}> 提交</Button>\n      </div>\n    );\n  }\n}\n\n\n","desc":" RefTreeTransferWithInput"},{"example":<Demo3 />,"title":" 基本示例3","code":"/**\n *\n * @title 基本示例3\n * @description 清空功能\n *\n */\nimport React, { Component } from 'react';\nimport { RefTreeTransferWithInput } from '../../src/index';\nimport { Button } from 'tinper-bee';\nimport '../../src/index.less';\nimport request from './request';\nlet options;\nlet refModelUrl = {\n  treeUrl: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTree',\n  tableBodyUrl: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTreeGrid',\n};\nclass Demo3 extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      treeData: [],\n      confirmTargetKeys: [],\n      transferData: [],\n      targetKeys: ['005'],\n      value: [{\"refname\":\"人员5-自定义\",\"refcode\":\"005\",\"refpk\":\"5e3a85ec-5e14-4734-8b3a-1e6168426c89\"}],\n      valueField: 'refpk',\n      displayField: '哈哈-{refname}-{refcode}-displayField',\n      inputDisplay:'哈哈-{refname}inputDisplay',\n    }\n  }\n  canClickGoOn = () => {\n    this.initComponent();\n    return true\n  }\n\t/**\n\t * @msg: 获取mock数据，只获取tree的data\n\t * @param {type} \n\t * @return: \n\t */\n  async initComponent() {\n\n    let dataMap = await request(refModelUrl.treeUrl, {\n      method: 'get',\n    });\n    this.setState({\n      treeData: !!dataMap && !!dataMap.data ? dataMap.data : [],\n    });\n    this.handleTreeSelect({}, refModelUrl);\n  }\n\t/**\n\t * @msg: 由树节点获取穿梭框数据\n\t * @param {type} \n\t * @return: \n\t */\n\n  handleTreeSelect = async (selectNode = {}) => {\n    let { valueField } = options;\n    let dataMap = await request(refModelUrl.tableBodyUrl, {\n      method: 'get',\n      params: '自定义'\n    });\n    let { data } = dataMap;\n    let { transferData, targetKeys } = this.state;\n    let selectedData = transferData.filter(v => {\n      return targetKeys.some(key => key == v[valueField])\n    });\n    if (!data) data = [];\n    let temp = data.filter((v, k) => {\n      return selectedData.every(v1 => v1[valueField] != v[valueField])\n    })\n    let tempTransferData = temp.concat(selectedData);\n    this.setState({\n      transferData: tempTransferData,\n    });\n  }\n /**\n   * @msg: 保存，下拉选择词条保存，和参照弹框保存按钮\n   * @param {type} \n   * @return: \n   */\n  transferSave = (selectedArray) => {\n    var { transferData, targetKeys } = this.state;\n    const {valueField} = options;\n    let targetKeysVal = [];\n    selectedArray.forEach((v, i) => {\n      targetKeysVal.push(v[valueField])\n    });\n   \n    this.setState({\n      targetKeys:targetKeysVal,\n      confirmTargetKeys: selectedArray,\n    })\n\n  }\n  /**\n   * @msg: 弹框取消按钮\n   * @param {type} \n   * @return: \n   */\n  transferCancel = () => {\n    let { confirmTargetKeys } = this.state;\n    let {valueField} = options;\n    let cancelTargetKeys = [];\n    confirmTargetKeys.forEach((v, i) => {\n      cancelTargetKeys.push(v[valueField])\n    });\n    console.log('取消',cancelTargetKeys)\n    this.setState({\n      targetKeys: cancelTargetKeys,\n    })\n  }\n  /**\n\t * @msg: 右穿梭选中数据触发，将穿梭右侧选中的数据传过去\n\t * @param {type} \n\t * @return: \n\t */\n  setTargetKeys = (targetKeys) => {\n    this.setState({\n      targetKeys,\n    })\n  }\n  /**\n   * @msg: 清空功能\n   * @param {type} \n   * @return: \n   */\n  clearFunc = () => {\n    this.setState({\n      value: `{\"refname\":\"\",\"refpk\":\"${Math.random()}\"}`,\n      targetKeys: [],\n    })\n  }\n\n  render() {\n   \n    let { treeData, transferData = [], targetKeys, value,valueField,displayField,inputDisplay } = this.state\n    //20190226穿梭框没有清空按钮并且目前存在问题\n\n     options = {\n      valueField : valueField,\n      inputDisplay : inputDisplay,\n      displayField : displayField,\n\n    }\n    let baseProps = {\n       ...options,\n\n      handleTreeSelect: this.handleTreeSelect,\n      treeData,\n      transferData,\n      targetKeys,\n      value: value,\n\n      setTargetKeys: this.setTargetKeys,\n      onSave: this.transferSave,\n      onCancel: this.transferCancel,\n\n      canClickGoOn: this.canClickGoOn,\n\n      filterUrl:'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTreeGrid',\n      multiple:true,\n    }\n    return (\n      <div>\n        <RefTreeTransferWithInput {...baseProps} />\n        <Button colors=\"primary\" onClick={this.clearFunc}> 清空</Button>\n      </div>\n    );\n  }\n}\n\n\n","desc":" 清空功能"}]


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
                <code className="hljs javascript">{ code.replace('../../src/index.less',COMPONENT+'/lib/index.css').replace('../../src/index.js',COMPONENT).replace('../../src/index',COMPONENT).replace('../../src',COMPONENT) }</code>
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

ReactDOM.render(<DemoGroup/>, document.getElementById('root'));
