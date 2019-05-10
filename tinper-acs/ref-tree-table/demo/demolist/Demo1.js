/**
 *
 * @title 基础示例1
 * @description 使用RefTreeTableBaseUI，无input框
 *
 */

import React, { Component } from 'react';
import RefTreeTableBaseUI from '../../src/index';
import  '../../src/index.less';
import {Form,Button} from 'tinper-bee';

class Demo1 extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            condition:'',
            showModal:false,
        }
        this.columnsData = [{"key":"code","dataIndex":"code","title":"组织编码"},{"key":"name","dataIndex":"name","title":"组织名称"}];
        this.tableData = [{"rownum_":1,"code":"001","name":"人员1","mobile":"15011430230","refcode":"001","refpk":"cc791b77-bd18-49ab-b3ec-ee83cd40012a","id":"cc791b77-bd18-49ab-b3ec-ee83cd40012a","refname":"人员1","email":"11@11.com","key":"cc791b77-bd18-49ab-b3ec-ee83cd40012a"},{"rownum_":2,"code":"002","name":"人员2","mobile":"15011323234","refcode":"002","refpk":"de2d4d09-51ec-4108-8def-d6a6c5393c3b","id":"de2d4d09-51ec-4108-8def-d6a6c5393c3b","refname":"人员2","email":"22@11.com","key":"de2d4d09-51ec-4108-8def-d6a6c5393c3b"},{"rownum_":3,"code":"003","name":"人员3","mobile":"15011430232","refcode":"003","refpk":"004989bb-a705-45ce-88f3-662f87ee6e52","id":"004989bb-a705-45ce-88f3-662f87ee6e52","refname":"人员3","email":"33@33.com","key":"004989bb-a705-45ce-88f3-662f87ee6e52"},{"rownum_":4,"code":"004","name":"人员4","mobile":"15011430234","refcode":"004","refpk":"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd","id":"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd","refname":"人员4","email":"33@34.com","key":"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd"},{"rownum_":5,"code":"005","name":"人员5","mobile":"15011430235","refcode":"005","refpk":"5e3a85ec-5e14-4734-8b3a-1e6168426c89","id":"5e3a85ec-5e14-4734-8b3a-1e6168426c89","refname":"人员5","email":"55@26.com","key":"5e3a85ec-5e14-4734-8b3a-1e6168426c89"},{"rownum_":6,"code":"006","name":"人员6","mobile":"15011323232","refcode":"006","refpk":"112621b9-b7ae-41b9-9428-61779334c5d6","id":"112621b9-b7ae-41b9-9428-61779334c5d6","refname":"人员6","email":"66@516.com","key":"112621b9-b7ae-41b9-9428-61779334c5d6"},{"rownum_":7,"code":"007","name":"人员7","mobile":"15011234567","refcode":"007","refpk":"394bba90-ed0f-4794-a44e-fd9ce6e9257d","id":"394bba90-ed0f-4794-a44e-fd9ce6e9257d","refname":"人员7","email":"55@4.com","key":"394bba90-ed0f-4794-a44e-fd9ce6e9257d"},{"rownum_":8,"code":"008","name":"人员8","mobile":"15011327890","refcode":"008","refpk":"a9f4c869-ca0b-4d12-847e-00eca08bfef6","id":"a9f4c869-ca0b-4d12-847e-00eca08bfef6","refname":"人员8","email":"55@556.com","key":"a9f4c869-ca0b-4d12-847e-00eca08bfef6"},{"rownum_":9,"code":"bpm01","name":"张一","mobile":"18777777777","refcode":"bpm01","refpk":"0dc47840-873a-4ed3-8ae7-c2335a76b385","id":"0dc47840-873a-4ed3-8ae7-c2335a76b385","refname":"张一","email":"bpm01@qq.com","key":"0dc47840-873a-4ed3-8ae7-c2335a76b385"},{"rownum_":10,"code":"bpm02","name":"张二","mobile":"18788888888","refcode":"bpm02","refpk":"c97b59e2-9fa3-44d7-93b0-1be52f7aa550","id":"c97b59e2-9fa3-44d7-93b0-1be52f7aa550","refname":"张二","email":"bpm02@qq.com","key":"c97b59e2-9fa3-44d7-93b0-1be52f7aa550"}];
        this.originTableData = [{"rownum_":1,"code":"001","name":"人员1","mobile":"15011430230","refcode":"001","refpk":"cc791b77-bd18-49ab-b3ec-ee83cd40012a","id":"cc791b77-bd18-49ab-b3ec-ee83cd40012a","refname":"人员1","email":"11@11.com","key":"cc791b77-bd18-49ab-b3ec-ee83cd40012a"},{"rownum_":2,"code":"002","name":"人员2","mobile":"15011323234","refcode":"002","refpk":"de2d4d09-51ec-4108-8def-d6a6c5393c3b","id":"de2d4d09-51ec-4108-8def-d6a6c5393c3b","refname":"人员2","email":"22@11.com","key":"de2d4d09-51ec-4108-8def-d6a6c5393c3b"},{"rownum_":3,"code":"003","name":"人员3","mobile":"15011430232","refcode":"003","refpk":"004989bb-a705-45ce-88f3-662f87ee6e52","id":"004989bb-a705-45ce-88f3-662f87ee6e52","refname":"人员3","email":"33@33.com","key":"004989bb-a705-45ce-88f3-662f87ee6e52"},{"rownum_":4,"code":"004","name":"人员4","mobile":"15011430234","refcode":"004","refpk":"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd","id":"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd","refname":"人员4","email":"33@34.com","key":"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd"},{"rownum_":5,"code":"005","name":"人员5","mobile":"15011430235","refcode":"005","refpk":"5e3a85ec-5e14-4734-8b3a-1e6168426c89","id":"5e3a85ec-5e14-4734-8b3a-1e6168426c89","refname":"人员5","email":"55@26.com","key":"5e3a85ec-5e14-4734-8b3a-1e6168426c89"},{"rownum_":6,"code":"006","name":"人员6","mobile":"15011323232","refcode":"006","refpk":"112621b9-b7ae-41b9-9428-61779334c5d6","id":"112621b9-b7ae-41b9-9428-61779334c5d6","refname":"人员6","email":"66@516.com","key":"112621b9-b7ae-41b9-9428-61779334c5d6"},{"rownum_":7,"code":"007","name":"人员7","mobile":"15011234567","refcode":"007","refpk":"394bba90-ed0f-4794-a44e-fd9ce6e9257d","id":"394bba90-ed0f-4794-a44e-fd9ce6e9257d","refname":"人员7","email":"55@4.com","key":"394bba90-ed0f-4794-a44e-fd9ce6e9257d"},{"rownum_":8,"code":"008","name":"人员8","mobile":"15011327890","refcode":"008","refpk":"a9f4c869-ca0b-4d12-847e-00eca08bfef6","id":"a9f4c869-ca0b-4d12-847e-00eca08bfef6","refname":"人员8","email":"55@556.com","key":"a9f4c869-ca0b-4d12-847e-00eca08bfef6"},{"rownum_":9,"code":"bpm01","name":"张一","mobile":"18777777777","refcode":"bpm01","refpk":"0dc47840-873a-4ed3-8ae7-c2335a76b385","id":"0dc47840-873a-4ed3-8ae7-c2335a76b385","refname":"张一","email":"bpm01@qq.com","key":"0dc47840-873a-4ed3-8ae7-c2335a76b385"},{"rownum_":10,"code":"bpm02","name":"张二","mobile":"18788888888","refcode":"bpm02","refpk":"c97b59e2-9fa3-44d7-93b0-1be52f7aa550","id":"c97b59e2-9fa3-44d7-93b0-1be52f7aa550","refname":"张二","email":"bpm02@qq.com","key":"c97b59e2-9fa3-44d7-93b0-1be52f7aa550"}];
        this.page ={
            pageCount : 1,//总页数
            pageSize : '10',//每页数据数
            totalElements:9,
        };

    }
    componentDidMount(){
       
    }
    onTreeChange = (record) =>{
        this.tableData = this.tableData.length==0?this.originTableData:[];
    }
    onTreeSearch = (value) =>{
        alert(value);
    }
    loadTableData=(param)=>{
        console.log('loadTableData',param)
    }
    onTableSearch = (value) =>{
        console.log('onTableSearch',value)
    }
    onSave = (result) =>{
        console.log('save',result)
        this.setState({
            showModal:false,
            matchData:result,
        })
    }
    onCancel = ()=>{
        this.setState({showModal:false})

    }
    render() {
        let treeData = [{"code":"org1","children":[{"code":"bj","entityType":"mainEntity","name":"北京总部-简","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"bj","refpk":"5305416e-e7b4-4051-90bd-12d12942295b","id":"5305416e-e7b4-4051-90bd-12d12942295b","isLeaf":"true","refname":"北京总部-简"},{"code":"xd","entityType":"mainEntity","name":"新道-简","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"xd","refpk":"b691afff-ea83-4a3f-affa-beb2be9cba52","id":"b691afff-ea83-4a3f-affa-beb2be9cba52","isLeaf":"true","refname":"新道-简"},{"code":"yy3","entityType":"mainEntity","name":"test3","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"yy3","refpk":"e75694d9-7c00-4e9e-9573-d29465ae79a9","id":"e75694d9-7c00-4e9e-9573-d29465ae79a9","isLeaf":"true","refname":"test3"},{"code":"yy1","entityType":"mainEntity","name":"test1","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"yy1","refpk":"fd32ceeb-57a8-4f44-816e-fa660f5715ab","id":"fd32ceeb-57a8-4f44-816e-fa660f5715ab","isLeaf":"true","refname":"test1"},{"code":"dept2","children":[{"code":"cs","entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"测试部-简","pid":"0ebbb6d8-250a-4d1d-a019-7ae951629a2c","refcode":"cs","refpk":"cc43a66a-438d-4106-937f-bec44406f771","id":"cc43a66a-438d-4106-937f-bec44406f771","isLeaf":"true","refname":"测试部-简"},{"code":"qd","entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"前端部-简","pid":"0ebbb6d8-250a-4d1d-a019-7ae951629a2c","refcode":"qd","refpk":"73a10edd-aae8-4f31-af25-1f48f0a3b344","id":"73a10edd-aae8-4f31-af25-1f48f0a3b344","isLeaf":"true","refname":"前端部-简"}],"entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"生产处","refcode":"dept2","refpk":"0ebbb6d8-250a-4d1d-a019-7ae951629a2c","id":"0ebbb6d8-250a-4d1d-a019-7ae951629a2c","refname":"生产处"},{"code":"dept1","children":[{"code":"dept1_2","entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"财务二科","pid":"95b60f35-ed0b-454e-b948-fb45ae30b911","refcode":"dept1_2","refpk":"55b7fff1-6579-4ca9-92b7-3271d288b9f3","id":"55b7fff1-6579-4ca9-92b7-3271d288b9f3","isLeaf":"true","refname":"财务二科"},{"code":"dept1_1","entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"财务一科","pid":"95b60f35-ed0b-454e-b948-fb45ae30b911","refcode":"dept1_1","refpk":"9711d912-3184-4063-90c5-1facc727813c","id":"9711d912-3184-4063-90c5-1facc727813c","isLeaf":"true","refname":"财务一科"}],"entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"财务处","refcode":"dept1","refpk":"95b60f35-ed0b-454e-b948-fb45ae30b911","id":"95b60f35-ed0b-454e-b948-fb45ae30b911","refname":"财务处"}],"entityType":"mainEntity","name":"用友集团","refcode":"org1","refpk":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refname":"用友集团"}]
        return (
            <div>
                <div className="demo-label">
                    <span >组织人员：</span>
                    <RefTreeTableBaseUI
                        title='组织部门人员'
                        textOption={{
                            menuTitle: '组织',
                            tableTitle: '人员',
                        }}
                        multiple={true}
                        displayField='{refname}'
                        valueField='refpk'
                        lang='zh_CN'
                        showLoding={false}
                        treeData={treeData} 
                        showLoading={false} 
                        onTreeChange={this.onTreeChange} 
                        onTreeSearch={this.onTreeSearch}
                        columnsData={this.columnsData}
                        tableData={this.tableData}
                        page={this.page}
                        loadTableData={this.loadTableData}
                        onTableSearch={this.onTableSearch}
                        showModal={this.state.showModal}
                        onSave={this.onSave}
                        onCancel={this.onCancel}
                        matchData={this.state.matchData}
                    />
                    <Button onClick={()=>{this.setState({showModal:true})}}>打开弹框</Button>
                </div>
            </div>
        )
    }
};

export default Form.createForm()(Demo1);


