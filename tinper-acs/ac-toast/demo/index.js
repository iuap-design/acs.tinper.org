import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import './demo.scss';


import Demo1 from "./demolist/Demo1";import Demo2 from "./demolist/Demo2";import Demo3 from "./demolist/Demo3";import Demo4 from "./demolist/Demo4";import Demo5 from "./demolist/Demo5";import Demo6 from "./demolist/Demo6";
var DemoArray = [{"example":<Demo1 />,"title":" toast基本示例","code":"/**\n *\n * @title toast基本示例\n * @description toast基本示例\n *\n */\n\nimport React, { Component } from 'react';\nimport Toast from '../../src/index';\n\nclass Demo1 extends Component {\n    fPopToast(){\n        Toast.info({\n            msg: '消息提示',\n            mode: 'layout',\n            duration: 3000,\n            transition: 'fade'\n        });\n    }\n    render () {\n        return (\n            <div className=\"demoPadding\">\n                <button className=\"btn\" onClick={this.fPopToast}>基本消息</button>\n            </div>\n        )\n    }\n}\n\n\n","desc":" toast基本示例"},{"example":<Demo2 />,"title":" toast图标示例","code":"/**\n *\n * @title toast图标示例\n * @description toast图标示例\n *\n */\n\nimport React, { Component } from 'react';\nimport Toast from 'ac-toast';\n\nclass Demo2 extends Component {\n    fPopToast(){\n        Toast.info({\n            msg: '提交中...',\n            duration: 3000,\n            transition: 'fade',\n            icon: 'hourglass',\n            className: 'submiting'\n        });\n    }\n    fPopToast1(){\n        console.log(111)\n        Toast.info({\n            msg: '提交成功',\n            duration: 3000,\n            transition: 'fade',\n            icon: 'success',\n            className: 'submit-success'\n        });\n    }\n    render () {\n        return (\n            <div className=\"demoPadding\">\n                <button className=\"btn\" onClick={this.fPopToast}>提交中</button>\n                <button className=\"btn btn2\" onClick={this.fPopToast1}>提交成功</button>\n            </div>\n        )\n    }\n}\n\n\n","desc":" toast图标示例"},{"example":<Demo3 />,"title":" toast图片示例","code":"/**\n *\n * @title toast图片示例\n * @description toast图片示例\n *\n */\n\nimport React, { Component } from 'react';\nimport Toast from '../../src/index';\n\nclass Demo3 extends Component {\n    fPopToast(){\n        Toast.info({\n            msg: '迎客松',\n            duration: 3000,\n            transition: 'fade',\n            img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3189276298,1072963024&fm=58',\n            zIndex: 8888\n        });\n    }\n    render () {\n        return (\n            <div className=\"demoPadding\">\n                <button className=\"btn\" onClick={this.fPopToast}>图片</button>\n            </div>\n        )\n    }\n}\n\n\n","desc":" toast图片示例"},{"example":<Demo4 />,"title":" toast关闭回调","code":"/**\n *\n * @title toast关闭回调\n * @description toast关闭回调\n *\n */\n\nimport React, { Component } from 'react';\nimport Toast from '../../src/index';\n\nclass Demo4 extends Component {\n    fPopToast(){\n        Toast.info({\n            msg: '提交中...',\n            duration: 2000,\n            transition: 'fade',\n            icon: 'hourglass',\n            onClose: function(){\n                Toast.info({\n                    msg: '提交完成'\n                })\n            }\n        });\n    }\n    render () {\n        return (\n            <div className=\"demoPadding\">\n                <button className=\"btn\" onClick={this.fPopToast}>关闭回调</button>\n            </div>\n        )\n    }\n}\n\n\n","desc":" toast关闭回调"},{"example":<Demo5 />,"title":" toast loading示例","code":"/**\n *\n * @title toast loading示例\n * @description toast loading示例\n *\n */\n\nimport React, { Component } from 'react';\nimport Toast from '../../src/index';\n\nclass Demo4 extends Component {\n    fPopToast(){\n        let id = '1';\n        Toast.info({\n            id: id,\n            msg: '提交中...',\n            transition: 'fade',\n            icon: 'loading',\n            autoClose: false\n        });\n        setTimeout(() => {\n            Toast.close(id);\n        },3000);\n    }\n    render () {\n        return (\n            <div className=\"demoPadding\">\n                <button className=\"btn\" onClick={this.fPopToast}>loading示例</button>\n            </div>\n        )\n    }\n}\n\n\n","desc":" toast loading示例"},{"example":<Demo6 />,"title":" toast不同颜色示例","code":"/**\n *\n * @title toast不同颜色示例\n * @description toast不同颜色示例\n *\n */\n\nimport React, { Component } from 'react';\nimport Toast from '../../src/index';\n\nclass Demo6 extends Component {\n    fPopToast(type){\n        const map = {\n            success: '提交成功',\n            warning: '提交警告',\n            error: '提交错误'\n        }\n        const msg = map[type];\n        Toast[type]({\n            msg: msg,\n            duration: 3000,\n            transition: 'fade',\n            icon: type\n        });\n    }\n    render () {\n        return (\n            <div className=\"demoPadding\">\n                <button className=\"btn\" onClick={this.fPopToast.bind(this,'success')}>success</button>\n                <button className=\"btn\" onClick={this.fPopToast.bind(this,'warning')}>warning</button>\n                <button className=\"btn\" onClick={this.fPopToast.bind(this,'error')}>error</button>\n            </div>\n        )\n    }\n}\n\n\n","desc":" toast不同颜色示例"}]


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
