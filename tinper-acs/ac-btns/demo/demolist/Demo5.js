/**
 *
 * @title 多语示例
 * @description 多语示例
 *
 */
import React, { Component } from 'react';
import Btns from '../../src';
import en_US from '../../src/locale/en_US';


let btns = {
    add: {
        onClick: () => {
            console.log('add')
        }
    },
    confirm: {
        onClick: () => {
            console.log('confirm')
        }
    },
    
    
}
class Demo1 extends Component {

    render() {
        return (
            <div>
                <Btns btns = {btns} locale={en_US}/>
            </div>
            
        )
        
    }
}
export default Demo1