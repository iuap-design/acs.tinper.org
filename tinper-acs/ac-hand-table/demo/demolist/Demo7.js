/**
 *
 * @title 动态表格编辑
 * @description 表格编辑态和预览态切换
 *
 */

import React, { Component } from 'react';
import { Button } from 'tinper-bee';


// 引入 AcHandTable 组件

// demo 工程中引入方式
import AcHandTable from '../../src/index';
import '../../src/index.less';
import './index.less';


// 项目中引入方式
// import AcHandTable from 'ac-hand-table';
// import 'ac-hand-table/dist/index.css';

const data = [
  {
    id: 1,
    name: '张三',
    price: 19,
    number: 10,
    total: 190,
    date: '2018-07-02',
    time: '09:20:30',
  },
  {
    id: 2,
    name: '小贝',
    price: 19,
    number: 10,
    total: 190,
    date: '2018-07-02',
    time: '09:20:30',
  },
  {
    id: 3,
    name: '小维',
    price: 19,
    number: 10,
    total: 190,
    date: '2018-07-02',
    time: '09:20:30',
  },
  {
    id: 4,
    name: '孙大熊',
    price: 19,
    number: 10,
    total: 190,
    date: '2018-07-02 09:20:30',
    time: '09:20:30',
  },
];


class Demo7 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handData: data,
      status: 'view',
    };
  }

  handData = JSON.parse(JSON.stringify(data));

  columns = [
    {
      data: 'name',
      textTooltip: true,
    },
    {
      data: 'price',
      type: 'numeric', // 数字类型
      numericFormat: {
        pattern: '$0,0.00',
      },
    },
    {
      data: 'number',
      type: 'numeric', // 数字类型
    },
    {
      data: 'total',
      type: 'numeric', // 数字类型
      numericFormat: {
        pattern: '$0,0.00',
      },
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


  onEdit = () => {
    // 让表可以编辑
    this.child.updateSettings({
      readOnly: false,
    });

    this.setState({
      status: 'edit',
    });
  };


  onSave = () => {

    // 实际开发中链接 后台
    this.setState({ status: 'view' });
    this.child.updateSettings({
      readOnly: true,
    });

    //  获取表格数据
    this.child.getData((data) => {
      this.handData = data;
    });

  };

  onCancel = () => {

    // 实际开发中链接 后台
    this.setState({
      status: 'view',
      handData: JSON.parse(JSON.stringify(this.handData))
    });
    this.child.updateSettings({
      readOnly: true,
    });

  };


  render() {
    const { handData, status } = this.state;

    return (
      <div className="demoPadding">

        <div style={{ marginBottom: '15px' }}>
          {status === 'view' &&
          <Button
            colors="primary"
            className="mb10"
            onClick={this.onEdit}
            size="sm"
          >编辑</Button>
          }

          {status !== 'view' &&
          <Button
            colors="primary"
            className="mb10"
            onClick={this.onSave}
            size="sm"
          >保存</Button>
          }

          {status !== 'view' &&
          <Button
            colors="primary"
            className="mb10"
            onClick={this.onCancel}
            size="sm"
          >取消</Button>
          }

        </div>

        <AcHandTable
          id="example7" // 组件id
          onRef={ref => this.child = ref} // 设置ref属性 调用子组件方法
          colHeaders={['姓名', '单价', '数量', '合计', '日期', '时间']} // 表格表头
          data={handData} // 表体数据
          columns={this.columns} // 列属性设置
          colWidths={100}
          manualRowMove // 行移动
          fillHandle={{
            autoInsertRow: false,
            direction: 'vertical',
          }}
          width="100%"
          height='auto' // 表格高度
          readOnly={true}
          readOnlyCellClassName='is-readOnly'
        />
      </div>

    );
  }
}

export default Demo7;
