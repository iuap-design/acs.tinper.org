import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var DemoArray = [{"example":<Demo1 />,"title":" 二维码组件示例1","code":"/**\n *\n * @title 二维码组件示例1\n * @description 可以生成符合行业规格的二维码，支持不同格式\n *\n */\n\nimport React, { Component } from 'react';\nimport { FormControl } from 'tinper-bee';\nimport AcQrcode from \"ac-qrcodes\";\nclass Demo1 extends Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n\n        }\n    }\n\n    render() {\n        return (\n            <div className=\"demoPadding\">\n                <AcQrcode\n                    value={\"http://tinper.org/\"}\n                    size={128}\n                    bgColor={\"#ffffff\"}\n                    fgColor={\"#000000\"}\n                    level={\"L\"}\n                    includeMargin={false}\n                    renderAs={\"svg\"}\n                />\n            </div>\n        )\n    }\n}\n\n\n","desc":" 可以生成符合行业规格的二维码，支持不同格式"},{"example":<Demo2 />,"title":" 二维码组件示例2","code":"/**\n *\n * @title 二维码组件示例2\n * @description 设置不同的二维码参数，显示不同规格的格式等\n *\n */\n\nimport React, { Component } from 'react';\nimport { FormControl, Col, Row, Select, InputNumber, Checkbox } from 'tinper-bee';\nimport AcQrcode from \"ac-qrcodes\";\nclass Demo2 extends Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            value: \"http://tinper.org/\",\n            size: 128,\n            bgColor: \"#FFFFFF\",\n            fgColor: \"#000000\",\n            level: \"L\",\n            includeMargin: false,\n            renderAs: \"svg\"\n        }\n    }\n\n    handlerChange = (key, val) => {\n        this.setState({\n            [key]: val\n        });\n    }\n    handlerChangeSize = (val) => {\n        this.setState({\n            size: Number(val)\n        });\n    }\n\n    render() {\n        let { value, size, bgColor, fgColor, level, includeMargin, renderAs } = this.state;\n        return (\n            <div className=\"demoPadding\">\n                <AcQrcode\n                    value={value}\n                    size={size}\n                    bgColor={bgColor}\n                    fgColor={fgColor}\n                    level={level}\n                    includeMargin={includeMargin}\n                    renderAs={renderAs}\n                />\n                <Row>\n                    <Col md={3}>\n                        <label>Value:</label>\n                        <FormControl value={this.state.value} onChange={(v) => this.handlerChange('value', v)} />\n                    </Col>\n                </Row>\n                <Row>\n                    <Col md={2}>\n                        <label>Size:</label>\n                        <InputNumber\n                            iconStyle=\"one\"\n                            max={1024}\n                            min={64}\n                            step={1}\n                            value={this.state.size}\n                            onChange={(v) => this.handlerChange('size', v)}\n                        />\n                    </Col>\n                </Row>\n                <Row>\n                    <Col md={2}>\n                        <label>Background Color:</label>\n                        <Select\n                            defaultValue=\"#FFFFFF\"\n                            onChange={(v) => this.handlerChange('bgColor', v)}\n                        >\n                            <Option value=\"#FFFFFF\">White</Option>\n                            <Option value=\"#fa8c16\">Yellow</Option>\n                            <Option value=\"#f5222d\">Red</Option>\n                            <Option value=\"#52c41a\">Green</Option>\n                            <Option value=\"#1890ff\">Blue</Option>\n                            <Option value=\"#13c2c2\">Cyan</Option>\n                            <Option value=\"#eb2f96\">Magenta</Option>\n                            <Option value=\"#fa541c\">Volcano</Option>\n\n                        </Select>\n                    </Col>\n                </Row>\n                <Row>\n                    <Col md={2}>\n                        <label>Foreground Color:</label>\n                        <Select\n                            defaultValue=\"#000000\"\n                            onChange={(v) => this.handlerChange('fgColor', v)}\n                        >\n                            <Option value=\"#000000\">Black</Option>\n                            <Option value=\"#fa8c16\">Yellow</Option>\n                            <Option value=\"#f5222d\">Red</Option>\n                            <Option value=\"#52c41a\">Green</Option>\n                            <Option value=\"#1890ff\">Blue</Option>\n                            <Option value=\"#13c2c2\">Cyan</Option>\n                            <Option value=\"#eb2f96\">Magenta</Option>\n                            <Option value=\"#fa541c\">Volcano</Option>\n                        </Select>\n                    </Col>\n                </Row>\n                <Row>\n                    <Col md={2}>\n                        <label>Error Level:</label>\n                        <Select\n                            defaultValue=\"L\"\n                            onChange={(v) => this.handlerChange('level', v)}\n                        >\n                            <Option value=\"L\">L</Option>\n                            <Option value=\"M\">M</Option>\n                            <Option value=\"Q\">Q</Option>\n                            <Option value=\"H\">H</Option>\n                        </Select>\n                    </Col>\n                </Row>\n                <Row>\n                    <Col md={2}>\n                        <label>Include Margin:</label>\n                        <Checkbox\n                            checked={this.state.includeMargin}\n                            onChange={this.onChange}\n                            onChange={(v) => this.handlerChange('includeMargin', v)}\n                        />\n                    </Col>\n                </Row>\n                <Row>\n                    <Col md={2}>\n                        <label>Render As:</label>\n                        <Select\n                            defaultValue=\"svg\"\n                            onChange={(v) => this.handlerChange('renderAs', v)}\n                        >\n                            <Option value=\"svg\">Svg</Option>\n                            <Option value=\"canvas\">Canvas</Option>\n                        </Select>\n                    </Col>\n                </Row>\n            </div>\n        )\n    }\n}\n\n\n","desc":" 设置不同的二维码参数，显示不同规格的格式等"}]


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
