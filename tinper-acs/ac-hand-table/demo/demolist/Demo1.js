/* eslint-disable no-return-assign */
/**
 *
 * @title 基础表格展示
 * @description 基础表格展示
 *
 */

import React, { Component } from 'react';

// 引入 AcHandTable 组件
import AcHandTable from '../../src/index';
import '../../src/index.less';

const data = [
  {
    id: 1,
    name: {
      firstName: '张',
      lastName: '小贝',
    },
    level: 19,
    date: '2018-07-02',
  },
  {
    id: 2,
    name: {
      firstName: '李',
      lastName: '小贝',
    },
    level: 10,
    date: '2018-07-02',
  },
  {
    id: 3,
    name: {
      firstName: '王',
      lastName: '小维',
    },
    level: 20,
    date: '2018-07-02',
  },
  {
    id: 4,
    name: {
      firstName: '孙',
      lastName: '大熊',
    },
    level: 20,
    date: '2018-07-02',
  },
];


class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      handData: data,
    };
  }


  columns = [
    { data: 'name.firstName' }, // 对象文本类型
    { data: 'name.lastName' },
    {
      data: 'level',
      type: 'numeric', // 数字类型
    },
    {
      data: 'date',
      type: 'date', // 日期类型
    },
  ];


  render() {
    const { handData } = this.state;
    return (
      <div>
        <AcHandTable
          id="example" // 组件id
          onRef={ref => this.child = ref} // 设置ref属性 调用子组件方法
          colHeaders={['姓', '名', '等级', '日期']} // 表格表头
          data={handData} // 表体数据
          columns={this.columns} // 列属性设置
          manualRowMove={true} // 行移动
        />

      </div>

    );
  }
}

export default Demo;
