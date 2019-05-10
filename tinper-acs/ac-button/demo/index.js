import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var DemoArray = [{"example":<Demo1 />,"title":" 基础示例1","code":"/**\n *\n * @title 基础示例1\n * @description 西瓜UI 基础Button组件样式\n *\n */\n\nimport React, { Component } from 'react';\nimport AcButton from \"@yonyou/ac-button\";\n class Demo1 extends Component {\n    constructor(props){\n        super(props)\n        this.state={\n        }\n    }\n     onClick(){\n        console.log('click')\n     }\n    render () {\n        return (\n            <div className=\"demoPadding\">\n                <AcButton bcolors=\"brand\">品牌色</AcButton>\n                <AcButton bcolors=\"danger\">危险</AcButton>\n                <AcButton bcolors=\"warning\">警告</AcButton>\n                <AcButton bcolors=\"default\">信息</AcButton>\n            </div>\n        )\n    }\n}\n\n\n","desc":" 西瓜UI 基础Button组件样式"},{"example":<Demo2 />,"title":" 基础示例2","code":"/**\n *\n * @title 基础示例2\n * @description 西瓜UI 其他Button样式组件\n *\n */\n\nimport React, { Component } from 'react';\nimport AcButton from \"@yonyou/ac-button\";\n class Demo2 extends Component {\n    constructor(props){\n        super(props)\n        this.state={\n        }\n    }\n     onClick(){\n        console.log('click')\n     }\n    render () {\n        return (\n            <div className=\"demoPadding\">\n                <AcButton bcolors=\"default_line\">带边框按钮</AcButton>\n                <AcButton bcolors=\"default_alpha\">透明按钮</AcButton>\n\n                <AcButton bcolors=\"default_white\">默认按钮</AcButton>\n                <AcButton bcolors=\"search_icon\">默认按钮</AcButton>\n                <AcButton bcolors=\"org\">品牌色</AcButton>\n                <AcButton bcolors=\"org_o\">带边框按钮</AcButton>\n\n            </div>\n        )\n    }\n}\n\n\n","desc":" 西瓜UI 其他Button样式组件"}]


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
