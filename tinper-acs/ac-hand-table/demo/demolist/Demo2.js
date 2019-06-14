/* eslint-disable import/no-extraneous-dependencies */
/**
 *
 * @title 表格常用方法
 * @description 设置行样式、表格添加行、删除多选选中行、获取验证通过后数据、获取多选选中的数据、获取被修改后的数据、获取被格式化的数据、获取新增加的数据和获取删除的数据
 *
 */

import React, { Component } from 'react';
import { Button } from 'tinper-bee';

// 引入 AcHandTable 组件
import AcHandTable from '../../src/index';
import '../../src/index.less';

const data = [
  {
    id: 1,
    name: '张三',
    gender: '1',
    date: '2018-07-02',
    money: 10000,
    staff: '李白',
    staff_code: '',
    department: '',
    department_staff: '',
    department_staff_transfer: '',
  },
  {
    id: 2,
    name: '李四',
    gender: 0,
    date: '2018-07-02',
    money: 10000,
    staff_code: '',
    staff: '李白',
    department: '',
    department_staff: '',
    department_staff_transfer: '',

  },
  {
    id: 3,
    name: '王五',
    gender: null,
    date: '2018-07-02',
    money: 10000,
    staff: '李白',
    staff_code: '',
    department: '',
    department_staff: '',
    department_staff_transfer: '',
  },
];


class Demo2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handData: data,
      changeRowNum: 0,
    };
  }

  columns = [
    {
      data: 'name',
      type: 'text',
      validator: (value, callback) => {
        callback(!!value);
      },
      allowInvalid: true,
      strict: true,
      onChangeCell: (rowData, rowNum) => { // 单元格改变回调
        console.log('rowData, rowNum', rowData, rowNum);
        this.setState({ changeRowNum: rowNum });
      },
      onClick: (rowData, rowNum, value) => {
        console.log('rowData, rowNum, value', rowData, rowNum, value);
      }
    },
    {
      data: 'gender',
      type: 'select', // 表格类型
      source: [{
        value: '男',
        key: '1',
      }, {
        value: '女',
        key: 0,
      }],
    },
    {
      data: 'date',
      type: 'date',
      dateFormat: 'YYYY-MM-DD', // 日期格式
      correctFormat: true, //  当前值是否格式化
      defaultDate: '1900-01-01', // 默认值
      allowInvalid: true, // 不容许日期为空
    },
    {
      data: 'money',
      type: 'numeric', // 资薪
      allowInvalid: true,
    },
  ];

  // 设置行样式
  setStyle = (rowIndex) => {
    let style = { 'background-color': '#fff' };
    if (rowIndex % 2 === 0) {
      style = { 'background-color': '#3fc8c1' };
    }
    return style;
  };

  // 表格添加行
  onInsertRowData = () => {
    const rowDefaultData = {
      id: 99,
      name: '张ssss三',
      gender: '1',
      date: '2018-07-02',
      money: 10000,
      staff: '李白',
      staff_code: '',
      department: '',
      department_staff: '',
      department_staff_transfer: '',
    };
    // this.child.onInsertRowData() // 默认从第一行添加
    this.child.onInsertRowData(0, rowDefaultData);
  };

  // 更新行
  onUpdateRowData = () => {
    const rowDefaultData = {
      id: 99,
      name: '张ssss三',
      gender: '1',
      date: '2018-07-02',
      money: 10000,
      staff: '李白',
      staff_code: '',
      department: '',
      department_staff: '',
      department_staff_transfer: '',
    };
    this.child.onUpdateRowData(0, rowDefaultData);
  };


  // 删除多选选中的行
  onDelRowCheck = () => {
    this.child.onDelRowCheck();
  };

  // 获取验证通过后数据
  getData = () => {
    this.child.getData((data) => {
      console.log('data', data);
    });
  };

  // 获取多选选中的数据
  getCheckData = () => {
    const checkboxData = this.child.getCheckbox();
    console.log('checkboxData', checkboxData);
  };

  // 获取被修改后的数据
  getUpdateData = () => {
    const updateData = this.child.getUpdateData();
    console.log('updateData', updateData);
  };

  // 获取被格式化的数据
  getFormatData = () => {
    const formatData = this.child.getFormatData();
    console.log('formatData', formatData);
  };

  // 获取新增加的数据
  getAddRowData = () => {
    const addRowDate = this.child.getAddRowData();
    console.log('addRowDate', addRowDate);
  };

  // 获取删除的数据
  getDelRowData = () => {
    const delRowData = this.child.getDelRowData();
    console.log('delRowData', delRowData);
  };

  // 导出csv
  onDownCsv = () => {
    this.child.onExportCSV();
  };


  render() {
    const { handData, changeRowNum } = this.state;

    return (
      <div className="demoPadding">

        <div style={{ marginBottom: '15px' }}>
          <Button colors="primary" onClick={this.onInsertRowData} size="sm"> 增行 </Button>
          <Button colors="primary" onClick={this.onUpdateRowData} size="sm">修改行</Button>
          <Button colors="danger" onClick={this.onDelRowCheck} size="sm">删除选中行</Button>
          <Button colors="primary" onClick={this.getData} size="sm"> 获取验证数据</Button>
          <Button colors="primary" onClick={this.getCheckData} size="sm"> 获取选中行 </Button>
          <Button colors="primary" onClick={this.getUpdateData} size="sm">获取修改行 </Button>
          <Button colors="primary" onClick={this.getAddRowData} size="sm">获取新增加行</Button>
          <Button colors="primary" onClick={this.getDelRowData} size="sm">获取删除行</Button>
          <Button colors="primary" onClick={this.getFormatData} size="sm">格式化数据 </Button>
          <Button colors="primary" onClick={this.onDownCsv} size="sm">导出csv </Button>
        </div>

        <AcHandTable
          id="example2" // 组件id
          onRef={(ref) => { // 设置ref属性 调用子组件方法
            this.child = ref;
          }}
          colHeaders={['姓名', '性别', '日期', '资薪', '表格参照-人员', '树参照-部门', '树表参照-部门人员', '树穿梭-人员']} // 表格表头
          data={handData} // 表体数据
          columns={this.columns} // 列属性设置
          // 设置行样式
          rowStyle={this.setStyle}
          rowKey="id" // 数组对象中唯一id 默认值为'id'
          csvConfig={{
            filename: '导出',
          }}
        />

      </div>
    );
  }
}

export default Demo2;
