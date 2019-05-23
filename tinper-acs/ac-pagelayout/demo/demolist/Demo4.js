/**
 *
 * @title 主子表(左右)
 * @description 
 *
 */
import React, { Component } from 'react';
import Pagelayout from '../../src';

const Header = Pagelayout.Header;
const SearchArea = Pagelayout.SearchArea;
const Content = Pagelayout.Content;
const TableContent = Pagelayout.TableContent;
const LeftContent = Pagelayout.LeftContent;
const RightContent = Pagelayout.RightContent;

class Demo4 extends Component {
    render() {
        return (
            <div className="demo4">
                <Pagelayout>
                    <Header>
                        我是Header区域
                    </Header>
                    <SearchArea>
                        我是查询区域
                    </SearchArea>
                    <Content>
                        <LeftContent md={6}>
                            <TableContent>
                                我是表格区域主表
                            </TableContent>
                        </LeftContent>
                        <RightContent md={6}>
                            <TableContent>
                                我是表格区域子表
                            </TableContent>
                        </RightContent>
                    </Content>
                </Pagelayout>
            </div>
        )
    }
}
export default Demo4