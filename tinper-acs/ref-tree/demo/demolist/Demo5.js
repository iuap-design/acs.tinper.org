/*
 * @Date: 2019-08-15 20:19:45
 * @LastEditTime: 2019-08-15 20:25:11
 */
/**
 *
 * @title 基础示例5
 * @description 添加自定义footerBtnDom
 *
 */

import React, { Component } from 'react';
import {RefTreeWithInput} from'../../src/index.js';
import '../../src/index.less'
import { Button, Form, Checkbox } from 'tinper-bee';

import request from './request';
class Demo2 extends Component {
    constructor() {
        super();
        this.state = {
            treeData:[],
            matchData:[{name:'用友集团',refname:'用友集团',code:'001'}],
            value:JSON.stringify({
                refname: "用友集团",
                refpk: "001",  //value中指定的refpk要等于valueField对应的字段
            })
        }
    }
    componentDidMount(){
    }
    /**
     * @msg: 打开input右侧menu icon触发的操作
     * @param {type} 
     * @return: 
     */
    canClickGoOn = () =>{
        this.loadData();
        return true;//必须要有
    }
    /**
     * @msg: 请求mock数据
     */
    loadData = async () => {
        this.setState({
          loading:true,
        })
        let ajax={
            // url: 'http://mock-platform-prod.online.app.yyuap.com/mock/1264/pap_basedoc/common-ref/blobRefTree',
            url: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTree',
        };
        let results = await request(ajax);
        let treeData = [];
        if (!results || !results.data.length){
          this.setState({ 
            loading:false,
            pageCount:-1,//不展示分页
            totalElements:0,
            treeData,
          });
          return false;
        }
        treeData = results.data;
        let page = results.page;
        this.setState({ 
          treeData,
           ...page,
           loading:false 
        });
        
    }
    
    /**
     * @msg: 保存操作的回调
     * @param {type} 
     * @return: 
     */
    onSave = (result) =>{
        this.setState({
            matchData:result,
        })
    }

    /**
     * checkbox的change
     */
    checkboxChange = value =>{
        alert(value)
    }
    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        const {treeData,matchData,value} = this.state;
        return (
            <div className="demoPadding">
                <RefTreeWithInput
                    emptyBut={false}
                    nodeDisplay={ (record) => {
                        return record.refname
                    }}
                    displayField={ (record) => {
                        return record.name
                    }}  //显示内容的键
                    valueField={ 'code'}    //真实 value 的键
                    filterUrl={'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTree'}
                    searchValue={'org1'}
                    multiple={true}
                    onSave={this.onSave}
                    matchData={matchData}
                    treeData={treeData}
                    canClickGoOn={this.canClickGoOn}
                    treeNodeDisabledKey={'nodeDisabled'}
                    treeProps={{mustExpandable:true}}
                    selectorDisplay={'{refname}-{code}'}
                    {...getFieldProps('code1', {
                        initialValue: value,
                        rules: [{
                            message: '请输入请选择', pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
                        }]
                    })}
                    dropdownDisabled
                    emptyBut
                    modalProps={{size:'md'}}
                    footerBtnDom={
                    <div className="customed-footer">
                        <Checkbox colors="primary" onChange={this.checkboxChange}>停用</Checkbox>
                        <Checkbox colors="primary" onChange={this.checkboxChange}>包含下级</Checkbox>
                    </div>}
                >
                </RefTreeWithInput>
                <Button  
                    colors="primary"
                    onClick={() => {
                    this.props.form.validateFields((err, values) => {
                        // console.log(err, values)
                        alert(JSON.stringify(values));
                    });
                }}>提交</Button>
                <span className='error' >
                    {getFieldError('code1')}
                </span>
            </div>
        )
    }
};

export default Form.createForm()(Demo2);
