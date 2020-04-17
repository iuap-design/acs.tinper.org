import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var DemoArray = [{"example":<Demo1 />,"title":" 这是标题","code":"/**\n*\n* @title 这是标题\n* @description 这是描述\n*\n*/\nimport React, { Component } from 'react';\nimport {   Icon, Button, Label, CitySelect, Rate, InputNumber, Slider, Switch, Checkbox, Radio, Select,  Col,Row , FormControl, Form  } from 'tinper-bee';\nimport FormLayout from 'ac-form-layout';\n\nimport DatePicker from 'bee-datepicker';\n\nconst layout = {\n    lg:3,\n    md:4,\n    sm:6,\n    xs:12\n}\n\nconst { FormItem, FormRow,FormItemSpan } = FormLayout;\n\nconst orderTypes=[\n    {\n        'code':'001',\n        'name':'类型1'\n    },\n    {\n        'code':'002',\n        'name':'类型2'\n    },\n    {\n        'code':'003',\n        'name':'类型3'\n    },\n]\n\nclass Demo1 extends Component {\n\n    submit = (e) => {\n        e.preventDefault();\n        this.props.form.validateFields((err, values) => {\n            if (err) {\n                console.log('校验失败', values);\n            } else {\n                console.log('提交成功', values)\n            }\n        });\n    }\n    render () {\n        const { getFieldProps, getFieldError } = this.props.form;\n        return (\n            <div>\n                <FormLayout >\n                    <FormRow>\n                        <FormItem label=\"姓名\" required={true} {...layout} errorMsg={getFieldError('username')}>\n                            <FormControl placeholder=\"请输入姓名\"\n                                {...getFieldProps('username', {\n                                    validateTrigger: 'onBlur',\n                                    rules: [{\n                                        required: true, message: '请输入姓名',\n                                    }],\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"姓名\" required={true} {...layout} errorMsg={getFieldError('username1')}>\n                            <FormControl placeholder=\"请输入用户名\"\n                                {...getFieldProps('username1', {\n                                    validateTrigger: 'onChange',\n                                    rules: [{\n                                        required: true, message: '请输入用户名',\n                                    }],\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"采购日期\" required={true} {...layout} errorMsg={getFieldError('time')}>\n                            <DatePicker\n                            format=\"YYYY-MM-DD\"\n                                {\n                                ...getFieldProps('time', {\n                                    rules: [{\n                                        required: true, message: '请选择采购日期',\n                                    }],\n                                }\n                                ) }\n                                placeholder={'请选择采购日期'}\n                            />\n                        </FormItem>\n                        <FormItem label=\"订单类型\" required={true} {...layout} errorMsg={getFieldError('type')}>\n                            <Select \n                                {\n                                ...getFieldProps('type', {\n                                    initialValue: '',\n                                    rules: [{\n                                        required: true, message: '请选择订单类型',\n                                    }],\n                                }\n                                )}>\n                                <Option value=\"\">请选择</Option>\n                                {\n                                    orderTypes.map((item, index) => {\n                                        return (\n                                            <Option key={index} value={item.code}>{item.name}</Option>\n                                        )\n                                    })\n                                }\n                            </Select>\n                        </FormItem>\n                        <FormItem label=\"用户名\" required={true} {...layout} errorMsg={getFieldError('yonghuming')}>\n                            <FormControl placeholder=\"请输入用户名\"\n                                 {...getFieldProps('yonghuming', {\n                                    validateTrigger: 'onBlur',\n                                    rules: [{\n                                        required: true, message: '请输入用户名',\n                                    }],\n                                }) }\n                            />\n                        </FormItem>\n                    </FormRow>\n                    <FormRow>\n                        <FormItem label=\"金额\" required={true} {...layout}  errorMsg={getFieldError('complex_count')}>\n                            <InputNumber  iconStyle=\"one\" precision={2}\n                                {...getFieldProps('complex_count', {\n                                    initialValue: '',\n                                    rules: [{\n                                        required: true, message: '请输入金额',\n                                    }],\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"姓名\" {...layout}>\n                            <FormControl placeholder=\"请输入用户名\"/>\n                        </FormItem>\n                    </FormRow>\n                    <FormRow>\n                        <FormItem label=\"姓名\" required={true} {...layout}>\n                            <FormControl placeholder=\"请输入用户名\"/>\n                        </FormItem>\n                        <FormItem label=\"姓名\"  {...layout}>\n                            <FormControl placeholder=\"请输入用户名\" value=\"看这是啥\"/>\n                        </FormItem>\n                        <FormItem label=\"姓名\"  {...layout}>\n                            <FormControl placeholder=\"请输入用户名\" value=\"看这是啥\"/>\n                        </FormItem>\n                        <FormItem label=\"姓名\" required={true} {...layout}>\n                            <FormControl placeholder=\"请输入用户名\"/>\n                        </FormItem>\n                    </FormRow>\n                    <FormRow>\n                        <FormItem label=\"姓名\" required={true} {...layout}>\n                            <FormControl placeholder=\"请输入用户名\" value=\"看这是啥\"/>\n                        </FormItem>\n                        <FormItem label=\"固定\" {...layout}>\n                            <FormItemSpan title=\"我比较特殊\">我比较特殊</FormItemSpan>\n                        </FormItem>\n                        <FormItem label=\"姓名\" required={true} {...layout}>\n                            <FormControl placeholder=\"请输入用户名\"/>\n                        </FormItem>\n                    </FormRow>\n                </FormLayout>\n                <Button colors=\"primary\" onClick={this.submit}> 提交 </Button>\n            </div>\n        )\n    }\n}\nexport default Form.createForm()(Demo1)","desc":" 这是描述"}]


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
