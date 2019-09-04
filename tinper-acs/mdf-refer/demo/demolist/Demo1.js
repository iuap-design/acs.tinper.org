/**
 *
 * @title mdf-refer基础使用1
 * @description cb.utils.initSupport 初始化参照
 *
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MdfRefer,{cb} from '../../src'

class Demo1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            content:{},
            selectedKeys:[],
        }
        this.afterOkClick = this.afterOkClick.bind(this);
        this.model = new cb.models.ReferModel({
            cRefType:'ucf-org-center.bd_adminorgtreeviewref',
            multiple:true,
            displayname:'name',
            valueField:'id',
        });
        this.model2 = new cb.models.ReferModel({
            cRefType:'ucf-staff-center.bd_staff_ref',
            text:'冯青平',
            multiple:false,
            displayname:'name',
        });
        this.model3 = new cb.models.ReferModel({
            cRefType:'productcenter.pc_nomalproductref',
            multiple:true,
        });

        this.config = {};
        this.config.modelconfig ={
            afterOkClick:this.afterOkClick
        }
    }
   
    afterOkClick = (data) =>{
        console.log('demo2的afterOkClick',JSON.stringify(data));
    }
    render () {
       

        return (
            <div  className='demo'>
                <label>参照-组织树</label> 
                {cb.utils.initSupport('refer',this.model,this.config)}
               <label>参照-人员表</label> 
                {cb.utils.initSupport('refer',this.model2,this.config)}
                 <label>参照-物料树表</label> 
                {cb.utils.initSupport('refer',this.model3)}
            </div>
         )
    }
}

export default Demo1;
// ReactDOM.render(<Demo/>, document.getElementById('root'));
