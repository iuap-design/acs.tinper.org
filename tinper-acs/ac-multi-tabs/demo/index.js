import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import './demo.scss';


import Demo1 from "./demolist/Demo1";
var DemoArray = [{"example":<Demo1 />,"title":" 多页签组件","code":"/**\n *\n * @title 多页签组件\n * @description 基于应用平台\n *\n */\n\nimport React, { Component } from 'react';\nimport {Button} from 'tinper-bee';\nimport AcMultiTabs from '../../src/index';\n\nlet index = 0;\nclass Demo1 extends Component {\n    constructor(props){\n        super(props);\n        this.state = {\n            menus: [{\n                id: 0,\n                router: 'home',\n                title: \"home\"\n            }]\n        }\n    }\n\n    // 增加\n    add = (e) => {\n        e.stopPropagation();\n        ++index;\n        const newTab = {\n            id: index++ ,\n            title: `节点: ${index}`,\n            router: `/节点: ${index}`,\n        };\n        this.setState({\n            menus: this.state.menus.concat(newTab),\n        });\n    }\n\n    handleChange = (v) => {\n        console.log(v)\n        this.setState({\n            menus : v\n        })\n    }\n    \n    render () {\n        const { menus } = this.state;\n        return (\n            <div className=\"demoPadding\">\n                <Button colors=\"primary\" onClick={this.add} style={{margin: '8px'}}>增加</Button>\n                <AcMultiTabs menus={menus} onChange={this.handleChange}/>\n            </div>\n        )\n    }\n}\n\n\n","desc":" 基于应用平台"}]


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
                <code className="hljs javascript">{ code.replace('../../src/index',COMPONENT).replace('../../src',COMPONENT) }</code>
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
