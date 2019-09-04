import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var DemoArray = [{"example":<Demo1 />,"title":" 基本示例","code":"/**\n*\n* @title 基本示例\n* @description 不区分简单复杂查询\n*\n*/\nimport React, { Component } from 'react';\nimport { InputNumber, Form,  Select, FormControl  } from 'tinper-bee';\n\nimport AcSearchPanel from 'ac-search-cn';\nimport DatePicker from 'ac-datepicker';\n\n\nconst { AcRangePicker } = DatePicker;\nconst InputNumberGroup = InputNumber.InputNumberGroup;\nconst { FormItem } = AcSearchPanel;\nconst Option = Select.Option;\nconst orderTypes={\n    'a':'类型1',\n    'b':'类型2',\n    'c':'类型3',\n    'd':'类型4',\n}\n\nclass Demo1 extends Component {\n\n\n    search=()=>{\n        this.props.form.validateFields((err, values) => {\n            if (err) {\n                console.log('校验失败', values);\n            } else {\n                console.log('校验成功', values);\n            }\n        });\n    }\n\n    reset=()=>{\n        this.props.form.resetFields();\n    }\n\n    render () {\n        const { getFieldProps,getFieldValue} = this.props.form;\n        return (\n            <div>\n                <AcSearchPanel \n                    search={this.search}\n                    reset={this.reset}\n                >\n                    <FormItem label=\"姓名\" required={true} tooltip=\"我是自定义tooltip\">\n                    <FormControl \n                        {...getFieldProps('username', {\n                            validateTrigger: 'onBlur',\n                        }) }\n                    />\n                </FormItem>\n                <FormItem label={['金额最小值','金额最大值']}>\n                    <InputNumberGroup \n                        {...getFieldProps('money', {\n                            validateTrigger: 'onBlur',\n                        })}\n                    />\n                </FormItem>\n                <FormItem label=\"类型\" tooltip={orderTypes[getFieldValue('type')]}>\n                            <Select \n                                {\n                                ...getFieldProps('type', {\n                                }\n                                )}>\n                                {\n                                   Object.keys(orderTypes).map((item, index) => {\n                                        return (\n                                            <Option key={item} value={item}>{orderTypes[item]}</Option>\n                                        )\n                                    })\n                                }\n                            </Select>\n                        </FormItem>\n                        <FormItem label=\"时间段\" >\n                            <AcRangePicker\n                            format=\"YYYY-MM-DD\"\n                                {...getFieldProps('nl1', {\n                                    initialValue:[]\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"年龄\" >\n                            <InputNumber \n                                {...getFieldProps('nl2', {\n                                    validateTrigger: 'onBlur',\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"年龄\">\n                            <InputNumber \n                                {...getFieldProps('nl3', {\n                                    validateTrigger: 'onBlur',\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"年龄\">\n                            <InputNumber \n                                {...getFieldProps('nl4', {\n                                    validateTrigger: 'onBlur',\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"年龄\">\n                            <InputNumber \n                                {...getFieldProps('nl5', {\n                                    validateTrigger: 'onBlur',\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"年龄\">\n                            <InputNumber \n                                {...getFieldProps('nl6', {\n                                    validateTrigger: 'onBlur',\n                                }) }\n                            />\n                        </FormItem>                     \n                </AcSearchPanel>\n            </div>\n        )\n    }\n}\n\nexport default Form.createForm()(Demo1);","desc":" 不区分简单复杂查询"},{"example":<Demo2 />,"title":" 区分简单复杂查询","code":"/**\n*\n* @title 区分简单复杂查询\n* @description const { Sample,Complex, FormItem } = AcSearchPanel;\n*\n*/\nimport React, { Component } from 'react';\nimport { InputNumber, Form,   Icon, Button, Label, CitySelect, Rate, Slider, Switch, Checkbox, Radio, Select,  Col,Row , FormControl  } from 'tinper-bee';\n\nimport DatePicker from 'bee-datepicker';\nimport AcSearchPanel from 'ac-search-cn';\n\nconst InputNumberGroup = InputNumber.InputNumberGroup;\n\nconst { Sample,Complex, FormItem } = AcSearchPanel;\nconst Option = Select.Option;\nconst orderTypes={\n    'a':'类型1',\n    'b':'类型2',\n    'c':'类型3',\n    'd':'类型4',\n}\n\n\nclass SF extends Component{\n    render(){\n        const { getFieldProps } = this.props.form;\n        return (\n            <div>\n                <FormItem label=\"姓名\" required={true}>\n                    <FormControl placeholder=\"请输入用户名\"\n                        {...getFieldProps('username', {\n                            validateTrigger: 'onBlur',\n                        }) }\n                    />\n                </FormItem>\n                <FormItem label={['金额最小值','金额最大值']}>\n                    <InputNumberGroup \n                        iconStyle='two'\n                        {...getFieldProps('money', {\n                            validateTrigger: 'onBlur',\n                        })}\n                    />\n                </FormItem>\n            </div>\n        )\n    }\n}\n\nclass CF extends Component{\n    render(){\n        const { getFieldProps, getFieldValue } = this.props.form;\n        return (\n            <div>\n                <FormItem label=\"类型\">\n                            <Select  tooltip={orderTypes[getFieldValue('type')]}\n                                {\n                                ...getFieldProps('type', {\n                                    initialValue: '',\n                                }\n                                )}>\n                                <Option value=\"\">请选择类型</Option>\n                                {\n                                    Object.keys(orderTypes).map((item, index) => {\n                                        return (\n                                            <Option key={item} value={item}>{orderTypes[item]}</Option>\n                                        )\n                                    })\n                                }\n                            </Select>\n                        </FormItem>\n                        <FormItem label=\"年龄\">\n                            <InputNumber placeholder=\"请输入年龄\"\n                                {...getFieldProps('nl1', {\n                                    validateTrigger: 'onBlur',\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"年龄\">\n                            <InputNumber placeholder=\"请输入年龄\"\n                                {...getFieldProps('nl2', {\n                                    validateTrigger: 'onBlur',\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"年龄\">\n                            <InputNumber placeholder=\"请输入年龄\"\n                                {...getFieldProps('nl3', {\n                                    validateTrigger: 'onBlur',\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"年龄\">\n                            <InputNumber placeholder=\"请输入年龄\"\n                                {...getFieldProps('nl4', {\n                                    validateTrigger: 'onBlur',\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"年龄\">\n                            <InputNumber placeholder=\"请输入年龄\"\n                                {...getFieldProps('nl5', {\n                                    validateTrigger: 'onBlur',\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"年龄\">\n                            <InputNumber placeholder=\"请输入年龄\"\n                                {...getFieldProps('nl6', {\n                                    validateTrigger: 'onBlur',\n                                }) }\n                            />\n                        </FormItem>\n                        <div>\n                            <FormItem label=\"姓名11\" required={true}>\n                                <InputNumber placeholder=\"请输入用户名\" iconStyle='two'\n                                    {...getFieldProps('username1', {\n                                        validateTrigger: 'onBlur',\n                                    }) }\n                                />\n                            </FormItem>\n                            <FormItem label={['金额最小值','金额最大值']} required={true}>\n                                <InputNumberGroup \n                                    iconStyle='two'\n                                    {...getFieldProps('money', {\n                                        validateTrigger: 'onBlur',\n                                    })}\n                                />\n                            </FormItem>\n                            <FormItem label=\"姓名\" required={true}>\n                                <FormControl placeholder=\"请输入用户名\"\n                                    {...getFieldProps('username3', {\n                                        validateTrigger: 'onBlur',\n                                    }) }\n                                />\n                            </FormItem>\n                            <FormItem label=\"姓名\" required={true}>\n                                <FormControl placeholder=\"请输入用户名\"\n                                    {...getFieldProps('username4', {\n                                        validateTrigger: 'onBlur',\n                                    }) }\n                                />\n                            </FormItem>\n                        </div>\n            </div>\n        )\n    }\n}\n\n\nclass Demo1 extends Component {\n\n\n    search=()=>{\n        this.props.form.validateFields((err, values) => {\n            if (err) {\n                console.log('校验失败', values);\n            } else {\n                console.log('校验成功', values);\n            }\n        });\n    }\n\n    reset=()=>{\n        this.props.form.resetFields();\n    }\n\n    render () {\n        return (\n            <div>\n                <AcSearchPanel \n                    search={this.search}\n                    reset={this.reset}\n                    hasChose={true}\n                >\n                    <Sample>\n                        <SF form={this.props.form}/>\n                    </Sample>\n                    <Complex>\n                        <CF form={this.props.form}/>\n                    </Complex> \n                </AcSearchPanel>\n            </div>\n        )\n    }\n}\n\nexport default Form.createForm()(Demo1);","desc":" const { Sample,Complex, FormItem } = AcSearchPanel;"}]


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
