/**
 *
 * @title 树表/卡
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

class Demo2 extends Component {
    render() {
        return (
            <div className="demo2">
                <Pagelayout>
                    <Header>
                        我是Header区域
                    </Header>
                    <Content>
                        <LeftContent>
                            我是树区域
                        </LeftContent>
                        <RightContent>
                            <SearchArea>
                                我是查询区域
                            </SearchArea>
                            <TableContent>
                                我是表格区域
                            </TableContent>
                        </RightContent>
                    </Content>
                </Pagelayout>
            </div>
        )
    }
}
export default Demo2