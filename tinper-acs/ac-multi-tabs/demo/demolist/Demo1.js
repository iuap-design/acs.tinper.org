/**
 *
 * @title 多页签组件
 * @description 基于应用平台
 *
 */

import React, { Component } from 'react';
import {Button} from 'tinper-bee';
import AcMultiTabs from '../../src/index';

let index = 1;
class Demo1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            menus: [{
                id: 0,
                router: 'home',
                title: "home"
            },{
                id: 1,
                router: '/detail',
                title: "详情页"
            }],
            activeKey: 1
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

    /**
     * 点击页签和删除页签时触发
     * @param newMenus 新的页签数组
     * @param target 操作的节点信息
     */
    handleChange = (newMenus, target) => {
        console.log('新的页签数组： ', newMenus)
        console.log('操作的节点信息： ', target)
        this.setState({
            menus : newMenus
        })
    }
    
    render () {
        const { activeKey, menus } = this.state;
        return (
            <div className="demoPadding">
                <Button colors="primary" onClick={this.add} style={{margin: '8px'}}>增加</Button>
                <AcMultiTabs activeKey={activeKey} menus={menus} onChange={this.handleChange}/>
            </div>
        )
    }
}

export default Demo1;
