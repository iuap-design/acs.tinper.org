import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var DemoArray = [{"example":<Demo1 />,"title":" 导航栏","code":"/**\n *\n * @title 导航栏\n * @description 基础示例\n *\n */\n\nimport React, { Component } from 'react';\nimport AcNavbar from 'ac-navbar/index';\nclass Demo1 extends Component {\n\n    onSidebarClick = (showSidebar) => {\n        console.log('侧边栏显示状态：',showSidebar);\n    }\n\n    onInputSearch = (value) => {\n        console.log(value)\n    }\n\n    render () {\n        let searchInputProps = {\n            placeholder: '应用搜索'\n        }\n        return (\n            <div className=\"demoPadding\">\n                <AcNavbar \n                onSidebarClick={this.onSidebarClick} \n                onInputSearch={this.onInputSearch}\n                {...searchInputProps}\n                />\n            </div>\n        )\n    }\n}\n\nexport default Demo1;\n","desc":" 基础示例"},{"example":<Demo2 />,"title":" 控制导航栏显示和隐藏","code":"/**\r\n *\r\n * @title 控制导航栏显示和隐藏\r\n * @description 通过`showHeader`参数控制导航栏显示和隐藏\r\n *\r\n */\r\n\r\nimport React, { Component } from 'react';\nimport { Button } from 'tinper-bee';\r\n\nimport AcNavbar from 'ac-navbar/index';\r\n\r\nclass Demo2 extends Component {\r\n    state={\r\n        showHeader:true \r\n    }\r\n    \r\n    handleClick = () => {\r\n        this.setState({\r\n            showHeader: !this.state.showHeader\r\n        })\r\n    }\r\n    render () {\r\n        let text = this.state.showHeader? '隐藏导航栏':'显示导航栏';\r\n        return (\r\n            <div className=\"demoPadding\">\r\n                <Button colors=\"primary\" onClick={this.handleClick} style={{margin:'8px'}}>{text}</Button>\r\n                <AcNavbar showHeader={this.state.showHeader}/>\r\n            </div>\r\n        )\r\n    }\r\n}\r\n\r\nexport default Demo2;\r\n","desc":" 通过`showHeader`参数控制导航栏显示和隐藏"}]


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
