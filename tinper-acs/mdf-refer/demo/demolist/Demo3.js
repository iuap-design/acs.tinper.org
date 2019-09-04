/**
 *
 * @title mdf-refer基础使用3
 * @description 参照的级联功能
 *
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MdfRefer,{cb} from '../../src'

class Demo3 extends Component {
    constructor(props){
        super(props);
        this.state = {
            content:{},
            selectedKeys:[],
        }
        this.afterOkClick = this.afterOkClick.bind(this);
        this.model = new cb.models.ReferModel({
            // cRefType:'ucf-org-center.org_assets_tree_ref',
            cRefType:'ucf-org-center.bd_adminorgtreeviewref',
            multiple:true,
            displayname:'name',
            valueField:'id',
        });
        this.model2 = new cb.models.ReferModel({
            // cRefType:'ucf-staff-center.bd_staff_ref',
            cRefType:'ucf-staff-center.bd_staff_ref',
            multiple:false,
            displayname:'name',
        });
        this.config={
            modelconfig:{
                afterValueChange:this.afterOkClick
            }
        }
    }
    
    componentDidMount(){
    }
    componentDidUpdate(){
    }
    componentWillReceiveProps(nextProps){
    }
    afterOkClick = (data) =>{
        let {value} = data;
        let simpleVOs = [];
        if(Array.isArray(value)){
            value.forEach((item)=>{
                let  newObj = {};
                newObj.field = 'mainJobList.org_id';
                newObj.op = 'in';
                newObj.value1 = item.id;
                simpleVOs.push(newObj)
            })
            this.model2.setFilter({
                "isExtend":true,
                "simpleVOs":simpleVOs
            })
        }else if(Object.prototype.toString.call(value) === "[object Object]"){
            let  newObj = {};
            newObj.field = 'mainJobList.org_id';
            newObj.op = 'eq';
            newObj.value1 = value.id;
            simpleVOs.push(newObj);
            this.model2.setFilter({
                "isExtend":true,
                "simpleVOs":simpleVOs
            })
        }else{
            //点叉号清空操作
            this.model2.setFilter({
            })
        }
        
       
    }
    render () {
       
        return (
            <div  className='demo'>
                <label>组织树</label> 
                <MdfRefer 
                    modelName={'refer'} model={this.model}   config={this.config} 
                /> 
               <label>人员表格</label> 
               <MdfRefer 
                    modelName={'refer'} model={this.model2} 
                /> 
              
            </div>
         )
    }
}

export default Demo3;