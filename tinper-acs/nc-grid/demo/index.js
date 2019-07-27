import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var DemoArray = [{"example":<Demo1 />,"title":" SimpleTable","code":"/**\n*\n* @title SimpleTable\n* @description \n*\n*/\nimport React, { Component } from 'react';\nimport {  } from 'tinper-bee';\nimport NCGrid from \"tinper-bee/lib/src\";;\nconst SimpleTable = NCGrid.SimpleTable;\n\nconst columns = [\n    { title: \"员工编号\", dataIndex: \"a\", key: \"a\", width: 150 },\n    { title: \"员工姓名\", dataIndex: \"b\", key: \"b\", width:100},\n    { title: \"性别\", dataIndex: \"c\", key: \"c\", width: 100},\n    { title: \"部门\", dataIndex: \"d\", key: \"d\", width: 100 },\n    { title: \"职级\", dataIndex: \"e\", key: \"e\", width: 100 }\n];\n  \nconst data = [\n    { a: \"ASVAL_20190328\", b: \"小张\", c: \"男\", d: \"财务二科\", e: \"M1\", key: \"1\" },\n    { a: \"ASVAL_20190320\", b: \"小明\", c: \"男\", d: \"财务一科\", e: \"T1\", key: \"2\" },\n    { a: \"ASVAL_20190312\", b: \"小红\", c: \"女\", d: \"财务一科\", e: \"T2\", key: \"3\" }\n];\n  \nclass Demo1 extends Component {\n    render () {\n        return (\n            <SimpleTable\n            columns={columns}\n            data={data}\n            showPagination={true}\n            pageInfo= {{\n                pageIndex: \"1\",\n                pageSize: \"10\",\n                total: \"3\",\n                totalPage: \"1\"\n            }}\n            />\n        )\n    }\n}\n","desc":" "},{"example":<Demo2 />,"title":" CardTable","code":"/**\r\n*\r\n* @title CardTable\r\n* @description \r\n*\r\n*/\r\nimport React, { Component } from 'react';\nimport {  } from 'tinper-bee';\r\nimport NCGrid from \"tinper-bee/lib/src\";;\r\nconst CardTable = NCGrid.CardTable;\r\n\r\nconst columns = [\r\n    { title: \"员工编号\", dataIndex: \"a\", key: \"a\", width: 150 },\r\n    { title: \"员工姓名\", dataIndex: \"b\", key: \"b\", width:100},\r\n    { title: \"性别\", dataIndex: \"c\", key: \"c\", width: 100},\r\n    { title: \"部门\", dataIndex: \"d\", key: \"d\", width: 100 },\r\n    { title: \"职级\", dataIndex: \"e\", key: \"e\", width: 100 }\r\n];\r\n  \r\nconst data = [\r\n    { a: \"ASVAL_20190328\", b: \"小张\", c: \"男\", d: \"财务二科\", e: \"M1\", key: \"1\" },\r\n    { a: \"ASVAL_20190320\", b: \"小明\", c: \"男\", d: \"财务一科\", e: \"T1\", key: \"2\" },\r\n    { a: \"ASVAL_20190312\", b: \"小红\", c: \"女\", d: \"财务一科\", e: \"T2\", key: \"3\" }\r\n];\r\n\r\nconst tabLists = [{\r\n    code: 'body', \r\n    name: '详细信息',\r\n    items: [], \r\n}];\r\n  \r\nclass Demo2 extends Component {\r\n    render () {\r\n        return (\r\n            <CardTable\r\n            columns={columns}\r\n            data={data}\r\n            tabLists={tabLists}\r\n            moduleId=\"body\"\r\n            showMore={true}\r\n            config={{\r\n                showCheck: true, //是否开启多选功能\r\n            }}\r\n            />\r\n        )\r\n    }\r\n}\r\n","desc":" "}]


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
