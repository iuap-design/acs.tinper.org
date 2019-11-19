import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import './demo.scss'



import Demo1 from "./demolist/Demo1";
var DemoArray = [{"example":<Demo1 />,"title":" 基础示例","code":"/**\n *\n * @title 基础示例\n * @description 基础示例\n *\n */\nimport React, {Component} from 'react';\nimport SearchPanel from 'ac-search-panel';\nimport { Label,Checkbox,Switch,Button, Radio, Select,  Col , Row , FormControl } from 'tinper-bee';\nimport DatePicker from 'bee-datepicker';\nimport moment from \"moment/moment\";\nimport Form from 'bee-form';\nconst FormItem = Form.FormItem;\nconst Option = Select.Option;\nconst { RangePicker } = DatePicker;\nconst CheckboxGroup = Checkbox.CheckboxGroup;\nconst HeadContainer = SearchPanel.HeadContainer;\nconst AdvancedContainer = SearchPanel.AdvancedContainer;\n\nclass Demo extends Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            expanded: true,\n            approvalState: '1',\n            purchasingGroup:'2',\n            closeState: '',\n            confirmState: '',\n            voucherDate: [moment(),moment('2019-07-20')],\n            orderTypes:[\n                {\n                    'code':'001',\n                    'name':'类型1'\n                },\n                {\n                    'code':'002',\n                    'name':'类型2'\n                },\n                {\n                    'code':'003',\n                    'name':'类型3'\n                },\n            ]\n        };\n    }\n    submit = (e) => {\n        this.props.form.validateFields((err, values) => {\n            if (err) {\n                console.log('校验失败', values);\n            } else {\n                console.log('提交成功', values)\n            }\n        });\n    }\n    reset = () =>{\n        this.props.form.resetFields();\n        //部分表单元素无法通过this.props.form.resetFields重置，需要手动重置，如下\n        this.setState({\n            approvalState: '',\n            closeState: '',\n            confirmState: '',\n            voucherDate: []\n        })\n    }\n    onChange = () => {\n        this.setState({expanded: !this.state.expanded})\n    }\n\n    search =()=>{\n        this.props.form.validateFields((err, values) => {\n            if (err) {\n                console.log('校验失败', values);\n            } else {\n                console.log('提交成功', values)\n            }\n        });\n    }\n\n    render() {\n        const { getFieldProps, getFieldError } = this.props.form;\n        let self = this;\n        return (<div className=\"demo\">\n            <SearchPanel\n                title='条件筛选'\n                onSearch={this.search}\n                onReset={this.clear}\n                expanded={this.state.expanded}\n                onChange={this.onChange}\n                onPanelChangeStart={status => {\n                    console.log(status, \"start\")\n                }}\n                onPanelChangeIng={status => {\n                    console.log(status, \"ing\")\n                }}\n                onPanelChangeEnd={status => {\n                    console.log(status, \"end\")\n                }}>\n                <HeadContainer>\n                    <div className='demo-head'>\n                        <Form>\n                            <Row>\n                                <Col xs={12} sm={6} md={4} lg={3}>\n                                    <FormItem>\n                                            <Label>订单编号</Label>\n                                            <FormControl size=\"sm\"\n                                                {\n                                                ...getFieldProps('orderCode', {\n                                                    initialValue: '',\n                                                })\n                                                }\n                                            />\n                                    </FormItem>\n                                </Col>\n\n                                <Col xs={12} sm={6} md={4}  lg={3}>\n                                    <FormItem>\n                                            <Label>供应商名称</Label>\n                                            <FormControl size=\"sm\"\n                                                {\n                                                ...getFieldProps('supplierName', {\n                                                    initialValue: '',\n                                                })\n                                                }\n                                            />\n                                    </FormItem>\n                                </Col>\n                            </Row>\n                        </Form>\n                    </div>\n                </HeadContainer>\n            \n\n                <AdvancedContainer>\n                    <div className='demo-body'>\n                        <Form>\n                            <Row>\n                                <Col xs={12} sm={6} md={4}  lg={3}>\n                                    <FormItem>\n                                            <Label>订单类型</Label>\n                                            <Select size=\"sm\"\n                                                {\n                                                ...getFieldProps('type', {\n                                                    initialValue: '',\n                                                }\n                                                )}>\n                                                <Option value=\"\">请选择</Option>\n                                                {\n                                                    self.state.orderTypes.map((item, index) => {\n                                                        return (\n                                                            <Option key={index} value={item.code}>{item.name}</Option>\n                                                        )\n                                                    })\n                                                }\n                                            </Select>\n                                    </FormItem>\n                                </Col>\n\n                                <Col xs={12} sm={6} md={4}  lg={3}>\n                                    <FormItem>\n                                            <Label>采购组</Label>\n                                            <CheckboxGroup \n                                                    {\n                                                        ...getFieldProps('purchasingGroup',{\n                                                            initialValue:['2']\n                                                        })\n                                                    }\n                                                >\n                                                    <Checkbox value='1'>人力</Checkbox>\n                                                    <Checkbox value='2'>财务</Checkbox>\n                                            </CheckboxGroup>\n                                    </FormItem>\n                                </Col>\n\n                                <Col xs={12} sm={6} md={4}  lg={3}>\n                                    <FormItem>\n                                        {/* <Col xs={12} sm={12} md={12}  lg={12} className=\"col\"> */}\n                                            <Label>审批</Label>\n                                            <Radio.RadioGroup\n                                                    selectedValue={this.state.approvalState}\n                                                    {\n                                                    ...getFieldProps('approvalState', {\n                                                        initialValue: '1',\n                                                        onChange(value) {\n                                                            self.setState({ approvalState: value });\n                                                        },\n                                                    }\n                                                    )}\n                                                >\n                                                <Radio value=\"0\" >未审批</Radio>\n                                                <Radio value=\"1\" >已审批</Radio>\n                                            </Radio.RadioGroup>\n                                        {/* </Col> */}\n                                    </FormItem>\n                                </Col>\n                            </Row>\n                        </Form>\n                    </div>\n                </AdvancedContainer>\n            </SearchPanel>\n            </div>\n        )\n    }\n}\n\n","desc":" 基础示例"}]


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

ReactDOM.render(<DemoGroup/>, document.getElementById('root'));
