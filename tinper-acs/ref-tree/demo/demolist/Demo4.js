/**
 *
 * @title 基础示例4
 * @description 清空功能：不使用form表单
 *
 */

import React, { Component } from 'react';
import {RefTreeWithInput} from'../../src/index.js';
import '../../src/index.less'
import { Button, Form } from 'tinper-bee';

import request from './request';
class Demo4 extends Component {
    constructor() {
        super();
        this.state = {
            value:'{"refname":"用友集团","refpk":"001"}',
            treeData:[],
            matchData:[{name:'用友集团',refname:'用友集团',code:'001'}],
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
        console.log(result)
        this.setState({
            matchData:result,
        })
    }
    /**
     * @msg: 清空操作
     * @param {type} 此时value不可以直接传'',因为''下只能清除一次，第二次清除时前后value都是''，不会触发更新操作，
     * 因此通过refpk不一致来触发更新操作
     * @return: 
     */
    clearFunc = () =>{
        this.setState({
            matchData:[],
            value:`{"refname":"","refpk":"${Math.random()}"}`,
        })
    }
    render() {
        const {treeData,matchData,value} = this.state;
        return (
            <div className="demoPadding">
                <RefTreeWithInput
                    emptyBut={true}
                    nodeDisplay={ (record) => {
                        return record.refname
                    }}
                    displayField={ (record) => {
                        return record.code
                    }}  //显示内容的键
                    valueField={ 'code'}    //真实 value 的键
                    multiple={true}
                    onSave={this.onSave}
                    matchData={matchData}
                    treeData={treeData}
                    canClickGoOn={this.canClickGoOn}
                    value={value}
                >
                </RefTreeWithInput>
                <Button  
                    colors="primary"
                    onClick={this.clearFunc}>清空</Button>
               
            </div>
        )
    }
};

export default Demo4
