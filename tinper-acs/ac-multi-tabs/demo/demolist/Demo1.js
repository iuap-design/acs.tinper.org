/**
 *
 * @title 多页签组件
 * @description 基于应用平台
 *
 */

import React, { Component } from 'react';
import {Button} from 'tinper-bee';
import AcMultiTabs from '../../src/index';

let index = 0;
class Demo1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            menus: [{
                id: 0,
                router: 'home',
                title: "home"
            }]
        }
    }

    // 增加
    add = (e) => {
        e.stopPropagation();
        ++index;
        const newTab = {
            id: index++ ,
            title: `节点: ${index}`,
            router: `/节点: ${index}`,
        };
        this.setState({
            menus: this.state.menus.concat(newTab),
        });
    }

    handleChange = (v) => {
        console.log(v)
        this.setState({
            menus : v
        })
    }
    
    render () {
        const { menus } = this.state;
        return (
            <div className="demoPadding">
                <Button colors="primary" onClick={this.add} style={{margin: '8px'}}>增加</Button>
                <AcMultiTabs menus={menus} onChange={this.handleChange}/>
            </div>
        )
    }
}

export default Demo1;
