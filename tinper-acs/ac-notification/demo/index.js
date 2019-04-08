import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var DemoArray = [{"example":<Demo1 />,"title":" 基本示例","code":"/**\n *\n * @title 基本示例\n * @description 基本示例\n *\n */\n\nimport React, { Component } from 'react';\nimport openMess from \"tinper-bee/lib/openMess\";\nimport { Button } from 'tinper-bee';\n\n class Demo1 extends Component {\n    openFunc = (type) =>{\n        openMess({\n            title: `${type}提示`,\n            type:type,\n            duration:100,\n            content:\"你所提交的信息已经审核失败，可以进入个人信箱查看原因， 如有疑问，请联系客服人员。\"\n        });\n    }\n    render () {\n        return (\n            <div className=\"demoPadding\">\n                <Button colors=\"dark\" onClick={ e => this.openFunc('error')}>点击 error</Button>\n                <Button colors=\"warning\" onClick={ e => this.openFunc('warning')}>点击 warning</Button>\n                <Button colors=\"success\" onClick={ e => this.openFunc('success')}>点击 success</Button>\n                <Button colors=\"info\" onClick={ e => this.openFunc('info')}>点击 info</Button>\n            </div>\n        )\n    }\n}\n\n\n","desc":" 基本示例"}]


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
