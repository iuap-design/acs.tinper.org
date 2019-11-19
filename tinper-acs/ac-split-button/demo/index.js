import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var DemoArray = [{"example":<Demo1 />,"title":" 基本示例不同大小","code":"/**\n*\n* @title 基本示例不同大小\n* @description 不同大小的按钮\n*\n*/\nimport React, { Component } from 'react';\nimport { Menu, Button } from 'tinper-bee';\nimport SplitButton from 'ac-split-button';\nconst { Item } = Menu;\n\nclass Demo1 extends Component {\n    render () {\n        const menuList= (\n            <Menu >\n              <Item key=\"1\">借款合同</Item>\n              <Item key=\"2\">抵/质押合同</Item>\n              <Item key=\"3\">担保合同</Item>\n              <Item key=\"4\">联保合同</Item>\n              <Item key=\"5\">合同审批</Item>\n              <Item key=\"6\">抵/质押合同跟踪</Item>\n            </Menu>\n        );\n        return (\n            <div>\n                    <SplitButton menuList={menuList} onClick={()=>{console.log('click')}}>按钮</SplitButton>\n                    <SplitButton menuList={menuList} colors='primary'>primary按钮</SplitButton>\n                    <SplitButton menuList={menuList} colors='success'>success按钮</SplitButton>\n                    <SplitButton menuList={menuList} colors='info'>info按钮</SplitButton>\n                    <SplitButton menuList={menuList} colors='warning'>warning按钮</SplitButton>\n                    <SplitButton menuList={menuList} colors='danger'>danger按钮</SplitButton>\n                    <SplitButton menuList={menuList} colors='dark'>dark按钮</SplitButton>\n            </div>\n        )\n    }\n}\nexport default Demo1","desc":" 不同大小的按钮"}]


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
