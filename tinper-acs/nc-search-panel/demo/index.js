import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var DemoArray = [{"example":<Demo1 />,"title":" 基本示例","code":"/**\n*\n* @title 基本示例\n* @description 基本示例\n*\n*/\nimport React, { Component } from 'react';\nimport { Form, DatePicker } from 'tinper-bee';\nimport {  Icon, Button, Label, CitySelect, Rate, InputNumber, Slider, Switch, Checkbox, Radio, Select,  Col,Row , FormControl } from 'tinper-bee';\nimport NcSearchPanel from \"tinper-bee/lib/src\";;\n\nconst { Sample,Complex, FormItem } = NcSearchPanel;\nconst Option = Select.Option;\nconst orderTypes=[\n    {\n        'code':'001',\n        'name':'类型1'\n    },\n    {\n        'code':'002',\n        'name':'类型2'\n    },\n    {\n        'code':'003',\n        'name':'类型3'\n    },\n]\n\n\n\nconst translateKeyFunc=(values)=>{\n    let obj = {};\n    const translateKey = {\n        'username':'姓名',\n        'username1':'姓名',\n        'username2':'姓名',\n        'username3':'姓名',\n        'username4':'姓名',\n        'nl':'年龄',\n        'nl1':'年龄',\n        'nl2':'年龄',\n        'nl3':'年龄',\n        'nl4':'年龄',\n        'nl5':'年龄',\n        'nl6':'年龄',\n        'type':'类型'\n    }\n    for(let attr in values){\n        obj[translateKey[attr]] = values[attr];\n    }\n    console.log(obj)\n    return obj;\n}\n\nclass SF extends Component{\n    render(){\n        const { getFieldProps, getFieldError } = this.props.form;\n        return (\n            <div>\n                <FormItem label=\"姓名\" required={true}>\n                    <FormControl placeholder=\"请输入用户名\"\n                        {...getFieldProps('username', {\n                            validateTrigger: 'onBlur',\n                            rules: [{\n                                required: true, message: '请输入用户名',\n                            }],\n                        }) }\n                    />\n                </FormItem>\n                <FormItem label=\"年龄\">\n                    <FormControl placeholder=\"请输入年龄\"\n                        {...getFieldProps('nl', {\n                            validateTrigger: 'onBlur',\n                        }) }\n                    />\n                </FormItem>\n            </div>\n        )\n    }\n}\n\nclass CF extends Component{\n    render(){\n        const { getFieldProps, getFieldError } = this.props.form;\n        return (\n            <div>\n                <FormItem label=\"类型\">\n                            <Select \n                                {\n                                ...getFieldProps('type', {\n                                    initialValue: '',\n                                }\n                                )}>\n                                <Option value=\"\">请选择</Option>\n                                {\n                                    orderTypes.map((item, index) => {\n                                        return (\n                                            <Option key={index} value={item.code}>{item.name}</Option>\n                                        )\n                                    })\n                                }\n                            </Select>\n                        </FormItem>\n                        <FormItem label=\"年龄\">\n                            <FormControl placeholder=\"请输入年龄\"\n                                {...getFieldProps('nl1', {\n                                    validateTrigger: 'onBlur',\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"年龄\">\n                            <FormControl placeholder=\"请输入年龄\"\n                                {...getFieldProps('nl2', {\n                                    validateTrigger: 'onBlur',\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"年龄\">\n                            <FormControl placeholder=\"请输入年龄\"\n                                {...getFieldProps('nl3', {\n                                    validateTrigger: 'onBlur',\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"年龄\">\n                            <FormControl placeholder=\"请输入年龄\"\n                                {...getFieldProps('nl4', {\n                                    validateTrigger: 'onBlur',\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"年龄\">\n                            <FormControl placeholder=\"请输入年龄\"\n                                {...getFieldProps('nl5', {\n                                    validateTrigger: 'onBlur',\n                                }) }\n                            />\n                        </FormItem>\n                        <FormItem label=\"年龄\">\n                            <FormControl placeholder=\"请输入年龄\"\n                                {...getFieldProps('nl6', {\n                                    validateTrigger: 'onBlur',\n                                }) }\n                            />\n                        </FormItem>\n                        <div>\n                            <FormItem label=\"姓名\" required={true}>\n                                <FormControl placeholder=\"请输入用户名\"\n                                    {...getFieldProps('username1', {\n                                        validateTrigger: 'onBlur',\n                                    }) }\n                                />\n                            </FormItem>\n                            <FormItem label=\"姓名\" required={true}>\n                                <FormControl placeholder=\"请输入用户名\"\n                                    {...getFieldProps('username2', {\n                                        validateTrigger: 'onBlur',\n                                    }) }\n                                />\n                            </FormItem>\n                            <FormItem label=\"姓名\" required={true}>\n                                <FormControl placeholder=\"请输入用户名\"\n                                    {...getFieldProps('username3', {\n                                        validateTrigger: 'onBlur',\n                                    }) }\n                                />\n                            </FormItem>\n                            <FormItem label=\"姓名\" required={true}>\n                                <FormControl placeholder=\"请输入用户名\"\n                                    {...getFieldProps('username4', {\n                                        validateTrigger: 'onBlur',\n                                    }) }\n                                />\n                            </FormItem>\n                        </div>\n            </div>\n        )\n    }\n}\n\n\nclass Demo1 extends Component {\n    constructor(props){\n        super(props);\n        this.state={\n            searchObj:{}\n        }\n    }\n\n    search=()=>{\n        this.props.form.validateFields((err, values) => {\n            if (err) {\n                console.log('校验失败', values);\n            } else {\n                console.log('校验成功', values);\n                this.setState({\n                    searchObj:translateKeyFunc(values)\n                })\n            }\n        });\n    }\n\n    reset=()=>{\n        this.props.form.resetFields();\n        this.setState({\n            searchObj:{}\n        })\n    }\n\n    render () {\n        const { getFieldProps, getFieldError } = this.props.form;\n        \n        return (\n            <div>\n                <NcSearchPanel \n                    search={this.search}\n                    reset={this.reset}\n                    selectedData={this.state.searchObj}\n                >\n                    <Sample>\n                        <SF form={this.props.form}/>\n                    </Sample>\n                    <Complex>\n                        <CF form={this.props.form}/>\n                    </Complex>  \n                </NcSearchPanel>\n            </div>\n        )\n    }\n}\n\n","desc":" 基本示例"}]


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
