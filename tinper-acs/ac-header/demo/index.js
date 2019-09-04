import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var DemoArray = [{"example":<Demo1 />,"title":" 基础示例1","code":"/**\n*\n* @title 基础示例1\n* @description icon传iconfont\n*\n*/\nimport React, { Component } from 'react';\nimport { Button } from 'tinper-bee';\nimport AcHeader from 'ac-header'\nclass Demo1 extends Component {\n    render () {\n        return (\n            <div>\n                <AcHeader icon={<i className='uf uf-cai-s'></i>} title='采购订单'>\n                    <Button colors=\"primary\">新增</Button>\n                    <Button bordered>修改</Button>\n                    <Button bordered>删除</Button>\n                    <Button bordered>取消</Button>\n                </AcHeader>\n            </div>\n        )\n    }\n}\nexport default Demo1","desc":" icon传iconfont"},{"example":<Demo2 />,"title":" 基础示例2","code":"/**\n*\n* @title 基础示例2\n* @description icon传图片，带返回按钮\n*\n*/\nimport React, { Component } from 'react';\nimport { ButtonGroup, Button } from 'tinper-bee';\nimport AcHeader from 'ac-header'\nclass Demo2 extends Component {\n    render () {\n        return (\n            <div>\n                <AcHeader \n                icon={<img src=\"//design.yonyoucloud.com/static/tinper-bee/images/favicon.png\"></img>}\n                backClick={()=>{alert('返回按钮被点击了')}}\n                title='采购订单：CD2019062700000191' showBack={true}>\n                    <ButtonGroup>\n                        <Button colors=\"primary\">新增</Button>\n                        <Button bordered>修改</Button>\n                        <Button bordered>删除</Button>\n                    </ButtonGroup>\n                    <Button bordered>打印</Button>\n                    <Button bordered>其它操作</Button>\n                    <Button bordered>取消</Button>\n                </AcHeader>\n            </div>\n        )\n    }\n}\nexport default Demo2","desc":" icon传图片，带返回按钮"}]


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
