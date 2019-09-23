import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import './demo.scss';
import '../src/index.less';


import Demo1 from "./demolist/Demo1";import Demo2 from "./demolist/Demo2";import Demo3 from "./demolist/Demo3";import Demo4 from "./demolist/Demo4";import Demo5 from "./demolist/Demo5";
var DemoArray = [{"example":<Demo1 />,"title":" mdf-refer基础使用1","code":"/**\n *\n * @title mdf-refer基础使用1\n * @description cb.utils.initSupport 初始化参照\n *\n */\nimport React, { Component } from 'react';\nimport ReactDOM from 'react-dom';\nimport MdfRefer,{cb} from '@yonyou/mdf-refer'\n\nclass Demo1 extends Component {\n    constructor(props){\n        super(props);\n        this.state = {\n            content:{},\n            selectedKeys:[],\n        }\n        this.afterOkClick = this.afterOkClick.bind(this);\n        this.model = new cb.models.ReferModel({\n            cRefType:'ucf-org-center.bd_adminorgtreeviewref',\n            multiple:true,\n            displayname:'name',\n            valueField:'id',\n        });\n        this.model2 = new cb.models.ReferModel({\n            cRefType:'ucf-staff-center.bd_staff_ref',\n            text:'冯青平',\n            multiple:false,\n            displayname:'name',\n        });\n        this.model3 = new cb.models.ReferModel({\n            cRefType:'productcenter.pc_nomalproductref',\n            multiple:true,\n        });\n\n        this.config = {};\n        this.config.modelconfig ={\n            afterOkClick:this.afterOkClick\n        }\n    }\n   \n    afterOkClick = (data) =>{\n        console.log('demo2的afterOkClick',JSON.stringify(data));\n    }\n    render () {\n       \n\n        return (\n            <div  className='demo'>\n                <label>参照-组织树</label> \n                {cb.utils.initSupport('refer',this.model,this.config)}\n               <label>参照-人员表</label> \n                {cb.utils.initSupport('refer',this.model2,this.config)}\n                 <label>参照-物料树表</label> \n                {cb.utils.initSupport('refer',this.model3)}\n            </div>\n         )\n    }\n}\n\n\n// ReactDOM.render(<Demo/>, document.getElementById('root'));\n","desc":" cb.utils.initSupport 初始化参照"},{"example":<Demo2 />,"title":" mdf-refer基础使用2","code":"/**\n *\n * @title mdf-refer基础使用2\n * @description <MdfRefer/>初始化参照，并搭配bee-from进行校验\n *\n */\nimport React, { Component } from 'react';\nimport ReactDOM from 'react-dom';\nimport MdfRefer,{cb} from '@yonyou/mdf-refer'\nimport {Form,Button} from 'tinper-bee';\nclass Demo2 extends Component {\n    constructor(props){\n        super(props);\n        this.state = {\n            content:{},\n            selectedKeys:[],\n        }\n        this.model = new cb.models.ReferModel({\n            cRefType:'ucf-org-center.bd_adminorgtreeviewref',\n           \n        });\n        this.config = {\n            modelconfig:{\n                afterValueChange:this.afterValueChange,\n            }\n        }\n    }\n    \n    afterValueChange = (data) =>{\n        console.log('demo2的js'+JSON.stringify(data))\n    }\n    clearFunc = () =>{\n        this.props.form.setFieldsValue({'code1':''});\n        this.model.setValue(null, true);\n    }\n    \n    render () {\n       \n        const { getFieldProps, getFieldError } = this.props.form;\n        return (\n            <div  className='demo'>\n                <MdfRefer \n                    modelName={'refer'} model={this.model} config={this.config}\n                    {...getFieldProps('code1', {\n                        initialValue:'kalal',\n                        rules: [{\n                            required:true,\n                            message: '请输入请选择', \n                            pattern: /[^{\"refname\":\"\",\"refpk\":\"\"}|{\"refpk\":\"\",\"refname\":\"\"}]/\n                        }]\n                    })}\n                > \n                ></MdfRefer>\n                <Button onClick={this.clearFunc}> 清空</Button>\n                <Button colors=\"primary\" onClick={\n                    ()=>{\n                        this.props.form.validateFields((err, values) => {\n                        if(err){\n                            alert(\"\"+JSON.stringify(err));\n                            return false;\n                        }\n                        alert(\"\"+JSON.stringify(values))\n                        });\n                    }\n                    }>提交</Button>\n                    <span className='error'>\n                    {getFieldError('code1')}\n                    </span>\n            </div>\n         )\n    }\n}\n\n\n","desc":" <MdfRefer/>初始化参照，并搭配bee-from进行校验"},{"example":<Demo3 />,"title":" mdf-refer基础使用3","code":"/**\n *\n * @title mdf-refer基础使用3\n * @description 参照的级联功能\n *\n */\nimport React, { Component } from 'react';\nimport ReactDOM from 'react-dom';\nimport MdfRefer,{cb} from '@yonyou/mdf-refer'\n\nclass Demo3 extends Component {\n    constructor(props){\n        super(props);\n        this.state = {\n            content:{},\n            selectedKeys:[],\n        }\n        this.afterOkClick = this.afterOkClick.bind(this);\n        this.model = new cb.models.ReferModel({\n            // cRefType:'ucf-org-center.org_assets_tree_ref',\n            cRefType:'ucf-org-center.bd_adminorgtreeviewref',\n            multiple:true,\n            displayname:'name',\n            valueField:'id',\n        });\n        this.model2 = new cb.models.ReferModel({\n            // cRefType:'ucf-staff-center.bd_staff_ref',\n            cRefType:'ucf-staff-center.bd_staff_ref',\n            multiple:false,\n            displayname:'name',\n        });\n        this.config={\n            modelconfig:{\n                afterValueChange:this.afterOkClick\n            }\n        }\n    }\n    \n    componentDidMount(){\n    }\n    componentDidUpdate(){\n    }\n    componentWillReceiveProps(nextProps){\n    }\n    afterOkClick = (data) =>{\n        let {value} = data;\n        let simpleVOs = [];\n        if(Array.isArray(value)){\n            value.forEach((item)=>{\n                let  newObj = {};\n                newObj.field = 'mainJobList.org_id';\n                newObj.op = 'in';\n                newObj.value1 = item.id;\n                simpleVOs.push(newObj)\n            })\n            this.model2.setFilter({\n                \"isExtend\":true,\n                \"simpleVOs\":simpleVOs\n            })\n        }else if(Object.prototype.toString.call(value) === \"[object Object]\"){\n            let  newObj = {};\n            newObj.field = 'mainJobList.org_id';\n            newObj.op = 'eq';\n            newObj.value1 = value.id;\n            simpleVOs.push(newObj);\n            this.model2.setFilter({\n                \"isExtend\":true,\n                \"simpleVOs\":simpleVOs\n            })\n        }else{\n            //点叉号清空操作\n            this.model2.setFilter({\n            })\n        }\n        \n       \n    }\n    render () {\n       \n        return (\n            <div  className='demo'>\n                <label>组织树</label> \n                <MdfRefer \n                    modelName={'refer'} model={this.model}   config={this.config} \n                /> \n               <label>人员表格</label> \n               <MdfRefer \n                    modelName={'refer'} model={this.model2} \n                /> \n              \n            </div>\n         )\n    }\n}\n\n","desc":" 参照的级联功能"},{"example":<Demo4 />,"title":" mdf-refer基础使用4","code":"/**\n *\n * @title mdf-refer基础使用4\n * @description mdf-refer 参照的级联场景 +bee-form\n *\n */\nimport React, { Component } from 'react';\nimport ReactDOM from 'react-dom';\nimport MdfRefer,{cb} from '@yonyou/mdf-refer'\nimport {Form,Button} from 'tinper-bee';\nclass Demo4 extends Component {\n    constructor(props){\n        super(props);\n        this.state = {\n            content:{},\n            selectedKeys:[],\n        }\n        this.model = new cb.models.ReferModel({\n            // cRefType:'ucf-org-center.org_assets_tree_ref',\n            cRefType:'ucf-org-center.bd_adminorgtreeviewref',\n            multiple:false,\n            displayname:'name',\n            valueField:'id',\n        });\n        this.model2 = new cb.models.ReferModel({\n            // cRefType:'ucf-staff-center.bd_staff_ref',\n            cRefType:'ucf-staff-center.bd_staff_ref',\n            multiple:false,\n            displayname:'name',\n        });\n        this.config = {\n            modelconfig:{\n                afterValueChange:this.afterValueChange,\n                afterOkClick:this.afterOkClick\n            }\n        }\n    }\n    \n    componentDidMount(){\n    }\n    componentDidUpdate(){\n    }\n    componentWillReceiveProps(nextProps){\n    }\n    afterOkClick = (data) =>{\n        console.log('demo5==afterOkClick===',data)\n    }\n    \n    afterValueChange = (data) =>{\n        console.log('demo5==afterValueChange===',data)\n        let {value} = data;\n        let simpleVOs = [];\n        if(Array.isArray(value)){\n            value.forEach((item)=>{\n                let  newObj = {};\n                newObj.field = 'mainJobList.org_id';\n                newObj.op = 'in';\n                newObj.value1 = item.id;\n                simpleVOs.push(newObj)\n            })\n            this.model2.setFilter({\n                \"isExtend\":true,\n                \"simpleVOs\":simpleVOs\n            })\n        }else if(Object.prototype.toString.call(value) === \"[object Object]\"){\n            let  newObj = {};\n            newObj.field = 'mainJobList.org_id';\n            newObj.op = 'eq';\n            newObj.value1 = value.id;\n            simpleVOs.push(newObj);\n            this.model2.setFilter({\n                \"isExtend\":true,\n                \"simpleVOs\":simpleVOs\n            })\n        }else{\n            //点叉号清空操作\n            this.model2.setFilter({\n            })\n        }\n        \n       \n    }\n    render () {\n        const { getFieldProps, getFieldError } = this.props.form;\n        return (\n            <div  className='demo'>\n          \n               \n                <label>组织树</label> \n                <MdfRefer \n                    modelName={'refer'} model={this.model}   config={this.config} \n                   \n                /> \n                \n               <label>人员表格</label> \n               <MdfRefer \n                    modelName={'refer'} model={this.model2} \n                    {...getFieldProps('person', {\n                        initialValue:'lala',\n                        rules: [{\n                            required:true,\n                            message: '请输入请选择', \n                        }]\n                    })}\n                /> \n               <span className='error' style={{color:'red'}}>\n                    {getFieldError('person')}\n                    </span>\n            </div>\n         )\n    }\n}\n\n\n\n\n","desc":" mdf-refer 参照的级联场景 +bee-form"},{"example":<Demo5 />,"title":" mdf-refer基础使用5","code":"/**\n *\n * @title mdf-refer基础使用5\n * @description 不带有input框的参照，关键 model.setvisible(false) 和model.browse()\n *\n */\nimport React, { Component } from 'react';\nimport MdfRefer,{cb} from '@yonyou/mdf-refer'\nimport {Button} from 'tinper-bee';\nclass Demo5 extends Component {\n    constructor(props){\n        super(props);\n        this.state = {\n           \n        }\n        this.model = new cb.models.ReferModel({\n            cRefType:'ucf-org-center.bd_adminorgtreeviewref',\n        });\n        console.log(this.model,11222)\n        this.model.setVisible(false);\n       \n    }\n        \n    openRefer = () =>{\n        this.model.browse();\n    }\n    \n    render () {\n       \n        return (\n            <div  className='demo'>\n                {/* {cb.utils.initSupport('refer',this.model)} */}\n                <MdfRefer \n                   model={this.model}\n                /> \n                <Button onClick={this.openRefer}> 打开参照</Button>\n                \n            </div>\n         )\n    }\n}\n\n\n","desc":" 不带有input框的参照，关键 model.setvisible(false) 和model.browse()"}]


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
                <code className="hljs javascript">{ code.replace('../../src/index.less',COMPONENT+'/lib/index.css').replace('../../src/index.js',COMPONENT).replace('../../src/index',COMPONENT).replace('../../src',COMPONENT)}</code>
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
