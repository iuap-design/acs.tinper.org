/**
 *
 * @title 基础表格展示
 * @description 基础表格展示
 *
 */

import React, { Component } from 'react';

// 引入 AcHandTable 组件

// demo 工程中引入方式
import AcHandTable from '../../src/index';
import '../../src/index.less';

// 项目中引入方式
// import AcHandTable from 'ac-hand-table';
// import 'ac-hand-table/dist/index.css';

const data = [
  {
    id: 1,
    name: {
      firstName: '张',
      lastName: '小贝',
    },
    price: 19,
    number: 10,
    total: 190,
    date: '2018-07-02',
    time: '09:20:30',
  },
  {
    id: 2,
    name: {
      firstName: '李',
      lastName: '小贝',
    },
    price: 19,
    number: 10,
    total: 190,
    date: '2018-07-02',
    time: '09:20:30',
  },
  {
    id: 3,
    name: {
      firstName: '王小维小维小维小维小维小维小维小维小维小维小维小维小维',
      lastName: '小维',
    },
    price: 19,
    number: 10,
    total: 190,
    date: '2018-07-02',
    time: '09:20:30',
  },
  {
    id: 4,
    name: {
      firstName: '孙',
      lastName: '大熊',
    },
    price: 19,
    number: 10,
    total: 190,
    date: '2018-07-02 09:20:30',
    time: '09:20:30',
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
    {
      data: 'name.firstName',
      textTooltip: true,
    }, // 对象文本类型
    {
      data: 'name.lastName',
      className: 'htMiddle htCenter', // 样式名
    },
    {
      data: 'price',
      type: 'numeric', // 数字类型

    },
    {
      data: 'number',
      type: 'numeric', // 数字类型
    },
    {
      data: 'total',
      type: 'numeric', // 数字类型
      customValue: (rowData) => { // 自定义列显示值
        const { price = 0, number = 0 } = rowData;
        return price * number;
      },
    },
    {
      data: 'date',
      type: 'date', // 日期类型
      dateFormat: 'YYYY-MM-DD', // 日期格式
      correctFormat: true, //  当前值是否格式化
      defaultDate: '1900-01-01', // 默认值
      allowInvalid: true, // 不容许日期为空
    },
    {
      data: 'time',
      type: 'time', // 日期类型
      timeFormat: 'hh:mm:ss',
      // defaultData: 00:00:00', // 默认值
      correctFormat: true,
      validator: (value, callback) => {
        callback(true);
      },
    },
  ];

  onChange = (time, timeString) => {
    console.log(time, timeString);
  };

  render() {
    const { handData } = this.state;

    return (
      <div>

          <AcHandTable
            id="example" // 组件id
            onRef={ref => this.child = ref} // 设置ref属性 调用子组件方法
            colHeaders={['姓', '名', '单价', '数量', '合计', '日期', '时间']} // 表格表头
            data={handData} // 表体数据
            columns={this.columns} // 列属性设置
            colWidths={100}
            manualRowMove // 行移动
            fillHandle={{
              autoInsertRow: false,
              direction: 'vertical',
            }}
            fixedColumnsLeft={2}  // 表格左侧固定
            fixedShadow // 是否启用固定样式
            width="100%"
            height="130px"

          />

      </div>

    );
  }
}

export default Demo;
