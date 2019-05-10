import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import './demo.scss';


import Demo1 from "./demolist/Demo1";
var DemoArray = [{"example":<Demo1 />,"title":" 富文本编辑器","code":"/**\n *\n * @title 富文本编辑器\n * @description 美观易用的React富文本编辑器，基于draft-js开发\n *\n */\n\nimport React, { Component } from 'react';\n// 引入编辑器以及EditorState子模块\nimport AcEditor, { EditorState } from '../../src/index';\n// 引入编辑器样式\n// import 'ac-editor/dist/index.css';\nclass Demo1 extends Component {\n    constructor() {\n        super();\n        this.state = {\n            editorState: null\n        }\n    }\n    componentDidMount() {\n        // 假设此处从服务端获取html格式的编辑器内容\n        const htmlContent = `<p><b>欢迎使用富文本编辑器</b></p>`\n        // 使用EditorState.createFrom将html字符串转换为编辑器需要的editorState数据\n        this.setState({\n            editorState: EditorState.createFrom(htmlContent)\n        })\n    }\n    submitContent = async () => {\n        // 在编辑器获得焦点时按下ctrl+s会执行此方法\n        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容\n        const htmlContent = this.state.editorState.toHTML();\n        console.log(htmlContent);\n    }\n    handleEditorChange = (editorState) => {\n        this.setState({ editorState });\n    }\n    render() {\n        const { editorState } = this.state;\n        return (\n            <div className=\"demoPadding\">\n                <AcEditor\n                    value={editorState}\n                    onChange={this.handleEditorChange}\n                    onSave={this.submitContent}\n                />\n            </div>\n        )\n    }\n}\n\n\n","desc":" 美观易用的React富文本编辑器，基于draft-js开发"}]


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
