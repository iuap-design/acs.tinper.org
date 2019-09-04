/**
 *
 * @title mdf-refer基础使用5
 * @description 不带有input框的参照，关键 model.setvisible(false) 和model.browse()
 *
 */
import React, { Component } from 'react';
import MdfRefer,{cb} from '../../src'
import {Button} from 'tinper-bee';
class Demo5 extends Component {
    constructor(props){
        super(props);
        this.state = {
           
        }
        this.model = new cb.models.ReferModel({
            cRefType:'ucf-org-center.bd_adminorgtreeviewref',
        });
        this.model.setVisible(false);
       
    }
        
    openRefer = () =>{
        this.model.browse();
    }
    
    render () {
       
        return (
            <div  className='demo'>
                {/* {cb.utils.initSupport('refer',this.model)} */}
                <MdfRefer 
                   model={this.model}
                /> 
                <Button onClick={this.openRefer}> 打开参照</Button>
                
            </div>
         )
    }
}

export default Demo5;
