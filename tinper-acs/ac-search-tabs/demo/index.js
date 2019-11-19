import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var DemoArray = [{"example":<Demo1 />,"title":" 这是标题","code":"/**\n*\n* @title 这是标题\n* @description 这是描述\n*\n*/\nimport React, { Component } from 'react';\nimport { Button } from 'tinper-bee';\nimport SearchTabs from \"ac-search-tabs\";\n\nconst Tab = SearchTabs.Tab;\n\n\n\nclass Demo1 extends Component {\n    constructor(props){\n        super(props);\n        this.state={\n            tabList:[\n                {\n                    name:\"待提交(9)\",value:'1'\n                },\n                {\n                    name:\"审批中(99)\",value:'2'\n                },\n                {\n                    name:\"执行中(999)\",value:'3'\n                },\n                {\n                    name:\"已完成(99999)\",value:'4'\n                },\n                {\n                    name:\"已删除\",value:'5'\n                },\n                {\n                    name:\"全部(9999999)\",value:'6'\n                },\n            ],\n            selectValue:'3'\n        }\n    }\n    getData=()=>{\n        this.setState({\n            selectValue:'1',\n            tabList:[\n                {\n                    name:\"已删除\",value:'1'\n                },\n                {\n                    name:\"全部(0)\",value:'2'\n                },\n                {\n                    name:\"待提交(9)\",value:'3'\n                },\n                {\n                    name:\"审批中(99)\",value:'4'\n                },\n            ]\n        })\n    }\n\n    render () {\n        return (\n            <div>\n                <div>\n                    <Button colors='primary' onClick={this.getData}>点击请求数据</Button>\n                </div>\n                <SearchTabs value={this.state.selectValue} onChange={(v)=>{console.log('onchange',v)}}>\n                    {\n                        this.state.tabList.map(item=>\n                            <Tab value={item.value}>{item.name}</Tab>)\n                    }\n                </SearchTabs>\n            </div>\n        )\n    }\n}\n","desc":" 这是描述"}]


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
