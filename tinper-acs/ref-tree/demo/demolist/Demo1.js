/**
 *
 * @title 基础示例1
 * @description RefTreeBaseUI
 *
 */

import React, { Component } from 'react';
import RefTreeBaseUI from '../../src/index';
import '../../src/index.less'
import { Button } from 'tinper-bee';
import request from './request';

class Demo1 extends Component {
    constructor() {
        super();
        this.state = {
            showModal:false,//如果不配合withinput使用必须手动控制showModal，和onSave函数
            treeData:[],
        }
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
            // url: 'http://mock-platform-prod.online.app.yyuap.com/mock/1264/pap_basedoc/common-ref/blobRefTree',
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
     * @msg: modal弹框确定按钮
     * @param {type} 
     * @return: 
     */
    onSave= (result) =>{
        this.setState({
            showModal:false,
            matchData:result,//保存选中的数据
        })
    }
    /**
     * @msg: modal弹框右上角X和取消按钮
     * @param {type} 
     * @return: 
     */
    onCancel = () =>{
        this.setState({showModal:false});
    }
    
    render() {
        let {showModal,matchData,treeData} = this.state;
        let childrenOptions = Object.assign({},{
            treeData,
            showModal,
            onSave:this.onSave,
            onCancel:this.onCancel,
            matchData,
            onLoadData:this.onLoadData
        })
        return (
            <div className="demoPadding">
                 <RefTreeBaseUI {...childrenOptions} />
                 <Button colors="primary" onClick={()=>{this.setState({showModal:true},()=>{
                     this.loadData()
                 })}}>打开参照</Button>
            </div>
        )
    }
};

export default Demo1;
