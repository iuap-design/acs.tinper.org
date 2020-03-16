/**
*
* @title 这是标题
* @description 这是描述
*
*/
import React, { Component } from 'react';
import FileList from '../../src';

class Demo1 extends Component {
    render () {
        return (
                <div>
                    <FileList id="5d9d738eede08100180575d5" uploadProps={{
                        accept:"image/*"
                    }}
                    callback={(a,b,c)=>{console.log(a,b,c)}}
                    />
                </div>
            )   
    }
}
export default Demo1