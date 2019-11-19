import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var DemoArray = [{"example":<Demo1 />,"title":" 条形码组件示例1","code":"/**\n *\n * @title 条形码组件示例1\n * @description 条形码组件\n *\n */\n\nimport React, { Component } from 'react';\nimport { FormControl } from 'tinper-bee';\nimport AcBarcode from \"ac-barcode\";\nclass Demo1 extends Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            value: \"9787121315169\"\n        }\n    }\n    handlerChange = (value) => {\n        this.setState({ value });\n    }\n    render() {\n        return (\n            <div className=\"demoPadding\">\n                <FormControl value={this.state.value} onChange={this.handlerChange} />\n                <AcBarcode\n                    value={this.state.value}\n                />\n            </div>\n        )\n    }\n}\n\n\n","desc":" 条形码组件"},{"example":<Demo2 />,"title":" 条形码组件示例2","code":"/**\n *\n * @title 条形码组件示例2\n * @description 设置相关参数，可使用微信扫一扫来查看\n *\n */\n\nimport React, { Component } from 'react';\nimport { Col, Row, FormControl, Select } from 'tinper-bee';\nimport AcBarcode from \"ac-barcode\";\n\nclass Demo2 extends Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            value: \"9787121315169\",\n            format: \"EAN13\",\n            renderer:\"svg\"\n        }\n    }\n\n    handlerChange = (value) => {\n        this.setState({ value });\n    }\n\n    handleChangeFormat = (value) => {\n        this.setState({\n            format : value\n        });\n    }\n    handleChangeRenderer = (value) => {\n        this.setState({\n            renderer : value\n        });\n    }\n\n    render() {\n        return (\n            <div className=\"demoPadding\">\n                <Row>\n                    <Col md={3}>\n                        <AcBarcode\n                            value={this.state.value}\n                            format={this.state.format}\n                            renderer={this.state.renderer}\n                        />\n                    </Col>\n                </Row>\n                <Row>\n                    <Col md={3}>\n                        <FormControl value={this.state.value} onChange={this.handlerChange} />\n                    </Col>\n                </Row>\n                <Row>\n                    <Col md={3} style={{ \"margin\": \"10px 0\" }}>\n                        <Select\n                            defaultValue=\"EAN13\"\n                            onChange={this.handleChangeFormat}\n                        >\n                            <Option value=\"CODE128\">CODE128 auto</Option>\n                            <Option value=\"CODE128A\">CODE128 A</Option>\n                            <Option value=\"CODE128B\">CODE128 B</Option>\n                            <Option value=\"CODE128C\">CODE128 C</Option>\n                            <Option value=\"EAN13\">EAN13</Option>\n                            <Option value=\"EAN8\">EAN8</Option>\n                            <Option value=\"UPC\">UPC</Option>\n                            <Option value=\"CODE39\">CODE39</Option>\n                            <Option value=\"ITF14\">ITF14</Option>\n                            <Option value=\"ITF\">ITF</Option>\n                            <Option value=\"MSI\">MSI</Option>\n                            <Option value=\"MSI10\">MSI10</Option>\n                            <Option value=\"MSI11\">MSI11</Option>\n                            <Option value=\"MSI1010\">MSI1010</Option>\n                            <Option value=\"MSI1110\">MSI1110</Option>\n                            <Option value=\"pharmacode\">Pharmacode</Option>\n                        </Select>\n                    </Col>\n                </Row>\n                <Row>\n                    <Col md={3} style={{ \"margin\": \"10px 0\" }}>\n                    <Select\n                            defaultValue=\"svg\"\n                            onChange={this.handleChangeRenderer}\n                        >\n                            <Option value=\"svg\">svg</Option>\n                            <Option value=\"canvas\">canvas</Option>\n                            <Option value=\"img\">img</Option>\n                        </Select>\n                    </Col>\n                </Row>\n            </div>\n        )\n    }\n}\n\n\n","desc":" 设置相关参数，可使用微信扫一扫来查看"}]


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
