import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import Button from '../src';



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var Demo3 = require("./demolist/Demo3");var Demo4 = require("./demolist/Demo4");var Demo5 = require("./demolist/Demo5");var DemoArray = [{"example":<Demo1 />,"title":" 地区级联","code":"/**\n*\n* @title 地区级联\n* @description 中国地区级联\n*\n*/\n\nimport React, { Component } from 'react';\nimport { Button  } from 'tinper-bee';\nimport ACCitySelect from 'ac-city-select';\n\nclass Demo1 extends Component {\n\n\tconstructor() {\n\t\tsuper();\n\t\tthis.state = {\n\t\t\tdefaultValue:{ province:'北京',city:'北京',area:'东城区'},\n\t\t\tvalue:{ province:'北京',city:'北京',area:'东城区'}\n\t\t}\n\t}\n\n\tonChange=(obj)=>{\n\t\tconsole.log(obj)\n\t}\n\n\tbtnOnClick=()=>{\n\t\tthis.setState({\n\t\t\tvalue:{ province:'山西',city:'长治',area:'长治县'}\n\t\t})\n\t}\n\n\trender () {\n\t\treturn (\n\t\t\t<div>\n\t\t\t\t<ACCitySelect ref='city' onChange={this.onChange} defaultValue={this.state.defaultValue} value={this.state.value}/>\n\t\t\t\t<Button shape=\"border\" onClick={this.btnOnClick} style={{marginTop:\"10px\"}}>代码设置数据</Button>\n\t\t\t</div>\n\t)}\n}\nexport default Demo1;","desc":" 中国地区级联"},{"example":<Demo2 />,"title":" 切换语言","code":"/**\n*\n* @title 切换语言\n* @description 目前支持三种语言  zh_CN 中文简体(默认)、zh_TW 中文繁体、en_US 英文\n*\n*/\n\nimport React, { Component } from 'react';\nimport { Button  } from 'tinper-bee';\nimport CitySelect from 'ac-city-select';\n\nclass Demo2 extends Component {\n\n\tonChange=(obj)=>{\n\t\tconsole.log(obj)\n\t}\n\trender () {\n\t\treturn (\n\t\t\t<div>\n\t\t\t\t<CitySelect lang='en_US' onChange={this.onChange}/>\n\t\t\t\t<div style={{'height':'20px'}}/>\n\t\t\t\t<CitySelect lang='zh_TW' onChange={this.onChange}/>\n\t\t\t</div>\n\t)}\n}\nexport default Demo2;","desc":" 目前支持三种语言  zh_CN 中文简体(默认)、zh_TW 中文繁体、en_US 英文"},{"example":<Demo3 />,"title":" 设置不可用状态","code":"/**\n*\n* @title 设置不可用状态\n* @description 设置属性disabled为布尔值，默认为false；\n*\n*/\nimport React, { Component } from 'react';\nimport CitySelect from 'ac-city-select';\n\nclass Demo3 extends Component {\n\tconstructor() {\n\t\tsuper();\n\t\tthis.state = {\n\t\t\tdefaultValue: { province: '北京', city: '北京', area: '东城区' },\n\t\t\tvalue: null,\n\t\t\tdisabled: true\n\t\t}\n\t}\n\tonChange = (obj) => {\n\t\tconsole.log(obj);\n\t}\n\trender() {\n\t\tlet { disabled } = this.state\n\t\treturn (\n\t\t\t<div>\n\t\t\t\t<CitySelect lang='zh_TW' disabled={disabled} onChange={this.onChange} />\n\t\t\t</div>\n\t\t)\n\t}\n}\nexport default Demo3;","desc":" 设置属性disabled为布尔值，默认为false；"},{"example":<Demo4 />,"title":" 设置省市联动部分城市不可选择","code":"/**\n* @title 设置省市联动部分城市不可选择\n* @description 设置属性disabled为布尔值，默认为false；\n*/\nimport React, { Component } from 'react';\nimport CitySelect from 'ac-city-select';\n\nclass Demo4 extends Component {\n\tconstructor() {\n\t\tsuper();\n\t\tthis.state = {\n\t\t\tdefaultValue: { province: '北京', city: '北京', area: '东城区' },\n\t\t\tvalue: null,\n\t\t\tdisabledProvinceArr: ['天津', '河北'],\n\t\t\tdisabledCityArr: [\"天津\", \"长春\", \"四平\", \"大连\"],\n\t\t\tdisabledAreaObj: {\n\t\t\t\t\"鞍山\": [\"铁东区\", \"铁西区\", \"立山区\"],\n\t\t\t\t\"抚顺\": [\"新抚区\", \"东洲区\", \"望花区\", \"抚顺县\"],\n\t\t\t\t\"北京\": [\"崇文区\", \"宣武区\", \"朝阳区\"]\n\t\t\t}\n\t\t}\n\t}\n\n\trender() {\n\t\tlet { disabledProvinceArr, disabledCityArr, disabledAreaObj } = this.state;\n\t\treturn (\n\t\t\t<div>\n\t\t\t\t<CitySelect\n\t\t\t\t\tlang='zh_CN'\n\t\t\t\t\tdisabledProvinceArr={disabledProvinceArr}\n\t\t\t\t\tdisabledCityArr={disabledCityArr}\n\t\t\t\t\tdisabledAreaObj={disabledAreaObj}\n\t\t\t\t\tonChange={this.onChange}\n\t\t\t\t/>\n\t\t\t</div>\n\t\t)\n\t}\n}\nexport default Demo4;","desc":" 设置属性disabled为布尔值，默认为false；"},{"example":<Demo5 />,"title":" 设置城市选择可以清空；","code":"/**\n*\n* @title 设置城市选择可以清空；\n* @description 设置属性allowClear为布尔值，默认为false，设置allowClear: true时城市可以被清空；\n*\n*/\nimport React, { Component } from 'react';\nimport CitySelect from 'ac-city-select';\n\nclass Demo5 extends Component {\n\tconstructor() {\n\t\tsuper();\n\t\tthis.state = {\n\t\t\tdefaultValue: { province: '北京', city: '北京', area: '东城区' },\n\t\t\tvalue: null,\n\t\t\tdisabled: true\n\t\t}\n\t}\n\tonChange = (obj) => {\n\t\tconsole.log(obj);\n\t}\n\trender() {\n\t\treturn (\n\t\t\t<div>\n\t\t\t\t<CitySelect lang='zh_TW' allowClear={true}  onChange={this.onChange} />\n\t\t\t</div>\n\t\t)\n\t}\n}\nexport default Demo5;","desc":" 设置属性allowClear为布尔值，默认为false，设置allowClear: true时城市可以被清空；"}]


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
