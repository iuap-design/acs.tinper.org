/**
 *
 * @title mdf-refer基础使用2
 * @description <MdfRefer/>初始化参照，并搭配bee-from进行校验
 *
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MdfRefer,{cb} from '../../src'
import {Form,Button} from 'tinper-bee';
class Demo2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            content:{},
            selectedKeys:[],
        }
        this.model = new cb.models.ReferModel({
            cRefType:'ucf-org-center.bd_adminorgtreeviewref',
           
        });
        this.config = {
            modelconfig:{
                afterValueChange:this.afterValueChange,
            }
        }
    }
    
    afterValueChange = (data) =>{
        console.log('demo2的js'+JSON.stringify(data))
    }
    clearFunc = () =>{
        this.props.form.setFieldsValue({'code1':''});
        this.model.setValue(null, true);
    }
    
    render () {
       
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div  className='demo'>
                <MdfRefer 
                    modelName={'refer'} model={this.model} config={this.config}
                    {...getFieldProps('code1', {
                        initialValue:'kalal',
                        rules: [{
                            required:true,
                            message: '请输入请选择', 
                            pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
                        }]
                    })}
                > 
                ></MdfRefer>
                <Button onClick={this.clearFunc}> 清空</Button>
                <Button colors="primary" onClick={
                    ()=>{
                        this.props.form.validateFields((err, values) => {
                        if(err){
                            alert(""+JSON.stringify(err));
                            return false;
                        }
                        alert(""+JSON.stringify(values))
                        });
                    }
                    }>提交</Button>
                    <span className='error'>
                    {getFieldError('code1')}
                    </span>
            </div>
         )
    }
}

export default Form.createForm()(Demo2);
