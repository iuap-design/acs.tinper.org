/**
 *
 * @title mdf-refer基础使用4
 * @description mdf-refer 参照的级联场景 +bee-form
 *
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MdfRefer,{cb} from '../../src'
import {Form,Button} from 'tinper-bee';
class Demo4 extends Component {
    constructor(props){
        super(props);
        this.state = {
            content:{},
            selectedKeys:[],
        }
        this.model = new cb.models.ReferModel({
            // cRefType:'ucf-org-center.org_assets_tree_ref',
            cRefType:'ucf-org-center.bd_adminorgtreeviewref',
            multiple:false,
            displayname:'name',
            valueField:'id',
        });
        this.model2 = new cb.models.ReferModel({
            // cRefType:'ucf-staff-center.bd_staff_ref',
            cRefType:'ucf-staff-center.bd_staff_ref',
            multiple:false,
            displayname:'name',
        });
        this.config = {
            modelconfig:{
                afterValueChange:this.afterValueChange,
                afterOkClick:this.afterOkClick
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
        console.log('demo5==afterOkClick===',data)
    }
    
    afterValueChange = (data) =>{
        console.log('demo5==afterValueChange===',data)
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
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div  className='demo'>
          
               
                <label>组织树</label> 
                <MdfRefer 
                    modelName={'refer'} model={this.model}   config={this.config} 
                   
                /> 
                
               <label>人员表格</label> 
               <MdfRefer 
                    modelName={'refer'} model={this.model2} 
                    {...getFieldProps('person', {
                        initialValue:'lala',
                        rules: [{
                            required:true,
                            message: '请输入请选择', 
                        }]
                    })}
                /> 
               <span className='error' style={{color:'red'}}>
                    {getFieldError('person')}
                    </span>
            </div>
         )
    }
}


export default Form.createForm()(Demo4);

