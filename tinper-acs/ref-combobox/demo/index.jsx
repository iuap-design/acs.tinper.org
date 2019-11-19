import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import './demo.scss'



import Demo1 from "./demolist/Demo1";
var DemoArray = [{"example":<Demo1 />,"title":" 下拉参照","code":"/**\n *\n * @title 下拉参照\n * @description ref-combobox下拉参照\n *\n */\n\nimport React, { Component } from 'react';\n\nimport Form from \"bee-form\";\nimport RefComboBoxBaseUI, { ComboStore,ComboItem } from 'ref-combobox';\nimport '../../src/index.less';\nimport Button from 'bee-button';\nimport 'bee-button/build/Button.css';\nimport Icon from 'bee-icon';\nimport 'bee-icon/build/Icon.css';\n\n\nlet storeData =  [{\"rownum_\":1,\"code\":\"bj\",\"name\":\"北京总部-简\",\"refcode\":\"bj\",\"refpk\":\"5305416e-e7b4-4051-90bd-12d12942295b\",\"id\":\"5305416e-e7b4-4051-90bd-12d12942295b\",\"refname\":\"北京总部-简\"},{\"rownum_\":2,\"code\":\"xd\",\"name\":\"新道-简\",\"refcode\":\"xd\",\"refpk\":\"b691afff-ea83-4a3f-affa-beb2be9cba52\",\"id\":\"b691afff-ea83-4a3f-affa-beb2be9cba52\",\"refname\":\"新道-简\"},{\"rownum_\":3,\"code\":\"yy3\",\"name\":\"test3\",\"refcode\":\"yy3\",\"refpk\":\"e75694d9-7c00-4e9e-9573-d29465ae79a9\",\"id\":\"e75694d9-7c00-4e9e-9573-d29465ae79a9\",\"refname\":\"test3\"},{\"rownum_\":4,\"code\":\"yy1\",\"name\":\"test1\",\"refcode\":\"yy1\",\"refpk\":\"fd32ceeb-57a8-4f44-816e-fa660f5715ab\",\"id\":\"fd32ceeb-57a8-4f44-816e-fa660f5715ab\",\"refname\":\"test1\"},{\"rownum_\":5,\"code\":\"fan-1\",\"name\":\"fan-1\",\"refcode\":\"fan-1\",\"refpk\":\"e73fca8d-3f33-4632-9650-c2e33816b3b3\",\"id\":\"e73fca8d-3f33-4632-9650-c2e33816b3b3\",\"refname\":\"fan-1\"},{\"rownum_\":6,\"code\":\"fan-2\",\"name\":\"fan-2\",\"refcode\":\"fan-2\",\"refpk\":\"b6a7697f-ee6b-439e-b210-b144b8a12e3c\",\"id\":\"b6a7697f-ee6b-439e-b210-b144b8a12e3c\",\"refname\":\"fan-2\"},{\"rownum_\":7,\"code\":\"fan-3\",\"name\":\"fan-3\",\"refcode\":\"fan-3\",\"refpk\":\"4b304d32-54e4-4f40-81d9-25a31ed02760\",\"id\":\"4b304d32-54e4-4f40-81d9-25a31ed02760\",\"refname\":\"fan-3\"},{\"rownum_\":8,\"code\":\"fan-4\",\"name\":\"fan-4\",\"refcode\":\"fan-4\",\"refpk\":\"102b81f0-129f-450e-a113-18c1e37b4188\",\"id\":\"102b81f0-129f-450e-a113-18c1e37b4188\",\"refname\":\"fan-4\"},{\"rownum_\":9,\"code\":\"fan-5\",\"name\":\"fan-5\",\"refcode\":\"fan-5\",\"refpk\":\"84cc4a82-09ba-4dce-9ab5-4526709d1a20\",\"id\":\"84cc4a82-09ba-4dce-9ab5-4526709d1a20\",\"refname\":\"fan-5\"},{\"rownum_\":10,\"code\":\"fan-6\",\"name\":\"fan-6\",\"refcode\":\"fan-6\",\"refpk\":\"ad2bd02a-90da-44ed-991b-ced5b1e90598\",\"id\":\"ad2bd02a-90da-44ed-991b-ced5b1e90598\",\"refname\":\"fan-6\"}]\nclass Demo1 extends Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n          comboboxStoreData:[],//下拉的数据\n          loading:false,\n          currentIndex:0\n        };\n         //用于控制预加载的标记\n         this.loadCount = 0;\n         this.value = '';\n      }\n    componentDidMount(){\n        let valueField = 'refcode';\n        let displayField=(record) => {\n            return <div > <Icon type=\"uf-personin-o\" style={{ color: 'red' }} /> {record.refname}-{record.refcode}-{record.type}</div>\n        }\n        let value= '初级'; //以上三个值都是传进参照的值\n        this.setState({\n            loading:true\n        })\n        let comboboxStoreData = storeData.map((item, index) => {\n            let text = '';\n            if (typeof displayField === 'string') {\n              text = displayField.format(item)\n            } else if (typeof displayField === 'function') {\n              text = displayField(item);\n            } else {\n              text = item.refname;\n            }\n            return <ComboItem \n            active={item[valueField] === value || item.refname === value} \n            key={`${item[valueField]}-index`} \n            text={text} \n            value={item[valueField]} \n            />\n          });\n          this.setState({ \n            comboboxStoreData,\n            loading:false,\n          });\n    }\n    changeData(value){\n        let valueField = 'refcode';\n        let displayField=(record) => {\n            return <div > <Icon type=\"uf-personin-o\" style={{ color: 'red' }} /> {record.refname}-{record.refcode}-{record.type}</div>\n        }\n        this.setState({\n            loading:true\n        })\n        let comboboxStoreData = storeData.map((item, index) => {\n            let text = '';\n            if (typeof displayField === 'string') {\n              text = displayField.format(item)\n            } else if (typeof displayField === 'function') {\n              text = displayField(item);\n            } else {\n              text = item.refname;\n            }\n            return <ComboItem \n            active={item[valueField] === value || item.refname === value} \n            key={`${item[valueField]}-index`} \n            text={text} \n            value={item[valueField]} \n            />\n          });\n          this.setState({ \n            comboboxStoreData,\n            loading:false,\n          });\n    }\n    onClickItem=(record)=>{\n        console.log('clickItem',record)\n        this.changeData(record[\"refcode\"])\n    }\n    onChangeFormControl  = (value) =>{\n        console.log('搜索',value)\n        this.changeData(value)\n    }\n    onFocusFormControl = (visible) =>{\n        console.log('下拉当前是否展示',visible)\n    }\n    onSelect = (currentIndex) =>{\n        console.log('分页下拉',currentIndex);\n        this.setState({\n            currentIndex:currentIndex-1\n        })\n    }\n    render() {\n        const { getFieldError, getFieldProps } = this.props.form;\n        let {comboboxStoreData,loading,currentIndex} = this.state;\n        return (\n            <div className=\"demoPadding\">\n                <RefComboBoxBaseUI\n                    displayField={(record)=>{return `${record.refname}-haha`}}\n                    valueField={'refcode'}\n                    lang={'zh_CN'}\n                    {...getFieldProps('combobox', {\n                        initialValue:'{\"refpk\":\"level1\",\"refname\":\"初级\"}',  //M0000000000002\n                        rules: [{\n                            message: '提示：请选择',\n                            pattern: /[^{\"refname\":\"\",\"refpk\":\"\"}|{\"refpk\":\"\",\"refname\":\"\"}]/\n                        }]\n                    })}\n                    comboboxStoreData={comboboxStoreData}\n                    storeData={storeData}\n                    loading={loading}\n                    onClickItemInner={this.onClickItem}\n                    onFocusFormControl={this.onFocusFormControl}\n                    onSelect={this.onSelect}\n                    onChangeFormControl={this.onChangeFormControl}\n                    pageCount={10}\n                    currPageIndex={currentIndex}\n                    totalElements={70}\n\n                >\n                    <ComboStore\n                        displayField={(record) => {\n                            return <div > <Icon type=\"uf-personin-o\" style={{ color: 'red' }} /> {record.refname}-{record.refcode}-{record.type}</div>\n                        }}\n                    />\n                </RefComboBoxBaseUI>\n                <span style={{ color: 'red' }}>\n                    {getFieldError('combobox')}\n                </span>\n                <Button\n                    colors=\"primary\"\n                    onClick={() => {\n                        this.props.form.validateFields((err, values) => {\n                            if (err) {\n                                alert(\"\" + JSON.stringify(err));\n                                return false;\n                            }\n                            alert(\"\" + JSON.stringify(values))\n                        });\n                    }}>\n                    提交\n            </Button>\n            </div>\n        )\n    }\n}\n\n\n\n","desc":" ref-combobox下拉参照"}]


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
