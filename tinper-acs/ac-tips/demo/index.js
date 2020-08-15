import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var DemoArray = [{"example":<Demo1 />,"title":" 基础示例","code":"/**\n*\n* @title 基础示例\n* @description 基础示例\n*\n*/\nimport React, { Component } from 'react';\nimport { Button } from 'tinper-bee';\nimport AcTips from 'ac-tips';\n\n\nlet count = 1;\nclass Demo1 extends Component {\n\n    success=()=>{\n        AcTips.create({\n            type:'success',\n            content:\"success\"\n        })\n    }\n    error=()=>{\n        AcTips.create({\n            type:'error',\n            content:\"error\"+count.toString()\n        })\n        count++;\n    }\n    info=()=>{\n        AcTips.create({\n            type:'info',\n            content:\"info\"\n        })\n    }\n    warning=()=>{\n        AcTips.create({\n            type:'warning',\n            content:\"warning\"\n        })\n    }\n    destoryAll=()=>{\n        AcTips.destoryAll();\n    }\n\n    render () {\n        return (\n            <div>\n                <Button\n                    colors=\"success\"\n                    onClick={this.success}>\n                    success\n                </Button>\n                <Button\n                    colors=\"danger\"\n                    onClick={this.error}>\n                    error\n                </Button>\n                <Button\n                    colors=\"info\"\n                    onClick={this.info}>\n                    info\n                </Button>\n                <Button\n                    colors=\"warning\"\n                    onClick={this.warning}>\n                    warning\n                </Button>\n                <Button\n                    onClick={this.destoryAll}>\n                    destoryAll\n                </Button>\n            </div>\n        )\n    }\n}\nexport default Demo1","desc":" 基础示例"}]


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
