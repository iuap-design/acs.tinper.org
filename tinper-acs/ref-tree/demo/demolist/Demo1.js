/**
 *
 * @title 只有RefTreeBaseUI
 * @description 树组件，只有RefTreeBaseUI，没有input框
 *
 */

import React, { Component } from 'react';
import RefTreeBaseUI from '../../src/index';
import  '../../src/index.less';
import { Button } from 'tinper-bee';
const option = {
    title: '树',
    searchable: true,
    multiple: true,
    checkStrictly: true,
    disabled: false,
    nodeDisplay: (record) => {
        return `${record.refname}-标签`
    },
    valueField: 'refpk',//真实 value 的键
    lazyModal: false,
    strictMode: false,
    lang: 'zh_CN',
    lazyModal:true,
    value: JSON.stringify({
        code: "bj",
        id: "5305416e-e7b4-4051-90bd-12d12942295b",
        name: "北京总部-简",
        refcode: "bj",
        refname: "北京总部-简",
        refpk: "5305416e-e7b4-4051-90bd-12d12942295b",
    }),
    treeData:[{"code":"org1","children":[{"code":"bj","entityType":"mainEntity","name":"北京总部-简","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"bj","refpk":"5305416e-e7b4-4051-90bd-12d12942295b","id":"5305416e-e7b4-4051-90bd-12d12942295b","isLeaf":"true","refname":"北京总部-简"},
    {"code":"xd","entityType":"mainEntity","name":"新道-简","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"xd","refpk":"b691afff-ea83-4a3f-affa-beb2be9cba52","id":"b691afff-ea83-4a3f-affa-beb2be9cba52","isLeaf":"true","refname":"新道-简"},
    {"code":"yy3","entityType":"mainEntity","name":"test3","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"yy3","refpk":"e75694d9-7c00-4e9e-9573-d29465ae79a9","id":"e75694d9-7c00-4e9e-9573-d29465ae79a9","isLeaf":"true","refname":"test3"},{"code":"yy1","entityType":"mainEntity","name":"test1","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"yy1","refpk":"fd32ceeb-57a8-4f44-816e-fa660f5715ab","id":"fd32ceeb-57a8-4f44-816e-fa660f5715ab","isLeaf":"true","refname":"test1"},{"code":"dept2","children":[{"code":"cs","entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"测试部-简","pid":"0ebbb6d8-250a-4d1d-a019-7ae951629a2c","refcode":"cs","refpk":"cc43a66a-438d-4106-937f-bec44406f771","id":"cc43a66a-438d-4106-937f-bec44406f771","isLeaf":"true","refname":"测试部-简"},{"code":"qd","entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"前端部-简","pid":"0ebbb6d8-250a-4d1d-a019-7ae951629a2c","refcode":"qd","refpk":"73a10edd-aae8-4f31-af25-1f48f0a3b344","id":"73a10edd-aae8-4f31-af25-1f48f0a3b344","isLeaf":"true","refname":"前端部-简"}],"entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"生产处","refcode":"dept2","refpk":"0ebbb6d8-250a-4d1d-a019-7ae951629a2c","id":"0ebbb6d8-250a-4d1d-a019-7ae951629a2c","refname":"生产处"},{"code":"dept1","children":[{"code":"dept1_2","entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"财务二科","pid":"95b60f35-ed0b-454e-b948-fb45ae30b911","refcode":"dept1_2","refpk":"55b7fff1-6579-4ca9-92b7-3271d288b9f3","id":"55b7fff1-6579-4ca9-92b7-3271d288b9f3","isLeaf":"true","refname":"财务二科"},{"code":"dept1_1","entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"财务一科","pid":"95b60f35-ed0b-454e-b948-fb45ae30b911","refcode":"dept1_1","refpk":"9711d912-3184-4063-90c5-1facc727813c","id":"9711d912-3184-4063-90c5-1facc727813c","isLeaf":"true","refname":"财务一科"}],"entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"财务处","refcode":"dept1","refpk":"95b60f35-ed0b-454e-b948-fb45ae30b911","id":"95b60f35-ed0b-454e-b948-fb45ae30b911","refname":"财务处"}],"entityType":"mainEntity","name":"用友集团","refcode":"org1","refpk":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refname":"用友集团"}]
};
class Demo1 extends Component {
    constructor() {
        super();
        this.state = {
            showModal:false,//如果不配合withinput使用必须手动控制showModal，和onSave函数
            checkedArray:[],
            // checkedArray:[{"code":"xd","entityType":"mainEntity","name":"新道-简","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"xd","refpk":"b691afff-ea83-4a3f-affa-beb2be9cba52","id":"b691afff-ea83-4a3f-affa-beb2be9cba52","isLeaf":"true","refname":"新道-简"},{"code":"yy3","entityType":"mainEntity","name":"test3","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"yy3","refpk":"e75694d9-7c00-4e9e-9573-d29465ae79a9","id":"e75694d9-7c00-4e9e-9573-d29465ae79a9","isLeaf":"true","refname":"test3"}],
            // value:'{"refname":"xinda","refpk":"1222"}'
        }
    }
    onSave= (result) =>{
        this.setState({
            showModal:false,
            checkedArray:result
        })
    }
    onCancel = () =>{
        
        this.setState({showModal:false});
    }
    onLoadData = (treeNode) =>{
        console.log('11',treeNode,treeNode.props.eventKey,treeNode.props.attr)
        return new Promise((resolve) => {
			this.getRefTreeloadData(treeNode.props.eventKey,treeNode.props.attr)
			resolve();
		});
    }
    render() {
        let {showModal,checkedArray,value} = this.state;
        let childrenOptions = Object.assign({},option,{
            showModal,
            // checkedArray,
            // value,
            onSave:this.onSave,
            onCancel:this.onCancel,
            matchData:checkedArray,
            onLoadData:this.onLoadData
        })
        return (
            <div className="demoPadding">
                 <RefTreeBaseUI {...childrenOptions} />
                 <Button onClick={()=>{this.setState({showModal:true})}}>打开参照</Button>
            </div>
        )
    }
};

export default Demo1;
