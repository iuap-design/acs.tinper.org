/**
 *
 * @title 多表头合并单元
 * @description 多表头拖拽、合并单元格，设置单元格样式
 *
 */

import React, { Component } from 'react';

import { Button } from 'tinper-bee';

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
    desc: '合并备注',
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
    desc: '合并备注',
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
    desc: '合并备注',
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
    desc: '合并备注',
  },
];


class Demo6 extends Component {
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
    {
      data: 'desc',
    },
  ];


  // 表格添加行
  onInsertRowData = () => {
    this.child.onInsertRowData(); // 默认从第一行添加
  };

  // 删除多选选中的行
  onDelRowCheck = () => {
    this.child.onDelRowCheck();
  };

  // 获取被格式化的数据
  getFormatData = () => {
    const formatData = this.child.getFormatData();
    console.log('formatData', formatData);
  };

  render() {
    const { handData } = this.state;

    return (
      <div className="demoPadding">

        <div style={{ marginBottom: '15px' }}>
          <Button colors="primary" onClick={this.onInsertRowData} size="sm"> 增行 </Button>
          <Button colors="danger" onClick={this.onDelRowCheck} size="sm">删除</Button>
          <Button colors="primary" onClick={this.getFormatData} size="sm">格式化数据 </Button>
        </div>

        <div className="min-table">
          <AcHandTable
            id="example6" // 组件id
            onRef={ref => this.child = ref} // 设置ref属性 调用子组件方法
            colHeaders={['姓', '名', '单价', '数量', '合计', '日期', '时间', '备注']} // 表格表头
            data={handData} // 表体数据
            columns={this.columns} // 列属性设置
            colWidths={[null, 50, 100, 100, 120, 100, 100, 100, null]}
            manualRowMove // 行移动
            fillHandle={{
              autoInsertRow: false,
              direction: 'vertical',
            }}
            headerTooltips
            nestedHeaders={[ // 多表头
              [
                {
                  label: '个人信息',
                  colspan: 2,
                },
                {
                  label: '统计',
                  colspan: 3,
                },
                {
                  label: '消费记录',
                  colspan: 3,
                },
              ],
            ]}
            contextMenu={false}

            mergeCells={[ // 合并单元格
              {
                row: 0, // 合并行开始
                rowspan: 4, // 合并行数量
                col: 8, //  合并列开始
                colspan: 1, // 合并列数量
              },
            ]}

            cell={[ // 设置表格样式
              {
                row: 0, // 行号
                col: 8, //  列号
                className: 'htMiddle htCenter', // 样式名
              },

            ]}

            width="100%"
            height="158px"
          />

        </div>
      </div>

    );
  }
}

export default Demo6;
