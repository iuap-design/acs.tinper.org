import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var DemoArray = [{"example":<Demo1 />,"title":" 基本示例","code":"/**\n*\n* @title 基本示例\n* @description 基本示例\n*\n*/\nimport React, { Component } from 'react';\nimport { FormControl } from 'tinper-bee';\nimport SplitArea from 'ac-split-area'\n\nclass Demo1 extends Component {\n    render () {\n        return (\n            <div>\n                <div>\n                    <FormControl placeholder='请输入基本信息'/>\n                    <FormControl placeholder='请输入基本信息'/>\n                    <FormControl placeholder='请输入基本信息'/>\n                    <FormControl placeholder='请输入基本信息'/>\n                </div>\n                <SplitArea>\n                    <div>我是操作信息1</div>\n                    <div></div>\n                    <div>我是操作信息2</div>\n                </SplitArea>\n            </div>\n        )\n    }\n}\nexport default Demo1","desc":" 基本示例"},{"example":<Demo2 />,"title":" 控制展开收起，自定义内容","code":"/**\n*\n* @title 控制展开收起，自定义内容\n* @description 设置 open 属性，使用 openChange 回调\n*\n*/\nimport React, { Component } from 'react';\nimport { FormControl } from 'tinper-bee';\nimport SplitArea from 'ac-split-area'\n\nclass Demo1 extends Component {\n    constructor(props){\n        super(props);\n        this.state={\n            open:false\n        }\n    }\n    openChange=(open)=>{\n        this.setState({\n            open\n        })\n    }\n\n    render () {\n        return (\n            <div>\n                <div>\n                    <FormControl placeholder='请输入基本信息'/>\n                    <FormControl placeholder='请输入基本信息'/>\n                    <FormControl placeholder='请输入基本信息'/>\n                    <FormControl placeholder='请输入基本信息'/>\n                </div>\n                <SplitArea ctn={this.state.open?'我展开了':'我收起了'}\n                 open={this.state.open} \n                 openChange={this.openChange}\n                 >\n                    <FormControl placeholder='请输入操作信息'/>\n                    <FormControl placeholder='请输入操作信息'/>\n                    <FormControl placeholder='请输入操作信息'/>\n                    <FormControl placeholder='请输入操作信息'/>\n                </SplitArea>\n            </div>\n        )\n    }\n}\nexport default Demo1","desc":" 设置 open 属性，使用 openChange 回调"}]


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
