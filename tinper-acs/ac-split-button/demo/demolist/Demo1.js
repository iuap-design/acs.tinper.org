/**
*
* @title 基本示例不同大小
* @description 不同大小的按钮
*
*/
import React, { Component } from 'react';
import SplitButton from '../../src';
import Button from 'bee-button';
import Menu from 'bee-menus';
const { Item } = Menu;

class Demo1 extends Component {
    render () {
        const menuList= (
            <Menu >
              <Item key="1">借款合同</Item>
              <Item key="2">抵/质押合同</Item>
              <Item key="3">担保合同</Item>
              <Item key="4">联保合同</Item>
              <Item key="5">合同审批</Item>
              <Item key="6">抵/质押合同跟踪</Item>
            </Menu>
        );
        return (
            <div>
                    <SplitButton menuList={menuList} onClick={()=>{console.log('click')}}>按钮</SplitButton>
                    <SplitButton menuList={menuList} colors='primary'>primary按钮</SplitButton>
                    <SplitButton menuList={menuList} colors='success'>success按钮</SplitButton>
                    <SplitButton menuList={menuList} colors='info'>info按钮</SplitButton>
                    <SplitButton menuList={menuList} colors='warning'>warning按钮</SplitButton>
                    <SplitButton menuList={menuList} colors='danger'>danger按钮</SplitButton>
                    <SplitButton menuList={menuList} colors='dark'>dark按钮</SplitButton>
            </div>
        )
    }
}
export default Demo1